/* ====================================================
   P2P TERMINAL PRO — CORE ENGINE v8.3.0
   Enterprise Ledger, Smart Cards & Calendar Engine
==================================================== */

const API_URL = "https://slddpusuckhhvvetpgxa.supabase.co/rest/v1";[span_0](start_span)[span_0](end_span)
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZGRwdXN1Y2toaHZ2ZXRwZ3hhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODYwNzMyMiwiZXhwIjoyMTA0MTgzMzIyfQ.obfZa6h7dKqVvzdHUAXRQ6TAZ8dSsmBZqmUCtBVO0QM";[span_1](start_span)[span_1](end_span)

const SUPER_ADMIN_ID = 5172556128;[span_2](start_span)[span_2](end_span)
let adminIds = [SUPER_ADMIN_ID];[span_3](start_span)[span_3](end_span)

/* ====================================================
   МУЛЬТИЯЗЫЧНЫЙ СЛОВАРЬ (7 ЯЗЫКОВ)
==================================================== */
const I18N = {
    ru: {
        accessDenied: "Доступ ограничен",
        accessDeniedDesc: "Терминал защищен и запускается исключительно через Telegram Mini App.",
        openBotBtn: "🚀 Открыть бота",
        tabToday: "За сегодня", tabMonth: "За месяц", tabAll: "Все время", tabCustom: "Свой период 📅",
        presetYesterday: "Вчера", preset7d: "7 дней", preset14d: "14 дней", preset30d: "30 дней",
        dateFrom: "С даты", dateTo: "По дату", btnApplyDate: "Применить ⚡️",
        totalProfitBadge: "💰 ОБЩАЯ ПРИБЫЛЬ", btnPnlCard: "📸 PnL-карточка",
        spreadBadge: "📊 СПРЕД СДЕЛОК", lastCycleTitle: "Последний круг", avgSpreadTitle: "Ср. за период",
        wacTimeframeHint: "По WAC за таймфрейм",
        showSecondary: "📊 Развернуть подробную статистику", hideSecondary: "📊 Скрыть подробную статистику",
        netIn: "Чистая в", formulaFiat: "Фиатный доход: Продажи − Покупки (строго разница поступившего и отданного фиата)",
        netInUsdt: "Чистая в USDT", formulaUsdt: "Крипто-остаток: Покупки − Продажи (чистые монеты на балансе биржи)",
        midPriceHint: "⚖️ Средняя цена (Mid Price):", turnCombinedTitle: "💸 Оборот (Фиат / USDT)",
        statWac: "🛒 WAC Закупка", statAvgSell: "🏷 Ср. Продажа", statRoi: "📈 ROI от оборота",
        statOps: "🔢 Сделок / Покупок / Продаж",
        calcTitle: "⚡️ КАЛЬКУЛЯТОР КРУГА", calcBindCard: "Привязать карту к кругу", calcDealPrice: "Прайс сделки",
        calcBuyHeader: "ПОКУПКА 🟢", calcBuyRate: "Курс USDT", calcSellHeader: "ПРОДАЖА 🔴", calcSellRate: "Курс USDT",
        calcSpread: "Спред:", calcProfit: "Прибыль с круга:", calcSaveCycle: "Сохранить круг ✅", calcClear: "Очистить ❌",
        calendarMonthTitle: "📅 Календарь общей прибыли", calDragHint: "Зажмите и ведите пальцем",
        tradeTitle: "Новая операция", tradeSubtitle: "Внести единичный ордер в базу",
        buyBtn: "ПОКУПКА 🟢", sellBtn: "ПРОДАЖА 🔴", fiatAmountTab: "Сумма фиата", cryptoAmountTab: "Объем USDT (🪙)",
        rateUsdtLabel: "Курс USDT", bankCardOptionalLabel: "Банковская карта (Опционально)", saveTradeBtn: "СОХРАНИТЬ СДЕЛКУ",
        cardsTitle: "Мои карты", cardsSubtitle: "Две полоски расходов, лимиты и смены", btnTransfer: "🔄 Трансфер", btnCreateCard: "➕ Создать",
        historyTitle: "История операций", historySubtitle: "Синхронизированные сделки, круги и заметки",
        profileTitle: "Настройки", profileSubtitle: "Конфигурация интерфейса, валюты и промокоды", yourTgId: "ВАШ TELEGRAM ID",
        btnSubscription: "💎 Подписка", promocodeTitle: "🎁 Активация промокода", btnApply: "Применить",
        soundTitle: "Звук монет / кассы", soundDesc: "Аудио-эффект при сохранении",
        feedModeTitle: "Режим общей ленты", fxModeTitle: "Визуальные спецэффекты (FX)", langTitle: "Язык интерфейса (7 языков)",
        currTitle: "Базовая валюта", tzTitle: "Часовой пояс (UTC)", btnSupport: "👨‍💻 Служба поддержки",
        refTitle: "Партнерская сеть", refSubtitle: "Бонусные дни за приглашения",
        refWhyTitle: "В чем польза приглашать трейдеров:",
        refWhy1: "• +3 дня Premium начисляются автоматически за каждого активного приглашенного.",
        refWhy2: "• Ваши рефералы навсегда закрепляются за вашим Telegram ID.",
        refWhy3: "• Неограниченная аналитика, калькулятор и облачный синхрон касс.",
        refLinkBadge: "Ваша партнерская ссылка", btnCopy: "📋 Скопировать", btnShare: "🚀 Отправить",
        paywallTitle: "Доступ к Терминалу 🔒", paywallDesc: "Оформите доступ для разблокировки всех функций",
        trialBadge: "Бесплатный доступ", trialText: "🎁 Пробный период 24 часа активируется внутри нашего Telegram-бота.",
        btnActivateTrial: "🎁 Активировать триал", plansBadge: "Тарифные планы", plansText: "Оплата и сверка перевода Bybit производятся в боте.",
        plan1Month: "1 Месяц", planForever: "Навсегда", btnBuySub: "💳 Оформить подписку",
        navDashboard: "Сводка", navTrade: "Сделка", navCards: "Карты", navHistory: "История", navSettings: "Настройки", navAdmin: "Админ"
    },
    en: {
        accessDenied: "Access Restricted", accessDeniedDesc: "Terminal is protected and only opens inside Telegram Mini App.",
        openBotBtn: "🚀 Open Telegram Bot", tabToday: "Today", tabMonth: "This Month", tabAll: "All Time", tabCustom: "Custom 📅",
        presetYesterday: "Yesterday", preset7d: "7 days", preset14d: "14 days", preset30d: "30 days", dateFrom: "From date", dateTo: "To date", btnApplyDate: "Apply ⚡️",
        totalProfitBadge: "💰 TOTAL PROFIT", btnPnlCard: "📸 PnL Card", spreadBadge: "📊 SPREAD ANALYSIS", lastCycleTitle: "Last Cycle",
        avgSpreadTitle: "Period Avg", wacTimeframeHint: "By WAC in timeframe", showSecondary: "📊 Expand Detailed Stats", hideSecondary: "📊 Hide Detailed Stats",
        netIn: "Net in", formulaFiat: "Fiat Profit: Sell − Buy (exact fiat cash difference)", netInUsdt: "Net in USDT",
        formulaUsdt: "Crypto Balance: Buy − Sell (pure coins on exchange)", midPriceHint: "⚖️ Mid Price:", turnCombinedTitle: "💸 Turnover (Fiat / USDT)",
        statWac: "🛒 WAC Buy Price", statAvgSell: "🏷 Avg Sell Price", statRoi: "📈 Turnover ROI", statOps: "🔢 Total / Buys / Sells",
        calcTitle: "⚡️ CYCLE CALCULATOR", calcBindCard: "Bind card to cycle", calcDealPrice: "Deal Budget",
        calcBuyHeader: "BUY 🟢", calcBuyRate: "USDT Rate", calcSellHeader: "SELL 🔴", calcSellRate: "USDT Rate",
        calcSpread: "Spread:", calcProfit: "Cycle profit:", calcSaveCycle: "Save Cycle ✅", calcClear: "Clear ❌",
        calendarMonthTitle: "📅 Total Profit Calendar", calDragHint: "Press and slide finger", tradeTitle: "New Trade",
        tradeSubtitle: "Record single order into ledger", buyBtn: "BUY 🟢", sellBtn: "SELL 🔴", fiatAmountTab: "Fiat Amount",
        cryptoAmountTab: "USDT Volume (🪙)", rateUsdtLabel: "USDT Rate", bankCardOptionalLabel: "Bank Card (Optional)", saveTradeBtn: "SAVE TRADE",
        cardsTitle: "My Cards", cardsSubtitle: "Dual limit progress, shifts & rest", btnTransfer: "🔄 Transfer", btnCreateCard: "➕ Add Card",
        historyTitle: "Operations History", historySubtitle: "Synchronized trades, cycles & notes", profileTitle: "Settings",
        profileSubtitle: "Interface config, currency and promos", yourTgId: "YOUR TELEGRAM ID", btnSubscription: "💎 Subscription",
        promocodeTitle: "🎁 Redeem Promocode", btnApply: "Apply", soundTitle: "Cash register sound", soundDesc: "Audio feedback on save",
        feedModeTitle: "Feed Layout Mode", fxModeTitle: "Visual Effects (FX)", langTitle: "App Language (7 languages)", currTitle: "Base Currency",
        tzTitle: "Timezone (UTC)", btnSupport: "👨‍💻 Support Center", refTitle: "Affiliate Network", refSubtitle: "Bonus days for invitations",
        refWhyTitle: "Why invite traders:",
        refWhy1: "• +3 days Premium automatically added per active invitee.",
        refWhy2: "• Referrals permanently bound to your Telegram ID.",
        refWhy3: "• Full ledger analytics, cycle calculator & cloud sync.",
        refLinkBadge: "Your Invite Link", btnCopy: "📋 Copy", btnShare: "🚀 Share", paywallTitle: "Terminal Access 🔒",
        paywallDesc: "Subscribe to unlock all features", trialBadge: "Free Access", trialText: "🎁 24-hour trial activates in Telegram Bot.",
        btnActivateTrial: "🎁 Activate Trial", plansBadge: "Subscription Plans", plansText: "Payment and Bybit UID checks are in the bot.",
        plan1Month: "1 Month", planForever: "Lifetime", btnBuySub: "💳 Get Subscription",
        navDashboard: "Summary", navTrade: "Trade", navCards: "Cards", navHistory: "History", navSettings: "Settings", navAdmin: "Admin"
    },
    es: { accessDenied: "Acceso Restringido", accessDeniedDesc: "El terminal sólo se abre en Telegram Mini App.", openBotBtn: "🚀 Abrir Bot", tabToday: "Hoy", tabMonth: "Este Mes", tabAll: "Todo el tiempo", tabCustom: "Rango 📅", presetYesterday: "Ayer", preset7d: "7 días", preset14d: "14 días", preset30d: "30 días", dateFrom: "Desde", dateTo: "Hasta", btnApplyDate: "Aplicar ⚡️", totalProfitBadge: "💰 GANANCIA TOTAL", btnPnlCard: "📸 Tarjeta PnL", spreadBadge: "📊 SPREAD DE OPERACIONES", lastCycleTitle: "Último ciclo", avgSpreadTitle: "Prom. período", wacTimeframeHint: "Por WAC en período", showSecondary: "📊 Ver detalles", hideSecondary: "📊 Ocultar detalles", netIn: "Neto en", formulaFiat: "Beneficio Fiat: Venta − Compra", netInUsdt: "Neto en USDT", formulaUsdt: "Balance Crypto: Compra − Venta", midPriceHint: "⚖️ Mid Price:", turnCombinedTitle: "💸 Volumen (Fiat / USDT)", statWac: "🛒 WAC Compra", statAvgSell: "🏷 Venta Media", statRoi: "📈 ROI de volumen", statOps: "🔢 Total / Compras / Ventas", calcTitle: "⚡️ CALCULADORA DE CICLO", calcBindCard: "Vincular tarjeta", calcDealPrice: "Monto", calcBuyHeader: "COMPRA 🟢", calcBuyRate: "Tasa USDT", calcSellHeader: "VENTA 🔴", calcSellRate: "Tasa USDT", calcSpread: "Spread:", calcProfit: "Ganancia ciclo:", calcSaveCycle: "Guardar ✅", calcClear: "Limpiar ❌", calendarMonthTitle: "📅 Calendario de Ganancia Total", calDragHint: "Mantenga y deslice", tradeTitle: "Nueva Operación", tradeSubtitle: "Registrar orden simple", buyBtn: "COMPRA 🟢", sellBtn: "VENTA 🔴", fiatAmountTab: "Monto Fiat", cryptoAmountTab: "Volumen USDT", rateUsdtLabel: "Tasa USDT", bankCardOptionalLabel: "Tarjeta (Opcional)", saveTradeBtn: "GUARDAR OPERACIÓN", cardsTitle: "Mis Tarjetas", cardsSubtitle: "Doble límite y descanso", btnTransfer: "🔄 Transferencia", btnCreateCard: "➕ Crear", historyTitle: "Historial", historySubtitle: "Operaciones y notas", profileTitle: "Ajustes", profileSubtitle: "Configuración y promos", yourTgId: "SU TELEGRAM ID", btnSubscription: "💎 Suscripción", promocodeTitle: "🎁 Código Promo", btnApply: "Aplicar", soundTitle: "Sonido de caja", soundDesc: "Efecto al guardar", feedModeTitle: "Modo Feed continuo", fxModeTitle: "Efectos (FX)", langTitle: "Idioma (7 idiomas)", currTitle: "Moneda base", tzTitle: "Zona horaria (UTC)", btnSupport: "👨‍💻 Soporte", refTitle: "Red de Afiliados", refSubtitle: "Días extra", refWhyTitle: "Beneficios de invitar:", refWhy1: "• +3 días Premium por invitado.", refWhy2: "• Referidos vinculados de por vida.", refWhy3: "• Análisis completo y sincronización.", refLinkBadge: "Tu Enlace", btnCopy: "📋 Copiar", btnShare: "🚀 Enviar", paywallTitle: "Acceso Restringido 🔒", paywallDesc: "Suscríbase para desbloquear", trialBadge: "Prueba Gratis", trialText: "🎁 Prueba de 24h en el bot.", btnActivateTrial: "🎁 Activar Prueba", plansBadge: "Planes", plansText: "Pagos vía Bybit en el bot.", plan1Month: "1 Mes", planForever: "De por vida", btnBuySub: "💳 Suscribirse", navDashboard: "Resumen", navTrade: "Operar", navCards: "Tarjetas", navHistory: "Historial", navSettings: "Ajustes", navAdmin: "Admin" },
    fr: { accessDenied: "Accès Restreint", accessDeniedDesc: "Fonctionne via Telegram Mini App.", openBotBtn: "🚀 Ouvrir le Bot", tabToday: "Aujourd'hui", tabMonth: "Ce Mois", tabAll: "Tout le temps", tabCustom: "Période 📅", presetYesterday: "Hier", preset7d: "7 jours", preset14d: "14 jours", preset30d: "30 jours", dateFrom: "Du", dateTo: "Au", btnApplyDate: "Appliquer ⚡️", totalProfitBadge: "💰 PROFIT TOTAL", btnPnlCard: "📸 Carte PnL", spreadBadge: "📊 SPREAD", lastCycleTitle: "Dernier cycle", avgSpreadTitle: "Moy. période", wacTimeframeHint: "WAC temporel", showSecondary: "📊 Voir détails", hideSecondary: "📊 Masquer", netIn: "Net en", formulaFiat: "Gain Fiat: Vente − Achat", netInUsdt: "Net en USDT", formulaUsdt: "Crypto restant: Achat − Vente", midPriceHint: "⚖️ Mid Price:", turnCombinedTitle: "💸 Volume (Fiat / USDT)", statWac: "🛒 WAC Achat", statAvgSell: "🏷 Vente Moyenne", statRoi: "📈 ROI volume", statOps: "🔢 Total / Achats / Ventes", calcTitle: "⚡️ CALCULATEUR DE CYCLE", calcBindCard: "Lier carte", calcDealPrice: "Budget", calcBuyHeader: "ACHAT 🟢", calcBuyRate: "Taux USDT", calcSellHeader: "VENTE 🔴", calcSellRate: "Taux USDT", calcSpread: "Spread:", calcProfit: "Profit cycle:", calcSaveCycle: "Enregistrer ✅", calcClear: "Effacer ❌", calendarMonthTitle: "📅 Calendrier du Profit Total", calDragHint: "Glissez le doigt", tradeTitle: "Nouvel Ordre", tradeSubtitle: "Ordre simple", buyBtn: "ACHAT 🟢", sellBtn: "VENTE 🔴", fiatAmountTab: "Montant Fiat", cryptoAmountTab: "Volume USDT", rateUsdtLabel: "Taux USDT", bankCardOptionalLabel: "Carte (Optionnel)", saveTradeBtn: "ENREGISTRER", cardsTitle: "Mes Cartes", cardsSubtitle: "Double limite et shifts", btnTransfer: "🔄 Transfert", btnCreateCard: "➕ Créer", historyTitle: "Historique", historySubtitle: "Ordres et cycles", profileTitle: "Paramètres", profileSubtitle: "Configuration", yourTgId: "TELEGRAM ID", btnSubscription: "💎 Abonnement", promocodeTitle: "🎁 Code Promo", btnApply: "Appliquer", soundTitle: "Son caisse", soundDesc: "Effet validation", feedModeTitle: "Mode Défilement", fxModeTitle: "Effets (FX)", langTitle: "Langue (7 langues)", currTitle: "Devise", tzTitle: "Fuseau (UTC)", btnSupport: "👨‍💻 Assistance", refTitle: "Parrainage", refSubtitle: "Jours bonus", refWhyTitle: "Pourquoi parrainer :", refWhy1: "• +3 jours Premium par filleul actif.", refWhy2: "• Liés à vie à votre ID.", refWhy3: "• Analyse et synchronisation cloud.", refLinkBadge: "Votre Lien", btnCopy: "📋 Copier", btnShare: "🚀 Partager", paywallTitle: "Accès Restreint 🔒", paywallDesc: "Abonnez-vous", trialBadge: "Essai Gratuit", trialText: "🎁 Essai de 24h dans le bot.", btnActivateTrial: "🎁 Activer", plansBadge: "Tarifs", plansText: "Paiement Bybit dans le bot.", plan1Month: "1 Mois", planForever: "À vie", btnBuySub: "💳 S'abonner", navDashboard: "Stats", navTrade: "Ordre", navCards: "Cartes", navHistory: "Historique", navSettings: "Réglages", navAdmin: "Admin" },
    de: { accessDenied: "Zugriff Verweigert", accessDeniedDesc: "Nur über Telegram Mini App.", openBotBtn: "🚀 Bot Öffnen", tabToday: "Heute", tabMonth: "Dieser Monat", tabAll: "Gesamt", tabCustom: "Zeitraum 📅", presetYesterday: "Gestern", preset7d: "7 Tage", preset14d: "14 Tage", preset30d: "30 Tage", dateFrom: "Von", dateTo: "Bis", btnApplyDate: "Anwenden ⚡️", totalProfitBadge: "💰 GESAMTGEWINN", btnPnlCard: "📸 PnL-Karte", spreadBadge: "📊 SPREAD", lastCycleTitle: "Letzter Zyklus", avgSpreadTitle: "Ø Zeitraum", wacTimeframeHint: "Nach WAC-Zeitraum", showSecondary: "📊 Detaillierte Statistiken", hideSecondary: "📊 Ausblenden", netIn: "Netto in", formulaFiat: "Fiat Gewinn: Verkauf − Einkauf", netInUsdt: "Netto in USDT", formulaUsdt: "Crypto Saldo: Einkauf − Verkauf", midPriceHint: "⚖️ Mid Price:", turnCombinedTitle: "💸 Umsatz (Fiat / USDT)", statWac: "🛒 WAC Einkauf", statAvgSell: "🏷 Ø Verkauf", statRoi: "📈 Umsatz-ROI", statOps: "🔢 Gesamt / Kauf / Verkauf", calcTitle: "⚡️ ZYKLUS-RECHNER", calcBindCard: "Karte verknüpfen", calcDealPrice: "Einsatz", calcBuyHeader: "KAUF 🟢", calcBuyRate: "USDT Kurs", calcSellHeader: "VERKAUF 🔴", calcSellRate: "USDT Kurs", calcSpread: "Spread:", calcProfit: "Zyklusgewinn:", calcSaveCycle: "Speichern ✅", calcClear: "Löschen ❌", calendarMonthTitle: "📅 Gesamtgewinn-Kalender", calDragHint: "Mit Finger gleiten", tradeTitle: "Neue Transaktion", tradeSubtitle: "Einzelauftrag ablegen", buyBtn: "KAUF 🟢", sellBtn: "VERKAUF 🔴", fiatAmountTab: "Fiat-Betrag", cryptoAmountTab: "USDT-Volumen", rateUsdtLabel: "USDT Kurs", bankCardOptionalLabel: "Bankkarte (Optional)", saveTradeBtn: "SPEICHERN", cardsTitle: "Meine Karten", cardsSubtitle: "Doppelte Limits und Kasse", btnTransfer: "🔄 Transfer", btnCreateCard: "➕ Erstellen", historyTitle: "Verlauf", historySubtitle: "Trades und Notizen", profileTitle: "Einstellungen", profileSubtitle: "Interface und Promo", yourTgId: "TELEGRAM ID", btnSubscription: "💎 Abonnement", promocodeTitle: "🎁 Promo-Code", btnApply: "Anwenden", soundTitle: "Kassensound", soundDesc: "Ton beim Speichern", feedModeTitle: "Feed-Modus", fxModeTitle: "Effekte (FX)", langTitle: "Sprache (7 Sprachen)", currTitle: "Währung", tzTitle: "Zeitzone (UTC)", btnSupport: "👨‍💻 Support", refTitle: "Partnerprogramm", refSubtitle: "Bonus-Tage", refWhyTitle: "Vorteile beim Empfehlen:", refWhy1: "• +3 Tage Premium pro Trader.", refWhy2: "• Dauerhaft mit ID verknüpft.", refWhy3: "• Cloud-Sync und Tools.", refLinkBadge: "Ihr Link", btnCopy: "📋 Kopieren", btnShare: "🚀 Senden", paywallTitle: "Zugriff gesperrt 🔒", paywallDesc: "Abonnieren", trialBadge: "Kostenloser Test", trialText: "🎁 24h Testphase im Bot.", btnActivateTrial: "🎁 Starten", plansBadge: "Tarife", plansText: "Zahlung im Bot.", plan1Month: "1 Monat", planForever: "Lebenslang", btnBuySub: "💳 Abonnieren", navDashboard: "Übersicht", navTrade: "Trade", navCards: "Karten", navHistory: "Historie", navSettings: "Optionen", navAdmin: "Admin" },
    uk: { accessDenied: "Доступ обмежено", accessDeniedDesc: "Лише через Telegram Mini App.", openBotBtn: "🚀 Відкрити бота", tabToday: "За сьогодні", tabMonth: "За місяць", tabAll: "Весь час", tabCustom: "Свій період 📅", presetYesterday: "Вчора", preset7d: "7 днів", preset14d: "14 днів", preset30d: "30 днів", dateFrom: "З дати", dateTo: "По дату", btnApplyDate: "Застосувати ⚡️", totalProfitBadge: "💰 ЗАГАЛЬНИЙ ПРИБУТОК", btnPnlCard: "📸 PnL-картка", spreadBadge: "📊 СПРЕД УГОД", lastCycleTitle: "Останній круг", avgSpreadTitle: "Сер. за період", wacTimeframeHint: "За WAC за таймфрейм", showSecondary: "📊 Детальна статистика", hideSecondary: "📊 Приховати", netIn: "Чистий у", formulaFiat: "Фіатний дохід: Продаж − Купівля", netInUsdt: "Чистий в USDT", formulaUsdt: "Крипто-залишок: Купівля − Продаж", midPriceHint: "⚖️ Mid Price:", turnCombinedTitle: "💸 Оборот (Фіат / USDT)", statWac: "🛒 WAC Закупівля", statAvgSell: "🏷 Сер. Продаж", statRoi: "📈 ROI від обороту", statOps: "🔢 Угод / Купівель / Продажів", calcTitle: "⚡️ КАЛЬКУЛЯТОР КРУГА", calcBindCard: "Прив'язати картку", calcDealPrice: "Прайс", calcBuyHeader: "КУПІВЛЯ 🟢", calcBuyRate: "Курс USDT", calcSellHeader: "ПРОДАЖ 🔴", calcSellRate: "Курс USDT", calcSpread: "Спред:", calcProfit: "Прибуток:", calcSaveCycle: "Зберегти круг ✅", calcClear: "Очистити ❌", calendarMonthTitle: "📅 Календар загального прибутку", calDragHint: "Ведіть пальцем", tradeTitle: "Нова операція", tradeSubtitle: "Одиничний ордер", buyBtn: "КУПІВЛЯ 🟢", sellBtn: "ПРОДАЖ 🔴", fiatAmountTab: "Сума фіату", cryptoAmountTab: "Об'єм USDT", rateUsdtLabel: "Курс USDT", bankCardOptionalLabel: "Картка (Опціонально)", saveTradeBtn: "ЗБЕРЕГТИ УГОДУ", cardsTitle: "Мої картки", cardsSubtitle: "Дві смуги лімітів і каси", btnTransfer: "🔄 Трансфер", btnCreateCard: "➕ Створити", historyTitle: "Історія операцій", historySubtitle: "Синхронізовані угоди", profileTitle: "Налаштування", profileSubtitle: "Конфігурація", yourTgId: "TELEGRAM ID", btnSubscription: "💎 Підписка", promocodeTitle: "🎁 Промокод", btnApply: "Застосувати", soundTitle: "Звук каси", soundDesc: "Аудіо при збереженні", feedModeTitle: "Режим стрічки", fxModeTitle: "Спецефекти (FX)", langTitle: "Мова (7 мов)", currTitle: "Базова валюта", tzTitle: "Часовий пояс (UTC)", btnSupport: "👨‍💻 Підтримка", refTitle: "Партнерська мережа", refSubtitle: "Бонусні дні", refWhyTitle: "Користь запрошення:", refWhy1: "• +3 дні Premium за кожного запрошеного.", refWhy2: "• Закріплюються за вашим ID.", refWhy3: "• Повна аналітика та хмара.", refLinkBadge: "Ваше посилання", btnCopy: "📋 Скопіювати", btnShare: "🚀 Надіслати", paywallTitle: "Доступ обмежено 🔒", paywallDesc: "Оформіть доступ", trialBadge: "Безкоштовний доступ", trialText: "🎁 Тріал 24 години в боті.", btnActivateTrial: "🎁 Активувати", plansBadge: "Тарифи", plansText: "Оплата Bybit у боті.", plan1Month: "1 Місяць", planForever: "Назавжди", btnBuySub: "💳 Підписатися", navDashboard: "Зведення", navTrade: "Угода", navCards: "Картки", navHistory: "Історія", navSettings: "Налаштування", navAdmin: "Адмін" },
    kk: { accessDenied: "Қолжетімділік шектелген", accessDeniedDesc: "Тек Telegram Mini App арқылы.", openBotBtn: "🚀 Ботты ашу", tabToday: "Бүгін", tabMonth: "Осы айда", tabAll: "Барлық уақыт", tabCustom: "Кезең 📅", presetYesterday: "Кеше", preset7d: "7 күн", preset14d: "14 күн", preset30d: "30 күн", dateFrom: "Бастап", dateTo: "Дейін", btnApplyDate: "Қолдану ⚡️", totalProfitBadge: "💰 ЖАЛПЫ ПАЙДА", btnPnlCard: "📸 PnL-картасы", spreadBadge: "📊 СПРЕД", lastCycleTitle: "Соңғы айналым", avgSpreadTitle: "Кезең орташасы", wacTimeframeHint: "WAC бойынша", showSecondary: "📊 Толық статистика", hideSecondary: "📊 Жасыру", netIn: "Таза пайда", formulaFiat: "Фиат кірісі: Сату − Сатып алу", netInUsdt: "Таза USDT", formulaUsdt: "Крипто қалдығы: Сатып алу − Сату", midPriceHint: "⚖️ Mid Price:", turnCombinedTitle: "💸 Айналым (Фиат / USDT)", statWac: "🛒 WAC Сатып алу", statAvgSell: "🏷 Орташа сату", statRoi: "📈 Айналымнан ROI", statOps: "🔢 Барлығы / Сатып алу / Сату", calcTitle: "⚡️ АЙНАЛЫМ КАЛЬКУЛЯТОРЫ", calcBindCard: "Картаны байлау", calcDealPrice: "Прайс", calcBuyHeader: "САТЫП АЛУ 🟢", calcBuyRate: "USDT бағамы", calcSellHeader: "САТУ 🔴", calcSellRate: "USDT бағамы", calcSpread: "Спред:", calcProfit: "Пайда:", calcSaveCycle: "Сақтау ✅", calcClear: "Тазарту ❌", calendarMonthTitle: "📅 Жалпы пайда күнтізбесі", calDragHint: "Сырғытыңыз", tradeTitle: "Жаңа операция", tradeSubtitle: "Базаға ордер енгізу", buyBtn: "САТЫП АЛУ 🟢", sellBtn: "САТУ 🔴", fiatAmountTab: "Фиат сомасы", cryptoAmountTab: "USDT көлемі", rateUsdtLabel: "USDT бағамы", bankCardOptionalLabel: "Карта (Міндетті емес)", saveTradeBtn: "САҚТАУ", cardsTitle: "Менің карталарым", cardsSubtitle: "Қос лимит және ауысым", btnTransfer: "🔄 Трансфер", btnCreateCard: "➕ Қосу", historyTitle: "Тарих", historySubtitle: "Мәмілелер", profileTitle: "Баптаулар", profileSubtitle: "Реттеу", yourTgId: "TELEGRAM ID", btnSubscription: "💎 Жазылым", promocodeTitle: "🎁 Промокод", btnApply: "Қолдану", soundTitle: "Касса дыбысы", soundDesc: "Аудио", feedModeTitle: "Жалпы лента", fxModeTitle: "Әсерлер (FX)", langTitle: "Тіл (7 тіл)", currTitle: "Валюта", tzTitle: "Уақыт (UTC)", btnSupport: "👨‍💻 Қолдау", refTitle: "Серіктестік", refSubtitle: "Бонустар", refWhyTitle: "Шақырудың пайдасы:", refWhy1: "• Әр адам үшін +3 күн Premium.", refWhy2: "• Сіздің ID-ге бекітіледі.", refWhy3: "• Аналитика және синхрон.", refLinkBadge: "Сілтемеңіз", btnCopy: "📋 Көшіру", btnShare: "🚀 Жіберу", paywallTitle: "Қолжетімділік шектелген 🔒", paywallDesc: "Жазылыңыз", trialBadge: "Тегін", trialText: "🎁 24 сағаттық сынақ мерзімі.", btnActivateTrial: "🎁 Қосу", plansBadge: "Тарифтер", plansText: "Төлем Bybit арқылы.", plan1Month: "1 Ай", planForever: "Мәңгілікке", btnBuySub: "💳 Жазылу", navDashboard: "Жиынтық", navTrade: "Мәміле", navCards: "Карталар", navHistory: "Тарих", navSettings: "Баптаулар", navAdmin: "Админ" }
};

