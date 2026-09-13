/* ====================================================
   P2P TERMINAL PRO — CORE ENGINE v1.0.0
   Enterprise Ledger, Card Manager, Calendar & WAC Engine
==================================================== */
/* ====================================================
   CLIENT HARDENING & ANTI-DEBUG CORE
==================================================== */
(function() {
    // 1. Блокировка контекстного меню правой кнопки мыши
    document.addEventListener('contextmenu', e => e.preventDefault());

    // 2. Блокировка вызова DevTools горячими клавишами
    document.addEventListener('keydown', e => {
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
            (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
            (e.ctrlKey && (e.key === 'u' || e.key === 'U'))
        ) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });

    // 3. Защита от остановки скрипта через debugger
    setInterval(() => {
        const startTime = performance.now();
        (function() { return false; }['constructor']('debugger')());
        if (performance.now() - startTime > 100) {
            document.body.innerHTML = '<div style="color:red;padding:40px;text-align:center;font-family:sans-serif;">Security policy violation. Terminal locked.</div>';
        }
    }, 1500);
})();


const API_URL = "https://slddpusuckhhvvetpgxa.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZGRwdXN1Y2toaHZ2ZXRwZ3hhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODYwNzMyMiwiZXhwIjoyMTA0MTgzMzIyfQ.obfZa6h7dKqVvzdHUAXRQ6TAZ8dSsmBZqmUCtBVO0QM";

const SUPER_ADMIN_ID = 5172556128;
let adminIds = [SUPER_ADMIN_ID];

