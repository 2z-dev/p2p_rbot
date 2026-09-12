/* ====================================================
   P2P TERMINAL PRO — CORE ENGINE v8.4.0 (FAIL-SAFE)
==================================================== */

const API_URL = "https://slddpusuckhhvvetpgxa.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZGRwdXN1Y2toaHZ2ZXRwZ3hhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODYwNzMyMiwiZXhwIjoyMTA0MTgzMzIyfQ.obfZa6h7dKqVvzdHUAXRQ6TAZ8dSsmBZqmUCtBVO0QM";

const SUPER_ADMIN_ID = 5172556128;
let adminIds = [SUPER_ADMIN_ID];

// БЕЗОПАСНАЯ РАБОТА С ХРАНИЛИЩЕМ (ЗАЩИТА ОТ ПАДЕНИЯ В TELEGRAM WEBVIEW)
const safeStorage = {
    get: (key, fallback = null) => {
        try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
    },
    set: (key, val) => {
        try { localStorage.setItem(key, val); } catch (e) {}
    }
};

/* ====================================================
   МУЛЬТИЯЗЫЧНЫЙ СЛОВАРЬ (7 ЯЗЫКОВ)
==================================================== */
const I18N = {
    ru: {
        accessDenied: "Доступ ограничен", accessDeniedDesc: "Терминал защищен и запускается через Telegram Mini App.", openBotBtn: "🚀 Открыть бота",
        tabToday: "За сегодня", tabMonth: "За месяц", tabAll: "Все время", tabCustom: "Свой период 📅",
        presetYesterday: "Вчера", preset7d: "7 дней", preset14d: "14 дней", preset30d: "30 дней", dateFrom: "С даты", dateTo: "По дату", btnApplyDate: "Применить ⚡️",
        totalProfitBadge: "💰 ОБЩАЯ ПРИБЫЛЬ", btnPnlCard: "📸 PnL-карточка", spreadBadge: "📊 СПРЕД СДЕЛОК", lastCycleTitle: "Последний круг", avgSpreadTitle: "Ср. за период",
        wacTimeframeHint: "По WAC за таймфрейм", showSecondary: "📊 Развернуть подробную статистику", hideSecondary: "📊 Скрыть подробную статистику",
        netIn: "Чистая в", formulaFiat: "Фиатный доход: Продажи − Покупки (строго разница поступившего и отданного фиата)",
        netInUsdt: "Чистая в USDT", formulaUsdt: "Крипто-остаток: Покупки − Продажи (чистые монеты на бирже)", midPriceHint: "⚖️ Средняя цена (Mid Price):",
        turnCombinedTitle: "💸 Оборот (Фиат / USDT)", statWac: "🛒 WAC Закупка", statAvgSell: "🏷 Ср. Продажа", statRoi: "📈 ROI от оборота", statOps: "🔢 Сделок / Покупок / Продаж",
        calcTitle: "⚡️ КАЛЬКУЛЯТОР КРУГА", calcBindCard: "Привязать карту к кругу", calcDealPrice: "Прайс сделки", calcBuyHeader: "ПОКУПКА 🟢", calcBuyRate: "Курс USDT",
        calcSellHeader: "ПРОДАЖА 🔴", calcSellRate: "Курс USDT", calcSpread: "Спред:", calcProfit: "Прибыль с круга:", calcSaveCycle: "Сохранить круг ✅", calcClear: "Очистить ❌",
        calendarMonthTitle: "📅 Календарь общей прибыли", calDragHint: "Зажмите и ведите пальцем", tradeTitle: "Новая операция", tradeSubtitle: "Внести единичный ордер в базу",
        buyBtn: "ПОКУПКА 🟢", sellBtn: "ПРОДАЖА 🔴", fiatAmountTab: "Сумма фиата", cryptoAmountTab: "Объем USDT (🪙)", rateUsdtLabel: "Курс USDT",
        bankCardOptionalLabel: "Банковская карта (Опционально)", saveTradeBtn: "СОХРАНИТЬ СДЕЛКУ", cardsTitle: "Мои карты", cardsSubtitle: "Две полоски расходов, лимиты и смены",
        btnTransfer: "🔄 Трансфер", btnCreateCard: "➕ Создать", historyTitle: "История операций", historySubtitle: "Синхронизированные сделки, круги и заметки",
        profileTitle: "Настройки", profileSubtitle: "Конфигурация интерфейса, валюты и промокоды", yourTgId: "ВАШ TELEGRAM ID", btnSubscription: "💎 Подписка",
        promocodeTitle: "🎁 Активация промокода", btnApply: "Применить", soundTitle: "Звук монет / кассы", soundDesc: "Аудио-эффект при сохранении",
        feedModeTitle: "Режим общей ленты", fxModeTitle: "Визуальные спецэффекты (FX)", langTitle: "Язык интерфейса (7 языков)", currTitle: "Базовая валюта",
        tzTitle: "Часовой пояс (UTC)", btnSupport: "👨‍💻 Служба поддержки", refTitle: "Партнерская сеть", refSubtitle: "Бонусные дни за приглашения",
        refWhyTitle: "В чем польза приглашать трейдеров:", refWhy1: "• +3 дня Premium за каждого активного приглашенного.", refWhy2: "• Рефералы навсегда закрепляются за вашим ID.", refWhy3: "• Неограниченная аналитика и облачный синхрон касс.",
        refLinkBadge: "Ваша партнерская ссылка", btnCopy: "📋 Скопировать", btnShare: "🚀 Отправить", paywallTitle: "Доступ к Терминалу 🔒",
        paywallDesc: "Оформите доступ для разблокировки всех функций", trialBadge: "Бесплатный доступ", trialText: "🎁 Пробный период 24 часа активируется в боте.",
        btnActivateTrial: "🎁 Активировать триал", plansBadge: "Тарифные планы", plansText: "Оплата и сверка перевода Bybit производятся в боте.", plan1Month: "1 Месяц", planForever: "Навсегда", btnBuySub: "💳 Оформить подписку",
        navDashboard: "Сводка", navTrade: "Сделка", navCards: "Карты", navHistory: "История", navSettings: "Настройки", navAdmin: "Админ"
    },
    en: {
        accessDenied: "Access Restricted", accessDeniedDesc: "Terminal is protected and opens in Telegram Mini App.", openBotBtn: "🚀 Open Telegram Bot",
        tabToday: "Today", tabMonth: "This Month", tabAll: "All Time", tabCustom: "Custom 📅", presetYesterday: "Yesterday", preset7d: "7 days", preset14d: "14 days", preset30d: "30 days",
        dateFrom: "From date", dateTo: "To date", btnApplyDate: "Apply ⚡️", totalProfitBadge: "💰 TOTAL PROFIT", btnPnlCard: "📸 PnL Card", spreadBadge: "📊 SPREAD ANALYSIS",
        lastCycleTitle: "Last Cycle", avgSpreadTitle: "Period Avg", wacTimeframeHint: "By WAC in timeframe", showSecondary: "📊 Expand Detailed Stats", hideSecondary: "📊 Hide Detailed Stats",
        netIn: "Net in", formulaFiat: "Fiat Profit: Sell − Buy (exact fiat cash difference)", netInUsdt: "Net in USDT", formulaUsdt: "Crypto Balance: Buy − Sell (pure coins on exchange)",
        midPriceHint: "⚖️ Mid Price:", turnCombinedTitle: "💸 Turnover (Fiat / USDT)", statWac: "🛒 WAC Buy Price", statAvgSell: "🏷 Avg Sell Price", statRoi: "📈 Turnover ROI", statOps: "🔢 Total / Buys / Sells",
        calcTitle: "⚡️ CYCLE CALCULATOR", calcBindCard: "Bind card to cycle", calcDealPrice: "Deal Budget", calcBuyHeader: "BUY 🟢", calcBuyRate: "USDT Rate", calcSellHeader: "SELL 🔴",
        calcSellRate: "USDT Rate", calcSpread: "Spread:", calcProfit: "Cycle profit:", calcSaveCycle: "Save Cycle ✅", calcClear: "Clear ❌", calendarMonthTitle: "📅 Total Profit Calendar",
        calDragHint: "Press and slide finger", tradeTitle: "New Trade", tradeSubtitle: "Record single order into ledger", buyBtn: "BUY 🟢", sellBtn: "SELL 🔴", fiatAmountTab: "Fiat Amount",
        cryptoAmountTab: "USDT Volume (🪙)", rateUsdtLabel: "USDT Rate", bankCardOptionalLabel: "Bank Card (Optional)", saveTradeBtn: "SAVE TRADE", cardsTitle: "My Cards", cardsSubtitle: "Dual limits, shifts & rest",
        btnTransfer: "🔄 Transfer", btnCreateCard: "➕ Add Card", historyTitle: "Operations History", historySubtitle: "Synchronized trades, cycles & notes", profileTitle: "Settings", profileSubtitle: "Interface config, currency and promos",
        yourTgId: "YOUR TELEGRAM ID", btnSubscription: "💎 Subscription", promocodeTitle: "🎁 Redeem Promocode", btnApply: "Apply", soundTitle: "Cash register sound", soundDesc: "Audio feedback on save",
        feedModeTitle: "Feed Layout Mode", fxModeTitle: "Visual Effects (FX)", langTitle: "App Language (7 languages)", currTitle: "Base Currency", tzTitle: "Timezone (UTC)", btnSupport: "👨‍💻 Support Center",
        refTitle: "Affiliate Network", refSubtitle: "Bonus days for invitations", refWhyTitle: "Why invite traders:", refWhy1: "• +3 days Premium per active invitee.", refWhy2: "• Referrals permanently bound to your ID.", refWhy3: "• Full ledger analytics & cloud sync.",
        refLinkBadge: "Your Invite Link", btnCopy: "📋 Copy", btnShare: "🚀 Share", paywallTitle: "Terminal Access 🔒", paywallDesc: "Subscribe to unlock all features", trialBadge: "Free Access",
        trialText: "🎁 24-hour trial activates in Telegram Bot.", btnActivateTrial: "🎁 Activate Trial", plansBadge: "Subscription Plans", plansText: "Payment is processed in bot.", plan1Month: "1 Month", planForever: "Lifetime", btnBuySub: "💳 Get Subscription",
        navDashboard: "Summary", navTrade: "Trade", navCards: "Cards", navHistory: "History", navSettings: "Settings", navAdmin: "Admin"
    },
    es: {}, fr: {}, de: {}, uk: {}, kk: {}
};