/* ====================================================
   ПОДРОБНЫЕ ПОДСКАЗКИ СПРАВКИ (?)
==================================================== */
const HELP_DATA = {
    total_profit: {
        title: "💰 ОБЩАЯ ПРИБЫЛЬ И МАТЕМАТИКА",
        text: `<b>В арбитраже итоговый заработок состоит из двух составляющих:</b><br><br>
        <b>1. Фиатный профит (чистая в ₽):</b> Чистая разница между всеми полученными средствами от покупателей и отданными на покупку USDT.<br>
        <b>2. Крипто-профит (чистая в USDT):</b> Заработанные монеты, оставшиеся на балансе биржи сверх стартового объема.<br><br>
        <b>Формула полной прибыли:</b><br>
        <code>Общая прибыль = Чистая в фиате + (Чистая в USDT × Mid Price)</code>.<br><br>
        <i>Все дни в календаре рассчитываются строго по этой же формуле, поэтому сумма дней месяца идеально совпадает с общей прибылью!</i>`
    },
    net_fiat: {
        title: "💵 ЧИСТАЯ В ФИАТЕ (ПРОДАЖА − ПОКУПКА)",
        text: `<b>Чистый доход в фиатной валюте:</b><br>
        <code>Фиатный профит = Поступления на карты (Продажи) − Расходы с карт (Покупки) + Доход с закрытых кругов</code>.<br><br>
        Показывает строго реальное увеличение количества рублей на банковских картах без учета оставшейся крипты.`
    },
    net_usdt: {
        title: "🪙 ЧИСТАЯ В USDT (ПОКУПКА − ПРОДАЖА)",
        text: `<b>Чистый остаток криптовалюты:</b><br>
        <code>Крипто-профит = Купленный объем USDT − Проданный объем USDT</code>.<br><br>
        Если значение положительное — вы накопили крипто-активы на бирже. Для перевода в фиат этот объем умножается на средневзвешенный курс (Mid Price).`
    },
    mid_price: {
        title: "⚖️ СРЕДНЯЯ ЦЕНА (MID PRICE)",
        text: `Справедливая средняя цена одного доллара USDT за выбранный отрезок времени:<br>
        <code>Mid Price = (WAC Закупка + Средняя Продажа) / 2</code>.<br>
        Используется для точной оценки нереализованного крипто-остатка в национальную валюту.`
    },
    turnover: { title: "💸 ТОРГОВЫЙ ОБОРОТ", text: `Суммарный объем всех средств, прокрученных через ваши банковские счета и биржевой кошелек.` },
    wac: { title: "🛒 СРЕДНЕВЗВЕШЕННЫЙ ЗАКУП (WAC)", text: `Weighted Average Cost — реальная средняя себестоимость покупки 1 USDT с учетом объемов всех ордеров.` },
    avg_sell: { title: "🏷 СРЕДНЯЯ ЦЕНА ПРОДАЖИ", text: `Фактический средневзвешенный курс, по которому вы распродавали криптовалюту.` },
    roi: { title: "📈 ROI ОТ ОБОРОТА", text: `Рентабельность капитала: процент чистой прибыли от общего торгового оборота.` },
    calculator: { title: "⚡️ КАЛЬКУЛЯТОР КРУГА", text: `Фиксация полного торгового цикла (закупка + продажа) одной записью в базу с авто-расчетом спреда и баланса карты.` },
    calc_card: { title: "💳 ПРИВЯЗКА КАРТЫ К КРУГУ", text: `Объем покупки учитывается в дневном и месячном лимите карты, а профит зачисляется на остаток.` },
    calendar: {
        title: "📅 КАЛЕНДАРЬ ОБЩЕЙ ПРИБЫЛИ",
        text: `<b>Интерактивный контроль:</b><br>
        • <b>Листание:</b> кнопки ‹ и › позволяют листать месяцы вперед на 5 лет и назад.<br>
        • <b>Зажатие и скольжение:</b> зажмите пальцем и ведите по календарю — плавающее окошко показывает точную общую прибыль дня и само закрывается при отпускании!<br>
        • <b>Клик:</b> открывает подробную модалку дня.`
    },
    single_order: { title: "⚡️ ОДИНОЧНЫЙ ОРДЕР", text: `Запись частичной сделки (только покупка или только продажа).` },
    cards_overview: { title: "💳 КАРТЫ И ЛИМИТЫ", text: `Две полоски расходов (суточная и месячная), авто-выход из отлежки по таймеру и кастомный порядок перетягиванием.` },
    history_info: { title: "📜 ИСТОРИЯ ОПЕРАЦИЙ", text: `Пагинация по 25 сделок на страницу (до 4 страниц). Повтор в калькулятор (🔁), редактирование и метки.` },
    settings_info: { title: "⚙️ НАСТРОЙКИ СИСТЕМЫ", text: `Конфигурация звуков кассы, валюты, часового пояса и шаблонов чата.` },
    promocode: { title: "🎁 ПРОМОКОДЫ", text: `Активация бонусных дней подписки.` },
    layout_mode: { title: "📜 РЕЖИМ ЛЕНТЫ", text: `Переключение между постраничными вкладками и единой сплошной лентой.` },
    ui_mode: { title: "⚡️ ВИЗУАЛЬНЫЕ ЭФФЕКТЫ (FX)", text: `Минимализм (OLED черный, без спецэффектов) или полный 3D FX.` },
    language: { title: "🌍 МУЛЬТИЯЗЫЧНОСТЬ", text: `7 языков интерфейса.` },
    currency: { title: "💱 БАЗОВАЯ ВАЛЮТА", text: `Смена отображения валюты терминала.` },
    referral: { title: "🤝 ПАРТНЕРСКАЯ ПРОГРАММА", text: `+3 дня Premium за каждого приглашенного трейдера.` }
};

/* ====================================================
   ИНТЕГРАЦИЯ TELEGRAM MINI APP
==================================================== */
const tg = window.Telegram?.WebApp;[span_4](start_span)[span_4](end_span)
if (tg) {
    try {
        tg.expand();[span_5](start_span)[span_5](end_span)
        tg.ready();[span_6](start_span)[span_6](end_span)
    } catch(e) {}
}

/* ====================================================
   СОСТОЯНИЕ ПРИЛОЖЕНИЯ
==================================================== */
let currentUser = null;[span_7](start_span)[span_7](end_span)
let userCards = [];[span_8](start_span)[span_8](end_span)
let userTrades = [];[span_9](start_span)[span_9](end_span)
let cardOps = [];[span_10](start_span)[span_10](end_span)

let currentPeriod = 'today';[span_11](start_span)[span_11](end_span)
let customStartDate = null;[span_12](start_span)[span_12](end_span)
let customEndDate = null;[span_13](start_span)[span_13](end_span)

let activeCardId = null;[span_14](start_span)[span_14](end_span)
let activeOpType = 'deposit';[span_15](start_span)[span_15](end_span)
let activeEditTradeId = null;[span_16](start_span)[span_16](end_span)
let activeSheetCard = null;[span_17](start_span)[span_17](end_span)
let activeSelectedDealColor = 'default';[span_18](start_span)[span_18](end_span)
let activeSelectedCardColor = '#f3a600';[span_19](start_span)[span_19](end_span)

let isSecondaryExpanded = false;[span_20](start_span)[span_20](end_span)
let isHeatmapOpen = false;[span_21](start_span)[span_21](end_span)

// КАЛЕНДАРЬ: ТЕКУЩИЙ ПРОСМАТРИВАЕМЫЙ МЕСЯЦ
let calViewDate = new Date();

// ПАГИНАЦИЯ (МАКСИМУМ 25 ШТУК, ДО 4 СТРАНИЦ)
const ITEMS_PER_PAGE = 25;
const MAX_PAGES = 4;
let cardsCurrentPage = 1;
let historyCurrentPage = 1;

// АДМИН БАЗА
let rawAdminUsersList = [];
let adminDbFilterOnlySub = true;

// ШАБЛОН ЧАТА ОРДЕРА
const DEFAULT_CARD_TEMPLATE = "{bank}: {number} ({holder})\nОплата строго со своего счета! Третьих лиц не принимаю, чек обязателен.";
let globalMessageTemplate = localStorage.getItem('p2p_card_msg_template') || DEFAULT_CARD_TEMPLATE;

// НАСТРОЙКИ
let currentLang = localStorage.getItem('p2p_terminal_lang') || 'ru';[span_22](start_span)[span_22](end_span)
let uiMode = localStorage.getItem('p2p_ui_mode') || 'simple';[span_23](start_span)[span_23](end_span)
let layoutMode = localStorage.getItem('p2p_layout_mode') || 'pages';[span_24](start_span)[span_24](end_span)
let isIncognito = localStorage.getItem('p2p_incognito') === 'true';[span_25](start_span)[span_25](end_span)
let soundEnabled = localStorage.getItem('p2p_sound_enabled') !== 'false';[span_26](start_span)[span_26](end_span)

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
    const res = await fetch(`${API_URL}/${endpoint}`, { ...options, headers });[span_27](start_span)[span_27](end_span)
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);[span_28](start_span)[span_28](end_span)
    const txt = await res.text();[span_29](start_span)[span_29](end_span)
    return txt ? JSON.parse(txt) : null;[span_30](start_span)[span_30](end_span)
}

