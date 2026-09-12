const API_URL = "https://slddpusuckhhvvetpgxa.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZGRwdXN1Y2toaHZ2ZXRwZ3hhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODYwNzMyMiwiZXhwIjoyMTA0MTgzMzIyfQ.obfZa6h7dKqVvzdHUAXRQ6TAZ8dSsmBZqmUCtBVO0QM";

const SUPER_ADMIN_ID = 5172556128;
let adminIds = [SUPER_ADMIN_ID];

/* ====================================================
   БЕЗОПАСНОЕ ХРАНИЛИЩЕ (ФИКС ЗАВИСАНИЯ НА IOS)
==================================================== */
function safeStorageGet(key, fallback = null) {
    try {
        const val = localStorage.getItem(key);
        return val !== null ? val : fallback;
    } catch(e) {
        return fallback;
    }
}

function safeStorageSet(key, val) {
    try {
        localStorage.setItem(key, String(val));
    } catch(e) {}
}

/* ====================================================
   ПОЛНЫЙ МУЛЬТИЯЗЫЧНЫЙ СЛОВАРЬ (7 ЯЗЫКОВ)
==================================================== */
const I18N = {
    ru: {
        tabToday: "За сегодня", tabMonth: "За месяц", tabAll: "Все время", tabCustom: "Свой период 📅",
        totalProfitBadge: "💰 ОБЩАЯ ПРИБЫЛЬ", netIn: "Чистая в", netInUsdt: "Чистая в USDT",
        formulaFiat: "Продажа − Покупка", formulaUsdt: "Покупка − Продажа",
        midPriceHint: "⚖️ Средняя цена (Mid Price):",
        statRoi: "📈 ROI от оборота", statWac: "🛒 WAC Закупка", statAvgSell: "🏷 Ср. Продажа",
        statOps: "🔢 Всего сделок / Покупок / Продаж", turnCombinedTitle: "💸 Оборот (Фиат / USDT)",
        spreadCardTitle: "СПРЕД СДЕЛОК", lastCycleSpread: "Последний круг", avgPeriodSpread: "Ср. за период",
        hintAvgSpread: "По WAC за таймфрейм",
        calcTitle: "КАЛЬКУЛЯТОР КРУГА", calcDealPrice: "Прайс сделки",
        calcBuyHeader: "ПОКУПКА 🟢", calcBuyRate: "Курс USDT",
        calcSellHeader: "ПРОДАЖА 🔴", calcSellRate: "Курс USDT",
        calcSpread: "Спред:", calcProfit: "Прибыль с круга:",
        calcSaveCycle: "Сохранить круг ✅", calcClear: "Очистить ❌",
        showSecondary: "📊 Развернуть подробную статистику", hideSecondary: "📊 Скрыть подробную статистику",
        presetYesterday: "Вчера", preset7d: "7 дней", preset30d: "30 дней",
        dateFrom: "С даты", dateTo: "По дату", btnApplyDate: "Применить ⚡️",
        calendarToggle: "📅 Календарь доходности месяца", calendarHint: "Зажмите день для превью • Нажмите для деталей",
        newTradeTitle: "Новая операция", newTradeSubtitle: "Внести единичный ордер в базу",
        buyBtn: "ПОКУПКА 🟢", sellBtn: "ПРОДАЖА 🔴", modeFiat: "Сумма фиата", modeCrypto: "Объем USDT",
        lblRate: "Курс USDT", lblCardOpt: "Банковская карта (Опционально)", noCardOpt: "Без привязки к карте", lblBindCard: "Привязать карту к кругу",
        cardsTitle: "Мои карты", cardsSubtitle: "Клик по карте открывает полное управление", btnCreateCard: "➕ Создать",
        historyTitle: "История операций", historySubtitle: "Синхронизированные сделки, круги и заметки", btnExport: "📥 Экспорт",
        profileTitle: "Настройки", profileSubtitle: "Конфигурация аккаунта и промокоды",
        lblYourId: "ВАШ TELEGRAM ID", lblLang: "Язык интерфейса", lblBaseCur: "Базовая валюта",
        lblTimezone: "Часовой пояс (UTC)", btnSubModal: "💎 Подписка",
        btnSupport: "👨‍💻 Служба поддержки", paywallTitle: "Доступ к Терминалу 🔒",
        paywallSubtitle: "Оформите доступ для использования функций",
        trialBadge: "Бесплатный доступ", trialDesc: "🎁 <b>Пробный период 24 часа</b> активируется исключительно внутри Telegram-бота.",
        btnActivateTrial: "🎁 Активировать триал", plansBadge: "Тарифные планы",
        plansDesc: "Оплата и сверка перевода Bybit производятся безопасно внутри Telegram-бота.",
        plan1m: "1 Месяц", planForever: "Навсегда", btnBuySub: "💳 Оформить подписку",
        subModalTitle: "Оформление в Telegram-боте",
        subModalDesc: "Активация 24 часов бесплатного триала и покупка тарифов производятся <b>исключительно в нашем Telegram-боте</b>.<br><br>После отправки перевода и сверки Bybit UID доступ в веб-терминале активируется автоматически!",
        btnGotIt: "Понятно", cardModalTitle: "➕ Добавить карту", cardNameLbl: "Название карты", cardNumLbl: "Номер карты / СБП", cardBankLbl: "Банк", cardHolderLbl: "ФИО Получателя", cardLimitLbl: "Суточный лимит (0 = без лимита)",
        btnCancel: "Отмена", btnCreate: "Создать",
        opAmountLbl: "Сумма в фиате", opCommentLbl: "Комментарий", btnApply: "Применить",
        editModalTitle: "Редактирование сделки", navSummary: "Сводка", navTrade: "Сделка",
        navCards: "Карты", navHistory: "История", navSettings: "Настройки", navAdmin: "Админ",
        restrictedTitle: "Доступ ограничен", restrictedDesc: "Терминал защищен и запускается <b>исключительно через Telegram Mini App</b>.",
        openBotBtn: "🚀 Открыть бота", btnSharePnl: "📸 Карточка", promoTitle: "🎁 Активация промокода", soundTitle: "Звук монет / кассы", soundDesc: "Аудио-отклик фиксации профита", layoutTitle: "Режим общей ленты", uiModeLabel: "Визуальные эффекты (FX)", refTitle: "Партнерская сеть", refSubtitle: "Бонусные дни подписки", refInvited: "Приглашено пользователей", refYourLink: "Ваша партнерская ссылка", btnCopy: "📋 Скопировать", btnShare: "🚀 Отправить"
    },
    en: {
        tabToday: "Today", tabMonth: "This Month", tabAll: "All Time", tabCustom: "Custom Range 📅",
        totalProfitBadge: "💰 TOTAL PROFIT", netIn: "Net in", netInUsdt: "Net in USDT",
        formulaFiat: "Sell − Buy", formulaUsdt: "Buy − Sell",
        midPriceHint: "⚖️ Mid Price:",
        statRoi: "📈 Turnover ROI", statWac: "🛒 WAC Buy Price", statAvgSell: "🏷 Avg Sell Price",
        statOps: "🔢 Trades: Total / Buys / Sells", turnCombinedTitle: "💸 Turnover (Fiat / USDT)",
        spreadCardTitle: "TRADE SPREADS", lastCycleSpread: "Last Cycle", avgPeriodSpread: "Period Avg",
        hintAvgSpread: "By period WAC",
        calcTitle: "CYCLE CALCULATOR", calcDealPrice: "Deal Budget",
        calcBuyHeader: "BUY 🟢", calcBuyRate: "USDT Rate",
        calcSellHeader: "SELL 🔴", calcSellRate: "USDT Rate",
        calcSpread: "Spread:", calcProfit: "Cycle Profit:",
        calcSaveCycle: "Save Cycle ✅", calcClear: "Clear ❌",
        showSecondary: "📊 Show Detailed Stats", hideSecondary: "📊 Hide Detailed Stats",
        presetYesterday: "Yesterday", preset7d: "7 days", preset30d: "30 days",
        dateFrom: "Date from", dateTo: "Date to", btnApplyDate: "Apply ⚡️",
        calendarToggle: "📅 Monthly Profit Calendar", calendarHint: "Hold day for preview • Tap for details",
        newTradeTitle: "New Operation", newTradeSubtitle: "Record single order into ledger",
        buyBtn: "BUY 🟢", sellBtn: "SELL 🔴", modeFiat: "Fiat Amount", modeCrypto: "USDT Volume",
        lblRate: "USDT Rate", lblCardOpt: "Bank Card (Optional)", noCardOpt: "No card bound", lblBindCard: "Bind card to cycle",
        cardsTitle: "My Cards", cardsSubtitle: "Tap card to open full controls", btnCreateCard: "➕ Add Card",
        historyTitle: "Operations History", historySubtitle: "Synchronized cycles, trades and notes", btnExport: "📥 Export",
        profileTitle: "Settings", profileSubtitle: "Account config and promo codes",
        lblYourId: "YOUR TELEGRAM ID", lblLang: "Interface Language", lblBaseCur: "Base Currency",
        lblTimezone: "Timezone (UTC)", btnSubModal: "💎 Upgrade / Renew",
        btnSupport: "👨‍💻 Support Center", paywallTitle: "Terminal Access 🔒",
        paywallSubtitle: "Unlock full terminal features",
        trialBadge: "Free Trial", trialDesc: "🎁 <b>24-Hour Free Trial</b> is activated in our Telegram Bot.",
        btnActivateTrial: "🎁 Activate Trial", plansBadge: "Subscription Plans",
        plansDesc: "Bybit payment and UID verification are processed in our Telegram Bot.",
        plan1m: "1 Month", planForever: "Lifetime VIP", btnBuySub: "💳 Get Subscription",
        subModalTitle: "Purchase in Telegram Bot",
        subModalDesc: "Trial activation and paid plans are processed <b>in our Telegram Bot</b>.<br><br>Access activates automatically!",
        btnGotIt: "Got It", cardModalTitle: "➕ Add Card", cardNameLbl: "Card Label", cardNumLbl: "Card / SBP Number", cardBankLbl: "Bank", cardHolderLbl: "Holder Name", cardLimitLbl: "Daily Limit (0 = none)",
        btnCancel: "Cancel", btnCreate: "Create",
        opAmountLbl: "Amount in fiat", opCommentLbl: "Comment", btnApply: "Apply",
        editModalTitle: "Edit Trade", navSummary: "Summary", navTrade: "Trade",
        navCards: "Cards", navHistory: "History", navSettings: "Settings", navAdmin: "Admin",
        restrictedTitle: "Access Restricted", restrictedDesc: "This terminal launches strictly via Telegram Mini App.",
        openBotBtn: "🚀 Open Telegram Bot", btnSharePnl: "📸 Card", promoTitle: "🎁 Promo Code Activation", soundTitle: "Cash / Coin Sound", soundDesc: "Audio feedback on cycle recording", layoutTitle: "Continuous Feed Mode", uiModeLabel: "Visual Effects (FX)", refTitle: "Partner Network", refSubtitle: "Bonus subscription days", refInvited: "Invited Traders", refYourLink: "Your Referral Link", btnCopy: "📋 Copy", btnShare: "🚀 Share"
    },
    es: {
        tabToday: "Hoy", tabMonth: "Este mes", tabAll: "Todo el tiempo", tabCustom: "Elegir fechas 📅",
        totalProfitBadge: "💰 BENEFICIO TOTAL", netIn: "Neto en", netInUsdt: "Neto en USDT",
        formulaFiat: "Venta − Compra", formulaUsdt: "Compra − Venta", midPriceHint: "⚖️ Precio justo (Mid Price):",
        statRoi: "📈 ROI de volumen", statWac: "🛒 WAC Compra", statAvgSell: "🏷 Venta Media",
        statOps: "🔢 Órdenes: total / compras / ventas", turnCombinedTitle: "💸 Volumen (Fiat / USDT)",
        spreadCardTitle: "SPREAD DE ÓRDENES", lastCycleSpread: "Último ciclo", avgPeriodSpread: "Promedio del periodo",
        hintAvgSpread: "Por WAC del periodo", calcTitle: "CALCULADORA DE CICLO", calcDealPrice: "Presupuesto",
        calcBuyHeader: "COMPRA 🟢", calcBuyRate: "Tasa USDT", calcSellHeader: "VENTA 🔴", calcSellRate: "Tasa USDT",
        calcSpread: "Spread:", calcProfit: "Beneficio del ciclo:", calcSaveCycle: "Guardar ciclo ✅", calcClear: "Limpiar ❌",
        showSecondary: "📊 Mostrar estadísticas", hideSecondary: "📊 Ocultar estadísticas",
        presetYesterday: "Ayer", preset7d: "7 días", preset30d: "30 días", dateFrom: "Desde", dateTo: "Hasta",
        btnApplyDate: "Aplicar ⚡️", calendarToggle: "📅 Calendario mensual", calendarHint: "Mantenga para vista previa • Toque para detalles",
        newTradeTitle: "Nueva operación", newTradeSubtitle: "Registrar orden", buyBtn: "COMPRA 🟢", sellBtn: "VENTA 🔴",
        modeFiat: "Fiat", modeCrypto: "USDT", lblRate: "Tasa USDT", lblCardOpt: "Tarjeta bancaria", noCardOpt: "Sin tarjeta", lblBindCard: "Vincular tarjeta",
        cardsTitle: "Mis tarjetas", cardsSubtitle: "Toque para abrir opciones", btnCreateCard: "➕ Agregar",
        historyTitle: "Historial de órdenes", historySubtitle: "Transacciones y notas", btnExport: "📥 Exportar",
        profileTitle: "Ajustes", profileSubtitle: "Configuración y códigos", lblYourId: "TELEGRAM ID", lblLang: "Idioma",
        lblBaseCur: "Moneda base", lblTimezone: "Zona horaria (UTC)", btnSubModal: "💎 Suscripción", btnSupport: "👨‍💻 Soporte",
        paywallTitle: "Acceso restringido 🔒", paywallSubtitle: "Desbloquee las funciones", trialBadge: "Prueba gratuita",
        trialDesc: "Prueba de 24 horas en el bot.", btnActivateTrial: "🎁 Activar prueba", plansBadge: "Planes", plansDesc: "Pago seguro.",
        plan1m: "1 Mes", planForever: "De por vida", btnBuySub: "💳 Suscripción", subModalTitle: "Adquisición en Telegram",
        subModalDesc: "¡Activación automática!", btnGotIt: "Entendido", cardModalTitle: "➕ Nueva tarjeta", cardNameLbl: "Nombre", cardNumLbl: "Número", cardBankLbl: "Banco", cardHolderLbl: "Titular", cardLimitLbl: "Límite", btnCancel: "Cancelar", btnCreate: "Crear", opAmountLbl: "Monto", opCommentLbl: "Comentario", btnApply: "Aplicar", editModalTitle: "Editar operación", navSummary: "Resumen", navTrade: "Orden", navCards: "Tarjetas", navHistory: "Historial", navSettings: "Ajustes", navAdmin: "Admin", restrictedTitle: "Acceso restringido", restrictedDesc: "Abra en Telegram Mini App.", openBotBtn: "🚀 Abrir bot", btnSharePnl: "📸 Imagen", promoTitle: "🎁 Código promocional", soundTitle: "Sonido de caja", soundDesc: "Respuesta de audio", layoutTitle: "Modo lista continua", uiModeLabel: "Efectos (FX)", refTitle: "Afiliados", refSubtitle: "Días extra", refInvited: "Invitados", refYourLink: "Enlace", btnCopy: "📋 Copiar", btnShare: "🚀 Compartir"
    },
    fr: {
        tabToday: "Aujourd'hui", tabMonth: "Ce mois", tabAll: "Tout temps", tabCustom: "Choisir dates 📅",
        totalProfitBadge: "💰 PROFIT TOTAL", netIn: "Net en", netInUsdt: "Net en USDT",
        formulaFiat: "Vente − Achat", formulaUsdt: "Achat − Vente", midPriceHint: "⚖️ Prix moyen:",
        statRoi: "📈 ROI volume", statWac: "🛒 Achat WAC", statAvgSell: "🏷 Vente moyenne",
        statOps: "🔢 Ordres: total / achats / ventes", turnCombinedTitle: "💸 Volume (Fiat / USDT)",
        spreadCardTitle: "SPREADS DES ORDRES", lastCycleSpread: "Dernier cycle", avgPeriodSpread: "Moyenne du cycle",
        hintAvgSpread: "Par WAC", calcTitle: "CALCULATEUR DE CYCLE", calcDealPrice: "Budget",
        calcBuyHeader: "ACHAT 🟢", calcBuyRate: "Taux USDT", calcSellHeader: "VENTE 🔴", calcSellRate: "Taux USDT",
        calcSpread: "Spread:", calcProfit: "Profit du cycle:", calcSaveCycle: "Enregistrer ✅", calcClear: "Effacer ❌",
        showSecondary: "📊 Afficher détails", hideSecondary: "📊 Masquer détails",
        presetYesterday: "Hier", preset7d: "7 jours", preset30d: "30 jours", dateFrom: "Du", dateTo: "Au",
        btnApplyDate: "Appliquer ⚡️", calendarToggle: "📅 Calendrier de profit", calendarHint: "Maintenez pour l'aperçu • Touchez pour détails",
        newTradeTitle: "Nouvelle opération", newTradeSubtitle: "Enregistrer ordre", buyBtn: "ACHAT 🟢", sellBtn: "VENTE 🔴",
        modeFiat: "Fiat", modeCrypto: "Volume USDT", lblRate: "Taux USDT", lblCardOpt: "Carte bancaire", noCardOpt: "Aucune carte", lblBindCard: "Lier carte",
        cardsTitle: "Mes cartes", cardsSubtitle: "Touchez pour gérer", btnCreateCard: "➕ Créer",
        historyTitle: "Historique des ordres", historySubtitle: "Transactions synchronisées", btnExport: "📥 Exporter",
        profileTitle: "Paramètres", profileSubtitle: "Configuration et codes", lblYourId: "TELEGRAM ID", lblLang: "Langue",
        lblBaseCur: "Devise", lblTimezone: "Fuseau horaire (UTC)", btnSubModal: "💎 Abonnement", btnSupport: "👨‍💻 Support",
        paywallTitle: "Accès restreint 🔒", paywallSubtitle: "Débloquez les fonctions", trialBadge: "Essai gratuit",
        trialDesc: "Essai 24h dans le bot.", btnActivateTrial: "🎁 Activer essai", plansBadge: "Formules", plansDesc: "Paiement sécurisé.",
        plan1m: "1 Mois", planForever: "À vie", btnBuySub: "💳 S'abonner", subModalTitle: "Souscription Telegram",
        subModalDesc: "Activation immédiate!", btnGotIt: "Compris", cardModalTitle: "➕ Nouvelle carte", cardNameLbl: "Nom", cardNumLbl: "Numéro", cardBankLbl: "Banque", cardHolderLbl: "Titulaire", cardLimitLbl: "Limite", btnCancel: "Annuler", btnCreate: "Créer", opAmountLbl: "Montant", opCommentLbl: "Commentaire", btnApply: "Appliquer", editModalTitle: "Modifier", navSummary: "Bilan", navTrade: "Ordre", navCards: "Cartes", navHistory: "Historique", navSettings: "Options", navAdmin: "Admin", restrictedTitle: "Accès restreint", restrictedDesc: "Ouvrez via Telegram Mini App.", openBotBtn: "🚀 Ouvrir bot", btnSharePnl: "📸 Image", promoTitle: "🎁 Code promo", soundTitle: "Son de caisse", soundDesc: "Retour audio", layoutTitle: "Mode défilement continu", uiModeLabel: "Effets FX", refTitle: "Affiliation", refSubtitle: "Gagnez des jours", refInvited: "Invités", refYourLink: "Lien", btnCopy: "📋 Copier", btnShare: "🚀 Partager"
    },
    de: {
        tabToday: "Heute", tabMonth: "Diesen Monat", tabAll: "Gesamtzeit", tabCustom: "Zeitraum wählen 📅",
        totalProfitBadge: "💰 GESAMTGEWINN", netIn: "Netto in", netInUsdt: "Netto in USDT",
        formulaFiat: "Verkauf − Kauf", formulaUsdt: "Kauf − Verkauf", midPriceHint: "⚖️ Mid Price:",
        statRoi: "📈 Umsatz-ROI", statWac: "🛒 WAC Kaufkurs", statAvgSell: "🏷 Durchschn. Verkauf",
        statOps: "🔢 Trades: Gesamt / Käufe / Verkäufe", turnCombinedTitle: "💸 Umsatz (Fiat / USDT)",
        spreadCardTitle: "TRADE-SPREADS", lastCycleSpread: "Letzter Zyklus", avgPeriodSpread: "Durchschnitt",
        hintAvgSpread: "Nach WAC", calcTitle: "ZYKLUS-RECHNER", calcDealPrice: "Auftragssumme",
        calcBuyHeader: "KAUF 🟢", calcBuyRate: "USDT-Kurs", calcSellHeader: "VERKAUF 🔴", calcSellRate: "USDT-Kurs",
        calcSpread: "Spread:", calcProfit: "Zyklus-Gewinn:", calcSaveCycle: "Buchen ✅", calcClear: "Zurücksetzen ❌",
        showSecondary: "📊 Details anzeigen", hideSecondary: "📊 Details ausblenden",
        presetYesterday: "Gestern", preset7d: "7 Tage", preset30d: "30 Tage", dateFrom: "Von", dateTo: "Bis",
        btnApplyDate: "Anwenden ⚡️", calendarToggle: "📅 Monatskalender", calendarHint: "Gedrückt halten für Vorschau • Tippen für Details",
        newTradeTitle: "Neuer Trade", newTradeSubtitle: "Zyklus buchen", buyBtn: "KAUF 🟢", sellBtn: "VERKAUF 🔴",
        modeFiat: "Fiat", modeCrypto: "USDT-Volumen", lblRate: "USDT-Kurs", lblCardOpt: "Bankkarte", noCardOpt: "Keine Karte", lblBindCard: "Karte binden",
        cardsTitle: "Meine Karten", cardsSubtitle: "Tippen zum Verwalten", btnCreateCard: "➕ Hinzufügen",
        historyTitle: "Trade-Historie", historySubtitle: "Trades und Notizen", btnExport: "📥 Export",
        profileTitle: "Einstellungen", profileSubtitle: "Konfiguration", lblYourId: "TELEGRAM ID", lblLang: "Sprache",
        lblBaseCur: "Basiswährung", lblTimezone: "Zeitzone (UTC)", btnSubModal: "💎 Abonnement", btnSupport: "👨‍💻 Support",
        paywallTitle: "Zugriff gesperrt 🔒", paywallSubtitle: "Abo freischalten", trialBadge: "Kostenloser Test",
        trialDesc: "24h im Bot.", btnActivateTrial: "🎁 Test starten", plansBadge: "Tarife", plansDesc: "Zahlung im Bot.",
        plan1m: "1 Monat", planForever: "Lebenslang", btnBuySub: "💳 Abo buchen", subModalTitle: "Aktivierung im Bot",
        subModalDesc: "Automatische Freischaltung!", btnGotIt: "Verstanden", cardModalTitle: "➕ Karte hinzufügen", cardNameLbl: "Name", cardNumLbl: "Nummer", cardBankLbl: "Bank", cardHolderLbl: "Inhaber", cardLimitLbl: "Limit", btnCancel: "Abbrechen", btnCreate: "Erstellen", opAmountLbl: "Betrag", opCommentLbl: "Kommentar", btnApply: "Anwenden", editModalTitle: "Bearbeiten", navSummary: "Übersicht", navTrade: "Trade", navCards: "Karten", navHistory: "Historie", navSettings: "Optionen", navAdmin: "Admin", restrictedTitle: "Zugriff beschränkt", restrictedDesc: "Starten Sie über Telegram Mini App.", openBotBtn: "🚀 Bot öffnen", btnSharePnl: "📸 Bild", promoTitle: "🎁 Promo-Code", soundTitle: "Münzsound", soundDesc: "Akustisches Feedback", layoutTitle: "Feed-Modus", uiModeLabel: "FX-Effekte", refTitle: "Partner", refSubtitle: "Bonus-Tage", refInvited: "Eingeladen", refYourLink: "Link", btnCopy: "📋 Kopieren", btnShare: "🚀 Teilen"
    },
    uk: {
        tabToday: "За сьогодні", tabMonth: "За місяць", tabAll: "Весь час", tabCustom: "Свій період 📅",
        totalProfitBadge: "💰 ЗАГАЛЬНИЙ ПРИБУТОК", netIn: "Чистий у", netInUsdt: "Чистий у USDT",
        formulaFiat: "Продаж − Купівля", formulaUsdt: "Купівля − Продаж",
        midPriceHint: "⚖️ Середня ціна (Mid Price):",
        statRoi: "📈 ROI від обороту", statWac: "🛒 WAC Закупівля", statAvgSell: "🏷 Сер. Продаж",
        statOps: "🔢 Всього угод / Купівель / Продажів", turnCombinedTitle: "💸 Оборот (Фіат / USDT)",
        spreadCardTitle: "СПРЕД УГОД", lastCycleSpread: "Останнє коло", avgPeriodSpread: "Сер. за період",
        hintAvgSpread: "По WAC за таймфрейм",
        calcTitle: "КАЛЬКУЛЯТОР КОЛА", calcDealPrice: "Прайс угоди",
        calcBuyHeader: "КУПІВЛЯ 🟢", calcBuyRate: "Курс USDT",
        calcSellHeader: "ПРОДАЖ 🔴", calcSellRate: "Курс USDT",
        calcSpread: "Спред:", calcProfit: "Прибуток з кола:",
        calcSaveCycle: "Зберегти коло ✅", calcClear: "Очистити ❌",
        showSecondary: "📊 Розгорнути детальну статистику", hideSecondary: "📊 Згорнути статистику",
        presetYesterday: "Вчора", preset7d: "7 днів", preset30d: "30 днів",
        dateFrom: "З дати", dateTo: "По дату", btnApplyDate: "Застосувати ⚡️",
        calendarToggle: "📅 Календар дохідності місяця", calendarHint: "Затисніть день для прев'ю • Натисніть для деталей",
        newTradeTitle: "Нова операція", newTradeSubtitle: "Внести коло в базу", buyBtn: "КУПІВЛЯ 🟢", sellBtn: "ПРОДАЖ 🔴",
        modeFiat: "Сума фіату", modeCrypto: "Об'єм USDT", lblRate: "Курс USDT", lblCardOpt: "Банківська картка", noCardOpt: "Без прив'язки", lblBindCard: "Прив'язати картку",
        cardsTitle: "Мої картки", cardsSubtitle: "Клік відкриває повне керування", btnCreateCard: "➕ Створити",
        historyTitle: "Історія операцій", historySubtitle: "Синхронізовані угоди та нотатки", btnExport: "📥 Експорт",
        profileTitle: "Налаштування", profileSubtitle: "Конфігурація та промокоди", lblYourId: "ВАШ TELEGRAM ID",
        lblLang: "Мова", lblBaseCur: "Базова валюта", lblTimezone: "Часовий пояс (UTC)", btnSubModal: "💎 Підписка",
        btnSupport: "👨‍💻 Підтримка", paywallTitle: "Доступ обмежено 🔒", paywallSubtitle: "Оформіть доступ",
        trialBadge: "Безкоштовний доступ", trialDesc: "🎁 Пробний період 24 години в боті.", btnActivateTrial: "🎁 Активувати тріал",
        plansBadge: "Тарифи", plansDesc: "Оплата в боті.", plan1m: "1 Місяць", planForever: "Назавжди", btnBuySub: "💳 Оформити підписку",
        subModalTitle: "Оформлення в боті", subModalDesc: "Автоматичний доступ!", btnGotIt: "Зрозуміло",
        cardModalTitle: "➕ Додати картку", cardNameLbl: "Назва", cardNumLbl: "Номер", cardBankLbl: "Банк", cardHolderLbl: "ПІБ", cardLimitLbl: "Ліміт", btnCancel: "Скасувати", btnCreate: "Створити", opAmountLbl: "Сума", opCommentLbl: "Коментар", btnApply: "Застосувати", editModalTitle: "Редагування", navSummary: "Зведення", navTrade: "Угода", navCards: "Картки", navHistory: "Історія", navSettings: "Налаштування", navAdmin: "Адмін", restrictedTitle: "Доступ обмежено", restrictedDesc: "Запускайте виключно через Telegram Mini App.", openBotBtn: "🚀 Відкрити бота", btnSharePnl: "📸 Картка", promoTitle: "🎁 Промокод", soundTitle: "Звук каси", soundDesc: "Звуковий відгук", layoutTitle: "Стрічка", uiModeLabel: "Візуальні ефекти (FX)", refTitle: "Партнерська мережа", refSubtitle: "Бонусні дні", refInvited: "Запрошено", refYourLink: "Посилання", btnCopy: "📋 Скопіювати", btnShare: "🚀 Поділитися"
    },
    kk: {
        tabToday: "Бүгін", tabMonth: "Осы айда", tabAll: "Барлық уақыт", tabCustom: "Күндерді таңдау 📅",
        totalProfitBadge: "💰 ЖАЛПЫ ПАЙДА", netIn: "Таза табыс:", netInUsdt: "USDT таза пайда",
        formulaFiat: "Сату − Сатып алу", formulaUsdt: "Сатып алу − Сату",
        midPriceHint: "⚖️ Орташа бағам (Mid Price):",
        statRoi: "📈 Айналым ROI", statWac: "🛒 WAC Сатып алу", statAvgSell: "🏷 Орташа сату",
        statOps: "🔢 Мәмілелер: барлығы / сатып алу / сату", turnCombinedTitle: "💸 Касса айналымы (Фиат / USDT)",
        spreadCardTitle: "МӘМІЛЕ СПРЕДІ", lastCycleSpread: "Соңғы айналым", avgPeriodSpread: "Кезең орташа спреді",
        hintAvgSpread: "WAC бойынша", calcTitle: "АЙНАЛЫМ КАЛЬКУЛЯТОРЫ", calcDealPrice: "Мәміле сомасы",
        calcBuyHeader: "САТЫП АЛУ 🟢", calcBuyRate: "USDT бағамы", calcSellHeader: "САТУ 🔴", calcSellRate: "USDT бағамы",
        calcSpread: "Спред:", calcProfit: "Айналым пайдасы:", calcSaveCycle: "Сақтау ✅", calcClear: "Тазалау ❌",
        showSecondary: "📊 Толық статистика", hideSecondary: "📊 Статистиканы жасыру",
        presetYesterday: "Кеше", preset7d: "7 күн", preset30d: "30 күн", dateFrom: "Бастап", dateTo: "Дейін",
        btnApplyDate: "Қолдану ⚡️", calendarToggle: "📅 Айлық табыс күнтізбесі", calendarHint: "Көру үшін ұстап тұрыңыз • Мәлімет үшін басыңыз",
        newTradeTitle: "Жаңа операция", newTradeSubtitle: "Бұлттық базаға сақтау", buyBtn: "САТЫП АЛУ 🟢", sellBtn: "САТУ 🔴",
        modeFiat: "Фиат сомасы", modeCrypto: "USDT көлемі", lblRate: "USDT бағамы", lblCardOpt: "Банк картасы", noCardOpt: "Карта таңдалмаған", lblBindCard: "Картаны байлау",
        cardsTitle: "Менің карталарым", cardsSubtitle: "Басқару үшін картаны басыңыз", btnCreateCard: "➕ Қосу",
        historyTitle: "Операциялар тарихы", historySubtitle: "Синхрондалған мәмілелер мен жазбалар", btnExport: "📥 Экспорт",
        profileTitle: "Баптаулар", profileSubtitle: "Конфигурация және промокодтар", lblYourId: "TELEGRAM ID", lblLang: "Тіл",
        lblBaseCur: "Негізгі валюта", lblTimezone: "Уақыт белдеуі (UTC)", btnSubModal: "💎 Жазылым", btnSupport: "👨‍💻 Қолдау",
        paywallTitle: "Кіру шектелген 🔒", paywallSubtitle: "Жазылым қажет", trialBadge: "Тегін сынақ",
        trialDesc: "24 сағаттық сынақ Telegram ботында.", btnActivateTrial: "🎁 Сынақты қосу", plansBadge: "Тарифтер", plansDesc: "Қауіпсіз төлем.",
        plan1m: "1 Ай", planForever: "Мәңгілік", btnBuySub: "💳 Жазылу", subModalTitle: "Ботта ресімдеу",
        subModalDesc: "Автоматты түрде қосылады!", btnGotIt: "Түсінікті", cardModalTitle: "➕ Карта қосу", cardNameLbl: "Атауы", cardNumLbl: "Нөмірі", cardBankLbl: "Банк", cardHolderLbl: "Аты-жөні", cardLimitLbl: "Лимит", btnCancel: "Болдырмау", btnCreate: "Құру", opAmountLbl: "Сома", opCommentLbl: "Түсініктеме", btnApply: "Қолдану", editModalTitle: "Өңдеу", navSummary: "Есеп", navTrade: "Мәміле", navCards: "Карталар", navHistory: "Тарих", navSettings: "Баптаулар", navAdmin: "Админ", restrictedTitle: "Кіру шектелген", restrictedDesc: "Терминал тек Telegram Mini App арқылы іске қосылады.", openBotBtn: "🚀 Ботты ашу", btnSharePnl: "📸 Карточка", promoTitle: "🎁 Промокодты белсендіру", soundTitle: "Тиын / касса дыбысы", soundDesc: "Аудио хабарлама", layoutTitle: "Лента режимі", uiModeLabel: "FX әсерлері", refTitle: "Серіктестік", refSubtitle: "Бонус күндер", refInvited: "Шақырылған", refYourLink: "Сілтеме", btnCopy: "📋 Көшіру", btnShare: "🚀 Бөлісу"
    }
};

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
        text: `Сопоставляет заработанную общую прибыль текущего периода с предыдущим таким же отрезком (сегодня со вчерашним днем, этот месяц с прошлым). Показывает ваш реальный темп роста в процентах.`
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
        text: `<b>Удержание (зажатие пальцем):</b> показывает быстрое превью ОБЩЕЙ прибыли и спреда без открытия окон.<br><br>
        <b>Обычный клик (тап):</b> открывает подробную карточку со списком всех сделок и оборотом за этот день. Расчет общей прибыли строго совпадает со сводкой!`
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
        text: `Отображает важную новость или акцию в самом верху терминала (между плашкой подписки и сводкой) для всех посетителей одновременно.`
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