/* ====================================================
   МУЛЬТИЯЗЫЧНЫЙ СЛОВАРЬ (7 ЯЗЫКОВ)
==================================================== */
const I18N = {
    ru: {
        accessDenied: "Доступ ограничен",
        accessDeniedDesc: "Терминал защищен и запускается исключительно через Telegram Mini App.",
        openBotBtn: "🚀 Открыть бота",
        bannerTag: "ОБЪЯВЛЕНИЕ АДМИНИСТРАЦИИ",
        tabToday: "За сегодня",
        tabMonth: "За месяц",
        tabAll: "Все время",
        tabCustom: "Свой период 📅",
        presetYesterday: "Вчера",
        preset7d: "7 дней",
        preset14d: "14 дней",
        preset30d: "30 дней",
        dateFrom: "С даты",
        dateTo: "По дату",
        btnApplyDate: "Применить ⚡️",
        totalProfitBadge: "💰 ОБЩАЯ ПРИБЫЛЬ",
        btnPnlCard: "📸 PnL-карточка",
        spreadBadge: "📊 СПРЕД СДЕЛОК",
        lastCycleTitle: "Последний круг",
        avgSpreadTitle: "Ср. за период",
        wacTimeframeHint: "По WAC за таймфрейм",
        showSecondary: "📊 Развернуть подробную статистику",
        hideSecondary: "📊 Скрыть подробную статистику",
        netIn: "Чистая в",
        formulaFiat: "Фиатный остаток: разница поступивших и отданных рублей на картах",
        netInUsdt: "Чистая в USDT",
        formulaUsdt: "Крипто-остаток: чистая прибыль в USDT на бирже сверх депозита",
        midPriceHint: "⚖️ Средняя цена (Mid Price):",
        turnCombinedTitle: "💸 Оборот (Фиат / USDT)",
        statWac: "🛒 WAC Закупка",
        statAvgSell: "🏷 Ср. Продажа",
        statRoi: "📈 ROI от оборота",
        statOps: "🔢 Сделок / Покупок / Продаж",
        calcTitle: "⚡️ КАЛЬКУЛЯТОР КРУГА",
        calcBindCard: "Привязать карту к кругу",
        calcDealPrice: "Прайс сделки",
        calcBuyHeader: "ПОКУПКА 🟢",
        calcBuyRate: "Курс USDT",
        calcSellHeader: "ПРОДАЖА 🔴",
        calcSellRate: "Курс USDT",
        calcSpread: "Спред:",
        calcProfit: "Прибыль с круга:",
        calcSaveCycle: "Сохранить круг ✅",
        calcClear: "Очистить ❌",
        calendarMonthTitle: "📅 Календарь общей прибыли",
        calDragHint: "Зажмите и ведите пальцем",
        tradeTitle: "Новая операция",
        tradeSubtitle: "Внести единичный ордер в базу",
        buyBtn: "ПОКУПКА 🟢",
        sellBtn: "ПРОДАЖА 🔴",
        fiatAmountTab: "Сумма фиата",
        cryptoAmountTab: "Объем USDT (🪙)",
        rateUsdtLabel: "Курс USDT",
        bankCardOptionalLabel: "Банковская карта (Опционально)",
        saveTradeBtn: "СОХРАНИТЬ СДЕЛКУ",
        cardsTitle: "Мои карты",
        cardsSubtitle: "Контроль кассы, лимитов и смен",
        btnTransfer: "🔄 Трансфер",
        btnCreateCard: "➕ Создать",
        historyTitle: "История операций",
        historySubtitle: "Синхронизированные сделки, круги и заметки",
        profileTitle: "Настройки",
        profileSubtitle: "Конфигурация интерфейса, валюты и промокоды",
        yourTgId: "ВАШ TELEGRAM ID",
        btnSubscription: "💎 Подписка",
        promocodeTitle: "🎁 Активация промокода",
        btnApply: "Применить",
        soundTitle: "Звук монет / кассы",
        soundDesc: "Аудио-эффект при сохранении",
        feedModeTitle: "Режим общей ленты",
        fxModeTitle: "Визуальные спецэффекты (FX)",
        langTitle: "Язык интерфейса (7 языков)",
        currTitle: "Базовая валюта",
        tzTitle: "Часовой пояс (UTC)",
        btnSupport: "👨‍💻 Служба поддержки",
        refTitle: "Партнерская сеть",
        refSubtitle: "Бонусные дни за приглашения",
        refCountLabel: "Приглашено пользователей",
        refWhyTitle: "В чем польза звать трейдеров:",
        refWhy1: "• +3 дня Premium начисляются автоматически за каждого активного приглашенного.",
        refWhy2: "• Ваши рефералы навсегда закрепляются за вашим Telegram ID.",
        refWhy3: "• Неограниченная аналитика, калькулятор и облачный синхрон касс.",
        refLinkBadge: "Ваша партнерская ссылка",
        btnCopy: "📋 Скопировать",
        btnShare: "🚀 Отправить",
        paywallTitle: "Доступ к Терминалу 🔒",
        paywallDesc: "Оформите доступ для разблокировки всех функций",
        trialBadge: "Бесплатный доступ",
        trialText: "🎁 Пробный период 24 часа активируется внутри нашего Telegram-бота.",
        btnActivateTrial: "🎁 Активировать триал",
        plansBadge: "Тарифные планы",
        plansText: "Оплата и сверка перевода Bybit производятся безопасно внутри бота.",
        plan1Month: "1 Месяц",
        planForever: "Навсегда",
        btnBuySub: "💳 Оформить подписку",
        navDashboard: "Сводка",
        navTrade: "Сделка",
        navCards: "Карты",
        navHistory: "История",
        navSettings: "Настройки",
        navAdmin: "Админ"
    },
    en: {
        accessDenied: "Access Restricted",
        accessDeniedDesc: "Terminal is protected and only opens inside Telegram Mini App.",
        openBotBtn: "🚀 Open Telegram Bot",
        bannerTag: "ADMIN ANNOUNCEMENT",
        tabToday: "Today",
        tabMonth: "This Month",
        tabAll: "All Time",
        tabCustom: "Custom 📅",
        presetYesterday: "Yesterday",
        preset7d: "7 days",
        preset14d: "14 days",
        preset30d: "30 days",
        dateFrom: "From date",
        dateTo: "To date",
        btnApplyDate: "Apply ⚡️",
        totalProfitBadge: "💰 TOTAL PROFIT",
        btnPnlCard: "📸 PnL Card",
        spreadBadge: "📊 SPREAD ANALYSIS",
        lastCycleTitle: "Last Cycle",
        avgSpreadTitle: "Period Avg",
        wacTimeframeHint: "By WAC in timeframe",
        showSecondary: "📊 Expand Detailed Stats",
        hideSecondary: "📊 Hide Detailed Stats",
        netIn: "Net in",
        formulaFiat: "Sell − Buy",
        netInUsdt: "Net in USDT",
        formulaUsdt: "Buy − Sell",
        midPriceHint: "⚖️ Mid Price:",
        turnCombinedTitle: "💸 Turnover (Fiat / USDT)",
        statWac: "🛒 WAC Buy Price",
        statAvgSell: "🏷 Avg Sell Price",
        statRoi: "📈 Turnover ROI",
        statOps: "🔢 Total / Buys / Sells",
        calcTitle: "⚡️ CYCLE CALCULATOR",
        calcBindCard: "Bind card to cycle",
        calcDealPrice: "Deal Budget",
        calcBuyHeader: "BUY 🟢",
        calcBuyRate: "USDT Rate",
        calcSellHeader: "SELL 🔴",
        calcSellRate: "USDT Rate",
        calcSpread: "Spread:",
        calcProfit: "Cycle profit:",
        calcSaveCycle: "Save Cycle ✅",
        calcClear: "Clear ❌",
        calendarMonthTitle: "📅 Total Profit Calendar",
        calDragHint: "Press and slide finger",
        tradeTitle: "New Trade",
        tradeSubtitle: "Record single order into ledger",
        buyBtn: "BUY 🟢",
        sellBtn: "SELL 🔴",
        fiatAmountTab: "Fiat Amount",
        cryptoAmountTab: "USDT Volume (🪙)",
        rateUsdtLabel: "USDT Rate",
        bankCardOptionalLabel: "Bank Card (Optional)",
        saveTradeBtn: "SAVE TRADE",
        cardsTitle: "My Cards",
        cardsSubtitle: "Cashflow, limits and shifts",
        btnTransfer: "🔄 Transfer",
        btnCreateCard: "➕ Add Card",
        historyTitle: "Operations History",
        historySubtitle: "Synchronized trades, cycles & notes",
        profileTitle: "Settings",
        profileSubtitle: "Interface config, currency and promos",
        yourTgId: "YOUR TELEGRAM ID",
        btnSubscription: "💎 Subscription",
        promocodeTitle: "🎁 Redeem Promocode",
        btnApply: "Apply",
        soundTitle: "Cash register sound",
        soundDesc: "Audio feedback on save",
        feedModeTitle: "Feed Layout Mode",
        fxModeTitle: "Visual Effects (FX)",
        langTitle: "App Language (7 languages)",
        currTitle: "Base Currency",
        tzTitle: "Timezone (UTC)",
        btnSupport: "👨‍💻 Support Center",
        refTitle: "Affiliate Network",
        refSubtitle: "Bonus days for invitations",
        refCountLabel: "Invited Traders",
        refWhyTitle: "Why invite traders:",
        refWhy1: "• +3 days Premium automatically added per active invitee.",
        refWhy2: "• Referrals permanently bound to your Telegram ID.",
        refWhy3: "• Full ledger analytics, cycle calculator & cloud sync.",
        refLinkBadge: "Your Invite Link",
        btnCopy: "📋 Copy",
        btnShare: "🚀 Share",
        paywallTitle: "Terminal Access 🔒",
        paywallDesc: "Subscribe to unlock all features",
        trialBadge: "Free Access",
        trialText: "🎁 24-hour trial period activates inside Telegram Bot.",
        btnActivateTrial: "🎁 Activate Trial",
        plansBadge: "Subscription Plans",
        plansText: "Payment and Bybit UID checks are processed in the bot.",
        plan1Month: "1 Month",
        planForever: "Lifetime",
        btnBuySub: "💳 Get Subscription",
        navDashboard: "Summary",
        navTrade: "Trade",
        navCards: "Cards",
        navHistory: "History",
        navSettings: "Settings",
        navAdmin: "Admin"
    },
    es: {
        accessDenied: "Acceso Restringido",
        accessDeniedDesc: "El terminal está protegido y sólo se abre en Telegram Mini App.",
        openBotBtn: "🚀 Abrir Bot de Telegram",
        bannerTag: "AVISO DE ADMINISTRACIÓN",
        tabToday: "Hoy",
        tabMonth: "Este Mes",
        tabAll: "Todo el tiempo",
        tabCustom: "Rango 📅",
        presetYesterday: "Ayer",
        preset7d: "7 días",
        preset14d: "14 días",
        preset30d: "30 días",
        dateFrom: "Desde",
        dateTo: "Hasta",
        btnApplyDate: "Aplicar ⚡️",
        totalProfitBadge: "💰 GANANCIA TOTAL",
        btnPnlCard: "📸 Tarjeta PnL",
        spreadBadge: "📊 SPREAD DE OPERACIONES",
        lastCycleTitle: "Último ciclo",
        avgSpreadTitle: "Prom. período",
        wacTimeframeHint: "Por WAC en período",
        showSecondary: "📊 Ver estadísticas detalladas",
        hideSecondary: "📊 Ocultar estadísticas",
        netIn: "Neto en",
        formulaFiat: "Venta − Compra",
        netInUsdt: "Neto en USDT",
        formulaUsdt: "Compra − Venta",
        midPriceHint: "⚖️ Precio Medio (Mid Price):",
        turnCombinedTitle: "💸 Volumen (Fiat / USDT)",
        statWac: "🛒 WAC Compra",
        statAvgSell: "🏷 Venta Media",
        statRoi: "📈 ROI de volumen",
        statOps: "🔢 Total / Compras / Ventas",
        calcTitle: "⚡️ CALCULADORA DE CICLO",
        calcBindCard: "Vincular tarjeta al ciclo",
        calcDealPrice: "Monto de operación",
        calcBuyHeader: "COMPRA 🟢",
        calcBuyRate: "Tasa USDT",
        calcSellHeader: "VENTA 🔴",
        calcSellRate: "Tasa USDT",
        calcSpread: "Spread:",
        calcProfit: "Ganancia del ciclo:",
        calcSaveCycle: "Guardar Ciclo ✅",
        calcClear: "Limpiar ❌",
        calendarMonthTitle: "📅 Calendario de Ganancia Total",
        calDragHint: "Mantenga presionado y deslice el dedo",
        tradeTitle: "Nueva Operación",
        tradeSubtitle: "Registrar orden simple",
        buyBtn: "COMPRA 🟢",
        sellBtn: "VENTA 🔴",
        fiatAmountTab: "Monto Fiat",
        cryptoAmountTab: "Volumen USDT (🪙)",
        rateUsdtLabel: "Tasa USDT",
        bankCardOptionalLabel: "Tarjeta (Opcional)",
        saveTradeBtn: "GUARDAR OPERACIÓN",
        cardsTitle: "Mis Tarjetas",
        cardsSubtitle: "Control de caja, límites y descansos",
        btnTransfer: "🔄 Transferencia",
        btnCreateCard: "➕ Crear",
        historyTitle: "Historial de Operaciones",
        historySubtitle: "Operaciones y ciclos sincronizados",
        profileTitle: "Ajustes",
        profileSubtitle: "Configuración, divisa y promociones",
        yourTgId: "SU TELEGRAM ID",
        btnSubscription: "💎 Suscripción",
        promocodeTitle: "🎁 Activar Código",
        btnApply: "Aplicar",
        soundTitle: "Sonido de caja",
        soundDesc: "Efecto de audio al guardar",
        feedModeTitle: "Modo Feed continuo",
        fxModeTitle: "Efectos Visuales (FX)",
        langTitle: "Idioma (7 idiomas)",
        currTitle: "Moneda base",
        tzTitle: "Zona horaria (UTC)",
        btnSupport: "👨‍💻 Soporte Técnico",
        refTitle: "Red de Afiliados",
        refSubtitle: "Días extra por invitar",
        refCountLabel: "Traders Invitados",
        refWhyTitle: "Por qué invitar traders:",
        refWhy1: "• +3 días Premium otorgados por cada invitado.",
        refWhy2: "• Referidos vinculados de por vida a tu ID.",
        refWhy3: "• Análisis completo, calculadora y sincronización.",
        refLinkBadge: "Tu Enlace de Afiliado",
        btnCopy: "📋 Copiar",
        btnShare: "🚀 Enviar",
        paywallTitle: "Acceso al Terminal 🔒",
        paywallDesc: "Suscríbase para desbloquear todas las funciones",
        trialBadge: "Acceso Gratuito",
        trialText: "🎁 Período de prueba de 24 horas se activa en el bot.",
        btnActivateTrial: "🎁 Activar Prueba",
        plansBadge: "Planes Disponibles",
        plansText: "Pagos verificados vía Bybit en el bot.",
        plan1Month: "1 Mes",
        planForever: "De por vida",
        btnBuySub: "💳 Obtener Suscripción",
        navDashboard: "Resumen",
        navTrade: "Operar",
        navCards: "Tarjetas",
        navHistory: "Historial",
        navSettings: "Ajustes",
        navAdmin: "Admin"
    },
    fr: {
        accessDenied: "Accès Restreint",
        accessDeniedDesc: "Le terminal fonctionne uniquement via Telegram Mini App.",
        openBotBtn: "🚀 Ouvrir le Bot",
        bannerTag: "ANNONCE OFFICIELLE",
        tabToday: "Aujourd'hui",
        tabMonth: "Ce Mois",
        tabAll: "Tout le temps",
        tabCustom: "Période 📅",
        presetYesterday: "Hier",
        preset7d: "7 jours",
        preset14d: "14 jours",
        preset30d: "30 jours",
        dateFrom: "Du",
        dateTo: "Au",
        btnApplyDate: "Appliquer ⚡️",
        totalProfitBadge: "💰 PROFIT TOTAL",
        btnPnlCard: "📸 Carte PnL",
        spreadBadge: "📊 SPREAD DU CYCLE",
        lastCycleTitle: "Dernier cycle",
        avgSpreadTitle: "Moy. période",
        wacTimeframeHint: "Par WAC temporel",
        showSecondary: "📊 Voir détails avancés",
        hideSecondary: "📊 Masquer les détails",
        netIn: "Net en",
        formulaFiat: "Vente − Achat",
        netInUsdt: "Net en USDT",
        formulaUsdt: "Achat − Vente",
        midPriceHint: "⚖️ Prix Moyen (Mid Price):",
        turnCombinedTitle: "💸 Volume (Fiat / USDT)",
        statWac: "🛒 WAC Achat",
        statAvgSell: "🏷 Vente Moyenne",
        statRoi: "📈 ROI sur volume",
        statOps: "🔢 Total / Achats / Ventes",
        calcTitle: "⚡️ CALCULATEUR DE CYCLE",
        calcBindCard: "Lier la carte au cycle",
        calcDealPrice: "Budget de l'ordre",
        calcBuyHeader: "ACHAT 🟢",
        calcBuyRate: "Taux USDT",
        calcSellHeader: "VENTE 🔴",
        calcSellRate: "Taux USDT",
        calcSpread: "Spread:",
        calcProfit: "Profit du cycle:",
        calcSaveCycle: "Sauvegarder ✅",
        calcClear: "Effacer ❌",
        calendarMonthTitle: "📅 Calendrier du Profit Total",
        calDragHint: "Maintenez et glissez avec le doigt",
        tradeTitle: "Nouvel Ordre",
        tradeSubtitle: "Ajouter un ordre unitaire",
        buyBtn: "ACHAT 🟢",
        sellBtn: "VENTE 🔴",
        fiatAmountTab: "Montant Fiat",
        cryptoAmountTab: "Volume USDT (🪙)",
        rateUsdtLabel: "Taux USDT",
        bankCardOptionalLabel: "Carte Bancaire (Optionnel)",
        saveTradeBtn: "ENREGISTRER",
        cardsTitle: "Mes Cartes",
        cardsSubtitle: "Contrôle caisse, limites et repos",
        btnTransfer: "🔄 Transfert",
        btnCreateCard: "➕ Créer",
        historyTitle: "Historique",
        historySubtitle: "Ordres et cycles enregistrés",
        profileTitle: "Paramètres",
        profileSubtitle: "Configuration générale et codes",
        yourTgId: "VOTRE TELEGRAM ID",
        btnSubscription: "💎 Abonnement",
        promocodeTitle: "🎁 Code Promo",
        btnApply: "Appliquer",
        soundTitle: "Son de caisse",
        soundDesc: "Effet audio à la validation",
        feedModeTitle: "Mode Défilement",
        fxModeTitle: "Effets Visuels (FX)",
        langTitle: "Langue (7 langues)",
        currTitle: "Devise de base",
        tzTitle: "Fuseau horaire (UTC)",
        btnSupport: "👨‍💻 Assistance",
        refTitle: "Parrainage",
        refSubtitle: "Jours bonus par invitation",
        refCountLabel: "Traders Parrainés",
        refWhyTitle: "Pourquoi parrainer :",
        refWhy1: "• +3 jours Premium offerts par filleul actif.",
        refWhy2: "• Filleuls liés à vie à votre ID.",
        refWhy3: "• Analyse illimitée, calculs et synchronisation cloud.",
        refLinkBadge: "Votre Lien de Parrainage",
        btnCopy: "📋 Copier",
        btnShare: "🚀 Partager",
        paywallTitle: "Accès Restreint 🔒",
        paywallDesc: "Abonnez-vous pour débloquer l'accès complet",
        trialBadge: "Essai Gratuit",
        trialText: "🎁 Essai de 24 heures disponible dans le bot Telegram.",
        btnActivateTrial: "🎁 Activer Essai",
        plansBadge: "Nos Tarifs",
        plansText: "Paiement via Bybit dans le bot.",
        plan1Month: "1 Mois",
        planForever: "À vie",
        btnBuySub: "💳 S'abonner",
        navDashboard: "Stats",
        navTrade: "Ordre",
        navCards: "Cartes",
        navHistory: "Historique",
        navSettings: "Réglages",
        navAdmin: "Admin"
    },
    de: {
        accessDenied: "Zugriff Verweigert",
        accessDeniedDesc: "Das Terminal funktioniert ausschließlich über Telegram Mini App.",
        openBotBtn: "🚀 Bot Öffnen",
        bannerTag: "ADMIN-ANKÜNDIGUNG",
        tabToday: "Heute",
        tabMonth: "Dieser Monat",
        tabAll: "Gesamt",
        tabCustom: "Zeitraum 📅",
        presetYesterday: "Gestern",
        preset7d: "7 Tage",
        preset14d: "14 Tage",
        preset30d: "30 Tage",
        dateFrom: "Von",
        dateTo: "Bis",
        btnApplyDate: "Anwenden ⚡️",
        totalProfitBadge: "💰 GESAMTGEWINN",
        btnPnlCard: "📸 PnL-Karte",
        spreadBadge: "📊 SPREAD-ANALYSE",
        lastCycleTitle: "Letzter Zyklus",
        avgSpreadTitle: "Ø Zeitraum",
        wacTimeframeHint: "Nach WAC-Zeitraum",
        showSecondary: "📊 Detaillierte Statistiken",
        hideSecondary: "📊 Statistiken ausblenden",
        netIn: "Netto in",
        formulaFiat: "Verkauf − Einkauf",
        netInUsdt: "Netto in USDT",
        formulaUsdt: "Einkauf − Verkauf",
        midPriceHint: "⚖️ Mid Price:",
        turnCombinedTitle: "💸 Umsatz (Fiat / USDT)",
        statWac: "🛒 WAC Einkauf",
        statAvgSell: "🏷 Ø Verkauf",
        statRoi: "📈 Umsatz-ROI",
        statOps: "🔢 Gesamt / Kauf / Verkauf",
        calcTitle: "⚡️ ZYKLUS-RECHNER",
        calcBindCard: "Karte mit Zyklus verknüpfen",
        calcDealPrice: "Einsatzbetrag",
        calcBuyHeader: "KAUF 🟢",
        calcBuyRate: "USDT Kurs",
        calcSellHeader: "VERKAUF 🔴",
        calcSellRate: "USDT Kurs",
        calcSpread: "Spread:",
        calcProfit: "Zyklusgewinn:",
        calcSaveCycle: "Speichern ✅",
        calcClear: "Löschen ❌",
        calendarMonthTitle: "📅 Gesamtgewinn-Kalender",
        calDragHint: "Drücken und mit Finger gleiten",
        tradeTitle: "Neue Transaktion",
        tradeSubtitle: "Einzelauftrag im Ledger ablegen",
        buyBtn: "KAUF 🟢",
        sellBtn: "VERKAUF 🔴",
        fiatAmountTab: "Fiat-Betrag",
        cryptoAmountTab: "USDT-Volumen (🪙)",
        rateUsdtLabel: "USDT Kurs",
        bankCardOptionalLabel: "Bankkarte (Optional)",
        saveTradeBtn: "SPEICHERN",
        cardsTitle: "Meine Karten",
        cardsSubtitle: "Kasse, Limits und Schichten",
        btnTransfer: "🔄 Transfer",
        btnCreateCard: "➕ Erstellen",
        historyTitle: "Verlauf",
        historySubtitle: "Trades und Notizen",
        profileTitle: "Einstellungen",
        profileSubtitle: "Interface, Währung und Promo",
        yourTgId: "IHRE TELEGRAM ID",
        btnSubscription: "💎 Abonnement",
        promocodeTitle: "🎁 Promo-Code",
        btnApply: "Anwenden",
        soundTitle: "Kassensound",
        soundDesc: "Audioton beim Speichern",
        feedModeTitle: "Feed-Modus",
        fxModeTitle: "Effekte (FX)",
        langTitle: "Sprache (7 Sprachen)",
        currTitle: "Basiswährung",
        tzTitle: "Zeitzone (UTC)",
        btnSupport: "👨‍💻 Support",
        refTitle: "Partnerprogramm",
        refSubtitle: "Bonus-Tage für Empfehlungen",
        refCountLabel: "Eingeladene Trader",
        refWhyTitle: "Vorteile beim Empfehlen:",
        refWhy1: "• +3 Tage Premium für jeden eingeladenen Trader.",
        refWhy2: "• Empfehlungen dauerhaft mit ID verknüpft.",
        refWhy3: "• Unbegrenzte Ledger-Tools und Cloud-Sync.",
        refLinkBadge: "Ihr Einladungslink",
        btnCopy: "📋 Kopieren",
        btnShare: "🚀 Senden",
        paywallTitle: "Zugriff gesperrt 🔒",
        paywallDesc: "Abonnieren Sie, um alle Funktionen freizuschalten",
        trialBadge: "Kostenloser Test",
        trialText: "🎁 24h Testphase im Telegram Bot starten.",
        btnActivateTrial: "🎁 Test starten",
        plansBadge: "Tarife",
        plansText: "Zahlung und Bybit-Prüfung im Bot.",
        plan1Month: "1 Monat",
        planForever: "Lebenslang",
        btnBuySub: "💳 Abonnieren",
        navDashboard: "Übersicht",
        navTrade: "Trade",
        navCards: "Karten",
        navHistory: "Historie",
        navSettings: "Optionen",
        navAdmin: "Admin"
    },
    uk: {
        accessDenied: "Доступ обмежено",
        accessDeniedDesc: "Термінал захищений і запускається виключно через Telegram Mini App.",
        openBotBtn: "🚀 Відкрити бота",
        bannerTag: "ОГОЛОШЕННЯ АДМІНІСТРАЦІЇ",
        tabToday: "За сьогодні",
        tabMonth: "За місяць",
        tabAll: "Весь час",
        tabCustom: "Свій період 📅",
        presetYesterday: "Вчора",
        preset7d: "7 днів",
        preset14d: "14 днів",
        preset30d: "30 днів",
        dateFrom: "З дати",
        dateTo: "По дату",
        btnApplyDate: "Застосувати ⚡️",
        totalProfitBadge: "💰 ЗАГАЛЬНИЙ ПРИБУТОК",
        btnPnlCard: "📸 PnL-картка",
        spreadBadge: "📊 СПРЕД УГОД",
        lastCycleTitle: "Останній круг",
        avgSpreadTitle: "Сер. за період",
        wacTimeframeHint: "За WAC за таймфрейм",
        showSecondary: "📊 Розгорнути детальну статистику",
        hideSecondary: "📊 Приховати детальну статистику",
        netIn: "Чистий у",
        formulaFiat: "Продаж − Купівля",
        netInUsdt: "Чистий в USDT",
        formulaUsdt: "Купівля − Продаж",
        midPriceHint: "⚖️ Середня ціна (Mid Price):",
        turnCombinedTitle: "💸 Оборот (Фіат / USDT)",
        statWac: "🛒 WAC Закупівля",
        statAvgSell: "🏷 Сер. Продаж",
        statRoi: "📈 ROI від обороту",
        statOps: "🔢 Угод / Купівель / Продажів",
        calcTitle: "⚡️ КАЛЬКУЛЯТОР КРУГА",
        calcBindCard: "Прив'язати картку до круга",
        calcDealPrice: "Прайс угоди",
        calcBuyHeader: "КУПІВЛЯ 🟢",
        calcBuyRate: "Курс USDT",
        calcSellHeader: "ПРОДАЖ 🔴",
        calcSellRate: "Курс USDT",
        calcSpread: "Спред:",
        calcProfit: "Прибуток з круга:",
        calcSaveCycle: "Зберегти круг ✅",
        calcClear: "Очистити ❌",
        calendarMonthTitle: "📅 Календар загального прибутку",
        calDragHint: "Затисніть і ведіть пальцем",
        tradeTitle: "Нова операція",
        tradeSubtitle: "Внести одиничний ордер",
        buyBtn: "КУПІВЛЯ 🟢",
        sellBtn: "ПРОДАЖ 🔴",
        fiatAmountTab: "Сума фіату",
        cryptoAmountTab: "Об'єм USDT (🪙)",
        rateUsdtLabel: "Курс USDT",
        bankCardOptionalLabel: "Банківська картка (Опціонально)",
        saveTradeBtn: "ЗБЕРЕГТИ УГОДУ",
        cardsTitle: "Мої картки",
        cardsSubtitle: "Контроль каси, лімітів та змін",
        btnTransfer: "🔄 Трансфер",
        btnCreateCard: "➕ Створити",
        historyTitle: "Історія операцій",
        historySubtitle: "Синхронізовані угоди, круги та нотатки",
        profileTitle: "Налаштування",
        profileSubtitle: "Конфігурація інтерфейсу та промокоди",
        yourTgId: "ВАШ TELEGRAM ID",
        btnSubscription: "💎 Підписка",
        promocodeTitle: "🎁 Активація промокоду",
        btnApply: "Застосувати",
        soundTitle: "Звук монет / каси",
        soundDesc: "Аудіо-ефект при збереженні",
        feedModeTitle: "Режим загальної стрічки",
        fxModeTitle: "Візуальні спецефекти (FX)",
        langTitle: "Мова (7 мов)",
        currTitle: "Базова валюта",
        tzTitle: "Часовий пояс (UTC)",
        btnSupport: "👨‍💻 Служба підтримки",
        refTitle: "Партнерська мережа",
        refSubtitle: "Бонусні дні за запрошення",
        refCountLabel: "Запрошено користувачів",
        refWhyTitle: "У чому користь запрошувати трейдерів:",
        refWhy1: "• +3 дні Premium нараховуються автоматично за кожного активного запрошеного.",
        refWhy2: "• Ваші реферали назавжди закріплюються за вашим Telegram ID.",
        refWhy3: "• Необмежена аналітика, калькулятор та хмарна синхронізація.",
        refLinkBadge: "Ваше партнерське посилання",
        btnCopy: "📋 Скопіювати",
        btnShare: "🚀 Надіслати",
        paywallTitle: "Доступ обмежено 🔒",
        paywallDesc: "Оформіть доступ для розблокування функцій",
        trialBadge: "Безкоштовний доступ",
        trialText: "🎁 Пробний період 24 години активується в нашому боті.",
        btnActivateTrial: "🎁 Активувати тріал",
        plansBadge: "Тарифні плани",
        plansText: "Оплата та перевірка переказу Bybit у боті.",
        plan1Month: "1 Місяць",
        planForever: "Назавжди",
        btnBuySub: "💳 Оформити підписку",
        navDashboard: "Зведення",
        navTrade: "Угода",
        navCards: "Картки",
        navHistory: "Історія",
        navSettings: "Налаштування",
        navAdmin: "Адмін"
    },
    kk: {
        accessDenied: "Қолжетімділік шектелген",
        accessDeniedDesc: "Терминал қорғалған және тек Telegram Mini App арқылы жұмыс істейді.",
        openBotBtn: "🚀 Ботты ашу",
        bannerTag: "ӘКІМШІЛІК ХАБАРЛАНДЫРУЫ",
        tabToday: "Бүгін",
        tabMonth: "Осы айда",
        tabAll: "Барлық уақыт",
        tabCustom: "Өз кезеңіңіз 📅",
        presetYesterday: "Кеше",
        preset7d: "7 күн",
        preset14d: "14 күн",
        preset30d: "30 күн",
        dateFrom: "Бастап",
        dateTo: "Дейін",
        btnApplyDate: "Қолдану ⚡️",
        totalProfitBadge: "💰 ЖАЛПЫ ПАЙДА",
        btnPnlCard: "📸 PnL-картасы",
        spreadBadge: "📊 МӘМІЛЕ СПРЕДІ",
        lastCycleTitle: "Соңғы айналым",
        avgSpreadTitle: "Кезең орташасы",
        wacTimeframeHint: "Таймфреймдегі WAC бойынша",
        showSecondary: "📊 Толық статистиканы ашу",
        hideSecondary: "📊 Статистиканы жасыру",
        netIn: "Таза пайда",
        formulaFiat: "Сату − Сатып алу",
        netInUsdt: "Таза USDT",
        formulaUsdt: "Сатып алу − Сату",
        midPriceHint: "⚖️ Орташа баға (Mid Price):",
        turnCombinedTitle: "💸 Айналым (Фиат / USDT)",
        statWac: "🛒 WAC Сатып алу",
        statAvgSell: "🏷 Орташа сату",
        statRoi: "📈 Айналымнан ROI",
        statOps: "🔢 Барлығы / Сатып алу / Сату",
        calcTitle: "⚡️ АЙНАЛЫМ КАЛЬКУЛЯТОРЫ",
        calcBindCard: "Картаны айналымға байлау",
        calcDealPrice: "Мәміле сомасы",
        calcBuyHeader: "САТЫП АЛУ 🟢",
        calcBuyRate: "USDT бағамы",
        calcSellHeader: "САТУ 🔴",
        calcSellRate: "USDT бағамы",
        calcSpread: "Спред:",
        calcProfit: "Айналым пайдасы:",
        calcSaveCycle: "Айналымды сақтау ✅",
        calcClear: "Тазарту ❌",
        calendarMonthTitle: "📅 Жалпы пайда күнтізбесі",
        calDragHint: "Саусағыңызды басып сырғытыңыз",
        tradeTitle: "Жаңа операция",
        tradeSubtitle: "Базаға ордер енгізу",
        buyBtn: "САТЫП АЛУ 🟢",
        sellBtn: "САТУ 🔴",
        fiatAmountTab: "Фиат сомасы",
        cryptoAmountTab: "USDT көлемі (🪙)",
        rateUsdtLabel: "USDT бағамы",
        bankCardOptionalLabel: "Банк картасы (Міндетті емес)",
        saveTradeBtn: "МӘМІЛЕНІ САҚТАУ",
        cardsTitle: "Менің карталарым",
        cardsSubtitle: "Касса, лимиттер және ауысым",
        btnTransfer: "🔄 Трансфер",
        btnCreateCard: "➕ Қосу",
        historyTitle: "Мәмілелер тарихы",
        historySubtitle: "Синхрондалған мәмілелер мен жазбалар",
        profileTitle: "Баптаулар",
        profileSubtitle: "Интерфейс пен жазылымды реттеу",
        yourTgId: "СІЗДІҢ TELEGRAM ID",
        btnSubscription: "💎 Жазылым",
        promocodeTitle: "🎁 Промокодты белсендіру",
        btnApply: "Қолдану",
        soundTitle: "Касса/монета дыбысы",
        soundDesc: "Сақтау кезіндегі аудио",
        feedModeTitle: "Жалпы лента режимі",
        fxModeTitle: "Визуалды әсерлер (FX)",
        langTitle: "Тіл (7 тіл)",
        currTitle: "Негізгі валюта",
        tzTitle: "Уақыт белдеуі (UTC)",
        btnSupport: "👨‍💻 Қолдау қызметі",
        refTitle: "Серіктестік желі",
        refSubtitle: "Шақыртулар үшін бонустық күндер",
        refCountLabel: "Шақырылған трейдерлер",
        refWhyTitle: "Трейдерлерді шақырудың пайдасы:",
        refWhy1: "• Әр белсенді шақырылған адам үшін автоматты түрде +3 күн Premium.",
        refWhy2: "• Рефералдарыңыз сіздің Telegram ID-ге мәңгілікке бекітіледі.",
        refWhy3: "• Шектеусіз аналитика, калькулятор және бұлтты касса синхроны.",
        refLinkBadge: "Сіздің серіктестік сілтемеңіз",
        btnCopy: "📋 Көшіру",
        btnShare: "🚀 Жіберу",
        paywallTitle: "Терминалға қолжетімділік 🔒",
        paywallDesc: "Барлық мүмкіндіктерді ашу үшін жазылыңыз",
        trialBadge: "Тегін қолжетімділік",
        trialText: "🎁 24 сағаттық сынақ мерзімі Telegram-ботымызда іске қосылады.",
        btnActivateTrial: "🎁 Триалды қосу",
        plansBadge: "Тарифтік жоспарлар",
        plansText: "Төлем және Bybit UID тексеру ботта жасалады.",
        plan1Month: "1 Ай",
        planForever: "Мәңгілікке",
        btnBuySub: "💳 Жазылуды рәсімдеу",
        navDashboard: "Жиынтық",
        navTrade: "Мәміле",
        navCards: "Карталар",
        navHistory: "Тарих",
        navSettings: "Баптаулар",
        navAdmin: "Админ"
    }
};