/* ====================================================
   ПРОВЕРКА ПОДПИСКИ ПЕРЕД ЛЮБЫМ ДЕЙСТВИЕМ
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
    if (typeof actionCallback === 'function') actionCallback();
    return true;
}

/* ====================================================
   ТАКТИЛЬНЫЙ ЗВУК КАССЫ И МОНЕТ
==================================================== */
function playCashSound() {
    if (!soundEnabled) return;[span_31](start_span)[span_31](end_span)
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;[span_32](start_span)[span_32](end_span)
        if (!AudioContextClass) return;[span_33](start_span)[span_33](end_span)
        const audioCtx = new AudioContextClass();[span_34](start_span)[span_34](end_span)
        const now = audioCtx.currentTime;[span_35](start_span)[span_35](end_span)

        const osc1 = audioCtx.createOscillator();[span_36](start_span)[span_36](end_span)
        const gain1 = audioCtx.createGain();[span_37](start_span)[span_37](end_span)
        osc1.type = 'sine';[span_38](start_span)[span_38](end_span)
        osc1.frequency.setValueAtTime(987.77, now);[span_39](start_span)[span_39](end_span)
        osc1.frequency.exponentialRampToValueAtTime(1318.51, now + 0.08);[span_40](start_span)[span_40](end_span)
        gain1.gain.setValueAtTime(0.22, now);[span_41](start_span)[span_41](end_span)
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);[span_42](start_span)[span_42](end_span)
        osc1.connect(gain1);[span_43](start_span)[span_43](end_span)
        gain1.connect(audioCtx.destination);[span_44](start_span)[span_44](end_span)
        osc1.start(now);[span_45](start_span)[span_45](end_span)
        osc1.stop(now + 0.35);[span_46](start_span)[span_46](end_span)

        const osc2 = audioCtx.createOscillator();[span_47](start_span)[span_47](end_span)
        const gain2 = audioCtx.createGain();[span_48](start_span)[span_48](end_span)
        osc2.type = 'triangle';[span_49](start_span)[span_49](end_span)
        osc2.frequency.setValueAtTime(1567.98, now + 0.06);[span_50](start_span)[span_50](end_span)
        gain2.gain.setValueAtTime(0.2, now + 0.06);[span_51](start_span)[span_51](end_span)
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.42);[span_52](start_span)[span_52](end_span)
        osc2.connect(gain2);[span_53](start_span)[span_53](end_span)
        gain2.connect(audioCtx.destination);[span_54](start_span)[span_54](end_span)
        osc2.start(now + 0.06);[span_55](start_span)[span_55](end_span)
        osc2.stop(now + 0.42);[span_56](start_span)[span_56](end_span)
    } catch(e) {}
}

function switchSoundMode(isChecked) {
    haptic('light');[span_57](start_span)[span_57](end_span)
    soundEnabled = isChecked;[span_58](start_span)[span_58](end_span)
    localStorage.setItem('p2p_sound_enabled', isChecked);[span_59](start_span)[span_59](end_span)
    showToast(isChecked ? "🔔 Звук кассы включен" : "🔕 Звук выключен");[span_60](start_span)[span_60](end_span)
}

/* ====================================================
   РЕЖИМ ИНКОГНИТО
==================================================== */
function applyIncognito() {
    const btn = document.getElementById('btn-incognito');[span_61](start_span)[span_61](end_span)
    if (isIncognito) {
        document.body.classList.add('privacy-active');[span_62](start_span)[span_62](end_span)[span_63](start_span)[span_63](end_span)
        if (btn) btn.innerText = '🕶';[span_64](start_span)[span_64](end_span)
    } else {
        document.body.classList.remove('privacy-active');[span_65](start_span)[span_65](end_span)[span_66](start_span)[span_66](end_span)
        if (btn) btn.innerText = '👁';[span_67](start_span)[span_67](end_span)
    }
}

function toggleIncognitoMode() {
    haptic('light');[span_68](start_span)[span_68](end_span)
    isIncognito = !isIncognito;[span_69](start_span)[span_69](end_span)
    localStorage.setItem('p2p_incognito', isIncognito);[span_70](start_span)[span_70](end_span)
    applyIncognito();[span_71](start_span)[span_71](end_span)
    showToast(isIncognito ? "🕶 Инкогнито: балансы скрыты" : "👁 Балансы открыты");[span_72](start_span)[span_72](end_span)
}

/* ====================================================
   ВАЛЮТЫ И СИМВОЛЫ
==================================================== */
function getCurrencySymbol() {
    const map = { "RUB": "₽", "KZT": "₸", "UAH": "₴", "BYN": "Br", "USD": "$" };[span_73](start_span)[span_73](end_span)
    return map[currentUser?.currency || 'RUB'] || "₽";[span_74](start_span)[span_74](end_span)
}

function updateAllCurrencySymbols() {
    const sym = getCurrencySymbol();[span_75](start_span)[span_75](end_span)
    document.querySelectorAll('.sym').forEach(el => el.innerText = sym);[span_76](start_span)[span_76](end_span)
}

async function changeCurrency(val) {
    haptic('medium');[span_77](start_span)[span_77](end_span)
    if (!currentUser) return;[span_78](start_span)[span_78](end_span)
    currentUser.currency = val;[span_79](start_span)[span_79](end_span)
    localStorage.setItem('p2p_currency', val);[span_80](start_span)[span_80](end_span)
    updateAllCurrencySymbols();[span_81](start_span)[span_81](end_span)
    try {
        await db(`users?tg_id=eq.${currentUser.tg_id}`, {[span_82](start_span)[span_82](end_span)
            method: 'PATCH',[span_83](start_span)[span_83](end_span)
            body: JSON.stringify({ currency: val })[span_84](start_span)[span_84](end_span)
        });
    } catch(e) {}
    renderAll();[span_85](start_span)[span_85](end_span)
    showToast(`Валюта: ${val}`);
}

async function updateTimezone(tzVal) {
    haptic('light');[span_86](start_span)[span_86](end_span)
    if (!currentUser) return;[span_87](start_span)[span_87](end_span)
    currentUser.tz_offset = parseInt(tzVal);[span_88](start_span)[span_88](end_span)
    try {
        await db(`users?tg_id=eq.${currentUser.tg_id}`, {[span_89](start_span)[span_89](end_span)
            method: 'PATCH',[span_90](start_span)[span_90](end_span)
            body: JSON.stringify({ tz_offset: currentUser.tz_offset })[span_91](start_span)[span_91](end_span)
        });
    } catch(e) {}
    renderAll();[span_92](start_span)[span_92](end_span)
    showToast(`Часовой пояс: UTC+${tzVal}`);[span_93](start_span)[span_93](end_span)
}

/* ====================================================
   МУЛЬТИЯЗЫЧНОСТЬ
==================================================== */
function applyLanguage(lang) {
    currentLang = lang;[span_94](start_span)[span_94](end_span)
    localStorage.setItem('p2p_terminal_lang', lang);[span_95](start_span)[span_95](end_span)
    const dict = I18N[lang] || I18N.ru;[span_96](start_span)[span_96](end_span)

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.innerText = dict[key];
    });

    const tBtn = document.getElementById('txt-toggle-details');[span_97](start_span)[span_97](end_span)
    if (tBtn) {
        tBtn.innerText = isSecondaryExpanded ? dict.hideSecondary : dict.showSecondary;[span_98](start_span)[span_98](end_span)
    }

    updateAllCurrencySymbols();[span_99](start_span)[span_99](end_span)
}

function changeLanguage(lang) {
    haptic('light');[span_100](start_span)[span_100](end_span)
    applyLanguage(lang);[span_101](start_span)[span_101](end_span)
    showToast("Язык интерфейса обновлен");[span_102](start_span)[span_102](end_span)
    renderAll();[span_103](start_span)[span_103](end_span)
}

/* ====================================================
   ЖИВОЙ БАННЕР (УЗКАЯ ПЛАШКА)
==================================================== */
async function loadLiveSiteBanner() {
    const bannerEl = document.getElementById('site-live-banner');
    const textEl = document.getElementById('site-live-banner-text');
    if (!bannerEl || !textEl) return;

    try {
        const [txtRes, actRes] = await Promise.all([
            db(`bot_config?key=eq.SITE_BANNER_TEXT`),[span_104](start_span)[span_104](end_span)
            db(`bot_config?key=eq.SITE_BANNER_ACTIVE`)[span_105](start_span)[span_105](end_span)
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
    } catch(e) {
        bannerEl.className = 'banner-empty';
    }
}

async function adminUpdateBanner(isActive) {
    haptic('medium');[span_106](start_span)[span_106](end_span)
    const text = document.getElementById('admin-banner-text').value.trim();[span_107](start_span)[span_107](end_span)
    try {
        await Promise.all([
            db(`bot_config?key=eq.SITE_BANNER_TEXT`, { method: 'PATCH', body: JSON.stringify({ value: text }) }),[span_108](start_span)[span_108](end_span)
            db(`bot_config?key=eq.SITE_BANNER_ACTIVE`, { method: 'PATCH', body: JSON.stringify({ value: String(isActive) }) })[span_109](start_span)[span_109](end_span)
        ]);
        showToast(isActive ? "📢 Баннер включен на сайте!" : "Баннер выключен");
        await loadLiveSiteBanner();
    } catch(e) {
        showToast("Ошибка обновления баннера");
    }
}

/* ====================================================
   КАЛЬКУЛЯТОР КРУГА (ЕДИНАЯ СДЕЛКА)
==================================================== */
function runCalculator() {
    const fiat = parseFloat(document.getElementById('calc-fiat-amt')?.value) || 0;[span_110](start_span)[span_110](end_span)
    const buyRate = parseFloat(document.getElementById('calc-buy-rate')?.value) || 0;[span_111](start_span)[span_111](end_span)
    const sellRate = parseFloat(document.getElementById('calc-sell-rate')?.value) || 0;[span_112](start_span)[span_112](end_span)

    const elBuyCrypto = document.getElementById('calc-buy-crypto');[span_113](start_span)[span_113](end_span)
    const elSellCrypto = document.getElementById('calc-sell-crypto');[span_114](start_span)[span_114](end_span)
    const elSpread = document.getElementById('calc-spread-val');[span_115](start_span)[span_115](end_span)
    const elProfitUsdt = document.getElementById('calc-profit-usdt-val');[span_116](start_span)[span_116](end_span)
    const elProfitFiat = document.getElementById('calc-profit-fiat-val');[span_117](start_span)[span_117](end_span)
    const sym = getCurrencySymbol();[span_118](start_span)[span_118](end_span)

    let boughtUsdt = 0;[span_119](start_span)[span_119](end_span)
    let soldUsdt = 0;[span_120](start_span)[span_120](end_span)

    if (fiat > 0 && buyRate > 0) {
        boughtUsdt = fiat / buyRate;[span_121](start_span)[span_121](end_span)
        if (elBuyCrypto) elBuyCrypto.innerText = `${boughtUsdt.toFixed(2)} USDT`;[span_122](start_span)[span_122](end_span)
    } else if (elBuyCrypto) {
        elBuyCrypto.innerText = `0.00 USDT`;[span_123](start_span)[span_123](end_span)
    }

    if (fiat > 0 && sellRate > 0) {
        soldUsdt = fiat / sellRate;[span_124](start_span)[span_124](end_span)
        if (elSellCrypto) elSellCrypto.innerText = `${soldUsdt.toFixed(2)} USDT`;[span_125](start_span)[span_125](end_span)
    } else if (elSellCrypto) {
        elSellCrypto.innerText = `0.00 USDT`;[span_126](start_span)[span_126](end_span)
    }

    if (fiat > 0 && buyRate > 0 && sellRate > 0) {
        const spreadPct = ((sellRate - buyRate) / buyRate) * 100;[span_127](start_span)[span_127](end_span)
        const profitUsdt = boughtUsdt - soldUsdt;[span_128](start_span)[span_128](end_span)
        const midRate = (buyRate + sellRate) / 2;[span_129](start_span)[span_129](end_span)
        const profitFiat = profitUsdt * midRate;[span_130](start_span)[span_130](end_span)

        if (elSpread) {
            elSpread.innerText = (spreadPct > 0 ? "+" : "") + spreadPct.toFixed(2) + "%";[span_131](start_span)[span_131](end_span)
            elSpread.style.color = spreadPct >= 0 ? 'var(--bybit-yellow)' : 'var(--bybit-red)';[span_132](start_span)[span_132](end_span)
        }
        if (elProfitUsdt) {
            elProfitUsdt.innerText = (profitUsdt > 0 ? "+" : "") + profitUsdt.toFixed(2) + " USDT";[span_133](start_span)[span_133](end_span)
            elProfitUsdt.style.color = profitUsdt >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)';[span_134](start_span)[span_134](end_span)
        }
        if (elProfitFiat) {
            elProfitFiat.innerText = `≈ ${(profitFiat > 0 ? "+" : "")}${profitFiat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${sym}`;[span_135](start_span)[span_135](end_span)
        }
    } else {
        if (elSpread) { elSpread.innerText = "0.00%"; elSpread.style.color = 'var(--text-main)'; }[span_136](start_span)[span_136](end_span)
        if (elProfitUsdt) { elProfitUsdt.innerText = "0.00 USDT"; elProfitUsdt.style.color = 'var(--text-main)'; }[span_137](start_span)[span_137](end_span)
        if (elProfitFiat) { elProfitFiat.innerText = `≈ 0.00 ${sym}`; }[span_138](start_span)[span_138](end_span)
    }
}

document.getElementById('calc-fiat-amt')?.addEventListener('input', runCalculator);[span_139](start_span)[span_139](end_span)
document.getElementById('calc-buy-rate')?.addEventListener('input', runCalculator);[span_140](start_span)[span_140](end_span)
document.getElementById('calc-sell-rate')?.addEventListener('input', runCalculator);[span_141](start_span)[span_141](end_span)

async function saveCalculatedCycle() {
    if (!requireSubscription()) return;

    haptic('medium');[span_142](start_span)[span_142](end_span)
    const fiat = parseFloat(document.getElementById('calc-fiat-amt')?.value);[span_143](start_span)[span_143](end_span)
    const buyRate = parseFloat(document.getElementById('calc-buy-rate')?.value);[span_144](start_span)[span_144](end_span)
    const sellRate = parseFloat(document.getElementById('calc-sell-rate')?.value);[span_145](start_span)[span_145](end_span)
    const cardId = document.getElementById('calc-card-sel')?.value || null;[span_146](start_span)[span_146](end_span)

    if (!fiat || !buyRate || !sellRate || fiat <= 0 || buyRate <= 0 || sellRate <= 0) {
        showToast("⚠️ Заполните сумму и оба курса!");[span_147](start_span)[span_147](end_span)
        return;
    }

    const boughtUsdt = parseFloat((fiat / buyRate).toFixed(2));[span_148](start_span)[span_148](end_span)
    const soldUsdt = parseFloat((fiat / sellRate).toFixed(2));[span_149](start_span)[span_149](end_span)
    const spreadPct = parseFloat((((sellRate - buyRate) / buyRate) * 100).toFixed(2));[span_150](start_span)[span_150](end_span)
    const profitUsdt = parseFloat((boughtUsdt - soldUsdt).toFixed(2));[span_151](start_span)[span_151](end_span)
    const midRate = (buyRate + sellRate) / 2;[span_152](start_span)[span_152](end_span)
    const profitFiat = parseFloat((profitUsdt * midRate).toFixed(2));[span_153](start_span)[span_153](end_span)

    try {
        await db('trades', {[span_154](start_span)[span_154](end_span)
            method: 'POST',[span_155](start_span)[span_155](end_span)
            body: JSON.stringify({[span_156](start_span)[span_156](end_span)
                tg_id: currentUser.tg_id,[span_157](start_span)[span_157](end_span)
                type: 'buy',[span_158](start_span)[span_158](end_span)
                is_cycle: true,[span_159](start_span)[span_159](end_span)
                crypto_amount: boughtUsdt,[span_160](start_span)[span_160](end_span)
                rate: buyRate,[span_161](start_span)[span_161](end_span)
                buy_rate: buyRate,[span_162](start_span)[span_162](end_span)
                sell_rate: sellRate,[span_163](start_span)[span_163](end_span)
                fiat_amount: fiat,[span_164](start_span)[span_164](end_span)
                cycle_spread: spreadPct,[span_165](start_span)[span_165](end_span)
                cycle_profit_rub: profitFiat,[span_166](start_span)[span_166](end_span)
                cycle_profit_usdt: profitUsdt,[span_167](start_span)[span_167](end_span)
                card_id: cardId ? parseInt(cardId) : null,[span_168](start_span)[span_168](end_span)
                tag_color: 'green[span_169](start_span)'[span_169](end_span)
            })
        });

        playCashSound();[span_170](start_span)[span_170](end_span)
        haptic('success');[span_171](start_span)[span_171](end_span)
        showToast("✅ Круг сохранен!");
        await refreshData();[span_172](start_span)[span_172](end_span)
        renderAll();[span_173](start_span)[span_173](end_span)
    } catch(e) {
        showToast("❌ Ошибка сохранения круга");[span_174](start_span)[span_174](end_span)
    }
}

function clearCalculator() {
    haptic('light');[span_175](start_span)[span_175](end_span)
    const f = document.getElementById('calc-fiat-amt');[span_176](start_span)[span_176](end_span)
    const b = document.getElementById('calc-buy-rate');[span_177](start_span)[span_177](end_span)
    const s = document.getElementById('calc-sell-rate');[span_178](start_span)[span_178](end_span)
    if (f) f.value = '10000';[span_179](start_span)[span_179](end_span)
    if (b) b.value = '';[span_180](start_span)[span_180](end_span)
    if (s) s.value = '';[span_181](start_span)[span_181](end_span)
    runCalculator();[span_182](start_span)[span_182](end_span)
    showToast("Калькулятор очищен");[span_183](start_span)[span_183](end_span)
}

/* ====================================================
   МАТЕМАТИКА ПРИБЫЛИ
==================================================== */
function calculateStats() {
    const tz = parseInt(currentUser?.tz_offset) || 3;[span_184](start_span)[span_184](end_span)
    const now = new Date();[span_185](start_span)[span_185](end_span)
    now.setHours(now.getUTCHours() + tz);[span_186](start_span)[span_186](end_span)

    const filtered = userTrades.filter(t => {
        const d = new Date(t.date);[span_187](start_span)[span_187](end_span)
        d.setHours(d.getUTCHours() + tz);[span_188](start_span)[span_188](end_span)
        if (currentPeriod === 'today') return d.toDateString() === now.toDateString();[span_189](start_span)[span_189](end_span)
        if (currentPeriod === 'month') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();[span_190](start_span)[span_190](end_span)
        if (currentPeriod === 'custom' && customStartDate && customEndDate) {[span_191](start_span)[span_191](end_span)
            const tradeTime = new Date(t.date).getTime();[span_192](start_span)[span_192](end_span)
            return tradeTime >= customStartDate.getTime() && tradeTime <= customEndDate.getTime();[span_193](start_span)[span_193](end_span)
        }
        return true;[span_194](start_span)[span_194](end_span)
    });

    let bF = 0, bC = 0, sF = 0, sC = 0, sellsCount = 0, buysCount = 0;[span_195](start_span)[span_195](end_span)
    let cycleProfitFiatTotal = 0;[span_196](start_span)[span_196](end_span)

    filtered.forEach(t => {
        const f = parseFloat(t.fiat_amount || 0);[span_197](start_span)[span_197](end_span)
        const c = parseFloat(t.crypto_amount || 0);[span_198](start_span)[span_198](end_span)

        if (t.is_cycle) {
            bF += f; sF += f; bC += c;[span_199](start_span)[span_199](end_span)
            const soldC = t.sell_rate ? f / parseFloat(t.sell_rate) : c;[span_200](start_span)[span_200](end_span)
            sC += soldC;[span_201](start_span)[span_201](end_span)
            buysCount++; sellsCount++;[span_202](start_span)[span_202](end_span)
            cycleProfitFiatTotal += parseFloat(t.cycle_profit_rub || 0);[span_203](start_span)[span_203](end_span)
        } else if (t.type === 'buy') {
            bF += f; bC += c; buysCount++;[span_204](start_span)[span_204](end_span)
        } else {
            sF += f; sC += c; sellsCount++;[span_205](start_span)[span_205](end_span)
        }
    });

    const wac = bC > 0 ? bF / bC : 0;[span_206](start_span)[span_206](end_span)
    const avgSell = sC > 0 ? sF / sC : 0;[span_207](start_span)[span_207](end_span)
    const midPrice = (wac > 0 && avgSell > 0) ? (wac + avgSell) / 2 : (wac || avgSell || 0);[span_208](start_span)[span_208](end_span)

    const profitFiat = (sF - bF) + cycleProfitFiatTotal;[span_209](start_span)[span_209](end_span)
    const profitUsdt = bC - sC;[span_210](start_span)[span_210](end_span)

    const totalProfitFiat = profitFiat + (profitUsdt * midPrice);[span_211](start_span)[span_211](end_span)
    const totalProfitUsdt = profitUsdt + (midPrice > 0 ? profitFiat / midPrice : 0);[span_212](start_span)[span_212](end_span)

    const avgPeriodSpread = (wac > 0 && avgSell > 0) ? ((avgSell / wac) - 1) * 100 : 0;[span_213](start_span)[span_213](end_span)
    const fiatTurn = bF + sF;[span_214](start_span)[span_214](end_span)
    const cryptoTurn = bC + sC;[span_215](start_span)[span_215](end_span)
    const roi = fiatTurn > 0 ? (totalProfitFiat / fiatTurn) * 100 : 0;[span_216](start_span)[span_216](end_span)
    const sym = getCurrencySymbol();[span_217](start_span)[span_217](end_span)

    function updateMetricColor(el, val) {
        if (!el) return;[span_218](start_span)[span_218](end_span)
        el.style.color = val < 0 ? 'var(--bybit-red)' : (val > 0 ? 'var(--bybit-green)' : 'var(--text-main)');[span_219](start_span)[span_219](end_span)
    }

    const elTotalFiat = document.getElementById('val-total-profit-rub');[span_220](start_span)[span_220](end_span)
    updateMetricColor(elTotalFiat, totalProfitFiat);[span_221](start_span)[span_221](end_span)
    if (elTotalFiat) {
        const sign = totalProfitFiat > 0 ? '+' : '';[span_222](start_span)[span_222](end_span)
        elTotalFiat.innerHTML = `${sign}${totalProfitFiat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="font-size: 18px; color: var(--text-muted);">${sym}</span>`;[span_223](start_span)[span_223](end_span)
    }

    const elTotalUsdt = document.getElementById('val-total-profit-usdt');[span_224](start_span)[span_224](end_span)
    updateMetricColor(elTotalUsdt, totalProfitUsdt);[span_225](start_span)[span_225](end_span)
    if (elTotalUsdt) {
        const sign = totalProfitUsdt > 0 ? '+' : '';[span_226](start_span)[span_226](end_span)
        elTotalUsdt.innerText = `${sign}${totalProfitUsdt.toFixed(2)} USDT`;[span_227](start_span)[span_227](end_span)
    }

    const elProfitFiat = document.getElementById('val-profit-rub');[span_228](start_span)[span_228](end_span)
    updateMetricColor(elProfitFiat, profitFiat);[span_229](start_span)[span_229](end_span)
    if (elProfitFiat) {
        const sign = profitFiat > 0 ? '+' : '';[span_230](start_span)[span_230](end_span)
        elProfitFiat.innerText = `${sign}${profitFiat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${sym}`;[span_231](start_span)[span_231](end_span)
    }

    const elProfitUsdt = document.getElementById('val-profit-usdt');[span_232](start_span)[span_232](end_span)
    updateMetricColor(elProfitUsdt, profitUsdt);[span_233](start_span)[span_233](end_span)
    if (elProfitUsdt) {
        const sign = profitUsdt > 0 ? '+' : '';[span_234](start_span)[span_234](end_span)
        elProfitUsdt.innerText = `${sign}${profitUsdt.toFixed(2)} USDT`;[span_235](start_span)[span_235](end_span)
    }

    const elMidPrice = document.getElementById('hint-mid-price');[span_236](start_span)[span_236](end_span)
    if (elMidPrice) elMidPrice.innerText = midPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });[span_237](start_span)[span_237](end_span)

    const lastCycle = userTrades.find(t => t.is_cycle);[span_238](start_span)[span_238](end_span)
    let lastSpread = 0;[span_239](start_span)[span_239](end_span)
    const hintLast = document.getElementById('hint-last-spread');[span_240](start_span)[span_240](end_span)
    if (lastCycle) {
        lastSpread = parseFloat(lastCycle.cycle_spread || 0);[span_241](start_span)[span_241](end_span)
        if (hintLast) hintLast.innerText = `${lastCycle.buy_rate} → ${lastCycle.sell_rate} ${sym}`;[span_242](start_span)[span_242](end_span)
    } else {
        const lastSell = userTrades.find(t => t.type === 'sell');[span_243](start_span)[span_243](end_span)
        const lastBuy = userTrades.find(t => t.type === 'buy');[span_244](start_span)[span_244](end_span)
        if (lastSell && lastBuy && parseFloat(lastBuy.rate) > 0) {[span_245](start_span)[span_245](end_span)
            lastSpread = ((parseFloat(lastSell.rate) - parseFloat(lastBuy.rate)) / parseFloat(lastBuy.rate)) * 100;[span_246](start_span)[span_246](end_span)
            if (hintLast) hintLast.innerText = `${lastBuy.rate} → ${lastSell.rate} ${sym}`;[span_247](start_span)[span_247](end_span)
        }
    }

    const elLastSpread = document.getElementById('val-last-spread');[span_248](start_span)[span_248](end_span)
    if (elLastSpread) {
        elLastSpread.innerText = (lastSpread > 0 ? "+" : "") + lastSpread.toFixed(2) + "%";[span_249](start_span)[span_249](end_span)
        updateMetricColor(elLastSpread, lastSpread);[span_250](start_span)[span_250](end_span)
    }

    const elAvgSpread = document.getElementById('val-avg-spread');[span_251](start_span)[span_251](end_span)
    if (elAvgSpread) {
        elAvgSpread.innerText = (avgPeriodSpread > 0 ? "+" : "") + avgPeriodSpread.toFixed(2) + "%";[span_252](start_span)[span_252](end_span)
        updateMetricColor(elAvgSpread, avgPeriodSpread);[span_253](start_span)[span_253](end_span)
    }

    const roiEl = document.getElementById('val-roi');[span_254](start_span)[span_254](end_span)
    if (roiEl) {
        roiEl.innerText = (roi > 0 ? "+" : "") + roi.toFixed(2) + "%";[span_255](start_span)[span_255](end_span)
        updateMetricColor(roiEl, roi);[span_256](start_span)[span_256](end_span)
    }

    const elWac = document.getElementById('val-wac');[span_257](start_span)[span_257](end_span)
    if (elWac) elWac.innerText = wac.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });[span_258](start_span)[span_258](end_span)

    const elAvgSell = document.getElementById('val-avg-sell');[span_259](start_span)[span_259](end_span)
    if (elAvgSell) elAvgSell.innerText = avgSell.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });[span_260](start_span)[span_260](end_span)

    const elFiatTurn = document.getElementById('val-fiat-turn');[span_261](start_span)[span_261](end_span)
    if (elFiatTurn) elFiatTurn.innerText = `${fiatTurn.toLocaleString(undefined, { minimumFractionDigits: 0 })} ${sym}`;[span_262](start_span)[span_262](end_span)

    const elCryptoTurn = document.getElementById('val-crypto-turn');[span_263](start_span)[span_263](end_span)
    if (elCryptoTurn) elCryptoTurn.innerText = `${cryptoTurn.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT`;[span_264](start_span)[span_264](end_span)

    const elTradesCount = document.getElementById('val-trades-count');[span_265](start_span)[span_265](end_span)
    if (elTradesCount) elTradesCount.innerText = `${filtered.length} / ${buysCount} / ${sellsCount}`;[span_266](start_span)[span_266](end_span)

    calculatePeriodComparison(totalProfitFiat);[span_267](start_span)[span_267](end_span)
    if (isHeatmapOpen) renderHeatmap();
}

