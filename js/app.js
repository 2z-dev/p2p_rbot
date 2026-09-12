const API_URL = "https://slddpusuckhhvvetpgxa.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZGRwdXN1Y2toaHZ2ZXRwZ3hhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODYwNzMyMiwiZXhwIjoyMTA0MTgzMzIyfQ.obfZa6h7dKqVvzdHUAXRQ6TAZ8dSsmBZqmUCtBVO0QM";

const SUPER_ADMIN_ID = 5172556128;
let adminIds = [SUPER_ADMIN_ID];

/* ====================================================
   МУЛЬТИЯЗЫЧНЫЙ СЛОВАРЬ (7 ЯЗЫКОВ)
==================================================== */
const I18N = {
    ru: {
        tabToday: "За сегодня", tabMonth: "За месяц", tabAll: "Все время", tabCustom: "Свой период 📅",
        totalProfitBadge: "💰 ОБЩАЯ ПРИБЫЛЬ", netIn: "Чистая в", netInUsdt: "Чистая в USDT",
        formulaFiat: "Продажа − Покупка", formulaUsdt: "Покупка − Продажа",
        midPriceHint: "⚖️ Средняя цена (Mid Price):",
        statRoi: "📈 ROI от оборота", statWac: "🛒 WAC Закупка", statAvgSell: "🏷 Ср. Продажа",
        statOps: "🔢 Сделок / Покупок / Продаж", turnCombinedTitle: "💸 Оборот (Фиат / USDT)",
        calcTitle: "КАЛЬКУЛЯТОР КРУГА", calcDealPrice: "Прайс сделки",
        calcBuyHeader: "ПОКУПКА 🟢", calcBuyRate: "Курс USDT",
        calcSellHeader: "ПРОДАЖА 🔴", calcSellRate: "Курс USDT",
        calcSpread: "Спред:", calcProfit: "Прибыль с круга:",
        calcSaveCycle: "Сохранить круг ✅", calcClear: "Очистить ❌",
        showSecondary: "📊 Развернуть подробную статистику", hideSecondary: "📊 Скрыть подробную статистику",
        presetYesterday: "Вчера", preset7d: "7 дней", preset30d: "30 дней",
        dateFrom: "С даты", dateTo: "По дату", btnApplyDate: "Применить ⚡️",
        cardsTitle: "Мои карты", cardsSubtitle: "Контроль кассы и лимитов", btnCreateCard: "➕ Создать",
        historyTitle: "История операций", historySubtitle: "Синхронизированные сделки",
        profileTitle: "Настройки", profileSubtitle: "Конфигурация аккаунта и промокоды",
        btnSupport: "👨‍💻 Служба поддержки",
        btnGotIt: "Понятно"
    },
    en: {
        tabToday: "Today", tabMonth: "This Month", tabAll: "All Time", tabCustom: "Custom Range 📅",
        totalProfitBadge: "💰 TOTAL PROFIT", netIn: "Net in", netInUsdt: "Net in USDT",
        formulaFiat: "Sell − Buy", formulaUsdt: "Buy − Sell",
        midPriceHint: "⚖️ Mid Price:",
        statRoi: "📈 Turnover ROI", statWac: "🛒 WAC Buy Price", statAvgSell: "🏷 Avg Sell Price",
        statOps: "🔢 Trades: Total / Buys / Sells", turnCombinedTitle: "💸 Turnover (Fiat / USDT)",
        calcTitle: "CYCLE CALCULATOR", calcDealPrice: "Deal Budget",
        calcBuyHeader: "BUY 🟢", calcBuyRate: "USDT Rate",
        calcSellHeader: "SELL 🔴", calcSellRate: "USDT Rate",
        calcSpread: "Spread:", calcProfit: "Cycle Profit:",
        calcSaveCycle: "Save Cycle ✅", calcClear: "Clear ❌",
        showSecondary: "📊 Show Detailed Stats", hideSecondary: "📊 Hide Detailed Stats",
        presetYesterday: "Yesterday", preset7d: "7 days", preset30d: "30 days",
        dateFrom: "Date from", dateTo: "Date to", btnApplyDate: "Apply ⚡️",
        cardsTitle: "My Cards", cardsSubtitle: "Cash & limits control", btnCreateCard: "➕ Add Card",
        historyTitle: "Operations History", historySubtitle: "Synchronized ledger trades",
        profileTitle: "Settings", profileSubtitle: "Account & Terminal Configuration",
        btnSupport: "👨‍💻 Support Center",
        btnGotIt: "Got It"
    }
};

const HELP_DATA = {
    total_profit: {
        title: "💰 ОБЩАЯ ПРИБЫЛЬ И ЛОГИКА РАСЧЕТА",
        text: `<b>В P2P-арбитраже прибыль формируется в двух валютах:</b><br><br>
        <b>1. Чистая в USDT (Крипто-профит):</b><br>
        <code>Покупка − Продажа</code> монет.<br><br>
        <b>2. Чистая в фиате (₽):</b><br>
        <code>Продажа − Покупка</code> фиата с карт.<br><br>
        <b>3. ОБЩАЯ ПРИБЫЛЬ:</b><br>
        <code>Чистая в ₽ + (Чистая в USDT × Mid Price)</code>.`
    },
    calculator: {
        title: "⚡️ КАЛЬКУЛЯТОР КРУГА",
        text: `Инструмент фиксации полного цикла. Вы задаете рабочий объем и оба курса, система рассчитывает спред и чистую прибыль, сохраняя круг единой записью на выбранную карту.`
    },
    spread: {
        title: "📊 СПРЕД СДЕЛКИ",
        text: `Показывает процент отдачи между курсом продажи и покупки по формуле: <code>((Продажа − Покупка) / Покупка) × 100%</code>.`
    }
};

const tg = window.Telegram?.WebApp;
if (tg) {
    try {
        tg.expand();
        tg.ready();
    } catch(e){}
}

/* ====================================================
   СОСТОЯНИЕ ПРИЛОЖЕНИЯ
==================================================== */
let currentUser = null;
let userCards = [];
let userTrades = [];
let cardOps = [];
let currentPeriod = 'today';
let customStartDate = null;
let customEndDate = null;
let activeCardId = null;
let activeOpType = 'deposit';
let activeEditTradeId = null;
let activeSheetCard = null;
let isSecondaryExpanded = false;

let currentLang = localStorage.getItem('p2p_terminal_lang') || 'ru';
let uiMode = localStorage.getItem('p2p_ui_mode') || 'fx';
let layoutMode = localStorage.getItem('p2p_layout_mode') || 'feed';
let isIncognito = localStorage.getItem('p2p_incognito') === 'true';
let soundEnabled = localStorage.getItem('p2p_sound_enabled') !== 'false';
let isHeatmapOpen = false;

