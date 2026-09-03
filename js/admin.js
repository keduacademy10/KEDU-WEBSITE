/* =================================
   START: KEDU ADMIN CONFIGURATION
================================= */

const ADMIN_EMAIL =
    "keduacademy10@gmail.com";


/* =================================
   END: KEDU ADMIN CONFIGURATION
================================= */


/* =================================
   START: DEFAULT APPLICATIONS
================================= */

const DEFAULT_APPS = [

    /* =============================
       KEDU APPLICATIONS
    ============================= */

    {
        app_name: "KEDU PW",
        developer_name: "KEDU",
        file_size: "",
        version: "",
        description: "KEDU Ecosystem Application",
        app_link: "",
        app_icon: "",
        category: "kedu",
        is_active: false
    },

    {
        app_name: "KEDU Next Topper",
        developer_name: "KEDU",
        file_size: "",
        version: "",
        description: "KEDU Ecosystem Application",
        app_link: "",
        app_icon: "",
        category: "kedu",
        is_active: false
    },

    {
        app_name: "KEDU Mission Jeet",
        developer_name: "KEDU",
        file_size: "",
        version: "",
        description: "KEDU Ecosystem Application",
        app_link: "",
        app_icon: "",
        category: "kedu",
        is_active: false
    },

    {
        app_name: "KEDU Books",
        developer_name: "KEDU",
        file_size: "",
        version: "",
        description: "KEDU Ecosystem Application",
        app_link: "",
        app_icon: "",
        category: "kedu",
        is_active: false
    },

    {
        app_name: "KEDU Test",
        developer_name: "KEDU",
        file_size: "",
        version: "",
        description: "KEDU Ecosystem Application",
        app_link: "",
        app_icon: "",
        category: "kedu",
        is_active: false
    },

    {
        app_name: "KEDU Tube",
        developer_name: "KEDU",
        file_size: "",
        version: "",
        description: "KEDU Ecosystem Application",
        app_link: "",
        app_icon: "",
        category: "kedu",
        is_active: false
    },


    /* =============================
       OTHER APPLICATIONS
    ============================= */

    {
        app_name: "CapCut",
        developer_name: "",
        file_size: "",
        version: "",
        description: "Other Application",
        app_link: "",
        app_icon: "",
        category: "other",
        is_active: false
    },

    {
        app_name: "InShot",
        developer_name: "",
        file_size: "",
        version: "",
        description: "Other Application",
        app_link: "",
        app_icon: "",
        category: "other",
        is_active: false
    },

    {
        app_name: "VN",
        developer_name: "",
        file_size: "",
        version: "",
        description: "Other Application",
        app_link: "",
        app_icon: "",
        category: "other",
        is_active: false
    }

];


/* =================================
   END: DEFAULT APPLICATIONS
================================= */


/* =================================
   START: DOM READY
================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeAdmin();

    }
);


/* =================================
   END: DOM READY
================================= */


/* =================================
   START: INITIALIZE ADMIN
================================= */

function initializeAdmin() {

    setupLoadingScreen();

    setupLogin();

    setupPasswordToggle();

    setupNavigation();

    setupAppManagement();

    checkAdminSession();

}


/* =================================
   END: INITIALIZE ADMIN
================================= */


/* =================================
   START: LOADING SCREEN
================================= */

function setupLoadingScreen() {

    const loadingScreen =
        document.getElementById(
            "loading-screen"
        );


    setTimeout(
        () => {

            if (!loadingScreen) {

                return;

            }


            loadingScreen.style.opacity =
                "0";


            loadingScreen.style.pointerEvents =
                "none";


            setTimeout(
                () => {

                    loadingScreen.style.display =
                        "none";

                },
                350
            );

        },
        1800
    );

}


/* =================================
   END: LOADING SCREEN
================================= */


/* =================================
   START: SUPABASE SESSION
================================= */