/* ====================================================
   ПОДСКАЗКИ СПРАВКИ (?)
==================================================== */
const HELP_DATA = {
    total_profit: {
        title: "💰 ОБЩАЯ ПРИБЫЛЬ",
        text: `<b>Консолидированный доход в арбитраже:</b><br><br>
        <code>Общая прибыль = Чистая в фиате + (Чистая в USDT × Mid Price)</code><br><br>
        Складывает чистый заработок рублей на счетах и стоимость оставшихся монет USDT по фактическому среднему курсу.`
    },
    period_compare: {
        title: "📈 СРАВНЕНИЕ С ПРОШЛЫМ ПЕРИОДОМ",
        text: `Показывает процентный прирост или спад прибыли по отношению к аналогичному отрезку времени в прошлом (вчера, прошлый месяц или предыдущие N дней). Если сделок ранее не было, выводится статус первого запуска.`
    },
    net_fiat: {
        title: "💵 ЧИСТАЯ В ФИАТЕ",
        text: `<b>Движение рублей на банковских картах:</b><br><br>
        <code>Поступления от продажи USDT − Расходы на закупку USDT</code><br><br>
        • <b>Плюс (+):</b> Вы забрали больше рублей, чем потратили (доход зафиксирован на карте).<br>
        • <b>Минус (−):</b> Часть рублей ушла в покупку монет и сейчас находится на балансе биржи.`
    },
    net_usdt: {
        title: "🪙 ЧИСТАЯ В USDT",
        text: `<b>Движение криптовалюты на бирже:</b><br><br>
        <code>Купленный объем USDT − Проданный объем USDT</code><br><br>
        • <b>Плюс (+):</b> Вы вернули фиатный депозит, а прибыль оставили в монетах USDT.<br>
        • <b>Минус (−):</b> Вы распродали старый склад монет на сумму большую, чем закупили за этот период.`
    },
    cards_actions_help: {
        title: "💳 УПРАВЛЕНИЕ КАРТАМИ",
        text: `• <b>Трансфер:</b> перемещение денег между своими картами без влияния на торговую прибыль.<br>• <b>Создать:</b> добавление новой карты с суточным и месячным лимитом по 115-ФЗ.`
    },
    template_chat_help: {
        title: "💬 ШАБЛОН РЕКВИЗИТОВ ДЛЯ ЧАТА",
        text: `Вы настраиваете текст сообщения один раз с тегами {bank}, {number}, {holder}. При нажатии кнопки копирования терминал сам подставит реальные реквизиты карты для отправки покупателю на бирже.`
    },
    history_info: {
        title: "📜 ИСТОРИЯ ОПЕРАЦИЙ",
        text: `Реестр всех ваших покупок, продаж и кругов. Кнопка 🔁 моментально переносит параметры ордера в калькулятор для быстрого повтора.`
    },
    history_delete_help: {
        title: "🗑 ОЧИСТКА ИСТОРИИ",
        text: `Позволяет безопасно стереть сделки за сегодня, за текущий месяц или полностью очистить облачную историю операций.`
    },
    calc_deal_budget: {
        title: "💵 СУММА КРУГА (ПРАЙС)",
        text: `Объем фиата в рублях, на который вы совершаете закупку монет в связке.`
    },
    calc_profit_mode: {
        title: "⚡️ РЕЖИМ ФИКСАЦИИ ПРИБЫЛИ",
        text: `• <b>В фиате:</b> продаете все монеты, профит падает на карту в рублях.<br>• <b>В USDT:</b> возвращаете тело депозита на карту, а прибыль остается в крипте.`
    },
    calc_rates: {
        title: "📈 КУРСЫ КРУГА",
        text: `Курс закупки USDT и курс продажи покупателю. Разница между ними формирует спред.`
    },
    single_order_type: {
        title: "⚡️ ТИП ОРДЕРА",
        text: `Покупка 🟢 (тратим фиат, получаем USDT) или Продажа 🔴 (отдаем USDT, получаем фиат).`
    },
    trade_input_mode: {
        title: "🔄 РЕЖИМ ВВОДА",
        text: `Ввод от суммы в рублях или от точного количества монет USDT.`
    },
    trade_card_bind: {
        title: "💳 ПРИВЯЗКА КАРТЫ",
        text: `Связывает ордер с картой: сумма сразу списывается или зачисляется в кассу и учитывается в лимитах.`
    },
    card_limits_help: {
        title: "🛡 ЛИМИТЫ 115-ФЗ",
        text: `Суточный и месячный объем оборота по карте. При превышении карта автоматически помечается статусом «Лимит исчерпан».`
    },
    card_status_help: {
        title: "⏳ СТАТУСЫ КАРТ",
        text: `• <b>В работе 🟢:</b> карта активна.<br>• <b>На отлежке ⏳:</b> карта на паузе, таймер показывает точный обратный отсчет.<br>• <b>115-ФЗ 🔥:</b> заблокированная карта, переносится в конец списка.`
    },
    admin_banner_help: {
        title: "📢 ЖИВОЙ БАННЕР",
        text: `Текст, который в реальном времени появляется вверху экрана у всех пользователей терминала.`
    },
    admin_promo_help: {
        title: "🎟 ПРОМОКОДЫ",
        text: `Выпуск бонусных промокодов на дни подписки.`
    },
    admin_broadcast_help: {
        title: "🤖 РАССЫЛКА",
        text: `Отправка сообщения через Telegram-бота всем пользователям из базы.`
    },
    calculator: {
        title: "⚡️ КАЛЬКУЛЯТОР КРУГА",
        text: `Расчет полного цикла арбитража с сохранением результатов в базу данных.`
    },
    spread: {
        title: "📊 СПРЕД",
        text: `Процент чистой маржи с одного круга: ((Продажа − Покупка) / Покупка) × 100%.`
    },
    mid_price: {
        title: "⚖️ MID PRICE",
        text: `Средневзвешенная цена доллара за выбранный период для справедливой оценки крипто-остатка.`
    },
    turnover: {
        title: "💸 ОБОРОТ",
        text: `Сумма всех прокрученных фиатных средств и монет.`
    },
    wac: {
        title: "🛒 WAC ЗАКУПКА",
        text: `Реальная себестоимость закупки одного доллара USDT с учетом всех ваших сделок.`
    },
    avg_sell: {
        title: "🏷 СРЕДНЯЯ ПРОДАЖА",
        text: `Фактический средний курс продажи монет покупателям.`
    },
    roi: {
        title: "📈 ROI ОТ ОБОРОТА",
        text: `Сколько копеек чистой прибыли принес каждый прокрученный рубль оборота.`
    },
    calc_card: {
        title: "💳 КАРТА КРУГА",
        text: `Привязка связки к банковской карте для авто-учета кассы.`
    },
    calendar: {
        title: "📅 КАЛЕНДАРЬ ОБЩЕЙ ПРИБЫЛИ",
        text: `Каждый день считает полную общую прибыль (рубли + USDT по курсу дня). Зажмите палец на ячейке для быстрого просмотра.`
    },
    cards_overview: {
        title: "💳 МОДУЛЬ КАРТ",
        text: `Учет кассы, остатка денег на счетах и лимитов 115-ФЗ.`
    }
};



/* ====================================================
   ИНТЕГРАЦИЯ С TELEGRAM MINI APP
==================================================== */
const tg = window.Telegram?.WebApp;
if (tg) {
    try {
        tg.expand();
        tg.ready();
        if (tg.disableVerticalSwipes) tg.disableVerticalSwipes();
        if (typeof tg.isVerticalSwipesEnabled !== 'undefined') tg.isVerticalSwipesEnabled = false;
        // Защита от белого фона Telegram при сворачивании и открытии
        if (tg.setHeaderColor) tg.setHeaderColor('#05070a');
        if (tg.setBackgroundColor) tg.setBackgroundColor('#05070a');
    } catch(e) {}
}

// Восстановление фона при возвращении во вкладку
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && tg) {
        try {
            if (tg.setHeaderColor) tg.setHeaderColor('#05070a');
            if (tg.setBackgroundColor) tg.setBackgroundColor('#05070a');
        } catch(e) {}
    }
});



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
let activeSelectedDealColor = 'default';
let activeSelectedCardColor = '#f3a600';

let isSecondaryExpanded = false;
let isHeatmapOpen = false;
// Переменные для месяца календаря, шаблонов и drag-and-drop
let calendarViewDate = new Date();
let draggedCardId = null;
let editTradeMode = 'fiat'; // 'fiat' или 'crypto'
let globalCardTemplate = localStorage.getItem('p2p_global_msg_template') || "{bank}: {number} ({holder})\nОплата строго со своего счета! Чек обязателен.";

// ПАГИНАЦИЯ (МАКСИМУМ 25 ШТУК, ДО 4 СТРАНИЦ)
const ITEMS_PER_PAGE = 25;
const MAX_PAGES = 4;
let cardsCurrentPage = 1;
let historyCurrentPage = 1;

// АДМИН БАЗА ПОЛЬЗОВАТЕЛЕЙ
let rawAdminUsersList = [];
let adminDbFilterOnlySub = true;

// НАСТРОЙКИ
let currentLang = localStorage.getItem('p2p_terminal_lang') || 'ru';
let uiMode = localStorage.getItem('p2p_ui_mode') || 'simple';
let layoutMode = localStorage.getItem('p2p_layout_mode') || 'pages';
let isIncognito = localStorage.getItem('p2p_incognito') === 'true';
let soundEnabled = localStorage.getItem('p2p_sound_enabled') !== 'false';

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
   ПРОВЕРКА НАЛИЧИЯ АКТИВНОЙ ПОДПИСКИ ДЛЯ ЛЮБОГО ДЕЙСТВИЯ
==================================================== */
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
    if (typeof actionCallback === 'function') {
        actionCallback();
    }
    return true;
}

/* ====================================================
   ТАКТИЛЬНЫЙ ЗВУК КАССЫ И МОНЕТ
==================================================== */
function playCashSound() {
    if (!soundEnabled) return;
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        const audioCtx = new AudioContextClass();
        const now = audioCtx.currentTime;

        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(987.77, now);
        osc1.frequency.exponentialRampToValueAtTime(1318.51, now + 0.08);
        gain1.gain.setValueAtTime(0.22, now);
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
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start(now + 0.06);
        osc2.stop(now + 0.42);
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
    showToast(isIncognito ? "🕶 Инкогнито: балансы скрыты" : "👁 Балансы открыты");
}

/* ====================================================
   ВАЛЮТЫ И СИМВОЛЫ
==================================================== */
function getCurrencySymbol() {
    const map = { "RUB": "₽", "KZT": "₸", "UAH": "₴", "BYN": "Br", "USD": "$" };
    return map[currentUser?.currency || 'RUB'] || "₽";
}

function updateAllCurrencySymbols() {
    const sym = getCurrencySymbol();
    document.querySelectorAll('.sym').forEach(el => el.innerText = sym);
}

async function changeCurrency(val) {
    haptic('medium');
    if (!currentUser) return;
    currentUser.currency = val;
    localStorage.setItem('p2p_currency', val);
    updateAllCurrencySymbols();
    try {
        await db(`users?tg_id=eq.${currentUser.tg_id}`, {
            method: 'PATCH',
            body: JSON.stringify({ currency: val })
        });
    } catch(e) {}
    renderAll();
    showToast(`Валюта: ${val}`);
}

async function updateTimezone(tzVal) {
    haptic('light');
    if (!currentUser) return;
    currentUser.tz_offset = parseInt(tzVal);
    try {
        await db(`users?tg_id=eq.${currentUser.tg_id}`, {
            method: 'PATCH',
            body: JSON.stringify({ tz_offset: currentUser.tz_offset })
        });
    } catch(e) {}
    renderAll();
    showToast(`Часовой пояс: UTC+${tzVal}`);
}

/* ====================================================
   МУЛЬТИЯЗЫЧНОСТЬ (7 ЯЗЫКОВ)
==================================================== */
function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('p2p_terminal_lang', lang);
    const dict = I18N[lang] || I18N.ru;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerText = dict[key];
        }
    });

    const tBtn = document.getElementById('txt-toggle-details');
    if (tBtn) {
        tBtn.innerText = isSecondaryExpanded ? dict.hideSecondary : dict.showSecondary;
    }

    updateAllCurrencySymbols();
}

function changeLanguage(lang) {
    haptic('light');
    applyLanguage(lang);
    showToast("Язык интерфейса обновлен");
    renderAll();
}

/* ====================================================
   ЖИВОЙ БАННЕР-ОБЪЯВЛЕНИЕ
==================================================== */
async function loadLiveSiteBanner() {
    const bannerEl = document.getElementById('site-live-banner');
    const textEl = document.getElementById('site-live-banner-text');
    if (!bannerEl || !textEl) return;

    let bannerText = localStorage.getItem('p2p_live_banner_text') || '';
    let isActive = localStorage.getItem('p2p_live_banner_active') === 'true';

    try {
        const [txtRes, actRes] = await Promise.all([
            db(`bot_config?key=eq.SITE_BANNER_TEXT`),
            db(`bot_config?key=eq.SITE_BANNER_ACTIVE`)
        ]);
        if (txtRes?.[0]) bannerText = txtRes[0].value;
        if (actRes?.[0]) isActive = actRes[0].value === 'true' || actRes[0].value === true;
    } catch(e) {}

    if (isActive && bannerText.trim().length > 0) {
        textEl.innerText = bannerText;
        bannerEl.className = 'banner-active';
        bannerEl.style.display = 'flex';
        const adminInp = document.getElementById('admin-banner-text');
        if (adminInp) adminInp.value = bannerText;
    } else {
        bannerEl.className = 'banner-empty';
        bannerEl.style.display = 'none';
    }
}

async function adminUpdateBanner(isActive) {
    haptic('medium');
    const text = document.getElementById('admin-banner-text').value.trim();

    localStorage.setItem('p2p_live_banner_text', text);
    localStorage.setItem('p2p_live_banner_active', String(isActive));

    try {
        await Promise.all([
            db(`bot_config?key=eq.SITE_BANNER_TEXT`, { method: 'PATCH', body: JSON.stringify({ value: text }) }),
            db(`bot_config?key=eq.SITE_BANNER_ACTIVE`, { method: 'PATCH', body: JSON.stringify({ value: String(isActive) }) })
        ]);
    } catch(e) {}

    showToast(isActive ? "📢 Баннер включен!" : "Баннер скрыт");
    await loadLiveSiteBanner();
}

/* ====================================================
   КАЛЬКУЛЯТОР КРУГА (ЕДИНАЯ СДЕЛКА)
==================================================== */
let cycleProfitMode = 'fiat'; // 'fiat' или 'crypto'

function setCycleProfitMode(mode) {
    haptic('light');
    cycleProfitMode = mode;
    document.getElementById('calc-mode-fiat')?.classList.toggle('active', mode === 'fiat');
    document.getElementById('calc-mode-crypto')?.classList.toggle('active', mode === 'crypto');
    runCalculator();
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

    if (fiat > 0 && buyRate > 0 && sellRate > 0) {
        const spreadPct = ((sellRate - buyRate) / buyRate) * 100;
        const boughtUsdt = fiat / buyRate;

        if (elBuyCrypto) elBuyCrypto.innerText = `${boughtUsdt.toFixed(2)} USDT`;

        if (cycleProfitMode === 'fiat') {
            // Весь объем USDT продается: фиатный доход минус сумма закупки
            const soldFiat = boughtUsdt * sellRate;
            const profitFiat = soldFiat - fiat;
            if (elSellCrypto) elSellCrypto.innerText = `${boughtUsdt.toFixed(2)} USDT`;

            if (elSpread) elSpread.innerText = (spreadPct >= 0 ? "+" : "") + spreadPct.toFixed(2) + "%";
            if (elProfitUsdt) elProfitUsdt.innerText = "0.00 USDT";
            if (elProfitFiat) elProfitFiat.innerText = `${formatSignedMoney(profitFiat, 2)} ${sym}`;
        } else {
            // Продаем только на сумму закупки (тело 10к возвращаем), остаток USDT — чистая прибыль
            const soldUsdt = fiat / sellRate;
            const profitUsdt = boughtUsdt - soldUsdt;
            if (elSellCrypto) elSellCrypto.innerText = `${soldUsdt.toFixed(2)} USDT`;

            if (elSpread) elSpread.innerText = (spreadPct >= 0 ? "+" : "") + spreadPct.toFixed(2) + "%";
            if (elProfitUsdt) elProfitUsdt.innerText = `${formatSignedMoney(profitUsdt, 2)} USDT`;
            if (elProfitFiat) elProfitFiat.innerText = `0.00 ${sym}`;
        }
    } else {
        if (elBuyCrypto) elBuyCrypto.innerText = `0.00 USDT`;
        if (elSellCrypto) elSellCrypto.innerText = `0.00 USDT`;
        if (elSpread) elSpread.innerText = "0.00%";
        if (elProfitUsdt) elProfitUsdt.innerText = "0.00 USDT";
        if (elProfitFiat) elProfitFiat.innerText = `0.00 ${sym}`;
    }
}

async function saveCalculatedCycle() {
    if (!requireSubscription()) return;

    haptic('medium');
    const fiat = parseFloat(document.getElementById('calc-fiat-amt')?.value);
    const buyRate = parseFloat(document.getElementById('calc-buy-rate')?.value);
    const sellRate = parseFloat(document.getElementById('calc-sell-rate')?.value);
    const cardId = document.getElementById('calc-card-sel')?.value || null;

    if (!fiat || !buyRate || !sellRate || fiat <= 0 || buyRate <= 0 || sellRate <= 0) {
        showToast("⚠️ Заполните сумму и оба курса!");
        return;
    }

    const spreadPct = parseFloat((((sellRate - buyRate) / buyRate) * 100).toFixed(2));
    const boughtUsdt = parseFloat((fiat / buyRate).toFixed(2));

    let profitFiat = 0;
    let profitUsdt = 0;

    if (cycleProfitMode === 'fiat') {
        profitFiat = parseFloat(((boughtUsdt * sellRate) - fiat).toFixed(2));
        profitUsdt = 0;
    } else {
        profitFiat = 0;
        profitUsdt = parseFloat((boughtUsdt - (fiat / sellRate)).toFixed(2));
    }

    // Сохранение без лишних полей, которые вызывают ошибку БД
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
                tag_color: 'default',
                note: cycleProfitMode === 'crypto' ? 'Прибыль в USDT' : 'Прибыль в фиате'
            })
        });

        playCashSound();
        haptic('success');
        showToast("✅ Круг сохранен!");
        await refreshData();
        renderAll();
    } catch(e) {
        showToast("❌ Ошибка сохранения в базу");
    }
}

