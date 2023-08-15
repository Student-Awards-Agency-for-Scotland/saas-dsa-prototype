



!(function () {
    "use strict";
    var t = {
            init() {
                if (!CSS.supports("selector(html:has(body))")) {
                    const t = document.querySelector(".ds_page__middle");
                    t && t.querySelector(".ds_pre-footer-background") && t.classList.add("js-pre-footer-background");
                }
            },
        },
        e = class {
            constructor(t) {
                (this.accordion = t), (this.items = [].slice.call(t.querySelectorAll(".ds_accordion-item"))), (this.openAllButton = t.querySelector(".js-open-all"));
            }
            init() {
                this.accordion.classList.contains("js-initialised") || (this.items.forEach((t, e) => this.initAccordionItem(t, e)), this.openAllButton && this.initOpenAll(), this.accordion.classList.add("js-initialised"));
            }
            initAccordionItem(t, e) {
                const s = t.querySelector(".ds_accordion-item__control"),
                    i = t.querySelector(".ds_accordion-item__header"),
                    a = i.querySelector(".ds_accordion-item__title"),
                    n = t.querySelector(".ds_accordion-item__body"),
                    o = parseInt(1e6 * Math.random(), 10),
                    r = s.checked,
                    l = document.createElement("button"),
                    c = document.createElement("span");
                l.classList.add("ds_accordion-item__header-button"),
                    l.classList.add("js-accordion-button"),
                    c.classList.add("ds_accordion-item__indicator"),
                    (l.id = a.id),
                    (l.type = "button"),
                    s.classList.remove("visually-hidden"),
                    s.classList.add("fully-hidden"),
                    (l.innerHTML = a.innerHTML),
                    l.appendChild(c),
                    i.parentNode.removeChild(i),
                    t.insertBefore(l, n),
                    (n.id = n.id || `accordion-item-${o}`),
                    l.setAttribute("aria-controls", n.id),
                    r && (t.classList.add("ds_accordion-item--open"), (n.style.maxHeight = n.scrollHeight + 21 + 28 + "px"), this.openAllButton && this.setOpenAllButton(this.checkAllOpen())),
                    l.setAttribute("aria-expanded", r),
                    l.setAttribute("aria-controls", n.id),
                    l.addEventListener("click", (e) => {
                        e.preventDefault(), this.toggleAccordionItem(t);
                    });
            }
            initOpenAll() {
                this.openAllButton.addEventListener("click", () => {
                    const t = !this.checkAllOpen(),
                        e = [].slice.call(this.accordion.querySelectorAll(".ds_accordion-item__header-button"));
                    let s;
                    (s = t ? e.filter((t) => !t.parentNode.classList.contains("ds_accordion-item--open")) : e.filter((t) => t.parentNode.classList.contains("ds_accordion-item--open"))),
                        s.forEach((t) => {
                            this.toggleAccordionItem(t.parentNode);
                        }),
                        this.setOpenAllButton(t);
                });
            }
            toggleAccordionItem(t) {
                const e = t.querySelector(".js-accordion-button"),
                    s = t.querySelector(".ds_accordion-item__control"),
                    i = t.querySelector(".ds_accordion-item__body"),
                    a = t.classList.contains("ds_accordion-item--open");
                a
                    ? ((i.style.maxHeight = 0),
                      t.classList.remove("ds_accordion-item--open"),
                      window.setTimeout(function () {
                          i.style.removeProperty("display");
                      }, 200))
                    : (t.classList.add("ds_accordion-item--open"),
                      (i.style.display = "block"),
                      (i.style.maxHeight = i.scrollHeight + 24 + 32 + "px"),
                      window.setTimeout(function () {
                          i.style.removeProperty("max-height");
                      }, 200)),
                    e.setAttribute("aria-expanded", !a),
                    (s.checked = !a),
                    this.openAllButton && this.setOpenAllButton(this.checkAllOpen());
            }
            setOpenAllButton(t) {
                this.openAllButton.innerHTML = t ? 'Close all <span class="visually-hidden">sections</span>' : 'Open all <span class="visually-hidden">sections</span>';
            }
            checkAllOpen() {
                const t = this.accordion.querySelectorAll(".ds_accordion-item--open").length;
                return this.items.length === t;
            }
        },
        s = class {
            constructor(t, e = document) {
                (this.aspectBox = t), (this.document = e);
            }
            init() {
                if ("objectFit" in this.document.documentElement.style == 0) {
                    const t = this.aspectBox.querySelector("img.ds_aspect-box__inner");
                    t &&
                        ((this.aspectBox.style.backgroundImage = `url(${t.src})`),
                        this.aspectBox.classList.add("ds_aspect-box--fallback"),
                        "" != t.alt && (this.aspectBox.setAttribute("role", "img"), this.aspectBox.setAttribute("aria-label", t.alt)));
                }
            }
        },
        i = function (t, e, s) {
            function i(t) {
                if (!t.data) return !1;
                let i, a, n;
                return (
                    (i = new RegExp(e, "i").exec(t.data)) &&
                        ((n = document.createElement(s.tagName)), s.className && (n.className = s.className), (a = t.splitText(i.index)), a.splitText(i[0].length), n.appendChild(a.cloneNode(!0)), t.parentNode.replaceChild(n, a)),
                    !!i
                );
            }
            (s = Object.assign({}, { tagName: "MARK", className: "ds_autocomplete__highlight" }, s)),
                (function t(e) {
                    let s;
                    for (let a = 0; a < e.childNodes.length; a++) (s = e.childNodes[a]), 3 === s.nodeType ? (a += i(s) ? 1 : 0) : t(s);
                })(t);
        },
        a = function (t, e = "GET") {
            const s = new XMLHttpRequest();
            return new Promise((i, a) => {
                (s.onreadystatechange = () => {
                    4 === s.readyState && (s.status >= 200 && s.status < 300 ? i(s) : a({ status: s.status, statusText: s.statusText }));
                }),
                    s.open(e, t, !0),
                    s.send();
            });
        },
        n = class {
            constructor(t, e = window, s = {}) {
                s.footerElSelector ? (this.footerEl = document.querySelector(s.footerElSelector)) : (this.footerEl = document.querySelector(".ds_site-footer")), (this.backToTopElement = t), (this.window = e);
            }
            init() {
                this.backToTopElement && (this.checkDisplay(), this.window.addEventListener("scroll", () => this.checkPosition()));
            }
            checkDisplay() {
                document.body.offsetHeight > this.window.innerHeight ? this.backToTopElement.classList.remove("visually-hidden") : this.backToTopElement.classList.add("visually-hidden");
            }
            checkPosition() {
                this.backToTopElement.style.bottom = this.footerEl.offsetHeight + 8 + "px";
            }
        },
        o = class {
            constructor(t) {
                (this.field = t), (this.inputElement = this.field.querySelector("input, textarea")), (this.threshold = this.field.dataset.threshold ? 0.01 * this.field.dataset.threshold : 0);
            }
            init() {
                this.inputElement &&
                    (this.setMaxLength(),
                    this.maxLength &&
                        ((this.emptyMessage = `You can enter up to ${this.maxLength} characters`),
                        (this.messageElement = document.createElement("div")),
                        this.messageElement.setAttribute("aria-live", "polite"),
                        this.messageElement.classList.add("ds_input__message"),
                        this.messageElement.classList.add("ds_hint-text"),
                        this.inputElement.value.length < this.maxLength * this.threshold && this.messageElement.classList.add("fully-hidden"),
                        this.field.appendChild(this.messageElement),
                        this.updateCountMessage(),
                        this.inputElement.addEventListener("keyup", this.checkIfChanged.bind(this))));
            }
            setMaxLength() {
                this.inputElement.getAttribute("maxlength") ? ((this.maxLength = parseInt(this.inputElement.getAttribute("maxlength"), 10)), this.inputElement.removeAttribute("maxlength")) : (this.maxLength = this.field.dataset.maxlength);
            }
            checkIfChanged() {
                this.inputElement.oldValue || (this.inputElement.oldValue = ""), this.inputElement.value !== this.inputElement.oldValue && ((this.inputElement.oldValue = this.inputElement.value), this.updateCountMessage.bind(this)());
            }
            updateCountMessage() {
                const t = this.maxLength - this.inputElement.value.length;
                let e = "characters";
                1 === Math.abs(t) && (e = "character"),
                    (this.messageElement.innerText = `You have ${t} ${e} remaining`),
                    t < 0
                        ? (this.inputElement.classList.add("ds_input--error"),
                          this.inputElement.setAttribute("aria-invalid", !0),
                          (this.messageElement.innerText = `You have ${Math.abs(t)} ${e} too many`),
                          this.messageElement.classList.add("ds_input__message--error"))
                        : (this.inputElement.classList.remove("ds_input--error"),
                          this.inputElement.setAttribute("aria-invalid", !1),
                          0 === this.inputElement.value.length ? (this.messageElement.innerText = this.emptyMessage) : (this.messageElement.innerText = `You have ${t} ${e} remaining`),
                          this.messageElement.classList.remove("ds_input__message--error")),
                    this.inputElement.value.length < this.maxLength * this.threshold ? this.messageElement.classList.add("fully-hidden") : this.messageElement.classList.remove("fully-hidden");
            }
        },
        r = class {
            constructor(t) {
                this.checkboxes = [].slice.call(t.querySelectorAll(".ds_checkbox__input"));
            }
            init() {
                this.checkboxes.forEach((t) => {
                    t.addEventListener("change", () => {
                        "exclusive" === t.dataset.behaviour ? this.checkboxes.filter((e) => e !== t).forEach((t) => (t.checked = !1)) : this.checkboxes.filter((t) => "exclusive" === t.dataset.behaviour).forEach((t) => (t.checked = !1));
                    });
                });
            }
        };
    const l = {
        categories: { necessary: "necessary", preferences: "preferences", statistics: "statistics", campaigns: "campaigns", marketing: "marketing" },
        types: { cookie: "cookie", localStorage: "local", sessionStorage: "session" },
        set: function (t) {
            if (l.hasPermission(t.category)) {
                if (t.type === l.types.cookie) return l.cookie.set(t.name, t.value, t.expires);
                t.type === l.types.localStorage ? localStorage.setItem(t.name, t.value) : t.type === l.types.sessionStorage && sessionStorage.setItem(t.name, t.value);
            }
        },
        get: function (t) {
            let e;
            return t.type === l.types.cookie ? (e = l.cookie.get(t.name)) : t.type === l.types.localStorage ? (e = localStorage.getItem(t.name)) : t.type === l.types.sessionStorage && (e = sessionStorage.getItem(t.name)), e;
        },
        setCookie: function (t, e, s, i) {
            l.hasPermission(t) && l.cookie.set(e, s, i);
        },
        setLocalStorage: function (t, e, s) {
            l.hasPermission(t) && localStorage.setItem(e, s);
        },
        setSessionStorage: function (t, e, s) {
            l.hasPermission(t) && sessionStorage.setItem(e, s);
        },
        getCookie: function (t) {
            return l.cookie.get(t);
        },
        getLocalStorage: function (t) {
            return localStorage.getItem(t);
        },
        getSessionStorage: function (t) {
            return sessionStorage.getItem(t);
        },
        cookie: {
            set: function (t, e, s) {
                const i = { name: t, value: (e = window.btoa(e)) };
                if (s) {
                    const t = new Date();
                    t.setTime(t.getTime() + 24 * s * 60 * 60 * 1e3), (i.expires = t.toUTCString());
                }
                let a = t + "=" + e + "; ";
                return i.expires && (a += "expires=" + i.expires + "; "), (a += "path=/"), (document.cookie = a), i;
            },
            get: function (t) {
                const e = t + "=",
                    s = document.cookie.split(";");
                function i(t) {
                    if ("" === t || "" === t.trim()) return !1;
                    try {
                        return window.btoa(window.atob(t)) == t;
                    } catch (t) {
                        return !1;
                    }
                }
                for (let t = 0, a = s.length; t < a; t++) {
                    let a = s[t];
                    for (; " " === a.charAt(0); ) a = a.substring(1, a.length);
                    if (0 === a.indexOf(e)) {
                        const t = a.substring(e.length, a.length);
                        return i(t) ? window.atob(t) : t;
                    }
                }
                return null;
            },
        },
        hasPermission(t) {
            const e = l.get({ type: l.types.cookie, name: "cookiePermissions" }) || "";
            let s = {};
            return l.isJsonString(e) && (s = JSON.parse(e)), t === l.categories.necessary || !0 === s[t];
        },
        isJsonString: function (t) {
            try {
                JSON.parse(t);
            } catch (t) {
                return !1;
            }
            return !0;
        },
    };
    window.storage = l;
    var c = l;
    function d(t) {
        (t.tabIndex = -1),
            t.addEventListener("focusout", () => {
                t.removeAttribute("tabindex");
            }),
            t.focus();
    }
    var u = class {
            constructor(t, e = c) {
                (this.storage = e),
                    (this.cookieNoticeElement = t),
                    (this.cookieNoticeSuccessElement = document.getElementById("cookie-confirm")),
                    (this.cookieAcceptAllButton = this.cookieNoticeElement.querySelector(".js-accept-all-cookies")),
                    (this.cookieAcceptEssentialButton = this.cookieNoticeElement.querySelector(".js-accept-essential-cookies"));
            }
            init() {
                this.storage.get({ type: this.storage.types.cookie, name: "cookie-notification-acknowledged" }) || this.cookieNoticeElement.classList.remove("fully-hidden"),
                    this.cookieAcceptAllButton.addEventListener("click", (t) => {
                        t.preventDefault(), this.setAllOptionalPermissions(!0), this.cookieNoticeElement.classList.add("fully-hidden"), this.cookieNoticeSuccessElement.classList.remove("fully-hidden"), d(this.cookieNoticeSuccessElement);
                    }),
                    this.cookieAcceptEssentialButton.addEventListener("click", (t) => {
                        t.preventDefault(), this.setAllOptionalPermissions(!1), this.cookieNoticeElement.classList.add("fully-hidden"), this.cookieNoticeSuccessElement.classList.remove("fully-hidden"), d(this.cookieNoticeSuccessElement);
                    });
            }
            setAllOptionalPermissions(t) {
                const e = JSON.parse(JSON.stringify(this.storage.categories));
                for (const s in e) s === this.storage.categories.necessary ? (e[s] = !0) : (e[s] = t);
                this.storage.setCookie(this.storage.categories.necessary, "cookiePermissions", JSON.stringify(e), 365), this.storage.setCookie(this.storage.categories.necessary, "cookie-notification-acknowledged", "yes", 365);
            }
        },
        h = class {
            constructor(t) {
                (this.details = t), (this.summary = t.querySelector(".ds_details__summary")), (this.content = t.querySelector(".ds_details__text")), (this.keycodes = { enter: 13, space: 32 });
            }
            init() {
                this.details.open;
            }
            closeDetails() {
                this.details.removeAttribute("open"), this.summary.setAttribute("aria-expanded", "false"), (this.content.style.display = "none");
            }
            openDetails() {
                this.details.setAttribute("open", "open"), this.summary.setAttribute("aria-expanded", "true"), (this.content.style.display = "");
            }
            polyfillAttributes() {
                (this.content.id = this.content.id || `details-${parseInt(1e6 * Math.random(), 10)}`),
                    this.details.setAttribute("role", "group"),
                    this.summary.setAttribute("role", "button"),
                    this.summary.setAttribute("aria-controls", this.content.id),
                    (this.summary.tabIndex = 0);
                const t = this.details.hasAttribute("open");
                this.summary.setAttribute("aria-expanded", t.toString()), t || (this.content.style.display = "none");
            }
            polyfillEvents() {
                this.summary.addEventListener("click", () => {
                    this.setState();
                }),
                    this.summary.addEventListener("keypress", (t) => {
                        (t.keyCode !== this.keycodes.enter && t.keyCode !== this.keycodes.space) || (t.preventDefault(), this.setState());
                    }),
                    this.summary.addEventListener("kayup", (t) => {
                        t.keyCode === this.keycodes.space && t.preventDefault();
                    });
            }
            setState() {
                this.details.hasAttribute("open") ? this.closeDetails() : this.openDetails();
            }
        };
    class g {
        constructor(t, e, s, i, a) {
            (this.index = e), (this.row = s), (this.column = i), (this.button = t), (this.picker = a), (this.date = new Date());
        }
        init() {
            this.button.addEventListener("keydown", this.keyPress.bind(this)), this.button.addEventListener("click", this.click.bind(this));
        }
        update(t, e, s) {
            (this.button.innerHTML = t.getDate()), (this.date = new Date(t)), s ? this.button.setAttribute("disabled", !0) : this.button.removeAttribute("disabled"), (this.button.style.display = e ? "none" : "block");
        }
        click(t) {
            this.picker.goToDate(this.date), this.picker.selectDate(this.date), t.stopPropagation(), t.preventDefault();
        }
        keyPress(t) {
            let e = !0;
            switch (t.keyCode) {
                case this.picker.keycodes.left:
                    this.picker.focusPreviousDay();
                    break;
                case this.picker.keycodes.right:
                    this.picker.focusNextDay();
                    break;
                case this.picker.keycodes.up:
                    this.picker.focusPreviousWeek();
                    break;
                case this.picker.keycodes.down:
                    this.picker.focusNextWeek();
                    break;
                case this.picker.keycodes.home:
                    this.picker.focusFirstDayOfWeek();
                    break;
                case this.picker.keycodes.end:
                    this.picker.focusLastDayOfWeek();
                    break;
                case this.picker.keycodes.pageup:
                    t.shiftKey ? this.picker.focusPreviousYear(t) : this.picker.focusPreviousMonth(t);
                    break;
                case this.picker.keycodes.pagedown:
                    t.shiftKey ? this.picker.focusNextYear(t) : this.picker.focusNextMonth(t);
                    break;
                case this.picker.keycodes.esc:
                    this.picker.closeDialog();
                    break;
                default:
                    e = !1;
            }
            e && (t.preventDefault(), t.stopPropagation());
        }
    }
    var m = class {
            constructor(t, e = {}) {
                t &&
                    ((this.datePickerParent = t),
                    (this.inputElement = this.datePickerParent.querySelector("input")),
                    (this.dayLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]),
                    (this.monthLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]),
                    (this.currentDate = new Date()),
                    this.currentDate.setHours(0, 0, 0, 0),
                    (this.calendarDays = []),
                    (this.imagePath = e.imagePath || "/assets/images/icons/"),
                    (this.keycodes = { tab: 9, esc: 27, pageup: 33, pagedown: 34, end: 35, home: 36, left: 37, up: 38, right: 39, down: 40 }),
                    e.minDate && this.setMinDate(e.minDate),
                    e.maxDate && this.setMaxDate(e.maxDate));
            }
            init() {
                if (!this.inputElement || this.datePickerParent.classList.contains("js-initialised")) return;
                const t = document.createElement("div");
                (t.innerHTML = this.buttonTemplate()),
                    (this.calendarButtonElement = t.firstChild),
                    this.calendarButtonElement.setAttribute("data-button", `datepicker-${this.inputElement.id}-toggle`),
                    this.inputElement.parentNode.appendChild(this.calendarButtonElement),
                    this.inputElement.parentNode.classList.add("ds_input__wrapper--has-icon");
                const e = document.createElement("div");
                (e.id = "datepicker-" + parseInt(1e6 * Math.random(), 10)),
                    (e.titleId = "datepicker-title-" + parseInt(1e6 * Math.random(), 10)),
                    e.setAttribute("class", "ds_datepicker__dialog  datepickerDialog"),
                    e.setAttribute("role", "dialog"),
                    e.setAttribute("aria-modal", "true"),
                    e.setAttribute("aria-labelledby", e.titleId),
                    (e.innerHTML = this.dialogTemplate(e.titleId)),
                    (this.dialogElement = e),
                    this.datePickerParent.appendChild(e),
                    (this.dialogTitleNode = this.dialogElement.querySelector(".js-datepicker-month-year")),
                    this.setMinAndMaxDatesOnCalendar();
                const s = this.datePickerParent.querySelector("tbody");
                let i = 0;
                for (let t = 0; t < 6; t++) {
                    const e = s.insertRow(t);
                    for (let s = 0; s < 7; s++) {
                        const a = document.createElement("td"),
                            n = document.createElement("button");
                        (n.dataset.form = "date-select"), a.appendChild(n), e.appendChild(a);
                        const o = new g(n, i, t, s, this);
                        o.init(), this.calendarDays.push(o), i++;
                    }
                }
                (this.prevMonthButton = this.dialogElement.querySelector(".js-datepicker-prev-month")),
                    (this.prevYearButton = this.dialogElement.querySelector(".js-datepicker-prev-year")),
                    (this.nextMonthButton = this.dialogElement.querySelector(".js-datepicker-next-month")),
                    (this.nextYearButton = this.dialogElement.querySelector(".js-datepicker-next-year")),
                    this.prevMonthButton.addEventListener("click", (t) => this.focusPreviousMonth(t, !1)),
                    this.prevYearButton.addEventListener("click", (t) => this.focusPreviousYear(t, !1)),
                    this.nextMonthButton.addEventListener("click", (t) => this.focusNextMonth(t, !1)),
                    this.nextYearButton.addEventListener("click", (t) => this.focusNextYear(t, !1)),
                    (this.cancelButton = this.dialogElement.querySelector(".js-datepicker-cancel")),
                    (this.okButton = this.dialogElement.querySelector(".js-datepicker-ok")),
                    this.cancelButton.addEventListener("click", (t) => {
                        t.preventDefault(), this.closeDialog(t);
                    }),
                    this.okButton.addEventListener("click", () => this.selectDate(this.currentDate));
                const a = this.dialogElement.querySelectorAll('button:not([disabled="true"])');
                (this.firstButtonInDialog = a[0]),
                    (this.lastButtonInDialog = a[a.length - 1]),
                    this.firstButtonInDialog.addEventListener("keydown", (t) => this.firstButtonKeyup(t)),
                    this.lastButtonInDialog.addEventListener("keydown", (t) => this.lastButtonKeyup(t)),
                    this.calendarButtonElement.addEventListener("click", (t) => this.toggleDialog(t)),
                    document.body.addEventListener("mouseup", (t) => this.backgroundClick(t)),
                    this.updateCalendar(),
                    this.datePickerParent.classList.add("js-initialised");
            }
            buttonTemplate() {
                return `<button class="ds_button  ds_button--icon-only  js-calendar-button">\n            <span class="visually-hidden">Choose date</span>\n            <svg class="ds_icon" aria-hidden="true" role="img"><use href="${this.imagePath}icons.stack.svg#calendar_today"></use></svg>\n        </button>\n        `;
            }
            dialogTemplate(t) {
                return `<div class="ds_datepicker__dialog__header ">\n        <div class="ds_datepicker__dialog__navbuttons">\n            <button class="ds_button  ds_button--icon-only  js-datepicker-prev-year" aria-label="previous year" data-button="button-datepicker-prevyear">\n                <span class="visually-hidden">Previous year</span>\n                <svg focusable="false" class="ds_icon" aria-hidden="true" role="img"><use href="${this.imagePath}icons.stack.svg#double_chevron_left"></use></svg>\n            </button>\n\n            <button class="ds_button  ds_button--icon-only  js-datepicker-prev-month" aria-label="previous month" data-button="button-datepicker-prevmonth">\n                <span class="visually-hidden">Previous month</span>\n                <svg focusable="false" class="ds_icon" aria-hidden="true" role="img"><use href="${this.imagePath}icons.stack.svg#chevron_left"></use></svg>\n            </button>\n        </div>\n\n        <h2 id="${t}" class="ds_datepicker__dialog__title  js-datepicker-month-year" aria-live="polite">June 2020</h2>\n\n        <div class="ds_datepicker__dialog__navbuttons">\n            <button class="ds_button  ds_button--icon-only  js-datepicker-next-month" aria-label="next month" data-button="button-datepicker-nextmonth">\n                <span class="visually-hidden">Next month</span>\n                <svg focusable="false" class="ds_icon" aria-hidden="true" role="img"><use href="${this.imagePath}icons.stack.svg#chevron_right"></use></svg>\n            </button>\n\n            <button class="ds_button  ds_button--icon-only  js-datepicker-next-year" aria-label="next year" data-button="button-datepicker-nextyear">\n                <span class="visually-hidden">Next year</span>\n                <svg focusable="false" class="ds_icon" aria-hidden="true" role="img"><use href="${this.imagePath}icons.stack.svg#double_chevron_right"></use></svg>\n            </button>\n        </div>\n      </div>\n\n      <table class="ds_datepicker__dialog__table  js-datepicker-grid" role="grid" aria-labelledby="${t}">\n      <caption class="ds_datepicker__dialog__table-caption">You can use the cursor keys to select a date</caption>\n      <thead>\n          <tr>\n          <th scope="col" abbr="Sunday">Su</th>\n          <th scope="col" abbr="Monday">Mo</th>\n          <th scope="col" abbr="Tuesday">Tu</th>\n          <th scope="col" abbr="Wednesday">We</th>\n          <th scope="col" abbr="Thursday">Th</th>\n          <th scope="col" abbr="Friday">Fr</th>\n          <th scope="col" abbr="Saturday">Sa</th>\n          </tr>\n      </thead>\n\n      <tbody></tbody>\n      </table>\n\n      <div class="ds_datepicker__dialog__buttongroup">\n      <button class="ds_button  ds_button--small  ds_button--cancel  js-datepicker-cancel" value="cancel" data-button="button-datepicker-cancel">Cancel</button>\n      <button class="ds_button  ds_button--small  js-datepicker-ok" value="ok" data-button="button-datepicker-ok">OK</button>\n      </div>`;
            }
            leadingZeroes(t, e = 2) {
                let s = t.toString();
                for (; s.length < e; ) s = "0" + s.toString();
                return s;
            }
            setMinDate(t) {
                this.inputElement.dataset.mindate = this.formattedDateFromDate(t);
            }
            setMaxDate(t) {
                this.inputElement.dataset.maxdate = this.formattedDateFromDate(t);
            }
            setMinAndMaxDatesOnCalendar() {
                this.inputElement.dataset.mindate && ((this.minDate = this.formattedDateFromString(this.inputElement.dataset.mindate, null)), this.minDate && this.currentDate < this.minDate && (this.currentDate = this.minDate)),
                    this.inputElement.dataset.maxdate && ((this.maxDate = this.formattedDateFromString(this.inputElement.dataset.maxdate, null)), this.maxDate && this.currentDate > this.maxDate && (this.currentDate = this.maxDate));
            }
            formattedDateFromString(t, e = new Date()) {
                let s = null;
                const i = t.split("/");
                if (t.match(/\d{1,4}\/\d{1,2}\/\d{1,4}/))
                    switch (this.inputElement.dataset.dateformat) {
                        case "YMD":
                            s = new Date(`${i[1]}/${i[2]}/${i[0]}`);
                            break;
                        case "MDY":
                            s = new Date(`${i[0]}/${i[1]}/${i[2]}`);
                            break;
                        default:
                            s = new Date(`${i[1]}/${i[0]}/${i[2]}`);
                    }
                return s instanceof Date && !isNaN(s) ? s : e;
            }
            formattedDateFromDate(t) {
                let e = null;
                switch (this.inputElement.dataset.dateformat) {
                    case "YMD":
                        e = `${t.getFullYear()}/${this.leadingZeroes(t.getMonth() + 1)}/${this.leadingZeroes(t.getDate())}`;
                        break;
                    case "MDY":
                        e = `${this.leadingZeroes(t.getMonth() + 1)}/${this.leadingZeroes(t.getDate())}/${t.getFullYear()}`;
                        break;
                    default:
                        e = `${this.leadingZeroes(t.getDate())}/${this.leadingZeroes(t.getMonth() + 1)}/${t.getFullYear()}`;
                }
                return e;
            }
            backgroundClick(t) {
                !this.isOpen() || this.dialogElement.contains(t.target) || this.inputElement.contains(t.target) || this.calendarButtonElement.contains(t.target) || (t.preventDefault(), this.closeDialog());
            }
            formattedDateHuman(t) {
                return `${this.dayLabels[t.getDay()]} ${t.getDate()} ${this.monthLabels[t.getMonth()]} ${t.getFullYear()}`;
            }
            firstButtonKeyup(t) {
                t.keyCode === this.keycodes.tab && t.shiftKey && (this.lastButtonInDialog.focus(), t.preventDefault());
            }
            lastButtonKeyup(t) {
                t.keyCode !== this.keycodes.tab || t.shiftKey || (this.firstButtonInDialog.focus(), t.preventDefault());
            }
            updateCalendar() {
                this.dialogTitleNode.innerHTML = `${this.monthLabels[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
                let t = this.currentDate;
                const e = new Date(t.getFullYear(), t.getMonth(), 1),
                    s = e.getDay();
                e.setDate(e.getDate() - s);
                const i = new Date(e);
                for (let e = 0; e < this.calendarDays.length; e++) {
                    let s,
                        a = i.getMonth() !== t.getMonth();
                    i < this.minDate && (s = !0), i > this.maxDate && (s = !0), this.calendarDays[e].update(i, a, s), i.setDate(i.getDate() + 1);
                }
            }
            setCurrentDate(t = !0) {
                const e = this.currentDate;
                if (
                    (this.calendarDays.forEach((s) => {
                        s.button.setAttribute("tabindex", -1), s.button.classList.remove("ds_selected");
                        const i = s.date;
                        i.setHours(0, 0, 0, 0);
                        const a = new Date();
                        a.setHours(0, 0, 0, 0),
                            i.getTime() !== e.getTime() || s.disabled || (t && (s.button.setAttribute("tabindex", 0), s.button.focus(), s.button.classList.add("ds_selected"))),
                            this.inputDate && i.getTime() === this.inputDate.getTime()
                                ? (s.button.classList.add("ds_datepicker__current"), s.button.setAttribute("aria-selected", !0))
                                : (s.button.classList.remove("ds_datepicker__current"), s.button.removeAttribute("aria-selected")),
                            i.getTime() === a.getTime() ? s.button.classList.add("ds_datepicker__today") : s.button.classList.remove("ds_datepicker__today");
                    }),
                    !t)
                ) {
                    const t = this.calendarDays.filter((t) => "block" === window.getComputedStyle(t.button).display && !t.button.disabled);
                    t[0].button.setAttribute("tabindex", 0), (this.currentDate = t[0].date);
                }
            }
            selectDate(t) {
                switch (
                    ((this.calendarButtonElement.querySelector("span").innerText = `Choose date. Selected date is ${this.formattedDateHuman(t)}`),
                    (this.inputElement.value = `${this.leadingZeroes(t.getDate())}/${this.leadingZeroes(t.getMonth() + 1)}/${t.getFullYear()}`),
                    this.inputElement.dataset.dateformat)
                ) {
                    case "YMD":
                        this.inputElement.value = `${t.getFullYear()}/${this.leadingZeroes(t.getMonth() + 1)}/${this.leadingZeroes(t.getDate())}`;
                        break;
                    case "MDY":
                        this.inputElement.value = `${this.leadingZeroes(t.getMonth() + 1)}/${this.leadingZeroes(t.getDate())}/${t.getFullYear()}`;
                        break;
                    default:
                        this.inputElement.value = `${this.leadingZeroes(t.getDate())}/${this.leadingZeroes(t.getMonth() + 1)}/${t.getFullYear()}`;
                }
                const e = document.createEvent("Event");
                e.initEvent("change", !0, !0), this.inputElement.dispatchEvent(e), this.closeDialog();
            }
            isOpen() {
                return this.dialogElement.classList.contains("ds_datepicker__dialog--open");
            }
            toggleDialog(t) {
                t.preventDefault(), this.isOpen() ? this.closeDialog() : (this.setMinAndMaxDatesOnCalendar(), this.openDialog());
            }
            openDialog() {
                (this.dialogElement.style.display = "block"),
                    this.dialogElement.classList.add("ds_datepicker__dialog--open"),
                    (this.dialogElement.style.left = `${this.inputElement.offsetWidth + 16}px`),
                    this.inputElement.value.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/) && ((this.inputDate = this.formattedDateFromString(this.inputElement.value)), (this.currentDate = this.inputDate)),
                    this.updateCalendar(),
                    this.setCurrentDate();
            }
            closeDialog() {
                (this.dialogElement.style.display = "none"), this.dialogElement.classList.remove("ds_datepicker__dialog--open"), this.calendarButtonElement.focus();
            }
            goToDate(t, e) {
                this.minDate && this.minDate > t && (t = this.minDate), this.maxDate && this.maxDate < t && (t = this.maxDate);
                const s = this.currentDate;
                (this.currentDate = t), (s.getMonth() === this.currentDate.getMonth() && s.getFullYear() === this.currentDate.getFullYear()) || this.updateCalendar(), this.setCurrentDate(e);
            }
            focusNextDay() {
                const t = new Date(this.currentDate);
                t.setDate(t.getDate() + 1), this.goToDate(t);
            }
            focusPreviousDay() {
                const t = new Date(this.currentDate);
                t.setDate(t.getDate() - 1), this.goToDate(t);
            }
            focusNextWeek() {
                const t = new Date(this.currentDate);
                t.setDate(t.getDate() + 7), this.goToDate(t);
            }
            focusPreviousWeek() {
                const t = new Date(this.currentDate);
                t.setDate(t.getDate() - 7), this.goToDate(t);
            }
            focusFirstDayOfWeek() {
                const t = new Date(this.currentDate);
                t.setDate(t.getDate() - t.getDay()), this.goToDate(t);
            }
            focusLastDayOfWeek() {
                const t = new Date(this.currentDate);
                t.setDate(t.getDate() - t.getDay() + 6), this.goToDate(t);
            }
            focusNextMonth(t, e = !0) {
                t.preventDefault();
                const s = new Date(this.currentDate);
                s.setMonth(s.getMonth() + 1), this.goToDate(s, e);
            }
            focusPreviousMonth(t, e = !0) {
                t.preventDefault();
                const s = new Date(this.currentDate);
                s.setMonth(s.getMonth() - 1), this.goToDate(s, e);
            }
            focusNextYear(t, e = !0) {
                t.preventDefault();
                const s = new Date(this.currentDate);
                s.setFullYear(s.getFullYear() + 1), this.goToDate(s, e);
            }
            focusPreviousYear(t, e = !0) {
                t.preventDefault();
                const s = new Date(this.currentDate);
                s.setFullYear(s.getFullYear() - 1), this.goToDate(s, e);
            }
        },
        b = class {
            constructor(t = window) {
                (this.button = document.querySelector(".js-hide-page")), (this.window = t);
            }
            init() {
                this.button && (this.attachKeyboardEvents(), this.attachMouseEvents(), (this.altlink = this.button.dataset.altlink || "https://www.google.co.uk"));
            }
            attachKeyboardEvents() {
                document.addEventListener("keyup", (t) => {
                    ("Escape" !== t.key && 27 !== t.keyCode) || this.doHidePage(t);
                });
            }
            attachMouseEvents() {
                this.button.addEventListener("click", (t) => {
                    this.doHidePage(t);
                });
            }
            doHidePage(t) {
                t.preventDefault(), (document.body.innerHTML = ""), (document.title = "."), this.window.open(this.button.href, "_newtab"), this.window.location.replace(this.altlink);
            }
        },
        p = class {
            constructor(t) {
                this.mobileMenu = t;
            }
            init() {
                this.mobileMenu && this.setupMobileNavigation();
            }
            setupMobileNavigation() {
                const t = document.querySelector(".js-toggle-menu"),
                    e = document.createElement("button");
                (e.innerHTML = t.innerHTML),
                    e.setAttribute("class", t.getAttribute("class")),
                    e.classList.add("ds_link"),
                    e.setAttribute("aria-controls", t.getAttribute("aria-controls")),
                    e.setAttribute("aria-expanded", !1),
                    t.parentNode.appendChild(e),
                    t.parentNode.removeChild(t),
                    e.addEventListener("click", (t) => {
                        t.preventDefault(),
                            (this.mobileMenu = document.getElementById(e.getAttribute("aria-controls"))),
                            document.documentElement.style.setProperty("--mobile-menu-height", this.mobileMenu.scrollHeight + "px"),
                            this.mobileMenu.classList.contains("ds_site-navigation--open")
                                ? (this.mobileMenu.classList.remove("ds_site-navigation--open"), e.classList.remove("ds_site-header__control--active"), e.setAttribute("aria-expanded", !1))
                                : ((this.mobileMenu.style.maxHeight = this.mobileMenu.scrollHeight),
                                  this.mobileMenu.classList.add("ds_site-navigation--open"),
                                  e.classList.add("ds_site-header__control--active"),
                                  e.setAttribute("aria-expanded", !0));
                    });
            }
        },
        _ = class {
            constructor(t = window) {
                this.window = t;
            }
            init() {
                (this.scrollingTables = document.querySelectorAll('table[data-smallscreen="scrolling"]')),
                    (this.boxesTables = document.querySelectorAll('table[data-smallscreen="boxes"]')),
                    this.checkScrollingTables(),
                    this.window.addEventListener("resize", () => {
                        this.checkScrollingTables();
                    }),
                    this.setupBoxesTables();
            }
            checkScrollingTables() {
                this.scrollingTables.forEach((t) => {
                    t.querySelector("tbody").offsetWidth > t.parentNode.offsetWidth ? t.classList.add("js-is-scrolling") : t.classList.remove("js-is-scrolling");
                });
            }
            setupBoxesTables() {
                for (let t = 0, e = this.boxesTables.length; t < e; t++) {
                    const e = this.boxesTables[t].querySelectorAll("tr");
                    let s;
                    if (([].slice.call(e[0].cells).filter((t) => "TH" === t.tagName).length === e[0].cells.length && (s = e[0]), s))
                        for (let t = 1, i = e.length; t < i; t++)
                            [].slice.call(e[t].cells).forEach((t, e) => {
                                t.setAttribute("data-heading", s.cells[e].innerText);
                            });
                }
            }
        },
        f = class {
            constructor(t) {
                (this.notification = t), (this.notificationClose = t.querySelector(".js-close-notification"));
            }
            init() {
                this.notificationClose &&
                    this.notificationClose.addEventListener("click", () => {
                        this.notification.parentNode.removeChild(this.notification);
                    });
            }
        },
        y = class {
            constructor(t) {
                this.sideNavigation = t;
            }
            init() {
                this.sideNavigation && this.setupSideNavigation();
            }
            setupSideNavigation() {
                const t = this.sideNavigation.querySelector(".js-toggle-side-navigation"),
                    e = this.sideNavigation.querySelector(".ds_side-navigation__expand"),
                    s = parseInt(1e6 * Math.random(), 10);
                (this.navList = this.sideNavigation.querySelector(".ds_side-navigation__list")), (this.navList.id = this.navList.id || `side-navigation-${s}`), (t.checked = !1);
                const i = document.createElement("button");
                i.classList.add("ds_side-navigation__expand"),
                    i.classList.add("ds_link"),
                    i.classList.add("js-side-navigation-button"),
                    i.setAttribute("aria-expanded", !1),
                    (i.innerHTML = e.innerHTML),
                    i.setAttribute("aria-expanded", !1),
                    i.setAttribute("aria-controls", this.navList.id),
                    e.parentNode.removeChild(e),
                    this.sideNavigation.insertBefore(i, this.navList),
                    i.setAttribute("aria-controls", this.navList.id),
                    i.addEventListener("click", () => {
                        const e = t.checked;
                        e ? this.closeSideNav() : this.openSideNav(), i.setAttribute("aria-expanded", !e), (t.checked = !e);
                    }),
                    window.addEventListener("scroll", () => {
                        i.offsetTop >= 1 ? i.classList.add("ds_side-navigation__expand--shadow") : i.classList.remove("ds_side-navigation__expand--shadow");
                    }),
                    this.sideNavigation.classList.add("js-initialised");
            }
            openSideNav() {
                (this.navList.style.display = "block"),
                    window.setTimeout(() => {
                        this.navList.style.maxHeight = this.navList.scrollHeight + 16 + "px";
                    }, 0);
            }
            closeSideNav() {
                (this.navList.style.maxHeight = 0),
                    window.setTimeout(() => {
                        this.navList.style.display = "none";
                    }, 200);
            }
        },
        v = {
            init() {
                [].slice.call(document.querySelectorAll(".ds_skip-links__link")).forEach((t) => {
                    t.addEventListener("click", () => {
                        const e = document.querySelector(t.getAttribute("href"));
                        e && d(e);
                    });
                });
            },
        },
        k = class {
            constructor(t, e = window) {
                (this.container = t), (this.window = e);
            }
            init() {
                this.container.querySelectorAll(".ds_accordion-item__body a").forEach((t) => {
                    t.href === this.window.location.origin + this.window.location.pathname && t.classList.add("ds_step-navigation__current-link");
                });
            }
        };
    function E(t) {
        const e = document.createElement("div");
        e.classList.add("ds_breakpoint-check"), e.classList.add("ds_breakpoint-check--" + t), document.body.appendChild(e);
        const s = "block" === window.getComputedStyle(e, null).display;
        return e.parentNode.removeChild(e), s;
    }
    var A = class {
            constructor(t) {
                (this.resizeTimer = null),
                    (this.eventsEnabled = !1),
                    (this.tabContainer = t),
                    (this.tabList = t.querySelector(".ds_tabs__list")),
                    (this.tabHeaders = [].slice.call(t.querySelectorAll(".ds_tabs__tab"))),
                    (this.tabContents = [].slice.call(t.querySelectorAll(".ds_tabs__content"))),
                    (this.keycodes = { left: 37, up: 38, right: 39, down: 40 }),
                    (this.boundOnHashChange = this.onHashChange.bind(this)),
                    window.addEventListener("hashchange", this.boundOnHashChange, !0),
                    (this.boundOnResize = this.onResize.bind(this)),
                    window.addEventListener("resize", this.boundOnResize, !0);
            }
            set() {
                if (!this.tabContainer.classList.contains("js-initialised")) {
                    this.tabList.setAttribute("role", "tablist"), this.tabHeaders.forEach((t, e) => this.initTab(t, e));
                    let t = (this.getTab(window.location.hash) || this.tabHeaders[0].querySelector(".ds_tabs__tab-link")).parentElement;
                    this.activateTab(t), this.tabContainer.classList.add("js-initialised");
                }
            }
            init() {
                E("medium") && (this.set(), (this.eventsEnabled = !0));
            }
            reset() {
                this.tabContainer.classList.contains("js-initialised") && (this.tabContainer.classList.remove("js-initialised"), this.tabList.removeAttribute("role"), this.tabHeaders.forEach((t, e) => this.resetTab(t, e)));
            }
            onResize() {
                clearTimeout(this.resizeTimer),
                    (this.resizeTimer = setTimeout(() => {
                        E("medium") ? this.set() : this.reset();
                    }, 150));
            }
            onHashChange() {
                let t = this.getTab(window.location.hash);
                if (!t) return;
                let e = t.parentElement;
                if (this.changingHash) this.changingHash = !1;
                else if (E("medium")) {
                    let t = this.getCurrentTab();
                    this.deactivateTab(t), this.activateTab(e), e.querySelector(".ds_tabs__tab-link").focus();
                }
            }
            createHistoryEntry(t) {
                let e = this.getHref(t);
                (this.changingHash = !0), (window.location.hash = e);
            }
            resetTab(t, e) {
                t.removeAttribute("role"), t.classList.remove("ds_current");
                const s = t.querySelector(".ds_tabs__tab-link"),
                    i = this.tabContents[e];
                i.getAttribute("id"), s.removeAttribute("role"), s.removeAttribute("aria-controls"), s.removeAttribute("aria-selected"), s.removeAttribute("tabindex"), i.classList.remove("ds_tabs__content--hidden");
            }
            initTab(t, e) {
                t.setAttribute("role", "presentation");
                const s = t.querySelector(".ds_tabs__tab-link"),
                    i = this.tabContents[e],
                    a = i.getAttribute("id");
                s.setAttribute("role", "tab"),
                    s.setAttribute("aria-controls", a),
                    s.setAttribute("aria-selected", "false"),
                    s.setAttribute("tabindex", "-1"),
                    i.classList.add("ds_tabs__content--hidden"),
                    this.eventsEnabled ||
                        (s.addEventListener("click", () => {
                            if (E("medium")) {
                                let e = this.getCurrentTab();
                                this.deactivateTab(e), this.activateTab(t);
                            }
                        }),
                        s.addEventListener("keydown", (t) => {
                            let e = !0;
                            E("medium") &&
                                (t.keyCode === this.keycodes.right
                                    ? this.activateNextTab(t)
                                    : t.keyCode === this.keycodes.left || t.keyCode === this.keycodes.up
                                    ? this.activatePreviousTab(t)
                                    : t.keyCode === this.keycodes.down
                                    ? this.activateNextTab(t)
                                    : (e = !1),
                                e && (t.preventDefault(), t.stopPropagation()));
                        }));
            }
            activateNextTab() {
                let t = this.getCurrentTab(),
                    e = t.nextElementSibling;
                e && (this.deactivateTab(t), this.activateTab(e), this.createHistoryEntry(e), e.querySelector(".ds_tabs__tab-link").focus());
            }
            activatePreviousTab() {
                let t = this.getCurrentTab(),
                    e = t.previousElementSibling;
                e && (this.deactivateTab(t), this.activateTab(e), this.createHistoryEntry(e), e.querySelector(".ds_tabs__tab-link").focus());
            }
            activateTab(t) {
                let e = t.querySelector(".ds_tabs__tab-link"),
                    s = this.getTabContent(t);
                t.classList.add("ds_current"), e.setAttribute("aria-selected", !0), e.setAttribute("tabindex", "0"), s.classList.remove("ds_tabs__content--hidden");
            }
            deactivateTab(t) {
                if (!t) return;
                let e = t.querySelector(".ds_tabs__tab-link"),
                    s = this.getTabContent(t);
                t.classList.remove("ds_current"), e.setAttribute("aria-selected", !1), e.setAttribute("tabindex", "-1"), s.classList.add("ds_tabs__content--hidden");
            }
            getTab(t) {
                return this.tabContainer.querySelector('.ds_tabs__tab-link[href="' + t + '"]');
            }
            getCurrentTab() {
                return this.tabList.querySelector(".ds_tabs__tab.ds_current");
            }
            getHref(t) {
                let e = t.querySelector(".ds_tabs__tab-link").getAttribute("href");
                return e.slice(e.indexOf("#"), e.length);
            }
            getTabContent(t) {
                return this.tabContainer.querySelector(this.getHref(t));
            }
        },
        S = class {
            constructor(t) {
                (this.resizeTimer = null),
                    (this.eventsEnabled = !1),
                    (this.tabContainer = t),
                    (this.tabList = t.querySelector(".ds_tabs__list")),
                    (this.tabHeaders = [].slice.call(t.querySelectorAll(".ds_tabs__tab"))),
                    (this.tabNavigation = t.querySelector(".ds_tabs__navigation")),
                    (this.tabTitle = t.querySelector(".ds_tabs__title")),
                    (this.boundOnResize = this.onResize.bind(this)),
                    window.addEventListener("resize", this.boundOnResize, !0);
            }
            set() {
                if (!this.tabNavigation.classList.contains("js-initialised")) {
                    const t = document.createElement("button"),
                        e = this.tabList.getAttribute("id");
                    t.classList.add("ds_tabs__toggle"),
                        t.setAttribute("aria-expanded", !1),
                        (t.innerHTML = this.tabTitle.innerHTML),
                        t.setAttribute("aria-controls", e),
                        this.tabNavigation.insertBefore(t, this.tabList),
                        t.addEventListener("click", () => {
                            "true" === t.getAttribute("aria-expanded") ? t.setAttribute("aria-expanded", !1) : t.setAttribute("aria-expanded", !0);
                        }),
                        this.tabContainer.querySelector(".ds_tabs__current") && this.tabNavigation.setAttribute("aria-labelledby", "ds_tabs__current"),
                        this.tabNavigation.classList.add("js-initialised");
                }
            }
            init() {
                E("medium") || (this.set(), (this.eventsEnabled = !0));
            }
            reset() {
                if (this.tabNavigation.classList.contains("js-initialised")) {
                    this.tabNavigation.classList.remove("js-initialised");
                    const t = this.tabContainer.querySelector(".ds_tabs__toggle");
                    t.parentNode.removeChild(t), this.tabNavigation.setAttribute("aria-labelledby", "ds_tabs__title");
                }
            }
            onResize() {
                clearTimeout(this.resizeTimer),
                    (this.resizeTimer = setTimeout(() => {
                        E("medium") ? this.reset() : this.set();
                    }, 150));
            }
        };
    function D(t) {
        return (t = String(t))
            .toLowerCase()
            .replace(/['"’‘”“`]/g, "")
            .replace(/[\W|_]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }
    const L = {
        init: function (t) {
            for (var e in (t || (t = document), L.add)) L.add[e](t);
        },
        gatherElements: function (t, e) {
            let s = [].slice.call(e.querySelectorAll(`.${t}`));
            return e.classList && e.classList.contains(t) && s.push(e), s;
        },
        add: {
            accordions: function (t = document) {
                L.gatherElements("ds_accordion", t).forEach((t) => {
                    let e = "";
                    if ((t.dataset.name && (e = t.dataset.name), !t.classList.contains("js-initialised"))) return;
                    const s = t.querySelector(".js-open-all"),
                        i = [].slice.call(t.querySelectorAll(".ds_accordion-item"));
                    function a(s) {
                        s &&
                            (!(function () {
                                const e = t.querySelectorAll(".ds_accordion-item--open").length;
                                return i.length === e;
                            })()
                                ? s.setAttribute("data-accordion", `accordion-${e.length ? e + "-" : e}open-all`)
                                : s.setAttribute("data-accordion", `accordion-${e.length ? e + "-" : e}close-all`));
                    }
                    function n(t, s) {
                        const i = t.querySelector(".ds_accordion-item__header-button"),
                            a = t.querySelector(".ds_accordion-item__control");
                        i.setAttribute("data-accordion", `accordion-${e.length ? e + "-" : e}${a.checked ? "close" : "open"}-${s + 1}`);
                    }
                    a(s),
                        i.forEach((t, e) => {
                            n(t, e);
                        }),
                        s &&
                            s.addEventListener("click", () => {
                                i.forEach((t, e) => {
                                    n(t, e);
                                }),
                                    a(s);
                            }),
                        i.forEach((t, i) => {
                            const n = t.querySelector(".ds_accordion-item__header-button"),
                                o = t.querySelector(".ds_accordion-item__control");
                            n.addEventListener("click", () => {
                                n.setAttribute("data-accordion", `accordion-${e.length ? e + "-" : e}${o.checked ? "close" : "open"}-${i + 1}`), a(s);
                            });
                        });
                });
            },
            asides: function (t = document) {
                L.gatherElements("ds_article-aside", t).forEach((t) => {
                    [].slice.call(t.querySelectorAll("a:not(.ds_button)")).forEach((t, e) => {
                        t.getAttribute("data-navigation") || t.setAttribute("data-navigation", `link-related-${e + 1}`);
                    });
                });
            },
            autocompletes: function (t = document) {
                function e(t, e) {
                    window.dataLayer.push({
                        event: "autocomplete",
                        searchText: t,
                        clickText: e.dataset.autocompletetext,
                        resultsCount: parseInt(e.dataset.autocompletecount),
                        clickedResults: `result ${e.dataset.autocompleteposition} of ${e.dataset.autocompletecount}`,
                    }),
                        delete e.dataset.autocompletetext,
                        delete e.dataset.autocompletecount,
                        delete e.dataset.autocompleteposition;
                }
                L.gatherElements("ds_autocomplete", t).forEach((t) => {
                    const s = t.querySelector(".js-autocomplete-input"),
                        i = document.querySelector("#" + s.getAttribute("aria-owns") + " .ds_autocomplete__suggestions-list");
                    let a = s.value;
                    s.addEventListener("keydown", (t) => {
                        "Enter" === t.key && s.dataset.autocompletetext && e(a, s), (a = s.value);
                    }),
                        i.addEventListener("mousedown", () => {
                            e(a, s);
                        });
                });
            },
            backToTop: function (t = document) {
                L.gatherElements("ds_back-to-top__button", t).forEach((t) => {
                    t.setAttribute("data-navigation", "backtotop");
                });
            },
            breadcrumbs: function (t = document) {
                L.gatherElements("ds_breadcrumbs", t).forEach((t) => {
                    [].slice.call(t.querySelectorAll(".ds_breadcrumbs__link")).forEach((t, e) => {
                        t.getAttribute("data-navigation") || t.setAttribute("data-navigation", `breadcrumb-${e + 1}`);
                    });
                });
            },
            buttons: function (t = document) {
                [].slice.call(t.querySelectorAll('.ds_button, input[type="button"], input[type="submit"], button')).forEach((t) => {
                    t.getAttribute("data-button") || t.setAttribute("data-button", `button-${D(t.innerText)}`);
                });
            },
            categoryLists: function (t = document) {
                L.gatherElements("ds_category-list", t).forEach((t) => {
                    [].slice.call(t.querySelectorAll(".ds_category-item__link")).forEach((t, e) => {
                        t.getAttribute("data-navigation") || t.setAttribute("data-navigation", `category-item-${e + 1}`);
                    });
                });
            },
            checkboxes: function (t = document) {
                L.gatherElements("ds_checkbox__input", t).forEach((e) => {
                    let s = e.getAttribute("data-form");
                    !e.getAttribute("data-form") && e.id && (s = `checkbox-${e.id}`), e.checked && (s += "-checked"), e.setAttribute("data-form", s);
                    const i = t.querySelector(`[for=${e.id}]`);
                    i &&
                        !e.classList.contains("js-has-tracking-event") &&
                        (i.addEventListener("click", () => {
                            e.dataset.form = `checkbox-${e.id}-${e.checked ? "unchecked" : "checked"}`;
                        }),
                        e.classList.add("js-has-tracking-event"));
                });
            },
            contactDetails: function (t = document) {
                L.gatherElements("ds_contact-details", t).forEach((t) => {
                    [].slice.call(t.querySelectorAll(".ds_contact-details__social-link")).forEach((t) => {
                        t.getAttribute("data-navigation") || t.setAttribute("data-navigation", `contact-details-${D(t.innerText)}`);
                    }),
                        [].slice.call(t.querySelectorAll('a[href^="mailto"]')).forEach((t) => {
                            t.getAttribute("data-navigation") || t.setAttribute("data-navigation", "contact-details-email");
                        });
                });
            },
            contentNavs: function (t = document) {
                L.gatherElements("ds_contents-nav", t).forEach((t) => {
                    [].slice.call(t.querySelectorAll(".ds_contents-nav__link")).forEach((t, e) => {
                        t.getAttribute("data-navigation") || t.setAttribute("data-navigation", `contentsnav-${e + 1}`);
                    });
                });
            },
            errorMessages: function (t = document) {
                L.gatherElements("ds_question__error-message", t).forEach((t, e) => {
                    const s = t.closest(".ds_question");
                    if (!s) return;
                    const i = s.querySelector(".js-validation-group, .ds_input, .ds_select, .ds_checkbox__input, .ds_radio__input");
                    let a = e + 1;
                    if (i)
                        if (i.classList.contains("js-validation-group")) {
                            const t = function (t, e, s) {
                                return s.indexOf(t) === e;
                            };
                            a = [].slice
                                .call(i.querySelectorAll(".ds_input, .ds_select, .ds_checkbox__input, .ds_radio__input"))
                                .map((t) => ("radio" === t.type ? t.name : t.id))
                                .filter(t)
                                .join("-");
                        } else a = "radio" === i.type ? i.name : i.id;
                    t.getAttribute("data-form") || t.setAttribute("data-form", `error-${a}`);
                });
            },
            errorSummaries: function (t = document) {
                L.gatherElements("ds_error-summary", t).forEach((t) => {
                    [].slice.call(t.querySelectorAll(".ds_error-summary__list a")).forEach((t) => {
                        !t.getAttribute("data-form") && t.href && t.setAttribute("data-form", `error-${t.href.substring(t.href.lastIndexOf("#") + 1)}`);
                    });
                });
            },
            hideThisPage: function (t = document) {
                L.gatherElements("ds_hide-page", t).forEach((t) => {
                    [].slice.call(t.querySelectorAll(".ds_hide-page__button")).forEach((t) => {
                        t.setAttribute("data-navigation", "hide-this-page"),
                            document.addEventListener("keyup", (t) => {
                                ("Escape" !== t.key && 27 !== t.keyCode) || window.dataLayer.push({ event: "hide-this-page-keyboard" });
                            });
                    });
                });
            },
            insetTexts: function (t = document) {
                L.gatherElements("ds_inset-text", t).forEach((t) => {
                    [].slice.call(t.querySelectorAll(".ds_inset-text__text a:not(.ds_button)")).forEach((t) => {
                        t.setAttribute("data-navigation", "inset-link");
                    });
                });
            },
            notifications: function (t = document) {
                L.gatherElements("ds_notification", t).forEach((t, e) => {
                    const s = t.id || e + 1;
                    [].slice.call(t.querySelectorAll("a:not(.ds_button)")).forEach((t) => {
                        t.getAttribute("data-banner") || t.setAttribute("data-banner", `banner-${s}-link`);
                    }),
                        [].slice.call(t.querySelectorAll(".ds_button:not(.ds_notification__close)")).forEach((t) => {
                            t.getAttribute("data-banner") || t.setAttribute("data-banner", `banner-${s}-${D(t.innerText)}`);
                        });
                    const i = t.querySelector(".ds_notification__close");
                    i && !i.getAttribute("data-banner") && i.setAttribute("data-banner", `banner-${s}-close`);
                });
            },
            pagination: function (t = document) {
                L.gatherElements("ds_pagination", t).forEach((t) => {
                    const e = t.querySelector(".ds_pagination__load-more button");
                    e && !e.getAttribute("data-search") && e.setAttribute("data-search", "pagination-more"),
                        [].slice.call(t.querySelectorAll("a.ds_pagination__link")).forEach((t) => {
                            t.getAttribute("data-search") || t.setAttribute("data-search", `pagination-${D(t.innerText)}`);
                        });
                });
            },
            phaseBanners: function (t = document) {
                L.gatherElements("ds_phase-banner", t).forEach((t) => {
                    const e = t.querySelector(".ds_tag") ? t.querySelector(".ds_tag").innerText : "phase";
                    [].slice.call(t.querySelectorAll("a")).forEach((t) => {
                        t.getAttribute("data-banner") || t.setAttribute("data-banner", `banner-${D(e)}-link`);
                    });
                });
            },
            radios: function (t = document) {
                L.gatherElements("ds_radio__input", t).forEach((t) => {
                    !t.getAttribute("data-form") && t.name && t.id && t.setAttribute("data-form", `radio-${t.name}-${t.id}`);
                });
            },
            searchResults: function (t = document) {
                L.gatherElements("ds_search-results", t).forEach((t) => {
                    const e = t.querySelector(".ds_search-results__list");
                    if (!e) return;
                    const s = [].slice.call(t.querySelectorAll(".ds_search-result")),
                        i = [].slice.call(t.querySelectorAll(".ds_search-result--promoted"));
                    let a = 1;
                    e.getAttribute("start") && (a = +e.getAttribute("start")),
                        s.forEach((t, s) => {
                            const n = t.querySelector(".ds_search-result__link"),
                                o = t.querySelector(".ds_search-result__media-link"),
                                r = t.querySelector(".ds_search-result__context a");
                            if (t.classList.contains("ds_search-result--promoted")) {
                                let t = `search-promoted-${s + 1}/${i.length}`;
                                n.setAttribute("data-search", t);
                            } else {
                                let t;
                                e.getAttribute("data-total") && (t = e.getAttribute("data-total"));
                                let l = "search-result-" + (a + s - i.length),
                                    c = "search-image-" + (a + s - i.length),
                                    d = "search-parent-link-" + (a + s - i.length);
                                t && ((l += `/${t}`), (d += `/${t}`)), n.setAttribute("data-search", l), o && o.setAttribute("data-search", c), r && r.setAttribute("data-search", d);
                            }
                        });
                });
            },
            searchSuggestions: function (t = document) {
                L.gatherElements("ds_search-suggestions", t).forEach((t) => {
                    const e = [].slice.call(t.querySelectorAll(".ds_search-suggestions a"));
                    e.forEach((t, s) => {
                        t.setAttribute("data-search", `suggestion-result-${s + 1}/${e.length}`);
                    });
                });
            },
            searchRelated: function (t = document) {
                L.gatherElements("ds_search-results__related", t).forEach((t) => {
                    const e = [].slice.call(t.querySelectorAll(".ds_search-results__related a"));
                    e.forEach((t, s) => {
                        t.setAttribute("data-search", `search-related-${s + 1}/${e.length}`);
                    });
                });
            },
            selects: function (t = document) {
                L.gatherElements("ds_select", t).forEach((t) => {
                    !t.getAttribute("data-form") && t.id && t.setAttribute("data-form", `select-${t.id}`),
                        [].slice.call(t.querySelectorAll("option")).forEach((e) => {
                            let s = "null";
                            e.value && (s = D(e.value)), e.setAttribute("data-form", `${t.getAttribute("data-form")}-${s}`);
                        }),
                        t.classList.contains("js-has-tracking-event") ||
                            (t.addEventListener("change", (t) => {
                                window.dataLayer.push({ event: t.target.querySelector(":checked").dataset.form });
                            }),
                            t.classList.add("js-has-tracking-event"));
                });
            },
            sequentialNavs: function (t = document) {
                L.gatherElements("ds_sequential-nav", t).forEach((t) => {
                    const e = t.querySelector(".ds_sequential-nav__item--prev > .ds_sequential-nav__button "),
                        s = t.querySelector(".ds_sequential-nav__item--next > .ds_sequential-nav__button ");
                    e && !e.getAttribute("data-navigation") && e.setAttribute("data-navigation", "sequential-previous"), s && !s.getAttribute("data-navigation") && s.setAttribute("data-navigation", "sequential-next");
                });
            },
            sideNavs: function (t = document) {
                L.gatherElements("ds_side-navigation", t).forEach((t) => {
                    const e = t.querySelector(".ds_side-navigation__list"),
                        s = t.querySelector(".js-side-navigation-button"),
                        i = t.querySelector(".js-toggle-side-navigation");
                    function a() {
                        s.setAttribute("data-navigation", "navigation-" + (i.checked ? "close" : "open"));
                    }
                    !(function t(e, s = "") {
                        [].slice.call(e.children).forEach((e, i) => {
                            [].slice.call(e.children).forEach((e) => {
                                e.classList.contains("ds_side-navigation__list") ? t(e, `${s}-${i + 1}`) : e.setAttribute("data-navigation", `sidenav${s}-${i + 1}`);
                            });
                        });
                    })(e),
                        s &&
                            (a(),
                            s.addEventListener("click", () => {
                                a();
                            }));
                });
            },
            siteBranding: function (t = document) {
                L.gatherElements("ds_site-branding", t).forEach((t) => {
                    const e = t.querySelector(".ds_site-branding__logo");
                    e && !e.getAttribute("data-header") && e.setAttribute("data-header", "header-logo");
                    const s = t.querySelector(".ds_site-branding__title");
                    s && !s.getAttribute("data-header") && s.setAttribute("data-header", "header-title");
                });
            },
            siteFooter: function (t = document) {
                L.gatherElements("ds_site-footer", t).forEach((t) => {
                    [].slice.call(t.querySelectorAll(".ds_site-footer__org-link")).forEach((t) => {
                        t.getAttribute("data-footer") || t.setAttribute("data-footer", "footer-logo");
                    }),
                        [].slice.call(t.querySelectorAll(".ds_site-footer__copyright a")).forEach((t) => {
                            t.getAttribute("data-footer") || t.setAttribute("data-footer", "footer-copyright");
                        }),
                        [].slice.call(t.querySelectorAll(".ds_site-items__item a:not(.ds_button)")).forEach((t, e) => {
                            t.getAttribute("data-footer") || t.setAttribute("data-footer", `footer-link-${e + 1}`);
                        });
                });
            },
            siteNavigation: function (t = document) {
                L.gatherElements("ds_site-navigation", t).forEach((t) => {
                    [].slice.call(t.querySelectorAll(".ds_site-navigation__link")).forEach((t, e) => {
                        t.getAttribute("data-device") || (t.closest(".ds_site-navigation--mobile") ? t.setAttribute("data-device", "mobile") : t.setAttribute("data-device", "desktop")),
                            t.getAttribute("data-header") || t.setAttribute("data-header", `header-link-${e + 1}`);
                    });
                }),
                    L.gatherElements("ds_site-navigation--mobile", t).forEach((t) => {
                        const e = t.parentNode.querySelector(".js-toggle-menu");
                        e && e.setAttribute("data-header", "header-menu-toggle");
                    });
            },
            skipLinks: function (t = document) {
                [].slice.call(t.querySelectorAll(".ds_skip-links__link")).forEach((t, e) => {
                    t.getAttribute("data-navigation") || t.setAttribute("data-navigation", `skip-link-${e + 1}`);
                });
            },
            stepNavigation: function (t = document) {
                L.gatherElements("ds_step-navigation", t).forEach((t) => {
                    [].slice.call(t.querySelectorAll(".ds_step-navigation__title-link")).forEach((t) => {
                        t.setAttribute("data-navigation", "partof-sidebar");
                    });
                }),
                    L.gatherElements("ds_step-navigation-top", t).forEach((t) => {
                        [].slice.call(t.querySelectorAll("a")).forEach((t) => {
                            t.setAttribute("data-navigation", "partof-header");
                        });
                    });
            },
            tabs: function (t = document) {
                const e = L.gatherElements("ds_tabs", t);
                let s = 1;
                e.forEach((t) => {
                    [].slice.call(t.querySelectorAll(".ds_tabs__tab-link")).forEach((t, e) => {
                        t.getAttribute("data-navigation") || t.setAttribute("data-navigation", `tab-link-${s}-${e + 1}`);
                    }),
                        s++;
                });
            },
            taskList: function (t = document) {
                L.gatherElements("ds_task-list__task-link", t).forEach((t) => {
                    t.getAttribute("data-navigation") || t.setAttribute("data-navigation", "tasklist");
                });
            },
            textInputs: function (t = document) {
                [].slice.call(t.querySelectorAll("input.ds_input")).forEach((t) => {
                    if (!t.getAttribute("data-form") && t.id) {
                        const e = t.type;
                        t.setAttribute("data-form", `${e}input-${t.id}`);
                    }
                });
            },
            textareas: function (t = document) {
                [].slice.call(t.querySelectorAll("textarea.ds_input")).forEach((t) => {
                    !t.getAttribute("data-form") && t.id && t.setAttribute("data-form", `textarea-${t.id}`);
                });
            },
            warningTexts: function (t = document) {
                L.gatherElements("ds_warning-text", t).forEach((t) => {
                    [].slice.call(t.querySelectorAll(".ds_warning-text a:not(.ds_button)")).forEach((t) => {
                        t.setAttribute("data-navigation", "warning-link");
                    });
                });
            },
        },
    };
    var x = L;
    const w = { page: t },
        q = {
            Accordion: e,
            AspectBox: s,
            Autocomplete: class {
                constructor(t, e, s = {}) {
                    (this.inputElement = t.querySelector(".js-autocomplete-input")),
                        (this.endpointUrl = e),
                        (this.suggestionMappingFunction = s.suggestionMappingFunction || ((t) => t)),
                        (this.throttleDelay = s.throttleDelay || 100),
                        (this.minLength = s.minLength || 3),
                        (this.PromiseRequest = a),
                        (this.keycodes = { tab: "Tab", enter: "Enter", esc: "Escape", up: "ArrowUp", down: "ArrowDown" }),
                        (this.statusElement = document.querySelector("#autocomplete-status"));
                }
                init() {
                    return (
                        !(!this.inputElement || !this.endpointUrl) &&
                        "undefined" != typeof Promise &&
                        ((this.listBoxElement = document.getElementById(this.inputElement.getAttribute("aria-owns")).querySelector(".ds_autocomplete__suggestions-list")),
                        this.inputElement.addEventListener("keydown", (t) => {
                            t.key === this.keycodes.down
                                ? (t.preventDefault(), this.selectSuggestion(void 0 === this.selectedSuggestion ? 0 : this.selectedSuggestion + 1))
                                : t.key === this.keycodes.up
                                ? (t.preventDefault(), this.selectSuggestion(void 0 === this.selectedSuggestion ? -1 : this.selectedSuggestion - 1))
                                : t.key === this.keycodes.esc
                                ? this.clearSearch()
                                : t.key === this.keycodes.enter && this.activeSuggestion && (t.preventDefault(), this.acceptSelectedSuggestion());
                        }),
                        this.inputElement.addEventListener("input", () => {
                            window.clearTimeout(this.keypressTimeout);
                            const t = this.inputElement.value.trim();
                            t.length >= this.minLength
                                ? (this.keypressTimeout = window.setTimeout(() => {
                                      this.fetchSuggestions(t).then((t) => {
                                          (this.suggestions = t), this.showSuggestions(this.suggestions), this.updateStatus(`There ${1 === t.length ? "is" : "are"} ${t.length} ${1 === t.length ? "option" : "options"}`, 1500);
                                      });
                                  }, this.throttleDelay))
                                : this.clearSuggestions();
                        }),
                        this.inputElement.addEventListener("focus", () => {
                            this.inputElement.value && (this.suggestions ? this.showSuggestions(this.suggestions) : this.fetchSuggestions(this.inputElement.value.trim()));
                        }),
                        this.inputElement.addEventListener("blur", () => {
                            this.clearSuggestions();
                        }),
                        void this.listBoxElement.addEventListener("mousedown", (t) => {
                            t.preventDefault();
                            const e = t.target.classList.contains("ds_autocomplete__suggestion") ? t.target : t.target.closest(".ds_autocomplete__suggestion");
                            if (e) {
                                const t = Array.from(e.parentNode.children).indexOf(e);
                                this.selectSuggestion(t), this.acceptSelectedSuggestion();
                            }
                        }))
                    );
                }
                acceptSelectedSuggestion() {
                    const t = document.querySelector("#" + this.inputElement.getAttribute("aria-activedescendant"));
                    (this.inputElement.value = t.querySelector(".js-suggestion-text").innerText),
                        (this.inputElement.dataset.autocompletetext = this.inputElement.value),
                        (this.inputElement.dataset.autocompletecount = this.suggestions.length),
                        (this.inputElement.dataset.autocompleteposition =
                            [].slice
                                .call(this.listBoxElement.childNodes)
                                .filter((t) => "LI" === t.tagName)
                                .indexOf(t) + 1),
                        this.clearSuggestions();
                }
                buildSuggestionHtml(t) {
                    return '<span class="ds_autocomplete__suggestion__text  js-suggestion-text">' + t + "</span>";
                }
                clearSearch() {
                    (this.inputElement.value = ""), this.clearSuggestions();
                }
                clearSuggestions() {
                    delete this.activeSuggestion, delete this.selectedSuggestion, (this.listBoxElement.innerHTML = ""), this.inputElement.removeAttribute("aria-activedescendant"), this.inputElement.setAttribute("aria-expanded", !1);
                }
                fetchSuggestions(t) {
                    return this.PromiseRequest(this.endpointUrl + t)
                        .then((t) => this.suggestionMappingFunction(t))
                        .catch((t) => console.log("fetch failed", t));
                }
                selectSuggestion(t) {
                    (this.selectedSuggestion = t),
                        this.suggestions.forEach((e, s) => {
                            s === this.modulo(t, this.suggestions.length)
                                ? ((e.active = !0),
                                  (this.activeSuggestion = e),
                                  this.inputElement.setAttribute("aria-activedescendant", "suggestion-" + s),
                                  this.updateStatus(`${e.displayText} (${s + 1} of ${this.suggestions.length}) is selected`))
                                : delete e.active;
                        }),
                        this.showSuggestions(this.suggestions);
                }
                showSuggestions(t) {
                    if (((this.listBoxElement.innerHTML = ""), t.length)) {
                        for (let e = 0, s = t.length; e < s; e++) {
                            const s = t[e],
                                a = document.createElement("li");
                            (a.id = "suggestion-" + e),
                                a.classList.add("ds_autocomplete__suggestion"),
                                a.setAttribute("role", "option"),
                                document.createElement("span").classList.add("js-suggestion-text"),
                                s.active && a.classList.add("active"),
                                (a.innerHTML = this.buildSuggestionHtml(s.displayText)),
                                i(a.querySelector(".js-suggestion-text"), this.inputElement.value),
                                this.listBoxElement.appendChild(a);
                        }
                        for (this.inputElement.setAttribute("aria-expanded", !0); window.visualViewport.height < this.listBoxElement.parentNode.offsetHeight + this.inputElement.offsetHeight + 16; ) {
                            let e = this.listBoxElement.querySelector("li:last-child");
                            e.parentNode.removeChild(e), (t = t.splice(t.length - 1));
                        }
                    } else this.clearSuggestions();
                }
                updateStatus(t, e = 100) {
                    this.statusElement
                        ? (this.statusTimeout && window.clearTimeout(this.statusTimeout),
                          (this.statusTimeout = window.setTimeout(() => {
                              this.statusElement.innerText = t;
                          }, e)))
                        : console.log("autocomplete status element not present");
                }
                modulo(t, e) {
                    return ((t % e) + e) % e;
                }
            },
            BackToTop: n,
            CharacterCount: o,
            Checkboxes: r,
            CookieNotification: u,
            Details: h,
            DSDatePicker: m,
            HidePage: b,
            MobileMenu: p,
            MobileTables: _,
            NotificationBanner: f,
            SideNavigation: y,
            skipLinks: v,
            StepNavigation: k,
            Tabs: A,
            TabsNavigation: S,
        };
    (window.DS = window.DS || {}),
        (window.DS.base = w),
        (window.DS.components = q),
        (window.DS.tracking = x),
        (window.DS.initAll = function (i = document) {
            t.init(),
                console.log("initall"),
                [].slice.call(i.querySelectorAll('[data-module="ds-accordion"]')).forEach((t) => new e(t).init()),
                [].slice.call(document.querySelectorAll(".ds_aspect-box:not(.ds_aspect-box--fallback)")).forEach((t) => new s(t).init());
            const a = i.querySelector('[data-module="ds-back-to-top"]');
            a && new n(a).init(), [].slice.call(i.querySelectorAll('[data-module="ds-character-count"]')).forEach((t) => new o(t).init()), [].slice.call(i.querySelectorAll('[data-module="ds-checkboxes"]')).forEach((t) => new r(t).init());
            const l = document.querySelector('[data-module="ds-cookie-notification"]');
            l && new u(l).init(),
                [].slice.call(document.querySelectorAll('[data-module="ds-datepicker"]')).forEach((t) => new m(t).init()),
                [].slice.call(document.querySelectorAll('[data-module="ds-details"]')).forEach((t) => new h(t).init()),
                [].slice.call(i.querySelectorAll(".ds_hide-page")).length && new b().init(),
                [].slice.call(i.querySelectorAll('[data-module="ds-mobile-navigation-menu"]')).forEach((t) => new p(t).init()),
                [].slice.call(i.querySelectorAll('[data-module="ds-notification"]')).forEach((t) => new f(t).init()),
                [].slice.call(i.querySelectorAll('[data-module="ds-side-navigation"]')).forEach((t) => new y(t).init()),
                v.init(),
                [].slice.call(i.querySelectorAll('[data-module="ds-step-navigation"]')).forEach((t) => new k(t).init()),
                [].slice.call(i.querySelectorAll("table[data-smallscreen]")).length && new _().init(),
                [].slice.call(document.querySelectorAll('[data-module="ds-tabs"]')).forEach((t) => new A(t).init()),
                [].slice.call(document.querySelectorAll('[data-module="ds-tabs-navigation"]')).forEach((t) => new S(t).init()),
                x.init();
        });
})();
