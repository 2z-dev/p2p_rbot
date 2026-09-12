/* ====================================================
   P2P TERMINAL PRO — CORE ENGINE v8.5.0
   Enterprise Ledger, Smart Cards & Calendar Engine
==================================================== */

const API_URL = "https://slddpusuckhhvvetpgxa.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZGRwdXN1Y2toaHZ2ZXRwZ3hhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODYwNzMyMiwiZXhwIjoyMTA0MTgzMzIyfQ.obfZa6h7dKqVvzdHUAXRQ6TAZ8dSsmBZqmUCtBVO0QM";

const SUPER_ADMIN_ID = 5172556128;
let adminIds = [SUPER_ADMIN_ID];

// БЕЗОПАСНЫЙ ДОСТУП К ХРАНИЛИЩУ ДЛЯ ИСКЛЮЧЕНИЯ ЗАВИСАНИЙ В WEBVIEW
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
        accessDenied: "Доступ ограничен", accessDeniedDesc: "Терминал защищен и запускается исключительно через Telegram Mini App.", openBotBtn: "🚀 Открыть бота",
        tabToday: "За сегодня", tabMonth: "За месяц", tabAll: "Все время", tabCustom: "Свой период 📅",
        presetYesterday: "Вчера", preset7d: "7 дней", preset14d: "14 дней", preset30d: "30 дней", dateFrom: "С даты", dateTo: "По дату", btnApplyDate: "Применить ⚡️",
        totalProfitBadge: "💰 ОБЩАЯ ПРИБЫЛЬ", spreadBadge: "📊 СПРЕД СДЕЛОК", lastCycleTitle: "Последний круг", avgSpreadTitle: "Ср. за период",
        wacTimeframeHint: "По WAC за таймфрейм", showSecondary: "📊 Развернуть подробную статистику", hideSecondary: "📊 Скрыть подробную статистику",
        netIn: "Чистая в", formulaFiat: "Фиатный доход: Продажи − Покупки (строго разница поступившего и отданного фиата на картах)",
        netInUsdt: "Чистая в USDT", formulaUsdt: "Крипто-доход: Покупки − Продажи (чистый остаток монет USDT на бирже)", midPriceHint: "⚖️ Средняя цена (Mid Price):",
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
        refWhyTitle: "В чем польза приглашать трейдеров:", refWhy1: "• +3 дня Premium начисляются автоматически за каждого активного приглашенного.",
        refWhy2: "• Ваши рефералы навсегда закрепляются за вашим Telegram ID.", refWhy3: "• Неограниченная аналитика, калькулятор и облачный синхрон касс.",
        refLinkBadge: "Ваша партнерская ссылка", btnCopy: "📋 Скопировать", btnShare: "🚀 Отправить", paywallTitle: "Доступ к Терминалу 🔒",
        paywallDesc: "Оформите доступ для разблокировки всех функций", trialBadge: "Бесплатный доступ", trialText: "🎁 Пробный период 24 часа активируется внутри нашего Telegram-бота.",
        btnActivateTrial: "🎁 Активировать триал", plansBadge: "Тарифные планы", plansText: "Оплата и сверка перевода Bybit производятся в боте.", plan1Month: "1 Месяц", planForever: "Навсегда", btnBuySub: "💳 Оформить подписку",
        navDashboard: "Сводка", navTrade: "Сделка", navCards: "Карты", navHistory: "История", navSettings: "Настройки", navAdmin: "Админ"
    },
    en: {
        accessDenied: "Access Restricted", accessDeniedDesc: "Terminal is protected and opens in Telegram Mini App.", openBotBtn: "🚀 Open Telegram Bot",
        tabToday: "Today", tabMonth: "This Month", tabAll: "All Time", tabCustom: "Custom 📅", presetYesterday: "Yesterday", preset7d: "7 days", preset14d: "14 days", preset30d: "30 days",
        dateFrom: "From date", dateTo: "To date", btnApplyDate: "Apply ⚡️", totalProfitBadge: "💰 TOTAL PROFIT", spreadBadge: "📊 SPREAD ANALYSIS",
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
    }
};

['es', 'fr', 'de', 'uk', 'kk'].forEach(l => { I18N[l] = { ...I18N.ru }; });