async function checkAdminSession() {

    if (!window.keduSupabase) {

        console.error(
            "Supabase connection not found."
        );

        return;

    }


    const {
        data,
        error
    } =
        await window
            .keduSupabase
            .auth
            .getSession();


    if (error) {

        console.error(error);

        return;

    }


    const session =
        data.session;


    if (!session) {

        return;

    }


    const userEmail =
        session.user.email;


    if (
        userEmail !== ADMIN_EMAIL
    ) {

        await window
            .keduSupabase
            .auth
            .signOut();

        return;

    }


    openDashboard();

}


/* =================================
   END: SUPABASE SESSION
================================= */


/* =================================
   START: LOGIN
================================= */

function setupLogin() {

    const loginForm =
        document.getElementById(
            "login-form"
        );


    const loginError =
        document.getElementById(
            "login-error"
        );


    if (!loginForm) {

        return;

    }


    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "admin-email"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "admin-password"
                    )
                    .value;


            if (!window.keduSupabase) {

                if (loginError) {

                    loginError.textContent =
                        "Backend connection unavailable.";

                }

                return;

            }


            if (loginError) {

                loginError.textContent =
                    "Signing in...";

            }


            const {
                data,
                error
            } =
                await window
                    .keduSupabase
                    .auth
                    .signInWithPassword(
                        {
                            email,
                            password
                        }
                    );


            if (error) {

                if (loginError) {

                    loginError.textContent =
                        "Incorrect email or password.";

                }

                return;

            }


            if (
                data.user.email !==
                ADMIN_EMAIL
            ) {

                await window
                    .keduSupabase
                    .auth
                    .signOut();


                if (loginError) {

                    loginError.textContent =
                        "You are not authorized to access KEDU Admin.";

                }

                return;

            }


            if (loginError) {

                loginError.textContent =
                    "";

            }


            openDashboard();

        }
    );

}


function openDashboard() {

    const login =
        document.getElementById(
            "admin-login"
        );


    const dashboard =
        document.getElementById(
            "admin-dashboard"
        );


    if (login) {

        login.classList.add(
            "hidden"
        );

    }


    if (dashboard) {

        dashboard.classList.remove(
            "hidden"
        );

    }


    renderDashboard();

}


/* =================================
   END: LOGIN
================================= */


/* =================================
   START: PASSWORD TOGGLE
================================= */

function setupPasswordToggle() {

    const passwordInput =
        document.getElementById(
            "admin-password"
        );


    const toggleButton =
        document.getElementById(
            "toggle-password"
        );


    if (
        !passwordInput ||
        !toggleButton
    ) {

        return;

    }


    toggleButton.addEventListener(
        "click",
        () => {

            const isPassword =
                passwordInput.type ===
                "password";


            passwordInput.type =
                isPassword
                    ? "text"
                    : "password";


            toggleButton.textContent =
                isPassword
                    ? "🙈"
                    : "👁";

        }
    );

}


/* =================================
   END: PASSWORD TOGGLE
================================= */


/* =================================
   START: NAVIGATION
================================= */

function setupNavigation() {

    const menuButton =
        document.getElementById(
            "menu-button"
        );


    const closeMenu =
        document.getElementById(
            "close-menu"
        );


    const overlay =
        document.getElementById(
            "sidebar-overlay"
        );


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            openSidebar
        );

    }


    if (closeMenu) {

        closeMenu.addEventListener(
            "click",
            closeSidebar
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    document
        .querySelectorAll(
            "[data-page]"
        )
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        changePage(
                            button.dataset.page
                        );

                        closeSidebar();

                    }
                );

            }
        );


    const logoutButton =
        document.getElementById(
            "logout-button"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logoutAdmin
        );

    }

}


function openSidebar() {

    document
        .getElementById(
            "admin-sidebar"
        )
        ?.classList
        .add(
            "open"
        );


    document
        .getElementById(
            "sidebar-overlay"
        )
        ?.classList
        .add(
            "show"
        );

}


function closeSidebar() {

    document
        .getElementById(
            "admin-sidebar"
        )
        ?.classList
        .remove(
            "open"
        );


    document
        .getElementById(
            "sidebar-overlay"
        )
        ?.classList
        .remove(
            "show"
        );

}


