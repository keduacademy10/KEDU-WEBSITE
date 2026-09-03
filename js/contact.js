/* =========================================
   KEDU WORLD — CONTACT CONTROLLER
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        "use strict";


        /* =====================================
           CONFIGURATION
        ====================================== */

        const STORAGE_KEY =
            "kedu-contact-message-ids";


        const SUBJECTS =
            [
                "General Inquiry",
                "KEDU App",
                "Others App",
                "Technical Support",
                "App Download",
                "Bug Report",
                "Suggestion",
                "Feedback",
                "Other"
            ];


        /* =====================================
           ELEMENTS
        ====================================== */

        const contactForm =
            document.getElementById(
                "kedu-contact-form"
            );


        const nameInput =
            document.getElementById(
                "contact-name"
            );


        const emailInput =
            document.getElementById(
                "contact-email"
            );


        const subjectInput =
            document.getElementById(
                "contact-subject"
            );


        const customSubjectInput =
            document.getElementById(
                "contact-custom-subject"
            );


        const customSubjectGroup =
            document.getElementById(
                "contact-custom-subject-group"
            );


        const subjectSelector =
            document.getElementById(
                "contact-subject-selector"
            );


        const subjectSelectorText =
            document.getElementById(
                "contact-subject-selector-text"
            );


        const messageInput =
            document.getElementById(
                "contact-message"
            );


        const status =
            document.getElementById(
                "contact-form-status"
            );


        const messageHistory =
            document.getElementById(
                "contact-message-history"
            );


        const nameError =
            document.getElementById(
                "contact-name-error"
            );


        const emailError =
            document.getElementById(
                "contact-email-error"
            );


        const subjectError =
            document.getElementById(
                "contact-subject-error"
            );


        const customSubjectError =
            document.getElementById(
                "contact-custom-subject-error"
            );


        const messageError =
            document.getElementById(
                "contact-message-error"
            );


        const subjectDialog =
            document.getElementById(
                "contact-subject-dialog"
            );


        const subjectDialogClose =
            document.getElementById(
                "contact-subject-dialog-close"
            );


        const subjectOptions =
            document.getElementById(
                "contact-subject-options"
            );


        const threadDialog =
            document.getElementById(
                "contact-thread-dialog"
            );


        const threadDialogClose =
            document.getElementById(
                "contact-thread-dialog-close"
            );


        const threadContent =
            document.getElementById(
                "contact-thread-content"
            );


        /* =====================================
           REQUIRED CHECK
        ====================================== */

        if (
            !contactForm ||
            !subjectDialog ||
            !threadDialog
        ) {

            return;

        }


        /* =====================================
           ESCAPE HTML
        ====================================== */

        function escapeHTML(
            value
        ) {

            const temporary =
                document.createElement(
                    "div"
                );


            temporary.textContent =
                String(
                    value || ""
                );


            return temporary.innerHTML;

        }


        /* =====================================
           VALIDATE EMAIL
        ====================================== */

        function isValidEmail(
            email
        ) {

            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(
                    email
                );

        }


        /* =====================================
           SHOW ERROR
        ====================================== */

        function showError(
            input,
            errorElement,
            message
        ) {

            input?.classList.add(
                "invalid"
            );


            if (
                errorElement
            ) {

                errorElement.textContent =
                    message;

            }

        }


        /* =====================================
           CLEAR ERROR
        ====================================== */

        function clearError(
            input,
            errorElement
        ) {

            input?.classList.remove(
                "invalid"
            );


            if (
                errorElement
            ) {

                errorElement.textContent =
                    "";

            }

        }


        /* =====================================
           LOCAL MESSAGE IDS
        ====================================== */

        function getSavedMessageIds() {

            try {

                const saved =
                    JSON.parse(
                        localStorage.getItem(
                            STORAGE_KEY
                        ) || "[]"
                    );


                return Array.isArray(
                    saved
                )
                    ? saved
                    : [];

            }

            catch (
                error
            ) {

                return [];

            }

        }


        function saveMessageId(
            messageId
        ) {

            const ids =
                getSavedMessageIds();


            if (
                !ids.includes(
                    messageId
                )
            ) {

                ids.push(
                    messageId
                );

            }


            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    ids
                )
            );

        }


        /* =====================================
           FORMAT DATE
        ====================================== */

        function formatDate(
            value
        ) {

            if (
                !value
            ) {

                return "";

            }


            const date =
                new Date(
                    value
                );


            return date.toLocaleString(
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


        /* =====================================
           GET USER MESSAGES
        ====================================== */

        async function getMessages() {

            if (
                !window.keduSupabase
            ) {

                return [];

            }


            const messageIds =
                getSavedMessageIds();


            if (
                messageIds.length ===
                0
            ) {

                return [];

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
                    .in(
                        "id",
                        messageIds
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


                return [];

            }


            return data || [];

        }


        /* =====================================
           RENDER MESSAGE HISTORY
        ====================================== */

        async function renderMessageHistory() {

            if (
                !messageHistory
            ) {

                return;

            }


            messageHistory.innerHTML =
                "";


            const messages =
                await getMessages();


            messages.forEach(
                (
                    message
                ) => {

                    const card =
                        document.createElement(
                            "button"
                        );


                    card.type =
                        "button";


                    card.className =
                        "contact-ticket-card";


                    const replied =
                        Boolean(
                            message.is_replied
                        );


                    card.innerHTML =
                        `
                        <div class="contact-ticket-top">

                            <span class="contact-ticket-brand">
                                KEDU
                            </span>

                            <span class="contact-ticket-status">
                                ${
                                    replied
                                        ? "Replied"
                                        : "Waiting"
                                }
                            </span>

                        </div>

                        <h3>
                            ${
                                escapeHTML(
                                    message.subject ||
                                    "General Inquiry"
                                )
                            }
                        </h3>

                        <p>
                            ${
                                replied
                                    ? "KEDU has replied to your message."
                                    : "Your message is waiting for a reply."
                            }
                        </p>

                        <div class="contact-ticket-details">

                            <span>
                                ${
                                    formatDate(
                                        message.created_at
                                    )
                                }
                            </span>

                        </div>
                        `;


                    card.addEventListener(
                        "click",
                        () => {

                            openThread(
                                message
                            );

                        }
                    );


                    messageHistory.appendChild(
                        card
                    );

                }
            );

        }


        /* =====================================
           OPEN THREAD
        ====================================== */

        function openThread(
            message
        ) {

            threadContent.innerHTML =
                `
                <div class="contact-thread-ticket">

                    <div class="contact-thread-ticket-header">

                        <strong>
                            ${
                                escapeHTML(
                                    message.subject ||
                                    "General Inquiry"
                                )
                            }
                        </strong>

                        <span>
                            ${
                                message.is_replied
                                    ? "Replied"
                                    : "Waiting"
                            }
                        </span>

                    </div>

                    <div class="contact-thread-meta">

                        ${
                            formatDate(
                                message.created_at
                            )
                        }

                    </div>

                </div>


                <div class="contact-chat-message user">

                    <span class="contact-chat-sender">
                        YOU
                    </span>

                    <p>
                        ${
                            escapeHTML(
                                message.message
                            )
                                .replace(
                                    /\n/g,
                                    "<br>"
                                )
                        }
                    </p>

                </div>


                ${
                    message.reply
                        ? `
                            <div class="contact-chat-message kedu">

                                <span class="contact-chat-sender">
                                    KEDU
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
                        : `
                            <div class="contact-chat-empty">

                                Your message is waiting
                                for a reply from KEDU.

                            </div>
                        `
                }
                `;


            threadDialog.hidden =
                false;


            document.body.style.overflow =
                "hidden";

        }


        /* =====================================
           CLOSE THREAD
        ====================================== */

        function closeThread() {

            threadDialog.hidden =
                true;


            document.body.style.overflow =
                "";

        }


        /* =====================================
           SUBJECT OPTIONS
        ====================================== */

        function buildSubjectOptions() {

            if (
                !subjectOptions
            ) {

                return;

            }


            subjectOptions.innerHTML =
                "";


            SUBJECTS.forEach(
                (
                    subject
                ) => {

                    const button =
                        document.createElement(
                            "button"
                        );


                    button.type =
                        "button";


                    button.className =
                        "contact-subject-option";


                    button.textContent =
                        subject;


                    button.addEventListener(
                        "click",
                        () => {

                            subjectInput.value =
                                subject;


                            subjectSelectorText.textContent =
                                subject;


                            clearError(
                                subjectSelector,
                                subjectError
                            );


                            customSubjectGroup.hidden =
                                subject !==
                                "Other";


                            if (
                                subject ===
                                "Other"
                            ) {

                                customSubjectInput.focus();

                            }

                            else {

                                customSubjectInput.value =
                                    "";

                            }


                            subjectDialog.hidden =
                                true;


                            document.body.style.overflow =
                                "";

                        }
                    );


                    subjectOptions.appendChild(
                        button
                    );

                }
            );

        }


        /* =====================================
           SUBJECT DIALOG
        ====================================== */

        subjectSelector?.addEventListener(
            "click",
            () => {

                subjectDialog.hidden =
                    false;


                document.body.style.overflow =
                    "hidden";

            }
        );


        subjectDialogClose?.addEventListener(
            "click",
            () => {

                subjectDialog.hidden =
                    true;


                document.body.style.overflow =
                    "";

            }
        );


        subjectDialog.addEventListener(
            "click",
            (
                event
            ) => {

                if (
                    event.target ===
                    subjectDialog
                ) {

                    subjectDialog.hidden =
                        true;


                    document.body.style.overflow =
                        "";

                }

            }
        );


        /* =====================================
           THREAD EVENTS
        ====================================== */

        threadDialogClose?.addEventListener(
            "click",
            closeThread
        );


        threadDialog.addEventListener(
            "click",
            (
                event
            ) => {

                if (
                    event.target ===
                    threadDialog
                ) {

                    closeThread();

                }

            }
        );


        /* =====================================
           FORM SUBMIT
        ====================================== */

        contactForm.addEventListener(
            "submit",
            async (
                event
            ) => {

                event.preventDefault();


                clearError(
                    nameInput,
                    nameError
                );


                clearError(
                    emailInput,
                    emailError
                );


                clearError(
                    subjectSelector,
                    subjectError
                );


                clearError(
                    customSubjectInput,
                    customSubjectError
                );


                clearError(
                    messageInput,
                    messageError
                );


                const name =
                    nameInput.value
                        .trim();


                const email =
                    emailInput.value
                        .trim();


                const selectedSubject =
                    subjectInput.value
                        .trim();


                const customSubject =
                    customSubjectInput.value
                        .trim();


                const message =
                    messageInput.value
                        .trim();


                let valid =
                    true;


                if (
                    name.length < 2
                ) {

                    showError(
                        nameInput,
                        nameError,
                        "Please enter your full name."
                    );


                    valid =
                        false;

                }


                if (
                    !isValidEmail(
                        email
                    )
                ) {

                    showError(
                        emailInput,
                        emailError,
                        "Please enter a valid email address."
                    );


                    valid =
                        false;

                }


                if (
                    !selectedSubject
                ) {

                    showError(
                        subjectSelector,
                        subjectError,
                        "Please select a subject."
                    );


                    valid =
                        false;

                }


                if (
                    selectedSubject ===
                    "Other" &&
                    !customSubject
                ) {

                    showError(
                        customSubjectInput,
                        customSubjectError,
                        "Please enter your subject."
                    );


                    valid =
                        false;

                }


                if (
                    message.length < 10
                ) {

                    showError(
                        messageInput,
                        messageError,
                        "Message must contain at least 10 characters."
                    );


                    valid =
                        false;

                }


                if (
                    !valid
                ) {

                    return;

                }


                if (
                    !window.keduSupabase
                ) {

                    status.textContent =
                        "Message service is unavailable.";


                    return;

                }


                const finalSubject =
                    selectedSubject ===
                    "Other"
                        ? customSubject
                        : selectedSubject;


                const submitButton =
                    document.getElementById(
                        "contact-submit-button"
                    );


                if (
                    submitButton
                ) {

                    submitButton.disabled =
                        true;


                    submitButton.textContent =
                        "SENDING...";

                }


                status.textContent =
                    "Sending your message...";


                try {

                    const {
                        data,
                        error
                    } =
                        await window
                            .keduSupabase
                            .from(
                                "messages"
                            )
                            .insert(
                                {
                                    sender_name:
                                        name,

                                    sender_email:
                                        email,

                                    subject:
                                        finalSubject,

                                    message:
                                        message,

                                    reply:
                                        null,

                                    is_replied:
                                        false
                                }
                            )
                            .select()
                            .single();


                    if (
                        error
                    ) {

                        throw error;

                    }


                    saveMessageId(
                        data.id
                    );


                    contactForm.reset();


                    subjectInput.value =
                        "";


                    subjectSelectorText.textContent =
                        "Select your message subject";


                    customSubjectGroup.hidden =
                        true;


                    status.textContent =
                        "Your message has been sent successfully.";


                    status.className =
                        "contact-form-status success";


                    await renderMessageHistory();

                }

                catch (
                    error
                ) {

                    console.error(
                        "Message sending error:",
                        error
                    );


                    status.textContent =
                        error.message ||
                        "Unable to send your message.";


                    status.className =
                        "contact-form-status error";

                }

                finally {

                    if (
                        submitButton
                    ) {

                        submitButton.disabled =
                            false;


                        submitButton.innerHTML =
                            `
                            <span>
                                SEND MESSAGE
                            </span>

                            <span class="contact-submit-icon">
                                →
                            </span>
                            `;

                    }

                }

            }
        );


        /* =====================================
           REALTIME MESSAGE UPDATES
        ====================================== */

        if (
            window.keduSupabase
        ) {

            window
                .keduSupabase
                .channel(
                    "kedu-world-message-updates"
                )
                .on(
                    "postgres_changes",
                    {
                        event: "UPDATE",
                        schema: "public",
                        table: "messages"
                    },
                    async (
                        payload
                    ) => {

                        const ids =
                            getSavedMessageIds();


                        if (
                            ids.includes(
                                payload.new.id
                            )
                        ) {

                            await renderMessageHistory();

                        }

                    }
                )
                .subscribe();

        }


        /* =====================================
           INITIALIZE
        ====================================== */

        buildSubjectOptions();

        renderMessageHistory();

    }
);