/* ====================================================
   СЕТЕВОЙ МОДУЛЬ (SUPABASE REST)
==================================================== */
async function db(endpoint, options = {}) {
    const headers = {
        "apikey": API_KEY,
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "Prefer": options.prefer || "return=representation",
        ...(options.headers || {})
    };
    const res = await fetch(`${API_URL}/${endpoint}`, { ...options, headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    const txt = await res.text();
    return txt ? JSON.parse(txt) : null;
}

/* ====================================================
   ЗВУК МОНЕТ И КАССЫ (WEB AUDIO API)
==================================================== */
function playCashSound() {
    if (!soundEnabled) return;
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioCtx.currentTime;

        // Первый звон (монета)
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(987.77, now);
        osc1.frequency.exponentialRampToValueAtTime(1318.51, now + 0.08);
        gain1.gain.setValueAtTime(0.25, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.start(now);
        osc1.stop(now + 0.35);

        // Щелчок кассы
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(1567.98, now + 0.06);
        gain2.gain.setValueAtTime(0.2, now + 0.06);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start(now + 0.06);
        osc2.stop(now + 0.45);
    } catch(e) {}
}

function switchSoundMode(isChecked) {
    haptic('light');
    soundEnabled = isChecked;
    localStorage.setItem('p2p_sound_enabled', isChecked);
    showToast(isChecked ? "🔔 Звук кассы включен" : "🔕 Звук выключен");
}

/* ====================================================
   РЕЖИМ ИНКОГНИТО
==================================================== */
function applyIncognito() {
    const btn = document.getElementById('btn-incognito');
    if (isIncognito) {
        document.body.classList.add('privacy-active');
        if (btn) btn.innerText = '🕶';
    } else {
        document.body.classList.remove('privacy-active');
        if (btn) btn.innerText = '👁';
    }
}

function toggleIncognitoMode() {
    haptic('light');
    isIncognito = !isIncognito;
    localStorage.setItem('p2p_incognito', isIncognito);
    applyIncognito();
    showToast(isIncognito ? "🕶 Инкогнито включен" : "👁 Цифры открыты");
}

/* ====================================================
   БЕЗОПАСНЫЕ ЗОНЫ TELEGRAM
==================================================== */
function syncTelegramSafeAreas() {
    if (!tg) return;
    const updateInsets = () => {
        const topInset = tg.contentSafeAreaInset?.top || tg.safeAreaInset?.top || 0;
        if (topInset > 0) {
            document.documentElement.style.setProperty('--tg-content-safe-area-inset-top', `${topInset}px`);
        }
    };
    try {
        tg.onEvent?.('contentSafeAreaChanged', updateInsets);
        tg.onEvent?.('safeAreaChanged', updateInsets);
        updateInsets();
    } catch (e) {}
}

/* ====================================================
   ВАЛЮТЫ И СИМВОЛЫ
==================================================== */
function getCurrencySymbol() {
    const map = {"RUB":"₽", "KZT":"₸", "UAH":"₴", "BYN":"Br", "USD":"$"};
    return map[currentUser?.currency || 'RUB'] || (currentUser?.currency || '₽');
}

function updateAllCurrencySymbols() {
    const sym = getCurrencySymbol();
    document.querySelectorAll('.sym').forEach(el => el.innerText = sym);
}

function animateNumber(element, target, prefix = '', suffix = '', decimals = 2, suffixSize = '13px') {
    const start = parseFloat(element.dataset.curVal || 0);
    const duration = 400;
    const startTime = performance.now();

    function easeOutExpo(x) { return x === 1 ? 1 : 1 - Math.pow(2, -10 * x); }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (target - start) * easeOutExpo(progress);

        const sign = current > 0 ? '+' : '';
        element.innerHTML = `${sign}${current.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        })} <span style="font-size: ${suffixSize}; color: var(--text-muted);">${suffix}</span>`;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.dataset.curVal = target;
            const finalSign = target > 0 ? '+' : '';
            element.innerHTML = `${finalSign}${target.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            })} <span style="font-size: ${suffixSize}; color: var(--text-muted);">${suffix}</span>`;
        }
    }
    requestAnimationFrame(update);
}

/* ====================================================
   КАЛЬКУЛЯТОР КРУГА
==================================================== */
function runCalculator() {
    const fiat = parseFloat(document.getElementById('calc-fiat-amt').value) || 0;
    const buyRate = parseFloat(document.getElementById('calc-buy-rate').value) || 0;
    const sellRate = parseFloat(document.getElementById('calc-sell-rate').value) || 0;

    const elBuyCrypto = document.getElementById('calc-buy-crypto');
    const elSellCrypto = document.getElementById('calc-sell-crypto');
    const elSpread = document.getElementById('calc-spread-val');
    const elProfitUsdt = document.getElementById('calc-profit-usdt-val');
    const elProfitFiat = document.getElementById('calc-profit-fiat-val');
    const sym = getCurrencySymbol();

    let boughtUsdt = 0;
    let soldUsdt = 0;

    if (fiat > 0 && buyRate > 0) {
        boughtUsdt = fiat / buyRate;
        elBuyCrypto.innerText = `${boughtUsdt.toFixed(2)} USDT`;
    } else {
        elBuyCrypto.innerText = `0.00 USDT`;
    }

    if (fiat > 0 && sellRate > 0) {
        soldUsdt = fiat / sellRate;
        elSellCrypto.innerText = `${soldUsdt.toFixed(2)} USDT`;
    } else {
        elSellCrypto.innerText = `0.00 USDT`;
    }

    if (fiat > 0 && buyRate > 0 && sellRate > 0) {
        const spreadPct = ((sellRate - buyRate) / buyRate) * 100;
        const profitUsdt = boughtUsdt - soldUsdt;
        const midRate = (buyRate + sellRate) / 2;
        const profitFiat = profitUsdt * midRate;

        elSpread.innerText = (spreadPct > 0 ? "+" : "") + spreadPct.toFixed(2) + "%";
        elSpread.style.color = spreadPct >= 0 ? 'var(--bybit-yellow)' : 'var(--bybit-red)';

        elProfitUsdt.innerText = (profitUsdt > 0 ? "+" : "") + profitUsdt.toFixed(2) + " USDT";
        elProfitUsdt.style.color = profitUsdt >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)';

        elProfitFiat.innerText = `≈ ${(profitFiat > 0 ? "+" : "")}${profitFiat.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${sym}`;
    } else {
        elSpread.innerText = "0.00%";
        elSpread.style.color = 'var(--text-main)';
        elProfitUsdt.innerText = "0.00 USDT";
        elProfitUsdt.style.color = 'var(--text-main)';
        elProfitFiat.innerText = `≈ 0.00 ${sym}`;
    }
}

document.getElementById('calc-fiat-amt')?.addEventListener('input', runCalculator);
document.getElementById('calc-buy-rate')?.addEventListener('input', runCalculator);
document.getElementById('calc-sell-rate')?.addEventListener('input', runCalculator);

async function saveCalculatedCycle() {
    haptic('medium');
    const fiat = parseFloat(document.getElementById('calc-fiat-amt').value);
    const buyRate = parseFloat(document.getElementById('calc-buy-rate').value);
    const sellRate = parseFloat(document.getElementById('calc-sell-rate').value);
    const cardId = document.getElementById('calc-card-sel').value || null;

    if (!fiat || !buyRate || !sellRate || fiat <= 0 || buyRate <= 0 || sellRate <= 0) {
        showToast("⚠️ Заполните сумму и оба курса!");
        return;
    }

    const boughtUsdt = parseFloat((fiat / buyRate).toFixed(2));
    const soldUsdt = parseFloat((fiat / sellRate).toFixed(2));
    const spreadPct = parseFloat((((sellRate - buyRate) / buyRate) * 100).toFixed(2));
    const profitUsdt = parseFloat((boughtUsdt - soldUsdt).toFixed(2));
    const midRate = (buyRate + sellRate) / 2;
    const profitFiat = parseFloat((profitUsdt * midRate).toFixed(2));

    try {
        await db('trades', {
            method: 'POST',
            body: JSON.stringify({
                tg_id: currentUser.tg_id,
                type: 'buy',
                is_cycle: true,
                crypto_amount: boughtUsdt,
                rate: buyRate,
                buy_rate: buyRate,
                sell_rate: sellRate,
                fiat_amount: fiat,
                cycle_spread: spreadPct,
                cycle_profit_rub: profitFiat,
                cycle_profit_usdt: profitUsdt,
                card_id: cardId ? parseInt(cardId) : null,
                tag_color: 'green'
            })
        });

        playCashSound();
        haptic('success');
        showToast("✅ Круг сохранен единой записью!");
        await refreshData();
        renderAll();
    } catch(e) {
        showToast("❌ Ошибка сохранения");
    }
}

function clearCalculator() {
    haptic('light');
    document.getElementById('calc-fiat-amt').value = '10000';
    document.getElementById('calc-buy-rate').value = '';
    document.getElementById('calc-sell-rate').value = '';
    runCalculator();
    showToast("Калькулятор очищен");
}