function calculatePeriodComparison(currentProfit) {
    const compBadge = document.getElementById('val-period-compare');[span_268](start_span)[span_268](end_span)
    if (!compBadge) return;[span_269](start_span)[span_269](end_span)

    let priorTrades = [];[span_270](start_span)[span_270](end_span)
    const now = new Date();[span_271](start_span)[span_271](end_span)

    if (currentPeriod === 'today') {
        const yesterday = new Date(now);[span_272](start_span)[span_272](end_span)
        yesterday.setDate(now.getDate() - 1);[span_273](start_span)[span_273](end_span)
        priorTrades = userTrades.filter(t => new Date(t.date).toDateString() === yesterday.toDateString());[span_274](start_span)[span_274](end_span)
    } else if (currentPeriod === 'month') {
        const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;[span_275](start_span)[span_275](end_span)
        const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();[span_276](start_span)[span_276](end_span)
        priorTrades = userTrades.filter(t => {[span_277](start_span)[span_277](end_span)
            const d = new Date(t.date);[span_278](start_span)[span_278](end_span)
            return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;[span_279](start_span)[span_279](end_span)
        });
    }

    if (priorTrades.length === 0) {
        compBadge.innerHTML = `🌱 Первый запуск периода`;[span_280](start_span)[span_280](end_span)
        compBadge.style.color = "var(--text-muted)";[span_281](start_span)[span_281](end_span)
        return;[span_282](start_span)[span_282](end_span)
    }

    const priorProfit = priorTrades.reduce((acc, t) => {[span_283](start_span)[span_283](end_span)
        if (t.is_cycle) return acc + parseFloat(t.cycle_profit_rub || 0);[span_284](start_span)[span_284](end_span)
        return acc + (t.type === 'sell' ? parseFloat(t.fiat_amount || 0) : -parseFloat(t.fiat_amount || 0));[span_285](start_span)[span_285](end_span)
    }, 0);[span_286](start_span)[span_286](end_span)

    if (priorProfit === 0) {
        compBadge.innerHTML = `📈 +100% к прошлому периоду`;[span_287](start_span)[span_287](end_span)
        compBadge.style.color = "var(--bybit-green)";[span_288](start_span)[span_288](end_span)
        return;[span_289](start_span)[span_289](end_span)
    }

    const diffPct = (((currentProfit - priorProfit) / Math.abs(priorProfit)) * 100).toFixed(1);[span_290](start_span)[span_290](end_span)
    if (diffPct >= 0) {
        compBadge.innerHTML = `📈 +${diffPct}% к прошлому периоду`;[span_291](start_span)[span_291](end_span)
        compBadge.style.color = "var(--bybit-green)";[span_292](start_span)[span_292](end_span)
    } else {
        compBadge.innerHTML = `📉 ${diffPct}% к прошлому периоду`;[span_293](start_span)[span_293](end_span)
        compBadge.style.color = "var(--bybit-red)";[span_294](start_span)[span_294](end_span)
    }
}

/* ====================================================
   КАЛЕНДАРЬ ОБЩЕЙ ПРИБЫЛИ
==================================================== */
function toggleHeatmapPanel() {
    isHeatmapOpen = !isHeatmapOpen;[span_295](start_span)[span_295](end_span)
    const panel = document.getElementById('heatmap-panel');[span_296](start_span)[span_296](end_span)
    const arrow = document.getElementById('heatmap-arrow');[span_297](start_span)[span_297](end_span)
    if (panel) panel.style.display = isHeatmapOpen ? 'block' : 'none';[span_298](start_span)[span_298](end_span)
    if (arrow) arrow.innerText = isHeatmapOpen ? '▴' : '▾';[span_299](start_span)[span_299](end_span)
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
    const container = document.getElementById('calendar-grid-container');[span_300](start_span)[span_300](end_span)
    const popup = document.getElementById('calendar-floating-popup');
    if (!container) return;[span_301](start_span)[span_301](end_span)
    container.innerHTML = '';[span_302](start_span)[span_302](end_span)

    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];[span_303](start_span)[span_303](end_span)
    days.forEach(d => container.innerHTML += `<div class="cal-head">${d}</div>`);[span_304](start_span)[span_304](end_span)[span_305](start_span)[span_305](end_span)

    const year = calViewDate.getFullYear();
    const month = calViewDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();[span_306](start_span)[span_306](end_span)
    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;[span_307](start_span)[span_307](end_span)

    const monthTitle = document.getElementById('heatmap-month-title');[span_308](start_span)[span_308](end_span)
    if (monthTitle) {
        monthTitle.innerText = calViewDate.toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-US', { month: 'long', year: 'numeric' }).toUpperCase();
    }

    for (let i = 0; i < firstDayIndex; i++) {
        container.innerHTML += `<div></div>`;[span_309](start_span)[span_309](end_span)
    }

    // Рассчитываем средневзвешенный Mid Price строго для этого месяца
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

        let dayProfitFiat = 0;
        let dayBoughtUsdt = 0;
        let daySoldUsdt = 0;
        let dayTurnover = 0;

        dayTrades.forEach(t => {
            const f = parseFloat(t.fiat_amount || 0);
            const c = parseFloat(t.crypto_amount || 0);
            dayTurnover += f;

            if (t.is_cycle) {
                dayProfitFiat += parseFloat(t.cycle_profit_rub || 0);
            } else if (t.type === 'buy') {
                dayProfitFiat -= f;
                dayBoughtUsdt += c;
            } else {
                dayProfitFiat += f;
                daySoldUsdt += c;
            }
        });

        const dayCryptoDiff = dayBoughtUsdt - daySoldUsdt;
        // Чистая в фиате + (Чистая в USDT * Mid Price)
        const totalDayProfit = dayProfitFiat + (dayCryptoDiff * calMonthMidPrice);

        let colorClass = '';
        if (dayTrades.length > 0) {
            if (totalDayProfit > 10000) colorClass = 'profit-pos-high';[span_310](start_span)[span_310](end_span)[span_311](start_span)[span_311](end_span)
            else if (totalDayProfit > 2500) colorClass = 'profit-pos-mid';[span_312](start_span)[span_312](end_span)[span_313](start_span)[span_313](end_span)
            else if (totalDayProfit >= 0) colorClass = 'profit-pos-low';[span_314](start_span)[span_314](end_span)[span_315](start_span)[span_315](end_span)
            else colorClass = 'profit-neg';[span_316](start_span)[span_316](end_span)[span_317](start_span)[span_317](end_span)
        }

        dayCellsData[day] = {
            day,
            profit: totalDayProfit,
            count: dayTrades.length,
            turnover: dayTurnover
        };

        const cell = document.createElement('div');
        cell.className = `cal-day-cell ${colorClass}`;[span_318](start_span)[span_318](end_span)
        cell.dataset.day = String(day);
        cell.innerText = day;[span_319](start_span)[span_319](end_span)

        container.appendChild(cell);[span_320](start_span)[span_320](end_span)
    }

    let isTouchingCalendar = false;
    let currentHoverDay = null;

    function updateFloatingPopup(dayNum) {
        if (!dayNum || !dayCellsData[dayNum] || !popup) return;
        const data = dayCellsData[dayNum];
        const sym = getCurrencySymbol();

        document.getElementById('pop-date').innerText = `${data.day} ${monthTitle ? monthTitle.innerText : ''}`;
        const pVal = document.getElementById('pop-profit');
        pVal.innerText = `${(data.profit >= 0 ? '+' : '')}${data.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${sym}`;
        pVal.style.color = data.profit >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)';

        const spreadCalc = data.turnover > 0 ? ((data.profit / data.turnover) * 100).toFixed(2) : "0.00";
        document.getElementById('pop-extra').innerText = `${data.count} сдел. • Спред: ${spreadCalc}%`;

        popup.classList.add('show');[span_321](start_span)[span_321](end_span)
    }

    function hideFloatingPopup() {
        isTouchingCalendar = false;
        currentHoverDay = null;
        if (popup) popup.classList.remove('show');[span_322](start_span)[span_322](end_span)
        container.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('touch-active'));[span_323](start_span)[span_323](end_span)
    }

    function handlePointerAt(clientX, clientY) {
        const el = document.elementFromPoint(clientX, clientY);
        const cell = el ? el.closest('.cal-day-cell') : null;
        if (cell && cell.dataset.day) {
            const d = cell.dataset.day;
            if (d !== currentHoverDay) {
                currentHoverDay = d;
                container.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('touch-active'));[span_324](start_span)[span_324](end_span)
                cell.classList.add('touch-active');[span_325](start_span)[span_325](end_span)
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
        if (data) openDayDetailsModal(d, data.profit, data.count, data.turnover);
    };
}

function openDayDetailsModal(day, profit, count, turnover) {
    const sym = getCurrencySymbol();[span_326](start_span)[span_326](end_span)
    document.getElementById('day-modal-title').innerText = `📅 Сводка за ${day} число`;[span_327](start_span)[span_327](end_span)
    const profitEl = document.getElementById('day-modal-profit-val');[span_328](start_span)[span_328](end_span)
    profitEl.innerText = `${(profit >= 0 ? '+' : '')}${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${sym}`;[span_329](start_span)[span_329](end_span)
    profitEl.style.color = profit >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)';[span_330](start_span)[span_330](end_span)

    document.getElementById('day-modal-trades-cnt').innerText = `${count} сделок`;[span_331](start_span)[span_331](end_span)
    document.getElementById('day-modal-turnover-val').innerText = `${turnover.toLocaleString(undefined, { minimumFractionDigits: 2 })} ${sym}`;[span_332](start_span)[span_332](end_span)

    const spreadAvg = count > 0 ? (turnover > 0 ? ((profit / turnover) * 100).toFixed(2) : "0.00") : "0.00";[span_333](start_span)[span_333](end_span)
    document.getElementById('day-modal-spread-val').innerText = `${spreadAvg}%`;[span_334](start_span)[span_334](end_span)

    document.getElementById('modal-day-details').classList.add('show');[span_335](start_span)[span_335](end_span)
}