// Заполнение остальных языков русским резервом
['es', 'fr', 'de', 'uk', 'kk'].forEach(l => { I18N[l] = { ...I18N.ru }; });

const HELP_DATA = {
    total_profit: { title: "💰 ОБЩАЯ ПРИБЫЛЬ", text: "Общая прибыль = Чистая в фиате + (Чистая в USDT × Mid Price). Все дни календаря совпадают с этой суммой." },
    net_fiat: { title: "💵 ЧИСТАЯ В ФИАТЕ", text: "Разница поступившего и отданного фиата на картах." },
    net_usdt: { title: "🪙 ЧИСТАЯ В USDT", text: "Разница купленного и проданного объема крипты." },
    mid_price: { title: "⚖️ MID PRICE", text: "Средневзвешенная цена курса между закупкой и сбросом." },
    calendar: { title: "📅 КАЛЕНДАРЬ", text: "Зажмите день и ведите пальцем для быстрого просмотра общей прибыли. Стрелки ‹ › листают месяцы." }
};

const tg = window.Telegram?.WebApp;
try { tg?.expand(); tg?.ready(); } catch(e) {}

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
let activeSelectedDealColor = 'default';
let activeSelectedCardColor = '#f3a600';

let isSecondaryExpanded = false;
let isHeatmapOpen = false;
let calViewDate = new Date();

const ITEMS_PER_PAGE = 25;
const MAX_PAGES = 4;
let cardsCurrentPage = 1;
let historyCurrentPage = 1;

let rawAdminUsersList = [];
let adminDbFilterOnlySub = true;

const DEFAULT_CARD_TEMPLATE = "{bank}: {number} ({holder})\nОплата строго со своего счета! Третьих лиц не принимаю, чек обязателен.";
let globalMessageTemplate = safeStorage.get('p2p_card_msg_template', DEFAULT_CARD_TEMPLATE);