/* ====================================================
   РАСЧЕТ СТАТИСТИКИ И СРАВНЕНИЕ ПЕРИОДОВ
==================================================== */
function calculateStats() {
    const tz = parseInt(currentUser?.tz_offset) || 3;
    const now = new Date();
    now.setHours(now.getUTCHours() + tz);

    const filtered = userTrades.filter(t => {
        const d = new Date(t.date);
        d.setHours(d.getUTCHours() + tz);
        if (currentPeriod === 'today') return d.toDateString() === now.toDateString();
        if (currentPeriod === 'month') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        if (currentPeriod === 'custom' && customStartDate && customEndDate) {
            const tradeTime = new Date(t.date).getTime();
            return tradeTime >= customStartDate.getTime() && tradeTime <= customEndDate.getTime();
        }
        return true;
    });

    let bF = 0, bC = 0, sF = 0, sC = 0, sellsCount = 0, buysCount = 0;
    let cycleProfitFiatTotal = 0;

    filtered.forEach(t => {
        const f = parseFloat(t.fiat_amount || 0);
        const c = parseFloat(t.crypto_amount || 0);

        if (t.is_cycle) {
            bF += f;
            sF += f;
            bC += c;
            const soldC = t.sell_rate ? f / parseFloat(t.sell_rate) : c;
            sC += soldC;
            buysCount++;
            sellsCount++;
            cycleProfitFiatTotal += parseFloat(t.cycle_profit_rub || 0);
        } else if (t.type === 'buy') {
            bF += f;
            bC += c;
            buysCount++;
        } else {
            sF += f;
            sC += c;
            sellsCount++;
        }
    });

    const wac = bC > 0 ? bF / bC : 0;
    const avgSell = sC > 0 ? sF / sC : 0;

    let midPrice = (wac > 0 && avgSell > 0) ? (wac + avgSell) / 2 : (wac || avgSell || 0);
    const profitFiat = (sF - bF) + cycleProfitFiatTotal;
    const profitUsdt = bC - sC;

    const totalProfitFiat = profitFiat + (profitUsdt * midPrice);
    const totalProfitUsdt = profitUsdt + (midPrice > 0 ? profitFiat / midPrice : 0);

    const avgPeriodSpread = (wac > 0 && avgSell > 0) ? ((avgSell / wac) - 1) * 100 : 0;
    const fiatTurn = bF + sF;
    const cryptoTurn = bC + sC;
    const roi = fiatTurn > 0 ? (totalProfitFiat / fiatTurn) * 100 : 0;
    const sym = getCurrencySymbol();

    function updateMetricColor(el, val) {
        if (!el) return;
        el.style.color = val < 0 ? 'var(--bybit-red)' : (val > 0 ? 'var(--bybit-green)' : 'var(--text-main)');
    }

    const elTotalFiat = document.getElementById('val-total-profit-rub');
    updateMetricColor(elTotalFiat, totalProfitFiat);
    animateNumber(elTotalFiat, totalProfitFiat, '', sym, 2, '18px');

    const elTotalUsdt = document.getElementById('val-total-profit-usdt');
    updateMetricColor(elTotalUsdt, totalProfitUsdt);
    animateNumber(elTotalUsdt, totalProfitUsdt, '', 'USDT', 2, '12px');

    const elProfitFiat = document.getElementById('val-profit-rub');
    updateMetricColor(elProfitFiat, profitFiat);
    animateNumber(elProfitFiat, profitFiat, '', sym, 2, '12px');

    const elProfitUsdt = document.getElementById('val-profit-usdt');
    updateMetricColor(elProfitUsdt, profitUsdt);
    animateNumber(elProfitUsdt, profitUsdt, '', 'USDT', 2, '12px');

    document.getElementById('hint-mid-price').innerText = midPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

    // Спред последнего круга
    const lastCycle = userTrades.find(t => t.is_cycle);
    let lastSpread = 0;
    if (lastCycle) {
        lastSpread = parseFloat(lastCycle.cycle_spread || 0);
        document.getElementById('hint-last-spread').innerText = `${lastCycle.buy_rate} → ${lastCycle.sell_rate} ${sym}`;
    } else {
        const lastSell = userTrades.find(t => t.type === 'sell');
        const lastBuy = userTrades.find(t => t.type === 'buy');
        if (lastSell && lastBuy && parseFloat(lastBuy.rate) > 0) {
            lastSpread = ((parseFloat(lastSell.rate) - parseFloat(lastBuy.rate)) / parseFloat(lastBuy.rate)) * 100;
            document.getElementById('hint-last-spread').innerText = `${lastBuy.rate} → ${lastSell.rate} ${sym}`;
        }
    }

    const elLastSpread = document.getElementById('val-last-spread');
    elLastSpread.innerText = (lastSpread > 0 ? "+" : "") + lastSpread.toFixed(2) + "%";
    updateMetricColor(elLastSpread, lastSpread);

    const elAvgSpread = document.getElementById('val-avg-spread');
    elAvgSpread.innerText = (avgPeriodSpread > 0 ? "+" : "") + avgPeriodSpread.toFixed(2) + "%";
    updateMetricColor(elAvgSpread, avgPeriodSpread);

    const roiEl = document.getElementById('val-roi');
    roiEl.innerText = (roi > 0 ? "+" : "") + roi.toFixed(2) + "%";
    updateMetricColor(roiEl, roi);

    document.getElementById('val-wac').innerText = wac.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('val-avg-sell').innerText = avgSell.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('val-fiat-turn').innerText = `${fiatTurn.toLocaleString(undefined, {minimumFractionDigits: 0})} ${sym}`;
    document.getElementById('val-crypto-turn').innerText = `${cryptoTurn.toLocaleString(undefined, {minimumFractionDigits: 2})} USDT`;
    document.getElementById('val-trades-count').innerText = `${filtered.length} / ${buysCount} / ${sellsCount}`;

    // Динамика к прошлому периоду
    calculatePeriodComparison(totalProfitFiat);
}

function calculatePeriodComparison(currentProfit) {
    const compBadge = document.getElementById('val-period-compare');
    if (!compBadge) return;

    let priorTrades = [];
    const now = new Date();

    if (currentPeriod === 'today') {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        priorTrades = userTrades.filter(t => new Date(t.date).toDateString() === yesterday.toDateString());
    } else if (currentPeriod === 'month') {
        const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
        const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
        priorTrades = userTrades.filter(t => {
            const d = new Date(t.date);
            return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
        });
    }

    if (priorTrades.length === 0) {
        compBadge.innerHTML = `🌱 Новый период`;
        compBadge.style.color = "var(--text-muted)";
        return;
    }

    const priorProfit = priorTrades.reduce((acc, t) => {
        if (t.is_cycle) return acc + parseFloat(t.cycle_profit_rub || 0);
        return acc + (t.type === 'sell' ? parseFloat(t.fiat_amount || 0) : -parseFloat(t.fiat_amount || 0));
    }, 0);

    if (priorProfit === 0) {
        compBadge.innerHTML = `📈 +100% к прошлому периоду`;
        compBadge.style.color = "var(--bybit-green)";
        return;
    }

    const diffPct = (((currentProfit - priorProfit) / Math.abs(priorProfit)) * 100).toFixed(1);
    if (diffPct >= 0) {
        compBadge.innerHTML = `📈 +${diffPct}% к прошлому периоду`;
        compBadge.style.color = "var(--bybit-green)";
    } else {
        compBadge.innerHTML = `📉 ${diffPct}% к прошлому периоду`;
        compBadge.style.color = "var(--bybit-red)";
    }
}

/* ====================================================
   КАЛЕНДАРЬ ДОХОДНОСТИ (ТЕПЛОКАРТА)
==================================================== */
function toggleHeatmapPanel() {
    isHeatmapOpen = !isHeatmapOpen;
    document.getElementById('heatmap-panel').style.display = isHeatmapOpen ? 'block' : 'none';
    document.getElementById('heatmap-arrow').innerText = isHeatmapOpen ? '▴' : '▾';
    if (isHeatmapOpen) renderHeatmap();
}

function renderHeatmap() {
    const container = document.getElementById('calendar-grid-container');
    container.innerHTML = '';
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    days.forEach(d => container.innerHTML += `<div class="cal-head">${d}</div>`);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;

    for (let i = 0; i < firstDayIndex; i++) {
        container.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= totalDays; day++) {
        const dayTrades = userTrades.filter(t => {
            const d = new Date(t.date);
            return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
        });

        let profit = 0;
        dayTrades.forEach(t => {
            if (t.is_cycle) profit += parseFloat(t.cycle_profit_rub || 0);
            else if (t.type === 'sell') profit += parseFloat(t.fiat_amount || 0);
            else if (t.type === 'buy') profit -= parseFloat(t.fiat_amount || 0);
        });

        let colorClass = '';
        if (dayTrades.length > 0) {
            if (profit > 10000) colorClass = 'profit-pos-high';
            else if (profit > 3000) colorClass = 'profit-pos-mid';
            else if (profit > 0) colorClass = 'profit-pos-low';
            else if (profit < 0) colorClass = 'profit-neg';
        }

        container.innerHTML += `
            <div class="cal-day-cell ${colorClass}" onclick="showDayDetails(${day}, ${profit}, ${dayTrades.length})">
                ${day}
            </div>
        `;
    }
}

function showDayDetails(day, profit, count) {
    haptic('light');
    showToast(`📅 ${day} число: ${count} сделок, профит: ${profit.toLocaleString()} ₽`);
}