function closeDayDetailsModal(event) {
    if (event) event.stopPropagation();[span_336](start_span)[span_336](end_span)
    document.getElementById('modal-day-details').classList.remove('show');[span_337](start_span)[span_337](end_span)
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
    const container = document.getElementById('cards-container');[span_338](start_span)[span_338](end_span)
    const paginationContainer = document.getElementById('cards-pagination');
    if (!container) return;[span_339](start_span)[span_339](end_span)
    container.innerHTML = '';[span_340](start_span)[span_340](end_span)

    if (userCards.length === 0) {
        container.innerHTML = `<div class="glass-card" style="text-align: center; color: var(--text-muted); padding: 20px;">Карт пока нет. Создайте первую карту!</div>`;[span_341](start_span)[span_341](end_span)[span_342](start_span)[span_342](end_span)
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    const sym = getCurrencySymbol();[span_343](start_span)[span_343](end_span)

    // Восстанавливаем порядок перетягивания
    const customOrder = JSON.parse(localStorage.getItem(`p2p_card_order_${currentUser?.tg_id}`) || '[]');
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
        if (a.status === 'burned') return 1;[span_344](start_span)[span_344](end_span)
        if (b.status === 'burned') return -1;[span_345](start_span)[span_345](end_span)
        if (a.is_pinned && !b.is_pinned) return -1;[span_346](start_span)[span_346](end_span)
        if (!a.is_pinned && b.is_pinned) return 1;[span_347](start_span)[span_347](end_span)
        return 0;[span_348](start_span)[span_348](end_span)
    });

    const totalPages = Math.min(MAX_PAGES, Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE)));
    if (cardsCurrentPage > totalPages) cardsCurrentPage = totalPages;

    const startIndex = (cardsCurrentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const now = new Date();

    pageItems.forEach((c, index) => {
        const cTrades = userTrades.filter(tr => tr.card_id === c.id);
        const spentBuyAll = cTrades.filter(tr => tr.type === 'buy').reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
        const gainSellAll = cTrades.filter(tr => tr.type === 'sell').reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
        const deps = cardOps.filter(o => o.card_id === c.id && o.type === 'deposit').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);[span_349](start_span)[span_349](end_span)
        const wdrs = cardOps.filter(o => o.card_id === c.id && o.type === 'withdraw').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);[span_350](start_span)[span_350](end_span)
        const balance = deps - wdrs + gainSellAll - spentBuyAll;

        // Расход за сегодня и за месяц для двух полосок
        const spentBuyToday = cTrades.filter(tr => tr.type === 'buy' && new Date(tr.date).toDateString() === now.toDateString()).reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);
        const spentBuyMonth = cTrades.filter(tr => tr.type === 'buy' && new Date(tr.date).getMonth() === now.getMonth() && new Date(tr.date).getFullYear() === now.getFullYear()).reduce((acc, tr) => acc + parseFloat(tr.fiat_amount || 0), 0);

        const dayLimit = c.buy_limit ? parseFloat(c.buy_limit) : null;
        const monthLimit = c.month_limit ? parseFloat(c.month_limit) : null;

        let dayBarHtml = '';
        if (dayLimit && dayLimit > 0) {
            const pct = Math.min(100, Math.round((spentBuyToday / dayLimit) * 100));
            const col = pct > 90 ? 'danger' : (pct > 70 ? 'warning' : '');
            dayBarHtml = `<div class="card-bar-line"><span class="card-bar-tag">1Д</span><div class="card-mini-bar"><div class="card-mini-bar-fill ${col}" style="width: ${pct}%;"></div></div></div>`;
        }

        let monthBarHtml = '';
        if (monthLimit && monthLimit > 0) {
            const pct = Math.min(100, Math.round((spentBuyMonth / monthLimit) * 100));
            const col = pct > 90 ? 'danger' : (pct > 70 ? 'warning' : '');
            monthBarHtml = `<div class="card-bar-line"><span class="card-bar-tag">1М</span><div class="card-mini-bar"><div class="card-mini-bar-fill ${col}" style="width: ${pct}%;"></div></div></div>`;
        }

        const isBurned = c.status === 'burned';[span_351](start_span)[span_351](end_span)
        const isPinned = c.is_pinned;[span_352](start_span)[span_352](end_span)
        const isCooldown = c.status === 'cooldown';

        let cooldownBadge = '';
        if (isCooldown) {
            if (c.cooldown_until) {
                const diffMin = Math.max(0, Math.round((new Date(c.cooldown_until) - now) / 60000));
                const hours = Math.floor(diffMin / 60);
                const mins = diffMin % 60;
                cooldownBadge = `<span style="font-size: 10px; color: var(--bybit-purple); font-weight: 800;">Отлежка (${hours}ч ${mins}м)</span>`;
            } else {
                cooldownBadge = `<span style="font-size: 10px; color: var(--bybit-purple); font-weight: 800;">Отлежка</span>`;
            }
        }

        const todayTrades = cTrades.filter(tr => new Date(tr.date).toDateString() === now.toDateString());
        const buysCount = todayTrades.filter(tr => tr.type === 'buy').length;[span_353](start_span)[span_353](end_span)
        const sellsCount = todayTrades.filter(tr => tr.type === 'sell' || tr.is_cycle).length;[span_354](start_span)[span_354](end_span)

        container.innerHTML += `
            <div class="card-row-item ${isBurned ? 'burned' : ''} ${isPinned ? 'pinned' : ''}"
                 draggable="true"
                 data-card-id="${c.id}"
                 ondragstart="handleCardDragStart(event, ${c.id})"
                 ondragover="handleCardDragOver(event)"
                 ondrop="handleCardDrop(event, ${c.id})"
                 onclick="openCardBottomSheet(${c.id})">
                <div class="card-stripe" style="background: ${c.color_accent || 'var(--bybit-yellow)'};"></div>
                <div class="card-drag-handle" onclick="event.stopPropagation()">⋮⋮</div>
                <div style="flex: 1; padding-left: 4px;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="font-weight: 800; font-size: 14px;">${c.card_name}</span>
                        ${isPinned ? '<span style="font-size: 11px;">📌</span>' : ''}
                        ${isBurned ? '<span style="font-size: 10px; color: var(--bybit-red); font-weight: 900;">115-ФЗ</span>' : ''}
                        ${cooldownBadge}
                    </div>
                    <div class="card-dual-bars-wrap">
                        ${dayBarHtml}
                        ${monthBarHtml}
                    </div>
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

    renderPaginationBar(paginationContainer, totalPages, cardsCurrentPage, (p) => {
        cardsCurrentPage = p;
        renderCards();
    });
}

// DRAG & DROP ДЛЯ ПЕРЕТЯГИВАНИЯ КАРТ
let draggedCardId = null;
function handleCardDragStart(e, cid) {
    draggedCardId = cid;
    e.dataTransfer.setData('text/plain', cid);
    e.target.classList.add('dragging');
}
function handleCardDragOver(e) {
    e.preventDefault();
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
        localStorage.setItem(`p2p_card_order_${currentUser?.tg_id}`, JSON.stringify(order));
        haptic('light');
        renderCards();
    }
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
   ШТОРКА КАРТЫ (СТРОГО 4 ПОКАЗАТЕЛЯ В СВОДКЕ)
==================================================== */
function switchCardSheetTab(tab) {
    haptic('light');
    ['stats', 'settings', 'history'].forEach(t => {
        const btn = document.getElementById(`tab-csheet-${t}`);
        const view = document.getElementById(`csheet-view-${t}`);
        if (btn) btn.classList.toggle('active', t === tab);
        if (view) view.style.display = (t === tab) ? 'block' : 'none';
    });
    if (tab === 'history') renderCardTradesList();
}

function toggleCooldownDateInput(statusVal) {
    const wrap = document.getElementById('wrap-cooldown-until');
    if (wrap) wrap.style.display = (statusVal === 'cooldown') ? 'block' : 'none';
}

function openCardBottomSheet(cid) {
    haptic('light');[span_355](start_span)[span_355](end_span)
    activeSheetCard = userCards.find(c => c.id === cid);[span_356](start_span)[span_356](end_span)
    if (!activeSheetCard) return;[span_357](start_span)[span_357](end_span)

    activeCardId = cid;[span_358](start_span)[span_358](end_span)
    document.getElementById('sheet-card-title').innerText = activeSheetCard.card_name;[span_359](start_span)[span_359](end_span)

    // Настройки карты
    document.getElementById('csheet-inp-name').value = activeSheetCard.card_name || '';
    document.getElementById('csheet-inp-num').value = activeSheetCard.card_number || '';
    document.getElementById('csheet-inp-holder').value = activeSheetCard.holder_name || '';
    document.getElementById('csheet-inp-day-limit').value = activeSheetCard.buy_limit || '';
    document.getElementById('csheet-inp-month-limit').value = activeSheetCard.month_limit || '';
    document.getElementById('sheet-set-status').value = activeSheetCard.status || 'active';
    document.getElementById('csheet-inp-notes').value = activeSheetCard.note || '';

    const cdInput = document.getElementById('csheet-inp-cooldown-until');
    if (cdInput) {
        cdInput.value = activeSheetCard.cooldown_until ? activeSheetCard.cooldown_until.slice(0, 16) : '';
    }
    toggleCooldownDateInput(activeSheetCard.status || 'active');

    activeSelectedCardColor = activeSheetCard.color_accent || '#f3a600';
    document.querySelectorAll('#sheet-card-colors .color-swatch-dot').forEach(d => {
        d.classList.toggle('selected', d.style.background === activeSelectedCardColor || d.getAttribute('style')?.includes(activeSelectedCardColor));
    });

    // Расчет строго 4 показателей по ТЗ
    const sym = getCurrencySymbol();[span_360](start_span)[span_360](end_span)
    const cTrades = userTrades.filter(tr => tr.card_id === cid);
    let boughtFiat = 0, soldFiat = 0, boughtCrypto = 0, soldCrypto = 0, cycleRub = 0;

    cTrades.forEach(t => {
        const f = parseFloat(t.fiat_amount || 0);
        const c = parseFloat(t.crypto_amount || 0);
        if (t.is_cycle) {
            boughtFiat += f;
            soldFiat += f;
            boughtCrypto += c;
            soldCrypto += (t.sell_rate ? f / parseFloat(t.sell_rate) : c);
            cycleRub += parseFloat(t.cycle_profit_rub || 0);
        } else if (t.type === 'buy') {
            boughtFiat += f;
            boughtCrypto += c;
        } else {
            soldFiat += f;
            soldCrypto += c;
        }
    });

    const deps = cardOps.filter(o => o.card_id === cid && o.type === 'deposit').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);[span_361](start_span)[span_361](end_span)
    const wdrs = cardOps.filter(o => o.card_id === cid && o.type === 'withdraw').reduce((acc, o) => acc + parseFloat(o.amount || 0), 0);[span_362](start_span)[span_362](end_span)
    const balance = deps - wdrs + soldFiat - boughtFiat;

    const profitFiat = (soldFiat - boughtFiat) + cycleRub;
    const profitUsdt = boughtCrypto - soldCrypto;

    document.getElementById('sheet-card-balance').innerText = `${balance.toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}`;[span_363](start_span)[span_363](end_span)

    // Строго 4 показателя:
    document.getElementById('csheet-val-bought-fiat').innerText = `${boughtFiat.toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}`;
    document.getElementById('csheet-val-sold-fiat').innerText = `${soldFiat.toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}`;

    const elPF = document.getElementById('csheet-val-profit-rub');
    elPF.innerText = `${(profitFiat >= 0 ? '+' : '')}${profitFiat.toLocaleString(undefined, {minimumFractionDigits: 2})} ${sym}`;
    elPF.style.color = profitFiat >= 0 ? 'var(--bybit-green)' : 'var(--bybit-red)';

    const elPU = document.getElementById('csheet-val-profit-usdt');
    elPU.innerText = `${(profitUsdt >= 0 ? '+' : '')}${profitUsdt.toFixed(2)} USDT`;
    elPU.style.color = profitUsdt >= 0 ? 'var(--bybit-blue)' : 'var(--bybit-red)';

    switchCardSheetTab('stats');
    document.getElementById('card-sheet-modal').classList.add('show');[span_364](start_span)[span_364](end_span)
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

    const sym = getCurrencySymbol();[span_365](start_span)[span_365](end_span)
    trades.forEach(t => {
        const d = new Date(t.date);[span_366](start_span)[span_366](end_span)
        const dateStr = d.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });[span_367](start_span)[span_367](end_span)
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

    haptic('medium');[span_368](start_span)[span_368](end_span)
    const name = document.getElementById('csheet-inp-name').value.trim();
    const num = document.getElementById('csheet-inp-num').value.trim();
    const holder = document.getElementById('csheet-inp-holder').value.trim();
    const dayLimit = parseFloat(document.getElementById('csheet-inp-day-limit').value) || null;
    const monthLimit = parseFloat(document.getElementById('csheet-inp-month-limit').value) || null;
    const status = document.getElementById('sheet-set-status').value;[span_369](start_span)[span_369](end_span)
    const note = document.getElementById('csheet-inp-notes').value.trim();

    let cooldownUntil = null;
    if (status === 'cooldown') {
        const val = document.getElementById('csheet-inp-cooldown-until').value;
        if (val) cooldownUntil = new Date(val).toISOString();
    }

    if (!name) return showToast("⚠️ Название карты обязательно!");

    try {
        await db(`cards?id=eq.${activeSheetCard.id}`, {[span_370](start_span)[span_370](end_span)
            method: 'PATCH',[span_371](start_span)[span_371](end_span)
            body: JSON.stringify({[span_372](start_span)[span_372](end_span)
                card_name: name,
                card_number: num,
                holder_name: holder,
                buy_limit: dayLimit,
                month_limit: monthLimit,
                status: status,
                color_accent: activeSelectedCardColor,[span_373](start_span)[span_373](end_span)
                cooldown_until: cooldownUntil,
                note: note
            })
        });

        showToast("✅ Настройки карты сохранены!");
        await refreshData();[span_374](start_span)[span_374](end_span)
        renderAll();[span_375](start_span)[span_375](end_span)
        openCardBottomSheet(activeSheetCard.id);
    } catch(e) {
        showToast("Ошибка сохранения настроек");
    }
}

function closeCardSheet() {
    document.getElementById('card-sheet-modal').classList.remove('show');[span_376](start_span)[span_376](end_span)
}

function selectCardColor(color, el) {
    haptic('light');[span_377](start_span)[span_377](end_span)
    activeSelectedCardColor = color;[span_378](start_span)[span_378](end_span)
    document.querySelectorAll('#sheet-card-colors .color-swatch-dot').forEach(d => d.classList.remove('selected'));[span_379](start_span)[span_379](end_span)
    if (el) el.classList.add('selected');[span_380](start_span)[span_380](end_span)
}

async function togglePinCurrentCard() {
    if (!requireSubscription()) return;
    if (!activeSheetCard) return;[span_381](start_span)[span_381](end_span)
    haptic('medium');[span_382](start_span)[span_382](end_span)
    const newPinned = !activeSheetCard.is_pinned;[span_383](start_span)[span_383](end_span)
    await db(`cards?id=eq.${activeSheetCard.id}`, {[span_384](start_span)[span_384](end_span)
        method: 'PATCH',[span_385](start_span)[span_385](end_span)
        body: JSON.stringify({ is_pinned: newPinned })[span_386](start_span)[span_386](end_span)
    });
    activeSheetCard.is_pinned = newPinned;[span_387](start_span)[span_387](end_span)
    closeCardSheet();[span_388](start_span)[span_388](end_span)
    showToast(newPinned ? "📌 Карта закреплена наверх" : "Откреплено");[span_389](start_span)[span_389](end_span)
    await refreshData();[span_390](start_span)[span_390](end_span)
    renderCards();[span_391](start_span)[span_391](end_span)
}

function copyCardNumberOnly() {
    if (!activeSheetCard?.card_number) return showToast("⚠️ Номер карты не указан");[span_392](start_span)[span_392](end_span)
    navigator.clipboard.writeText(activeSheetCard.card_number.replace(/\s+/g, ''));[span_393](start_span)[span_393](end_span)
    haptic('success');[span_394](start_span)[span_394](end_span)
    showToast("💳 Номер скопирован!");
}

/* ====================================================
   ШАБЛОН ЧАТА ОРДЕРА
==================================================== */
function copyCardFullRequisites() {
    if (!activeSheetCard) return;[span_395](start_span)[span_395](end_span)
    let text = globalMessageTemplate;
    text = text.replace(/{bank}/g, activeSheetCard.card_name || 'Банк');
    text = text.replace(/{number}/g, activeSheetCard.card_number || 'Реквизиты не заданы');
    text = text.replace(/{holder}/g, activeSheetCard.holder_name || 'Получатель');

    navigator.clipboard.writeText(text);[span_396](start_span)[span_396](end_span)
    haptic('success');[span_397](start_span)[span_397](end_span)
    showToast("📋 Шаблон ордера скопирован!");[span_398](start_span)[span_398](end_span)
}

function openTemplateEditorModal() {
    haptic('light');
    document.getElementById('inp-global-template').value = globalMessageTemplate;
    document.getElementById('modal-template-editor').classList.add('show');
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
    localStorage.setItem('p2p_card_msg_template', globalMessageTemplate);
    closeModals();[span_399](start_span)[span_399](end_span)
    showToast("✅ Шаблон сообщений сохранен!");
}

function openSheetCardOp(type) {
    closeCardSheet();[span_400](start_span)[span_400](end_span)
    openCardOpModal(activeCardId, type);[span_401](start_span)[span_401](end_span)
}

async function cloneCurrentCard() {
    if (!requireSubscription()) return;
    if (!activeSheetCard) return;[span_402](start_span)[span_402](end_span)
    haptic('medium');[span_403](start_span)[span_403](end_span)
    await db(`cards`, {[span_404](start_span)[span_404](end_span)
        method: 'POST',[span_405](start_span)[span_405](end_span)
        body: JSON.stringify({[span_406](start_span)[span_406](end_span)
            tg_id: currentUser.tg_id,[span_407](start_span)[span_407](end_span)
            card_name: `${activeSheetCard.card_name} (Клон)`,[span_408](start_span)[span_408](end_span)
            card_number: activeSheetCard.card_number,[span_409](start_span)[span_409](end_span)
            holder_name: activeSheetCard.holder_name,[span_410](start_span)[span_410](end_span)
            buy_limit: activeSheetCard.buy_limit,[span_411](start_span)[span_411](end_span)
            month_limit: activeSheetCard.month_limit,
            color_accent: activeSheetCard.color_accent,[span_412](start_span)[span_412](end_span)
            status: 'active[span_413](start_span)'[span_413](end_span)
        })
    });
    closeCardSheet();[span_414](start_span)[span_414](end_span)
    showToast("✅ Карта клонирована!");
    await refreshData();[span_415](start_span)[span_415](end_span)
    renderCards();[span_416](start_span)[span_416](end_span)
}

async function deleteCurrentCardFromSheet() {
    if (!requireSubscription()) return;
    if (!confirm("Удалить карту? Все сделки в истории останутся.")) return;[span_417](start_span)[span_417](end_span)
    await db(`cards?id=eq.${activeCardId}`, { method: 'DELETE' });[span_418](start_span)[span_418](end_span)
    closeCardSheet();[span_419](start_span)[span_419](end_span)
    showToast("🗑 Карта удалена");[span_420](start_span)[span_420](end_span)
    await refreshData();[span_421](start_span)[span_421](end_span)
    renderAll();[span_422](start_span)[span_422](end_span)
}

/* ====================================================
   ТРАНСФЕР МЕЖДУ КАРТАМИ
==================================================== */
function openTransferModal() {
    if (!requireSubscription()) return;
    haptic('light');[span_423](start_span)[span_423](end_span)
    if (userCards.length < 2) return showToast("⚠️ Для трансфера нужно минимум 2 карты");[span_424](start_span)[span_424](end_span)

    const selFrom = document.getElementById('transfer-from-card');[span_425](start_span)[span_425](end_span)
    const selTo = document.getElementById('transfer-to-card');[span_426](start_span)[span_426](end_span)
    const opts = userCards.map(c => `<option value="${c.id}">${c.card_name}</option>`).join('');[span_427](start_span)[span_427](end_span)

    if (selFrom) selFrom.innerHTML = opts;[span_428](start_span)[span_428](end_span)
    if (selTo) selTo.innerHTML = opts;[span_429](start_span)[span_429](end_span)
    if (selTo && userCards.length > 1) selTo.selectedIndex = 1;[span_430](start_span)[span_430](end_span)

    document.getElementById('modal-card-transfer').classList.add('show');[span_431](start_span)[span_431](end_span)
}

async function submitCardTransfer() {
    if (!requireSubscription()) return;

    const fromId = parseInt(document.getElementById('transfer-from-card').value);[span_432](start_span)[span_432](end_span)
    const toId = parseInt(document.getElementById('transfer-to-card').value);[span_433](start_span)[span_433](end_span)
    const amt = parseFloat(document.getElementById('transfer-amount').value);[span_434](start_span)[span_434](end_span)

    if (!amt || amt <= 0) return showToast("⚠️ Введите сумму трансфера");[span_435](start_span)[span_435](end_span)
    if (fromId === toId) return showToast("⚠️ Выберите разные карты!");[span_436](start_span)[span_436](end_span)

    haptic('medium');[span_437](start_span)[span_437](end_span)
    try {
        await Promise.all([
            db('card_operations', {[span_438](start_span)[span_438](end_span)
                method: 'POST',[span_439](start_span)[span_439](end_span)
                body: JSON.stringify({[span_440](start_span)[span_440](end_span)
                    card_id: fromId,[span_441](start_span)[span_441](end_span)
                    tg_id: currentUser.tg_id,[span_442](start_span)[span_442](end_span)
                    type: 'withdraw',[span_443](start_span)[span_443](end_span)
                    amount: amt,[span_444](start_span)[span_444](end_span)
                    comment: `Трансфер на карту #${toId}`,
                    count_in_limit: false[span_445](start_span)[span_445](end_span)
                })
            }),
            db('card_operations', {[span_446](start_span)[span_446](end_span)
                method: 'POST',[span_447](start_span)[span_447](end_span)
                body: JSON.stringify({[span_448](start_span)[span_448](end_span)
                    card_id: toId,[span_449](start_span)[span_449](end_span)
                    tg_id: currentUser.tg_id,[span_450](start_span)[span_450](end_span)
                    type: 'deposit',[span_451](start_span)[span_451](end_span)
                    amount: amt,[span_452](start_span)[span_452](end_span)
                    comment: `Трансфер с карты #${fromId}`,
                    count_in_limit: false[span_453](start_span)[span_453](end_span)
                })
            })
        ]);

        closeModals();[span_454](start_span)[span_454](end_span)
        playCashSound();[span_455](start_span)[span_455](end_span)
        showToast("🔄 Трансфер выполнен!");[span_456](start_span)[span_456](end_span)
        await refreshData();[span_457](start_span)[span_457](end_span)
        renderCards();[span_458](start_span)[span_458](end_span)
    } catch(e) {
        showToast("Ошибка трансфера");[span_459](start_span)[span_459](end_span)
    }
}

/* ====================================================
   ИСТОРИЯ ОПЕРАЦИЙ (ПАГИНАЦИЯ ПО 25, ДО 4 СТР)
==================================================== */
function selectDealColor(color, el) {
    haptic('light');[span_460](start_span)[span_460](end_span)
    activeSelectedDealColor = color;[span_461](start_span)[span_461](end_span)
    document.querySelectorAll('#deal-color-swatches .color-swatch-dot').forEach(d => d.classList.remove('selected'));[span_462](start_span)[span_462](end_span)
    if (el) el.classList.add('selected');[span_463](start_span)[span_463](end_span)
}