let currentLang = safeStorage.get('p2p_terminal_lang', 'ru');
let uiMode = safeStorage.get('p2p_ui_mode', 'simple');
let layoutMode = safeStorage.get('p2p_layout_mode', 'pages');
let isIncognito = safeStorage.get('p2p_incognito', 'false') === 'true';
let soundEnabled = safeStorage.get('p2p_sound_enabled', 'true') !== 'false';

/* ====================================================
   СЕТЕВОЙ МОДУЛЬ С ТАЙМ-АУТОМ 3.5 СЕКУНДЫ (НЕ ЗАВИСАЕТ)
==================================================== */
async function db(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const headers = {
        "apikey": API_KEY,
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "Prefer": options.prefer || "return=representation",
        ...(options.headers || {})
    };

    try {
        const res = await fetch(`${API_URL}/${endpoint}`, { ...options, headers, signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) return null;
        const txt = await res.text();
        return txt ? JSON.parse(txt) : null;
    } catch (e) {
        clearTimeout(timeoutId);
        return null;
    }
}

function hasActiveSubscription() {
    if (!currentUser) return false;
    if (currentUser.is_banned) return false;
    if (!currentUser.sub_end) return false;
    return new Date(currentUser.sub_end) > new Date();
}

function requireSubscription(actionCallback) {
    if (!hasActiveSubscription()) {
        haptic('medium');
        openSubModal();
        showToast("⚠️ Требуется активная подписка!");
        return false;
    }
    if (typeof actionCallback === 'function') actionCallback();
    return true;
}

function playCashSound() {
    if (!soundEnabled) return;
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        const audioCtx = new AudioContextClass();
        const now = audioCtx.currentTime;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1046.50, now);
        osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    } catch(e) {}
}

function switchSoundMode(isChecked) {
    soundEnabled = isChecked;
    safeStorage.set('p2p_sound_enabled', isChecked);
    showToast(isChecked ? "🔔 Звук включен" : "🔕 Звук выключен");
}

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
    isIncognito = !isIncognito;
    safeStorage.set('p2p_incognito', isIncognito);
    applyIncognito();
    showToast(isIncognito ? "🕶 Балансы скрыты" : "👁 Балансы открыты");
}

function getCurrencySymbol() {
    const map = { "RUB": "₽", "KZT": "₸", "UAH": "₴", "BYN": "Br", "USD": "$" };
    return map[currentUser?.currency || 'RUB'] || "₽";
}

function updateAllCurrencySymbols() {
    const sym = getCurrencySymbol();
    document.querySelectorAll('.sym').forEach(el => el.innerText = sym);
}

async function changeCurrency(val) {
    if (!currentUser) return;
    currentUser.currency = val;
    updateAllCurrencySymbols();
    await db(`users?tg_id=eq.${currentUser.tg_id}`, { method: 'PATCH', body: JSON.stringify({ currency: val }) });
    renderAll();
    showToast(`Валюта: ${val}`);
}

async function updateTimezone(tzVal) {
    if (!currentUser) return;
    currentUser.tz_offset = parseInt(tzVal);
    await db(`users?tg_id=eq.${currentUser.tg_id}`, { method: 'PATCH', body: JSON.stringify({ tz_offset: currentUser.tz_offset }) });
    renderAll();
    showToast(`Часовой пояс: UTC+${tzVal}`);
}

function applyLanguage(lang) {
    currentLang = lang;
    safeStorage.set('p2p_terminal_lang', lang);
    const dict = I18N[lang] || I18N.ru;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.innerText = dict[key];
    });

    const tBtn = document.getElementById('txt-toggle-details');
    if (tBtn) tBtn.innerText = isSecondaryExpanded ? dict.hideSecondary : dict.showSecondary;
    updateAllCurrencySymbols();
}

function changeLanguage(lang) {
    applyLanguage(lang);
    showToast("Язык обновлен");
    renderAll();
}

async function loadLiveSiteBanner() {
    const bannerEl = document.getElementById('site-live-banner');
    const textEl = document.getElementById('site-live-banner-text');
    if (!bannerEl || !textEl) return;

    const [txtRes, actRes] = await Promise.all([
        db(`bot_config?key=eq.SITE_BANNER_TEXT`),
        db(`bot_config?key=eq.SITE_BANNER_ACTIVE`)
    ]);

    const bannerText = txtRes?.[0]?.value || "";
    const isActive = actRes?.[0]?.value === 'true' || actRes?.[0]?.value === true;

    if (isActive && bannerText.trim().length > 0) {
        textEl.innerText = bannerText;
        bannerEl.className = 'banner-active';
        const adminInp = document.getElementById('admin-banner-text');
        if (adminInp) adminInp.value = bannerText;
    } else {
        textEl.innerText = '';
        bannerEl.className = 'banner-empty';
    }
}

async function adminUpdateBanner(isActive) {
    const text = document.getElementById('admin-banner-text')?.value?.trim() || '';
    await Promise.all([
        db(`bot_config?key=eq.SITE_BANNER_TEXT`, { method: 'PATCH', body: JSON.stringify({ value: text }) }),
        db(`bot_config?key=eq.SITE_BANNER_ACTIVE`, { method: 'PATCH', body: JSON.stringify({ value: String(isActive) }) })
    ]);
    showToast(isActive ? "📢 Баннер включен" : "Баннер скрыт");
    await loadLiveSiteBanner();
}

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

    let boughtUsdt = (fiat > 0 && buyRate > 0) ? fiat / buyRate : 0;
    let soldUsdt = (fiat > 0 && sellRate > 0) ? fiat / sellRate : 0;

    if (elBuyCrypto) elBuyCrypto.innerText = `${boughtUsdt.toFixed(2)} USDT`;
    if (elSellCrypto) elSellCrypto.innerText = `${soldUsdt.toFixed(2)} USDT`;

    if (fiat > 0 && buyRate > 0 && sellRate > 0) {
        const spreadPct = ((sellRate - buyRate) / buyRate) * 100;
        const profitUsdt = boughtUsdt - soldUsdt;
        const profitFiat = profitUsdt * ((buyRate + sellRate) / 2);

        if (elSpread) {
            elSpread.innerText = (spreadPct > 0 ? "+" : "") + spreadPct.toFixed(2) + "%";
            elSpread.style.color = spreadPct >= 0 ? 'var(--bybit-yellow)' : 'var(--bybit-red)';
        }
        if (elProfitUsdt) {
            elProfitUsdt.innerText = (profitUsdt > 0 ? "+" : "") + profitUsdt.toFixed(2) + " USDT";
            elProfitUsdt.style.color = profitUsdt >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)';
        }
        if (elProfitFiat) {
            elProfitFiat.innerText = `≈ ${(profitFiat > 0 ? "+" : "")}${profitFiat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${sym}`;
        }
    } else {
        if (elSpread) elSpread.innerText = "0.00%";
        if (elProfitUsdt) elProfitUsdt.innerText = "0.00 USDT";
        if (elProfitFiat) elProfitFiat.innerText = `≈ 0.00 ${sym}`;
    }
}

