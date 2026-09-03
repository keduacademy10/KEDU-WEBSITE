/* =========================================
   KEDU WORLD — NAVIGATION SYSTEM
========================================= */

(function () {

    "use strict";


    /* =====================================
       SHOW PAGE
    ===================================== */

    function showPage(
        pageName
    ) {

        const pages =
            document.querySelectorAll(
                ".page-section"
            );


        const targetPage =
            document.getElementById(
                pageName
            );


        if (
            !targetPage
        ) {

            return false;

        }


        /* =================================
           HIDE ALL PAGES
        ================================= */

        pages.forEach(
            function (
                page
            ) {

                page.classList.remove(
                    "active-page"
                );

            }
        );


        /* =================================
           SHOW SELECTED PAGE
        ================================= */

        targetPage.classList.add(
            "active-page"
        );


        /* =================================
           ACTIVE DRAWER ITEM
        ================================= */

        document
            .querySelectorAll(
                ".drawer-item[data-page]"
            )
            .forEach(
                function (
                    item
                ) {

                    item.classList.toggle(
                        "active",
                        item.dataset.page ===
                        pageName
                    );

                }
            );


        /* =================================
           CLOSE DRAWER
        ================================= */

        if (
            typeof window.closeKeduDrawer ===
            "function"
        ) {

            window.closeKeduDrawer();

        }


        /* =================================
           SCROLL TOP
        ================================= */

        window.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            }
        );


        return true;

    }


    /* =====================================
       GLOBAL FUNCTION
    ===================================== */

    window.showKeduPage =
        showPage;


    /* =====================================
       DRAWER NAVIGATION
    ===================================== */

    document
        .querySelectorAll(
            ".drawer-item[data-page]"
        )
        .forEach(
            function (
                item
            ) {

                item.addEventListener(
                    "click",
                    function () {

                        const pageName =
                            item.dataset.page;


                        if (
                            pageName
                        ) {

                            showPage(
                                pageName
                            );

                        }

                    }
                );

            }
        );


})();