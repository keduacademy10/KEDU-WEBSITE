/* =========================================
   KEDU WORLD — APPS CONTROLLER
   SUPABASE CONNECTED
========================================= */

(function () {

    "use strict";


    /* =====================================
       DEFAULT KEDU LOGO
    ===================================== */

    const DEFAULT_LOGO =
        "assets/logo/kedu-logo.png";


    /* =====================================
       APP DATABASE

       Loaded from Supabase.
    ===================================== */

    let apps = [];


    /* =====================================
       ACTIVE FILTERS
    ===================================== */

    let activeHomeCategory =
        "kedu";


    let activeAppsCategory =
        "kedu";


    /* =====================================
       GET APP ICON
    ===================================== */

    function getAppIcon(
        app
    ) {

        if (
            app.icon &&
            app.icon.trim()
        ) {

            return app.icon;

        }


        return DEFAULT_LOGO;

    }


    /* =====================================
       CHECK APP AVAILABILITY
    ===================================== */

    function isAppAvailable(
        app
    ) {

        return Boolean(
            app.download &&
            app.download.trim()
        );

    }


    /* =====================================
       ESCAPE HTML
    ===================================== */

    function escapeHTML(
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


    /* =====================================
       LOAD APPS FROM SUPABASE
    ===================================== */

    async function loadAppsFromSupabase() {

        if (
            !window.keduSupabase
        ) {

            console.error(
                "Supabase connection not available."
            );

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
                        "*"
                    )
                    .order(
                        "created_at",
                        {
                            ascending: true
                        }
                    );


            if (
                error
            ) {

                throw error;

            }


            apps =
                (data || [])
                    .map(
                        convertDatabaseApp
                    );


            window.KEDU_APPS =
                apps;


            return apps;

        } catch (
            error
        ) {

            console.error(
                "Unable to load KEDU apps:",
                error
            );


            apps =
                [];


            window.KEDU_APPS =
                apps;


            return [];

        }

    }


    /* =====================================
       CONVERT SUPABASE DATA

       Database:
       name
       developer
       file_size
       download_url
       icon_url

       Website:
       name
       developer
       fileSize
       download
       icon
    ===================================== */

        /* =====================================
       CONVERT SUPABASE DATA
    ===================================== */

    function convertDatabaseApp(
        app
    ) {

        const developer =
            (
                app.developer_name ||
                app.developer ||
                ""
            )
            .trim();


        /*
         * AUTO CATEGORY
         *
         * Developer entered
         * = KEDU App
         *
         * Developer empty
         * = Other App
         */

        const category =
            developer
                ? "kedu"
                : "other";


        return {

            id:
                app.id,


            category:


                category,


            name:

                app.app_name ||
                app.name ||
                "",


            developer:

                developer,


            icon:

                app.app_icon ||
                app.icon_url ||
                app.icon ||
                "",


            version:

                app.version ||
                "",


            fileSize:

                app.file_size ||
                app.fileSize ||
                "",


            download:

                app.app_link ||
                app.download_url ||
                app.download ||
                "",


            description:

                app.description ||
                "",


            downloads:

                Number(
                    app.downloads ||
                    app.total_downloads ||
                    0
                )

        };

    }
    /* =====================================
       CREATE APP CARD
    ===================================== */

    function createAppCard(
        app
    ) {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "kedu-app-card";


        card.dataset.appId =
            app.id;


        card.dataset.appCategory =
            app.category;


        card.dataset.appName =
            app.name;


        card.dataset.download =
            app.download || "";


        const available =
            isAppAvailable(
                app
            );


        /* =================================
           DEVELOPER

           Only KEDU apps show developer.
        ================================= */

        const developerHtml =
            app.category === "kedu"
                ? `
                    <p class="app-developer">
                        ${escapeHTML(
                            app.developer ||
                            "KEDU"
                        )}
                    </p>
                `
                : "";


        /* =================================
           VERSION
        ================================= */

                const versionHtml =
            app.version &&
            app.version.trim()
                ? `
                    <span class="app-meta-item">

                        <span class="app-meta-icon">
                            ⚙
                        </span>

                        <span>
                            Version ${escapeHTML(
                                app.version
                            )}
                        </span>

                    </span>
                `
                : "";

        /* =================================
           FILE SIZE
        ================================= */

                const fileSizeHtml =
            app.fileSize &&
            app.fileSize.trim()
                ? `
                    <span class="app-meta-item">

                        <span class="app-meta-icon">
                            ▣ 
                        </span>

                        <span>
                            ${escapeHTML(
                                app.fileSize
                            )}
                        </span>

                    </span>
                `
                : "";


        /* =================================
           META ROW
        ================================= */

        const metaHtml =
            (
                versionHtml ||
                fileSizeHtml
            )
                ? `
                    <div class="app-meta-row">
                        ${versionHtml}
                        ${fileSizeHtml}
                    </div>
                `
                : "";


        /* =================================
           STATUS BADGE
        ================================= */

        const badgeHtml =
            available
                ? `
                    <span
                        class="app-status-badge active"
                    >
                        NEW
                    </span>
                `
                : `
                    <span
                        class="app-status-badge"
                    >
                        NEW
                    </span>
                `;


        /* =================================
           DOWNLOAD BUTTON
        ================================= */

        const buttonText =
            available
                ? "DOWNLOAD"
                : "COMING SOON";


        const buttonClass =
            available
                ? "kedu-app-download"
                : "kedu-app-download coming-soon";


        const buttonAttributes =
            available
                ? `
                    href="${escapeHTML(
                        app.download
                    )}"
                    target="_blank"
                    rel="noopener noreferrer"
                `
                : `
                    href="#"
                    aria-disabled="true"
                `;


        /* =================================
           CARD HTML
        ================================= */

        card.innerHTML =
            `

            <!-- START: APP IMAGE AREA -->

            <div class="kedu-app-image-area">

                <img
                    src="${escapeHTML(
                        getAppIcon(
                            app
                        )
                    )}"
                    alt="${escapeHTML(
                        app.name
                    )}"
                    class="kedu-app-logo"
                >

                ${badgeHtml}

            </div>

            <!-- END: APP IMAGE AREA -->


            <!-- START: APP CONTENT -->

            <div class="kedu-app-card-content">

                <h3>

                    ${escapeHTML(
                        app.name
                    )}

                </h3>


                ${developerHtml}


                ${metaHtml}


                <a
                    class="${buttonClass}"
                    ${buttonAttributes}
                >

                    <span class="download-icon">

                        ↓

                    </span>


                    <span class="download-text">

                        ${buttonText}

                    </span>

                </a>

            </div>

            <!-- END: APP CONTENT -->

            `;


        /* =================================
           COMING SOON BUTTON
        ================================= */

        if (
            !available
        ) {

            const button =
                card.querySelector(
                    ".kedu-app-download"
                );


            if (
                button
            ) {

                button.addEventListener(
                    "click",
                    function (
                        event
                    ) {

                        event.preventDefault();

                    }
                );

            }

        }


        /* =================================
           DOWNLOAD COUNT
        ================================= */

        if (
            available
        ) {

            const downloadButton =
                card.querySelector(
                    ".kedu-app-download"
                );


            if (
                downloadButton
            ) {

                downloadButton.addEventListener(
                    "click",
                    () => {

                        increaseDownloadCount(
                            app.id
                        );

                    }
                );

            }

        }


        return card;

    }


    /* =====================================
       INCREASE DOWNLOAD COUNT
    ===================================== */

    async function increaseDownloadCount(
        appId
    ) {

        if (
            !window.keduSupabase
        ) {

            return;

        }


        try {

            const app =
                apps.find(
                    (
                        item
                    ) =>
                        item.id ===
                        appId
                );


            if (
                !app
            ) {

                return;

            }


            const nextCount =
                Number(
                    app.downloads || 0
                ) + 1;


            app.downloads =
                nextCount;


            await window
                .keduSupabase
                .from(
                    "apps"
                )
                .update(
                    {
                        downloads:
                            nextCount
                    }
                )
                .eq(
                    "id",
                    appId
                );

        } catch (
            error
        ) {

            console.error(
                "Download count error:",
                error
            );

        }

    }


    /* =====================================
       RENDER APPS
    ===================================== */

    function renderApps(
        containerId
    ) {

        const container =
            document.getElementById(
                containerId
            );


        if (
            !container
        ) {

            return;

        }


        container.innerHTML =
            "";


        apps.forEach(
            function (
                app
            ) {

                container.appendChild(
                    createAppCard(
                        app
                    )
                );

            }
        );

    }


    /* =====================================
       HOME FILTER
    ===================================== */

    function applyHomeFilter(
        category
    ) {

        activeHomeCategory =
            category;


        const homeGrid =
            document.getElementById(
                "home-app-grid"
            );


        const homeEmpty =
            document.getElementById(
                "home-apps-empty"
            );


        if (
            !homeGrid
        ) {

            return;

        }


        let visibleCount =
            0;


        homeGrid
            .querySelectorAll(
                ".kedu-app-card"
            )
            .forEach(
                function (
                    card
                ) {

                    const shouldShow =
                        card.dataset.appCategory ===
                        category;


                    card.hidden =
                        !shouldShow;


                    if (
                        shouldShow
                    ) {

                        visibleCount++;

                    }

                }
            );


        document
            .querySelectorAll(
                ".home-filter-pills .app-filter-pill"
            )
            .forEach(
                function (
                    pill
                ) {

                    pill.classList.toggle(
                        "active",
                        pill.dataset.appFilter ===
                        category
                    );

                }
            );


        if (
            homeEmpty
        ) {

            homeEmpty.hidden =
                visibleCount !== 0;

        }

    }


    /* =====================================
       GLOBAL HOME FILTER
    ===================================== */

    window.setHomeAppFilter =
        applyHomeFilter;


    /* =====================================
       APPS PAGE FILTER
    ===================================== */

    function applyAppsFilter(
        category
    ) {

        activeAppsCategory =
            category;


        const appsGrid =
            document.getElementById(
                "apps-grid"
            );


        const emptyResult =
            document.getElementById(
                "apps-empty"
            );


        const searchInput =
            document.getElementById(
                "apps-search-input"
            );


        if (
            !appsGrid
        ) {

            return;

        }


        const searchQuery =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        let visibleCount =
            0;


        appsGrid
            .querySelectorAll(
                ".kedu-app-card"
            )
            .forEach(
                function (
                    card
                ) {

                    const categoryMatch =
                        card.dataset.appCategory ===
                        category;


                    const name =
                        (
                            card.dataset.appName ||
                            ""
                        )
                            .toLowerCase();


                    const searchMatch =
                        name.includes(
                            searchQuery
                        );


                    const shouldShow =
                        categoryMatch &&
                        searchMatch;


                    card.hidden =
                        !shouldShow;


                    if (
                        shouldShow
                    ) {

                        visibleCount++;

                    }

                }
            );


        document
            .querySelectorAll(
                ".apps-filter-pills .app-filter-pill"
            )
            .forEach(
                function (
                    pill
                ) {

                    pill.classList.toggle(
                        "active",
                        pill.dataset.appFilter ===
                        category
                    );

                }
            );


        if (
            emptyResult
        ) {

            emptyResult.hidden =
                visibleCount !== 0;

        }

    }


    /* =====================================
       GLOBAL APPS FILTER
    ===================================== */

    window.setKeduAppFilter =
        applyAppsFilter;


    /* =====================================
       SETUP HOME FILTER EVENTS
    ===================================== */

    function setupHomeFilterEvents() {

        document
            .querySelectorAll(
                ".home-filter-pills .app-filter-pill"
            )
            .forEach(
                function (
                    pill
                ) {

                    pill.addEventListener(
                        "click",
                        function () {

                            const category =
                                pill.dataset
                                    .appFilter;


                            if (
                                !category
                            ) {

                                return;

                            }


                            applyHomeFilter(
                                category
                            );

                        }
                    );

                }
            );

    }


    /* =====================================
       SETUP APPS FILTER EVENTS
    ===================================== */

    function setupAppsFilterEvents() {

        document
            .querySelectorAll(
                ".apps-filter-pills .app-filter-pill"
            )
            .forEach(
                function (
                    pill
                ) {

                    pill.addEventListener(
                        "click",
                        function () {

                            const category =
                                pill.dataset
                                    .appFilter;


                            if (
                                !category
                            ) {

                                return;

                            }


                            applyAppsFilter(
                                category
                            );

                        }
                    );

                }
            );

    }


    /* =====================================
       APPS SEARCH
    ===================================== */

    function setupAppsSearch() {

        const searchInput =
            document.getElementById(
                "apps-search-input"
            );


        const searchButton =
            document.getElementById(
                "apps-search-button"
            );


        function searchApps() {

            applyAppsFilter(
                activeAppsCategory
            );

        }


        if (
            searchInput
        ) {

            searchInput.addEventListener(
                "input",
                searchApps
            );


            searchInput.addEventListener(
                "keydown",
                function (
                    event
                ) {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        event.preventDefault();

                        searchApps();

                    }

                }
            );

        }


        if (
            searchButton
        ) {

            searchButton.addEventListener(
                "click",
                searchApps
            );

        }

    }


    /* =====================================
       REFRESH ALL APP UI
    ===================================== */

    window.refreshKeduApps =
        async function () {

            await loadAppsFromSupabase();


            renderApps(
                "home-app-grid"
            );


            renderApps(
                "apps-grid"
            );


            applyHomeFilter(
                activeHomeCategory
            );


            applyAppsFilter(
                activeAppsCategory
            );

        };


    /* =====================================
       SUPABASE REALTIME

       New app added from Admin
       automatically refreshes website.
    ===================================== */

    function setupAppsRealtime() {

        if (
            !window.keduSupabase
        ) {

            return;

        }


        window
            .keduSupabase
            .channel(
                "kedu-world-apps"
            )
            .on(
                "postgres_changes",
                {
                    event:
                        "*",

                    schema:
                        "public",

                    table:
                        "apps"
                },
                () => {

                    window
                        .refreshKeduApps();

                }
            )
            .subscribe();

    }


    /* =====================================
       INITIALIZE
    ===================================== */

    async function initializeApps() {

        setupHomeFilterEvents();

        setupAppsFilterEvents();

        setupAppsSearch();


        await window
            .refreshKeduApps();


        setupAppsRealtime();

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
            initializeApps
        );

    } else {

        initializeApps();

    }


})();