document.getElementById('calc-fiat-amt')?.addEventListener('input', runCalculator);
document.getElementById('calc-buy-rate')?.addEventListener('input', runCalculator);
document.getElementById('calc-sell-rate')?.addEventListener('input', runCalculator);

function clearCalculator() {
    haptic('light');
    const f = document.getElementById('calc-fiat-amt');
    const b = document.getElementById('calc-buy-rate');
    const s = document.getElementById('calc-sell-rate');
    if (f) f.value = '';
    if (b) b.value = '';
    if (s) s.value = '';
    runCalculator();
    showToast("Калькулятор очищен");
}



/* ====================================================
   МАТЕМАТИКА ПРИБЫЛИ
==================================================== */
function formatSignedMoney(val, decimals = 2) {
    const num = Number(val) || 0;
    if (Math.abs(num) < 0.00001) return `0.${'0'.repeat(decimals)}`;
    const sign = num > 0 ? '+' : '-';
    return `${sign}${Math.abs(num).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}


function calculateStats() {
    const tz = parseInt(currentUser?.tz_offset) !== undefined ? parseInt(currentUser.tz_offset) : 3;

    // Получаем текущую дату в выбранном часовом поясе пользователя через UTC-смещение
    const nowUtc = new Date();
    const userNow = new Date(nowUtc.getTime() + (tz * 3600 * 1000));

    const filtered = userTrades.filter(t => {
        const dUtc = new Date(t.date);
        const dUser = new Date(dUtc.getTime() + (tz * 3600 * 1000));

        if (currentPeriod === 'today') {
            return dUser.getUTCFullYear() === userNow.getUTCFullYear() &&
                   dUser.getUTCMonth() === userNow.getUTCMonth() &&
                   dUser.getUTCDate() === userNow.getUTCDate();
        }
        if (currentPeriod === 'month') {
            return dUser.getUTCFullYear() === userNow.getUTCFullYear() &&
                   dUser.getUTCMonth() === userNow.getUTCMonth();
        }
        if (currentPeriod === 'custom' && customStartDate && customEndDate) {
            const tradeTime = dUser.getTime();
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
            buysCount++;
            sellsCount++;
            bF += f;
            bC += c;

            const cProfitRub = parseFloat(t.cycle_profit_rub || 0);
            const cProfitUsdt = parseFloat(t.cycle_profit_usdt || 0);

            if (t.cycle_mode === 'crypto' || cProfitUsdt !== 0) {
                // Вся прибыль осталась в монетах, в фиате оборот закрыт в ноль
                sF += f;
                sC += (c - cProfitUsdt);
            } else {
                // Прибыль в фиате: продали на сумму + прибыль
                sF += (f + cProfitRub);
                sC += c;
            }
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
    const midPrice = (wac > 0 && avgSell > 0) ? (wac + avgSell) / 2 : (wac || avgSell || 0);

    const profitFiat = sF - bF;
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
    if (elTotalFiat) {
        elTotalFiat.innerHTML = `${formatSignedMoney(totalProfitFiat, 2)} <span style="font-size: 18px; color: var(--text-muted);">${sym}</span>`;
    }

    const elTotalUsdt = document.getElementById('val-total-profit-usdt');
    updateMetricColor(elTotalUsdt, totalProfitUsdt);
    if (elTotalUsdt) {
        elTotalUsdt.innerText = `${formatSignedMoney(totalProfitUsdt, 2)} USDT`;
    }

    const elProfitFiat = document.getElementById('val-profit-rub');
    updateMetricColor(elProfitFiat, profitFiat);
    if (elProfitFiat) {
        elProfitFiat.innerText = `${formatSignedMoney(profitFiat, 2)} ${sym}`;
    }

    const elProfitUsdt = document.getElementById('val-profit-usdt');
    updateMetricColor(elProfitUsdt, profitUsdt);
    if (elProfitUsdt) {
        elProfitUsdt.innerText = `${formatSignedMoney(profitUsdt, 2)} USDT`;
    }


    const elMidPrice = document.getElementById('hint-mid-price');
    if (elMidPrice) elMidPrice.innerText = midPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const lastCycle = userTrades.find(t => t.is_cycle);
    let lastSpread = 0;
    const hintLast = document.getElementById('hint-last-spread');
    if (lastCycle) {
        lastSpread = parseFloat(lastCycle.cycle_spread || 0);
        if (hintLast) hintLast.innerText = `${lastCycle.buy_rate} → ${lastCycle.sell_rate} ${sym}`;
    } else {
        const lastSell = userTrades.find(t => t.type === 'sell');
        const lastBuy = userTrades.find(t => t.type === 'buy');
        if (lastSell && lastBuy && parseFloat(lastBuy.rate) > 0) {
            lastSpread = ((parseFloat(lastSell.rate) - parseFloat(lastBuy.rate)) / parseFloat(lastBuy.rate)) * 100;
            if (hintLast) hintLast.innerText = `${lastBuy.rate} → ${lastSell.rate} ${sym}`;
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

    calculatePeriodComparison(totalProfitFiat);
    if (isHeatmapOpen) renderHeatmap(midPrice);
}

function calculatePeriodComparison(currentProfit) {
    const compBadge = document.getElementById('val-period-compare');
    if (!compBadge) return;

    const tz = parseInt(currentUser?.tz_offset) || 3;
    const now = new Date();
    now.setHours(now.getUTCHours() + tz);

    let priorTrades = [];

    if (currentPeriod === 'today') {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        priorTrades = userTrades.filter(t => {
            const d = new Date(t.date);
            d.setHours(d.getUTCHours() + tz);
            return d.toDateString() === yesterday.toDateString();
        });
    } else if (currentPeriod === 'month') {
        const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
        const lastYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
        priorTrades = userTrades.filter(t => {
            const d = new Date(t.date);
            d.setHours(d.getUTCHours() + tz);
            return d.getMonth() === lastMonth && d.getFullYear() === lastYear;
        });
    } else if (currentPeriod === 'custom' && customStartDate && customEndDate) {
        const diffMs = customEndDate.getTime() - customStartDate.getTime();
        const priorStart = new Date(customStartDate.getTime() - diffMs);
        const priorEnd = new Date(customStartDate.getTime() - 1);
        priorTrades = userTrades.filter(t => {
            const time = new Date(t.date).getTime();
            return time >= priorStart.getTime() && time <= priorEnd.getTime();
        });
    }

    if (priorTrades.length === 0) {
        compBadge.innerHTML = `🌱 Первый запуск периода`;
        compBadge.style.color = "var(--text-muted)";
        return;
    }

    // Честный расчет прибыли прошлого периода по той же формуле
    let pBF = 0, pBC = 0, pSF = 0, pSC = 0, pCycleRub = 0;
    priorTrades.forEach(t => {
        const f = parseFloat(t.fiat_amount || 0);
        const c = parseFloat(t.crypto_amount || 0);
        if (t.is_cycle) {
            pBF += f; pSF += f; pBC += c;
            pSC += (t.sell_rate ? f / parseFloat(t.sell_rate) : c);
            pCycleRub += parseFloat(t.cycle_profit_rub || 0);
        } else if (t.type === 'buy') {
            pBF += f; pBC += c;
        } else {
            pSF += f; pSC += c;
        }
    });

    const pWac = pBC > 0 ? pBF / pBC : 0;
    const pAvgSell = pSC > 0 ? pSF / pSC : 0;
    const pMid = (pWac > 0 && pAvgSell > 0) ? (pWac + pAvgSell) / 2 : (pWac || pAvgSell || 0);
    const priorProfit = (pSF - pBF + pCycleRub) + ((pBC - pSC) * pMid);

    if (Math.abs(priorProfit) < 0.01) {
        compBadge.innerHTML = currentProfit >= 0 ? `📈 +100% к прошлому периоду` : `📉 -100% к прошлому периоду`;
        compBadge.style.color = currentProfit >= 0 ? "var(--bybit-green)" : "var(--bybit-red)";
        return;
    }

    const diffPct = (((currentProfit - priorProfit) / Math.abs(priorProfit)) * 100).toFixed(1);
    const numDiff = parseFloat(diffPct);

    if (numDiff >= 0) {
        compBadge.innerHTML = `📈 +${numDiff}% к прошлому периоду`;
        compBadge.style.color = "var(--bybit-green)";
    } else {
        compBadge.innerHTML = `📉 -${Math.abs(numDiff)}% к прошлому периоду`;
        compBadge.style.color = "var(--bybit-red)";
    }
}


/* ====================================================
   КАЛЕНДАРЬ ОБЩЕЙ ПРИБЫЛИ (СКОЛЬЖЕНИЕ И АВТОЗАКРЫТИЕ)
==================================================== */
function toggleHeatmapPanel() {
    isHeatmapOpen = !isHeatmapOpen;
    const panel = document.getElementById('heatmap-panel');
    const arrow = document.getElementById('heatmap-arrow');
    if (panel) panel.style.display = isHeatmapOpen ? 'block' : 'none';
    if (arrow) arrow.innerText = isHeatmapOpen ? '▴' : '▾';
    if (isHeatmapOpen) renderHeatmap();
}

function navigateCalendarMonth(delta) {
    haptic('light');
    calendarViewDate.setMonth(calendarViewDate.getMonth() + delta);
    renderHeatmap();
}

function resetCalendarToCurrentMonth() {
    haptic('light');
    calendarViewDate = new Date();
    renderHeatmap();
}

function renderHeatmap() {
    const container = document.getElementById('calendar-grid-container');
    const popup = document.getElementById('calendar-floating-popup');
    if (!container) return;
    container.innerHTML = '';

    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    days.forEach(d => container.innerHTML += `<div class="cal-head">${d}</div>`);

    const year = calendarViewDate.getFullYear();
    const month = calendarViewDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;

    const monthTitle = document.getElementById('heatmap-month-title');
    if (monthTitle) {
        monthTitle.innerText = calendarViewDate.toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-US', { month: 'long', year: 'numeric' }).toUpperCase();
    }

    for (let i = 0; i < firstDayIndex; i++) {
        container.innerHTML += `<div></div>`;
    }

    const tz = parseInt(currentUser?.tz_offset) !== undefined ? parseInt(currentUser.tz_offset) : 3;

    // 1. Фильтруем сделки за отображаемый месяц с учетом часового пояса
    const monthTrades = userTrades.filter(t => {
        const dUtc = new Date(t.date);
        const dUser = new Date(dUtc.getTime() + (tz * 3600 * 1000));
        return dUser.getUTCFullYear() === year && dUser.getUTCMonth() === month;
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

    const mWac = mBC > 0 ? mBF / mBC : 0;
    const mAvgSell = mSC > 0 ? mSF / mSC : 0;
    // Фиксированный курс конвертации месяца — гарантирует математическое совпадение суммы дней с месячной прибылью
    const calendarMonthMidPrice = (mWac > 0 && mAvgSell > 0) ? (mWac + mAvgSell) / 2 : (mWac || mAvgSell || 0);

    const dayCellsData = {};

    for (let day = 1; day <= totalDays; day++) {
        const dayTrades = monthTrades.filter(t => {
            const dUtc = new Date(t.date);
            const dUser = new Date(dUtc.getTime() + (tz * 3600 * 1000));
            return dUser.getUTCDate() === day;
        });


        let dayBoughtUsdt = 0;
        let daySoldUsdt = 0;
        let dayTurnover = 0;
        let dBF = 0, dBC = 0, dSF = 0, dSC = 0;

        dayTrades.forEach(t => {
            const f = parseFloat(t.fiat_amount || 0);
            const c = parseFloat(t.crypto_amount || 0);
            dayTurnover += f;

            if (t.is_cycle) {
                dBF += f;
                dBC += c;
                const cProfitRub = parseFloat(t.cycle_profit_rub || 0);
                const cProfitUsdt = parseFloat(t.cycle_profit_usdt || 0);

                if (t.cycle_mode === 'crypto' || cProfitUsdt !== 0) {
                    dSF += f;
                    dSC += (c - cProfitUsdt);
                } else {
                    dSF += (f + cProfitRub);
                    dSC += c;
                }
            } else if (t.type === 'buy') {
                dBF += f;
                dBC += c;
            } else {
                dSF += f;
                dSC += c;
            }
        });

        // Честный расчет общей прибыли дня: фиатный профит + (крипто-профит * MidPrice)
        const dayProfitFiat = dSF - dBF;
        const dayProfitUsdt = dBC - dSC;
        const totalDayProfit = dayProfitFiat + (dayProfitUsdt * calendarMonthMidPrice);

        let colorClass = '';
        if (dayTrades.length > 0) {
            if (totalDayProfit > 10000) colorClass = 'profit-pos-high';
            else if (totalDayProfit > 2000) colorClass = 'profit-pos-mid';
            else if (totalDayProfit >= 0) colorClass = 'profit-pos-low';
            else colorClass = 'profit-neg';
        }

        dayCellsData[day] = {
            day,
            profit: totalDayProfit,
            count: dayTrades.length,
            turnover: dayTurnover
        };

        const cell = document.createElement('div');
        cell.className = `cal-day-cell ${colorClass}`;
        cell.dataset.day = String(day);
        cell.innerText = day;

        container.appendChild(cell);
    }

    let isTouchingCalendar = false;
    let currentHoverDay = null;

    function updateFloatingPopup(dayNum) {
        if (!dayNum || !dayCellsData[dayNum]) return;
        const data = dayCellsData[dayNum];
        const sym = getCurrencySymbol();

        document.getElementById('pop-date').innerText = `${data.day} ${monthTitle ? monthTitle.innerText : ''}`;
        const pVal = document.getElementById('pop-profit');
        pVal.innerText = `${formatSignedMoney(data.profit, 2)} ${sym}`;
        pVal.style.color = data.profit < 0 ? 'var(--bybit-red)' : (data.profit > 0 ? 'var(--bybit-green)' : 'var(--text-main)');

        const spreadCalc = data.turnover > 0 ? ((data.profit / data.turnover) * 100).toFixed(2) : "0.00";
        document.getElementById('pop-extra').innerText = `${data.count} сдел. • Спред: ${spreadCalc}%`;

        popup.classList.add('show');
    }

    function hideFloatingPopup() {
        isTouchingCalendar = false;
        currentHoverDay = null;
        popup.classList.remove('show');
        container.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('touch-active'));
    }

    function handlePointerAt(clientX, clientY) {
        const el = document.elementFromPoint(clientX, clientY);
        const cell = el ? el.closest('.cal-day-cell') : null;
        if (cell && cell.dataset.day) {
            const d = cell.dataset.day;
            if (d !== currentHoverDay) {
                currentHoverDay = d;
                container.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('touch-active'));
                cell.classList.add('touch-active');
                haptic('light');
                updateFloatingPopup(d);
            }
        }
    }

    container.onpointerdown = (e) => {
        isTouchingCalendar = true;
        handlePointerAt(e.clientX, e.clientY);
    };

    container.onpointermove = (e) => {
        if (!isTouchingCalendar) return;
        handlePointerAt(e.clientX, e.clientY);
    };

    window.addEventListener('pointerup', hideFloatingPopup);
    window.addEventListener('pointercancel', hideFloatingPopup);

    container.onclick = (e) => {
        const cell = e.target.closest('.cal-day-cell');
        if (!cell || !cell.dataset.day) return;
        const d = parseInt(cell.dataset.day);
        const data = dayCellsData[d];
        if (data) {
            openDayDetailsModal(d, data.profit, data.count, data.turnover);
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

    const spreadAvg = count > 0 ? (turnover > 0 ? ((profit / turnover) * 100).toFixed(2) : "0.00") : "0.00";
    document.getElementById('day-modal-spread-val').innerText = `${spreadAvg}%`;

    document.getElementById('modal-day-details').classList.add('show');
}

function closeDayDetailsModal(event) {
    if (event) event.stopPropagation();
    document.getElementById('modal-day-details').classList.remove('show');
}

/* ====================================================
   МОДУЛЬ КАРТ: СТАТУСЫ, ЛИМИТЫ, ПАГИНАЦИЯ (МАКСИМУМ 25, ДО 4 СТР)
==================================================== */
// Автопроверка выхода из отлежки по таймеру
function checkCardCooldowns() {
    const now = new Date();
    userCards.forEach(c => {
        const extra = JSON.parse(localStorage.getItem(`p2p_card_extra_${c.id}`) || '{}');
        const coolUntil = c.cooldown_until || extra.cooldown_until;
        if (c.status === 'cooldown' && coolUntil && new Date(coolUntil) <= now) {
            c.status = 'active';
            c.cooldown_until = null;
            extra.cooldown_until = null;
            localStorage.setItem(`p2p_card_extra_${c.id}`, JSON.stringify(extra));
            db(`cards?id=eq.${c.id}`, { method: 'PATCH', body: JSON.stringify({ status: 'active' }) }).catch(()=>{});

            // Системное уведомление о выходе из отлежки
            playCashSound();
            haptic('success');
            showToast(`🔔 Карта «${c.card_name}» вышла из отлежки и готова к работе!`);
        }
    });
}

function handleCardDragStart(e, cardId) {
    draggedCardId = cardId;
    e.dataTransfer.setData('text/plain', cardId);
    e.currentTarget.classList.add('dragging');
}

function handleCardDragOver(e) {
    e.preventDefault();
}

async function handleCardDrop(e, targetCardId) {
    e.preventDefault();
    if (!draggedCardId || draggedCardId === targetCardId) return;

    haptic('medium');
    const fromIdx = userCards.findIndex(c => c.id === draggedCardId);
    const toIdx = userCards.findIndex(c => c.id === targetCardId);

    if (fromIdx !== -1 && toIdx !== -1) {
        const [moved] = userCards.splice(fromIdx, 1);
        userCards.splice(toIdx, 0, moved);

        const orderMap = userCards.map(c => c.id);
        localStorage.setItem('p2p_card_custom_order', JSON.stringify(orderMap));
        renderCards();
        showToast("Порядок карт сохранен 🔀");
    }
}
function moveCardPosition(cardId, direction, event) {
    if (event) event.stopPropagation();
    haptic('light');
    const idx = userCards.findIndex(c => c.id === cardId);
    if (idx === -1) return;
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= userCards.length) return;

    const temp = userCards[idx];
    userCards[idx] = userCards[targetIdx];
    userCards[targetIdx] = temp;

    const order = userCards.map(c => c.id);
    localStorage.setItem('p2p_card_custom_order', JSON.stringify(order));
    renderCards();
    showToast("Порядок обновлен ↕️");
}



function renderCards() {
    checkCardCooldowns();
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
    const now = new Date();

    const savedOrder = JSON.parse(localStorage.getItem('p2p_card_custom_order') || '[]');
    if (savedOrder.length > 0) {
        userCards.sort((a, b) => {
            const iA = savedOrder.indexOf(a.id);
            const iB = savedOrder.indexOf(b.id);
            return (iA === -1 ? 999 : iA) - (iB === -1 ? 999 : iB);
        });
    }

    const sorted = [...userCards].sort((a, b) => {
        if (a.status === 'burned') return 1;
        if (b.status === 'burned') return -1;
        if (a.is_pinned && !b.is_pinned) return -1;
        if (!a.is_pinned && b.is_pinned) return 1;
        return 0;
    });

    const totalPages = Math.min(MAX_PAGES, Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE)));
    if (cardsCurrentPage > totalPages) cardsCurrentPage = totalPages;

    const startIndex = (cardsCurrentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    pageItems.forEach((c) => {
        const extra = JSON.parse(localStorage.getItem(`p2p_card_extra_${c.id}`) || '{}');
        const monthLimitVal = parseFloat(c.month_limit || extra.month_limit || 0);
        const dayLimitVal = parseFloat(c.buy_limit || 0);

        const cTrades = userTrades.filter(tr => tr.card_id === c.id);
        const spentBuyAll = cTrades.filter(tr => tr.type === 'buy').reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
        const gainSellAll = cTrades.filter(tr => tr.type === 'sell').reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
        const depsAll = cardOps.filter(o => o.card_id === c.id && o.type === 'deposit').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
        const wdrsAll = cardOps.filter(o => o.card_id === c.id && o.type === 'withdraw').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
        const balance = depsAll - wdrsAll + gainSellAll - spentBuyAll;

        // Покупки сегодня и в этом месяце
        const spentBuyToday = cTrades.filter(tr => tr.type === 'buy' && new Date(tr.date).toDateString() === now.toDateString())
                                     .reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
        const spentBuyMonth = cTrades.filter(tr => {
            const d = new Date(tr.date);
            return tr.type === 'buy' && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);

        // Снятия, которые учитываются в расходе лимита
        const wdrsTodayInLimit = cardOps.filter(o => {
            const isToday = new Date(o.created_at || o.date || now).toDateString() === now.toDateString();
            return o.card_id === c.id && o.type === 'withdraw' && (o.count_in_limit === true || o.count_in_limit === 'true') && isToday;
        }).reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);

        const wdrsMonthInLimit = cardOps.filter(o => {
            const d = new Date(o.created_at || o.date || now);
            const isThisMonth = d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            return o.card_id === c.id && o.type === 'withdraw' && (o.count_in_limit === true || o.count_in_limit === 'true') && isThisMonth;
        }).reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);

        // Итоговый расход лимита
        const totalSpentToday = spentBuyToday + wdrsTodayInLimit;
        const totalSpentMonth = spentBuyMonth + wdrsMonthInLimit;

        const dayPct = dayLimitVal > 0 ? Math.min(100, Math.round((totalSpentToday / dayLimitVal) * 100)) : 0;
        const monthPct = monthLimitVal > 0 ? Math.min(100, Math.round((totalSpentMonth / monthLimitVal) * 100)) : 0;

        // Автоматический статус "Лимит исчерпан"
        let currentStatus = c.status || 'active';
        if (currentStatus !== 'burned' && currentStatus !== 'cooldown') {
            const isLimitHit = (dayLimitVal > 0 && totalSpentToday >= dayLimitVal) || (monthLimitVal > 0 && totalSpentMonth >= monthLimitVal);
            currentStatus = isLimitHit ? 'limit_reached' : 'active';
        }

        let statusBadgeHtml = '<span style="font-size: 10px; color: var(--bybit-green); font-weight: 800;">🟢 В работе</span>';
        if (currentStatus === 'cooldown') {
            const coolUntil = c.cooldown_until || extra.cooldown_until;
            let coolText = '⏳ На отлежке';
            if (coolUntil) {
                const diffMs = new Date(coolUntil).getTime() - now.getTime();
                if (diffMs > 0) {
                    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
                    const totalMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                    const dObj = new Date(coolUntil);
                    const timeStr = `${dObj.getDate()} ${dObj.toLocaleDateString('ru-RU', { month: 'short' })}, ${String(dObj.getHours()).padStart(2, '0')}:${String(dObj.getMinutes()).padStart(2, '0')}`;
                    coolText = `⏳ До ${timeStr} (осталось ${totalHours}ч ${totalMins}м)`;
                } else {
                    coolText = '⏳ Отлежка завершена';
                }
            }
            statusBadgeHtml = `<span style="font-size: 10px; color: var(--bybit-purple); font-weight: 800;">${coolText}</span>`;
        } else if (currentStatus === 'limit_reached') {
            statusBadgeHtml = '<span style="font-size: 10px; color: var(--bybit-yellow); font-weight: 900;">⛔️ Лимит исчерпан</span>';
        } else if (currentStatus === 'burned') {
            statusBadgeHtml = '<span style="font-size: 10px; color: var(--bybit-red); font-weight: 900;">🔥 115-ФЗ (Архив)</span>';
        }

        const dayColor = dayPct > 90 ? 'danger' : (dayPct > 70 ? 'warning' : '');
        const monthColor = monthPct > 90 ? 'danger' : (monthPct > 70 ? 'warning' : '');

        const isBurned = currentStatus === 'burned';
        const isPinned = c.is_pinned;

        const todayBuys = cTrades.filter(tr => tr.type === 'buy' && new Date(tr.date).toDateString() === now.toDateString()).length;
        const todaySells = cTrades.filter(tr => (tr.type === 'sell' || tr.is_cycle) && new Date(tr.date).toDateString() === now.toDateString()).length;

        const dayStatText = dayLimitVal > 0
            ? `${Math.round(totalSpentToday).toLocaleString()} / ${Math.round(dayLimitVal).toLocaleString()} ${sym} (${dayPct}%)`
            : `∞`;
        const monthStatText = monthLimitVal > 0
            ? `${Math.round(totalSpentMonth).toLocaleString()} / ${Math.round(monthLimitVal).toLocaleString()} ${sym} (${monthPct}%)`
            : `∞`;

        container.innerHTML += `
            <div class="card-row-item ${isBurned ? 'burned' : ''} ${isPinned ? 'pinned' : ''}" onclick="openCardBottomSheet(${c.id})">
                <div class="card-stripe" style="background: ${c.color_accent || 'var(--bybit-yellow)'};"></div>

                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="display: flex; flex-direction: column; gap: 2px;" onclick="event.stopPropagation()">
                            <button class="cal-nav-btn" style="width: 20px; height: 17px; font-size: 9px;" onclick="moveCardPosition(${c.id}, -1, event)">▲</button>
                            <button class="cal-nav-btn" style="width: 20px; height: 17px; font-size: 9px;" onclick="moveCardPosition(${c.id}, 1, event)">▼</button>
                        </div>
                        <div>
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span style="font-weight: 800; font-size: 15px;">${c.card_name}</span>
                                ${isPinned ? '<span style="font-size: 11px;">📌</span>' : ''}
                            </div>
                            <div style="margin-top: 2px;">${statusBadgeHtml}</div>
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="text-align: right;">
                            <div class="privacy-blur" style="font-size: 16px; font-weight: 900;">
                                ${balance.toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}
                            </div>
                        </div>
                        <div class="ops-bubble" title="Покупки / Продажи за сегодня" style="font-size: 11px; font-weight: 800; padding: 4px 8px; border-radius: 8px; background: rgba(0,0,0,0.4); border: 1px solid var(--glass-border); white-space: nowrap;">
                            🟢 ${todayBuys} / 🔴 ${todaySells}
                        </div>
                    </div>
                </div>

                <!-- Полоски лимита на всю ширину с данными над ними -->
                <div class="card-dual-bars-wrap">
                    <div class="card-bar-block">
                        <div class="card-bar-header">
                            <span class="card-bar-tag">Суточный лимит</span>
                            <span class="card-bar-stat-text">${dayStatText}</span>
                        </div>
                        <div class="card-mini-bar">
                            <div class="card-mini-bar-fill ${dayColor}" style="width: ${dayLimitVal > 0 ? dayPct : 0}%;"></div>
                        </div>
                    </div>
                    <div class="card-bar-block">
                        <div class="card-bar-header">
                            <span class="card-bar-tag">Месячный лимит</span>
                            <span class="card-bar-stat-text">${monthStatText}</span>
                        </div>
                        <div class="card-mini-bar">
                            <div class="card-mini-bar-fill ${monthColor}" style="width: ${monthLimitVal > 0 ? monthPct : 0}%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    renderPaginationBar(paginationContainer, totalPages, cardsCurrentPage, (p) => {
        cardsCurrentPage = p;
        renderCards();
    });
}
function renderPaginationBar(containerEl, totalPages, curPage, onChangePage) {
    if (!containerEl) return;
    if (totalPages <= 1) {
        containerEl.innerHTML = '';
        return;
    }

    let html = '';
    for (let p = 1; p <= totalPages; p++) {
        html += `<div class="page-btn ${p === curPage ? 'active' : ''}" onclick="(${onChangePage})(${p})">${p}</div>`;
    }
    containerEl.innerHTML = html;
}