document.getElementById('calc-fiat-amt')?.addEventListener('input', runCalculator);
document.getElementById('calc-buy-rate')?.addEventListener('input', runCalculator);
document.getElementById('calc-sell-rate')?.addEventListener('input', runCalculator);

async function saveCalculatedCycle() {
    if (!requireSubscription()) return;

    const fiat = parseFloat(document.getElementById('calc-fiat-amt')?.value);
    const buyRate = parseFloat(document.getElementById('calc-buy-rate')?.value);
    const sellRate = parseFloat(document.getElementById('calc-sell-rate')?.value);
    const cardId = document.getElementById('calc-card-sel')?.value || null;

    if (!fiat || !buyRate || !sellRate || fiat <= 0 || buyRate <= 0 || sellRate <= 0) {
        showToast("⚠️ Заполните сумму и оба курса!");
        return;
    }

    const boughtUsdt = parseFloat((fiat / buyRate).toFixed(2));
    const soldUsdt = parseFloat((fiat / sellRate).toFixed(2));
    const spreadPct = parseFloat((((sellRate - buyRate) / buyRate) * 100).toFixed(2));
    const profitUsdt = parseFloat((boughtUsdt - soldUsdt).toFixed(2));
    const profitFiat = parseFloat((profitUsdt * ((buyRate + sellRate) / 2)).toFixed(2));

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
    showToast("✅ Круг сохранен!");
    await refreshData();
    renderAll();
}

function clearCalculator() {
    const f = document.getElementById('calc-fiat-amt');
    const b = document.getElementById('calc-buy-rate');
    const s = document.getElementById('calc-sell-rate');
    if (f) f.value = '10000';
    if (b) b.value = '';
    if (s) s.value = '';
    runCalculator();
    showToast("Калькулятор очищен");
}

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
            bF += f; sF += f; bC += c;
            sC += (t.sell_rate ? f / parseFloat(t.sell_rate) : c);
            buysCount++; sellsCount++;
            cycleProfitFiatTotal += parseFloat(t.cycle_profit_rub || 0);
        } else if (t.type === 'buy') {
            bF += f; bC += c; buysCount++;
        } else {
            sF += f; sC += c; sellsCount++;
        }
    });

    const wac = bC > 0 ? bF / bC : 0;
    const avgSell = sC > 0 ? sF / sC : 0;
    const midPrice = (wac > 0 && avgSell > 0) ? (wac + avgSell) / 2 : (wac || avgSell || 0);

    const profitFiat = (sF - bF) + cycleProfitFiatTotal;
    const profitUsdt = bC - sC;
    const totalProfitFiat = profitFiat + (profitUsdt * midPrice);
    const totalProfitUsdt = profitUsdt + (midPrice > 0 ? profitFiat / midPrice : 0);

    const avgPeriodSpread = (wac > 0 && avgSell > 0) ? ((avgSell / wac) - 1) * 100 : 0;
    const fiatTurn = bF + sF;
    const cryptoTurn = bC + sC;
    const roi = fiatTurn > 0 ? (totalProfitFiat / fiatTurn) * 100 : 0;
    const sym = getCurrencySymbol();

    const elTotalFiat = document.getElementById('val-total-profit-rub');
    if (elTotalFiat) {
        elTotalFiat.style.color = totalProfitFiat < 0 ? 'var(--bybit-red)' : (totalProfitFiat > 0 ? 'var(--bybit-green)' : 'var(--text-main)');
        elTotalFiat.innerHTML = `${totalProfitFiat > 0 ? '+' : ''}${totalProfitFiat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="font-size: 18px; color: var(--text-muted);">${sym}</span>`;
    }

    const elTotalUsdt = document.getElementById('val-total-profit-usdt');
    if (elTotalUsdt) {
        elTotalUsdt.innerText = `${totalProfitUsdt > 0 ? '+' : ''}${totalProfitUsdt.toFixed(2)} USDT`;
    }

    const elProfitFiat = document.getElementById('val-profit-rub');
    if (elProfitFiat) elProfitFiat.innerText = `${profitFiat > 0 ? '+' : ''}${profitFiat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${sym}`;

    const elProfitUsdt = document.getElementById('val-profit-usdt');
    if (elProfitUsdt) elProfitUsdt.innerText = `${profitUsdt > 0 ? '+' : ''}${profitUsdt.toFixed(2)} USDT`;

    const elMidPrice = document.getElementById('hint-mid-price');
    if (elMidPrice) elMidPrice.innerText = midPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const elAvgSpread = document.getElementById('val-avg-spread');
    if (elAvgSpread) elAvgSpread.innerText = (avgPeriodSpread > 0 ? "+" : "") + avgPeriodSpread.toFixed(2) + "%";

    const roiEl = document.getElementById('val-roi');
    if (roiEl) roiEl.innerText = (roi > 0 ? "+" : "") + roi.toFixed(2) + "%";

    const elWac = document.getElementById('val-wac');
    if (elWac) elWac.innerText = wac.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const elAvgSell = document.getElementById('val-avg-sell');
    if (elAvgSell) elAvgSell.innerText = avgSell.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const elFiatTurn = document.getElementById('val-fiat-turn');
    if (elFiatTurn) elFiatTurn.innerText = `${fiatTurn.toLocaleString(undefined, { minimumFractionDigits: 0 })} ${sym}`;

    const elCryptoTurn = document.getElementById('val-crypto-turn');
    if (elCryptoTurn) elCryptoTurn.innerText = `${cryptoTurn.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT`;

    const elTradesCount = document.getElementById('val-trades-count');
    if (elTradesCount) elTradesCount.innerText = `${filtered.length} / ${buysCount} / ${sellsCount}`;

    if (isHeatmapOpen) renderHeatmap();
}