/* ====================================================
   ЕДИНЫЙ СКВОЗНОЙ КАНОНИЧЕСКИЙ РАСЧЕТ ПРИБЫЛИ
==================================================== */
function calculateProfitEngine(tradesList) {
    let bF = 0, bC = 0, sF = 0, sC = 0, buysCount = 0, sellsCount = 0;
    let cycleProfitFiatTotal = 0;

    tradesList.forEach(t => {
        const f = parseFloat(t.fiat_amount || 0);
        const c = parseFloat(t.crypto_amount || 0);

        if (t.is_cycle) {
            bF += f; sF += f; bC += c;
            const soldC = t.sell_rate ? f / parseFloat(t.sell_rate) : c;
            sC += soldC;
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

    return {
        totalProfitFiat,
        totalProfitUsdt,
        profitFiat,
        profitUsdt,
        midPrice,
        wac,
        avgSell,
        avgPeriodSpread,
        fiatTurn,
        cryptoTurn,
        roi,
        buysCount,
        sellsCount,
        tradesCount: tradesList.length
    };
}

/* ====================================================
   КАЛЕНДАРЬ ДОХОДНОСТИ
==================================================== */
function toggleHeatmapPanel() {
    isHeatmapOpen = !isHeatmapOpen;
    const panel = document.getElementById('heatmap-panel');
    const arrow = document.getElementById('heatmap-arrow');
    if (panel) panel.style.display = isHeatmapOpen ? 'block' : 'none';
    if (arrow) arrow.innerText = isHeatmapOpen ? '▴' : '▾';
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

        // Сквозной расчет: календарь берет расчет ОБЩЕЙ прибыли
        const dayStats = calculateProfitEngine(dayTrades);
        const dayTotalProfit = dayStats.totalProfitFiat;

        let colorClass = '';
        if (dayTrades.length > 0) {
            if (dayTotalProfit > 10000) colorClass = 'profit-pos-high';
            else if (dayTotalProfit > 3000) colorClass = 'profit-pos-mid';
            else if (dayTotalProfit > 0) colorClass = 'profit-pos-low';
            else if (dayTotalProfit < 0) colorClass = 'profit-neg';
        }

        const cell = document.createElement('div');
        cell.className = `cal-day-cell ${colorClass}`;
        cell.innerText = day;

        // Зажатие (удержание пальцем) -> всплывает превью
        const startHold = () => {
            isHolding = false;
            holdTimer = setTimeout(() => {
                isHolding = true;
                showHoldTooltip(day, dayTotalProfit, dayTrades.length, dayStats.avgPeriodSpread);
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

        // Обычный тап -> детальная сводка
        cell.addEventListener('click', () => {
            if (isHolding) return;
            openDayDetailsModal(day, dayTotalProfit, dayTrades, dayStats);
        });

        container.appendChild(cell);
    }
}

function showHoldTooltip(day, totalProfit, count, spread) {
    const tip = document.getElementById('calendar-hold-tooltip');
    if (!tip) return;
    const sym = getCurrencySymbol();
    tip.innerHTML = `
        <div style="font-size: 13px; font-weight: 800; color: var(--bybit-yellow); margin-bottom: 4px;">📅 ${day} число</div>
        <div style="font-size: 18px; font-weight: 900; color: ${totalProfit >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)'}; margin-bottom: 2px;">
            ${totalProfit > 0 ? '+' : ''}${totalProfit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${sym}
        </div>
        <div style="font-size: 11px; color: var(--text-muted);">
            Сделок: <b>${count}</b> | Спред: <b>${spread > 0 ? '+' : ''}${spread.toFixed(2)}%</b>
        </div>
    `;
    tip.classList.add('show');
}

function hideHoldTooltip() {
    document.getElementById('calendar-hold-tooltip')?.classList.remove('show');
}

function openDayDetailsModal(day, totalProfit, trades, stats) {
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
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">ОБЩАЯ ПРИБЫЛЬ ДНЯ</div>
            <div style="font-size: 24px; font-weight: 900; color: ${totalProfit >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)'}; margin: 4px 0;">
                ${totalProfit > 0 ? '+' : ''}${totalProfit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${sym}
            </div>
            <div style="font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-around; margin-top: 6px;">
                <span>Оборот: <b>${stats.fiatTurn.toLocaleString()} ${sym}</b></span>
                <span>Сделок: <b>${trades.length}</b></span>
            </div>
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
   ГЕНЕРАТОР И ПРЕДПРОСМОТР PNL-КАРТОЧКИ
==================================================== */
let generatedPnlBlobUrl = null;

function openPnlPreviewModal() {
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
    generatedPnlBlobUrl = imgUrl;

    const previewImg = document.getElementById('pnl-preview-img');
    if (previewImg) previewImg.src = imgUrl;

    document.getElementById('modal-pnl-preview').classList.add('show');
}

function closePnlPreviewModal(e) {
    if (!e || e.target.id === 'modal-pnl-preview' || e.target.closest) {
        document.getElementById('modal-pnl-preview').classList.remove('show');
    }
}

function downloadPnlImage() {
    if (!generatedPnlBlobUrl) return;
    const link = document.createElement('a');
    link.download = `PnL_Report_${new Date().toISOString().slice(0,10)}.png`;
    link.href = generatedPnlBlobUrl;
    link.click();
    showToast("💾 Фото сохранено!");
}

function sharePnlImageNative() {
    if (tg && tg.openTelegramLink) {
        const link = `https://t.me/share/url?url=${encodeURIComponent(`https://t.me/P2P_Rbot?start=${currentUser?.tg_id || ''}`)}&text=${encodeURIComponent('Мой результат торговли в P2P Terminal Pro!')}`;
        tg.openTelegramLink(link);
    } else if (navigator.share) {
        navigator.share({
            title: 'P2P Terminal Pro',
            text: 'Мой результат в P2P Terminal!',
            url: `https://t.me/P2P_Rbot?start=${currentUser?.tg_id || ''}`
        }).catch(() => {});
    } else {
        downloadPnlImage();
    }
}

/* ====================================================
   АДМИН-ПАНЕЛЬ: БАЗА ТОЛЬКО АКТИВНЫХ ПОЛЬЗОВАТЕЛЕЙ
==================================================== */
let activeAdminInspectUser = null;

async function loadAdminAllUsers() {
    const box = document.getElementById('admin-users-scroll-box');
    const badge = document.getElementById('admin-users-count-badge');
    if (!box) return;
    box.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 12px; padding: 15px;">Фильтрация активных юзеров...</div>`;

    try {
        const [allUsers, allTrades] = await Promise.all([
            db(`users?select=*&order=reg_date.desc`),
            db(`trades?select=tg_id`)
        ]);

        const activeTradeUserIds = new Set((allTrades || []).map(t => t.tg_id));

        // Показываем ТОЛЬКО тех, у кого была активность (сделка / подписка / триал)
        adminAllUsers = (allUsers || []).filter(u => {
            const hasTrades = activeTradeUserIds.has(u.tg_id);
            const hasSub = Boolean(u.sub_end);
            const hasTrial = Boolean(u.trial_used);
            return hasTrades || hasSub || hasTrial;
        });

        if (badge) badge.innerText = `${adminAllUsers.length} активных`;
        renderAdminUsersList(adminAllUsers);
    } catch(e) {
        box.innerHTML = `<div style="color: var(--bybit-red); font-size: 12px; text-align: center;">Ошибка загрузки базы</div>`;
    }
}

function renderAdminUsersList(users) {
    const box = document.getElementById('admin-users-scroll-box');
    if (!box) return;
    box.innerHTML = '';
    if (users.length === 0) {
        box.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 12px; padding: 15px;">Активных пользователей не найдено</div>`;
        return;
    }

    users.forEach(u => {
        const isBanned = u.is_banned;
        const hasSub = u.sub_end && new Date(u.sub_end) > new Date();
        const badgeColor = isBanned ? 'var(--bybit-red)' : (hasSub ? 'var(--bybit-green)' : 'var(--text-muted)');
        const badgeText = isBanned ? 'БАН' : (hasSub ? (new Date(u.sub_end).getFullYear() > 2099 ? 'VIP' : 'АКТИВЕН') : 'БЫЛА ПОДПИСКА');

        box.innerHTML += `
            <div class="admin-user-row" onclick="openAdminUserDossier(${u.tg_id})">
                <div>
                    <div style="font-weight: 800; font-size: 13px;">${u.first_name || 'Без имени'} ${u.last_name || ''}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">@${u.username || 'нет'} | ID: <code>${u.tg_id}</code></div>
                </div>
                <div style="font-size: 10px; font-weight: 800; padding: 3px 7px; border-radius: 6px; background: rgba(0,0,0,0.4); border: 1px solid ${badgeColor}; color: ${badgeColor};">
                    ${badgeText}
                </div>
            </div>
        `;
    });
}

function filterAdminUsersList() {
    const q = document.getElementById('admin-user-search')?.value.toLowerCase().trim();
    if (!q) return renderAdminUsersList(adminAllUsers);
    const filtered = adminAllUsers.filter(u => {
        const idStr = String(u.tg_id);
        const nameStr = `${u.first_name || ''} ${u.last_name || ''}`.toLowerCase();
        const uname = (u.username || '').toLowerCase();
        return idStr.includes(q) || nameStr.includes(q) || uname.includes(q);
    });
    renderAdminUsersList(filtered);
}

async function openAdminUserDossier(tgId) {
    haptic('light');
    showToast("⏳ Загрузка досье...");
    try {
        const [uRes, tRes] = await Promise.all([
            db(`users?tg_id=eq.${tgId}`),
            db(`trades?tg_id=eq.${tgId}`)
        ]);

        if (!uRes || uRes.length === 0) return showToast("Пользователь не найден");
        const u = uRes[0];
        activeAdminInspectUser = u;
        const trades = tRes || [];

        const fiatTurn = trades.reduce((acc, t) => acc + parseFloat(t.fiat_amount || 0), 0);
        const cryptoTurn = trades.reduce((acc, t) => acc + parseFloat(t.crypto_amount || 0), 0);

        const box = document.getElementById('admin-user-full-dossier-box');
        const banBtn = document.getElementById('btn-admin-ban-toggle');

        if (banBtn) {
            banBtn.innerText = u.is_banned ? "🟢 Разбанить" : "⛔️ Забанить";
            banBtn.style.color = u.is_banned ? "var(--bybit-green)" : "var(--bybit-red)";
        }

        const subText = u.sub_end ? (new Date(u.sub_end).getFullYear() > 2099 ? '♾️ VIP Навсегда' : new Date(u.sub_end).toLocaleString()) : (u.trial_used ? 'Использован триал' : 'Нет доступа');

        box.innerHTML = `
            <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 12px; border: 1px solid var(--glass-border); font-size: 12px; line-height: 1.6;">
                <b>Имя:</b> ${u.first_name || 'Не указано'} ${u.last_name || ''}<br>
                <b>Username:</b> @${u.username || 'нет'}<br>
                <b>Telegram ID:</b> <code>${u.tg_id}</code><br>
                <b>Подписка:</b> <b style="color: var(--bybit-yellow);">${subText}</b><br>
                <b>Статус:</b> ${u.is_banned ? '<span style="color: var(--bybit-red);">🔴 ЗАБЛОКИРОВАН</span>' : '<span style="color: var(--bybit-green);">🟢 АКТИВЕН</span>'}<br>
                <b>Регистрация:</b> ${u.reg_date ? new Date(u.reg_date).toLocaleDateString() : 'Неизвестно'}<br>
                <b>Пригласил:</b> <code>${u.ref_by || 'Органика'}</code><br>
                <div style="margin-top: 8px; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;">
                    <b>Сделок в базе:</b> ${trades.length}<br>
                    <b>Оборот фиата:</b> ${fiatTurn.toLocaleString()} ₽<br>
                    <b>Оборот USDT:</b> ${cryptoTurn.toLocaleString()} USDT
                </div>
            </div>
        `;

        document.getElementById('modal-admin-user-inspect').classList.add('show');
    } catch(e) {
        showToast("Ошибка загрузки данных юзера");
    }
}

function closeAdminUserModal(e) {
    if (e.target.id === 'modal-admin-user-inspect') {
        document.getElementById('modal-admin-user-inspect').classList.remove('show');
    }
}

async function adminDossierAction(action) {
    if (!activeAdminInspectUser) return;
    const uid = activeAdminInspectUser.tg_id;
    const now = new Date();

    haptic('medium');
    try {
        if (action === 'grant30') {
            now.setDate(now.getDate() + 30);
            await db(`users?tg_id=eq.${uid}`, { method: 'PATCH', body: JSON.stringify({ sub_end: now.toISOString(), is_banned: false }) });
            showToast(`✅ +30 дней для ID ${uid}`);
        } else if (action === 'grantVIP') {
            await db(`users?tg_id=eq.${uid}`, { method: 'PATCH', body: JSON.stringify({ sub_end: "2100-01-01T00:00:00Z", is_banned: false }) });
            showToast(`✅ VIP выдан для ID ${uid}`);
        } else if (action === 'revoke') {
            await db(`users?tg_id=eq.${uid}`, { method: 'PATCH', body: JSON.stringify({ sub_end: null }) });
            showToast(`❌ Подписка снята для ID ${uid}`);
        } else if (action === 'toggleBan') {
            const nextBan = !activeAdminInspectUser.is_banned;
            await db(`users?tg_id=eq.${uid}`, { method: 'PATCH', body: JSON.stringify({ is_banned: nextBan }) });
            showToast(nextBan ? `⛔️ ID ${uid} забанен` : `🟢 ID ${uid} разбанен`);
        }
        await loadAdminAllUsers();
        await openAdminUserDossier(uid);
    } catch(e) {
        showToast("Ошибка выполнения действия");
    }
}

/* ====================================================
   РАССЫЛКА В ТЕЛЕГРАМ-БОТА
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

        let success = 0, errors = 0;
        for (let i = 0; i < users.length; i++) {
            const uid = users[i].tg_id;
            try {
                const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: uid, text: text, parse_mode: 'HTML' })
                });
                if (res.ok) success++;
                else errors++;
            } catch(e) {
                errors++;
            }
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
        if (bannerEl && actRes && actRes[0]?.value === 'true' && txtRes && txtRes[0]?.value) {
            bannerEl.style.display = 'block';
            document.getElementById('site-live-banner-text').innerText = txtRes[0].value;
        } else if (bannerEl) {
            bannerEl.style.display = 'none';
        }
    } catch(e) {}
}

async function adminUpdateBanner(isActive) {
    haptic('medium');
    const text = document.getElementById('admin-banner-text').value.trim();
    try {
        await Promise.all([
            setBotConfig('SITE_BANNER_TEXT', text),
            setBotConfig('SITE_BANNER_ACTIVE', String(isActive))
        ]);
        showToast(isActive ? "📢 Баннер включен!" : "Баннер скрыт");
        loadLiveSiteBanner();
    } catch(e) {
        showToast("Ошибка сохранения баннера");
    }
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
   ЭКСПОРТ БАЗЫ (CSV С ГАРАНТИРОВАННЫМ СКАЧИВАНИЕМ)
==================================================== */
async function adminExportDatabase() {
    haptic('medium');
    showToast("⏳ Формирование базы...");
    try {
        const users = await db(`users?select=*`);
        if (!users || users.length === 0) return showToast("База пуста");

        let csv = "TG_ID,Username,First_Name,Last_Name,Sub_End,Is_Banned,Reg_Date,Ref_By\n";
        users.forEach(u => {
            csv += `"${u.tg_id}","${u.username || ''}","${(u.first_name || '').replace(/"/g, '""')}","${(u.last_name || '').replace(/"/g, '""')}","${u.sub_end || ''}","${u.is_banned ? 'YES' : 'NO'}","${u.reg_date || ''}","${u.ref_by || ''}"\n`;
        });

        const fileName = `P2P_Users_${new Date().toISOString().slice(0,10)}.csv`;
        const blob = new Blob(["\uFEFF" + csv], { type: 'application/octet-stream;charset=utf-8;' });
        const fileUrl = URL.createObjectURL(blob);
        fallbackDownload(fileUrl, fileName, csv);
    } catch (e) {
        showToast("❌ Ошибка выгрузки базы");
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
   ЕДИНИЧНАЯ СДЕЛКА
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
    const t = I18N[currentLang] || I18N.ru;
    document.getElementById('txt-toggle-details').innerText = isSecondaryExpanded ? t.hideSecondary : t.showSecondary;
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
    safeStorageSet('p2p_layout_mode', mode);
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
    safeStorageSet('p2p_ui_mode', mode);
    const toggleEl = document.getElementById('toggle-ui-mode');
    const descEl = document.getElementById('ui-mode-desc');

    if (mode === 'fx') {
        document.body.className = 'mode-fx';
        if (toggleEl) toggleEl.checked = true;
        if (descEl) descEl.innerText = "Полный FX (фон и 3D)";
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

function applyLanguage(lang) {
    currentLang = lang;
    safeStorageSet('p2p_terminal_lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (I18N[lang] && I18N[lang][key]) {
            el.innerHTML = I18N[lang][key];
        }
    });
    const selLang = document.getElementById('set-lang');
    if (selLang) selLang.value = lang;
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
        if (isAdmin) {
            loadAdminConfigValues();
            loadAdminAllUsers();
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
            setBotConfig('PRICE_MONTH', document.getElementById('cfg-inp-month').value),
            setBotConfig('PRICE_FOREVER', document.getElementById('cfg-inp-forever').value),
            setBotConfig('BYBIT_UID', document.getElementById('cfg-inp-uid').value),
            setBotConfig('TRIAL_DAYS', document.getElementById('cfg-inp-trial').value),
            setBotConfig('REF_BONUS_DAYS', document.getElementById('cfg-inp-ref').value),
            setBotConfig('ADMIN_IDS', document.getElementById('cfg-inp-admin-ids').value)
        ]);
        showToast("✅ Конфиг сохранен!");
    } catch(e) {
        showToast("Ошибка сохранения");
    }
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

/* ====================================================
   ГЛАВНАЯ ТОЧКА ВХОДА (С ЗАЩИТОЙ ОТ ЗАВИСАНИЯ НА ТЕЛЕФОНЕ)
==================================================== */
async function init() {
    syncTelegramSafeAreas();
    applyLanguage(currentLang);
    applyUiMode(uiMode);
    applyLayoutMode(layoutMode);
    applyIncognito();

    // Защитный таймер: максимум 2.5 секунды, терминал откроется в любом случае
    const failsafe = setTimeout(forceHideLoader, 2500);
    const tgUser = tg?.initDataUnsafe?.user;

    if (!tgUser || !tgUser.id) {
        clearTimeout(failsafe);
        document.getElementById('terminal-boot-loader').style.display = 'none';
        document.getElementById('restricted-screen').style.display = 'flex';
        return;
    }

    try {
        const bootPromise = playTerminalBootSequence();

        const dataPromise = (async () => {
            let users = await db(`users?tg_id=eq.${tgUser.id}`);
            if (!users || users.length === 0) {
                const created = await db(`users`, {
                    method: 'POST',
                    body: JSON.stringify({
                        tg_id: tgUser.id,
                        username: tgUser.username,
                        first_name: tgUser.first_name,
                        last_name: tgUser.last_name,
                        currency: safeStorageGet('p2p_currency', 'RUB'),
                        tz_offset: parseInt(safeStorageGet('p2p_tz', '3'))
                    })
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
            document.getElementById('set-currency').value = currentUser.currency || safeStorageGet('p2p_currency', 'RUB');
            document.getElementById('set-tz').value = currentUser.tz_offset || parseInt(safeStorageGet('p2p_tz', '3'));
        })();

        await Promise.all([
            bootPromise,
            Promise.race([dataPromise, new Promise(r => setTimeout(r, 2200))])
        ]);

    } catch(e) {
        console.error("Init error:", e);
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