function changePage(pageName) {

    document
        .querySelectorAll(
            ".dashboard-page"
        )
        .forEach(
            (page) => {

                page.classList.remove(
                    "active"
                );

            }
        );


    const selectedPage =
        document.getElementById(
            `${pageName}-page`
        );


    if (selectedPage) {

        selectedPage.classList.add(
            "active"
        );

    }


    document
        .querySelectorAll(
            ".sidebar-item[data-page]"
        )
        .forEach(
            (button) => {

                button.classList.toggle(
                    "active",
                    button.dataset.page ===
                    pageName
                );

            }
        );


    document
        .querySelectorAll(
            ".bottom-nav-item"
        )
        .forEach(
            (button) => {

                button.classList.toggle(
                    "active",
                    button.dataset.page ===
                    pageName
                );

            }
        );


    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );

}


/* =================================
   END: NAVIGATION
================================= */


/* =================================
   START: LOGOUT
================================= */

async function logoutAdmin() {

    const confirmLogout =
        window.confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {

        return;

    }


    if (window.keduSupabase) {

        await window
            .keduSupabase
            .auth
            .signOut();

    }


    document
        .getElementById(
            "admin-dashboard"
        )
        ?.classList
        .add(
            "hidden"
        );


    document
        .getElementById(
            "admin-login"
        )
        ?.classList
        .remove(
            "hidden"
        );


    document
        .getElementById(
            "login-form"
        )
        ?.reset();


    closeSidebar();

}


/* =================================
   END: LOGOUT
================================= */


/* =================================
   START: DATABASE APPS
================================= */

async function getApps() {

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


    if (error) {

        console.error(
            "Apps loading error:",
            error
        );

        return [];

    }


    return data || [];

}


/* =================================
   END: DATABASE APPS
================================= */


/* =================================
   START: DEFAULT APPS INITIALIZATION
================================= */

async function initializeDefaultApps() {

    const apps =
        await getApps();


    if (
        apps.length > 0
    ) {

        return;

    }


    const {
        error
    } =
        await window
            .keduSupabase
            .from(
                "apps"
            )
            .insert(
                DEFAULT_APPS
            );


    if (error) {

        console.error(
            "Default apps error:",
            error
        );

    }

}


/* =================================
   END: DEFAULT APPS INITIALIZATION
================================= */


/* =================================
   START: DASHBOARD RENDER
================================= */

async function renderDashboard() {

    await initializeDefaultApps();


    const apps =
        await getApps();


    const activeApps =
        apps.filter(
            (app) => {

                return Boolean(
                    app.app_link
                );

            }
        );


    const totalDownloads =
        apps.reduce(
            (
                total,
                app
            ) => {

                return (
                    total +
                    Number(
                        app.total_downloads ||
                        0
                    )
                );

            },
            0
        );


    const totalAppsElement =
        document.getElementById(
            "total-apps"
        );


    const activeAppsElement =
        document.getElementById(
            "active-apps"
        );


    const downloadsElement =
        document.getElementById(
            "total-downloads"
        );


    const appsBadge =
        document.getElementById(
            "apps-count-badge"
        );


    if (totalAppsElement) {

        totalAppsElement.textContent =
            apps.length;

    }


    if (activeAppsElement) {

        activeAppsElement.textContent =
            activeApps.length;

    }


    if (downloadsElement) {

        downloadsElement.textContent =
            totalDownloads;

    }


    if (appsBadge) {

        appsBadge.textContent =
            `${apps.length} Apps`;

    }


    renderAppsList(
        apps
    );

}


/* =================================
   END: DASHBOARD RENDER
================================= */


/* =================================
   START: APPS LIST
================================= */