/* ====================================================
   ШТОРКА КАРТЫ: СВОДКА КАРТЫ, НАСТРОЙКИ, ИСТОРИЯ КАРТЫ
==================================================== */
/* ====================================================
   ОТКРЫТИЕ И ЗАПОЛНЕНИЕ ШТОРКИ КАРТЫ
==================================================== */
function openCardBottomSheet(cardId) {
    haptic('light');
    const card = userCards.find(c => c.id === cardId);
    if (!card) return;

    activeCardId = cardId;
    activeSheetCard = card;

    const sym = getCurrencySymbol();
    const now = new Date();

    // Заголовок
    const titleEl = document.getElementById('sheet-card-title');
    if (titleEl) titleEl.innerText = card.card_name;

    // Расчет баланса и показателей кассы
    const cTrades = userTrades.filter(tr => tr.card_id === card.id);
    const spentBuyAll = cTrades.filter(tr => tr.type === 'buy').reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
    const gainSellAll = cTrades.filter(tr => tr.type === 'sell').reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
    const depsAll = cardOps.filter(o => o.card_id === card.id && o.type === 'deposit').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
    const wdrsAll = cardOps.filter(o => o.card_id === card.id && o.type === 'withdraw').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
    const balance = depsAll - wdrsAll + gainSellAll - spentBuyAll;

    const elBal = document.getElementById('sheet-card-balance');
    if (elBal) elBal.innerText = `${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })} ${sym}`;

    // Статистика плиток в сводке шторки
    const elBought = document.getElementById('csheet-val-bought-fiat');
    if (elBought) elBought.innerText = `${spentBuyAll.toLocaleString(undefined, { minimumFractionDigits: 0 })} ${sym}`;

    const elSold = document.getElementById('csheet-val-sold-fiat');
    if (elSold) elSold.innerText = `${gainSellAll.toLocaleString(undefined, { minimumFractionDigits: 0 })} ${sym}`;

    const elDeps = document.getElementById('csheet-val-deps-fiat');
    if (elDeps) elDeps.innerText = `${depsAll.toLocaleString(undefined, { minimumFractionDigits: 0 })} ${sym}`;

    const elWdrs = document.getElementById('csheet-val-wdrs-fiat');
    if (elWdrs) elWdrs.innerText = `${wdrsAll.toLocaleString(undefined, { minimumFractionDigits: 0 })} ${sym}`;

    // Статус бейдж
    const badgeContainer = document.getElementById('sheet-status-quick-badge');
    if (badgeContainer) {
        let badgeHtml = '<span style="font-size: 11px; color: var(--bybit-green); font-weight: 800;">🟢 В работе</span>';
        if (card.status === 'cooldown') badgeHtml = '<span style="font-size: 11px; color: var(--bybit-purple); font-weight: 800;">⏳ Отлежка</span>';
        else if (card.status === 'limit_reached') badgeHtml = '<span style="font-size: 11px; color: var(--bybit-yellow); font-weight: 800;">⛔️ Лимит исчерпан</span>';
        else if (card.status === 'burned') badgeHtml = '<span style="font-size: 11px; color: var(--bybit-red); font-weight: 800;">🔥 115-ФЗ</span>';
        badgeContainer.innerHTML = badgeHtml;
    }

    const quickStatusSel = document.getElementById('sheet-quick-status');
    if (quickStatusSel) quickStatusSel.value = card.status || 'active';

    // Заполнение формы настроек
    const inpName = document.getElementById('csheet-inp-name');
    if (inpName) inpName.value = card.card_name || '';

    const inpNum = document.getElementById('csheet-inp-num');
    if (inpNum) inpNum.value = card.card_number || '';

    const inpHolder = document.getElementById('csheet-inp-holder');
    if (inpHolder) inpHolder.value = card.holder_name || '';

    const inpDayLimit = document.getElementById('csheet-inp-day-limit');
    if (inpDayLimit) inpDayLimit.value = card.buy_limit || '';

    const inpMonthLimit = document.getElementById('csheet-inp-month-limit');
    if (inpMonthLimit) inpMonthLimit.value = card.month_limit || '';

    const setStatusSel = document.getElementById('sheet-set-status');
    if (setStatusSel) setStatusSel.value = card.status || 'active';

    const inpNotes = document.getElementById('csheet-inp-notes');
    if (inpNotes) inpNotes.value = card.note || '';

    activeSelectedCardColor = card.color_accent || '#f3a600';
    document.querySelectorAll('#sheet-card-colors .color-swatch-dot').forEach(d => {
        d.classList.remove('selected');
    });

    toggleCooldownDateInput(card.status);

    // Сброс на вкладку «Сводка» и показ шторки
    switchCardSheetTab('stats');
    const modal = document.getElementById('card-sheet-modal');
    if (modal) modal.classList.add('show');
}

function switchCardSheetTab(tab) {
    haptic('light');
    const tabs = ['stats', 'cash', 'settings', 'history'];
    tabs.forEach(t => {
        const btn = document.getElementById(`tab-csheet-${t}`);
        const view = document.getElementById(`csheet-view-${t}`);
        if (btn) btn.classList.toggle('active', t === tab);
        if (view) view.style.display = (t === tab) ? 'block' : 'none';
    });
    if (tab === 'history') renderCardTradesList();
    if (tab === 'cash') renderCardCashList();
}

async function changeCardStatusDirectly(status) {
    if (!requireSubscription()) return;
    if (!activeSheetCard) return;
    haptic('medium');

    let cooldownUntil = null;
    if (status === 'cooldown') {
        const hours = prompt("На сколько часов отправить карту в отлежку?", "24");
        if (hours && parseFloat(hours) > 0) {
            const d = new Date();
            d.setHours(d.getHours() + parseFloat(hours));
            cooldownUntil = d.toISOString();
        }
    }

    activeSheetCard.status = status;
    activeSheetCard.cooldown_until = cooldownUntil;

    const extra = JSON.parse(localStorage.getItem(`p2p_card_extra_${activeSheetCard.id}`) || '{}');
    extra.cooldown_until = cooldownUntil;
    localStorage.setItem(`p2p_card_extra_${activeSheetCard.id}`, JSON.stringify(extra));

    try {
        await db(`cards?id=eq.${activeSheetCard.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: status })
        });
    } catch(e) {}

    showToast("Статус карты обновлен!");
    await refreshData();
    renderCards();
    openCardBottomSheet(activeSheetCard.id);
}

function renderCardCashList() {
    const listEl = document.getElementById('sheet-card-cash-list');
    if (!listEl || !activeCardId) return;
    listEl.innerHTML = '';

    const ops = cardOps.filter(o => o.card_id === activeCardId);
    if (ops.length === 0) {
        listEl.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 18px;">Операций по кассе нет</div>`;
        return;
    }

    const sym = getCurrencySymbol();
    ops.forEach(o => {
        const d = new Date(o.created_at || o.date || new Date());
        const dateStr = d.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const isDep = o.type === 'deposit';

        listEl.innerHTML += `
            <div class="history-item" style="margin-bottom: 8px; padding: 10px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                    <span style="font-weight: 800; color: ${isDep ? 'var(--bybit-green)' : 'var(--bybit-yellow)'};">
                        ${isDep ? '➕ ПОПОЛНЕНИЕ' : '➖ СНЯТИЕ'} ${o.count_in_limit ? '<span style="color: var(--bybit-red); font-size: 10px;">[В ЛИМИТЕ]</span>' : ''}
                    </span>
                    <span style="color: var(--text-muted);">${dateStr}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-size: 15px; font-weight: 800;">${parseFloat(o.amount).toLocaleString()} ${sym}</div>
                        ${o.comment ? `<div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">💬 ${o.comment}</div>` : ''}
                    </div>
                    <div style="display: flex; gap: 6px;">
                        <button class="btn-card-action" style="padding: 5px 8px;" onclick="editCardOpPrompt(${o.id})">✏️</button>
                        <button class="btn-card-action" style="padding: 5px 8px; color: var(--bybit-red);" onclick="deleteCardOpCloud(${o.id})">🗑</button>
                    </div>
                </div>
            </div>
        `;
    });
}

async function editCardOpPrompt(opId) {
    if (!requireSubscription()) return;
    const op = cardOps.find(x => x.id === opId);
    if (!op) return;

    const newAmt = prompt("Введите новую сумму операции:", op.amount);
    if (!newAmt || isNaN(parseFloat(newAmt)) || parseFloat(newAmt) <= 0) return;

    const newComm = prompt("Комментарий к операции:", op.comment || "");

    try {
        await db(`card_operations?id=eq.${opId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                amount: parseFloat(newAmt),
                comment: newComm || ""
            })
        });
        showToast("✅ Операция кассы обновлена!");
        await refreshData();
        renderCards();
        openCardBottomSheet(activeCardId);
        switchCardSheetTab('cash');
    } catch(e) {
        showToast("Ошибка обновления операции");
    }
}

async function deleteCardOpCloud(opId) {
    if (!requireSubscription()) return;
    if (!confirm("Удалить эту операцию кассы?")) return;

    try {
        await db(`card_operations?id=eq.${opId}`, { method: 'DELETE' });
        showToast("🗑 Операция удалена");
        await refreshData();
        renderCards();
        openCardBottomSheet(activeCardId);
        switchCardSheetTab('cash');
    } catch(e) {
        showToast("Ошибка удаления");
    }
}