/* ====================================================
   КОМПАКТНЫЕ КАРТЫ И BOTTOM SHEET
==================================================== */
function renderCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    if (userCards.length === 0) {
        container.innerHTML = `<div class="glass-card" style="text-align: center; color: var(--text-muted);">Карт пока нет. Создайте первую!</div>`;
        return;
    }

    const sym = getCurrencySymbol();

    // Сгоревшие (115-ФЗ) всегда в самом низу
    const sorted = [...userCards].sort((a, b) => {
        if (a.status === 'burned') return 1;
        if (b.status === 'burned') return -1;
        if (a.is_pinned && !b.is_pinned) return -1;
        if (!a.is_pinned && b.is_pinned) return 1;
        return 0;
    });

    sorted.forEach(c => {
        const spentBuy = userTrades.filter(tr => tr.card_id === c.id && tr.type === 'buy').reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
        const gainSell = userTrades.filter(tr => tr.card_id === c.id && tr.type === 'sell').reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
        const deps = cardOps.filter(o => o.card_id === c.id && o.type === 'deposit').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
        const wdrs = cardOps.filter(o => o.card_id === c.id && o.type === 'withdraw').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
        const wdrsInLimit = cardOps.filter(o => o.card_id === c.id && o.type === 'withdraw' && o.count_in_limit).reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);

        const balance = deps - wdrs + gainSell - spentBuy;
        const totalUsedLimit = spentBuy + wdrsInLimit;

        const todayTrades = userTrades.filter(tr => {
            return tr.card_id === c.id && new Date(tr.date).toDateString() === new Date().toDateString();
        });
        const buysCount = todayTrades.filter(tr => tr.type === 'buy').length;
        const sellsCount = todayTrades.filter(tr => tr.type === 'sell' || tr.is_cycle).length;

        const limit = c.buy_limit ? parseFloat(c.buy_limit) : null;
        let miniBarHtml = '';
        if (limit) {
            const pct = Math.min(100, Math.round((totalUsedLimit / limit) * 100));
            const colorClass = pct > 90 ? 'danger' : (pct > 70 ? 'warning' : '');
            miniBarHtml = `
                <div class="card-mini-bar">
                    <div class="card-mini-bar-fill ${colorClass}" style="width: ${pct}%;"></div>
                </div>
            `;
        }

        const isBurned = c.status === 'burned';
        const isPinned = c.is_pinned;

        container.innerHTML += `
            <div class="card-row-item ${isBurned ? 'burned' : ''} ${isPinned ? 'pinned' : ''}" onclick="openCardBottomSheet(${c.id})">
                <div class="card-stripe" style="background: ${c.color_accent || 'var(--bybit-yellow)'};"></div>
                <div style="flex: 1; padding-left: 8px;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="font-weight: 800; font-size: 14px;">${c.card_name}</span>
                        ${isPinned ? '📌' : ''}
                        ${isBurned ? '<span style="font-size: 10px; color: var(--bybit-red); font-weight: 800;">115-ФЗ</span>' : ''}
                    </div>
                    ${miniBarHtml}
                </div>
                <div style="text-align: right; margin-left: 10px;">
                    <div class="privacy-blur" style="font-size: 15px; font-weight: 900;">${balance.toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}</div>
                    <div style="display: flex; justify-content: flex-end; align-items: center; gap: 5px; margin-top: 3px;">
                        <span class="ops-bubble">${buysCount}/${sellsCount}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

function openCardBottomSheet(cid) {
    haptic('light');
    activeSheetCard = userCards.find(c => c.id === cid);
    if (!activeSheetCard) return;

    activeCardId = cid;
    document.getElementById('sheet-card-title').innerText = activeSheetCard.card_name;
    document.getElementById('sheet-set-status').value = activeSheetCard.status || 'active';

    const spentBuy = userTrades.filter(tr => tr.card_id === cid && tr.type === 'buy').reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
    const gainSell = userTrades.filter(tr => tr.card_id === cid && tr.type === 'sell').reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
    const deps = cardOps.filter(o => o.card_id === cid && o.type === 'deposit').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
    const wdrs = cardOps.filter(o => o.card_id === cid && o.type === 'withdraw').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
    const balance = deps - wdrs + gainSell - spentBuy;

    const sym = getCurrencySymbol();
    document.getElementById('sheet-card-balance').innerText = `${balance.toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}`;

    const limitWrap = document.getElementById('sheet-limit-progress-wrap');
    if (activeSheetCard.buy_limit) {
        const limit = parseFloat(activeSheetCard.buy_limit);
        const pct = Math.min(100, Math.round((spentBuy / limit) * 100));
        limitWrap.innerHTML = `
            <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">
                <span>Суточный лимит:</span>
                <span>${spentBuy.toLocaleString()} / ${limit.toLocaleString()} ${sym} (${pct}%)</span>
            </div>
            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width: ${pct}%;"></div>
            </div>
        `;
    } else {
        limitWrap.innerHTML = `<span style="font-size: 11px; color: var(--text-muted);">Лимит покупок: Не задан</span>`;
    }

    document.getElementById('card-sheet-modal').classList.add('show');
}

function closeCardSheet() {
    document.getElementById('card-sheet-modal').classList.remove('show');
}

function copyCardNumberOnly() {
    if (!activeSheetCard?.card_number) return showToast("⚠️ Номер карты не указан");
    navigator.clipboard.writeText(activeSheetCard.card_number);
    haptic('success');
    showToast("💳 Номер скопирован!");
}

function copyCardFullRequisites() {
    if (!activeSheetCard) return;
    const text = `${activeSheetCard.card_name}: ${activeSheetCard.card_number || 'Реквизиты не заданы'} (${activeSheetCard.holder_name || ''}). Оплата строго без копеек, третьих лиц не принимаю, чек обязателен!`;
    navigator.clipboard.writeText(text);
    haptic('success');
    showToast("📋 Шаблон реквизитов скопирован!");
}

async function updateCardStatusFromSheet(status) {
    if (!activeSheetCard) return;
    haptic('medium');
    await db(`cards?id=eq.${activeSheetCard.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
    });
    showToast("Статус карты обновлен");
    await refreshData();
    renderCards();
}

function openSheetCardOp(type) {
    closeCardSheet();
    openCardOpModal(activeCardId, type);
}

function openSheetCardLimit() {
    closeCardSheet();
    openCardLimitModal(activeCardId);
}

async function cloneCurrentCard() {
    if (!activeSheetCard) return;
    haptic('medium');
    await db(`cards`, {
        method: 'POST',
        body: JSON.stringify({
            tg_id: currentUser.tg_id,
            card_name: `${activeSheetCard.card_name} (Копия)`,
            card_number: activeSheetCard.card_number,
            holder_name: activeSheetCard.holder_name,
            buy_limit: activeSheetCard.buy_limit
        })
    });
    closeCardSheet();
    showToast("✅ Карта клонирована!");
    await refreshData();
    renderCards();
}

async function deleteCurrentCardFromSheet() {
    if (!confirm("Удалить карту? Сделки сохранятся.")) return;
    await db(`cards?id=eq.${activeCardId}`, { method: 'DELETE' });
    closeCardSheet();
    showToast("🗑 Карта удалена");
    await refreshData();
    renderAll();
}