function renderAppsList(apps) {

    const appsList =
        document.getElementById(
            "apps-list"
        );


    if (!appsList) {

        return;

    }


    appsList.innerHTML =
        "";


    if (
        apps.length === 0
    ) {

        appsList.innerHTML = `

            <div class="empty-state">

                <div>▦</div>

                <h3>No Applications</h3>

                <p>
                    Add your first KEDU application.
                </p>

            </div>

        `;

        return;

    }


    apps.forEach(
        (app) => {

            const isActive =
                Boolean(
                    app.app_link
                );


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "admin-app-card";


            const iconHtml =
                app.app_icon
                    ? `
                        <img
                            src="${app.app_icon}"
                            alt="${escapeHTML(
                                app.app_name
                            )}"
                        >
                    `
                    : `
                        <span>
                            ${escapeHTML(
                                (
                                    app.app_name ||
                                    "A"
                                )
                                .charAt(0)
                                .toUpperCase()
                            )}
                        </span>
                    `;


            const developerHtml =
                app.developer_name
                    ? `
                        <span>
                            ${escapeHTML(
                                app.developer_name
                            )}
                        </span>
                    `
                    : "";


            const versionHtml =
                app.version
                    ? `
                        <span>
                            v${escapeHTML(
                                app.version
                            )}
                        </span>
                    `
                    : "";


            const fileSizeHtml =
                app.file_size
                    ? `
                        <span>
                            ${escapeHTML(
                                app.file_size
                            )}
                        </span>
                    `
                    : "";


            card.innerHTML = `

                <div class="admin-app-card-top">


                    <div class="admin-app-main">


                        <div class="admin-app-icon">

                            ${iconHtml}

                        </div>


                        <div class="admin-app-details">


                            <h4>

                                ${escapeHTML(
                                    app.app_name
                                )}

                            </h4>


                            <p class="app-card-description">

                                ${escapeHTML(
                                    app.description ||
                                    "No description added."
                                )}

                            </p>


                            <div class="admin-app-meta">

                                ${developerHtml}

                                ${versionHtml}

                                ${fileSizeHtml}

                            </div>


                        </div>


                    </div>


                    <span
                        class="app-status ${
                            isActive
                                ? "active"
                                : "coming"
                        }"
                    >

                        ${
                            isActive
                                ? "Active"
                                : "Coming Soon"
                        }

                    </span>


                </div>


                <div class="app-card-footer">


                    <span>

                        ${
                            app.category ===
                            "other"
                                ? "Other App"
                                : "KEDU App"
                        }

                    </span>


                    <button
                        type="button"
                        class="delete-app-button"
                        data-delete-app="${app.id}"
                    >

                        Delete

                    </button>


                </div>

            `;


            appsList.appendChild(
                card
            );

        }
    );


    document
        .querySelectorAll(
            "[data-delete-app]"
        )
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteApp(
                            button.dataset.deleteApp
                        );

                    }
                );

            }
        );

}


/* =================================
   END: APPS LIST
================================= */


/* =================================
   START: HTML ESCAPE
================================= */

function escapeHTML(value) {

    const temporary =
        document.createElement(
            "div"
        );


    temporary.textContent =
        value || "";


    return temporary.innerHTML;

}


/* =================================
   END: HTML ESCAPE
================================= */


/* =================================
   START: APP MANAGEMENT
================================= */

function setupAppManagement() {

    const addButton =
        document.getElementById(
            "add-app-button"
        );


    const manageButton =
        document.getElementById(
            "manage-apps-button"
        );


    const websiteButton =
        document.getElementById(
            "open-website-button"
        );


    const modal =
        document.getElementById(
            "app-modal"
        );


    const closeModalButton =
        document.getElementById(
            "close-app-modal"
        );


    const appForm =
        document.getElementById(
            "app-form"
        );


    const appIconInput =
        document.getElementById(
            "app-icon"
        );


    const appIconPreview =
        document.getElementById(
            "app-icon-preview"
        );


    if (
        appIconInput &&
        appIconPreview
    ) {

        appIconInput.addEventListener(
            "change",
            () => {

                const file =
                    appIconInput.files[0];


                if (!file) {

                    appIconPreview.innerHTML =
                        "<span>+</span>";

                    return;

                }


                const reader =
                    new FileReader();


                reader.onload =
                    () => {

                        appIconPreview.innerHTML = `

                            <img
                                src="${reader.result}"
                                alt="App Icon Preview"
                            >

                        `;

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );

    }


    if (addButton) {

        addButton.addEventListener(
            "click",
            openAppModal
        );

    }


    if (manageButton) {

        manageButton.addEventListener(
            "click",
            () => {

                document
                    .querySelector(
                        ".apps-section"
                    )
                    ?.scrollIntoView(
                        {
                            behavior:
                                "smooth"
                        }
                    );

            }
        );

    }


    if (websiteButton) {

        websiteButton.addEventListener(
            "click",
            () => {

                window.open(
                    "index.html",
                    "_blank"
                );

            }
        );

    }


    if (closeModalButton) {

        closeModalButton.addEventListener(
            "click",
            closeAppModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    modal
                ) {

                    closeAppModal();

                }

            }
        );

    }


    if (appForm) {

        appForm.addEventListener(
            "submit",
            addNewApp
        );

    }

}