function toggleHeatmapPanel() {
    isHeatmapOpen = !isHeatmapOpen;
    const panel = document.getElementById('heatmap-panel');
    const arrow = document.getElementById('heatmap-arrow');
    if (panel) panel.style.display = isHeatmapOpen ? 'block' : 'none';
    if (arrow) arrow.innerText = isHeatmapOpen ? '▴' : '▾';
    if (isHeatmapOpen) {
        calViewDate = new Date();
        renderHeatmap();
    }
}

function navigateCalendarMonth(delta) {
    calViewDate.setMonth(calViewDate.getMonth() + delta);
    renderHeatmap();
}

function resetCalendarToCurrentMonth() {
    calViewDate = new Date();
    renderHeatmap();
}

function renderHeatmap() {
    const container = document.getElementById('calendar-grid-container');
    const popup = document.getElementById('calendar-floating-popup');
    if (!container) return;
    container.innerHTML = '';

    ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].forEach(d => container.innerHTML += `<div class="cal-head">${d}</div>`);

    const year = calViewDate.getFullYear();
    const month = calViewDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;

    const monthTitle = document.getElementById('heatmap-month-title');
    if (monthTitle) {
        monthTitle.innerText = calViewDate.toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-US', { month: 'long', year: 'numeric' }).toUpperCase();
    }

    for (let i = 0; i < firstDayIndex; i++) container.innerHTML += `<div></div>`;

    const monthTrades = userTrades.filter(t => {
        const d = new Date(t.date);
        return d.getFullYear() === year && d.getMonth() === month;
    });

    let mBF = 0, mBC = 0, mSF = 0, mSC = 0;
    monthTrades.forEach(t => {
        const f = parseFloat(t.fiat_amount || 0);
        const c = parseFloat(t.crypto_amount || 0);
        if (t.is_cycle) {
            mBF += f; mSF += f; mBC += c;
            mSC += (t.sell_rate ? f / parseFloat(t.sell_rate) : c);
        } else if (t.type === 'buy') {
            mBF += f; mBC += c;
        } else {
            mSF += f; mSC += c;
        }
    });
    const mWac = mBC > 0 ? (mBF / mBC) : 0;
    const mAvgSell = mSC > 0 ? (mSF / mSC) : 0;
    const calMonthMidPrice = (mWac > 0 && mAvgSell > 0) ? (mWac + mAvgSell) / 2 : (mWac || mAvgSell || 90);

    const dayCellsData = {};

    for (let day = 1; day <= totalDays; day++) {
        const dayTrades = monthTrades.filter(t => new Date(t.date).getDate() === day);

        let dayProfitFiat = 0, dayBoughtUsdt = 0, daySoldUsdt = 0, dayTurnover = 0;
        dayTrades.forEach(t => {
            const f = parseFloat(t.fiat_amount || 0);
            const c = parseFloat(t.crypto_amount || 0);
            dayTurnover += f;
            if (t.is_cycle) {
                dayProfitFiat += parseFloat(t.cycle_profit_rub || 0);
            } else if (t.type === 'buy') {
                dayProfitFiat -= f; dayBoughtUsdt += c;
            } else {
                dayProfitFiat += f; daySoldUsdt += c;
            }
        });

        const totalDayProfit = dayProfitFiat + ((dayBoughtUsdt - daySoldUsdt) * calMonthMidPrice);

        let colorClass = '';
        if (dayTrades.length > 0) {
            if (totalDayProfit > 10000) colorClass = 'profit-pos-high';
            else if (totalDayProfit > 2500) colorClass = 'profit-pos-mid';
            else if (totalDayProfit >= 0) colorClass = 'profit-pos-low';
            else colorClass = 'profit-neg';
        }

        dayCellsData[day] = { day, profit: totalDayProfit, count: dayTrades.length, turnover: dayTurnover };

        const cell = document.createElement('div');
        cell.className = `cal-day-cell ${colorClass}`;
        cell.dataset.day = String(day);
        cell.innerText = day;
        container.appendChild(cell);
    }

    let isTouching = false;
    let currentHoverDay = null;

    function updateFloatingPopup(dayNum) {
        if (!dayNum || !dayCellsData[dayNum] || !popup) return;
        const data = dayCellsData[dayNum];
        const sym = getCurrencySymbol();

        document.getElementById('pop-date').innerText = `${data.day} ${monthTitle?.innerText || ''}`;
        const pVal = document.getElementById('pop-profit');
        pVal.innerText = `${(data.profit >= 0 ? '+' : '')}${data.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${sym}`;
        pVal.style.color = data.profit >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)';

        const spreadCalc = data.turnover > 0 ? ((data.profit / data.turnover) * 100).toFixed(2) : "0.00";
        document.getElementById('pop-extra').innerText = `${data.count} сдел. • ${spreadCalc}%`;
        popup.classList.add('show');
    }

    function hideFloatingPopup() {
        isTouching = false;
        currentHoverDay = null;
        if (popup) popup.classList.remove('show');
        container.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('touch-active'));
    }

    function handlePointerAt(clientX, clientY) {
        const el = document.elementFromPoint(clientX, clientY);
        const cell = el ? el.closest('.cal-day-cell') : null;
        if (cell && cell.dataset.day && cell.dataset.day !== currentHoverDay) {
            currentHoverDay = cell.dataset.day;
            container.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('touch-active'));
            cell.classList.add('touch-active');
            updateFloatingPopup(currentHoverDay);
        }
    }

    container.onpointerdown = (e) => { isTouching = true; handlePointerAt(e.clientX, e.clientY); };
    container.onpointermove = (e) => { if (isTouching) handlePointerAt(e.clientX, e.clientY); };
    window.addEventListener('pointerup', hideFloatingPopup);
    window.addEventListener('pointercancel', hideFloatingPopup);

    container.onclick = (e) => {
        const cell = e.target.closest('.cal-day-cell');
        if (cell && cell.dataset.day && dayCellsData[cell.dataset.day]) {
            const data = dayCellsData[cell.dataset.day];
            openDayDetailsModal(data.day, data.profit, data.count, data.turnover);
        }
    };
}