/* ====================================================
   ИСТОРИЯ И ПОВТОР ОПЕРАЦИЙ
==================================================== */
function renderHistory() {
    const container = document.getElementById('history-container');
    container.innerHTML = '';
    if (userTrades.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">Сделок пока нет.</div>`;
        return;
    }

    const sym = getCurrencySymbol();
    const tz = parseInt(currentUser?.tz_offset) || 3;

    userTrades.forEach(t => {
        const d = new Date(t.date);
        d.setHours(d.getUTCHours() + tz);
        const dateStr = d.toLocaleDateString('ru-RU', {month:'short', day:'numeric'}) + ' ' + d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        const boundCard = userCards.find(c => c.id === t.card_id);
        const cardBadge = boundCard ? `<span class="card-pill">💳 ${boundCard.card_name}</span>` : '';

        if (t.is_cycle) {
            container.innerHTML += `
                <div class="history-item">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <div style="display: flex; gap: 6px; align-items: center;">
                            <span style="font-size: 11px; font-weight: 800; color: var(--bybit-yellow);">КРУГ ⚡️</span>
                            ${cardBadge}
                        </div>
                        <span style="font-size: 11px; color: var(--text-muted);">${dateStr}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                        <div>
                            <div class="privacy-blur" style="font-size: 17px; font-weight: 800; color: var(--bybit-green);">
                                +${parseFloat(t.cycle_profit_rub || 0).toLocaleString()} ${sym}
                            </div>
                            <!-- Замена знака @ на слэш / -->
                            <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                                ${t.buy_rate} → ${t.sell_rate} ${sym} / Спред: +${t.cycle_spread}%
                            </div>
                            ${t.note ? `<div style="font-size: 11px; color: var(--bybit-blue); margin-top: 3px;">📝 ${t.note}</div>` : ''}
                        </div>
                        <div style="display: flex; gap: 6px;">
                            <button class="btn-card-action" style="padding: 6px 10px;" onclick="repeatTradeInCalc(${t.id})">🔁</button>
                            <button class="btn-card-action" style="padding: 6px 10px;" onclick="openEditTradeModal(${t.id})">✏️</button>
                            <button class="btn-card-action" style="padding: 6px 10px; color: var(--bybit-red);" onclick="deleteTradeCloud(${t.id})">🗑</button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            const isBuy = t.type === 'buy';
            container.innerHTML += `
                <div class="history-item">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <div style="display: flex; gap: 6px; align-items: center;">
                            <span style="font-size: 11px; font-weight: 800; color: ${isBuy ? 'var(--bybit-green)' : 'var(--bybit-red)'};">
                                ${isBuy ? 'ПОКУПКА 🟢' : 'ПРОДАЖА 🔴'}
                            </span>
                            ${cardBadge}
                        </div>
                        <span style="font-size: 11px; color: var(--text-muted);">${dateStr}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                        <div>
                            <div class="privacy-blur" style="font-size: 17px; font-weight: 800;">
                                ${parseFloat(t.fiat_amount || 0).toLocaleString()} ${sym}
                            </div>
                            <!-- Замена знака @ на слэш / -->
                            <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                                ${t.crypto_amount} USDT / ${t.rate} ${sym}
                            </div>
                            ${t.note ? `<div style="font-size: 11px; color: var(--bybit-blue); margin-top: 3px;">📝 ${t.note}</div>` : ''}
                        </div>
                        <div style="display: flex; gap: 6px;">
                            <button class="btn-card-action" style="padding: 6px 10px;" onclick="repeatTradeInCalc(${t.id})">🔁</button>
                            <button class="btn-card-action" style="padding: 6px 10px;" onclick="openEditTradeModal(${t.id})">✏️</button>
                            <button class="btn-card-action" style="padding: 6px 10px; color: var(--bybit-red);" onclick="deleteTradeCloud(${t.id})">🗑</button>
                        </div>
                    </div>
                </div>
            `;
        }
    });
}

function repeatTradeInCalc(tradeId) {
    haptic('light');
    const tr = userTrades.find(t => t.id === tradeId);
    if (!tr) return;

    if (tr.is_cycle) {
        document.getElementById('calc-fiat-amt').value = tr.fiat_amount;
        document.getElementById('calc-buy-rate').value = tr.buy_rate;
        document.getElementById('calc-sell-rate').value = tr.sell_rate;
        if (tr.card_id) document.getElementById('calc-card-sel').value = tr.card_id;
        runCalculator();
        handleNavClick('dashboard', document.querySelector('.nav-btn[data-target="dashboard"]'));
        showToast("🔁 Круг подставлен в калькулятор!");
    } else {
        document.getElementById('inp-amount').value = tr.fiat_amount;
        document.getElementById('inp-rate').value = tr.rate;
        setTradeType(tr.type);
        handleNavClick('trade', document.querySelector('.nav-btn[data-target="trade"]'));
        showToast("🔁 Сделка подставлена!");
    }
}

/* ====================================================
   ГЕНЕРАТОР PNL-КАРТОЧЕК ДЛЯ СОЦСЕТЕЙ
==================================================== */
function generatePnlCard() {
    haptic('medium');
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');

    // Фон
    const grad = ctx.createLinearGradient(0, 0, 600, 360);
    grad.addColorStop(0, '#0d121c');
    grad.addColorStop(1, '#05070a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 360);

    // Рамка
    ctx.strokeStyle = '#f3a600';
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 12, 576, 336);

    // Заголовок
    ctx.fillStyle = '#f3a600';
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillText('⚡️ P2P TERMINAL PRO — СВОДКА', 40, 55);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }), 40, 85);

    // Показатели
    const lastSpread = document.getElementById('val-last-spread').innerText;
    const avgSpread = document.getElementById('val-avg-spread').innerText;
    const roi = document.getElementById('val-roi').innerText;
    const tradesCount = document.getElementById('val-trades-count').innerText;

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 36px Inter, sans-serif';
    ctx.fillText(`Спред: ${lastSpread}`, 40, 155);

    ctx.font = '18px Inter, sans-serif';
    ctx.fillStyle = '#2ebb9a';
    ctx.fillText(`Средний спред: ${avgSpread}  |  ROI: ${roi}`, 40, 205);

    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`Всего операций за день: ${tradesCount}`, 40, 245);

    ctx.fillStyle = '#f3a600';
    ctx.font = 'bold 15px monospace';
    ctx.fillText(`Присоединяйся: t.me/P2P_Rbot?start=${currentUser?.tg_id || ''}`, 40, 310);

    const imgUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `PnL_Report_${new Date().toISOString().slice(0,10)}.png`;
    link.href = imgUrl;
    link.click();
    showToast("📸 Карточка создана и скачана!");
}

/* ====================================================
   ПРОМОКОДЫ
==================================================== */
async function submitPromoCode() {
    const input = document.getElementById('inp-promocode');
    const code = input?.value?.trim()?.toUpperCase();
    if (!code) return showToast("⚠️ Введите промокод");

    haptic('medium');
    try {
        const promos = await db(`promocodes?code=eq.${code}`);
        if (!promos || promos.length === 0) return showToast("❌ Промокод не найден");

        const promo = promos[0];
        if (promo.used_count >= promo.max_activations) return showToast("❌ Лимит активаций исчерпан");

        const now = new Date();
        let end = currentUser.sub_end ? new Date(currentUser.sub_end) : now;
        if (end < now) end = now;
        end.setDate(end.getDate() + promo.days);

        await Promise.all([
            db(`users?tg_id=eq.${currentUser.tg_id}`, {
                method: 'PATCH',
                body: JSON.stringify({ sub_end: end.toISOString() })
            }),
            db(`promocodes?code=eq.${code}`, {
                method: 'PATCH',
                body: JSON.stringify({ used_count: promo.used_count + 1 })
            })
        ]);

        haptic('success');
        showToast(`🎁 Активировано +${promo.days} дн.!`);
        input.value = '';
        await refreshData();
        checkSubscription();
    } catch(e) {
        showToast("❌ Ошибка активации");
    }
}

async function adminCreatePromo() {
    haptic('medium');
    const code = document.getElementById('new-promo-code').value.trim().toUpperCase();
    const days = parseInt(document.getElementById('new-promo-days').value);
    const max = parseInt(document.getElementById('new-promo-max').value) || 1;

    if (!code || !days) return showToast("⚠️ Заполните код и дни!");

    try {
        await db(`promocodes`, {
            method: 'POST',
            body: JSON.stringify({
                code: code,
                days: days,
                max_activations: max,
                used_count: 0
            })
        });
        showToast("✅ Промокод выпущен!");
        document.getElementById('new-promo-code').value = '';
        document.getElementById('new-promo-days').value = '';
    } catch(e) {
        showToast("Ошибка выпуска промокода");
    }
}

/* ====================================================
   ЖИВОЙ БАННЕР ОБЪЯВЛЕНИЙ
==================================================== */
async function loadLiveSiteBanner() {
    try {
        const [txtRes, actRes] = await Promise.all([
            db(`bot_config?key=eq.SITE_BANNER_TEXT`),
            db(`bot_config?key=eq.SITE_BANNER_ACTIVE`)
        ]);
        const bannerEl = document.getElementById('site-live-banner');
        if (actRes && actRes[0]?.value === 'true' && txtRes && txtRes[0]?.value) {
            bannerEl.style.display = 'block';
            document.getElementById('site-live-banner-text').innerText = txtRes[0].value;
        } else {
            bannerEl.style.display = 'none';
        }
    } catch(e) {}
}

async function adminUpdateBanner(isActive) {
    haptic('medium');
    const text = document.getElementById('admin-banner-text').value.trim();
    try {
        await Promise.all([
            db(`bot_config?key=eq.SITE_BANNER_TEXT`, { method: 'PATCH', body: JSON.stringify({ value: text }) }),
            db(`bot_config?key=eq.SITE_BANNER_ACTIVE`, { method: 'PATCH', body: JSON.stringify({ value: String(isActive) }) })
        ]);
        showToast(isActive ? "📢 Баннер опубликован!" : "Баннер скрыт");
        loadLiveSiteBanner();
    } catch(e) {
        showToast("Ошибка баннера");
    }
}

/* ====================================================
   СКАЧИВАНИЕ БАЗЫ (ФИКС ЧЕРНОГО ЭКРАНА)
==================================================== */
async function adminExportDatabase() {
    haptic('medium');
    showToast("⏳ Формирование базы...");
    try {
        const users = await db(`users?order=reg_date.desc`);
        if (!users || users.length === 0) return showToast("База пуста");

        let csv = "TG_ID,Username,First_Name,Sub_End,Is_Banned,Reg_Date,Ref_By\n";
        users.forEach(u => {
            csv += `"${u.tg_id}","${u.username || ''}","${(u.first_name || '').replace(/"/g, '""')}","${u.sub_end || ''}","${u.is_banned ? 'YES' : 'NO'}","${u.reg_date || ''}","${u.ref_by || ''}"\n`;
        });

        const fileName = `P2P_Users_${new Date().toISOString().slice(0,10)}.csv`;
        const blob = new Blob(["\uFEFF" + csv], { type: 'application/octet-stream;charset=utf-8;' });
        const fileUrl = URL.createObjectURL(blob);

        if (tg && typeof tg.downloadFile === 'function') {
            tg.downloadFile({ url: fileUrl, file_name: fileName }, (isDownloaded) => {
                if (isDownloaded) showToast("✅ Файл сохранен!");
                else fallbackDownload(fileUrl, fileName, csv);
            });
            return;
        }
        fallbackDownload(fileUrl, fileName, csv);
    } catch (e) {
        showToast("❌ Ошибка выгрузки");
    }
}