/* ====================================================
   ПОДРОБНЫЕ ПОДСКАЗКИ СПРАВКИ (?)
==================================================== */
const HELP_DATA = {
    total_profit: {
        title: "💰 ОБЩАЯ ПРИБЫЛЬ И МАТЕМАТИКА",
        text: `<b>В арбитраже итоговый заработок складывается из двух величин:</b><br><br>
        <b>1. Фиатный профит (чистая в фиате):</b> Чистая разница между всеми поступлениями от продаж и расходами на покупку монет.<br>
        <b>2. Крипто-профит (чистая в USDT):</b> Заработанные монеты, оставшиеся на балансе биржи.<br><br>
        <b>Формула полной прибыли:</b><br>
        <code>Общая прибыль = Чистая в фиате + (Чистая в USDT × Mid Price)</code>.<br><br>
        <i>Все дни в календаре рассчитываются строго по этой формуле, поэтому сумма дней месяца идеально сходится с общей прибылью!</i>`
    },
    net_fiat: {
        title: "💵 ЧИСТАЯ В ФИАТЕ (ПРОДАЖА − ПОКУПКА)",
        text: `<b>Фиатный результат торговли:</b><br>
        <code>Фиатный профит = Поступления на карты (Продажи) − Списания с карт (Покупки) + Доход с закрытых кругов</code>.<br><br>
        Отражает чистое увеличение денежной массы на банковских картах без учета крипто-остатка.`
    },
    net_usdt: {
        title: "🪙 ЧИСТАЯ В USDT (ПОКУПКА − ПРОДАЖА)",
        text: `<b>Криптовалютный остаток:</b><br>
        <code>Крипто-профит = Купленный объем USDT − Проданный объем USDT</code>.<br><br>
        Показывает количество монет, заработанных сверх стартового депозита.`
    },
    mid_price: {
        title: "⚖️ СРЕДНЯЯ ЦЕНА (MID PRICE)",
        text: `Справедливая средняя цена доллара USDT за выбранный отрезок времени:<br>
        <code>Mid Price = (WAC Закупка + Средняя Продажа) / 2</code>.<br>
        Используется для точной конвертации крипто-остатка в фиат.`
    },
    calendar: {
        title: "📅 КАЛЕНДАРЬ ОБЩЕЙ ПРИБЫЛИ",
        text: `<b>Интерактивный контроль:</b><br>
        • <b>Листание:</b> стрелки ‹ и › позволяют листать месяцы вперед на 5+ лет и назад.<br>
        • <b>Зажатие и скольжение:</b> зажмите день и ведите пальцем — плавающее окошко показывает общую прибыль дня и автоматически закрывается при отпускании!<br>
        • <b>Клик:</b> открывает подробную карточку дня.`
    },
    cards_overview: {
        title: "💳 МОДУЛЬ КАРТ И ЛИМИТОВ",
        text: `• <b>Две полоски расходов:</b> дневная (1Д) и месячная (1М).<br>
        • <b>Отлежка:</b> возможность задать точную дату и время, после которых карта автоматически вернется в статус «В работе».<br>
        • <b>Порядок:</b> карты можно перетаскивать пальцем или мышью.`
    }
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
   ФОРМАТИРОВАНИЕ ЧИСЕЛ БЕЗ "+-"
==================================================== */
function formatSignedCurrency(amount, sym = '₽', decimals = 2) {
    const val = parseFloat(amount) || 0;
    if (Math.abs(val) < 0.0001) {
        return `0.00 ${sym}`;
    }
    if (val < 0) {
        return `-${Math.abs(val).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })} ${sym}`;
    }
    return `+${val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })} ${sym}`;
}

/* ====================================================
   СЕТЕВОЙ МОДУЛЬ С ТАЙМ-АУТОМ (ЗАЩИТА ОТ ЗАВИСАНИЙ)
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

/* ====================================================
   УЗКАЯ ПЛАШКА БАННЕРА
==================================================== */
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

    let boughtUsdt = (fiat > 0 && buyRate > 0) ? fiat / buyRate : 0;
    let soldUsdt = (fiat > 0 && sellRate > 0) ? fiat / sellRate : 0;

    if (elBuyCrypto) elBuyCrypto.innerText = `${boughtUsdt.toFixed(2)} USDT`;
    if (elSellCrypto) elSellCrypto.innerText = `${soldUsdt.toFixed(2)} USDT`;

    if (fiat > 0 && buyRate > 0 && sellRate > 0) {
        const spreadPct = ((sellRate - buyRate) / buyRate) * 100;
        const profitUsdt = boughtUsdt - soldUsdt;
        const profitFiat = profitUsdt * ((buyRate + sellRate) / 2);

        if (elSpread) {
            elSpread.innerText = (spreadPct >= 0 ? "+" : "") + spreadPct.toFixed(2) + "%";
            elSpread.style.color = spreadPct >= 0 ? 'var(--bybit-yellow)' : 'var(--bybit-red)';
        }
        if (elProfitUsdt) {
            elProfitUsdt.innerText = formatSignedCurrency(profitUsdt, 'USDT', 2);
            elProfitUsdt.style.color = profitUsdt >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)';
        }
        if (elProfitFiat) {
            elProfitFiat.innerText = `≈ ${formatSignedCurrency(profitFiat, sym, 2)}`;
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

/* ====================================================
   МАТЕМАТИКА ПРИБЫЛИ
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
        elTotalFiat.innerHTML = `${formatSignedCurrency(totalProfitFiat, '', 2)} <span style="font-size: 18px; color: var(--text-muted);">${sym}</span>`;
    }

    const elTotalUsdt = document.getElementById('val-total-profit-usdt');
    if (elTotalUsdt) {
        elTotalUsdt.innerText = formatSignedCurrency(totalProfitUsdt, 'USDT', 2);
        elTotalUsdt.style.color = totalProfitUsdt < 0 ? 'var(--bybit-red)' : (totalProfitUsdt > 0 ? 'var(--bybit-green)' : 'var(--text-main)');
    }

    const elProfitFiat = document.getElementById('val-profit-rub');
    if (elProfitFiat) {
        elProfitFiat.innerText = formatSignedCurrency(profitFiat, sym, 2);
        elProfitFiat.style.color = profitFiat < 0 ? 'var(--bybit-red)' : (profitFiat > 0 ? 'var(--bybit-green)' : 'var(--text-main)');
    }

    const elProfitUsdt = document.getElementById('val-profit-usdt');
    if (elProfitUsdt) {
        elProfitUsdt.innerText = formatSignedCurrency(profitUsdt, 'USDT', 2);
        elProfitUsdt.style.color = profitUsdt < 0 ? 'var(--bybit-red)' : (profitUsdt > 0 ? 'var(--bybit-blue)' : 'var(--text-main)');
    }

    const elMidPrice = document.getElementById('hint-mid-price');
    if (elMidPrice) elMidPrice.innerText = midPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const elAvgSpread = document.getElementById('val-avg-spread');
    if (elAvgSpread) {
        elAvgSpread.innerText = (avgPeriodSpread >= 0 ? "+" : "") + avgPeriodSpread.toFixed(2) + "%";
        elAvgSpread.style.color = avgPeriodSpread < 0 ? 'var(--bybit-red)' : 'var(--bybit-green)';
    }

    const roiEl = document.getElementById('val-roi');
    if (roiEl) {
        roiEl.innerText = (roi >= 0 ? "+" : "") + roi.toFixed(2) + "%";
        roiEl.style.color = roi < 0 ? 'var(--bybit-red)' : 'var(--bybit-green)';
    }

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

/* ====================================================
   КАЛЕНДАРЬ ОБЩЕЙ ПРИБЫЛИ
==================================================== */
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
    haptic('light');
    calViewDate.setMonth(calViewDate.getMonth() + delta);
    renderHeatmap();
}

function resetCalendarToCurrentMonth() {
    haptic('light');
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

        // ОБЩАЯ ПРИБЫЛЬ ДНЯ: ЧИСТАЯ В РУБЛЯХ + ЧИСТАЯ В ДОЛЛАРАХ * MID PRICE
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
        pVal.innerText = formatSignedCurrency(data.profit, sym, 2);
        pVal.style.color = data.profit < 0 ? 'var(--bybit-red)' : (data.profit > 0 ? 'var(--bybit-green)' : 'var(--text-main)');

        const spreadCalc = data.turnover > 0 ? ((data.profit / data.turnover) * 100).toFixed(2) : "0.00";
        document.getElementById('pop-extra').innerText = `${data.count} сдел. • Спред: ${spreadCalc}%`;
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
            haptic('light');
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
    profitEl.innerText = formatSignedCurrency(profit, sym, 2);
    profitEl.style.color = profit < 0 ? 'var(--bybit-red)' : (profit > 0 ? 'var(--bybit-green)' : 'var(--text-main)');
    document.getElementById('day-modal-trades-cnt').innerText = `${count} сделок`;
    document.getElementById('day-modal-turnover-val').innerText = `${turnover.toLocaleString(undefined, { minimumFractionDigits: 2 })} ${sym}`;
    document.getElementById('day-modal-spread-val').innerText = `${count > 0 && turnover > 0 ? ((profit / turnover) * 100).toFixed(2) : "0.00"}%`;
    document.getElementById('modal-day-details')?.classList.add('show');
}

/* ====================================================
   МОДУЛЬ КАРТ (ДВЕ ПОЛОСКИ, ОТЛЕЖКА, DRAG & DROP)
==================================================== */
function checkCardsCooldown() {
    const now = new Date();
    userCards.forEach(c => {
        if (c.status === 'cooldown' && c.cooldown_until) {
            if (new Date(c.cooldown_until) <= now) {
                c.status = 'active';
                c.cooldown_until = null;
                db(`cards?id=eq.${c.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ status: 'active', cooldown_until: null })
                });
            }
        }
    });
}

function renderCards() {
    checkCardsCooldown();
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

    const customOrder = JSON.parse(safeStorage.get(`p2p_card_order_${currentUser?.tg_id}`, '[]'));
    let sorted = [...userCards];
    if (customOrder.length > 0) {
        sorted.sort((a, b) => {
            const idxA = customOrder.indexOf(a.id);
            const idxB = customOrder.indexOf(b.id);
            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
            if (idxA !== -1) return -1;
            if (idxB !== -1) return 1;
            return 0;
        });
    }

    sorted.sort((a, b) => {
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

        let cooldownBadge = '';
        if (c.status === 'cooldown') {
            if (c.cooldown_until) {
                const diffMin = Math.max(0, Math.round((new Date(c.cooldown_until) - now) / 60000));
                const hours = Math.floor(diffMin / 60);
                const mins = diffMin % 60;
                cooldownBadge = `<span style="font-size: 10px; color: var(--bybit-purple); font-weight: 800;">Отлежка (${hours}ч ${mins}м)</span>`;
            } else {
                cooldownBadge = `<span style="font-size: 10px; color: var(--bybit-purple); font-weight: 800;">Отлежка</span>`;
            }
        }

        container.innerHTML += `
            <div class="card-row-item ${c.status === 'burned' ? 'burned' : ''} ${c.is_pinned ? 'pinned' : ''}"
                 draggable="true"
                 ondragstart="handleCardDragStart(event, ${c.id})"
                 ondragover="event.preventDefault()"
                 ondrop="handleCardDrop(event, ${c.id})"
                 onclick="openCardBottomSheet(${c.id})">
                <div class="card-stripe" style="background: ${c.color_accent || 'var(--bybit-yellow)'};"></div>
                <div class="card-drag-handle" onclick="event.stopPropagation()">⋮⋮</div>
                <div style="flex: 1; padding-left: 4px;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="font-weight: 800; font-size: 14px;">${c.card_name}</span>
                        ${c.is_pinned ? '📌' : ''}
                        ${c.status === 'burned' ? '<span style="font-size: 10px; color: var(--bybit-red); font-weight: 900;">115-ФЗ</span>' : ''}
                        ${cooldownBadge}
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

let draggedCardId = null;
function handleCardDragStart(e, cid) {
    draggedCardId = cid;
    e.dataTransfer.setData('text/plain', cid);
}
function handleCardDrop(e, targetCardId) {
    e.preventDefault();
    if (!draggedCardId || draggedCardId === targetCardId) return;

    let order = userCards.map(c => c.id);
    const fromIdx = order.indexOf(draggedCardId);
    const toIdx = order.indexOf(targetCardId);
    if (fromIdx !== -1 && toIdx !== -1) {
        order.splice(fromIdx, 1);
        order.splice(toIdx, 0, draggedCardId);
        safeStorage.set(`p2p_card_order_${currentUser?.tg_id}`, JSON.stringify(order));
        haptic('light');
        renderCards();
    }
}

function switchCardSheetTab(tab) {
    haptic('light');
    ['stats', 'settings', 'history'].forEach(t => {
        document.getElementById(`tab-csheet-${t}`)?.classList.toggle('active', t === tab);
        const v = document.getElementById(`csheet-view-${t}`);
        if (v) v.style.display = (t === tab) ? 'block' : 'none';
    });
    if (tab === 'history') renderCardTradesList();
}

function toggleCooldownDateInput(statusVal) {
    const wrap = document.getElementById('wrap-cooldown-until');
    if (wrap) wrap.style.display = (statusVal === 'cooldown') ? 'block' : 'none';
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
    document.getElementById('csheet-inp-notes').value = activeSheetCard.note || '';

    const cdInput = document.getElementById('csheet-inp-cooldown-until');
    if (cdInput) cdInput.value = activeSheetCard.cooldown_until ? activeSheetCard.cooldown_until.slice(0, 16) : '';
    toggleCooldownDateInput(activeSheetCard.status || 'active');

    const sym = getCurrencySymbol();
    const cTrades = userTrades.filter(tr => tr.card_id === cid);
    let boughtFiat = 0, soldFiat = 0;

    cTrades.forEach(t => {
        const f = parseFloat(t.fiat_amount || 0);
        if (t.is_cycle) {
            boughtFiat += f; soldFiat += f;
        } else if (t.type === 'buy') {
            boughtFiat += f;
        } else {
            soldFiat += f;
        }
    });

    const deps = cardOps.filter(o => o.card_id === cid && o.type === 'deposit').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
    const wdrs = cardOps.filter(o => o.card_id === cid && o.type === 'withdraw').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
    const balance = deps - wdrs + soldFiat - boughtFiat;

    document.getElementById('sheet-card-balance').innerText = `${balance.toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}`;

    // СВОДКА КАРТЫ: СТРОГО СКОЛЬКО ЗАКУПЛЕНО И СКОЛЬКО ПРИНЯТО (ПРИБЫЛЬ В ФИАТЕ И ДОЛЛАРАХ УБРАНА)
    const elBought = document.getElementById('csheet-val-bought-fiat');
    if (elBought) elBought.innerText = `${boughtFiat.toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}`;

    const elSold = document.getElementById('csheet-val-sold-fiat');
    if (elSold) elSold.innerText = `${soldFiat.toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}`;

    // Скрываем блоки прибыли в фиате и долларах внутри карточки карты
    const elProfRub = document.getElementById('csheet-val-profit-rub');
    if (elProfRub) elProfRub.closest('.stat-card')?.remove();

    const elProfUsdt = document.getElementById('csheet-val-profit-usdt');
    if (elProfUsdt) elProfUsdt.closest('.stat-card')?.remove();

    switchCardSheetTab('stats');
    document.getElementById('card-sheet-modal')?.classList.add('show');
}

function renderCardTradesList() {
    const listEl = document.getElementById('sheet-card-trades-list');
    if (!listEl || !activeCardId) return;
    listEl.innerHTML = '';

    const trades = userTrades.filter(tr => tr.card_id === activeCardId);
    if (trades.length === 0) {
        listEl.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 18px;">Операций по этой карте пока нет</div>`;
        return;
    }

    const sym = getCurrencySymbol();
    trades.forEach(t => {
        const d = new Date(t.date);
        const dateStr = d.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        listEl.innerHTML += `
            <div class="history-item" style="margin-bottom: 8px; padding: 10px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                    <span style="font-weight: 800; color: ${t.is_cycle ? 'var(--bybit-yellow)' : (t.type === 'buy' ? 'var(--bybit-green)' : 'var(--bybit-red)')};">
                        ${t.is_cycle ? 'КРУГ ⚡️' : (t.type === 'buy' ? 'ПОКУПКА 🟢' : 'ПРОДАЖА 🔴')}
                    </span>
                    <span style="color: var(--text-muted);">${dateStr}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <div style="font-size: 15px; font-weight: 800;">${parseFloat(t.fiat_amount).toLocaleString()} ${sym}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${t.crypto_amount} USDT • ${t.rate || t.buy_rate} ${sym}</div>
                </div>
            </div>
        `;
    });
}

async function saveCardFullSettings() {
    if (!requireSubscription()) return;
    if (!activeSheetCard) return;

    haptic('medium');
    const name = document.getElementById('csheet-inp-name').value.trim();
    const num = document.getElementById('csheet-inp-num').value.trim();
    const holder = document.getElementById('csheet-inp-holder').value.trim();
    const dayLimit = parseFloat(document.getElementById('csheet-inp-day-limit').value) || null;
    const monthLimit = parseFloat(document.getElementById('csheet-inp-month-limit').value) || null;
    const status = document.getElementById('sheet-set-status').value;
    const note = document.getElementById('csheet-inp-notes').value.trim();

    let cooldownUntil = null;
    if (status === 'cooldown') {
        const val = document.getElementById('csheet-inp-cooldown-until').value;
        if (val) cooldownUntil = new Date(val).toISOString();
    }

    if (!name) return showToast("⚠️ Название карты обязательно!");

    await db(`cards?id=eq.${activeSheetCard.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            card_name: name,
            card_number: num,
            holder_name: holder,
            buy_limit: dayLimit,
            month_limit: monthLimit,
            status: status,
            color_accent: activeSelectedCardColor,
            cooldown_until: cooldownUntil,
            note: note
        })
    });

    showToast("✅ Настройки сохранены!");
    await refreshData();
    renderAll();
    openCardBottomSheet(activeSheetCard.id);
}

function closeCardSheet() {
    document.getElementById('card-sheet-modal')?.classList.remove('show');
}

function selectCardColor(color, el) {
    activeSelectedCardColor = color;
    document.querySelectorAll('#sheet-card-colors .color-swatch-dot').forEach(d => d.classList.remove('selected'));
    if (el) el.classList.add('selected');
}

async function togglePinCurrentCard() {
    if (!requireSubscription()) return;
    if (!activeSheetCard) return;
    const newPinned = !activeSheetCard.is_pinned;
    await db(`cards?id=eq.${activeSheetCard.id}`, { method: 'PATCH', body: JSON.stringify({ is_pinned: newPinned }) });
    activeSheetCard.is_pinned = newPinned;
    closeCardSheet();
    showToast(newPinned ? "📌 Карта закреплена" : "Откреплено");
    await refreshData();
    renderCards();
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

function openTemplateEditorModal() {
    document.getElementById('inp-global-template').value = globalMessageTemplate;
    document.getElementById('modal-template-editor')?.classList.add('show');
}

function insertTagIntoTemplate(tag) {
    const area = document.getElementById('inp-global-template');
    if (!area) return;
    const start = area.selectionStart;
    const end = area.selectionEnd;
    area.value = area.value.substring(0, start) + tag + area.value.substring(end);
    area.focus();
}

function resetTemplateToDefault() {
    document.getElementById('inp-global-template').value = DEFAULT_CARD_TEMPLATE;
}

function saveGlobalMessageTemplate() {
    const val = document.getElementById('inp-global-template').value.trim();
    globalMessageTemplate = val || DEFAULT_CARD_TEMPLATE;
    safeStorage.set('p2p_card_msg_template', globalMessageTemplate);
    closeModals();
    showToast("✅ Шаблон сообщений сохранен!");
}

function openSheetCardOp(type) {
    closeCardSheet();
    openCardOpModal(activeCardId, type);
}

async function cloneCurrentCard() {
    if (!requireSubscription()) return;
    if (!activeSheetCard) return;
    await db(`cards`, {
        method: 'POST',
        body: JSON.stringify({
            tg_id: currentUser.tg_id,
            card_name: `${activeSheetCard.card_name} (Клон)`,
            card_number: activeSheetCard.card_number,
            holder_name: activeSheetCard.holder_name,
            buy_limit: activeSheetCard.buy_limit,
            month_limit: activeSheetCard.month_limit,
            color_accent: activeSheetCard.color_accent,
            status: 'active'
        })
    });
    closeCardSheet();
    showToast("✅ Карта клонирована!");
    await refreshData();
    renderCards();
}

async function deleteCurrentCardFromSheet() {
    if (!requireSubscription()) return;
    if (!confirm("Удалить карту?")) return;
    await db(`cards?id=eq.${activeCardId}`, { method: 'DELETE' });
    closeCardSheet();
    showToast("🗑 Карта удалена");
    await refreshData();
    renderAll();
}

/* ====================================================
   ТРАНСФЕР
==================================================== */
function openTransferModal() {
    if (!requireSubscription()) return;
    if (userCards.length < 2) return showToast("⚠️ Нужно минимум 2 карты");

    const selFrom = document.getElementById('transfer-from-card');
    const selTo = document.getElementById('transfer-to-card');
    const opts = userCards.map(c => `<option value="${c.id}">${c.card_name}</option>`).join('');

    if (selFrom) selFrom.innerHTML = opts;
    if (selTo) selTo.innerHTML = opts;
    if (selTo && userCards.length > 1) selTo.selectedIndex = 1;

    document.getElementById('modal-card-transfer')?.classList.add('show');
}

async function submitCardTransfer() {
    if (!requireSubscription()) return;
    const fromId = parseInt(document.getElementById('transfer-from-card').value);
    const toId = parseInt(document.getElementById('transfer-to-card').value);
    const amt = parseFloat(document.getElementById('transfer-amount').value);

    if (!amt || amt <= 0) return showToast("⚠️ Введите сумму трансфера");
    if (fromId === toId) return showToast("⚠️ Выберите разные карты!");

    await Promise.all([
        db('card_operations', { method: 'POST', body: JSON.stringify({ card_id: fromId, tg_id: currentUser.tg_id, type: 'withdraw', amount: amt, comment: `Трансфер на карту #${toId}`, count_in_limit: false }) }),
        db('card_operations', { method: 'POST', body: JSON.stringify({ card_id: toId, tg_id: currentUser.tg_id, type: 'deposit', amount: amt, comment: `Трансфер с карты #${fromId}`, count_in_limit: false }) })
    ]);

    closeModals();
    playCashSound();
    showToast("🔄 Трансфер выполнен!");
    await refreshData();
    renderCards();
}

/* ====================================================
   ИСТОРИЯ ОПЕРАЦИЙ
==================================================== */
function selectDealColor(color, el) {
    activeSelectedDealColor = color;
    document.querySelectorAll('#deal-color-swatches .color-swatch-dot').forEach(d => d.classList.remove('selected'));
    if (el) el.classList.add('selected');
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
        const boundCard = userCards.find(c => c.id === t.card_id);
        const cardBadge = boundCard ? `<span class="card-pill">💳 ${boundCard.card_name}</span>` : '';

        if (t.is_cycle) {
            const profit = parseFloat(t.cycle_profit_rub || 0);
            container.innerHTML += `
                <div class="history-item" style="border-left-color: var(--bybit-yellow);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <span style="font-size: 11px; font-weight: 800; color: var(--bybit-yellow);">КРУГ ⚡️ ${cardBadge}</span>
                        <span style="font-size: 11px; color: var(--text-muted);">${dateStr}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                        <div>
                            <div class="privacy-blur" style="font-size: 17px; font-weight: 800; color: ${profit < 0 ? 'var(--bybit-red)' : 'var(--bybit-green)'};">
                                ${formatSignedCurrency(profit, sym, 2)}
                            </div>
                            <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                                ${t.buy_rate} → ${t.sell_rate} ${sym} / Спред: ${t.cycle_spread}%
                            </div>
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
                <div class="history-item" style="border-left-color: ${isBuy ? 'var(--bybit-green)' : 'var(--bybit-red)'};">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <span style="font-size: 11px; font-weight: 800; color: ${isBuy ? 'var(--bybit-green)' : 'var(--bybit-red)'};">
                            ${isBuy ? 'ПОКУПКА 🟢' : 'ПРОДАЖА 🔴'} ${cardBadge}
                        </span>
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

    if (paginationContainer) {
        paginationContainer.innerHTML = totalPages > 1 ? Array.from({ length: totalPages }, (_, i) => `<div class="page-btn ${i + 1 === historyCurrentPage ? 'active' : ''}" onclick="historyCurrentPage=${i + 1};renderHistory();">${i + 1}</div>`).join('') : '';
    }
}

function repeatTradeInCalc(tradeId) {
    if (!requireSubscription()) return;
    const tr = userTrades.find(t => t.id === tradeId);
    if (!tr) return;

    if (tr.is_cycle) {
        document.getElementById('calc-fiat-amt').value = tr.fiat_amount;
        document.getElementById('calc-buy-rate').value = tr.buy_rate;
        document.getElementById('calc-sell-rate').value = tr.sell_rate;
        if (tr.card_id) document.getElementById('calc-card-sel').value = tr.card_id;
        runCalculator();
        handleNavClick('dashboard', document.querySelector('.nav-btn[data-target="dashboard"]'));
        showToast("🔁 Круг скопирован в калькулятор!");
    } else {
        document.getElementById('inp-amount').value = tr.fiat_amount;
        document.getElementById('inp-rate').value = tr.rate;
        setTradeType(tr.type);
        handleNavClick('trade', document.querySelector('.nav-btn[data-target="trade"]'));
        showToast("🔁 Сделка подставлена!");
    }
}

function openEditTradeModal(tid) {
    if (!requireSubscription()) return;
    activeEditTradeId = tid;
    const tr = userTrades.find(x => x.id === tid);
    if (!tr) return;

    document.getElementById('modal-trade-id').innerText = `Сделка #${tid}`;
    document.getElementById('modal-inp-amount').value = tr.fiat_amount;
    document.getElementById('modal-rate').value = tr.rate || tr.buy_rate;
    document.getElementById('modal-card-sel').value = tr.card_id || "";
    document.getElementById('modal-note').value = tr.note || "";
    document.getElementById('edit-modal')?.classList.add('show');
}

async function submitEditTrade() {
    if (!requireSubscription()) return;
    const amt = parseFloat(document.getElementById('modal-inp-amount').value);
    const r = parseFloat(document.getElementById('modal-rate').value);
    const cid = document.getElementById('modal-card-sel').value || null;
    const note = document.getElementById('modal-note').value.trim();

    if (!amt || !r) return showToast("⚠️ Заполните сумму и курс!");

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
    if (!requireSubscription()) return;
    if (!confirm("Удалить операцию из базы?")) return;
    await db(`trades?id=eq.${tid}`, { method: 'DELETE' });
    showToast("🗑 Сделка удалена");
    await refreshData();
    renderAll();
}

/* ====================================================
   АДМИНКА И БАЗА ПОЛЬЗОВАТЕЛЕЙ (РЕЕСТР ВСЕХ ЮЗЕРОВ)
==================================================== */
async function loadActiveUsersForAdmin() {
    try {
        const [usersRes, tradesRes] = await Promise.all([
            db('users?order=reg_date.desc'),
            db('trades?select=tg_id')
        ]);

        if (!usersRes) return;
        rawAdminUsersList = usersRes;

        const tradeCounts = {};
        (tradesRes || []).forEach(t => tradeCounts[t.tg_id] = (tradeCounts[t.tg_id] || 0) + 1);

        rawAdminUsersList.forEach(u => {
            u._tradesCount = tradeCounts[u.tg_id] || 0;
            u._hasHadSubOrTrial = (u.sub_end !== null && u.sub_end !== undefined) || (u.trial_used === true);
        });

        const activeCount = rawAdminUsersList.filter(u => u._hasHadSubOrTrial).length;
        document.getElementById('admin-active-count').innerText = `${rawAdminUsersList.length} всего (${activeCount} с подпиской)`;
    } catch(e) {}
}

function openUsersDatabaseModal() {
    haptic('medium');
    filterAdminDatabaseView();
    document.getElementById('modal-admin-users-db')?.classList.add('show');
}

function toggleAdminSubFilter() {
    adminDbFilterOnlySub = !adminDbFilterOnlySub;
    const btn = document.getElementById('btn-toggle-sub-filter');
    if (btn) btn.innerText = adminDbFilterOnlySub ? "Фильтр: Была подписка 🟢" : "Фильтр: Все юзеры ⚪️";
    filterAdminDatabaseView();
}

function filterAdminDatabaseView() {
    const query = (document.getElementById('admin-db-search-inp')?.value || '').toLowerCase().trim();
    const container = document.getElementById('admin-users-db-container');
    if (!container) return;
    container.innerHTML = '';

    let list = [...rawAdminUsersList];

    if (adminDbFilterOnlySub) {
        list = list.filter(u => u._hasHadSubOrTrial);
    }

    if (query) {
        list = list.filter(u => {
            return String(u.tg_id).includes(query) || (u.first_name || '').toLowerCase().includes(query) || (u.username || '').toLowerCase().includes(query);
        });
    }

    if (list.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">Пользователей не найдено</div>`;
        return;
    }

    const now = new Date();
    list.forEach(u => {
        const isSubActive = u.sub_end && new Date(u.sub_end) > now;
        const isVip = u.sub_end && new Date(u.sub_end).getFullYear() > 2099;

        let subLabel = '❌ Нет подписки';
        let subColor = 'var(--text-muted)';
        if (isVip) {
            subLabel = '💎 VIP Навсегда';
            subColor = 'var(--bybit-yellow)';
        } else if (isSubActive) {
            subLabel = `🟢 До ${new Date(u.sub_end).toLocaleDateString()}`;
            subColor = 'var(--bybit-green)';
        } else if (u.sub_end) {
            subLabel = `⏳ Истекла (${new Date(u.sub_end).toLocaleDateString()})`;
            subColor = 'var(--bybit-red)';
        }

        const isAdmin = adminIds.includes(u.tg_id);

        container.innerHTML += `
            <div class="admin-user-row" onclick="selectAdminUserFromDb(${u.tg_id})">
                <div style="flex: 1;">
                    <div style="font-weight: 800; font-size: 13px;">
                        ${u.first_name || 'Без имени'} ${u.username ? `(@${u.username})` : ''}
                        ${isAdmin ? '<span style="color: var(--bybit-yellow); font-size: 10px; margin-left: 4px;">[ADMIN]</span>' : ''}
                    </div>
                    <div style="font-size: 11px; color: var(--text-muted); font-family: monospace; margin-top: 2px;">
                        ID: ${u.tg_id} • Сделок: ${u._tradesCount || 0}
                    </div>
                    <div style="font-size: 11px; margin-top: 3px; color: ${subColor}; font-weight: 700;">
                        ${subLabel} ${u.trial_used ? '• [Брал триал]' : ''}
                    </div>
                </div>
                <button class="btn-card-action" style="padding: 6px 10px; font-size: 11px;">Выбрать</button>
            </div>
        `;
    });
}

function selectAdminUserFromDb(tgId) {
    document.getElementById('admin-target-uid').value = tgId;
    closeModals();
    adminInspectUser();
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
        box.innerHTML = `<span style="color: var(--bybit-red);">Пользователь не найден в базе</span>`;
        return;
    }

    const u = uRes[0];
    const tradesCnt = tRes ? tRes.length : 0;
    const subStr = u.sub_end ? (new Date(u.sub_end).getFullYear() > 2099 ? '♾️ VIP Навсегда' : new Date(u.sub_end).toLocaleDateString()) : '❌ Нет доступа';

    box.style.display = 'block';
    box.innerHTML = `
        <div style="font-weight: 800; color: var(--bybit-yellow); margin-bottom: 6px;">
            👤 ${u.first_name || ''} (@${u.username || 'нет'})
        </div>
        <b>Telegram ID:</b> <code>${u.tg_id}</code><br>
        <b>Статус подписки:</b> ${subStr}<br>
        <b>Сделок в терминале:</b> ${tradesCnt}<br>
        <b>Был пробный период:</b> ${u.trial_used ? 'ДА' : 'НЕТ'}<br>
        <b>Заблокирован:</b> ${u.is_banned ? '⛔️ ДА' : '🟢 НЕТ'}<br>
        <b>Дата регистрации:</b> ${u.reg_date ? new Date(u.reg_date).toLocaleDateString() : '—'}
    `;
}

async function adminUserAction(action) {
    const targetId = parseInt(document.getElementById('admin-target-uid').value);
    if (!targetId) return showToast("⚠️ Выберите пользователя!");
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
        showToast(`❌ ID ${targetId}: подписка снята`);
    } else if (action === 'ban') {
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ is_banned: true }) });
        showToast(`⛔️ ID ${targetId}: забанен`);
    } else if (action === 'unban') {
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ is_banned: false }) });
        showToast(`🟢 ID ${targetId}: разбанен`);
    }
    adminInspectUser();
    loadActiveUsersForAdmin();
}