function openDayDetailsModal(day, profit, count, turnover) {
    const sym = getCurrencySymbol();
    document.getElementById('day-modal-title').innerText = `📅 Сводка за ${day} число`;
    const profitEl = document.getElementById('day-modal-profit-val');
    profitEl.innerText = `${(profit >= 0 ? '+' : '')}${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${sym}`;
    profitEl.style.color = profit >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)';
    document.getElementById('day-modal-trades-cnt').innerText = `${count} сделок`;
    document.getElementById('day-modal-turnover-val').innerText = `${turnover.toLocaleString(undefined, { minimumFractionDigits: 2 })} ${sym}`;
    document.getElementById('day-modal-spread-val').innerText = `${count > 0 && turnover > 0 ? ((profit / turnover) * 100).toFixed(2) : "0.00"}%`;
    document.getElementById('modal-day-details')?.classList.add('show');
}

function renderCards() {
    const container = document.getElementById('cards-container');
    const paginationContainer = document.getElementById('cards-pagination');
    if (!container) return;
    container.innerHTML = '';

    if (userCards.length === 0) {
        container.innerHTML = `<div class="glass-card" style="text-align: center; color: var(--text-muted); padding: 20px;">Карт пока нет. Создайте первую карту!</div>`;
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    const sym = getCurrencySymbol();
    const sorted = [...userCards].sort((a, b) => {
        if (a.status === 'burned') return 1;
        if (b.status === 'burned') return -1;
        return (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0);
    });

    const totalPages = Math.min(MAX_PAGES, Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE)));
    if (cardsCurrentPage > totalPages) cardsCurrentPage = totalPages;

    const pageItems = sorted.slice((cardsCurrentPage - 1) * ITEMS_PER_PAGE, cardsCurrentPage * ITEMS_PER_PAGE);
    const now = new Date();

    pageItems.forEach(c => {
        const cTrades = userTrades.filter(tr => tr.card_id === c.id);
        const spentBuyAll = cTrades.filter(tr => tr.type === 'buy').reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
        const gainSellAll = cTrades.filter(tr => tr.type === 'sell').reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
        const deps = cardOps.filter(o => o.card_id === c.id && o.type === 'deposit').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
        const wdrs = cardOps.filter(o => o.card_id === c.id && o.type === 'withdraw').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
        const balance = deps - wdrs + gainSellAll - spentBuyAll;

        const spentToday = cTrades.filter(tr => tr.type === 'buy' && new Date(tr.date).toDateString() === now.toDateString()).reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
        const spentMonth = cTrades.filter(tr => tr.type === 'buy' && new Date(tr.date).getMonth() === now.getMonth()).reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);

        let dayBarHtml = c.buy_limit > 0 ? `<div class="card-bar-line"><span class="card-bar-tag">1Д</span><div class="card-mini-bar"><div class="card-mini-bar-fill" style="width: ${Math.min(100, Math.round((spentToday / c.buy_limit) * 100))}%;"></div></div></div>` : '';
        let monthBarHtml = c.month_limit > 0 ? `<div class="card-bar-line"><span class="card-bar-tag">1М</span><div class="card-mini-bar"><div class="card-mini-bar-fill" style="width: ${Math.min(100, Math.round((spentMonth / c.month_limit) * 100))}%;"></div></div></div>` : '';

        container.innerHTML += `
            <div class="card-row-item ${c.status === 'burned' ? 'burned' : ''} ${c.is_pinned ? 'pinned' : ''}" onclick="openCardBottomSheet(${c.id})">
                <div class="card-stripe" style="background: ${c.color_accent || 'var(--bybit-yellow)'};"></div>
                <div style="flex: 1; padding-left: 8px;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="font-weight: 800; font-size: 14px;">${c.card_name}</span>
                        ${c.is_pinned ? '📌' : ''}
                        ${c.status === 'burned' ? '<span style="font-size: 10px; color: var(--bybit-red); font-weight: 900;">115-ФЗ</span>' : ''}
                    </div>
                    <div class="card-dual-bars-wrap">${dayBarHtml}${monthBarHtml}</div>
                </div>
                <div style="text-align: right; margin-left: 10px;">
                    <div class="privacy-blur" style="font-size: 15px; font-weight: 900;">${balance.toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}</div>
                </div>
            </div>
        `;
    });

    if (paginationContainer) {
        paginationContainer.innerHTML = totalPages > 1 ? Array.from({ length: totalPages }, (_, i) => `<div class="page-btn ${i + 1 === cardsCurrentPage ? 'active' : ''}" onclick="cardsCurrentPage=${i + 1};renderCards();">${i + 1}</div>`).join('') : '';
    }
}

function switchCardSheetTab(tab) {
    ['stats', 'settings', 'history'].forEach(t => {
        document.getElementById(`tab-csheet-${t}`)?.classList.toggle('active', t === tab);
        const v = document.getElementById(`csheet-view-${t}`);
        if (v) v.style.display = (t === tab) ? 'block' : 'none';
    });
}