function exportTradesHistoryCsv() {
    if (userTrades.length === 0) return showToast("Сделок нет");
    let csv = "ID,Date,Type,Fiat,Crypto,Rate,Spread,Profit_RUB,Card_ID,Note\n";
    userTrades.forEach(t => {
        csv += `"${t.id}","${t.date}","${t.is_cycle ? 'CYCLE' : t.type}","${t.fiat_amount}","${t.crypto_amount}","${t.rate}","${t.cycle_spread || ''}","${t.cycle_profit_rub || ''}","${t.card_id || ''}","${t.note || ''}"\n`;
    });
    const fileName = `P2P_Trades_${new Date().toISOString().slice(0,10)}.csv`;
    const blob = new Blob(["\uFEFF" + csv], { type: 'application/octet-stream;charset=utf-8;' });
    const fileUrl = URL.createObjectURL(blob);
    fallbackDownload(fileUrl, fileName, csv);
}

function fallbackDownload(fileUrl, fileName, rawCsv) {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(rawCsv).then(() => {
                showToast("📥 Файл сохранен (и скопирован в буфер!)");
            }).catch(() => showToast("✅ Выгрузка завершена"));
        } else {
            showToast("✅ Выгрузка завершена");
        }
    }, 400);
}

/* ====================================================
   КЛАССИЧЕСКАЯ СДЕЛКА И КАССА КАРТ
==================================================== */
let currentType = 'buy';
let calcMode = 'fiat';

function setTradeType(type) {
    haptic('light');
    currentType = type;
    document.getElementById('btn-buy').className = `switch-btn ${type === 'buy' ? 'active buy' : ''}`;
    document.getElementById('btn-sell').className = `switch-btn ${type === 'sell' ? 'active sell' : ''}`;
    const btn = document.getElementById('btn-save');
    btn.className = `action-btn ${type === 'sell' ? 'sell-mode' : ''}`;
    checkTradeInputs();
}

function setCalcMode(mode) {
    haptic('light');
    calcMode = mode;
    document.getElementById('tab-mode-fiat').className = `p-tab ${mode === 'fiat' ? 'active' : ''}`;
    document.getElementById('tab-mode-crypto').className = `p-tab ${mode === 'crypto' ? 'active' : ''}`;
    const sym = getCurrencySymbol();
    document.getElementById('lbl-amount').innerHTML = mode === 'fiat' ? `Сумма фиата (<span class="sym">${sym}</span>)` : `Объем USDT (🪙)`;
    checkTradeInputs();
}

function checkTradeInputs() {
    const amount = parseFloat(document.getElementById('inp-amount').value);
    const rate = parseFloat(document.getElementById('inp-rate').value);
    const btn = document.getElementById('btn-save');
    const prev = document.getElementById('trade-preview');
    const prevText = document.getElementById('preview-text');
    const prevResult = document.getElementById('preview-result');

    if (amount > 0 && rate > 0) {
        const sym = getCurrencySymbol();
        prev.style.display = 'block';
        let fiat = 0, crypto = 0;

        if (calcMode === 'fiat') {
            fiat = amount;
            crypto = fiat / rate;
            prevText.innerText = "Расчетный объем USDT:";
            prevResult.innerText = `${crypto.toFixed(2)} USDT`;
        } else {
            crypto = amount;
            fiat = crypto * rate;
            prevText.innerText = "Расчетный фиат:";
            prevResult.innerText = `${fiat.toFixed(2)} ${sym}`;
        }
        btn.innerText = `СОХРАНИТЬ ${currentType === 'buy' ? 'ПОКУПКУ' : 'ПРОДАЖУ'}: ${fiat.toFixed(2)} ${sym}`;
        btn.style.display = 'block';
    } else {
        prev.style.display = 'none';
        btn.style.display = 'none';
    }
}

document.getElementById('inp-amount')?.addEventListener('input', checkTradeInputs);
document.getElementById('inp-rate')?.addEventListener('input', checkTradeInputs);

async function saveTrade() {
    const amount = parseFloat(document.getElementById('inp-amount').value);
    const rate = parseFloat(document.getElementById('inp-rate').value);
    const cardId = document.getElementById('inp-card-sel').value || null;
    if (!amount || !rate || amount <= 0 || rate <= 0) return;

    let fiat = calcMode === 'fiat' ? amount : parseFloat((amount * rate).toFixed(2));
    let crypto = calcMode === 'fiat' ? parseFloat((amount / rate).toFixed(2)) : amount;

    await db(`trades`, {
        method: 'POST',
        body: JSON.stringify({
            tg_id: currentUser.tg_id,
            type: currentType,
            crypto_amount: crypto,
            rate: rate,
            fiat_amount: fiat,
            card_id: cardId ? parseInt(cardId) : null
        })
    });

    playCashSound();
    document.getElementById('inp-amount').value = '';
    document.getElementById('inp-rate').value = '';
    checkTradeInputs();
    showToast("✅ Сделка сохранена!");
    haptic('success');
    await refreshData();
    renderAll();
    handleNavClick('dashboard', document.querySelector('.nav-btn[data-target="dashboard"]'));
}

function openNewCardModal() {
    haptic('light');
    document.getElementById('modal-card-create').classList.add('show');
}

async function submitCreateCard() {
    const name = document.getElementById('new-card-name').value.trim();
    const num = document.getElementById('new-card-num').value.trim();
    const holder = document.getElementById('new-card-holder').value.trim();
    const limit = parseFloat(document.getElementById('new-card-limit').value) || null;

    if (!name) return showToast("⚠️ Введите название карты");

    await db(`cards`, {
        method: 'POST',
        body: JSON.stringify({
            tg_id: currentUser.tg_id,
            card_name: name,
            card_number: num,
            holder_name: holder,
            buy_limit: limit
        })
    });
    closeModals();
    showToast("✅ Карта создана!");
    await refreshData();
    renderAll();
}

function openCardOpModal(cid, type) {
    haptic('light');
    activeCardId = cid;
    activeOpType = type;
    document.getElementById('modal-op-title').innerText = type === 'deposit' ? '➕ Пополнение кассы' : '➖ Снятие наличных';
    document.getElementById('modal-op-btn').innerText = type === 'deposit' ? 'Внести' : 'Списать';
    document.getElementById('withdraw-limit-toggle-wrap').style.display = type === 'withdraw' ? 'flex' : 'none';
    document.getElementById('modal-card-op').classList.add('show');
}

async function submitCardOp() {
    const amt = parseFloat(document.getElementById('card-op-amount').value);
    const comm = document.getElementById('card-op-comment').value.trim();
    const inLimit = document.getElementById('chk-op-in-limit').checked;
    if (!amt || amt <= 0) return;

    await db(`card_operations`, {
        method: 'POST',
        body: JSON.stringify({
            card_id: activeCardId,
            tg_id: currentUser.tg_id,
            type: activeOpType,
            amount: amt,
            comment: comm,
            count_in_limit: activeOpType === 'withdraw' ? inLimit : false
        })
    });
    closeModals();
    showToast("✅ Операция записана!");
    await refreshData();
    renderCards();
}

function openCardLimitModal(cid) {
    haptic('light');
    activeCardId = cid;
    document.getElementById('modal-card-limit').classList.add('show');
}

