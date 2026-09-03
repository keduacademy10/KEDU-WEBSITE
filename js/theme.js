/* =========================================
   KEDU WORLD — THEME SYSTEM
========================================= */

(function () {

    "use strict";


    const themeButton =
        document.getElementById(
            "theme-button"
        );


    const themeDialog =
        document.getElementById(
            "theme-dialog"
        );


    const themeDialogOverlay =
        document.getElementById(
            "theme-dialog-overlay"
        );


    const themeOptions =
        document.querySelectorAll(
            ".theme-option"
        );


    const closeThemeDialog =
        document.getElementById(
            "close-theme-dialog"
        );


    /* =====================================
       GET SAVED THEME
    ===================================== */

    function getSavedTheme() {

        return localStorage.getItem(
            "kedu-world-theme"
        ) || "system";

    }


    /* =====================================
       APPLY THEME
    ===================================== */

    function applyTheme(theme) {

        const root =
            document.documentElement;


        root.removeAttribute(
            "data-theme"
        );


        if (
            theme === "light"
        ) {

            root.setAttribute(
                "data-theme",
                "light"
            );

        }


        if (
            theme === "dark"
        ) {

            root.setAttribute(
                "data-theme",
                "dark"
            );

        }


        if (
            theme === "system"
        ) {

            if (
                window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches
            ) {

                root.setAttribute(
                    "data-theme",
                    "dark"
                );

            } else {

                root.setAttribute(
                    "data-theme",
                    "light"
                );

            }

        }


        localStorage.setItem(
            "kedu-world-theme",
            theme
        );


        updateActiveTheme(
            theme
        );

    }


    /* =====================================
       ACTIVE THEME OPTION
    ===================================== */

    function updateActiveTheme(theme) {

        themeOptions.forEach(
            function (option) {

                option.classList.remove(
                    "active"
                );


                if (
                    option.dataset.theme === theme
                ) {

                    option.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    /* =====================================
       OPEN THEME DIALOG
    ===================================== */

    function openThemeDialog() {

        if (
            !themeDialog ||
            !themeDialogOverlay
        ) {

            return;

        }


        updateActiveTheme(
            getSavedTheme()
        );


        themeDialog.classList.add(
            "active"
        );


        themeDialogOverlay.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* =====================================
       CLOSE THEME DIALOG
    ===================================== */

    function closeDialog() {

        themeDialog.classList.remove(
            "active"
        );


        themeDialogOverlay.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";

    }


    /* =====================================
       THEME BUTTON
    ===================================== */

    if (
        themeButton
    ) {

        themeButton.addEventListener(
            "click",
            function () {

                openThemeDialog();

            }
        );

    }


    /* =====================================
       CLOSE BUTTON
    ===================================== */

    if (
        closeThemeDialog
    ) {

        closeThemeDialog.addEventListener(
            "click",
            closeDialog
        );

    }


    /* =====================================
       OVERLAY CLOSE
    ===================================== */

    if (
        themeDialogOverlay
    ) {

        themeDialogOverlay.addEventListener(
            "click",
            closeDialog
        );

    }


    /* =====================================
       SELECT THEME
    ===================================== */

    themeOptions.forEach(
        function (option) {

            option.addEventListener(
                "click",
                function () {

                    const selectedTheme =
                        option.dataset.theme;


                    applyTheme(
                        selectedTheme
                    );


                    setTimeout(
                        closeDialog,
                        250
                    );

                }
            );

        }
    );


    /* =====================================
       SYSTEM THEME CHANGE
    ===================================== */

    window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).addEventListener(
        "change",
        function () {

            if (
                getSavedTheme() === "system"
            ) {

                applyTheme(
                    "system"
                );

            }

        }
    );


    /* =====================================
       INITIAL THEME
    ===================================== */

    applyTheme(
        getSavedTheme()
    );


})();