function renderHistory() {
    const container = document.getElementById('history-container');[span_464](start_span)[span_464](end_span)
    const paginationContainer = document.getElementById('history-pagination');
    if (!container) return;[span_465](start_span)[span_465](end_span)
    container.innerHTML = '';[span_466](start_span)[span_466](end_span)

    if (userTrades.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">Сделок пока нет.</div>`;[span_467](start_span)[span_467](end_span)
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    const sym = getCurrencySymbol();[span_468](start_span)[span_468](end_span)
    const tz = parseInt(currentUser?.tz_offset) || 3;[span_469](start_span)[span_469](end_span)

    const colorBorderMap = {
        'green': 'var(--bybit-green)',[span_470](start_span)[span_470](end_span)
        'yellow': 'var(--bybit-yellow)',[span_471](start_span)[span_471](end_span)
        'blue': 'var(--bybit-blue)',[span_472](start_span)[span_472](end_span)
        'purple': 'var(--bybit-purple)',[span_473](start_span)[span_473](end_span)
        'red': 'var(--bybit-red)',[span_474](start_span)[span_474](end_span)
        'default': 'transparent[span_475](start_span)'[span_475](end_span)
    };

    const totalPages = Math.min(MAX_PAGES, Math.max(1, Math.ceil(userTrades.length / ITEMS_PER_PAGE)));
    if (historyCurrentPage > totalPages) historyCurrentPage = totalPages;

    const startIndex = (historyCurrentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = userTrades.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    pageItems.forEach(t => {
        const d = new Date(t.date);[span_476](start_span)[span_476](end_span)
        d.setHours(d.getUTCHours() + tz);[span_477](start_span)[span_477](end_span)
        const dateStr = d.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });[span_478](start_span)[span_478](end_span)
        const boundCard = userCards.find(c => c.id === t.card_id);[span_479](start_span)[span_479](end_span)
        const cardBadge = boundCard ? `<span class="card-pill">💳 ${boundCard.card_name}</span>` : '';[span_480](start_span)[span_480](end_span)
        const borderCol = colorBorderMap[t.tag_color] || 'transparent';[span_481](start_span)[span_481](end_span)

        if (t.is_cycle) {
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
            const isBuy = t.type === 'buy';[span_482](start_span)[span_482](end_span)
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
    haptic('light');[span_483](start_span)[span_483](end_span)
    const tr = userTrades.find(t => t.id === tradeId);[span_484](start_span)[span_484](end_span)
    if (!tr) return;[span_485](start_span)[span_485](end_span)

    if (tr.is_cycle) {
        document.getElementById('calc-fiat-amt').value = tr.fiat_amount;[span_486](start_span)[span_486](end_span)
        document.getElementById('calc-buy-rate').value = tr.buy_rate;[span_487](start_span)[span_487](end_span)
        document.getElementById('calc-sell-rate').value = tr.sell_rate;[span_488](start_span)[span_488](end_span)
        if (tr.card_id) document.getElementById('calc-card-sel').value = tr.card_id;[span_489](start_span)[span_489](end_span)
        runCalculator();[span_490](start_span)[span_490](end_span)
        handleNavClick('dashboard', document.querySelector('.nav-btn[data-target="dashboard"]'));[span_491](start_span)[span_491](end_span)
        showToast("🔁 Круг скопирован в калькулятор!");[span_492](start_span)[span_492](end_span)
    } else {
        document.getElementById('inp-amount').value = tr.fiat_amount;[span_493](start_span)[span_493](end_span)
        document.getElementById('inp-rate').value = tr.rate;[span_494](start_span)[span_494](end_span)
        setTradeType(tr.type);[span_495](start_span)[span_495](end_span)
        handleNavClick('trade', document.querySelector('.nav-btn[data-target="trade"]'));[span_496](start_span)[span_496](end_span)
        showToast("🔁 Сделка подставлена!");[span_497](start_span)[span_497](end_span)
    }
}

function openEditTradeModal(tid) {
    if (!requireSubscription()) return;
    haptic('light');[span_498](start_span)[span_498](end_span)
    activeEditTradeId = tid;[span_499](start_span)[span_499](end_span)
    const tr = userTrades.find(x => x.id === tid);[span_500](start_span)[span_500](end_span)
    if (!tr) return;[span_501](start_span)[span_501](end_span)

    document.getElementById('modal-trade-id').innerText = `Сделка #${tid}`;[span_502](start_span)[span_502](end_span)
    document.getElementById('modal-inp-amount').value = tr.fiat_amount;[span_503](start_span)[span_503](end_span)
    document.getElementById('modal-rate').value = tr.rate || tr.buy_rate;[span_504](start_span)[span_504](end_span)
    document.getElementById('modal-card-sel').value = tr.card_id || "";[span_505](start_span)[span_505](end_span)
    document.getElementById('modal-note').value = tr.note || "";[span_506](start_span)[span_506](end_span)

    activeSelectedDealColor = tr.tag_color || 'default';[span_507](start_span)[span_507](end_span)
    document.querySelectorAll('#deal-color-swatches .color-swatch-dot').forEach(d => {[span_508](start_span)[span_508](end_span)
        d.classList.toggle('selected', d.getAttribute('data-color') === activeSelectedDealColor);[span_509](start_span)[span_509](end_span)
    });

    document.getElementById('edit-modal').classList.add('show');[span_510](start_span)[span_510](end_span)
}

async function submitEditTrade() {
    if (!requireSubscription()) return;

    const amt = parseFloat(document.getElementById('modal-inp-amount').value);[span_511](start_span)[span_511](end_span)
    const r = parseFloat(document.getElementById('modal-rate').value);[span_512](start_span)[span_512](end_span)
    const cid = document.getElementById('modal-card-sel').value || null;[span_513](start_span)[span_513](end_span)
    const note = document.getElementById('modal-note').value.trim();[span_514](start_span)[span_514](end_span)

    if (!amt || !r) return showToast("⚠️ Заполните сумму и курс!");[span_515](start_span)[span_515](end_span)

    await db(`trades?id=eq.${activeEditTradeId}`, {[span_516](start_span)[span_516](end_span)
        method: 'PATCH',[span_517](start_span)[span_517](end_span)
        body: JSON.stringify({[span_518](start_span)[span_518](end_span)
            fiat_amount: amt,[span_519](start_span)[span_519](end_span)
            rate: r,[span_520](start_span)[span_520](end_span)
            crypto_amount: parseFloat((amt / r).toFixed(2)),[span_521](start_span)[span_521](end_span)
            card_id: cid ? parseInt(cid) : null,[span_522](start_span)[span_522](end_span)
            note: note,[span_523](start_span)[span_523](end_span)
            tag_color: activeSelectedDealColor[span_524](start_span)[span_524](end_span)
        })
    });
    closeModals();[span_525](start_span)[span_525](end_span)
    showToast("✏️ Сделка успешно обновлена!");[span_526](start_span)[span_526](end_span)
    await refreshData();[span_527](start_span)[span_527](end_span)
    renderAll();[span_528](start_span)[span_528](end_span)
}

async function deleteTradeCloud(tid) {
    if (!requireSubscription()) return;
    haptic('medium');[span_529](start_span)[span_529](end_span)
    if (!confirm("Удалить операцию из базы?")) return;[span_530](start_span)[span_530](end_span)
    await db(`trades?id=eq.${tid}`, { method: 'DELETE' });[span_531](start_span)[span_531](end_span)
    showToast("🗑 Сделка удалена");[span_532](start_span)[span_532](end_span)
    await refreshData();[span_533](start_span)[span_533](end_span)
    renderAll();[span_534](start_span)[span_534](end_span)
}

/* ====================================================
   ПОЛНОЭКРАННЫЙ ЭКСПОРТ PNL (КАРТИНКА С ШЕРИНГОМ)
==================================================== */
let currentPnlDataUrl = null;

function openPnlPage() {
    haptic('medium');[span_535](start_span)[span_535](end_span)
    const canvas = document.createElement('canvas');[span_536](start_span)[span_536](end_span)
    canvas.width = 1200;
    canvas.height = 760;
    const ctx = canvas.getContext('2d');[span_537](start_span)[span_537](end_span)

    const grad = ctx.createLinearGradient(0, 0, 1200, 760);[span_538](start_span)[span_538](end_span)
    grad.addColorStop(0, '#090d16');
    grad.addColorStop(0.5, '#05070a');[span_539](start_span)[span_539](end_span)
    grad.addColorStop(1, '#0c1322');
    ctx.fillStyle = grad;[span_540](start_span)[span_540](end_span)
    ctx.fillRect(0, 0, 1200, 760);[span_541](start_span)[span_541](end_span)

    // Золотая рамка
    ctx.strokeStyle = '#f3a600';[span_542](start_span)[span_542](end_span)
    ctx.lineWidth = 4;
    ctx.strokeRect(28, 28, 1144, 704);

    // Шапка
    ctx.fillStyle = '#f3a600';[span_543](start_span)[span_543](end_span)
    ctx.font = '900 42px Inter, sans-serif';
    ctx.fillText('P2P TERMINAL PRO', 70, 105);

    ctx.fillStyle = '#94a3b8';[span_544](start_span)[span_544](end_span)
    ctx.font = '600 24px Inter, sans-serif';
    ctx.fillText(new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }), 70, 150);[span_545](start_span)[span_545](end_span)

    // Показатели
    const totalRub = document.getElementById('val-total-profit-rub')?.innerText || "0.00 ₽";
    const totalUsdt = document.getElementById('val-total-profit-usdt')?.innerText || "0.00 USDT";
    const lastSpread = document.getElementById('val-last-spread')?.innerText || "0.00%";[span_546](start_span)[span_546](end_span)
    const avgSpread = document.getElementById('val-avg-spread')?.innerText || "0.00%";[span_547](start_span)[span_547](end_span)
    const roi = document.getElementById('val-roi')?.innerText || "0.00%";[span_548](start_span)[span_548](end_span)
    const tradesCount = document.getElementById('val-trades-count')?.innerText || "0";[span_549](start_span)[span_549](end_span)

    ctx.fillStyle = '#64748b';
    ctx.font = '700 22px Inter, sans-serif';
    ctx.fillText('ОБЩАЯ ПРИБЫЛЬ ЗА ПЕРИОД', 70, 240);

    ctx.fillStyle = '#2ebb9a';[span_550](start_span)[span_550](end_span)
    ctx.font = '900 76px Inter, sans-serif';
    ctx.fillText(totalRub, 70, 325);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 32px Inter, sans-serif';
    ctx.fillText(totalUsdt, 70, 380);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 28px Inter, sans-serif';
    ctx.fillText(`Спред круга: ${lastSpread}`, 70, 470);
    ctx.fillText(`Ср. спред: ${avgSpread}`, 600, 470);
    ctx.fillText(`ROI от оборота: ${roi}`, 70, 530);
    ctx.fillText(`Сделок закрыто: ${tradesCount}`, 600, 530);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(70, 600);
    ctx.lineTo(1130, 600);
    ctx.stroke();

    ctx.fillStyle = '#f3a600';[span_551](start_span)[span_551](end_span)
    ctx.font = '900 34px Inter, sans-serif';
    ctx.fillText('@P2P_Rbot', 70, 665);

    ctx.fillStyle = '#94a3b8';[span_552](start_span)[span_552](end_span)
    ctx.font = '600 22px Inter, sans-serif';
    ctx.fillText('Автоматизированный учет связок и кассы', 320, 663);

    currentPnlDataUrl = canvas.toDataURL('image/png');[span_553](start_span)[span_553](end_span)
    const imgEl = document.getElementById('pnl-rendered-img');
    if (imgEl) imgEl.src = currentPnlDataUrl;

    document.getElementById('pnl-card-modal').classList.add('show');[span_554](start_span)[span_554](end_span)
}

function closePnlPage() {
    haptic('light');
    document.getElementById('pnl-card-modal').classList.remove('show');
}

function downloadPnlImage() {
    haptic('medium');
    if (!currentPnlDataUrl) return;
    const link = document.createElement('a');[span_555](start_span)[span_555](end_span)
    link.download = `PnL_Report_${new Date().toISOString().slice(0, 10)}.png`;[span_556](start_span)[span_556](end_span)
    link.href = currentPnlDataUrl;[span_557](start_span)[span_557](end_span)
    document.body.appendChild(link);
    link.click();[span_558](start_span)[span_558](end_span)
    document.body.removeChild(link);
    showToast("💾 Фото сохранено в загрузки!");
}

async function sharePnlCardFile() {
    haptic('medium');
    if (!currentPnlDataUrl) return;

    try {
        const res = await fetch(currentPnlDataUrl);
        const blob = await res.blob();
        const file = new File([blob], `PnL_${new Date().toISOString().slice(0, 10)}.png`, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: 'PnL Report @P2P_Rbot',
                text: 'Мой результат в арбитраже криптовалют @P2P_Rbot'
            });
            showToast("✅ Картинка отправлена!");
        } else {
            downloadPnlImage();
            showToast("Файл скачан! Отправьте его в Telegram");
        }
    } catch(e) {
        downloadPnlImage();
    }
}

/* ====================================================
   АДМИНКА И БАЗА ПОЛЬЗОВАТЕЛЕЙ
==================================================== */
async function loadActiveUsersForAdmin() {
    try {
        const [usersRes, tradesRes] = await Promise.all([
            db('users?order=reg_date.desc'),[span_559](start_span)[span_559](end_span)
            db('trades?select=tg_id')[span_560](start_span)[span_560](end_span)
        ]);

        if (!usersRes) return;[span_561](start_span)[span_561](end_span)
        rawAdminUsersList = usersRes;

        const tradeCounts = {};
        (tradesRes || []).forEach(t => tradeCounts[t.tg_id] = (tradeCounts[t.tg_id] || 0) + 1);

        rawAdminUsersList.forEach(u => {
            u._tradesCount = tradeCounts[u.tg_id] || 0;
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
        btn.innerText = adminDbFilterOnlySub ? "Фильтр: Была подписка 🟢" : "Фильтр: Все юзеры ⚪️";
    }
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
    haptic('light');
    document.getElementById('admin-target-uid').value = tgId;
    closeModals();[span_562](start_span)[span_562](end_span)
    adminInspectUser();
}

async function adminInspectUser() {
    const targetId = parseInt(document.getElementById('admin-target-uid').value);[span_563](start_span)[span_563](end_span)
    if (!targetId) return showToast("⚠️ Введите ID!");[span_564](start_span)[span_564](end_span)

    const [uRes, tRes] = await Promise.all([
        db(`users?tg_id=eq.${targetId}`),[span_565](start_span)[span_565](end_span)
        db(`trades?tg_id=eq.${targetId}`)[span_566](start_span)[span_566](end_span)
    ]);

    const box = document.getElementById('admin-user-dossier');[span_567](start_span)[span_567](end_span)
    if (!uRes || uRes.length === 0) {
        box.style.display = 'block';[span_568](start_span)[span_568](end_span)
        box.innerHTML = `<span style="color: var(--bybit-red);">Пользователь не найден в базе</span>`;[span_569](start_span)[span_569](end_span)
        return;[span_570](start_span)[span_570](end_span)
    }

    const u = uRes[0];[span_571](start_span)[span_571](end_span)
    const tradesCnt = tRes ? tRes.length : 0;[span_572](start_span)[span_572](end_span)
    const subStr = u.sub_end ? (new Date(u.sub_end).getFullYear() > 2099 ? '♾️ VIP Навсегда' : new Date(u.sub_end).toLocaleDateString()) : '❌ Нет доступа';[span_573](start_span)[span_573](end_span)

    box.style.display = 'block';[span_574](start_span)[span_574](end_span)
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
    const targetId = parseInt(document.getElementById('admin-target-uid').value);[span_575](start_span)[span_575](end_span)
    if (!targetId) return showToast("⚠️ Выберите пользователя!");[span_576](start_span)[span_576](end_span)
    const now = new Date();[span_577](start_span)[span_577](end_span)

    if (action === 'grant30') {
        now.setDate(now.getDate() + 30);[span_578](start_span)[span_578](end_span)
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ sub_end: now.toISOString(), is_banned: false }) });[span_579](start_span)[span_579](end_span)
        showToast(`✅ ID ${targetId}: +30 дней`);
    } else if (action === 'grantVIP') {
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ sub_end: "2100-01-01T00:00:00Z", is_banned: false }) });[span_580](start_span)[span_580](end_span)
        showToast(`✅ ID ${targetId}: VIP Навсегда`);
    } else if (action === 'revoke') {
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ sub_end: null }) });[span_581](start_span)[span_581](end_span)
        showToast(`❌ ID ${targetId}: подписка снята`);
    } else if (action === 'ban') {
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ is_banned: true }) });[span_582](start_span)[span_582](end_span)
        showToast(`⛔️ ID ${targetId}: забанен`);
    } else if (action === 'unban') {
        await db(`users?tg_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ is_banned: false }) });[span_583](start_span)[span_583](end_span)
        showToast(`🟢 ID ${targetId}: разбанен`);[span_584](start_span)[span_584](end_span)
    }
    adminInspectUser();
    loadActiveUsersForAdmin();
}

async function adminExportDatabase(onlyWithSub = true) {
    haptic('medium');[span_585](start_span)[span_585](end_span)
    showToast("⏳ Формирование выгрузки...");[span_586](start_span)[span_586](end_span)
    try {
        let users = await db(`users?order=reg_date.desc`);[span_587](start_span)[span_587](end_span)
        if (!users || users.length === 0) return showToast("База пуста");[span_588](start_span)[span_588](end_span)

        if (onlyWithSub) {
            users = users.filter(u => (u.sub_end !== null && u.sub_end !== undefined) || (u.trial_used === true));
        }

        let csv = "TG_ID,Username,First_Name,Sub_End,Trial_Used,Is_Banned,Reg_Date\n";
        users.forEach(u => {
            csv += `"${u.tg_id}","${u.username || ''}","${(u.first_name || '').replace(/"/g, '""')}","${u.sub_end || ''}","${u.trial_used ? 'YES' : 'NO'}","${u.is_banned ? 'YES' : 'NO'}","${u.reg_date || ''}"\n`;[span_589](start_span)[span_589](end_span)
        });

        const fileName = `P2P_Users_${onlyWithSub ? 'ActiveSub' : 'All'}_${new Date().toISOString().slice(0, 10)}.csv`;
        const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });[span_590](start_span)[span_590](end_span)
        const fileUrl = URL.createObjectURL(blob);[span_591](start_span)[span_591](end_span)

        const link = document.createElement("a");[span_592](start_span)[span_592](end_span)
        link.href = fileUrl;[span_593](start_span)[span_593](end_span)
        link.download = fileName;[span_594](start_span)[span_594](end_span)
        document.body.appendChild(link);[span_595](start_span)[span_595](end_span)
        link.click();[span_596](start_span)[span_596](end_span)
        document.body.removeChild(link);[span_597](start_span)[span_597](end_span)
        showToast("📥 База скачана!");
    } catch(e) {
        showToast("❌ Ошибка экспорта");
    }
}

async function adminCreatePromo() {
    haptic('medium');[span_598](start_span)[span_598](end_span)
    const code = document.getElementById('new-promo-code').value.trim().toUpperCase();[span_599](start_span)[span_599](end_span)
    const days = parseInt(document.getElementById('new-promo-days').value);[span_600](start_span)[span_600](end_span)
    const max = parseInt(document.getElementById('new-promo-max').value) || 1;[span_601](start_span)[span_601](end_span)

    if (!code || !days) return showToast("⚠️ Заполните код и дни!");[span_602](start_span)[span_602](end_span)

    try {
        await db(`promocodes`, {[span_603](start_span)[span_603](end_span)
            method: 'POST',[span_604](start_span)[span_604](end_span)
            body: JSON.stringify({[span_605](start_span)[span_605](end_span)
                code: code,[span_606](start_span)[span_606](end_span)
                days: days,[span_607](start_span)[span_607](end_span)
                max_activations: max,[span_608](start_span)[span_608](end_span)
                used_count: 0[span_609](start_span)[span_609](end_span)
            })
        });
        showToast("✅ Промокод создан!");[span_610](start_span)[span_610](end_span)
        document.getElementById('new-promo-code').value = '';[span_611](start_span)[span_611](end_span)
        document.getElementById('new-promo-days').value = '';[span_612](start_span)[span_612](end_span)
    } catch(e) {
        showToast("Ошибка создания промокода");[span_613](start_span)[span_613](end_span)
    }
}