function toggleCooldownDateInput(status) {
    const wrap = document.getElementById('wrap-cooldown-until');
    if (wrap) wrap.style.display = status === 'cooldown' ? 'block' : 'none';
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
    const dayLimit = parseFloat(document.getElementById('csheet-inp-day-limit').value) || 0;
    const monthLimit = parseFloat(document.getElementById('csheet-inp-month-limit').value) || 0;
    const status = document.getElementById('sheet-set-status').value;
    const note = document.getElementById('csheet-inp-notes').value.trim();
    const coolUntilVal = document.getElementById('csheet-inp-cooldown-until')?.value;
    const cooldownUntil = (status === 'cooldown' && coolUntilVal) ? new Date(coolUntilVal).toISOString() : null;

    if (!name) return showToast("⚠️ Название карты обязательно!");

    // Сохраняем лимиты и отлежку в локальное хранилище
    const extraKey = `p2p_card_extra_${activeSheetCard.id}`;
    const extraData = { month_limit: monthLimit, buy_limit: dayLimit, note: note, cooldown_until: cooldownUntil };
    localStorage.setItem(extraKey, JSON.stringify(extraData));

    // Моментально обновляем данные карты в памяти приложения
    activeSheetCard.card_name = name;
    activeSheetCard.card_number = num;
    activeSheetCard.holder_name = holder;
    activeSheetCard.buy_limit = dayLimit;
    activeSheetCard.month_limit = monthLimit;
    activeSheetCard.status = status;
    activeSheetCard.note = note;
    activeSheetCard.cooldown_until = cooldownUntil;
    activeSheetCard.color_accent = activeSelectedCardColor;

    const inList = userCards.find(x => x.id === activeSheetCard.id);
    if (inList) {
        Object.assign(inList, activeSheetCard);
    }

    try {
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
                note: note,
                cooldown_until: cooldownUntil
            })
        });
    } catch(e) {
        try {
            await db(`cards?id=eq.${activeSheetCard.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    card_name: name,
                    card_number: num,
                    holder_name: holder,
                    buy_limit: dayLimit,
                    status: status,
                    color_accent: activeSelectedCardColor
                })
            });
        } catch(err) {}
    }

    showToast("✅ Настройки и лимиты карты сохранены!");
    renderCards();
    openCardBottomSheet(activeSheetCard.id);
}



// Работа с глобальным шаблоном ордера
function openTemplateEditorModal() {
    haptic('light');
    const inp = document.getElementById('inp-global-template');
    if (inp) inp.value = globalCardTemplate;
    document.getElementById('modal-template-editor').classList.add('show');
}

function insertTagIntoTemplate(tag) {
    haptic('light');
    const inp = document.getElementById('inp-global-template');
    if (!inp) return;
    const start = inp.selectionStart;
    const end = inp.selectionEnd;
    inp.value = inp.value.substring(0, start) + tag + inp.value.substring(end);
    inp.focus();
}

function saveGlobalMessageTemplate() {
    haptic('medium');
    const val = document.getElementById('inp-global-template')?.value.trim();
    if (val) {
        globalCardTemplate = val;
        localStorage.setItem('p2p_global_msg_template', val);
        closeModals();
        showToast("💬 Шаблон сохранен!");
    }
}

function resetTemplateToDefault() {
    haptic('light');
    globalCardTemplate = "{bank}: {number} ({holder})\nОплата строго со своего счета! Чек обязателен.";
    localStorage.setItem('p2p_global_msg_template', globalCardTemplate);
    const inp = document.getElementById('inp-global-template');
    if (inp) inp.value = globalCardTemplate;
    showToast("Шаблон сброшен к стандарту");
}

function copyCardFullRequisites() {
    if (!activeSheetCard) return;
    const bName = activeSheetCard.card_name || 'Банк';
    const num = activeSheetCard.card_number || 'Реквизиты не указаны';
    const holder = activeSheetCard.holder_name || '';

    let text = globalCardTemplate
        .replace(/{bank}/gi, bName)
        .replace(/{number}/gi, num)
        .replace(/{holder}/gi, holder);

    navigator.clipboard.writeText(text);
    haptic('success');
    showToast("📋 Шаблон ордера скопирован!");
}


function closeCardSheet() {
    document.getElementById('card-sheet-modal').classList.remove('show');
}

function selectCardColor(color, el) {
    haptic('light');
    activeSelectedCardColor = color;
    document.querySelectorAll('#sheet-card-colors .color-swatch-dot').forEach(d => d.classList.remove('selected'));
    if (el) el.classList.add('selected');
}

async function togglePinCurrentCard() {
    if (!requireSubscription()) return;
    if (!activeSheetCard) return;
    haptic('medium');
    const newPinned = !activeSheetCard.is_pinned;
    await db(`cards?id=eq.${activeSheetCard.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ is_pinned: newPinned })
    });
    activeSheetCard.is_pinned = newPinned;
    closeCardSheet();
    showToast(newPinned ? "📌 Карта закреплена наверх" : "Откреплено");
    await refreshData();
    renderCards();
}

function copyCardNumberOnly() {
    if (!activeSheetCard?.card_number) return showToast("⚠️ Номер карты не указан");
    navigator.clipboard.writeText(activeSheetCard.card_number.replace(/\s+/g, ''));
    haptic('success');
    showToast("💳 16 цифр скопированы!");
}



function openSheetCardOp(type) {
    closeCardSheet();
    openCardOpModal(activeCardId, type);
}

async function cloneCurrentCard() {
    if (!requireSubscription()) return;
    if (!activeSheetCard) return;
    haptic('medium');
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
    showToast("✅ Карта успешно клонирована!");
    await refreshData();
    renderCards();
}

async function deleteCurrentCardFromSheet() {
    if (!requireSubscription()) return;
    if (!confirm("Удалить карту? Все сделки в истории останутся.")) return;
    await db(`cards?id=eq.${activeCardId}`, { method: 'DELETE' });
    closeCardSheet();
    showToast("🗑 Карта удалена");
    await refreshData();
    renderAll();
}

/* ====================================================
   ТРАНСФЕР МЕЖДУ СВОИМИ КАРТАМИ
==================================================== */
function openTransferModal() {
    if (!requireSubscription()) return;
    haptic('light');
    if (userCards.length < 2) return showToast("⚠️ Для трансфера нужно минимум 2 карты");

    const selFrom = document.getElementById('transfer-from-card');
    const selTo = document.getElementById('transfer-to-card');
    const opts = userCards.map(c => `<option value="${c.id}">${c.card_name}</option>`).join('');

    if (selFrom) selFrom.innerHTML = opts;
    if (selTo) selTo.innerHTML = opts;
    if (selTo && userCards.length > 1) selTo.selectedIndex = 1;

    document.getElementById('modal-card-transfer').classList.add('show');
}

async function submitCardTransfer() {
    if (!requireSubscription()) return;

    const fromId = parseInt(document.getElementById('transfer-from-card').value);
    const toId = parseInt(document.getElementById('transfer-to-card').value);
    const amt = parseFloat(document.getElementById('transfer-amount').value);

    if (!amt || amt <= 0) return showToast("⚠️ Введите сумму трансфера");
    if (fromId === toId) return showToast("⚠️ Выберите разные карты!");

    haptic('medium');
    try {
        await Promise.all([
            db('card_operations', {
                method: 'POST',
                body: JSON.stringify({
                    card_id: fromId,
                    tg_id: currentUser.tg_id,
                    type: 'withdraw',
                    amount: amt,
                    comment: `Трансфер на карту #${toId}`,
                    count_in_limit: false
                })
            }),
            db('card_operations', {
                method: 'POST',
                body: JSON.stringify({
                    card_id: toId,
                    tg_id: currentUser.tg_id,
                    type: 'deposit',
                    amount: amt,
                    comment: `Трансфер с карты #${fromId}`,
                    count_in_limit: false
                })
            })
        ]);

        closeModals();
        playCashSound();
        showToast("🔄 Трансфер выполнен!");
        await refreshData();
        renderCards();
    } catch(e) {
        showToast("Ошибка трансфера");
    }
}

