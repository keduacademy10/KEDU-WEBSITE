/* =========================================
   KEDU WORLD — ABOUT KEDU PAGE
========================================= */

(function () {

    "use strict";


    /* =====================================
       ELEMENTS
    ===================================== */

    const aboutPage =
        document.getElementById(
            "about"
        );


    const aboutButton =
        document.querySelector(
            '.drawer-item[data-page="about"]'
        );


    if (
        !aboutPage
    ) {

        return;

    }


    /* =====================================
       ABOUT PAGE OPEN
    ===================================== */

    function prepareAboutPage() {

        window.setTimeout(
            function () {

                if (
                    aboutPage.classList.contains(
                        "active-page"
                    )
                ) {

                    window.scrollTo(
                        {
                            top: 0,
                            left: 0,
                            behavior: "smooth"
                        }
                    );

                }

            },
            50
        );

    }


    /* =====================================
       DRAWER ABOUT BUTTON
    ===================================== */

    if (
        aboutButton
    ) {

        aboutButton.addEventListener(
            "click",
            function () {

                prepareAboutPage();

            }
        );

    }


    /* =====================================
       OBSERVE PAGE STATE
    ===================================== */

    const observer =
        new MutationObserver(
            function () {

                if (
                    aboutPage.classList.contains(
                        "active-page"
                    )
                ) {

                    prepareAboutPage();

                }

            }
        );


    observer.observe(
        aboutPage,
        {
            attributes: true,
            attributeFilter:
                [
                    "class"
                ]
        }
    );


})();