async function checkAdminStatus(tgId) {
    try {
        const cfgRes = await db(`bot_config?key=eq.ADMIN_IDS`);[span_614](start_span)[span_614](end_span)
        if (cfgRes && cfgRes.length > 0) {[span_615](start_span)[span_615](end_span)
            adminIds = cfgRes[0].value.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));[span_616](start_span)[span_616](end_span)
        }
        if (!adminIds.includes(SUPER_ADMIN_ID)) adminIds.push(SUPER_ADMIN_ID);[span_617](start_span)[span_617](end_span)

        const isAdmin = adminIds.includes(tgId);[span_618](start_span)[span_618](end_span)
        document.getElementById('admin-panel').style.display = isAdmin ? 'block' : 'none';[span_619](start_span)[span_619](end_span)[span_620](start_span)[span_620](end_span)
        document.getElementById('nav-btn-admin').style.display = isAdmin ? 'flex' : 'none';[span_621](start_span)[span_621](end_span)[span_622](start_span)[span_622](end_span)
        if (isAdmin) {
            loadActiveUsersForAdmin();[span_623](start_span)[span_623](end_span)
            loadAdminConfigValues();[span_624](start_span)[span_624](end_span)
        }
    } catch(e) {}
}

async function loadAdminConfigValues() {
    try {
        const configs = await db(`bot_config`);[span_625](start_span)[span_625](end_span)
        if (!configs) return;[span_626](start_span)[span_626](end_span)
        configs.forEach(item => {[span_627](start_span)[span_627](end_span)
            if (item.key === 'PRICE_MONTH') document.getElementById('cfg-inp-month').value = item.value;[span_628](start_span)[span_628](end_span)[span_629](start_span)[span_629](end_span)
            if (item.key === 'PRICE_FOREVER') document.getElementById('cfg-inp-forever').value = item.value;[span_630](start_span)[span_630](end_span)[span_631](start_span)[span_631](end_span)
            if (item.key === 'BYBIT_UID') document.getElementById('cfg-inp-uid').value = item.value;[span_632](start_span)[span_632](end_span)[span_633](start_span)[span_633](end_span)
            if (item.key === 'TRIAL_DAYS') document.getElementById('cfg-inp-trial').value = item.value;[span_634](start_span)[span_634](end_span)[span_635](start_span)[span_635](end_span)
            if (item.key === 'REF_BONUS_DAYS') document.getElementById('cfg-inp-ref').value = item.value;[span_636](start_span)[span_636](end_span)[span_637](start_span)[span_637](end_span)
            if (item.key === 'ADMIN_IDS') document.getElementById('cfg-inp-admin-ids').value = item.value;[span_638](start_span)[span_638](end_span)[span_639](start_span)[span_639](end_span)
        });
    } catch(e) {}
}