function openCardBottomSheet(cid) {
    activeSheetCard = userCards.find(c => c.id === cid);
    if (!activeSheetCard) return;
    activeCardId = cid;

    document.getElementById('sheet-card-title').innerText = activeSheetCard.card_name;
    document.getElementById('csheet-inp-name').value = activeSheetCard.card_name || '';
    document.getElementById('csheet-inp-num').value = activeSheetCard.card_number || '';
    document.getElementById('csheet-inp-holder').value = activeSheetCard.holder_name || '';
    document.getElementById('csheet-inp-day-limit').value = activeSheetCard.buy_limit || '';
    document.getElementById('csheet-inp-month-limit').value = activeSheetCard.month_limit || '';
    document.getElementById('sheet-set-status').value = activeSheetCard.status || 'active';

    const sym = getCurrencySymbol();
    const cTrades = userTrades.filter(tr => tr.card_id === cid);
    let boughtFiat = 0, soldFiat = 0, boughtCrypto = 0, soldCrypto = 0, cycleRub = 0;

    cTrades.forEach(t => {
        const f = parseFloat(t.fiat_amount || 0);
        const c = parseFloat(t.crypto_amount || 0);
        if (t.is_cycle) {
            boughtFiat += f; soldFiat += f; boughtCrypto += c;
            soldCrypto += (t.sell_rate ? f / parseFloat(t.sell_rate) : c);
            cycleRub += parseFloat(t.cycle_profit_rub || 0);
        } else if (t.type === 'buy') {
            boughtFiat += f; boughtCrypto += c;
        } else {
            soldFiat += f; soldCrypto += c;
        }
    });

    const deps = cardOps.filter(o => o.card_id === cid && o.type === 'deposit').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
    const wdrs = cardOps.filter(o => o.card_id === cid && o.type === 'withdraw').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
    const balance = deps - wdrs + soldFiat - boughtFiat;

    document.getElementById('sheet-card-balance').innerText = `${balance.toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}`;
    document.getElementById('csheet-val-bought-fiat').innerText = `${boughtFiat.toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}`;
    document.getElementById('csheet-val-sold-fiat').innerText = `${soldFiat.toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}`;
    document.getElementById('csheet-val-profit-rub').innerText = `${(soldFiat - boughtFiat + cycleRub >= 0 ? '+' : '')}${(soldFiat - boughtFiat + cycleRub).toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}`;
    document.getElementById('csheet-val-profit-usdt').innerText = `${(boughtCrypto - soldCrypto >= 0 ? '+' : '')}${(boughtCrypto - soldCrypto).toFixed(2)} USDT`;

    switchCardSheetTab('stats');
    document.getElementById('card-sheet-modal')?.classList.add('show');
}

function closeCardSheet() {
    document.getElementById('card-sheet-modal')?.classList.remove('show');
}

function copyCardNumberOnly() {
    if (!activeSheetCard?.card_number) return showToast("⚠️ Номер не указан");
    navigator.clipboard.writeText(activeSheetCard.card_number.replace(/\s+/g, ''));
    showToast("💳 Номер скопирован!");
}

function copyCardFullRequisites() {
    if (!activeSheetCard) return;
    let text = globalMessageTemplate;
    text = text.replace(/{bank}/g, activeSheetCard.card_name || 'Банк');
    text = text.replace(/{number}/g, activeSheetCard.card_number || 'Реквизиты не заданы');
    text = text.replace(/{holder}/g, activeSheetCard.holder_name || 'Получатель');
    navigator.clipboard.writeText(text);
    showToast("📋 Шаблон скопирован!");
}

function renderHistory() {
    const container = document.getElementById('history-container');
    const paginationContainer = document.getElementById('history-pagination');
    if (!container) return;
    container.innerHTML = '';

    if (userTrades.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">Сделок пока нет.</div>`;
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    const sym = getCurrencySymbol();
    const totalPages = Math.min(MAX_PAGES, Math.max(1, Math.ceil(userTrades.length / ITEMS_PER_PAGE)));
    if (historyCurrentPage > totalPages) historyCurrentPage = totalPages;

    const pageItems = userTrades.slice((historyCurrentPage - 1) * ITEMS_PER_PAGE, historyCurrentPage * ITEMS_PER_PAGE);

    pageItems.forEach(t => {
        const d = new Date(t.date);
        const dateStr = d.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        container.innerHTML += `
            <div class="history-item" style="border-left-color: ${t.is_cycle ? 'var(--bybit-yellow)' : (t.type === 'buy' ? 'var(--bybit-green)' : 'var(--bybit-red)')};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="font-weight: 800; font-size: 11px;">${t.is_cycle ? 'КРУГ ⚡️' : (t.type === 'buy' ? 'ПОКУПКА 🟢' : 'ПРОДАЖА 🔴')}</span>
                    <span style="font-size: 11px; color: var(--text-muted);">${dateStr}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <div style="font-size: 16px; font-weight: 800;">${parseFloat(t.fiat_amount).toLocaleString()} ${sym}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${t.crypto_amount} USDT • ${t.rate || t.buy_rate} ${sym}</div>
                </div>
            </div>
        `;
    });

    if (paginationContainer) {
        paginationContainer.innerHTML = totalPages > 1 ? Array.from({ length: totalPages }, (_, i) => `<div class="page-btn ${i + 1 === historyCurrentPage ? 'active' : ''}" onclick="historyCurrentPage=${i + 1};renderHistory();">${i + 1}</div>`).join('') : '';
    }
}

let currentPnlDataUrl = null;
function openPnlPage() {
    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 760;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 1200, 760);
    grad.addColorStop(0, '#090d16'); grad.addColorStop(1, '#0c1322');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 760);

    ctx.strokeStyle = '#f3a600'; ctx.lineWidth = 4;
    ctx.strokeRect(28, 28, 1144, 704);

    ctx.fillStyle = '#f3a600'; ctx.font = '900 42px Inter, sans-serif';
    ctx.fillText('P2P TERMINAL PRO', 70, 105);

    ctx.fillStyle = '#2ebb9a'; ctx.font = '900 76px Inter, sans-serif';
    ctx.fillText(document.getElementById('val-total-profit-rub')?.innerText || "0.00 ₽", 70, 325);

    ctx.fillStyle = '#f3a600'; ctx.font = '900 34px Inter, sans-serif';
    ctx.fillText('@P2P_Rbot', 70, 665);

    currentPnlDataUrl = canvas.toDataURL('image/png');
    const imgEl = document.getElementById('pnl-rendered-img');
    if (imgEl) imgEl.src = currentPnlDataUrl;
    document.getElementById('pnl-card-modal')?.classList.add('show');
}

function closePnlPage() {
    document.getElementById('pnl-card-modal')?.classList.remove('show');
}