function openAppModal() {

    document
        .getElementById(
            "app-modal"
        )
        ?.classList
        .add(
            "show"
        );

}


function closeAppModal() {

    document
        .getElementById(
            "app-modal"
        )
        ?.classList
        .remove(
            "show"
        );

}


/* =================================
   END: APP MANAGEMENT
================================= */


/* =================================
   START: ADD NEW APP
================================= */

async function addNewApp(event) {

    event.preventDefault();


    const name =
        document
            .getElementById(
                "app-name"
            )
            .value
            .trim();


    const developer =
        document
            .getElementById(
                "app-developer"
            )
            .value
            .trim();


    const fileSize =
        document
            .getElementById(
                "app-file-size"
            )
            .value
            .trim();


    const version =
        document
            .getElementById(
                "app-version"
            )
            .value
            .trim();


    const description =
        document
            .getElementById(
                "app-description"
            )
            .value
            .trim();


    const link =
        document
            .getElementById(
                "app-link"
            )
            .value
            .trim();


    const iconInput =
        document.getElementById(
            "app-icon"
        );


    const iconFile =
        iconInput?.files[0];


        /* =================================
       AUTO APP CATEGORY

       Developer entered:
       KEDU App

       Developer empty:
       Other App
    ================================= */

    const category =
        developer
            ? "kedu"
            : "other";
    const saveButton =
        document.querySelector(
            "#app-form button[type='submit']"
        );


    if (saveButton) {

        saveButton.disabled =
            true;


        saveButton.textContent =
            "Saving...";

    }


    try {

        let icon = "";


        if (iconFile) {

            icon =
                await convertFileToBase64(
                    iconFile
                );

        }


        const {
            error
        } =
            await window
                .keduSupabase
                .from(
                    "apps"
                )
                .insert(
                    {
                        app_name:
                            name,

                        developer_name:
                            developer,

                        file_size:
                            fileSize,

                        version:
                            version,

                        description:
                            description,

                        app_link:
                            link,

                        app_icon:
                            icon,

                        category:
                            category,

                        is_active:
                            Boolean(link)
                    }
                );


        if (error) {

            throw error;

        }


        document
            .getElementById(
                "app-form"
            )
            .reset();


        const preview =
            document.getElementById(
                "app-icon-preview"
            );


        if (preview) {

            preview.innerHTML =
                "<span>+</span>";

        }


        closeAppModal();


        await renderDashboard();


        alert(
            "Application saved successfully."
        );

    } catch (error) {

    console.error(
        "Application save error:",
        error
    );


    alert(
        error.message ||
        "Unable to save application."
    );

} finally {

        if (saveButton) {

            saveButton.disabled =
                false;


            saveButton.textContent =
                "Save Application";

        }

    }

}


/* =================================
   END: ADD NEW APP
================================= */


/* =================================
   START: FILE TO BASE64
================================= */

function convertFileToBase64(file) {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            const reader =
                new FileReader();


            reader.onload =
                () => {

                    resolve(
                        reader.result
                    );

                };


            reader.onerror =
                reject;


            reader.readAsDataURL(
                file
            );

        }
    );

}


/* =================================
   END: FILE TO BASE64
================================= */