async function saveAdminConfig() {
    haptic('medium');[span_640](start_span)[span_640](end_span)
    try {
        await Promise.all([
            db(`bot_config?key=eq.PRICE_MONTH`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-month').value }) }),[span_641](start_span)[span_641](end_span)
            db(`bot_config?key=eq.PRICE_FOREVER`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-forever').value }) }),[span_642](start_span)[span_642](end_span)
            db(`bot_config?key=eq.BYBIT_UID`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-uid').value }) }),[span_643](start_span)[span_643](end_span)
            db(`bot_config?key=eq.TRIAL_DAYS`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-trial').value }) }),[span_644](start_span)[span_644](end_span)
            db(`bot_config?key=eq.REF_BONUS_DAYS`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-ref').value }) }),[span_645](start_span)[span_645](end_span)
            db(`bot_config?key=eq.ADMIN_IDS`, { method: 'PATCH', body: JSON.stringify({ value: document.getElementById('cfg-inp-admin-ids').value }) })[span_646](start_span)[span_646](end_span)
        ]);
        showToast("✅ Конфигурация сохранена!");[span_647](start_span)[span_647](end_span)
    } catch(e) {
        showToast("Ошибка сохранения");[span_648](start_span)[span_648](end_span)
    }
}

/* ====================================================
   ПРОВЕРКА И ОФОРМЛЕНИЕ ПОДПИСКИ
==================================================== */
function checkSubscription() {
    const badgeEl = document.getElementById('disp-tier-badge');[span_649](start_span)[span_649](end_span)
    if (!currentUser) return false;[span_650](start_span)[span_650](end_span)

    if (currentUser.is_banned) {
        if (badgeEl) {
            badgeEl.className = 'sub-tier-badge tier-expired';[span_651](start_span)[span_651](end_span)[span_652](start_span)[span_652](end_span)
            badgeEl.innerText = '⛔️ Banned';[span_653](start_span)[span_653](end_span)
        }
        document.getElementById('paywall').style.display = 'block';[span_654](start_span)[span_654](end_span)[span_655](start_span)[span_655](end_span)
        return false;[span_656](start_span)[span_656](end_span)
    }

    if (!currentUser.sub_end) {
        if (badgeEl) {
            badgeEl.className = 'sub-tier-badge tier-expired';[span_657](start_span)[span_657](end_span)[span_658](start_span)[span_658](end_span)
            badgeEl.innerText = '❌ Нет подписки';[span_659](start_span)[span_659](end_span)
        }
        document.getElementById('paywall').style.display = 'block';[span_660](start_span)[span_660](end_span)[span_661](start_span)[span_661](end_span)
        return false;[span_662](start_span)[span_662](end_span)
    }

    const now = new Date();[span_663](start_span)[span_663](end_span)
    const end = new Date(currentUser.sub_end);[span_664](start_span)[span_664](end_span)
    if (end < now) {
        if (badgeEl) {
            badgeEl.className = 'sub-tier-badge tier-expired';[span_665](start_span)[span_665](end_span)[span_666](start_span)[span_666](end_span)
            badgeEl.innerText = '⏳ Подписка истекла';[span_667](start_span)[span_667](end_span)
        }
        document.getElementById('paywall').style.display = 'block';[span_668](start_span)[span_668](end_span)[span_669](start_span)[span_669](end_span)
        return false;[span_670](start_span)[span_670](end_span)
    }

    document.getElementById('paywall').style.display = 'none';[span_671](start_span)[span_671](end_span)[span_672](start_span)[span_672](end_span)
    if (badgeEl) {
        if (end.getFullYear() > 2099) {
            badgeEl.className = 'sub-tier-badge tier-vip';[span_673](start_span)[span_673](end_span)[span_674](start_span)[span_674](end_span)
            badgeEl.innerText = '💎 VIP Навсегда';[span_675](start_span)[span_675](end_span)
        } else {
            badgeEl.className = 'sub-tier-badge tier-month';[span_676](start_span)[span_676](end_span)[span_677](start_span)[span_677](end_span)
            badgeEl.innerText = `⚡️ Премиум до ${end.toLocaleDateString()}`;[span_678](start_span)[span_678](end_span)
        }
    }
    return true;[span_679](start_span)[span_679](end_span)
}

/* ====================================================
   ОДИНОЧНЫЕ ОРДЕРА
==================================================== */
let currentType = 'buy';[span_680](start_span)[span_680](end_span)
let calcMode = 'fiat';[span_681](start_span)[span_681](end_span)

function setTradeType(type) {
    haptic('light');[span_682](start_span)[span_682](end_span)
    currentType = type;[span_683](start_span)[span_683](end_span)
    document.getElementById('btn-buy').className = `switch-btn ${type === 'buy' ? 'active buy' : ''}`;[span_684](start_span)[span_684](end_span)[span_685](start_span)[span_685](end_span)
    document.getElementById('btn-sell').className = `switch-btn ${type === 'sell' ? 'active sell' : ''}`;[span_686](start_span)[span_686](end_span)[span_687](start_span)[span_687](end_span)
    const btn = document.getElementById('btn-save');[span_688](start_span)[span_688](end_span)
    btn.className = `action-btn ${type === 'sell' ? 'sell-mode' : ''}`;[span_689](start_span)[span_689](end_span)[span_690](start_span)[span_690](end_span)
    checkTradeInputs();[span_691](start_span)[span_691](end_span)
}

function setCalcMode(mode) {
    haptic('light');[span_692](start_span)[span_692](end_span)
    calcMode = mode;[span_693](start_span)[span_693](end_span)
    document.getElementById('tab-mode-fiat').className = `p-tab ${mode === 'fiat' ? 'active' : ''}`;[span_694](start_span)[span_694](end_span)[span_695](start_span)[span_695](end_span)
    document.getElementById('tab-mode-crypto').className = `p-tab ${mode === 'crypto' ? 'active' : ''}`;[span_696](start_span)[span_696](end_span)[span_697](start_span)[span_697](end_span)
    const sym = getCurrencySymbol();[span_698](start_span)[span_698](end_span)
    document.getElementById('lbl-amount').innerHTML = mode === 'fiat' ? `Сумма фиата (<span class="sym">${sym}</span>)` : `Объем USDT (🪙)`;[span_699](start_span)[span_699](end_span)
    checkTradeInputs();[span_700](start_span)[span_700](end_span)
}

function checkTradeInputs() {
    const amount = parseFloat(document.getElementById('inp-amount')?.value);[span_701](start_span)[span_701](end_span)
    const rate = parseFloat(document.getElementById('inp-rate')?.value);[span_702](start_span)[span_702](end_span)
    const btn = document.getElementById('btn-save');[span_703](start_span)[span_703](end_span)
    const prev = document.getElementById('trade-preview');[span_704](start_span)[span_704](end_span)
    const prevText = document.getElementById('preview-text');[span_705](start_span)[span_705](end_span)
    const prevResult = document.getElementById('preview-result');[span_706](start_span)[span_706](end_span)

    if (amount > 0 && rate > 0) {
        const sym = getCurrencySymbol();[span_707](start_span)[span_707](end_span)
        prev.style.display = 'block';[span_708](start_span)[span_708](end_span)
        let fiat = 0, crypto = 0;[span_709](start_span)[span_709](end_span)

        if (calcMode === 'fiat') {
            fiat = amount;[span_710](start_span)[span_710](end_span)
            crypto = fiat / rate;[span_711](start_span)[span_711](end_span)
            prevText.innerText = "Расчетный объем USDT:";[span_712](start_span)[span_712](end_span)
            prevResult.innerText = `${crypto.toFixed(2)} USDT`;[span_713](start_span)[span_713](end_span)
        } else {
            crypto = amount;[span_714](start_span)[span_714](end_span)
            fiat = crypto * rate;[span_715](start_span)[span_715](end_span)
            prevText.innerText = "Расчетный фиат:";[span_716](start_span)[span_716](end_span)
            prevResult.innerText = `${fiat.toFixed(2)} ${sym}`;[span_717](start_span)[span_717](end_span)
        }
        btn.innerText = `СОХРАНИТЬ ${currentType === 'buy' ? 'ПОКУПКУ' : 'ПРОДАЖУ'}: ${fiat.toFixed(2)} ${sym}`;[span_718](start_span)[span_718](end_span)
        btn.style.display = 'block';[span_719](start_span)[span_719](end_span)
    } else {
        if (prev) prev.style.display = 'none';[span_720](start_span)[span_720](end_span)
        if (btn) btn.style.display = 'none';[span_721](start_span)[span_721](end_span)
    }
}

document.getElementById('inp-amount')?.addEventListener('input', checkTradeInputs);[span_722](start_span)[span_722](end_span)
document.getElementById('inp-rate')?.addEventListener('input', checkTradeInputs);[span_723](start_span)[span_723](end_span)

async function saveTrade() {
    if (!requireSubscription()) return;

    const amount = parseFloat(document.getElementById('inp-amount').value);[span_724](start_span)[span_724](end_span)
    const rate = parseFloat(document.getElementById('inp-rate').value);[span_725](start_span)[span_725](end_span)
    const cardId = document.getElementById('inp-card-sel').value || null;[span_726](start_span)[span_726](end_span)
    if (!amount || !rate || amount <= 0 || rate <= 0) return;[span_727](start_span)[span_727](end_span)

    let fiat = calcMode === 'fiat' ? amount : parseFloat((amount * rate).toFixed(2));[span_728](start_span)[span_728](end_span)
    let crypto = calcMode === 'fiat' ? parseFloat((amount / rate).toFixed(2)) : amount;[span_729](start_span)[span_729](end_span)

    await db(`trades`, {[span_730](start_span)[span_730](end_span)
        method: 'POST',[span_731](start_span)[span_731](end_span)
        body: JSON.stringify({[span_732](start_span)[span_732](end_span)
            tg_id: currentUser.tg_id,[span_733](start_span)[span_733](end_span)
            type: currentType,[span_734](start_span)[span_734](end_span)
            crypto_amount: crypto,[span_735](start_span)[span_735](end_span)
            rate: rate,[span_736](start_span)[span_736](end_span)
            fiat_amount: fiat,[span_737](start_span)[span_737](end_span)
            card_id: cardId ? parseInt(cardId) : null[span_738](start_span)[span_738](end_span)
        })
    });

    playCashSound();[span_739](start_span)[span_739](end_span)
    document.getElementById('inp-amount').value = '';[span_740](start_span)[span_740](end_span)
    document.getElementById('inp-rate').value = '';[span_741](start_span)[span_741](end_span)
    checkTradeInputs();[span_742](start_span)[span_742](end_span)
    showToast("✅ Сделка сохранена!");[span_743](start_span)[span_743](end_span)
    haptic('success');[span_744](start_span)[span_744](end_span)
    await refreshData();[span_745](start_span)[span_745](end_span)
    renderAll();[span_746](start_span)[span_746](end_span)
    handleNavClick('dashboard', document.querySelector('.nav-btn[data-target="dashboard"]'));[span_747](start_span)[span_747](end_span)
}

function openNewCardModal() {
    if (!requireSubscription()) return;
    haptic('light');[span_748](start_span)[span_748](end_span)
    document.getElementById('modal-card-create').classList.add('show');[span_749](start_span)[span_749](end_span)
}

async function submitCreateCard() {
    if (!requireSubscription()) return;

    const name = document.getElementById('new-card-name').value.trim();[span_750](start_span)[span_750](end_span)
    const num = document.getElementById('new-card-num').value.trim();[span_751](start_span)[span_751](end_span)
    const holder = document.getElementById('new-card-holder').value.trim();[span_752](start_span)[span_752](end_span)
    const limit = parseFloat(document.getElementById('new-card-limit').value) || null;[span_753](start_span)[span_753](end_span)
    const monthLimit = parseFloat(document.getElementById('new-card-month-limit').value) || null;

    if (!name) return showToast("⚠️ Введите название карты!");[span_754](start_span)[span_754](end_span)

    await db(`cards`, {[span_755](start_span)[span_755](end_span)
        method: 'POST',[span_756](start_span)[span_756](end_span)
        body: JSON.stringify({[span_757](start_span)[span_757](end_span)
            tg_id: currentUser.tg_id,[span_758](start_span)[span_758](end_span)
            card_name: name,[span_759](start_span)[span_759](end_span)
            card_number: num,[span_760](start_span)[span_760](end_span)
            holder_name: holder,[span_761](start_span)[span_761](end_span)
            buy_limit: limit,[span_762](start_span)[span_762](end_span)
            month_limit: monthLimit,
            color_accent: '#f3a600',[span_763](start_span)[span_763](end_span)
            status: 'active[span_764](start_span)'[span_764](end_span)
        })
    });
    closeModals();[span_765](start_span)[span_765](end_span)
    showToast("✅ Карта создана!");
    await refreshData();[span_766](start_span)[span_766](end_span)
    renderAll();[span_767](start_span)[span_767](end_span)
}

function openCardOpModal(cid, type) {
    if (!requireSubscription()) return;
    haptic('light');[span_768](start_span)[span_768](end_span)
    activeCardId = cid;[span_769](start_span)[span_769](end_span)
    activeOpType = type;[span_770](start_span)[span_770](end_span)
    document.getElementById('modal-op-title').innerText = type === 'deposit' ? '➕ Пополнение кассы' : '➖ Снятие наличных';[span_771](start_span)[span_771](end_span)
    document.getElementById('modal-op-btn').innerText = type === 'deposit' ? 'Внести' : 'Списать';[span_772](start_span)[span_772](end_span)
    document.getElementById('withdraw-limit-toggle-wrap').style.display = type === 'withdraw' ? 'flex' : 'none';[span_773](start_span)[span_773](end_span)
    document.getElementById('modal-card-op').classList.add('show');[span_774](start_span)[span_774](end_span)
}

async function submitCardOp() {
    if (!requireSubscription()) return;

    const amt = parseFloat(document.getElementById('card-op-amount').value);[span_775](start_span)[span_775](end_span)
    const comm = document.getElementById('card-op-comment').value.trim();[span_776](start_span)[span_776](end_span)
    const inLimit = document.getElementById('chk-op-in-limit').checked;[span_777](start_span)[span_777](end_span)
    if (!amt || amt <= 0) return showToast("⚠️ Введите сумму!");[span_778](start_span)[span_778](end_span)

    await db(`card_operations`, {[span_779](start_span)[span_779](end_span)
        method: 'POST',[span_780](start_span)[span_780](end_span)
        body: JSON.stringify({[span_781](start_span)[span_781](end_span)
            card_id: activeCardId,[span_782](start_span)[span_782](end_span)
            tg_id: currentUser.tg_id,[span_783](start_span)[span_783](end_span)
            type: activeOpType,[span_784](start_span)[span_784](end_span)
            amount: amt,[span_785](start_span)[span_785](end_span)
            comment: comm,[span_786](start_span)[span_786](end_span)
            count_in_limit: activeOpType === 'withdraw' ? inLimit : false[span_787](start_span)[span_787](end_span)
        })
    });
    closeModals();[span_788](start_span)[span_788](end_span)
    showToast("✅ Записано в кассу!");
    await refreshData();[span_789](start_span)[span_789](end_span)
    renderCards();[span_790](start_span)[span_790](end_span)
}

function populateCardSelects() {
    const sel1 = document.getElementById('inp-card-sel');[span_791](start_span)[span_791](end_span)
    const sel2 = document.getElementById('modal-card-sel');[span_792](start_span)[span_792](end_span)
    const selCalc = document.getElementById('calc-card-sel');[span_793](start_span)[span_793](end_span)

    const opts = `<option value="">Без привязки к карте</option>` + userCards.map(c => `<option value="${c.id}">${c.card_name}</option>`).join('');[span_794](start_span)[span_794](end_span)
    if (sel1) sel1.innerHTML = opts;[span_795](start_span)[span_795](end_span)
    if (sel2) sel2.innerHTML = opts;[span_796](start_span)[span_796](end_span)
    if (selCalc) selCalc.innerHTML = opts;[span_797](start_span)[span_797](end_span)
}

function openHelpModal(key, event) {
    if (event) event.stopPropagation();[span_798](start_span)[span_798](end_span)
    haptic('light');[span_799](start_span)[span_799](end_span)
    const item = HELP_DATA[key];[span_800](start_span)[span_800](end_span)
    if (!item) return;[span_801](start_span)[span_801](end_span)
    document.getElementById('info-modal-title').innerText = item.title;[span_802](start_span)[span_802](end_span)
    document.getElementById('info-modal-content').innerHTML = item.text;[span_803](start_span)[span_803](end_span)
    document.getElementById('modal-info').classList.add('show');[span_804](start_span)[span_804](end_span)
}

function openSubModal() {
    haptic('light');[span_805](start_span)[span_805](end_span)
    document.getElementById('modal-sub-info').classList.add('show');[span_806](start_span)[span_806](end_span)
}

function closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('show'));[span_807](start_span)[span_807](end_span)
}

function showToast(msg) {
    const t = document.getElementById('toast');[span_808](start_span)[span_808](end_span)
    if (!t) return;[span_809](start_span)[span_809](end_span)
    t.innerText = msg;[span_810](start_span)[span_810](end_span)
    t.classList.add('show');[span_811](start_span)[span_811](end_span)[span_812](start_span)[span_812](end_span)
    setTimeout(() => t.classList.remove('show'), 2400);[span_813](start_span)[span_813](end_span)[span_814](start_span)[span_814](end_span)
}

function haptic(type) {
    try {
        if (tg?.HapticFeedback) {[span_815](start_span)[span_815](end_span)
            if (type === 'light' || type === 'medium') tg.HapticFeedback.impactOccurred(type);[span_816](start_span)[span_816](end_span)
            if (type === 'success') tg.HapticFeedback.notificationOccurred('success');[span_817](start_span)[span_817](end_span)
        }
    } catch(e) {}
}

function copyRefLink() {
    haptic('light');[span_818](start_span)[span_818](end_span)
    const link = document.getElementById('ref-link-box').innerText;[span_819](start_span)[span_819](end_span)
    navigator.clipboard.writeText(link);[span_820](start_span)[span_820](end_span)
    showToast("Партнерская ссылка скопирована!");[span_821](start_span)[span_821](end_span)
}

function shareRefLink() {
    haptic('light');[span_822](start_span)[span_822](end_span)
    const link = document.getElementById('ref-link-box').innerText;[span_823](start_span)[span_823](end_span)
    if (tg?.openTelegramLink) {[span_824](start_span)[span_824](end_span)
        tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent('P2P Terminal Pro — Enterprise Ledger & WAC:')}`);[span_825](start_span)[span_825](end_span)
    }
}

function openSupport() {
    const url = "https://t.me/P2P_Rbot";[span_826](start_span)[span_826](end_span)
    if (tg?.openTelegramLink) tg.openTelegramLink(url);[span_827](start_span)[span_827](end_span)
    else window.open(url, '_blank');[span_828](start_span)[span_828](end_span)
}

/* ====================================================
   РЕЖИМЫ И НАВИГАЦИЯ
==================================================== */
function switchLayoutMode(isChecked) {
    haptic('medium');[span_829](start_span)[span_829](end_span)
    layoutMode = isChecked ? 'feed' : 'pages';[span_830](start_span)[span_830](end_span)
    localStorage.setItem('p2p_layout_mode', layoutMode);[span_831](start_span)[span_831](end_span)

    const desc = document.getElementById('layout-mode-desc');[span_832](start_span)[span_832](end_span)
    if (desc) desc.innerText = isChecked ? "Сплошная лента (скролл)" : "По раздельности (вкладки)";[span_833](start_span)[span_833](end_span)

    document.querySelectorAll('.page-section').forEach(sec => {[span_834](start_span)[span_834](end_span)
        if (sec.id !== 'admin-panel' && sec.id !== 'paywall') {[span_835](start_span)[span_835](end_span)
            sec.style.display = layoutMode === 'feed' ? 'block' : 'none';[span_836](start_span)[span_836](end_span)
        }
    });

    if (layoutMode !== 'feed') {
        document.getElementById('dashboard').style.display = 'block';[span_837](start_span)[span_837](end_span)
    }
    showToast(isChecked ? "📜 Режим ленты включен" : "📱 Режим вкладок включен");[span_838](start_span)[span_838](end_span)
}

function switchUiMode(isChecked) {
    haptic('medium');[span_839](start_span)[span_839](end_span)
    uiMode = isChecked ? 'fx' : 'simple';[span_840](start_span)[span_840](end_span)
    localStorage.setItem('p2p_ui_mode', uiMode);[span_841](start_span)[span_841](end_span)
    document.body.className = uiMode === 'fx' ? 'mode-fx' : 'mode-simple';[span_842](start_span)[span_842](end_span)[span_843](start_span)[span_843](end_span)

    const desc = document.getElementById('ui-mode-desc');[span_844](start_span)[span_844](end_span)
    if (desc) desc.innerText = isChecked ? "Полный FX (3D эффекты и фон)" : "Минимализм (OLED черный, без анимаций)";[span_845](start_span)[span_845](end_span)

    applyIncognito();[span_846](start_span)[span_846](end_span)
    showToast(isChecked ? "🌟 Полный FX активирован" : "⚡️ Минимализм включен");[span_847](start_span)[span_847](end_span)
}

function handleNavClick(targetId, el) {
    haptic('light');[span_848](start_span)[span_848](end_span)
    if (layoutMode === 'feed') {
        const target = document.getElementById(targetId);[span_849](start_span)[span_849](end_span)
        if (target) {
            target.classList.add('revealed');[span_850](start_span)[span_850](end_span)
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });[span_851](start_span)[span_851](end_span)
        }
    } else {
        document.querySelectorAll('.page-section').forEach(sec => sec.style.display = 'none');[span_852](start_span)[span_852](end_span)
        const target = document.getElementById(targetId);[span_853](start_span)[span_853](end_span)
        if (target) {
            target.style.display = 'block';[span_854](start_span)[span_854](end_span)
            target.classList.add('revealed');[span_855](start_span)[span_855](end_span)
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });[span_856](start_span)[span_856](end_span)
    }
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));[span_857](start_span)[span_857](end_span)
    if (el) el.classList.add('active');[span_858](start_span)[span_858](end_span)

    // При возврате на экран сводки календарь возвращается на текущий месяц
    if (targetId === 'dashboard') {
        calViewDate = new Date();
        if (isHeatmapOpen) renderHeatmap();
    }
}

function toggleSecondaryStats() {
    haptic('light');[span_859](start_span)[span_859](end_span)
    isSecondaryExpanded = !isSecondaryExpanded;[span_860](start_span)[span_860](end_span)
    const wrap = document.getElementById('secondary-stats-wrap');[span_861](start_span)[span_861](end_span)
    const txt = document.getElementById('txt-toggle-details');[span_862](start_span)[span_862](end_span)
    const arrow = document.getElementById('toggle-arrow');[span_863](start_span)[span_863](end_span)
    const dict = I18N[currentLang] || I18N.ru;[span_864](start_span)[span_864](end_span)

    if (wrap) wrap.style.display = isSecondaryExpanded ? 'block' : 'none';[span_865](start_span)[span_865](end_span)
    if (txt) txt.innerText = isSecondaryExpanded ? dict.hideSecondary : dict.showSecondary;[span_866](start_span)[span_866](end_span)
    if (arrow) arrow.innerText = isSecondaryExpanded ? '▴' : '▾';[span_867](start_span)[span_867](end_span)
}

function setPeriod(p, el) {
    haptic('light');[span_868](start_span)[span_868](end_span)
    currentPeriod = p;[span_869](start_span)[span_869](end_span)
    document.querySelectorAll('.period-tabs .p-tab').forEach(t => t.classList.remove('active'));[span_870](start_span)[span_870](end_span)
    if (el) el.classList.add('active');[span_871](start_span)[span_871](end_span)
    document.getElementById('custom-date-panel').style.display = 'none';[span_872](start_span)[span_872](end_span)
    calculateStats();[span_873](start_span)[span_873](end_span)
}

function toggleCustomDatePanel(el) {
    haptic('light');[span_874](start_span)[span_874](end_span)
    const panel = document.getElementById('custom-date-panel');[span_875](start_span)[span_875](end_span)
    panel.style.display = (panel.style.display === 'none' || !panel.style.display) ? 'block' : 'none';[span_876](start_span)[span_876](end_span)
}

function setQuickPreset(days) {
    haptic('light');[span_877](start_span)[span_877](end_span)
    const now = new Date();[span_878](start_span)[span_878](end_span)
    const from = new Date(now);[span_879](start_span)[span_879](end_span)
    from.setDate(now.getDate() - days);[span_880](start_span)[span_880](end_span)
    const pad = n => String(n).padStart(2, '0');[span_881](start_span)[span_881](end_span)
    document.getElementById('custom-date-from').value = `${from.getFullYear()}-${pad(from.getMonth() + 1)}-${pad(from.getDate())}`;[span_882](start_span)[span_882](end_span)
    document.getElementById('custom-date-to').value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;[span_883](start_span)[span_883](end_span)
    applyCustomDateFilter();[span_884](start_span)[span_884](end_span)
}

function applyCustomDateFilter() {
    const fVal = document.getElementById('custom-date-from').value;[span_885](start_span)[span_885](end_span)
    const tVal = document.getElementById('custom-date-to').value;[span_886](start_span)[span_886](end_span)
    if (!fVal || !tVal) return showToast("⚠️ Укажите обе даты!");[span_887](start_span)[span_887](end_span)
    customStartDate = new Date(fVal + "T00:00:00");[span_888](start_span)[span_888](end_span)
    customEndDate = new Date(tVal + "T23:59:59");[span_889](start_span)[span_889](end_span)
    currentPeriod = 'custom';[span_890](start_span)[span_890](end_span)
    document.querySelectorAll('.period-tabs .p-tab').forEach(t => t.classList.remove('active'));[span_891](start_span)[span_891](end_span)
    document.getElementById('tab-custom').classList.add('active');[span_892](start_span)[span_892](end_span)
    calculateStats();[span_893](start_span)[span_893](end_span)
    showToast("📅 Период применен!");
}

async function submitPromoCode() {
    const input = document.getElementById('inp-promocode');[span_894](start_span)[span_894](end_span)
    const code = input?.value?.trim()?.toUpperCase();[span_895](start_span)[span_895](end_span)
    if (!code) return showToast("⚠️ Введите промокод");[span_896](start_span)[span_896](end_span)

    haptic('medium');[span_897](start_span)[span_897](end_span)
    try {
        const promos = await db(`promocodes?code=eq.${code}`);[span_898](start_span)[span_898](end_span)
        if (!promos || promos.length === 0) return showToast("❌ Промокод не найден");[span_899](start_span)[span_899](end_span)

        const promo = promos[0];[span_900](start_span)[span_900](end_span)
        if (promo.used_count >= promo.max_activations) return showToast("❌ Лимит исчерпан");[span_901](start_span)[span_901](end_span)

        const now = new Date();[span_902](start_span)[span_902](end_span)
        let end = currentUser.sub_end ? new Date(currentUser.sub_end) : now;[span_903](start_span)[span_903](end_span)
        if (end < now) end = now;[span_904](start_span)[span_904](end_span)
        end.setDate(end.getDate() + promo.days);[span_905](start_span)[span_905](end_span)

        await Promise.all([
            db(`users?tg_id=eq.${currentUser.tg_id}`, {[span_906](start_span)[span_906](end_span)
                method: 'PATCH',[span_907](start_span)[span_907](end_span)
                body: JSON.stringify({ sub_end: end.toISOString() })[span_908](start_span)[span_908](end_span)
            }),
            db(`promocodes?code=eq.${code}`, {[span_909](start_span)[span_909](end_span)
                method: 'PATCH',[span_910](start_span)[span_910](end_span)
                body: JSON.stringify({ used_count: promo.used_count + 1 })[span_911](start_span)[span_911](end_span)
            })
        ]);

        haptic('success');[span_912](start_span)[span_912](end_span)
        showToast(`🎁 Активировано +${promo.days} дн.!`);[span_913](start_span)[span_913](end_span)
        input.value = '';[span_914](start_span)[span_914](end_span)
        await refreshData();[span_915](start_span)[span_915](end_span)
        checkSubscription();[span_916](start_span)[span_916](end_span)
    } catch(e) {
        showToast("❌ Ошибка активации промокода");[span_917](start_span)[span_917](end_span)
    }
}

/* ====================================================
   ОТРИСОВКА И СИНХРОНИЗАЦИЯ
==================================================== */
function renderAll() {
    updateAllCurrencySymbols();[span_918](start_span)[span_918](end_span)
    calculateStats();[span_919](start_span)[span_919](end_span)
    renderCards();[span_920](start_span)[span_920](end_span)
    renderHistory();[span_921](start_span)[span_921](end_span)
    populateCardSelects();[span_922](start_span)[span_922](end_span)
    applyIncognito();[span_923](start_span)[span_923](end_span)
}

async function refreshData() {
    if (!currentUser) return;[span_924](start_span)[span_924](end_span)
    const [u, c, t, o] = await Promise.all([
        db(`users?tg_id=eq.${currentUser.tg_id}`),[span_925](start_span)[span_925](end_span)
        db(`cards?tg_id=eq.${currentUser.tg_id}&order=created_at.asc`),[span_926](start_span)[span_926](end_span)
        db(`trades?tg_id=eq.${currentUser.tg_id}&order=date.desc`),[span_927](start_span)[span_927](end_span)
        db(`card_operations?tg_id=eq.${currentUser.tg_id}`)[span_928](start_span)[span_928](end_span)
    ]);
    if (u && u.length > 0) currentUser = u[0];[span_929](start_span)[span_929](end_span)
    userCards = c || [];[span_930](start_span)[span_930](end_span)
    userTrades = t || [];[span_931](start_span)[span_931](end_span)
    cardOps = o || [];[span_932](start_span)[span_932](end_span)
}

/* ====================================================
   ЗАГРУЗЧИК (FAIL-SAFE)
==================================================== */
function runTerminalBootSequence(onComplete) {
    const stream = document.getElementById('console-stream');[span_933](start_span)[span_933](end_span)
    const pBar = document.getElementById('boot-progress-bar');[span_934](start_span)[span_934](end_span)
    const pPct = document.getElementById('boot-pct');[span_935](start_span)[span_935](end_span)

    const logs = [
        "<span class='c-green'>[INIT]</span> Loading Cryptographic Ledger...",
        "<span class='c-gold'>[AUTH]</span> Verifying Telegram Mini App Handshake...",
        "<span class='c-blue'>[DB]</span> Connecting to Encrypted Supabase Node...",
        "<span class='c-green'>[LEDGER]</span> Synchronizing WAC Engine & Cards...",
        "<span class='c-gold'>[READY]</span> Terminal Pro v8.3.0 Ready."
    ];

    let step = 0;[span_936](start_span)[span_936](end_span)
    const interval = setInterval(() => {
        if (!stream) {
            clearInterval(interval);[span_937](start_span)[span_937](end_span)
            if (onComplete) onComplete();[span_938](start_span)[span_938](end_span)
            return;[span_939](start_span)[span_939](end_span)
        }

        if (step < logs.length) {
            const line = document.createElement('div');[span_940](start_span)[span_940](end_span)
            line.className = 'console-line visible';[span_941](start_span)[span_941](end_span)[span_942](start_span)[span_942](end_span)
            line.innerHTML = logs[step];[span_943](start_span)[span_943](end_span)
            stream.appendChild(line);[span_944](start_span)[span_944](end_span)

            const pct = Math.round(((step + 1) / logs.length) * 100);[span_945](start_span)[span_945](end_span)
            if (pBar) pBar.style.width = `${pct}%`;[span_946](start_span)[span_946](end_span)
            if (pPct) pPct.innerText = `${pct}%`;[span_947](start_span)[span_947](end_span)
            step++;[span_948](start_span)[span_948](end_span)
        } else {
            clearInterval(interval);[span_949](start_span)[span_949](end_span)
            setTimeout(() => {
                if (onComplete) onComplete();[span_950](start_span)[span_950](end_span)
            }, 200);
        }
    }, 100);
}

function forceHideLoader() {
    const loader = document.getElementById('terminal-boot-loader');[span_951](start_span)[span_951](end_span)
    if (loader) {
        loader.classList.add('fade-out');[span_952](start_span)[span_952](end_span)[span_953](start_span)[span_953](end_span)
        setTimeout(() => { loader.style.display = 'none'; }, 350);[span_954](start_span)[span_954](end_span)
    }
    const container = document.querySelector('.container');[span_955](start_span)[span_955](end_span)
    const nav = document.querySelector('.bottom-nav');[span_956](start_span)[span_956](end_span)
    if (container) container.style.display = 'block';[span_957](start_span)[span_957](end_span)
    if (nav) nav.style.display = 'flex';[span_958](start_span)[span_958](end_span)
}

/* ====================================================
   ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
==================================================== */
async function init() {
    document.body.className = uiMode === 'fx' ? 'mode-fx' : 'mode-simple';[span_959](start_span)[span_959](end_span)[span_960](start_span)[span_960](end_span)
    const toggleUi = document.getElementById('toggle-ui-mode');[span_961](start_span)[span_961](end_span)
    if (toggleUi) toggleUi.checked = (uiMode === 'fx');[span_962](start_span)[span_962](end_span)

    const toggleLayout = document.getElementById('toggle-layout-mode');[span_963](start_span)[span_963](end_span)
    if (toggleLayout) toggleLayout.checked = (layoutMode === 'feed');[span_964](start_span)[span_964](end_span)

    const toggleSound = document.getElementById('toggle-sound-mode');[span_965](start_span)[span_965](end_span)
    if (toggleSound) toggleSound.checked = soundEnabled;[span_966](start_span)[span_966](end_span)

    const setLangSel = document.getElementById('set-lang');[span_967](start_span)[span_967](end_span)
    if (setLangSel) setLangSel.value = currentLang;[span_968](start_span)[span_968](end_span)

    applyLanguage(currentLang);[span_969](start_span)[span_969](end_span)
    applyIncognito();[span_970](start_span)[span_970](end_span)

    const failsafeTimeout = setTimeout(() => {
        forceHideLoader();[span_971](start_span)[span_971](end_span)
        renderAll();[span_972](start_span)[span_972](end_span)
    }, 2200);[span_973](start_span)[span_973](end_span)

    const tgUser = tg?.initDataUnsafe?.user;[span_974](start_span)[span_974](end_span)
    const startParam = tg?.initDataUnsafe?.start_param || null;

    runTerminalBootSequence(async () => {
        if (!tgUser || !tgUser.id) {
            clearTimeout(failsafeTimeout);[span_975](start_span)[span_975](end_span)
            document.getElementById('terminal-boot-loader').style.display = 'none';[span_976](start_span)[span_976](end_span)[span_977](start_span)[span_977](end_span)
            document.getElementById('restricted-screen').style.display = 'flex';[span_978](start_span)[span_978](end_span)[span_979](start_span)[span_979](end_span)
            return;[span_980](start_span)[span_980](end_span)
        }

        try {
            let users = await db(`users?tg_id=eq.${tgUser.id}`);[span_981](start_span)[span_981](end_span)
            if (!users || users.length === 0) {
                // Исключение по ТЗ: реферер от админа 517..... или 1 / -1 игнорируется
                let cleanRefBy = null;
                if (startParam) {
                    const parsedRef = parseInt(startParam.trim());
                    if (!isNaN(parsedRef) && parsedRef !== SUPER_ADMIN_ID && parsedRef !== 1 && parsedRef !== -1) {
                        cleanRefBy = parsedRef;
                    }
                }

                const created = await db(`users`, {[span_982](start_span)[span_982](end_span)
                    method: 'POST',[span_983](start_span)[span_983](end_span)
                    body: JSON.stringify({[span_984](start_span)[span_984](end_span)
                        tg_id: tgUser.id,[span_985](start_span)[span_985](end_span)
                        username: tgUser.username,[span_986](start_span)[span_986](end_span)
                        first_name: tgUser.first_name,[span_987](start_span)[span_987](end_span)
                        currency: 'RUB',[span_988](start_span)[span_988](end_span)
                        tz_offset: 3,[span_989](start_span)[span_989](end_span)
                        ref_by: cleanRefBy
                    })
                });
                currentUser = created ? created[0] : { tg_id: tgUser.id };[span_990](start_span)[span_990](end_span)
            } else {
                currentUser = users[0];[span_991](start_span)[span_991](end_span)
            }

            const currSel = document.getElementById('set-currency');[span_992](start_span)[span_992](end_span)
            if (currSel && currentUser.currency) currSel.value = currentUser.currency;[span_993](start_span)[span_993](end_span)

            const tzSel = document.getElementById('set-tz');[span_994](start_span)[span_994](end_span)
            if (tzSel && currentUser.tz_offset) tzSel.value = String(currentUser.tz_offset);[span_995](start_span)[span_995](end_span)

            await refreshData();[span_996](start_span)[span_996](end_span)
            await checkAdminStatus(tgUser.id);[span_997](start_span)[span_997](end_span)
            await loadLiveSiteBanner();

            document.getElementById('disp-uid').innerText = currentUser.tg_id;[span_998](start_span)[span_998](end_span)[span_999](start_span)[span_999](end_span)
            document.getElementById('ref-link-box').innerText = `https://t.me/P2P_Rbot?start=${currentUser.tg_id}`;[span_1000](start_span)[span_1000](end_span)[span_1001](start_span)[span_1001](end_span)

        } catch(e) {
            console.error(e);[span_1002](start_span)[span_1002](end_span)
        } finally {
            clearTimeout(failsafeTimeout);[span_1003](start_span)[span_1003](end_span)
            forceHideLoader();[span_1004](start_span)[span_1004](end_span)
            renderAll();[span_1005](start_span)[span_1005](end_span)
            checkSubscription();[span_1006](start_span)[span_1006](end_span)
            runCalculator();[span_1007](start_span)[span_1007](end_span)
        }
    });
}

if (document.readyState === 'loading') {[span_1008](start_span)[span_1008](end_span)
    document.addEventListener('DOMContentLoaded', init);[span_1009](start_span)[span_1009](end_span)
} else {
    init();[span_1010](start_span)[span_1010](end_span)
}