async function adminExportDatabase(onlyWithSub = true) {
    showToast("⏳ Формирование выгрузки...");
    try {
        let users = await db(`users?order=reg_date.desc`);
        if (!users || users.length === 0) return showToast("База пуста");

        if (onlyWithSub) {
            users = users.filter(u => (u.sub_end !== null && u.sub_end !== undefined) || (u.trial_used === true));
        }

        let csv = "TG_ID,Username,First_Name,Sub_End,Trial_Used,Is_Admin,Is_Banned,Reg_Date\n";
        users.forEach(u => {
            const isAdmin = adminIds.includes(u.tg_id);
            csv += `"${u.tg_id}","${u.username || ''}","${(u.first_name || '').replace(/"/g, '""')}","${u.sub_end || ''}","${u.trial_used ? 'YES' : 'NO'}","${isAdmin ? 'YES' : 'NO'}","${u.is_banned ? 'YES' : 'NO'}","${u.reg_date || ''}"\n`;
        });

        const fileName = `P2P_Users_${onlyWithSub ? 'Subscribed' : 'Full'}_${new Date().toISOString().slice(0, 10)}.csv`;
        const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
        const fileUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("📥 База скачана!");
    } catch(e) {
        showToast("❌ Ошибка экспорта");
    }
}

async function adminCreatePromo() {
    const code = document.getElementById('new-promo-code').value.trim().toUpperCase();
    const days = parseInt(document.getElementById('new-promo-days').value);
    const max = parseInt(document.getElementById('new-promo-max').value) || 1;

    if (!code || !days) return showToast("⚠️ Заполните код и дни!");

    await db(`promocodes`, {
        method: 'POST',
        body: JSON.stringify({ code: code, days: days, max_activations: max, used_count: 0 })
    });
    showToast("✅ Промокод создан!");
    document.getElementById('new-promo-code').value = '';
    document.getElementById('new-promo-days').value = '';
}

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
        if (isAdmin) {
            loadActiveUsersForAdmin();
            loadAdminConfigValues();
        }
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
    try {
        await Promise.all([
            db(`bot_config?key=eq.PRICE_MONTH`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-month').value }) }),
            db(`bot_config?key=eq.PRICE_FOREVER`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-forever').value }) }),
            db(`bot_config?key=eq.BYBIT_UID`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-uid').value }) }),
            db(`bot_config?key=eq.TRIAL_DAYS`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-trial').value }) }),
            db(`bot_config?key=eq.REF_BONUS_DAYS`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-ref').value }) }),
            db(`bot_config?key=eq.ADMIN_IDS`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-admin-ids').value }) })
        ]);
        showToast("✅ Конфигурация сохранена!");
    } catch(e) {
        showToast("Ошибка сохранения");
    }
}

/* ====================================================
   ПОДПИСКА
==================================================== */
function checkSubscription() {
    const badgeEl = document.getElementById('disp-tier-badge');
    if (!currentUser) return false;

    if (currentUser.is_banned) {
        if (badgeEl) {
            badgeEl.className = 'sub-tier-badge tier-expired';
            badgeEl.innerText = '⛔️ Banned';
        }
        document.getElementById('paywall').style.display = 'block';
        return false;
    }

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
   ОДИНОЧНЫЕ ОРДЕРА
==================================================== */
let currentType = 'buy';
let calcMode = 'fiat';

function setTradeType(type) {
    currentType = type;
    document.getElementById('btn-buy').className = `switch-btn ${type === 'buy' ? 'active buy' : ''}`;
    document.getElementById('btn-sell').className = `switch-btn ${type === 'sell' ? 'active sell' : ''}`;
    const btn = document.getElementById('btn-save');
    btn.className = `action-btn ${type === 'sell' ? 'sell-mode' : ''}`;
    checkTradeInputs();
}

function setCalcMode(mode) {
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
    if (!requireSubscription()) return;

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
    await refreshData();
    renderAll();
    handleNavClick('dashboard', document.querySelector('.nav-btn[data-target="dashboard"]'));
}

function openNewCardModal() {
    if (!requireSubscription()) return;
    document.getElementById('modal-card-create')?.classList.add('show');
}

async function submitCreateCard() {
    if (!requireSubscription()) return;

    const name = document.getElementById('new-card-name').value.trim();
    const num = document.getElementById('new-card-num').value.trim();
    const holder = document.getElementById('new-card-holder').value.trim();
    const limit = parseFloat(document.getElementById('new-card-limit').value) || null;
    const monthLimit = parseFloat(document.getElementById('new-card-month-limit').value) || null;

    if (!name) return showToast("⚠️ Введите название карты!");

    await db(`cards`, {
        method: 'POST',
        body: JSON.stringify({
            tg_id: currentUser.tg_id,
            card_name: name,
            card_number: num,
            holder_name: holder,
            buy_limit: limit,
            month_limit: monthLimit,
            color_accent: '#f3a600',
            status: 'active'
        })
    });
    closeModals();
    showToast("✅ Карта создана!");
    await refreshData();
    renderAll();
}

function openCardOpModal(cid, type) {
    if (!requireSubscription()) return;
    activeCardId = cid;
    activeOpType = type;
    document.getElementById('modal-op-title').innerText = type === 'deposit' ? '➕ Пополнение кассы' : '➖ Снятие наличных';
    document.getElementById('modal-op-btn').innerText = type === 'deposit' ? 'Внести' : 'Списать';
    document.getElementById('withdraw-limit-toggle-wrap').style.display = type === 'withdraw' ? 'flex' : 'none';
    document.getElementById('modal-card-op')?.classList.add('show');
}

async function submitCardOp() {
    if (!requireSubscription()) return;

    const amt = parseFloat(document.getElementById('card-op-amount').value);
    const comm = document.getElementById('card-op-comment').value.trim();
    const inLimit = document.getElementById('chk-op-in-limit').checked;
    if (!amt || amt <= 0) return showToast("⚠️ Введите сумму!");

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
    showToast("✅ Записано в кассу!");
    await refreshData();
    renderCards();
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
        if (tg?.HapticFeedback) {
            if (type === 'light' || type === 'medium') tg.HapticFeedback.impactOccurred(type);
            if (type === 'success') tg.HapticFeedback.notificationOccurred('success');
        }
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

    // При возврате на экран сводки календарь возвращается на текущий месяц
    if (targetId === 'dashboard') {
        calViewDate = new Date();
        if (isHeatmapOpen) renderHeatmap();
    }
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

    // Защитный аварийный тайм-аут: загрузчик исчезает всегда
    const emergencyTimeout = setTimeout(() => {
        forceHideLoader();
        renderAll();
    }, 1800);

    const tgUser = tg?.initDataUnsafe?.user || { id: SUPER_ADMIN_ID, first_name: "Admin Tester", username: "admin" };
    const startParam = tg?.initDataUnsafe?.start_param || null;

    try {
        let users = await db(`users?tg_id=eq.${tgUser.id}`);
        if (!users || users.length === 0) {
            // Исключение по ТЗ: реферер от админа 517..... или 1 / -1 игнорируется
            let cleanRefBy = null;
            if (startParam) {
                const parsedRef = parseInt(startParam.trim());
                if (!isNaN(parsedRef) && parsedRef !== SUPER_ADMIN_ID && parsedRef !== 1 && parsedRef !== -1) {
                    cleanRefBy = parsedRef;
                }
            }

            const created = await db(`users`, {
                method: 'POST',
                body: JSON.stringify({
                    tg_id: tgUser.id,
                    username: tgUser.username,
                    first_name: tgUser.first_name,
                    currency: 'RUB',
                    tz_offset: 3,
                    ref_by: cleanRefBy
                })
            });
            currentUser = created ? created[0] : { tg_id: tgUser.id, currency: 'RUB', tz_offset: 3 };
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