async function submitCardLimit() {
    const val = parseFloat(document.getElementById('card-limit-val').value) || null;
    await db(`cards?id=eq.${activeCardId}`, { method: 'PATCH', body: JSON.stringify({ buy_limit: val }) });
    closeModals();
    showToast("✅ Лимит обновлен!");
    await refreshData();
    renderCards();
}

/* ====================================================
   РЕДАКТИРОВАНИЕ СДЕЛКИ
==================================================== */
function openEditTradeModal(tid) {
    haptic('light');
    activeEditTradeId = tid;
    const tr = userTrades.find(x => x.id === tid);
    if (!tr) return;

    document.getElementById('modal-trade-id').innerText = `Сделка #${tid}`;
    document.getElementById('modal-inp-amount').value = tr.fiat_amount;
    document.getElementById('modal-rate').value = tr.rate;
    document.getElementById('modal-card-sel').value = tr.card_id || "";
    document.getElementById('modal-note').value = tr.note || "";
    document.getElementById('edit-modal').classList.add('show');
}

async function submitEditTrade() {
    const amt = parseFloat(document.getElementById('modal-inp-amount').value);
    const r = parseFloat(document.getElementById('modal-rate').value);
    const cid = document.getElementById('modal-card-sel').value || null;
    const note = document.getElementById('modal-note').value.trim();

    if (!amt || !r) return;

    await db(`trades?id=eq.${activeEditTradeId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            fiat_amount: amt,
            rate: r,
            crypto_amount: parseFloat((amt / r).toFixed(2)),
            card_id: cid ? parseInt(cid) : null,
            note: note
        })
    });
    closeModals();
    showToast("✏️ Сделка обновлена!");
    await refreshData();
    renderAll();
}

async function deleteTradeCloud(tid) {
    haptic('medium');
    if (!confirm("Удалить операцию?")) return;
    await db(`trades?id=eq.${tid}`, { method: 'DELETE' });
    showToast("🗑 Сделка удалена");
    await refreshData();
    renderAll();
}

/* ====================================================
   СЕРВИСНЫЕ И ИНТЕРФЕЙСНЫЕ ФУНКЦИИ
==================================================== */
function toggleSecondaryStats() {
    haptic('light');
    isSecondaryExpanded = !isSecondaryExpanded;
    document.getElementById('secondary-stats-wrap').style.display = isSecondaryExpanded ? 'block' : 'none';
    document.getElementById('txt-toggle-details').innerText = isSecondaryExpanded ? "📊 Скрыть подробную статистику" : "📊 Развернуть подробную статистику";
    document.getElementById('toggle-arrow').innerText = isSecondaryExpanded ? '▴' : '▾';
}

function setPeriod(p, el) {
    haptic('light');
    currentPeriod = p;
    document.querySelectorAll('.p-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('custom-date-panel').style.display = 'none';
    calculateStats();
}

function toggleCustomDatePanel(el) {
    haptic('light');
    const panel = document.getElementById('custom-date-panel');
    panel.style.display = (panel.style.display === 'none' || !panel.style.display) ? 'block' : 'none';
}

function setQuickPreset(days) {
    haptic('light');
    const now = new Date();
    const from = new Date(now);
    from.setDate(now.getDate() - days);
    const pad = n => String(n).padStart(2, '0');
    document.getElementById('custom-date-from').value = `${from.getFullYear()}-${pad(from.getMonth()+1)}-${pad(from.getDate())}`;
    document.getElementById('custom-date-to').value = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
    applyCustomDateFilter();
}

function applyCustomDateFilter() {
    const fVal = document.getElementById('custom-date-from').value;
    const tVal = document.getElementById('custom-date-to').value;
    if (!fVal || !tVal) return showToast("⚠️ Укажите даты");
    customStartDate = new Date(fVal + "T00:00:00");
    customEndDate = new Date(tVal + "T23:59:59");
    currentPeriod = 'custom';
    document.querySelectorAll('.p-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-custom').classList.add('active');
    calculateStats();
    showToast("📅 Период применен!");
}

function populateCardSelects() {
    const sel1 = document.getElementById('inp-card-sel');
    const sel2 = document.getElementById('modal-card-sel');
    const selCalc = document.getElementById('calc-card-sel');

    const opts = `<option value="">Без привязки к карте</option>` + userCards.map(c => `<option value="${c.id}">${c.card_name}</option>`).join('');
    if (sel1) sel1.innerHTML = opts;
    if (sel2) sel2.innerHTML = opts;
    if (selCalc) selCalc.innerHTML = opts;
}

function handleNavClick(targetId, el) {
    haptic('light');
    if (layoutMode === 'feed') {
        const target = document.getElementById(targetId);
        if (target) {
            target.classList.add('revealed');
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else {
        document.querySelectorAll('.page-section').forEach(sec => sec.style.display = 'none');
        const target = document.getElementById(targetId);
        if (target) {
            target.style.display = 'block';
            target.classList.add('revealed');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (el) el.classList.add('active');
}

function switchLayoutMode(isChecked) {
    haptic('medium');
    layoutMode = isChecked ? 'feed' : 'pages';
    localStorage.setItem('p2p_layout_mode', layoutMode);
    document.querySelectorAll('.page-section').forEach(sec => {
        if (sec.id !== 'admin-panel' && sec.id !== 'paywall') {
            sec.style.display = layoutMode === 'feed' ? 'block' : 'none';
        }
    });
    if (layoutMode !== 'feed') document.getElementById('dashboard').style.display = 'block';
    showToast(isChecked ? "📜 Режим ленты" : "📱 Режим экранов");
}

function switchUiMode(isChecked) {
    haptic('medium');
    uiMode = isChecked ? 'fx' : 'simple';
    localStorage.setItem('p2p_ui_mode', uiMode);
    document.body.className = uiMode === 'fx' ? 'mode-fx' : 'mode-simple';
    applyIncognito();
    showToast(isChecked ? "🌟 Полный FX" : "⚡️ Минимализм");
}

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('p2p_terminal_lang', lang);
    updateAllCurrencySymbols();
}

function changeLanguage(lang) {
    applyLanguage(lang);
    showToast("Язык обновлен");
    renderAll();
}

function openHelpModal(key, event) {
    if (event) event.stopPropagation();
    haptic('light');
    const item = HELP_DATA[key];
    if (!item) return;
    document.getElementById('info-modal-title').innerText = item.title;
    document.getElementById('info-modal-content').innerHTML = item.text;
    document.getElementById('modal-info').classList.add('show');
}

function openSubModal() {
    haptic('light');
    document.getElementById('modal-sub-info').classList.add('show');
}

function closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('show'));
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2300);
}

function haptic(type) {
    try {
        if (tg && tg.HapticFeedback) {
            if (type === 'light' || type === 'medium') tg.HapticFeedback.impactOccurred(type);
            if (type === 'success') tg.HapticFeedback.notificationOccurred('success');
        }
    } catch(e) {}
}

function copyRefLink() {
    haptic('light');
    const link = document.getElementById('ref-link-box').innerText;
    navigator.clipboard.writeText(link);
    showToast("Ссылка скопирована!");
}

function shareRefLink() {
    haptic('light');
    const link = document.getElementById('ref-link-box').innerText;
    if (tg && tg.openTelegramLink) {
        tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent('P2P Terminal Pro — Enterprise Ledger:')}`);
    }
}

function openSupport() {
    const url = "https://t.me/P2P_Rbot";
    if (tg && tg.openTelegramLink) tg.openTelegramLink(url);
    else window.open(url, '_blank');
}

/* ====================================================
   АДМИНКА
==================================================== */
async function checkAdminStatus(tgId) {
    try {
        const cfgRes = await db(`bot_config?key=eq.ADMIN_IDS`);
        if (cfgRes && cfgRes.length > 0) {
            adminIds = cfgRes[0].value.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
        }
        if (!adminIds.includes(SUPER_ADMIN_ID)) adminIds.push(SUPER_ADMIN_ID);

        const isAdmin = adminIds.includes(tgId);
        document.getElementById('admin-panel').style.display = isAdmin ? 'block' : 'none';
        document.getElementById('nav-btn-admin').style.display = isAdmin ? 'flex' : 'none';
        if (isAdmin) loadAdminConfigValues();
    } catch(e) {}
}