/* =================================
   START: DELETE APP
================================= */

async function deleteApp(appId) {

    const shouldDelete =
        window.confirm(
            "Delete this application?"
        );


    if (!shouldDelete) {

        return;

    }


    try {

        const {
            error
        } =
            await window
                .keduSupabase
                .from(
                    "apps"
                )
                .delete()
                .eq(
                    "id",
                    appId
                );


        if (error) {

            throw error;

        }


        await renderDashboard();

    } catch (error) {

        console.error(
            error
        );


        alert(
            "Unable to delete application."
        );

    }

}


/* =================================
   END: DELETE APP
================================= */
/* =================================
   START: MESSAGE SYSTEM
================================= */

let messageRealtimeChannel =
    null;


/* =================================
   START: MESSAGE SYSTEM READY
================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupMessageSystem();

    }
);


/* =================================
   END: MESSAGE SYSTEM READY
================================= */


/* =================================
   START: SETUP MESSAGE SYSTEM
================================= */

function setupMessageSystem() {

    const messagesList =
        document.getElementById(
            "messages-list"
        );


    if (
        !messagesList
    ) {

        return;

    }


    messagesList.addEventListener(
        "click",
        async (
            event
        ) => {

            const replyButton =
                event.target.closest(
                    "[data-reply-message]"
                );


            if (
                !replyButton
            ) {

                return;

            }


            const messageId =
                replyButton.dataset.replyMessage;


            await replyToMessage(
                messageId,
                replyButton
            );

        }
    );


    loadAdminMessages();

    subscribeToMessages();

}


/* =================================
   END: SETUP MESSAGE SYSTEM
================================= */


/* =================================
   START: LOAD ADMIN MESSAGES
================================= */

async function loadAdminMessages() {

    if (
        !window.keduSupabase
    ) {

        return;

    }


    const {
        data,
        error
    } =
        await window
            .keduSupabase
            .from(
                "messages"
            )
            .select(
                "*"
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

        console.error(
            "Message loading error:",
            error
        );


        return;

    }


    renderAdminMessages(
        data || []
    );

}


/* =================================
   END: LOAD ADMIN MESSAGES
================================= */


/* =================================
   START: RENDER ADMIN MESSAGES
================================= */

function renderAdminMessages(
    messages
) {

    const messagesList =
        document.getElementById(
            "messages-list"
        );


    if (
        !messagesList
    ) {

        return;

    }


    updateMessageCounters(
        messages
    );


    if (
        messages.length ===
        0
    ) {

        messagesList.innerHTML =
            `
            <div class="empty-state">

                <div>
                    ✉
                </div>

                <h3>
                    No Messages Yet
                </h3>

                <p>
                    User messages will appear here.
                </p>

            </div>
            `;


        return;

    }


    messagesList.innerHTML =
        "";


    messages.forEach(
        (
            message
        ) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                `admin-message-card ${
                    message.is_replied
                        ? "replied"
                        : "pending"
                }`;


            card.innerHTML =
                `
                <div class="admin-message-header">

                    <div>

                        <span class="admin-message-label">
                            ${
                                message.is_replied
                                    ? "REPLIED"
                                    : "NEW MESSAGE"
                            }
                        </span>

                        <h3>
                            ${
                                escapeHTML(
                                    message.sender_name ||
                                    "KEDU User"
                                )
                            }
                        </h3>

                    </div>


                    <span class="admin-message-status">

                        ${
                            message.is_replied
                                ? "Replied"
                                : "Pending"
                        }

                    </span>

                </div>


                <div class="admin-message-email">

                    ${
                        escapeHTML(
                            message.sender_email ||
                            "No email provided"
                        )
                    }

                </div>


                <div class="admin-message-subject">

                    <strong>
                        Subject:
                    </strong>

                    ${
                        escapeHTML(
                            message.subject ||
                            "General Inquiry"
                        )
                    }

                </div>


                <div class="admin-message-body">

                    ${
                        escapeHTML(
                            message.message
                        )
                            .replace(
                                /\n/g,
                                "<br>"
                            )
                    }

                </div>


                <div class="admin-message-date">

                    ${
                        formatAdminMessageDate(
                            message.created_at
                        )
                    }

                </div>


                ${
                    message.reply
                        ? `
                            <div class="admin-message-existing-reply">

                                <span>
                                    KEDU REPLY
                                </span>

                                <p>
                                    ${
                                        escapeHTML(
                                            message.reply
                                        )
                                            .replace(
                                                /\n/g,
                                                "<br>"
                                            )
                                    }
                                </p>

                            </div>
                        `
                        : ""
                }


                <div class="admin-message-reply-area">

                    <textarea
                        id="reply-${message.id}"
                        class="admin-message-reply-input"
                        placeholder="${
                            message.reply
                                ? "Update your reply..."
                                : "Write a reply to this user..."
                        }"
                    ></textarea>


                    <button
                        type="button"
                        class="admin-message-reply-button"
                        data-reply-message="${message.id}"
                    >

                        ${
                            message.reply
                                ? "UPDATE REPLY"
                                : "SEND REPLY"
                        }

                    </button>

                </div>
                `;


            messagesList.appendChild(
                card
            );

        }
    );

}