/* ====================================================
   ИСТОРИЯ ОПЕРАЦИЙ (ПАГИНАЦИЯ МАКСИМУМ 25, ДО 4 СТР)
==================================================== */
function selectDealColor(color, el) {
    haptic('light');
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
    const tz = parseInt(currentUser?.tz_offset) || 3;

    const colorBorderMap = {
        'green': 'var(--bybit-green)',
        'yellow': 'var(--bybit-yellow)',
        'blue': 'var(--bybit-blue)',
        'purple': 'var(--bybit-purple)',
        'red': 'var(--bybit-red)',
        'default': 'transparent'
    };

    const totalPages = Math.min(MAX_PAGES, Math.max(1, Math.ceil(userTrades.length / ITEMS_PER_PAGE)));
    if (historyCurrentPage > totalPages) historyCurrentPage = totalPages;

    const startIndex = (historyCurrentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = userTrades.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    pageItems.forEach(t => {
        const d = new Date(t.date);
        d.setHours(d.getUTCHours() + tz);
        const dateStr = d.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const boundCard = userCards.find(c => c.id === t.card_id);
        const cardBadge = boundCard ? `<span class="card-pill">💳 ${boundCard.card_name}</span>` : '';

        // Полоска ТОЛЬКО если выбрана метка цвета, круги без навязчивой полоски по умолчанию
        const borderCol = colorBorderMap[t.tag_color] || 'transparent';

        if (t.is_cycle) {
            const pVal = parseFloat(t.cycle_profit_rub || 0);
            const pColor = pVal < 0 ? 'var(--bybit-red)' : (pVal > 0 ? 'var(--bybit-green)' : 'var(--text-main)');
            const formattedCycleProfit = formatSignedMoney(pVal, 2);

            container.innerHTML += `
                <div class="history-item" style="border-left-color: ${borderCol};">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <div style="display: flex; gap: 6px; align-items: center;">
                            <span style="font-size: 11px; font-weight: 800; color: var(--bybit-yellow);">КРУГ ⚡️</span>
                            ${cardBadge}
                        </div>
                        <span style="font-size: 11px; color: var(--text-muted);">${dateStr}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                        <div>
                            <div class="privacy-blur" style="font-size: 17px; font-weight: 800; color: ${pColor};">
                                ${formattedCycleProfit} ${sym}
                            </div>
                            <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                                ${t.buy_rate} → ${t.sell_rate} ${sym} / Спред: ${formatSignedMoney(t.cycle_spread, 2)}%
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
                <div class="history-item" style="border-left-color: ${borderCol};">
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

    renderPaginationBar(paginationContainer, totalPages, historyCurrentPage, (p) => {
        historyCurrentPage = p;
        renderHistory();
    });
}


function repeatTradeInCalc(tradeId) {
    if (!requireSubscription()) return;
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
        showToast("🔁 Круг скопирован в калькулятор!");
    } else {
        document.getElementById('inp-amount').value = tr.fiat_amount;
        document.getElementById('inp-rate').value = tr.rate;
        setTradeType(tr.type);
        handleNavClick('trade', document.querySelector('.nav-btn[data-target="trade"]'));
        showToast("🔁 Сделка подставлена!");
    }
}

function setEditTradeMode(mode) {
    haptic('light');
    editTradeMode = mode;
    document.getElementById('tab-edit-fiat')?.classList.toggle('active', mode === 'fiat');
    document.getElementById('tab-edit-crypto')?.classList.toggle('active', mode === 'crypto');

    const lbl = document.getElementById('lbl-edit-amount');
    const sym = getCurrencySymbol();
    if (lbl) {
        lbl.innerHTML = mode === 'fiat' ? `Сумма в фиате (<span class="sym">${sym}</span>)` : `Объем USDT (🪙)`;
    }

    const tr = userTrades.find(x => x.id === activeEditTradeId);
    if (!tr) return;
    const amtInput = document.getElementById('modal-inp-amount');
    if (amtInput) {
        amtInput.value = mode === 'fiat' ? tr.fiat_amount : tr.crypto_amount;
    }
}

let editDealType = 'buy';

let editCycleProfitMode = 'fiat'; // 'fiat' или 'crypto'

function setEditCycleProfitMode(mode) {
    haptic('light');
    editCycleProfitMode = mode;
    document.getElementById('tab-edit-cycle-fiat')?.classList.toggle('active', mode === 'fiat');
    document.getElementById('tab-edit-cycle-crypto')?.classList.toggle('active', mode === 'crypto');
}

function setEditDealType(type) {
    haptic('light');
    editDealType = type;
    document.getElementById('edit-type-buy')?.classList.toggle('active', type === 'buy');
    document.getElementById('edit-type-sell')?.classList.toggle('active', type === 'sell');
    document.getElementById('edit-type-cycle')?.classList.toggle('active', type === 'cycle');

    const sellWrap = document.getElementById('wrap-edit-sell-rate');
    if (sellWrap) sellWrap.style.display = type === 'cycle' ? 'block' : 'none';
}

function openEditTradeModal(tid) {
    if (!requireSubscription()) return;
    haptic('light');
    activeEditTradeId = tid;
    const tr = userTrades.find(x => x.id === tid);
    if (!tr) return;

    document.getElementById('modal-trade-id').innerText = `Сделка #${tid}`;
    editTradeMode = 'fiat';
    document.getElementById('tab-edit-fiat')?.classList.add('active');
    document.getElementById('tab-edit-crypto')?.classList.remove('active');

    setEditDealType(tr.is_cycle ? 'cycle' : tr.type);

    if (tr.is_cycle) {
        editCycleProfitMode = (parseFloat(tr.cycle_profit_usdt || 0) !== 0 || tr.note?.includes('USDT')) ? 'crypto' : 'fiat';
        setEditCycleProfitMode(editCycleProfitMode);
    }

    document.getElementById('modal-inp-amount').value = tr.fiat_amount;
    document.getElementById('modal-rate').value = tr.buy_rate || tr.rate;
    const sRateInp = document.getElementById('modal-sell-rate');
    if (sRateInp) sRateInp.value = tr.sell_rate || '';

    document.getElementById('modal-card-sel').value = tr.card_id || "";
    document.getElementById('modal-note').value = tr.note || "";

    activeSelectedDealColor = tr.tag_color || 'default';
    document.querySelectorAll('#deal-color-swatches .color-swatch-dot').forEach(d => {
        d.classList.toggle('selected', d.getAttribute('data-color') === activeSelectedDealColor);
    });

    document.getElementById('edit-modal').classList.add('show');
}

async function submitEditTrade() {
    if (!requireSubscription()) return;

    const val = parseFloat(document.getElementById('modal-inp-amount').value);
    const r = parseFloat(document.getElementById('modal-rate').value);
    const sellR = parseFloat(document.getElementById('modal-sell-rate')?.value) || 0;
    const cid = document.getElementById('modal-card-sel').value || null;
    const note = document.getElementById('modal-note').value.trim();

    if (!val || !r || val <= 0 || r <= 0) return showToast("⚠️ Заполните сумму и курс!");

    let fiat = editTradeMode === 'fiat' ? val : parseFloat((val * r).toFixed(2));
    let crypto = editTradeMode === 'fiat' ? parseFloat((val / r).toFixed(2)) : val;

    const payload = {
        fiat_amount: fiat,
        rate: r,
        crypto_amount: crypto,
        card_id: cid ? parseInt(cid) : null,
        note: note,
        tag_color: activeSelectedDealColor
    };

    if (editDealType === 'cycle') {
        payload.is_cycle = true;
        payload.buy_rate = r;
        payload.sell_rate = sellR > 0 ? sellR : r;
        payload.cycle_spread = sellR > 0 ? parseFloat((((sellR - r) / r) * 100).toFixed(2)) : 0;

        if (editCycleProfitMode === 'fiat') {
            payload.cycle_profit_rub = sellR > 0 ? parseFloat(((crypto * sellR) - fiat).toFixed(2)) : 0;
            payload.cycle_profit_usdt = 0;
            payload.note = note ? `${note} (Фиат)` : 'Прибыль в фиате';
        } else {
            payload.cycle_profit_rub = 0;
            payload.cycle_profit_usdt = sellR > 0 ? parseFloat((crypto - (fiat / sellR)).toFixed(2)) : 0;
            payload.note = note ? `${note} (USDT)` : 'Прибыль в USDT';
        }
    } else {
        payload.is_cycle = false;
        payload.type = editDealType;
    }

    await db(`trades?id=eq.${activeEditTradeId}`, {
        method: 'PATCH',
        body: JSON.stringify(payload)
    });

    closeModals();
    showToast("✏️ Сделка обновлена!");
    await refreshData();
    renderAll();
}




async function deleteTradeCloud(tid) {
    if (!requireSubscription()) return;
    haptic('medium');
    if (!confirm("Удалить операцию из базы?")) return;
    await db(`trades?id=eq.${tid}`, { method: 'DELETE' });
    showToast("🗑 Сделка удалена");
    await refreshData();
    renderAll();
}

function openDeleteHistoryModal() {
    if (!requireSubscription()) return;
    haptic('light');
    document.getElementById('modal-history-delete').classList.add('show');
}

async function executeDeleteHistory(scope) {
    if (!requireSubscription()) return;
    haptic('medium');

    const tz = parseInt(currentUser?.tz_offset) || 3;
    const now = new Date();
    let toDeleteIds = [];

    if (scope === 'today') {
        toDeleteIds = userTrades.filter(t => {
            const d = new Date(t.date);
            d.setHours(d.getUTCHours() + tz);
            return d.toDateString() === now.toDateString();
        }).map(t => t.id);
    } else if (scope === 'month') {
        toDeleteIds = userTrades.filter(t => {
            const d = new Date(t.date);
            d.setHours(d.getUTCHours() + tz);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).map(t => t.id);
    } else if (scope === 'all') {
        toDeleteIds = userTrades.map(t => t.id);
    }

    if (toDeleteIds.length === 0) {
        closeModals();
        return showToast("Сделок для удаления не найдено");
    }

    if (!confirm(`Точно удалить ${toDeleteIds.length} сделок? Действие необратимо!`)) return;

    try {
        await db(`trades?tg_id=eq.${currentUser.tg_id}&id=in.(${toDeleteIds.join(',')})`, {
            method: 'DELETE'
        });
        closeModals();
        showToast(`🗑 Удалено сделок: ${toDeleteIds.length}`);
        await refreshData();
        renderAll();
    } catch(e) {
        showToast("Ошибка при удалении");
    }
}

/* ====================================================
   ГЕНЕРАТОР PNL-КАРТОЧКИ (ХОЛСТ И ЭКСПОРТ)
==================================================== */
function getActiveTimeframeTitle() {
    if (currentPeriod === 'today') return "ЗА СЕГОДНЯ";
    if (currentPeriod === 'month') return "ЗА ЭТОТ МЕСЯЦ";
    if (currentPeriod === 'all') return "ЗА ВСЕ ВРЕМЯ";
    if (currentPeriod === 'custom' && customStartDate && customEndDate) {
        const pad = n => String(n).padStart(2, '0');
        return `${pad(customStartDate.getDate())}.${pad(customStartDate.getMonth() + 1)} — ${pad(customEndDate.getDate())}.${pad(customEndDate.getMonth() + 1)}`;
    }
    return "ОТЧЕТ";
}

/* ====================================================
   ГЕНЕРАЦИЯ PNL-КАРТОЧКИ (ЮЗЕРНЕЙМ + v1.0.0)
==================================================== */
let currentPnlBlob = null;

function getPnlTimeframeLabel() {
    if (currentPeriod === 'today') return "ЗА СЕГОДНЯ";
    if (currentPeriod === 'month') return "ЗА ЭТОТ МЕСЯЦ";
    if (currentPeriod === 'all') return "ЗА ВСЕ ВРЕМЯ";
    if (currentPeriod === 'custom' && customStartDate && customEndDate) {
        const pad = n => String(n).padStart(2, '0');
        return `${pad(customStartDate.getDate())}.${pad(customStartDate.getMonth() + 1)} — ${pad(customEndDate.getDate())}.${pad(customEndDate.getMonth() + 1)}`;
    }
    return "ОТЧЕТ";
}

function openPnlPage() {
    haptic('medium');
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    // 1. Темный премиальный фон
    const bg = ctx.createLinearGradient(0, 0, 1200, 720);
    bg.addColorStop(0, '#06080d');
    bg.addColorStop(0.5, '#090d15');
    bg.addColorStop(1, '#05070a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1200, 720);

    // 2. Световые неоновые пятна
    const g1 = ctx.createRadialGradient(180, 130, 10, 180, 130, 400);
    g1.addColorStop(0, 'rgba(243, 166, 0, 0.18)');
    g1.addColorStop(1, 'transparent');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, 1200, 720);

    const g2 = ctx.createRadialGradient(1020, 580, 10, 1020, 580, 420);
    g2.addColorStop(0, 'rgba(46, 187, 154, 0.15)');
    g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, 1200, 720);

    // 3. Рамка
    ctx.strokeStyle = 'rgba(243, 166, 0, 0.35)';
    ctx.lineWidth = 3;
    ctx.strokeRect(32, 32, 1136, 656);

    // 4. Шапка: Юзернейм без номера версии
    const userTag = currentUser?.username ? `@${currentUser.username}` : (currentUser?.first_name || `ID: ${currentUser?.tg_id || 'TRADER'}`);

    ctx.fillStyle = '#f3a600';
    ctx.font = '900 36px Inter, sans-serif';
    ctx.fillText('P2P TERMINAL PRO', 70, 92);


    // Юзернейм трейдера под логотипом
    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 20px Inter, sans-serif';
    ctx.fillText(`👤 ${userTag}`, 70, 126);

    // Бейдж таймфрейма
    const tf = `🗓 ${getPnlTimeframeLabel()}`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(70, 142, 260, 34);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(70, 142, 260, 34);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '800 14px Inter, sans-serif';
    ctx.fillText(tf, 86, 164);

    // Дата справа
    const dateStr = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 20px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(dateStr, 1120, 92);
    ctx.textAlign = 'left';

    // 5. Показатель прибыли
    const totalRub = document.getElementById('val-total-profit-rub')?.innerText || "0.00 ₽";
    const totalUsdt = document.getElementById('val-total-profit-usdt')?.innerText || "0.00 USDT";
    const isNeg = totalRub.includes('-');

    ctx.fillStyle = '#64748b';
    ctx.font = '800 18px Inter, sans-serif';
    ctx.fillText('ОБЩАЯ ЧИСТАЯ ПРИБЫЛЬ ЗА ПЕРИОД', 70, 235);

    ctx.fillStyle = isNeg ? '#f23645' : '#2ebb9a';
    ctx.font = '900 76px Inter, sans-serif';
    ctx.fillText(totalRub, 70, 315);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 28px Inter, sans-serif';
    ctx.fillText(`≈ ${totalUsdt}`, 70, 365);

    // 6. Плитки статистики
    const stats = [
        { label: 'СРЕДНИЙ СПРЕД', val: document.getElementById('val-avg-spread')?.innerText || '0.00%' },
        { label: 'ОБОРОТ ФИАТА', val: document.getElementById('val-fiat-turn')?.innerText || '0 ₽' },
        { label: 'ROI ОТ ОБОРОТА', val: document.getElementById('val-roi')?.innerText || '0.00%' },
        { label: 'СДЕЛОК ЗАКРЫТО', val: document.getElementById('val-trades-count')?.innerText?.split('/')[0]?.trim() || '0' }
    ];

    const boxY = 415;
    const boxW = 245;
    const boxH = 110;
    const gap = 20;

    stats.forEach((s, idx) => {
        const x = 70 + (idx * (boxW + gap));
        ctx.fillStyle = 'rgba(15, 20, 30, 0.7)';
        ctx.fillRect(x, boxY, boxW, boxH);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, boxY, boxW, boxH);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '700 13px Inter, sans-serif';
        ctx.fillText(s.label, x + 16, boxY + 36);

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 25px Inter, sans-serif';
        ctx.fillText(s.val, x + 16, boxY + 80);
    });

    // 7. Подвал
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(70, 565);
    ctx.lineTo(1130, 565);
    ctx.stroke();

    ctx.fillStyle = '#f3a600';
    ctx.font = '900 32px Inter, sans-serif';
    ctx.fillText('🤖 @P2P_Rbot', 70, 625);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 20px Inter, sans-serif';
    ctx.fillText('Enterprise Ledger & WAC Analytics Terminal', 360, 623);

    const dataUrl = canvas.toDataURL('image/png');
    const imgEl = document.getElementById('pnl-rendered-img');
    if (imgEl) imgEl.src = dataUrl;

    canvas.toBlob(blob => {
        currentPnlBlob = blob;
    }, 'image/png');

    const modal = document.getElementById('pnl-card-modal');
    if (modal) modal.classList.add('show');
}

function closePnlPage() {
    haptic('light');
    const modal = document.getElementById('pnl-card-modal');
    if (modal) modal.classList.remove('show');
}

async function sendPnlToTelegramChat() {
    haptic('medium');
    if (!currentUser || !currentUser.tg_id) {
        return showToast("⚠️ Пользователь не определен");
    }

    if (!currentPnlBlob) {
        return showToast("⚠️ Формирование изображения...");
    }

    // Берем токен из конфигурации или дефолтный служебный
    const token = document.getElementById('admin-broadcast-token')?.value?.trim() || "8872511749:AAG-gbaprKsqDa24yL9JWMEL4XOApCScQAs";
    showToast("⏳ Отправка в бот...");

    try {
        const formData = new FormData();
        formData.append('chat_id', currentUser.tg_id);
        formData.append('photo', currentPnlBlob, `pnl_${new Date().getTime()}.png`);
        formData.append('caption', `📊 <b>Ваш PnL-отчет (${getPnlTimeframeLabel()})</b>\n💰 Прибыль: ${document.getElementById('val-total-profit-rub')?.innerText || ''}\n📈 Ср. спред: ${document.getElementById('val-avg-spread')?.innerText || ''}\n\n🤖 @P2P_Rbot — Терминал арбитража`);
        formData.append('parse_mode', 'HTML');

        const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        if (data.ok) {
            playCashSound();
            haptic('success');
            showToast("✅ Отчет отправлен в чат бота!");
        } else {
            throw new Error(data.description || "Ошибка");
        }
    } catch(err) {
        showToast("❌ Ошибка отправки фото в бот");
    }
}



/* ====================================================
   АДМИН-ПАНЕЛЬ И ОКНО ПРОСМОТРА БАЗЫ
==================================================== */
async function loadActiveUsersForAdmin() {
    try {
        const [usersRes, tradesRes] = await Promise.all([
            db('users?order=reg_date.desc'),
            db('trades?select=tg_id')
        ]);

        if (!usersRes) return;
        rawAdminUsersList = usersRes;

        const tradeCountsByUid = {};
        (tradesRes || []).forEach(t => {
            tradeCountsByUid[t.tg_id] = (tradeCountsByUid[t.tg_id] || 0) + 1;
        });

        // В базу заносятся только те, кто реально заходил в Mini App (есть reg_date) или имеет подписку/триал
        rawAdminUsersList = rawAdminUsersList.filter(u => u.reg_date || u.sub_end || u.trial_used);

        rawAdminUsersList.forEach(u => {
            u._tradesCount = tradeCountsByUid[u.tg_id] || 0;
            u._hasHadSubOrTrial = (u.sub_end !== null && u.sub_end !== undefined) || (u.trial_used === true);
        });

        const activeCount = rawAdminUsersList.filter(u => u._hasHadSubOrTrial).length;
        document.getElementById('admin-active-count').innerText = `${activeCount} с подпиской / триалом`;
    } catch(e) {}
}

function openUsersDatabaseModal() {
    haptic('medium');
    filterAdminDatabaseView();
    document.getElementById('modal-admin-users-db').classList.add('show');
}

function toggleAdminSubFilter() {
    haptic('light');
    adminDbFilterOnlySub = !adminDbFilterOnlySub;
    const btn = document.getElementById('btn-toggle-sub-filter');
    if (btn) {
        btn.innerText = adminDbFilterOnlySub ? "Фильтр: С подпиской 🟢" : "Фильтр: Все юзеры ⚪️";
    }
    filterAdminDatabaseView();
}

function filterAdminDatabaseView() {
    const query = (document.getElementById('admin-db-search-inp')?.value || '').toLowerCase().trim();
    const container = document.getElementById('admin-users-db-container');
    if (!container) return;
    container.innerHTML = '';

    let list = [...rawAdminUsersList];

    // По ТЗ: показывать только тех, кто хоть раз взял пробный период или имел подписку
    if (adminDbFilterOnlySub) {
        list = list.filter(u => u._hasHadSubOrTrial);
    }

    if (query) {
        list = list.filter(u => {
            const idMatch = String(u.tg_id).includes(query);
            const nameMatch = (u.first_name || '').toLowerCase().includes(query);
            const userMatch = (u.username || '').toLowerCase().includes(query);
            return idMatch || nameMatch || userMatch;
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

        container.innerHTML += `
            <div class="admin-user-row" onclick="selectAdminUserFromDb(${u.tg_id})">
                <div style="flex: 1;">
                    <div style="font-weight: 800; font-size: 13px;">
                        ${u.first_name || 'Без имени'} ${u.username ? `(@${u.username})` : ''}
                    </div>
                    <div style="font-size: 11px; color: var(--text-muted); font-family: monospace; margin-top: 2px;">
                        ID: ${u.tg_id} • Сделок: ${u._tradesCount || 0}
                    </div>
                    <div style="font-size: 11px; margin-top: 3px; color: ${subColor}; font-weight: 700;">
                        ${subLabel} ${u.trial_used ? '• [Триал брал]' : ''}
                    </div>
                </div>
                <button class="btn-card-action" style="padding: 6px 10px; font-size: 11px;">Выбрать</button>
            </div>
        `;
    });
}

function selectAdminUserFromDb(tgId) {
    haptic('light');
    document.getElementById('admin-target-uid').value = tgId;
    closeModals();
    adminInspectUser();
}

/* ====================================================
   ПОЛНОЕ ДОСЬЕ ПОЛЬЗОВАТЕЛЯ (МОДАЛЬНОЕ ОКНО)
==================================================== */
async function adminInspectUser() {
    const targetId = parseInt(document.getElementById('admin-target-uid').value);
    if (!targetId) return showToast("⚠️ Введите ID пользователя!");

    haptic('medium');
    showToast("⏳ Сбор данных пользователя...");

    const [uRes, tRes, cRes, oRes, refsTotalRes, refsActiveRes] = await Promise.all([
        db(`users?tg_id=eq.${targetId}`),
        db(`trades?tg_id=eq.${targetId}&order=date.desc`),
        db(`cards?tg_id=eq.${targetId}&order=created_at.asc`),
        db(`card_operations?tg_id=eq.${targetId}`),
        db(`users?ref_by=eq.${targetId}&select=tg_id`, { count: 'exact' }),
        db(`users?ref_by=eq.${targetId}&trial_used=eq.true&select=tg_id`, { count: 'exact' })
    ]);

    if (!uRes || uRes.length === 0) {
        return showToast("❌ Пользователь не найден в базе");
    }

    const u = uRes[0];
    const trades = tRes || [];
    const cards = cRes || [];
    const ops = oRes || [];
    const sym = u.currency === 'USD' ? '$' : (u.currency === 'KZT' ? '₸' : (u.currency === 'UAH' ? '₴' : '₽'));

    // Реферальная статистика
    const totalRefs = refsTotalRes ? refsTotalRes.length : 0;
    const activeRefs = refsActiveRes ? refsActiveRes.length : 0;

    // 1. Расчет финансовой статистики пользователя
    let bF = 0, bC = 0, sF = 0, sC = 0, buysCnt = 0, sellsCnt = 0;
    trades.forEach(t => {
        const f = parseFloat(t.fiat_amount || 0);
        const c = parseFloat(t.crypto_amount || 0);
        if (t.is_cycle) {
            buysCnt++; sellsCnt++;
            bF += f; bC += c;
            const cProfitRub = parseFloat(t.cycle_profit_rub || 0);
            const cProfitUsdt = parseFloat(t.cycle_profit_usdt || 0);
            if (t.cycle_mode === 'crypto' || cProfitUsdt !== 0) {
                sF += f; sC += (c - cProfitUsdt);
            } else {
                sF += (f + cProfitRub); sC += c;
            }
        } else if (t.type === 'buy') {
            bF += f; bC += c; buysCnt++;
        } else {
            sF += f; sC += c; sellsCnt++;
        }
    });

    const wac = bC > 0 ? bF / bC : 0;
    const avgSell = sC > 0 ? sF / sC : 0;
    const midPrice = (wac > 0 && avgSell > 0) ? (wac + avgSell) / 2 : (wac || avgSell || 0);
    const profitFiat = sF - bF;
    const profitUsdt = bC - sC;
    const totalProfit = profitFiat + (profitUsdt * midPrice);
    const fiatTurnover = bF + sF;
    const cryptoTurnover = bC + sC;
    const avgSpread = wac > 0 && avgSell > 0 ? (((avgSell / wac) - 1) * 100).toFixed(2) : "0.00";

    // 2. Статус подписки
    const now = new Date();
    let subBadge = '<span style="color: var(--text-muted); font-weight: 800;">❌ Нет подписки</span>';
    if (u.is_banned) {
        subBadge = '<span style="color: var(--bybit-red); font-weight: 900;">⛔️ Заблокирован</span>';
    } else if (u.sub_end && new Date(u.sub_end).getFullYear() > 2099) {
        subBadge = '<span style="color: var(--bybit-yellow); font-weight: 900;">💎 VIP Навсегда</span>';
    } else if (u.sub_end && new Date(u.sub_end) > now) {
        subBadge = `<span style="color: var(--bybit-green); font-weight: 800;">🟢 Активна до ${new Date(u.sub_end).toLocaleDateString()}</span>`;
    } else if (u.sub_end) {
        subBadge = `<span style="color: var(--bybit-red); font-weight: 800;">⏳ Истекла (${new Date(u.sub_end).toLocaleDateString()})</span>`;
    }

    // 3. Формирование списка карт пользователя
    let cardsHtml = '';
    if (cards.length === 0) {
        cardsHtml = '<div style="color: var(--text-muted); font-size: 12px; padding: 6px 0;">Карт не добавлено</div>';
    } else {
        cards.forEach(c => {
            const cTrades = trades.filter(tr => tr.card_id === c.id);
            const spentBuy = cTrades.filter(tr => tr.type === 'buy').reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
            const gainSell = cTrades.filter(tr => tr.type === 'sell').reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
            const deps = ops.filter(o => o.card_id === c.id && o.type === 'deposit').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
            const wdrs = ops.filter(o => o.card_id === c.id && o.type === 'withdraw').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);
            const bal = deps - wdrs + gainSell - spentBuy;

            cardsHtml += `
                <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); border-radius: 10px; padding: 8px 10px; margin-bottom: 6px; font-size: 11px;">
                    <div style="display: flex; justify-content: space-between; font-weight: 800;">
                        <span>💳 ${c.card_name} (${c.status || 'active'})</span>
                        <span style="color: var(--bybit-green);">${bal.toLocaleString()} ${sym}</span>
                    </div>
                    <div style="color: var(--text-muted); font-size: 10px; margin-top: 2px;">
                        Номер: <code>${c.card_number || 'не указан'}</code> • Дневной лимит: ${c.buy_limit ? c.buy_limit + ' ' + sym : '∞'}
                    </div>
                </div>
            `;
        });
    }

    // 4. Сборка HTML модального окна досье
    document.getElementById('dossier-header-sub').innerText = `Telegram ID: ${u.tg_id}`;
    const container = document.getElementById('dossier-modal-content');
    container.innerHTML = `
        <!-- Профиль -->
        <div style="background: rgba(0,0,0,0.35); border: 1px solid var(--glass-border); border-radius: 14px; padding: 12px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 14px; font-weight: 900; color: #fff;">${u.first_name || 'Без имени'} ${u.username ? '(@' + u.username + ')' : ''}</span>
                ${subBadge}
            </div>
            <div style="font-size: 11px; color: var(--text-muted); line-height: 1.6;">
                <b>Регистрация:</b> ${u.reg_date ? new Date(u.reg_date).toLocaleDateString() : '—'}<br>
                <b>Использовал триал:</b> ${u.trial_used ? '✅ ДА' : '⚪️ НЕТ'}<br>
                <b>Реферер (кто пригласил):</b> ${u.ref_by ? '<code>' + u.ref_by + '</code>' : 'Органический'}<br>
                <b>Валюта / Таймзона:</b> ${u.currency || 'RUB'} / UTC+${u.tz_offset || 3}
            </div>
        </div>

        <!-- Партнерская сеть (Рефералы) -->
        <div style="background: rgba(243, 166, 0, 0.08); border: 1px solid rgba(243, 166, 0, 0.25); border-radius: 14px; padding: 12px; margin-bottom: 12px;">
            <div style="font-size: 11px; font-weight: 800; color: var(--bybit-yellow); margin-bottom: 6px; text-transform: uppercase;">🤝 Партнерская сеть</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 8px; text-align: center;">
                    <div style="font-size: 10px; color: var(--text-muted);">Всего перешло</div>
                    <div style="font-size: 15px; font-weight: 900; color: #fff; margin-top: 2px;">${totalRefs}</div>
                </div>
                <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 8px; text-align: center;">
                    <div style="font-size: 10px; color: var(--text-muted);">Активировали триал</div>
                    <div style="font-size: 15px; font-weight: 900; color: var(--bybit-green); margin-top: 2px;">${activeRefs}</div>
                </div>
            </div>
        </div>

        <!-- Финансовые показатели -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
            <div style="background: rgba(46, 187, 154, 0.08); border: 1px solid rgba(46, 187, 154, 0.25); border-radius: 12px; padding: 10px;">
                <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Общая прибыль</div>
                <div style="font-size: 16px; font-weight: 900; color: ${totalProfit >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)'}; margin-top: 4px;">
                    ${formatSignedMoney(totalProfit, 2)} ${sym}
                </div>
            </div>
            <div style="background: rgba(243, 166, 0, 0.08); border: 1px solid rgba(243, 166, 0, 0.25); border-radius: 12px; padding: 10px;">
                <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Средний спред</div>
                <div style="font-size: 16px; font-weight: 900; color: var(--bybit-yellow); margin-top: 4px;">
                    ${avgSpread}%
                </div>
            </div>
        </div>

        <div style="background: rgba(0,0,0,0.35); border: 1px solid var(--glass-border); border-radius: 12px; padding: 10px; margin-bottom: 12px; font-size: 11px; line-height: 1.6;">
            <b>Оборот фиата:</b> ${fiatTurnover.toLocaleString()} ${sym}<br>
            <b>Оборот крипты:</b> ${cryptoTurnover.toLocaleString()} USDT<br>
            <b>Всего сделок:</b> ${trades.length} (🟢 ${buysCnt} покупок / 🔴 ${sellsCnt} продаж)
        </div>

        <!-- Карты -->
        <div style="margin-bottom: 6px;">
            <div style="font-size: 11px; font-weight: 800; color: var(--bybit-yellow); margin-bottom: 6px; text-transform: uppercase;">Банковские карты (${cards.length})</div>
            ${cardsHtml}
        </div>
    `;

    document.getElementById('modal-admin-user-dossier').classList.add('show');
}



async function adminUserAction(action) {
    const targetId = parseInt(document.getElementById('admin-target-uid').value);
    if (!targetId) return showToast("⚠️ Выберите пользователя!");
    const now = new Date();

    if (action === 'grant30') {
        now.setDate(now.getDate() + 30);
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ sub_end: now.toISOString(), is_banned: false }) });
        showToast(`✅ ID ${targetId}: продлен на 30 дней`);
    } else if (action === 'grantVIP') {
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ sub_end: "2100-01-01T00:00:00Z", is_banned: false }) });
        showToast(`✅ ID ${targetId}: выдан VIP Навсегда`);
    } else if (action === 'revoke') {
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ sub_end: null }) });
        showToast(`❌ ID ${targetId}: подписка аннулирована`);
    } else if (action === 'ban') {
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ is_banned: true }) });
        showToast(`⛔️ ID ${targetId}: заблокирован`);
    } else if (action === 'unban') {
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ is_banned: false }) });
        showToast(`🟢 ID ${targetId}: разбанен`);
    }
    adminInspectUser();
    loadActiveUsersForAdmin();
}

