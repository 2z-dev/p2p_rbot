const API_URL = "https://slddpusuckhhvvetpgxa.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZGRwdXN1Y2toaHZ2ZXRwZ3hhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODYwNzMyMiwiZXhwIjoyMTA0MTgzMzIyfQ.obfZa6h7dKqVvzdHUAXRQ6TAZ8dSsmBZqmUCtBVO0QM";

const SUPER_ADMIN_ID = 5172556128;
let adminIds = [SUPER_ADMIN_ID];

/* ПОЛНЫЙ СПИСОК ПОДРОБНЫХ ВОПРОСИКОВ (?) */
const HELP_DATA = {
    incognito: {
        title: "🕶 РЕЖИМ ИНКОГНИТО",
        text: `Скрывает ваши балансы от чужих глаз в общественных местах.<br><br>
        При активации все заработанные рубли, балансы карт и обороты маскируются блюром. Проценты доходности (спред, ROI) остаются открытыми. Повторный клик мгновенно возвращает отображение цифр.`
    },
    total_profit: {
        title: "💰 ОБЩАЯ ПРИБЫЛЬ И ЛОГИКА",
        text: `<b>Прибыль формируется в двух валютах:</b><br><br>
        <b>1. Чистая в USDT:</b> <code>Покупка − Продажа</code> монет.<br>
        <b>2. Чистая в фиате (₽):</b> <code>Продажа − Покупка</code> фиата с карт.<br><br>
        <b>3. ОБЩАЯ ПРИБЫЛЬ:</b> переводит остаток USDT в рубли по среднему курсу: <code>Чистая ₽ + (Чистая USDT × Mid Price)</code>.`
    },
    period_compare: {
        title: "📈 СРАВНЕНИЕ ПЕРИОДОВ",
        text: `Сопоставляет заработанную чистую прибыль текущего периода с предыдущим таким же отрезком (сегодня со вчерашним днем, этот месяц с прошлым). Показывает ваш темп роста в процентах.`
    },
    spread: {
        title: "📊 СПРЕД СДЕЛКИ",
        text: `<b>Последний круг:</b> разница курсов крайней продажи и покупки: <code>((Продажа − Покупка) / Покупка) × 100%</code>.<br><br>
        <b>Средний за период:</b> средневзвешенный спред всех закрытых операций по формуле WAC.`
    },
    calculator: {
        title: "⚡️ КАЛЬКУЛЯТОР КРУГА",
        text: `Мгновенный расчет полного цикла (покупка + продажа). Вы вводите депозит и оба курса — калькулятор рассчитывает чистый спред и профит, сохраняя круг <b>единой записью</b> с привязкой к выбранной карте.`
    },
    calc_card: {
        title: "💳 ПРИВЯЗКА КАРТЫ К КРУГУ",
        text: `Если выбрать карту в калькуляторе, фиатный оборот круга и итоговый доход автоматически спишутся и начислятся на баланс именно этого счета.`
    },
    calendar: {
        title: "📅 КАЛЕНДАРЬ ДОХОДНОСТИ",
        text: `<b>Удержание (зажатие пальцем):</b> показывает быстрое превью профита и спреда без открытия окон.<br><br>
        <b>Обычный клик (тап):</b> открывает подробную карточку со списком всех сделок и оборотом за этот день.`
    },
    single_trade: {
        title: "⚡️ ЕДИНИЧНАЯ ОПЕРАЦИЯ",
        text: `Внесение отдельного ордера покупки или продажи, если вы работаете частями или фиксируете только одну сторону сделки.`
    },
    cards_control: {
        title: "💳 УПРАВЛЕНИЕ КАРТАМИ",
        text: `Список организован компактными строками. Нажатие на любую карту открывает нижнюю шторку, где можно отредактировать все параметры, скопировать реквизиты в 1 тап, пополнить кассу или запустить отлежку.`
    },
    card_sheet: {
        title: "⚙️ ПАРАМЕТРЫ КАРТЫ",
        text: `Здесь можно изменить название, номер карты/СБП, ФИО, текст шаблона для биржи, задать лимит, цвет полоски и сменить статус на <b>Отлежка 24ч</b> или <b>115-ФЗ</b> (сгоревшие карты уходят в самый низ списка).`
    },
    history_features: {
        title: "📜 ИСТОРИЯ И МЕТКИ",
        text: `Кнопка <b>🔁</b> мгновенно подставляет параметры сделки в калькулятор для нового круга.<br><br>
        Кнопка <b>✏️</b> позволяет отредактировать сумму, курс, добавить текстовую заметку и присвоить сделке цветной маркер из палитры.`
    },
    promocode: {
        title: "🎁 ПРОМОКОДЫ",
        text: `Введите кодовое слово для получения бонусных дней доступа к терминалу. Создаются администратором в панели управления.`
    },
    admin_broadcast: {
        title: "🤖 РАССЫЛКА В ТЕЛЕГРАМ",
        text: `Отправляет сообщение напрямую в личку каждому пользователю, зарегистрированному в базе бота. Используется токен вашего Telegram-бота.`
    },
    site_banner: {
        title: "📢 ЖИВОЙ БАННЕР САЙТА",
        text: `Отображает важную новость или акцию в самом верху терминала для всех посетителей одновременно.`
    },
    net_fiat: {
        title: "💳 ЧИСТАЯ В ФИАТЕ",
        text: `Разница между полученным и потраченным фиатом: <code>Продажи − Покупки</code>.`
    },
    net_usdt: {
        title: "🪙 ЧИСТАЯ В USDT",
        text: `Чистый остаток криптовалюты: <code>Купленный объем − Проданный объем</code>.`
    },
    mid_price: {
        title: "⚖️ MID PRICE",
        text: `Справедливая средняя цена исполнения: <code>(WAC Покупки + Ср. Продажа) / 2</code>.`
    },
    turnover: {
        title: "💸 ОБОРОТ",
        text: `Суммарный объем всех покупок и продаж за выбранный таймфрейм.`
    },
    wac: {
        title: "🛒 WAC ЗАКУПКА",
        text: `Weighted Average Cost — реальный средневзвешенный курс покупки монет.`
    },
    avg_sell: {
        title: "🏷 СРЕДНЯЯ ПРОДАЖА",
        text: `Средневзвешенный курс реализации USDT за выбранный период.`
    },
    roi: {
        title: "📈 ROI",
        text: `Процент отдачи на каждый прокрученный рубль оборота: <code>(Прибыль / Оборот) × 100%</code>.`
    },
    operations: {
        title: "🔢 СЧЕТЧИК",
        text: `Всего операций / Покупок / Продаж за таймфрейм.`
    },
    ui_mode: {
        title: "🎨 РЕЖИМ FX",
        text: `Минимализм — быстрая загрузка без движения фона. Полный FX — анимации и блокчейн-фон.`
    },
    referral: {
        title: "🤝 ПАРТНЕРСКАЯ СЕТЬ",
        text: `Приглашайте трейдеров и получайте бонусные дни подписки за каждого реферала.`
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
   НАСТРОЙКИ ПО УМОЛЧАНИЮ (МИНИМАЛИЗМ И ВКЛАДКИ)
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
let selectedTradeColor = 'none';
let isSecondaryExpanded = false;

// ПО УМОЛЧАНИЮ: simple (без анимаций) и pages (по раздельности)
let uiMode = localStorage.getItem('p2p_ui_mode') || 'simple';
let layoutMode = localStorage.getItem('p2p_layout_mode') || 'pages';
let isIncognito = localStorage.getItem('p2p_incognito') === 'true';
let soundEnabled = localStorage.getItem('p2p_sound_enabled') !== 'false';
let isHeatmapOpen = false;

/* ====================================================
   СЕТЕВОЙ МОДУЛЬ (SUPABASE)
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
   ЗВУК КАССЫ / МОНЕТ (WEB AUDIO API)
==================================================== */
function playCashSound() {
    if (!soundEnabled) return;
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioCtx.currentTime;

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
    showToast(isChecked ? "🔔 Звук включен" : "🔕 Звук выключен");
}

/* ====================================================
   ИНКОГНИТО
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
   СИНХРОНИЗАЦИЯ БЕЗОПАСНЫХ ЗОН
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

function getCurrencySymbol() {
    const map = {"RUB":"₽", "KZT":"₸", "UAH":"₴", "BYN":"Br", "USD":"$"};
    return map[currentUser?.currency || 'RUB'] || (currentUser?.currency || '₽');
}

function updateAllCurrencySymbols() {
    const sym = getCurrencySymbol();
    document.querySelectorAll('.sym').forEach(el => el.innerText = sym);
}

function animateNumber(element, target, prefix = '', suffix = '', decimals = 2, suffixSize = '13px') {
    if (!element) return;
    const current = target;
    const sign = current > 0 ? '+' : '';
    element.innerHTML = `${sign}${current.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    })} <span style="font-size: ${suffixSize}; color: var(--text-muted);">${suffix}</span>`;
}

/* ====================================================
   КАЛЬКУЛЯТОР КРУГА
==================================================== */
function runCalculator() {
    const fiat = parseFloat(document.getElementById('calc-fiat-amt')?.value) || 0;
    const buyRate = parseFloat(document.getElementById('calc-buy-rate')?.value) || 0;
    const sellRate = parseFloat(document.getElementById('calc-sell-rate')?.value) || 0;

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
        if (elBuyCrypto) elBuyCrypto.innerText = `${boughtUsdt.toFixed(2)} USDT`;
    } else if (elBuyCrypto) {
        elBuyCrypto.innerText = `0.00 USDT`;
    }

    if (fiat > 0 && sellRate > 0) {
        soldUsdt = fiat / sellRate;
        if (elSellCrypto) elSellCrypto.innerText = `${soldUsdt.toFixed(2)} USDT`;
    } else if (elSellCrypto) {
        elSellCrypto.innerText = `0.00 USDT`;
    }

    if (fiat > 0 && buyRate > 0 && sellRate > 0) {
        const spreadPct = ((sellRate - buyRate) / buyRate) * 100;
        const profitUsdt = boughtUsdt - soldUsdt;
        const midRate = (buyRate + sellRate) / 2;
        const profitFiat = profitUsdt * midRate;

        if (elSpread) {
            elSpread.innerText = (spreadPct > 0 ? "+" : "") + spreadPct.toFixed(2) + "%";
            elSpread.style.color = spreadPct >= 0 ? 'var(--bybit-yellow)' : 'var(--bybit-red)';
        }
        if (elProfitUsdt) {
            elProfitUsdt.innerText = (profitUsdt > 0 ? "+" : "") + profitUsdt.toFixed(2) + " USDT";
            elProfitUsdt.style.color = profitUsdt >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)';
        }
        if (elProfitFiat) {
            elProfitFiat.innerText = `≈ ${(profitFiat > 0 ? "+" : "")}${profitFiat.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${sym}`;
        }
    } else {
        if (elSpread) { elSpread.innerText = "0.00%"; elSpread.style.color = 'var(--text-main)'; }
        if (elProfitUsdt) { elProfitUsdt.innerText = "0.00 USDT"; elProfitUsdt.style.color = 'var(--text-main)'; }
        if (elProfitFiat) { elProfitFiat.innerText = `≈ 0.00 ${sym}`; }
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
   РАСЧЕТ СТАТИСТИКИ И СРАВНЕНИЕ
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
    if (elLastSpread) {
        elLastSpread.innerText = (lastSpread > 0 ? "+" : "") + lastSpread.toFixed(2) + "%";
        updateMetricColor(elLastSpread, lastSpread);
    }

    const elAvgSpread = document.getElementById('val-avg-spread');
    if (elAvgSpread) {
        elAvgSpread.innerText = (avgPeriodSpread > 0 ? "+" : "") + avgPeriodSpread.toFixed(2) + "%";
        updateMetricColor(elAvgSpread, avgPeriodSpread);
    }

    const roiEl = document.getElementById('val-roi');
    if (roiEl) {
        roiEl.innerText = (roi > 0 ? "+" : "") + roi.toFixed(2) + "%";
        updateMetricColor(roiEl, roi);
    }

    document.getElementById('val-wac').innerText = wac.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('val-avg-sell').innerText = avgSell.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('val-fiat-turn').innerText = `${fiatTurn.toLocaleString(undefined, {minimumFractionDigits: 0})} ${sym}`;
    document.getElementById('val-crypto-turn').innerText = `${cryptoTurn.toLocaleString(undefined, {minimumFractionDigits: 2})} USDT`;
    document.getElementById('val-trades-count').innerText = `${filtered.length} / ${buysCount} / ${sellsCount}`;

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
        compBadge.innerHTML = `🌱 Первый замер периода`;
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
   КАЛЕНДАРЬ: УДЕРЖАНИЕ (ПРЕВЬЮ) И КЛИК (СВОДКА)
==================================================== */
function toggleHeatmapPanel() {
    isHeatmapOpen = !isHeatmapOpen;
    document.getElementById('heatmap-panel').style.display = isHeatmapOpen ? 'block' : 'none';
    document.getElementById('heatmap-arrow').innerText = isHeatmapOpen ? '▴' : '▾';
    if (isHeatmapOpen) renderHeatmap();
}

let holdTimer = null;
let isHolding = false;

function renderHeatmap() {
    const container = document.getElementById('calendar-grid-container');
    if (!container) return;
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

        const cell = document.createElement('div');
        cell.className = `cal-day-cell ${colorClass}`;
        cell.innerText = day;

        // ОБРАБОТКА ЗАЖАТИЯ (LONG PRESS)
        const startHold = (e) => {
            isHolding = false;
            holdTimer = setTimeout(() => {
                isHolding = true;
                showHoldTooltip(day, profit, dayTrades.length);
                haptic('medium');
            }, 260);
        };

        const endHold = () => {
            clearTimeout(holdTimer);
            if (isHolding) {
                hideHoldTooltip();
                setTimeout(() => { isHolding = false; }, 50);
            }
        };

        cell.addEventListener('mousedown', startHold);
        cell.addEventListener('mouseup', endHold);
        cell.addEventListener('mouseleave', endHold);
        cell.addEventListener('touchstart', startHold, { passive: true });
        cell.addEventListener('touchend', endHold);
        cell.addEventListener('touchcancel', endHold);

        // ОБЫЧНЫЙ ТАП (ОТКРЫТИЕ ПОЛНОЦЕННОЙ СВОДКИ)
        cell.addEventListener('click', (e) => {
            if (isHolding) return;
            openDayDetailsModal(day, profit, dayTrades);
        });

        container.appendChild(cell);
    }
}

function showHoldTooltip(day, profit, count) {
    const tip = document.getElementById('calendar-hold-tooltip');
    if (!tip) return;
    const sym = getCurrencySymbol();
    tip.innerHTML = `
        <div style="font-size: 13px; font-weight: 800; color: var(--bybit-yellow); margin-bottom: 4px;">📅 ${day} число</div>
        <div style="font-size: 18px; font-weight: 900; color: ${profit >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)'}; margin-bottom: 2px;">
            ${profit > 0 ? '+' : ''}${profit.toLocaleString()} ${sym}
        </div>
        <div style="font-size: 11px; color: var(--text-muted);">Сделок закрыто: <b>${count}</b></div>
    `;
    tip.classList.add('show');
}

function hideHoldTooltip() {
    const tip = document.getElementById('calendar-hold-tooltip');
    if (tip) tip.classList.remove('show');
}

function openDayDetailsModal(day, profit, trades) {
    haptic('light');
    const modal = document.getElementById('modal-day-details');
    const title = document.getElementById('day-modal-date-title');
    const content = document.getElementById('day-modal-content');
    const sym = getCurrencySymbol();

    title.innerText = `📅 Сводка за ${day} число`;

    let tradesHtml = '';
    trades.forEach(t => {
        if (t.is_cycle) {
            tradesHtml += `
                <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); padding: 8px 10px; border-radius: 10px; margin-bottom: 6px; font-size: 11px;">
                    <div style="display: flex; justify-content: space-between; font-weight: 800;">
                        <span style="color: var(--bybit-yellow);">КРУГ ⚡️</span>
                        <span style="color: var(--bybit-green);">+${parseFloat(t.cycle_profit_rub || 0).toLocaleString()} ${sym}</span>
                    </div>
                    <div style="color: var(--text-muted); margin-top: 2px;">
                        ${t.buy_rate} → ${t.sell_rate} ${sym} | Спред: +${t.cycle_spread}%
                    </div>
                </div>
            `;
        } else {
            const isBuy = t.type === 'buy';
            tradesHtml += `
                <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); padding: 8px 10px; border-radius: 10px; margin-bottom: 6px; font-size: 11px;">
                    <div style="display: flex; justify-content: space-between; font-weight: 800;">
                        <span style="color: ${isBuy ? 'var(--bybit-green)' : 'var(--bybit-red)'};">${isBuy ? 'ПОКУПКА' : 'ПРОДАЖА'}</span>
                        <span>${parseFloat(t.fiat_amount || 0).toLocaleString()} ${sym}</span>
                    </div>
                    <div style="color: var(--text-muted); margin-top: 2px;">
                        ${t.crypto_amount} USDT / ${t.rate} ${sym}
                    </div>
                </div>
            `;
        }
    });

    content.innerHTML = `
        <div style="background: rgba(0,0,0,0.4); border-radius: 14px; padding: 12px; margin-bottom: 12px; text-align: center;">
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Итоговый профит дня</div>
            <div style="font-size: 24px; font-weight: 900; color: ${profit >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)'}; margin: 4px 0;">
                ${profit > 0 ? '+' : ''}${profit.toLocaleString()} ${sym}
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">Всего операций: <b>${trades.length}</b></div>
        </div>
        <div style="font-size: 12px; font-weight: 800; margin-bottom: 6px;">Операции за день:</div>
        <div style="max-height: 220px; overflow-y: auto;">
            ${trades.length > 0 ? tradesHtml : '<div style="color: var(--text-muted); font-size: 12px;">Сделок в этот день не зафиксировано.</div>'}
        </div>
    `;

    modal.classList.add('show');
}

function closeDayDetailsModal(e) {
    if (e.target.id === 'modal-day-details') {
        document.getElementById('modal-day-details').classList.remove('show');
    }
}

/* ====================================================
   КАРТЫ: КОМПАКТНЫЙ РЕЖИМ И ШТОРКА (BOTTOM SHEET)
==================================================== */
function renderCards() {
    const container = document.getElementById('cards-container');
    if (!container) return;
    container.innerHTML = '';
    if (userCards.length === 0) {
        container.innerHTML = `<div class="glass-card" style="text-align: center; color: var(--text-muted);">Карт пока нет. Создайте первую!</div>`;
        return;
    }

    const sym = getCurrencySymbol();

    // Сгоревшие карты (115-ФЗ) уходят строго в самый низ списка
    const sorted = [...userCards].sort((a, b) => {
        if (a.status === 'burned' && b.status !== 'burned') return 1;
        if (b.status === 'burned' && a.status !== 'burned') return -1;
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
                        ${c.status === 'cooldown' ? '<span style="font-size: 10px; color: var(--bybit-purple); font-weight: 800;">⏳ Отлежка</span>' : ''}
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

    // Заполнение полей редактирования
    document.getElementById('sheet-edit-name').value = activeSheetCard.card_name || '';
    document.getElementById('sheet-edit-number').value = activeSheetCard.card_number || '';
    document.getElementById('sheet-edit-bank').value = activeSheetCard.bank_name || '';
    document.getElementById('sheet-edit-holder').value = activeSheetCard.holder_name || '';
    document.getElementById('sheet-edit-note').value = activeSheetCard.requisition_note || '';
    document.getElementById('sheet-edit-limit').value = activeSheetCard.buy_limit || '';
    document.getElementById('sheet-edit-status').value = activeSheetCard.status || 'active';
    document.getElementById('sheet-edit-color').value = activeSheetCard.color_accent || '#f3a600';
    document.getElementById('sheet-edit-pinned').checked = Boolean(activeSheetCard.is_pinned);

    document.getElementById('sheet-card-burn-badge').style.display = activeSheetCard.status === 'burned' ? 'inline' : 'none';

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

function closeCardSheet(e) {
    if (!e || e.target.id === 'card-sheet-modal' || !e.target.closest) {
        document.getElementById('card-sheet-modal').classList.remove('show');
    }
}

async function saveAllCardChangesFromSheet() {
    if (!activeSheetCard) return;
    haptic('medium');

    const name = document.getElementById('sheet-edit-name').value.trim();
    const num = document.getElementById('sheet-edit-number').value.trim();
    const bank = document.getElementById('sheet-edit-bank').value.trim();
    const holder = document.getElementById('sheet-edit-holder').value.trim();
    const note = document.getElementById('sheet-edit-note').value.trim();
    const limit = parseFloat(document.getElementById('sheet-edit-limit').value) || null;
    const status = document.getElementById('sheet-edit-status').value;
    const color = document.getElementById('sheet-edit-color').value;
    const pinned = document.getElementById('sheet-edit-pinned').checked;

    if (!name) return showToast("⚠️ Название карты обязательно!");

    try {
        await db(`cards?id=eq.${activeSheetCard.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                card_name: name,
                card_number: num,
                bank_name: bank,
                holder_name: holder,
                requisition_note: note,
                buy_limit: limit,
                status: status,
                color_accent: color,
                is_pinned: pinned
            })
        });

        closeCardSheet();
        showToast("✅ Все параметры карты сохранены!");
        await refreshData();
        renderCards();
    } catch(e) {
        showToast("Ошибка сохранения параметров");
    }
}

function copyCardNumberOnly() {
    if (!activeSheetCard?.card_number) return showToast("⚠️ Номер карты не указан");
    navigator.clipboard.writeText(activeSheetCard.card_number);
    haptic('success');
    showToast("💳 Номер скопирован!");
}

function copyCardFullRequisites() {
    if (!activeSheetCard) return;
    const bank = activeSheetCard.bank_name || activeSheetCard.card_name;
    const num = activeSheetCard.card_number || 'Реквизиты не заданы';
    const holder = activeSheetCard.holder_name ? ` (${activeSheetCard.holder_name})` : '';
    const note = activeSheetCard.requisition_note || 'Оплата строго без копеек, третьих лиц не принимаю!';

    const text = `${bank}: ${num}${holder}. ${note}`;
    navigator.clipboard.writeText(text);
    haptic('success');
    showToast("📋 Шаблон скопирован!");
}

function openSheetCardOp(type) {
    document.getElementById('card-sheet-modal').classList.remove('show');
    openCardOpModal(activeCardId, type);
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
            bank_name: activeSheetCard.bank_name,
            holder_name: activeSheetCard.holder_name,
            requisition_note: activeSheetCard.requisition_note,
            buy_limit: activeSheetCard.buy_limit,
            color_accent: activeSheetCard.color_accent
        })
    });
    document.getElementById('card-sheet-modal').classList.remove('show');
    showToast("✅ Карта клонирована!");
    await refreshData();
    renderCards();
}

async function deleteCurrentCardFromSheet() {
    if (!confirm("Удалить карту? Сделки сохранятся.")) return;
    await db(`cards?id=eq.${activeCardId}`, { method: 'DELETE' });
    document.getElementById('card-sheet-modal').classList.remove('show');
    showToast("🗑 Карта удалена");
    await refreshData();
    renderAll();
}

/* ====================================================
   ИСТОРИЯ, ПОВТОР КРУГА И ПАЛИТРА
==================================================== */
function renderHistory() {
    const container = document.getElementById('history-container');
    if (!container) return;
    container.innerHTML = '';
    if (userTrades.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">Сделок пока нет.</div>`;
        return;
    }

    const sym = getCurrencySymbol();
    const tz = parseInt(currentUser?.tz_offset) || 3;

    const tagColorMap = {
        'green': 'var(--bybit-green)',
        'yellow': 'var(--bybit-yellow)',
        'blue': 'var(--bybit-blue)',
        'red': 'var(--bybit-red)',
        'purple': 'var(--bybit-purple)'
    };

    userTrades.forEach(t => {
        const d = new Date(t.date);
        d.setHours(d.getUTCHours() + tz);
        const dateStr = d.toLocaleDateString('ru-RU', {month:'short', day:'numeric'}) + ' ' + d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        const boundCard = userCards.find(c => c.id === t.card_id);
        const cardBadge = boundCard ? `<span class="card-pill">💳 ${boundCard.card_name}</span>` : '';

        const stripeColor = tagColorMap[t.tag_color] || 'transparent';

        if (t.is_cycle) {
            container.innerHTML += `
                <div class="history-item">
                    <div class="history-tag-stripe" style="background: ${stripeColor};"></div>
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
                    <div class="history-tag-stripe" style="background: ${stripeColor};"></div>
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

function selectTradeColor(color) {
    selectedTradeColor = color;
    document.querySelectorAll('.palette-chip').forEach(c => c.classList.remove('active'));
    document.querySelector(`.palette-chip[data-color="${color}"]`)?.classList.add('active');
}

function openEditTradeModal(tid) {
    haptic('light');
    activeEditTradeId = tid;
    const tr = userTrades.find(x => x.id === tid);
    if (!tr) return;

    document.getElementById('modal-trade-id').innerText = tr.is_cycle ? `Круг #${tid}` : `Сделка #${tid}`;
    document.getElementById('modal-inp-amount').value = tr.fiat_amount;
    document.getElementById('modal-rate').value = tr.rate;
    document.getElementById('modal-card-sel').value = tr.card_id || "";
    document.getElementById('modal-note').value = tr.note || "";

    selectTradeColor(tr.tag_color || 'none');
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
            note: note,
            tag_color: selectedTradeColor
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
   РАССЫЛКА В ТЕЛЕГРАМ-БОТА И БАННЕР САЙТА
==================================================== */
async function adminBroadcastToBot() {
    const token = document.getElementById('admin-bot-token').value.trim();
    const text = document.getElementById('admin-broadcast-text').value.trim();

    if (!token) return showToast("⚠️ Введите токен бота!");
    if (!text) return showToast("⚠️ Введите текст сообщения!");

    if (!confirm("Запустить рассылку всем пользователям из базы?")) return;

    haptic('medium');
    showToast("⏳ Запуск рассылки...");

    try {
        const users = await db(`users?select=tg_id`);
        if (!users || users.length === 0) return showToast("Юзеры не найдены");

        let success = 0;
        let errors = 0;

        for (let i = 0; i < users.length; i++) {
            const uid = users[i].tg_id;
            try {
                const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: uid,
                        text: text,
                        parse_mode: 'HTML'
                    })
                });
                if (res.ok) success++;
                else errors++;
            } catch(e) {
                errors++;
            }
            // Пауза 35 мс для обхода лимита 30 сообщений/сек
            await new Promise(r => setTimeout(r, 35));
        }

        showToast(`✅ Отправлено: ${success}, Ошибок: ${errors}`);
    } catch(e) {
        showToast("Ошибка рассылки");
    }
}

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
        showToast(isActive ? "📢 Баннер включен!" : "Баннер скрыт");
        loadLiveSiteBanner();
    } catch(e) {
        showToast("Ошибка баннера");
    }
}

/* ====================================================
   ГЕНЕРАТОР PNL-КАРТОЧЕК
==================================================== */
function generatePnlCard() {
    haptic('medium');
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 600, 360);
    grad.addColorStop(0, '#0d121c');
    grad.addColorStop(1, '#05070a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 360);

    ctx.strokeStyle = '#f3a600';
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 12, 576, 336);

    ctx.fillStyle = '#f3a600';
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillText('⚡️ P2P TERMINAL PRO — СВОДКА', 40, 55);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }), 40, 85);

    const lastSpread = document.getElementById('val-last-spread')?.innerText || '0.00%';
    const avgSpread = document.getElementById('val-avg-spread')?.innerText || '0.00%';
    const roi = document.getElementById('val-roi')?.innerText || '0.00%';
    const tradesCount = document.getElementById('val-trades-count')?.innerText || '0';

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
            body: JSON.stringify({ code: code, days: days, max_activations: max, used_count: 0 })
        });
        showToast("✅ Промокод выпущен!");
        document.getElementById('new-promo-code').value = '';
        document.getElementById('new-promo-days').value = '';
    } catch(e) {
        showToast("Ошибка выпуска промокода");
    }
}

