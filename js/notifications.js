/* =========================================
   KEDU WORLD — NOTIFICATIONS CONTROLLER
========================================= */

(function () {

    "use strict";


    /* =====================================
       STORAGE KEYS
    ===================================== */

    const NOTIFICATIONS_KEY =
        "kedu-world-notifications";


    const READ_NOTIFICATIONS_KEY =
        "kedu-world-read-notifications";


    /* =====================================
       GET STORED NOTIFICATIONS
    ===================================== */

    function getNotifications() {

        try {

            const stored =
                localStorage.getItem(
                    NOTIFICATIONS_KEY
                );


            return stored
                ? JSON.parse(stored)
                : [];

        }

        catch (error) {

            return [];

        }

    }


    /* =====================================
       SAVE NOTIFICATIONS
    ===================================== */

    function saveNotifications(
        notifications
    ) {

        localStorage.setItem(
            NOTIFICATIONS_KEY,
            JSON.stringify(
                notifications
            )
        );

    }


    /* =====================================
       GET READ NOTIFICATIONS
    ===================================== */

    function getReadNotifications() {

        try {

            const stored =
                localStorage.getItem(
                    READ_NOTIFICATIONS_KEY
                );


            return stored
                ? JSON.parse(stored)
                : [];

        }

        catch (error) {

            return [];

        }

    }


    /* =====================================
       SAVE READ NOTIFICATIONS
    ===================================== */

    function saveReadNotifications(
        readNotifications
    ) {

        localStorage.setItem(
            READ_NOTIFICATIONS_KEY,
            JSON.stringify(
                readNotifications
            )
        );

    }


    /* =====================================
       ESCAPE HTML
    ===================================== */

    function escapeHtml(
        value
    ) {

        const element =
            document.createElement(
                "div"
            );


        element.textContent =
            value || "";


        return element.innerHTML;

    }


    
    async function getAvailableApps() {

        if (
            !window.keduSupabase
        ) {

            return [];

        }


        try {

            const {
                data,
                error
            } =
                await window
                    .keduSupabase
                    .from(
                        "apps"
                    )
                    .select(
                        `
                        id,
                        app_name,
                        app_icon,
                        app_link,
                        created_at,
                        is_active
                        `
                    )
                    .order(
                        "created_at",
                        {
                            ascending: false
                        }
                    );


            if (
                error
            ) {

                throw error;

            }


            return (
                data || []
            )
                .filter(
                    function (
                        app
                    ) {

                        return Boolean(
                            app.app_name
                        );

                    }
                )
                .map(
                    function (
                        app
                    ) {

                        return {

                            id:
                                app.id,

                            name:
                                app.app_name ||
                                "KEDU App",

                            icon:
                                app.app_icon ||
                                "",

                            download:
                                app.app_link ||
                                "",

                            createdAt:
                                app.created_at
                                    ? new Date(
                                        app.created_at
                                    ).getTime()
                                    : Date.now()

                        };

                    }
                );

        }

        catch (
            error
        ) {

            console.error(
                "Unable to load apps for notifications:",
                error
            );


            return [];

        }
    }
    /* =====================================
       NOTIFICATIONS MEMORY
    ===================================== */

    let notificationsCache =
        [];


    /* =====================================
       GET NOTIFICATIONS
    ===================================== */

    function getNotifications() {

        return notificationsCache;

    }


    /* =====================================
       LOAD NOTIFICATIONS FROM SUPABASE
    ===================================== */

    async function loadNotifications() {

        if (
            !window.keduSupabase
        ) {

            notificationsCache =
                [];


            return notificationsCache;

        }


        try {

            const {
                data,
                error
            } =
                await window
                    .keduSupabase
                    .from(
                        "notifications"
                    )
                    .select(
                        `
                        id,
                        title,
                        message,
                        notification_type,
                        created_at,
                        updated_at
                        `
                    )
                    .order(
                        "created_at",
                        {
                            ascending:
                                false
                        }
                    );


            if (
                error
            ) {

                throw error;

            }


            notificationsCache =
                (
                    data ||
                    []
                )
                .map(
                    function (
                        notification
                    ) {

                        return {

                            id:
                                String(
                                    notification.id
                                ),

                            type:
                                notification
                                    .notification_type ||
                                "general",

                            appId:
                                null,

                            appName:
                                "KEDU",

                            icon:
                                "",

                            title:
                                notification.title ||
                                "Notification",

                            message:
                                notification.message ||
                                "",

                            createdAt:
                                notification.created_at
                                    ? new Date(
                                        notification.created_at
                                    ).getTime()
                                    : Date.now()

                        };

                    }
                );


            return notificationsCache;

        }

        catch (
            error
        ) {

            console.error(
                "Unable to load notifications:",
                error
            );


            notificationsCache =
                [];


            return notificationsCache;

        }

    }

    /* =====================================
       RENDER NOTIFICATIONS
    ===================================== */

    function renderNotifications() {

        const notificationList =
            document.getElementById(
                "notification-list"
            );


        const notificationEmpty =
            document.getElementById(
                "notification-empty"
            );


        if (
            !notificationList ||
            !notificationEmpty
        ) {

            return;

        }


        const notifications =
            getNotifications();


        const readNotifications =
            getReadNotifications();


        notificationList.innerHTML =
            "";


        if (
            notifications.length ===
            0
        ) {

            notificationEmpty.hidden =
                false;


            updateNotificationBadge();

            return;

        }


        notificationEmpty.hidden =
            true;


        notifications
            .sort(
                function (
                    first,
                    second
                ) {

                    return (
                        second.createdAt -
                        first.createdAt
                    );

                }
            )
            .forEach(
                function (
                    notification
                ) {

                    const isRead =
                        readNotifications.includes(
                            notification.id
                        );


                    const item =
                        document.createElement(
                            "article"
                        );


                    item.className =
                        isRead
                            ? "notification-item"
                            : "notification-item unread";


                    item.dataset.notificationId =
                        notification.id;


                    const safeName =
                        escapeHtml(
                            notification.appName
                        );


                    const safeTitle =
                        escapeHtml(
                            notification.title
                        );


                    const safeMessage =
                        escapeHtml(
                            notification.message
                        );


                    const iconHtml =
                        notification.icon
                            ? `
                                <img
                                    src="${notification.icon}"
                                    alt="${safeName}"
                                >
                            `
                            : `
                                <span>
                                    NEW
                                </span>
                            `;


                    item.innerHTML =
                        `

                        <div
                            class="notification-item-icon"
                        >

                            ${iconHtml}

                        </div>


                        <div
                            class="notification-item-content"
                        >


                            <div
                                class="notification-item-top"
                            >

                                <h3>

                                    ${safeTitle}

                                </h3>


                                <span
                                    class="notification-time"
                                >

                                    NEW

                                </span>


                            </div>


                            <p>

                                ${safeMessage}

                            </p>


                        </div>

                        `;


                    item.addEventListener(
                        "click",
                        function () {

                            markNotificationRead(
                                notification.id
                            );

                        }
                    );


                    notificationList.appendChild(
                        item
                    );

                }
            );


        updateNotificationBadge();

    }


    /* =====================================
       MARK ONE AS READ
    ===================================== */

    function markNotificationRead(
        notificationId
    ) {

        const readNotifications =
            getReadNotifications();


        if (
            !readNotifications.includes(
                notificationId
            )
        ) {

            readNotifications.push(
                notificationId
            );


            saveReadNotifications(
                readNotifications
            );

        }


        renderNotifications();

    }


    /* =====================================
       MARK ALL AS READ
    ===================================== */

    function markAllNotificationsRead() {

        const notifications =
            getNotifications();


        const readNotifications =
            notifications.map(
                function (
                    notification
                ) {

                    return (
                        notification.id
                    );

                }
            );


        saveReadNotifications(
            readNotifications
        );


        renderNotifications();

    }


    /* =====================================
       UPDATE NOTIFICATION BADGE
    ===================================== */

    function updateNotificationBadge() {

        const badge =
            document.getElementById(
                "notification-badge"
            );


        const button =
            document.getElementById(
                "notification-button"
            );


        if (
            !badge ||
            !button
        ) {

            return;

        }


        const notifications =
            getNotifications();


        const readNotifications =
            getReadNotifications();


        const unreadCount =
            notifications.filter(
                function (
                    notification
                ) {

                    return (
                        !readNotifications.includes(
                            notification.id
                        )
                    );

                }
            ).length;


        badge.textContent =
            unreadCount;


        badge.hidden =
            unreadCount === 0;


        button.classList.toggle(
            "has-notifications",
            unreadCount > 0
        );

    }


    /* =====================================
       OPEN NOTIFICATIONS
    ===================================== */

    function openNotifications() {

        const panel =
            document.getElementById(
                "notification-panel"
            );


        const overlay =
            document.getElementById(
                "notification-overlay"
            );


        if (
            !panel ||
            !overlay
        ) {

            return;

        }


        panel.classList.add(
            "is-open"
        );


        overlay.classList.add(
            "is-open"
        );


        panel.setAttribute(
            "aria-hidden",
            "false"
        );


        overlay.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "notification-open"
        );

    }


    /* =====================================
       CLOSE NOTIFICATIONS
    ===================================== */

    function closeNotifications() {

        const panel =
            document.getElementById(
                "notification-panel"
            );


        const overlay =
            document.getElementById(
                "notification-overlay"
            );


        if (
            panel
        ) {

            panel.classList.remove(
                "is-open"
            );


            panel.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        if (
            overlay
        ) {

            overlay.classList.remove(
                "is-open"
            );


            overlay.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        document.body.classList.remove(
            "notification-open"
        );

    }


    /* =====================================
       INITIALIZE
    ===================================== */

    function initializeNotifications() {

        const notificationButton =
            document.getElementById(
                "notification-button"
            );


        const notificationClose =
            document.getElementById(
                "notification-close"
            );


        const notificationOverlay =
            document.getElementById(
                "notification-overlay"
            );


        const notificationPanel =
            document.getElementById(
                "notification-panel"
            );


        const markAllRead =
            document.getElementById(
                "notification-mark-read"
            );


        if (
            !notificationButton ||
            !notificationPanel
        ) {

            return;

        }


                        /* LOAD NOTIFICATIONS */

        loadNotifications()
            .then(
                function () {

                    renderNotifications();

                }
            );


        /* OPEN */

        notificationButton.addEventListener(
            "click",
            function () {

                openNotifications();

            }
        );


        /* =====================================
           DRAWER NOTIFICATION BUTTON
        ===================================== */

        const drawerNotificationButton =
            document.querySelector(
                '.drawer-item[data-page="notification"]'
            );


        drawerNotificationButton?.addEventListener(
            "click",
            function (
                event
            ) {

                event.preventDefault();


                /* CLOSE DRAWER FIRST */

                if (
                    typeof window.closeKeduDrawer ===
                    "function"
                ) {

                    window.closeKeduDrawer();

                }


                /* OPEN NOTIFICATION DIALOG */

                openNotifications();

            }
        );
        /* CLOSE BUTTON */

        notificationClose?.addEventListener(
            "click",
            function () {

                closeNotifications();

            }
        );


        /* OUTSIDE CLICK */

        notificationOverlay?.addEventListener(
            "click",
            function () {

                closeNotifications();

            }
        );


        /* PANEL CLICK */

        notificationPanel.addEventListener(
            "click",
            function (
                event
            ) {

                event.stopPropagation();

            }
        );


        /* MARK ALL READ */

        markAllRead?.addEventListener(
            "click",
            function () {

                markAllNotificationsRead();

            }
        );


        /* ESCAPE */

        document.addEventListener(
            "keydown",
            function (
                event
            ) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeNotifications();

                }

            }
        );


                /* NOTIFICATION DATA UPDATED EVENT */

        window.addEventListener(
            "keduAppsUpdated",
            async function () {

                await loadNotifications();

                renderNotifications();

            }
        );
                /* =====================================
           SUPABASE NOTIFICATION REALTIME
        ===================================== */

        if (
            window.keduSupabase
        ) {

            window
                .keduSupabase
                .channel(
                    "kedu-world-notifications"
                )
                .on(
                    "postgres_changes",
                    {
                        event:
                            "*",

                        schema:
                            "public",

                        table:
                            "notifications"
                    },
                    async function () {

                        await loadNotifications();

                        renderNotifications();

                    }
                )
                .subscribe();

        }
    }


    /* =====================================
       DOM READY
    ===================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeNotifications
        );

    }

    else {

        initializeNotifications();

    }


        /* =====================================
       GLOBAL NOTIFICATION API
    ===================================== */

    window.KEDU_NOTIFICATIONS =
        {

            refresh:
                async function () {

                    await loadNotifications();

                    renderNotifications();

                },

            open:
                openNotifications,

            close:
                closeNotifications

        };
    })();