async function loadAdminConfigValues() {
    try {
        const configs = await db(`bot_config`);
        if (!configs) return;
        configs.forEach(item => {
            if (item.key === 'PRICE_MONTH') document.getElementById('cfg-inp-month').value = item.value;
            if (item.key === 'PRICE_FOREVER') document.getElementById('cfg-inp-forever').value = item.value;
            if (item.key === 'BYBIT_UID') document.getElementById('cfg-inp-uid').value = item.value;
            if (item.key === 'TRIAL_DAYS') document.getElementById('cfg-inp-trial').value = item.value;
            if (item.key === 'REF_BONUS_DAYS') document.getElementById('cfg-inp-ref').value = item.value;
            if (item.key === 'ADMIN_IDS') document.getElementById('cfg-inp-admin-ids').value = item.value;
        });
    } catch(e) {}
}

async function saveAdminConfig() {
    haptic('medium');
    try {
        await Promise.all([
            db(`bot_config?key=eq.PRICE_MONTH`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-month').value }) }),
            db(`bot_config?key=eq.PRICE_FOREVER`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-forever').value }) }),
            db(`bot_config?key=eq.BYBIT_UID`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-uid').value }) }),
            db(`bot_config?key=eq.TRIAL_DAYS`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-trial').value }) }),
            db(`bot_config?key=eq.REF_BONUS_DAYS`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-ref').value }) }),
            db(`bot_config?key=eq.ADMIN_IDS`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-admin-ids').value }) })
        ]);
        showToast("✅ Конфиг сохранен!");
    } catch(e) {
        showToast("Ошибка сохранения");
    }
}

async function adminUserAction(action) {
    const targetId = parseInt(document.getElementById('admin-target-uid').value);
    if (!targetId) return showToast("⚠️ Введите ID юзера!");
    const now = new Date();

    if (action === 'grant30') {
        now.setDate(now.getDate() + 30);
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ sub_end: now.toISOString(), is_banned: false }) });
        showToast(`✅ ID ${targetId}: +30 дней`);
    } else if (action === 'grantVIP') {
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ sub_end: "2100-01-01T00:00:00Z", is_banned: false }) });
        showToast(`✅ ID ${targetId}: VIP Навсегда`);
    } else if (action === 'revoke') {
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ sub_end: null }) });
        showToast(`❌ ID ${targetId}: Подписка снята`);
    } else if (action === 'ban') {
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ is_banned: true }) });
        showToast(`⛔️ ID ${targetId}: Забанен`);
    } else if (action === 'unban') {
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ is_banned: false }) });
        showToast(`🟢 ID ${targetId}: Разбанен`);
    }
}

async function adminInspectUser() {
    const targetId = parseInt(document.getElementById('admin-target-uid').value);
    if (!targetId) return showToast("⚠️ Введите ID!");
    const [uRes, tRes] = await Promise.all([
        db(`users?tg_id=eq.${targetId}`),
        db(`trades?tg_id=eq.${targetId}`)
    ]);
    const box = document.getElementById('admin-user-dossier');
    if (!uRes || uRes.length === 0) {
        box.style.display = 'block';
        box.innerHTML = `<span style="color: var(--bybit-red);">Пользователь не найден</span>`;
        return;
    }
    const u = uRes[0];
    box.style.display = 'block';
    box.innerHTML = `
        <div style="font-weight: 800; color: var(--bybit-yellow);">🔎 ДОСЬЕ: ${u.first_name || ''} (@${u.username || 'нет'})</div>
        ID: <code>${u.tg_id}</code> | Сделок: <b>${tRes ? tRes.length : 0}</b><br>
        Подписка: <b>${u.sub_end ? (new Date(u.sub_end).getFullYear() > 2099 ? 'VIP Навсегда' : new Date(u.sub_end).toLocaleDateString()) : 'Нет'}</b>
    `;
}

/* ====================================================
   ПОДПИСКА И СТАТУС
==================================================== */
function checkSubscription() {
    const badgeEl = document.getElementById('disp-tier-badge');
    if (currentUser.is_banned) {
        badgeEl.className = 'sub-tier-badge tier-expired';
        badgeEl.innerText = '⛔️ Banned';
        document.getElementById('paywall').style.display = 'block';
        return false;
    }
    if (!currentUser.sub_end) {
        badgeEl.className = 'sub-tier-badge tier-expired';
        badgeEl.innerText = '❌ No Pass';
        document.getElementById('paywall').style.display = 'block';
        return false;
    }

    const now = new Date();
    const end = new Date(currentUser.sub_end);
    if (end < now) {
        badgeEl.className = 'sub-tier-badge tier-expired';
        badgeEl.innerText = '⏳ Expired';
        document.getElementById('paywall').style.display = 'block';
        return false;
    }

    document.getElementById('paywall').style.display = 'none';
    if (end.getFullYear() > 2099) {
        badgeEl.className = 'sub-tier-badge tier-vip';
        badgeEl.innerText = '💎 VIP Lifetime';
    } else {
        badgeEl.className = 'sub-tier-badge tier-month';
        badgeEl.innerText = `⚡️ Premium (${end.toLocaleDateString()})`;
    }
    return true;
}

/* ====================================================
   ХОЛСТ БЛОКЧЕЙН ХЕШЕЙ
==================================================== */
function initBlockchainCanvas() {
    const canvas = document.getElementById('blockchain-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const hexChars = "0123456789ABCDEF";
    function randomHash(len=6) {
        let s = "0x";
        for (let i = 0; i < len; i++) s += hexChars[Math.floor(Math.random() * hexChars.length)];
        return s;
    }

    let nodes = [];
    for (let i = 0; i < 22; i++) {
        nodes.push({
            x: Math.random() * w, y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
            hash: randomHash(5), color: Math.random() > 0.5 ? '#f3a600' : '#2ebb9a'
        });
    }

    function draw() {
        if (uiMode === 'simple') return;
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0) n.x = w; if (n.x > w) n.x = 0;
            if (n.y < 0) n.y = h; if (n.y > h) n.y = 0;

            ctx.fillStyle = n.color === '#f3a600' ? 'rgba(243, 166, 0, 0.4)' : 'rgba(46, 187, 154, 0.4)';
            ctx.font = '9px monospace';
            ctx.fillText(n.hash, n.x, n.y);

            for (let j = i + 1; j < nodes.length; j++) {
                const n2 = nodes[j];
                const dx = n.x - n2.x, dy = n.y - n2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(n.x, n.y);
                    ctx.lineTo(n2.x, n2.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

/* ====================================================
   ИНИЦИАЛИЗАЦИЯ И СИНХРОНИЗАЦИЯ
==================================================== */
function renderAll() {
    updateAllCurrencySymbols();
    calculateStats();
    renderCards();
    renderHistory();
    populateCardSelects();
    applyIncognito();
}

async function refreshData() {
    if (!currentUser) return;
    const [u, c, t, o] = await Promise.all([
        db(`users?tg_id=eq.${currentUser.tg_id}`),
        db(`cards?tg_id=eq.${currentUser.tg_id}&order=created_at.asc`),
        db(`trades?tg_id=eq.${currentUser.tg_id}&order=date.desc`),
        db(`card_operations?tg_id=eq.${currentUser.tg_id}`)
    ]);
    if (u && u.length > 0) currentUser = u[0];
    userCards = c || [];
    userTrades = t || [];
    cardOps = o || [];
}

function forceHideLoader() {
    const loader = document.getElementById('terminal-boot-loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => { loader.style.display = 'none'; }, 300);
    }
    document.querySelector('.container').style.display = 'block';
    document.querySelector('.bottom-nav').style.display = 'flex';
}

async function init() {
    syncTelegramSafeAreas();
    applyIncognito();
    initBlockchainCanvas();

    const failsafe = setTimeout(forceHideLoader, 2500);
    const tgUser = tg?.initDataUnsafe?.user;

    if (!tgUser || !tgUser.id) {
        clearTimeout(failsafe);
        document.getElementById('terminal-boot-loader').style.display = 'none';
        document.getElementById('restricted-screen').style.display = 'flex';
        return;
    }

    try {
        let users = await db(`users?tg_id=eq.${tgUser.id}`);
        if (!users || users.length === 0) {
            const created = await db(`users`, {
                method: 'POST',
                body: JSON.stringify({ tg_id: tgUser.id, username: tgUser.username, first_name: tgUser.first_name })
            });
            currentUser = created ? created[0] : { tg_id: tgUser.id };
        } else {
            currentUser = users[0];
        }

        await refreshData();
        await checkAdminStatus(tgUser.id);
        await loadLiveSiteBanner();

        document.getElementById('disp-uid').innerText = currentUser.tg_id;
        document.getElementById('ref-link-box').innerText = `https://t.me/P2P_Rbot?start=${currentUser.tg_id}`;
    } catch(e) {
        console.error(e);
    } finally {
        clearTimeout(failsafe);
        forceHideLoader();
        renderAll();
        checkSubscription();
        runCalculator();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