/* ====================================================
   ЭКСПОРТ БАЗЫ (ФИКС ЧЕРНОГО ЭКРАНА)
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
   ОБЫЧНЫЕ ОПЕРАЦИИ И КАРТЫ
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
    const amount = parseFloat(document.getElementById('inp-amount')?.value);
    const rate = parseFloat(document.getElementById('inp-rate')?.value);
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
        if (prev) prev.style.display = 'none';
        if (btn) btn.style.display = 'none';
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
    const bank = document.getElementById('new-card-bank').value.trim();
    const holder = document.getElementById('new-card-holder').value.trim();
    const limit = parseFloat(document.getElementById('new-card-limit').value) || null;

    if (!name) return showToast("⚠️ Введите название карты");

    await db(`cards`, {
        method: 'POST',
        body: JSON.stringify({
            tg_id: currentUser.tg_id,
            card_name: name,
            card_number: num,
            bank_name: bank,
            holder_name: holder,
            buy_limit: limit,
            status: 'active'
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

/* ====================================================
   НАВИГАЦИЯ, ТАБЫ И РЕЖИМЫ ОТОБРАЖЕНИЯ
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
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else {
        document.querySelectorAll('.page-section').forEach(sec => sec.style.display = 'none');
        const target = document.getElementById(targetId);
        if (target) {
            target.style.display = 'block';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (el) el.classList.add('active');
}

function applyLayoutMode(mode) {
    layoutMode = mode;
    localStorage.setItem('p2p_layout_mode', mode);
    const toggleEl = document.getElementById('toggle-layout-mode');
    const descEl = document.getElementById('layout-mode-desc');

    if (mode === 'feed') {
        if (toggleEl) toggleEl.checked = true;
        if (descEl) descEl.innerText = "Сплошная лента (скролл)";
        document.querySelectorAll('.page-section').forEach(sec => {
            if (sec.id !== 'admin-panel' && sec.id !== 'paywall') {
                sec.style.display = 'block';
            }
        });
    } else {
        if (toggleEl) toggleEl.checked = false;
        if (descEl) descEl.innerText = "По отдельным экранам";
        document.querySelectorAll('.page-section').forEach(sec => sec.style.display = 'none');
        document.getElementById('dashboard').style.display = 'block';
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.nav-btn[data-target="dashboard"]')?.classList.add('active');
    }
}

function switchLayoutMode(isChecked) {
    haptic('medium');
    applyLayoutMode(isChecked ? 'feed' : 'pages');
    showToast(isChecked ? "📜 Режим общей ленты" : "📱 Режим экранов");
}

function applyUiMode(mode) {
    uiMode = mode;
    localStorage.setItem('p2p_ui_mode', mode);
    const toggleEl = document.getElementById('toggle-ui-mode');
    const descEl = document.getElementById('ui-mode-desc');

    if (mode === 'fx') {
        document.body.className = 'mode-fx';
        if (toggleEl) toggleEl.checked = true;
        if (descEl) descEl.innerText = "Полный FX (фон и анимации)";
    } else {
        document.body.className = 'mode-simple';
        if (toggleEl) toggleEl.checked = false;
        if (descEl) descEl.innerText = "Минимализм (без фона)";
    }
    applyIncognito();
}

function switchUiMode(isChecked) {
    haptic('medium');
    applyUiMode(isChecked ? 'fx' : 'simple');
    showToast(isChecked ? "🌟 Полный FX включен" : "⚡️ Минимализм включен");
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
    setTimeout(() => t.classList.remove('show'), 2200);
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
        setTimeout(() => { loader.style.display = 'none'; }, 250);
    }
    document.querySelector('.container').style.display = 'block';
    document.querySelector('.bottom-nav').style.display = 'flex';
}

async function init() {
    // 1. Применяем настройки безопасных зон
    syncTelegramSafeAreas();

    // 2. Применяем дефолты (минимализм и страницы)
    applyUiMode(uiMode);
    applyLayoutMode(layoutMode);
    applyIncognito();

    const failsafe = setTimeout(forceHideLoader, 2000);
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