async function adminExportDatabase() {
    haptic('medium');
    showToast("⏳ Формирование выгрузки базы...");
    try {
        const users = await db(`users?order=reg_date.desc`);
        if (!users || users.length === 0) return showToast("База пуста");

        let csv = "TG_ID,Username,First_Name,Sub_End,Trial_Used,Is_Banned,Reg_Date\n";
        users.forEach(u => {
            csv += `"${u.tg_id}","${u.username || ''}","${(u.first_name || '').replace(/"/g, '""')}","${u.sub_end || ''}","${u.trial_used ? 'YES' : 'NO'}","${u.is_banned ? 'YES' : 'NO'}","${u.reg_date || ''}"\n`;
        });

        const fileName = `P2P_Users_Full_${new Date().toISOString().slice(0, 10)}.csv`;
        const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
        const fileUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("📥 База успешно скачана!");
    } catch(e) {
        showToast("❌ Ошибка экспорта базы");
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
        showToast("✅ Промокод создан!");
        document.getElementById('new-promo-code').value = '';
        document.getElementById('new-promo-days').value = '';
    } catch(e) {
        showToast("Ошибка создания промокода");
    }
}
async function adminBroadcastMessage() {
    haptic('medium');
    const token = document.getElementById('admin-broadcast-token')?.value?.trim();
    const text = document.getElementById('admin-broadcast-text')?.value?.trim();

    if (!token) return showToast("⚠️ Укажите токен бота!");
    if (!text) return showToast("⚠️ Введите текст сообщения!");

    showToast("⏳ Запуск рассылки...");

    try {
        const users = await db('users?select=tg_id');
        if (!users || users.length === 0) return showToast("Пользователей нет в базе");

        let sent = 0;
        let failed = 0;

        for (let u of users) {
            try {
                const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: u.tg_id,
                        text: text,
                        parse_mode: 'HTML'
                    })
                });
                if (resp.ok) sent++;
                else failed++;
            } catch(err) {
                failed++;
            }
        }

        showToast(`✅ Рассылка завершена: доставлено ${sent}, ошибок ${failed}`);
        document.getElementById('admin-broadcast-text').value = '';
    } catch(e) {
        showToast("❌ Ошибка при отправке рассылки");
    }
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
        showToast("✅ Конфигурация сохранена!");
    } catch(e) {
        showToast("Ошибка сохранения");
    }
}

/* ====================================================
   ПОДПИСКА И ПРОВЕРКА ПРАВ
==================================================== */
function checkSubscription() {
    const badgeEl = document.getElementById('disp-tier-badge');
    const paywallEl = document.getElementById('paywall');
    const paywallReason = document.getElementById('paywall-reason');
    const navEl = document.querySelector('.bottom-nav');

    if (!currentUser) return false;

    const now = new Date();
    const isSubActive = currentUser.sub_end && new Date(currentUser.sub_end) > now;
    const isBanned = !!currentUser.is_banned;

    // ЕСЛИ НЕТ ПОДПИСКИ ИЛИ БАН — ПОЛНОСТЬЮ СКРЫВАЕМ ВЕСЬ ИНТЕРФЕЙС
    if (isBanned || !isSubActive) {
        document.body.classList.add('locked-no-sub');
        if (navEl) navEl.style.display = 'none';

        document.querySelectorAll('.page-section').forEach(sec => {
            sec.style.display = 'none';
        });

        if (paywallEl) {
            paywallEl.className = 'page-section fullscreen-lock';
            paywallEl.style.display = 'flex';
        }

        if (isBanned) {
            if (badgeEl) { badgeEl.className = 'sub-tier-badge tier-expired'; badgeEl.innerText = '⛔️ Доступ заблокирован'; }
            if (paywallReason) paywallReason.innerText = 'Ваш аккаунт заблокирован администратором.';
        } else if (!currentUser.sub_end) {
            if (badgeEl) { badgeEl.className = 'sub-tier-badge tier-expired'; badgeEl.innerText = '❌ Нет подписки'; }
            if (paywallReason) paywallReason.innerText = 'У вас нет активной подписки. Активируйте триал или оформите доступ.';
        } else {
            if (badgeEl) { badgeEl.className = 'sub-tier-badge tier-expired'; badgeEl.innerText = '⏳ Срок подписки истек'; }
            if (paywallReason) paywallReason.innerText = `Ваша подписка завершилась ${new Date(currentUser.sub_end).toLocaleDateString()}. Продлите доступ для продолжения.`;
        }

        return false;
    }

    // ПОДПИСКА АКТИВНА
    document.body.classList.remove('locked-no-sub');
    if (paywallEl) paywallEl.style.display = 'none';
    if (navEl) navEl.style.display = 'flex';

    const end = new Date(currentUser.sub_end);
    if (badgeEl) {
        if (end.getFullYear() > 2099) {
            badgeEl.className = 'sub-tier-badge tier-vip';
            badgeEl.innerText = '💎 VIP Навсегда';
        } else {
            badgeEl.className = 'sub-tier-badge tier-month';
            badgeEl.innerText = `⚡️ Премиум до ${end.toLocaleDateString()}`;
        }
    }

    // Возвращаем видимость активной вкладке
    const activeNav = document.querySelector('.nav-btn.active');
    const targetId = activeNav ? activeNav.getAttribute('data-target') : 'dashboard';
    const activeSection = document.getElementById(targetId);
    if (activeSection) activeSection.style.display = 'block';

    return true;
}

/* ====================================================
   ОДИНОЧНЫЕ ОРДЕРА
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
    haptic('success');
    await refreshData();
    renderAll();
    handleNavClick('dashboard', document.querySelector('.nav-btn[data-target="dashboard"]'));
}

function openNewCardModal() {
    if (!requireSubscription()) return;
    haptic('light');
    document.getElementById('modal-card-create').classList.add('show');
}

async function submitCreateCard() {
    if (!requireSubscription()) return;

    const name = document.getElementById('new-card-name').value.trim();
    const num = document.getElementById('new-card-num').value.trim();
    const holder = document.getElementById('new-card-holder').value.trim();
    const limit = parseFloat(document.getElementById('new-card-limit').value) || null;

    if (!name) return showToast("⚠️ Введите название карты!");

    await db(`cards`, {
        method: 'POST',
        body: JSON.stringify({
            tg_id: currentUser.tg_id,
            card_name: name,
            card_number: num,
            holder_name: holder,
            buy_limit: limit,
            color_accent: '#f3a600',
            status: 'active'
        })
    });
    closeModals();
    showToast("✅ Карта успешно создана!");
    await refreshData();
    renderAll();
}

function openCardOpModal(cid, type) {
    if (!requireSubscription()) return;
    haptic('light');
    activeCardId = cid;
    activeOpType = type;
    document.getElementById('modal-op-title').innerText = type === 'deposit' ? '➕ Пополнение кассы' : '➖ Снятие наличных';
    document.getElementById('modal-op-btn').innerText = type === 'deposit' ? 'Внести' : 'Списать';
    document.getElementById('withdraw-limit-toggle-wrap').style.display = type === 'withdraw' ? 'flex' : 'none';
    document.getElementById('modal-card-op').classList.add('show');
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
    showToast("✅ Операция записана в кассу!");
    await refreshData();
    renderCards();
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
    haptic('light');
    const link = document.getElementById('ref-link-box').innerText;
    navigator.clipboard.writeText(link);
    showToast("Партнерская ссылка скопирована!");
}

function shareRefLink() {
    haptic('light');
    const link = document.getElementById('ref-link-box').innerText;
    if (tg?.openTelegramLink) {
        tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent('P2P Terminal Pro — Enterprise Ledger & WAC:')}`);
    }
}

function openSupport() {
    const url = "https://t.me/P2P_Rbot";
    if (tg?.openTelegramLink) tg.openTelegramLink(url);
    else window.open(url, '_blank');
}

/* ====================================================
   РЕЖИМЫ ИНТЕРФЕЙСА И НАВИГАЦИЯ
==================================================== */
function switchLayoutMode(isChecked) {
    haptic('medium');
    layoutMode = isChecked ? 'feed' : 'pages';
    localStorage.setItem('p2p_layout_mode', layoutMode);

    const desc = document.getElementById('layout-mode-desc');
    if (desc) desc.innerText = isChecked ? "Сплошная лента (скролл)" : "По раздельности (вкладки)";

    document.querySelectorAll('.page-section').forEach(sec => {
        if (sec.id !== 'admin-panel' && sec.id !== 'paywall') {
            sec.style.display = layoutMode === 'feed' ? 'block' : 'none';
        }
    });

    if (layoutMode !== 'feed') {
        document.getElementById('dashboard').style.display = 'block';
    }
    //showToast(isChecked ? "📜 Режим ленты включен" : "📱 Режим вкладок включен");
}

function switchUiMode(isChecked) {
    haptic('medium');
    uiMode = isChecked ? 'fx' : 'simple';
    localStorage.setItem('p2p_ui_mode', uiMode);
    document.body.className = uiMode === 'fx' ? 'mode-fx' : 'mode-simple';

    const desc = document.getElementById('ui-mode-desc');
    if (desc) desc.innerText = isChecked ? "Полный FX (3D эффекты и фон)" : "Минимализм (OLED черный, без анимаций)";

    applyIncognito();
    //showToast(isChecked ? "🌟 Полный FX активирован" : "⚡️ Минимализм включен");
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

function toggleSecondaryStats() {
    haptic('light');
    isSecondaryExpanded = !isSecondaryExpanded;
    const wrap = document.getElementById('secondary-stats-wrap');
    const txt = document.getElementById('txt-toggle-details');
    const arrow = document.getElementById('toggle-arrow');
    const dict = I18N[currentLang] || I18N.ru;

    if (wrap) wrap.style.display = isSecondaryExpanded ? 'block' : 'none';
    if (txt) txt.innerText = isSecondaryExpanded ? dict.hideSecondary : dict.showSecondary;
    if (arrow) arrow.innerText = isSecondaryExpanded ? '▴' : '▾';
}

function setPeriod(p, el) {
    haptic('light');
    currentPeriod = p;
    document.querySelectorAll('.period-tabs .p-tab').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
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
    document.getElementById('custom-date-from').value = `${from.getFullYear()}-${pad(from.getMonth() + 1)}-${pad(from.getDate())}`;
    document.getElementById('custom-date-to').value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    applyCustomDateFilter();
}

function applyCustomDateFilter() {
    const fVal = document.getElementById('custom-date-from').value;
    const tVal = document.getElementById('custom-date-to').value;
    if (!fVal || !tVal) return showToast("⚠️ Укажите обе даты!");
    customStartDate = new Date(fVal + "T00:00:00");
    customEndDate = new Date(tVal + "T23:59:59");
    currentPeriod = 'custom';
    document.querySelectorAll('.period-tabs .p-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-custom').classList.add('active');
    calculateStats();
    showToast("📅 Период применен!");
}

async function submitPromoCode() {
    const input = document.getElementById('inp-promocode');
    const code = input?.value?.trim()?.toUpperCase();
    if (!code) return showToast("⚠️ Введите промокод");

    haptic('medium');
    try {
        const promos = await db(`promocodes?code=eq.${code}`);
        if (!promos || promos.length === 0) return showToast("❌ Промокод не найден");

        const promo = promos[0];
        if (promo.used_count >= promo.max_activations) return showToast("❌ Лимит исчерпан");

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
        showToast("❌ Ошибка активации промокода");
    }
}

/* ====================================================
   ОТРИСОВКА И ОБНОВЛЕНИЕ ДАННЫХ
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

    // 1. Сначала проверяем только профиль и статус подписки
    const u = await db(`users?tg_id=eq.${currentUser.tg_id}`);
    if (u && u.length > 0) currentUser = u[0];

    // 2. ЗАЩИТА: Если подписки нет — очищаем массивы и не качаем данные из базы
    if (!hasActiveSubscription()) {
        userCards = [];
        userTrades = [];
        cardOps = [];
        return;
    }

    // 3. Скачиваем конфиденциальные данные только при наличии активного доступа
    const [c, t, o] = await Promise.all([
        db(`cards?tg_id=eq.${currentUser.tg_id}&order=created_at.asc`),
        db(`trades?tg_id=eq.${currentUser.tg_id}&order=date.desc`),
        db(`card_operations?tg_id=eq.${currentUser.tg_id}`)
    ]);
    userCards = c || [];
    userTrades = t || [];
    cardOps = o || [];
}

/* ====================================================
   ЗАГРУЗЧИК (FAIL-SAFE)
==================================================== */
function runTerminalBootSequence(onComplete) {
    const stream = document.getElementById('console-stream');
    const pBar = document.getElementById('boot-progress-bar');
    const pPct = document.getElementById('boot-pct');

    const logs = [
        "<span class='c-green'>[INIT]</span> Loading Cryptographic Ledger...",
        "<span class='c-gold'>[AUTH]</span> Verifying Telegram Mini App Handshake...",
        "<span class='c-blue'>[DB]</span> Connecting to Encrypted Supabase Node...",
        "<span class='c-green'>[LEDGER]</span> Synchronizing WAC Engine & Cards...",
        "<span class='c-gold'>[READY]</span> Terminal Pro v1.0.0 Ready."
    ];

    let step = 0;
    const interval = setInterval(() => {
        if (!stream) {
            clearInterval(interval);
            if (onComplete) onComplete();
            return;
        }

        if (step < logs.length) {
            const line = document.createElement('div');
            line.className = 'console-line visible';
            line.innerHTML = logs[step];
            stream.appendChild(line);

            const pct = Math.round(((step + 1) / logs.length) * 100);
            if (pBar) pBar.style.width = `${pct}%`;
            if (pPct) pPct.innerText = `${pct}%`;
            step++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                if (onComplete) onComplete();
            }, 200);
        }
    }, 100);
}

function forceHideLoader() {
    const loader = document.getElementById('terminal-boot-loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => { loader.style.display = 'none'; }, 350);
    }
    const container = document.querySelector('.container');
    const nav = document.querySelector('.bottom-nav');
    if (container) container.style.display = 'block';
    if (nav) nav.style.display = 'flex';
}

/* ====================================================
   ИНИЦИАЛИЗАЦИЯ
==================================================== */
async function init() {
    document.body.className = uiMode === 'fx' ? 'mode-fx' : 'mode-simple';

    const toggleLayout = document.getElementById('toggle-layout-mode');
    if (toggleLayout) toggleLayout.checked = (layoutMode === 'feed');

    // ПРИНУДИТЕЛЬНО ПРИМЕНЯЕМ РЕЖИМ ОТОБРАЖЕНИЯ ПРИ СТАРТЕ
    switchLayoutMode(layoutMode === 'feed');

    // ИНИЦИАЛИЗАЦИЯ ТУМБЛЕРА ВИЗУАЛЬНЫХ ЭФФЕКТОВ (FX) ПРИ СТАРТЕ
    const toggleUi = document.getElementById('toggle-ui-mode');
    if (toggleUi) toggleUi.checked = (uiMode === 'fx');

    const toggleSound = document.getElementById('toggle-sound-mode');
    if (toggleSound) toggleSound.checked = soundEnabled;

    const setLangSel = document.getElementById('set-lang');
    if (setLangSel) setLangSel.value = currentLang;

    applyLanguage(currentLang);
    applyIncognito();

    const failsafeTimeout = setTimeout(() => {
        forceHideLoader();
        renderAll();
    }, 2200);

    const tgUser = tg?.initDataUnsafe?.user;

    runTerminalBootSequence(async () => {
        if (!tgUser || !tgUser.id) {
            clearTimeout(failsafeTimeout);
            document.getElementById('terminal-boot-loader').style.display = 'none';
            document.getElementById('restricted-screen').style.display = 'flex';
            return;
        }

        try {
            let users = await db(`users?tg_id=eq.${tgUser.id}`);
            if (!users || users.length === 0) {
                const created = await db(`users`, {
                    method: 'POST',
                    body: JSON.stringify({
                        tg_id: tgUser.id,
                        username: tgUser.username,
                        first_name: tgUser.first_name,
                        currency: 'RUB',
                        tz_offset: 3
                    })
                });
                currentUser = created ? created[0] : { tg_id: tgUser.id };
            } else {
                currentUser = users[0];
            }

            const currSel = document.getElementById('set-currency');
            if (currSel && currentUser.currency) currSel.value = currentUser.currency;

            const tzSel = document.getElementById('set-tz');
            if (tzSel && currentUser.tz_offset) tzSel.value = String(currentUser.tz_offset);

            await refreshData();
            await checkAdminStatus(tgUser.id);
            await loadLiveSiteBanner();

            document.getElementById('disp-uid').innerText = currentUser.tg_id;
            document.getElementById('ref-link-box').innerText = `https://t.me/P2P_Rbot?start=${currentUser.tg_id}`;

            // Считаем строго тех рефералов, кто нажал кнопку и использовал триал
            try {
                const refs = await db(`users?ref_by=eq.${currentUser.tg_id}&trial_used=eq.true&select=tg_id`);
                const refEl = document.getElementById('ref-count-val');
                if (refEl) refEl.innerText = refs ? refs.length : 0;
            } catch(e) {
                const refEl = document.getElementById('ref-count-val');
                if (refEl) refEl.innerText = 0;
            }


        } catch(e) {
            console.error(e);
        } finally {
            clearTimeout(failsafeTimeout);
            forceHideLoader();
            renderAll();
            checkSubscription();
            runCalculator();
        }
    });
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
