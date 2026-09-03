/* =========================================
   KEDU WORLD — HOME CONTROLLER
========================================= */

(function () {

    "use strict";


    /* =====================================
       EXPLORE APPS BUTTON
    ===================================== */

    const exploreAppsButton =
        document.getElementById(
            "explore-apps-button"
        );


    if (
        exploreAppsButton
    ) {

        exploreAppsButton.addEventListener(
            "click",
            function () {

                if (
                    typeof window.showKeduPage ===
                    "function"
                ) {

                    window.showKeduPage(
                        "apps"
                    );

                }

            }
        );

    }


    /* =====================================
       HOME FILTER PILLS
    ===================================== */

    const homeFilterPills =
        document.querySelectorAll(
            ".home-filter-pills .app-filter-pill"
        );


    homeFilterPills.forEach(
        function (
            pill
        ) {

            pill.addEventListener(
                "click",
                function () {

                    const category =
                        pill.dataset.appFilter;


                    if (
                        !category
                    ) {

                        return;

                    }


                    /* =============================
                       HOME FILTER ONLY

                       DOES NOT OPEN APPS PAGE
                    ============================= */

                    if (
                        typeof window.setHomeAppFilter ===
                        "function"
                    ) {

                        window.setHomeAppFilter(
                            category
                        );

                    }

                }
            );

        }
    );


})();