/* =================================
   END: RENDER ADMIN MESSAGES
================================= */


/* =================================
   START: REPLY TO MESSAGE
================================= */

async function replyToMessage(
    messageId,
    button
) {

    const input =
        document.getElementById(
            `reply-${messageId}`
        );


    if (
        !input
    ) {

        return;

    }


    const reply =
        input.value.trim();


    if (
        !reply
    ) {

        alert(
            "Please write a reply first."
        );


        input.focus();


        return;

    }


    const originalText =
        button.textContent;


    button.disabled =
        true;


    button.textContent =
        "SENDING...";


    try {

        const {
            error
        } =
            await window
                .keduSupabase
                .from(
                    "messages"
                )
                .update(
                    {
                        reply:
                            reply,

                        is_replied:
                            true,

                        updated_at:
                            new Date()
                                .toISOString()
                    }
                )
                .eq(
                    "id",
                    messageId
                );


        if (
            error
        ) {

            throw error;

        }


        await loadAdminMessages();

    }

    catch (
        error
    ) {

        console.error(
            "Message reply error:",
            error
        );


        alert(
            error.message ||
            "Unable to send reply."
        );

    }

    finally {

        button.disabled =
            false;


        button.textContent =
            originalText;

    }

}


/* =================================
   END: REPLY TO MESSAGE
================================= */


/* =================================
   START: MESSAGE COUNTERS
================================= */

function updateMessageCounters(
    messages
) {

    const pendingMessages =
        messages.filter(
            (
                message
            ) =>
                !message.is_replied
        );


    const count =
        pendingMessages.length;


    const sidebarCount =
        document.getElementById(
            "sidebar-message-count"
        );


    const bottomCount =
        document.getElementById(
            "bottom-message-count"
        );


    if (
        sidebarCount
    ) {

        sidebarCount.textContent =
            count;

    }


    if (
        bottomCount
    ) {

        bottomCount.textContent =
            count;

    }

}


/* =================================
   END: MESSAGE COUNTERS
================================= */


/* =================================
   START: MESSAGE REALTIME
================================= */

function subscribeToMessages() {

    if (
        !window.keduSupabase ||
        messageRealtimeChannel
    ) {

        return;

    }


    messageRealtimeChannel =
        window
            .keduSupabase
            .channel(
                "kedu-admin-messages"
            )
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "messages"
                },
                () => {

                    loadAdminMessages();

                }
            )
            .subscribe();

}


/* =================================
   END: MESSAGE REALTIME
================================= */


/* =================================
   START: FORMAT MESSAGE DATE
================================= */

function formatAdminMessageDate(
    value
) {

    if (
        !value
    ) {

        return "";

    }


    return new Date(
        value
    )
        .toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

}


/* =================================
   END: FORMAT MESSAGE DATE
================================= */


/* =================================
   END: MESSAGE SYSTEM
================================= */