function downloadPnlImage() {
    if (!currentPnlDataUrl) return;
    const link = document.createElement('a');
    link.download = `PnL_${new Date().toISOString().slice(0, 10)}.png`;
    link.href = currentPnlDataUrl;
    link.click();
    showToast("💾 Фото сохранено!");
}

async function sharePnlCardFile() {
    if (!currentPnlDataUrl) return;
    try {
        const res = await fetch(currentPnlDataUrl);
        const blob = await res.blob();
        const file = new File([blob], `PnL_${new Date().toISOString().slice(0, 10)}.png`, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: 'PnL Report @P2P_Rbot' });
        } else {
            downloadPnlImage();
        }
    } catch(e) { downloadPnlImage(); }
}

function populateCardSelects() {
    const opts = `<option value="">Без привязки к карте</option>` + userCards.map(c => `<option value="${c.id}">${c.card_name}</option>`).join('');
    ['inp-card-sel', 'modal-card-sel', 'calc-card-sel'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = opts;
    });
}

function openHelpModal(key, event) {
    if (event) event.stopPropagation();
    const item = HELP_DATA[key];
    if (!item) return;
    document.getElementById('info-modal-title').innerText = item.title;
    document.getElementById('info-modal-content').innerHTML = item.text;
    document.getElementById('modal-info')?.classList.add('show');
}

function openSubModal() { document.getElementById('modal-sub-info')?.classList.add('show'); }
function closeModals() { document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('show')); }
function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.innerText = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2400);
}

function haptic(type) {
    try {
        if (type === 'light' || type === 'medium') tg?.HapticFeedback?.impactOccurred(type);
        if (type === 'success') tg?.HapticFeedback?.notificationOccurred('success');
    } catch(e) {}
}

function copyRefLink() {
    navigator.clipboard.writeText(document.getElementById('ref-link-box')?.innerText || '');
    showToast("Ссылка скопирована!");
}

function shareRefLink() {
    const link = document.getElementById('ref-link-box')?.innerText || '';
    if (tg?.openTelegramLink) tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(link)}`);
}

function openSupport() {
    const url = "https://t.me/P2P_Rbot";
    if (tg?.openTelegramLink) tg.openTelegramLink(url);
    else window.open(url, '_blank');
}

function setPeriod(p, el) {
    currentPeriod = p;
    document.querySelectorAll('.period-tabs .p-tab').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
    document.getElementById('custom-date-panel').style.display = 'none';
    calculateStats();
}

function toggleSecondaryStats() {
    isSecondaryExpanded = !isSecondaryExpanded;
    const wrap = document.getElementById('secondary-stats-wrap');
    if (wrap) wrap.style.display = isSecondaryExpanded ? 'block' : 'none';
    const arrow = document.getElementById('toggle-arrow');
    if (arrow) arrow.innerText = isSecondaryExpanded ? '▴' : '▾';
    applyLanguage(currentLang);
}

function handleNavClick(targetId, el) {
    document.querySelectorAll('.page-section').forEach(sec => sec.style.display = 'none');
    const target = document.getElementById(targetId);
    if (target) { target.style.display = 'block'; target.classList.add('revealed'); }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (el) el.classList.add('active');
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

function checkSubscription() {
    const badgeEl = document.getElementById('disp-tier-badge');
    if (!currentUser) return false;

    if (!currentUser.sub_end || new Date(currentUser.sub_end) < new Date()) {
        if (badgeEl) {
            badgeEl.className = 'sub-tier-badge tier-expired';
            badgeEl.innerText = '❌ Нет подписки';
        }
        document.getElementById('paywall').style.display = 'block';
        return false;
    }

    document.getElementById('paywall').style.display = 'none';
    if (badgeEl) {
        badgeEl.className = new Date(currentUser.sub_end).getFullYear() > 2099 ? 'sub-tier-badge tier-vip' : 'sub-tier-badge tier-month';
        badgeEl.innerText = new Date(currentUser.sub_end).getFullYear() > 2099 ? '💎 VIP Навсегда' : `⚡️ Премиум до ${new Date(currentUser.sub_end).toLocaleDateString()}`;
    }
    return true;
}

/* ====================================================
   ГАРАНТИРОВАННОЕ СКРЫТИЕ ЗАГРУЗЧИКА
==================================================== */
function forceHideLoader() {
    const loader = document.getElementById('terminal-boot-loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => { loader.style.display = 'none'; }, 300);
    }
    const container = document.querySelector('.container');
    const nav = document.querySelector('.bottom-nav');
    if (container) container.style.display = 'block';
    if (nav) nav.style.display = 'flex';
}

/* ====================================================
   ТОЧКА ВХОДА (INITIALIZATION)
==================================================== */
async function init() {
    applyLanguage(currentLang);
    applyIncognito();

    // ЖЕЛЕЗНЫЙ АВАРИЙНЫЙ ТАЙМ-АУТ: ЧЕРЕЗ 1.8 СЕК ЗАГРУЗЧИК СКРЫВАЕТСЯ ВСЕГДА
    const emergencyTimeout = setTimeout(() => {
        forceHideLoader();
        renderAll();
    }, 1800);

    // Если открыто в браузере для теста, используется ID админа по умолчанию
    const tgUser = tg?.initDataUnsafe?.user || { id: SUPER_ADMIN_ID, first_name: "Admin Tester", username: "admin" };

    try {
        let users = await db(`users?tg_id=eq.${tgUser.id}`);
        if (!users || users.length === 0) {
            const created = await db(`users`, {
                method: 'POST',
                body: JSON.stringify({ tg_id: tgUser.id, username: tgUser.username, first_name: tgUser.first_name, currency: 'RUB', tz_offset: 3 })
            });
            currentUser = created ? created[0] : { tg_id: tgUser.id, currency: 'RUB', tz_offset: 3 };
        } else {
            currentUser = users[0];
        }

        await refreshData();
        await loadLiveSiteBanner();

        document.getElementById('disp-uid').innerText = currentUser.tg_id;
        document.getElementById('ref-link-box').innerText = `https://t.me/P2P_Rbot?start=${currentUser.tg_id}`;
    } catch(e) {
        console.error(e);
    } finally {
        clearTimeout(emergencyTimeout);
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
