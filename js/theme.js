(() => {
    "use strict";

    const KEY = "studyflow_theme";

    const makeIcon = name => {
        const icon = document.createElement("i");

        icon.className = `icon i-${name}`;
        icon.setAttribute("aria-hidden", "true");

        return icon;
    };

    if (location.protocol === "file:") {
        console.warn(
            "StudyFlow: open the project through a local server " +
            "(e.g. python3 -m http.server 5500) so the icon files can load."
        );
    }
    const root = document.documentElement;

    const read = k => {
        try {
            return localStorage.getItem(k);
        } catch {
            return null;
        }
    };

    const write = (k, v) => {
        try {
            localStorage.setItem(k, v);
        } catch {}
    };

    const preferred = read(KEY) || (
        matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark"
    );

    root.setAttribute("data-theme", preferred);

    document.addEventListener("DOMContentLoaded", () => {
        const btn = document.createElement("button");

        btn.className = "sf-theme-toggle";
        btn.type = "button";
        btn.setAttribute("aria-label", "Toggle light and dark theme");

        const side = document.querySelector(".sidebar");
        const host = document.querySelector(".nav-actions, .auth-header");
        const label = document.createElement("span");

        if (side) {
            btn.classList.add("wide");
        } else if (!host) {
            btn.classList.add("floating");
        }

        const paint = () => {
            const dark = root.dataset.theme === "dark";

            btn.replaceChildren(makeIcon(dark ? "sun" : "moon"));

            if (side) {
                label.textContent = dark ? "Light mode" : "Dark mode";
                btn.append(label);
            }
        };

        btn.addEventListener("click", () => {
            const next = root.dataset.theme === "dark" ? "light" : "dark";

            root.setAttribute("data-theme", next);
            write(KEY, next);
            paint();
        });

        paint();

        if (side) {
            const anchor = side.querySelector("#logout-button, .logout-button");

            if (anchor) {
                anchor.parentNode.insertBefore(btn, anchor);
            } else {
                side.appendChild(btn);
            }
        } else if (host) {
            host.appendChild(btn);
        } else {
            document.body.appendChild(btn);
        }

        const items = document.querySelectorAll(
            ".feature-card, .stat-card, .gallery figure, .steps div, .section-heading, .cta-box, .stats-band, [data-reveal]"
        );

        if ("IntersectionObserver" in window) {
            const io = new IntersectionObserver(
                es => es.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add("in");
                        io.unobserve(e.target);
                    }
                }),
                { threshold: .12 }
            );

            items.forEach((el, i) => {
                el.classList.add("sf-reveal");
                el.style.transitionDelay = (i % 4) * 80 + "ms";
                io.observe(el);
            });
        }

        document.querySelectorAll("[data-count]").forEach(el => {
            const end = +el.dataset.count;
            let n = 0;

            const t = setInterval(() => {
                n += Math.ceil(end / 40);

                if (n >= end) {
                    n = end;
                    clearInterval(t);
                }

                el.textContent = n.toLocaleString() + (el.dataset.suffix || "");
            }, 30);
        });


        document.querySelectorAll(".tilt").forEach(el => {
            el.addEventListener("mousemove", e => {
                const r = el.getBoundingClientRect();

                const x = (e.clientX - r.left) / r.width - .5;
                const y = (e.clientY - r.top) / r.height - .5;

                el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
            });

            el.addEventListener("mouseleave", () => {
                el.style.transform = "";
            });
        });

        if (document.body.classList.contains("auth-page")) {
            document.querySelectorAll('input[type="password"]').forEach(inp => {
                const wrap = document.createElement("span");
                wrap.className = "pw-wrap";

                inp.parentNode.insertBefore(wrap, inp);
                wrap.appendChild(inp);

                const eye = document.createElement("button");

                eye.type = "button";
                eye.className = "pw-eye";
                eye.append(makeIcon("eye"));
                eye.setAttribute("aria-label", "Show or hide password");

                eye.addEventListener("click", () => {
                    const h = inp.type === "password";

                    inp.type = h ? "text" : "password";
                    eye.replaceChildren(makeIcon(h ? "eye-off" : "eye"));
                });

                wrap.appendChild(eye);
            });

            const rp = document.getElementById("register-password");

            if (rp) {
                const meter = document.createElement("div");

                meter.className = "pw-meter";
                meter.innerHTML = "<i></i>";

                const lab = document.createElement("span");
                lab.className = "pw-label";

                rp.closest(".pw-wrap").after(meter, lab);

                rp.addEventListener("input", () => {
                    const v = rp.value;
                    let sc = 0;

                    if (v.length >= 8) sc++;
                    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) sc++;
                    if (/\d/.test(v)) sc++;
                    if (/[^A-Za-z0-9]/.test(v) || v.length >= 14) sc++;

                    const L = [
                        ["", "0%", "transparent"],
                        ["Weak", "25%", "#EF4444"],
                        ["Fair", "50%", "#F59E0B"],
                        ["Good", "75%", "#22C55E"],
                        ["Strong", "100%", "#10B981"]
                    ][v ? sc || 1 : 0];

                    meter.firstChild.style.width = L[1];
                    meter.firstChild.style.background = L[2];

                    lab.textContent = L[0] ? "Password strength: " + L[0] : "";
                });
            }
        }

        if (document.body.classList.contains("dashboard-body")) {
            initTimer();
        }
    });

    function initTimer() {
        const session = (() => {
            try {
                if (
                    window.StudyFlowStorage &&
                    typeof StudyFlowStorage.getSession === "function"
                ) {
                    return StudyFlowStorage.getSession();
                }

                return JSON.parse(
                    localStorage.getItem("studyflow_session") || "null"
                );
            } catch (error) {
                console.error("StudyFlow: unable to read the current session.", error);
                return null;
            }
        })();

        if (!session || !session.userId || session.role !== "student") {
            return;
        }

        const userId = String(session.userId);
        const SKEY = `studyflow_focus_${encodeURIComponent(userId)}`;

        const readState = () => {
            try {
                const saved = JSON.parse(localStorage.getItem(SKEY) || "null");

                if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
                    return { days: [], minutes: 0 };
                }

                return {
                    days: Array.isArray(saved.days)
                        ? [...new Set(saved.days.filter(day =>
                            typeof day === "string" &&
                            /^\d{4}-\d{2}-\d{2}$/.test(day)
                        ))]
                        : [],
                    minutes: Number.isFinite(Number(saved.minutes))
                        ? Math.max(0, Number(saved.minutes))
                        : 0
                };
            } catch (error) {
                console.error("StudyFlow: unable to read focus data.", error);
                return { days: [], minutes: 0 };
            }
        };

        const state = readState();

        const save = () => {
            try {
                localStorage.setItem(SKEY, JSON.stringify(state));
                return true;
            } catch (error) {
                console.error("StudyFlow: unable to save focus data.", error);
                return false;
            }
        };

        const getLocalDate = date => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            return `${year}-${month}-${day}`;
        };

        const getStreak = () => {
            const completedDays = new Set(state.days);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            let cursor;

            if (completedDays.has(getLocalDate(today))) {
                cursor = today;
            } else if (completedDays.has(getLocalDate(yesterday))) {
                cursor = yesterday;
            } else {
                return 0;
            }

            let count = 0;

            while (completedDays.has(getLocalDate(cursor))) {
                count++;
                cursor = new Date(cursor);
                cursor.setDate(cursor.getDate() - 1);
            }

            return count;
        };

        let mode = 25 * 60;
        let left = mode;
        let timer = null;

        const widget = document.createElement("div");
        widget.className = "sf-timer min";
        widget.innerHTML = `
          <h4><span>FOCUS TIMER</span><span id="sf-min"></span></h4>
          <div class="sf-body">
            <div class="sf-ring" id="sf-ring">
              <b id="sf-time">25:00</b>
            </div>
            <div class="sf-row">
              <button class="go" id="sf-go" type="button">Start</button>
              <button id="sf-mode" type="button">25/5</button>
              <button id="sf-reset" type="button" aria-label="Reset timer"></button>
            </div>
            <div class="sf-streak" id="sf-streak" aria-live="polite"></div>
          </div>`;

        document.body.appendChild(widget);

        const $ = id => widget.querySelector("#" + id);

        const formatTime = seconds =>
            String(Math.floor(seconds / 60)).padStart(2, "0") +
            ":" +
            String(seconds % 60).padStart(2, "0");

        const updateInfo = () => {
            $("sf-streak").replaceChildren(
                makeIcon("flame"),
                document.createTextNode(
                    `${getStreak()}-day streak · ${Math.floor(state.minutes)} focus min total`
                )
            );
        };

        const draw = () => {
            $("sf-time").textContent = formatTime(left);
            $("sf-ring").style.setProperty(
                "--p",
                ((left / mode) * 100).toFixed(2)
            );
        };

        const stopTimer = () => {
            if (timer !== null) {
                clearInterval(timer);
                timer = null;
            }

            $("sf-go").textContent = "Start";
        };

        $("sf-go").addEventListener("click", () => {
            if (timer !== null) {
                stopTimer();
                return;
            }

            $("sf-go").textContent = "Pause";

            timer = window.setInterval(() => {
                left = Math.max(0, left - 1);
                draw();

                if (left > 0) {
                    return;
                }

                stopTimer();

                if (mode === 25 * 60) {
                    const today = getLocalDate(new Date());

                    state.minutes += 25;

                    if (!state.days.includes(today)) {
                        state.days.push(today);
                        state.days.sort();
                    }

                    save();
                    updateInfo();
                }

                left = mode;
                draw();

                try {
                    const sound = new Audio(
                        "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA="
                    );
                    sound.play().catch(() => {});
                } catch (error) {
                }

                window.alert(
                    mode === 25 * 60
                        ? "Focus session complete. Great work!"
                        : "Break complete. Ready for another focus session?"
                );
            }, 1000);
        });

        $("sf-mode").addEventListener("click", () => {
            stopTimer();
            mode = mode === 25 * 60 ? 5 * 60 : 25 * 60;
            left = mode;

            $("sf-mode").textContent =
                mode === 25 * 60 ? "25/5" : "Break";

            draw();
        });

        $("sf-reset").addEventListener("click", () => {
            stopTimer();
            left = mode;
            draw();
        });

        const paintMinIcon = () => {
            $("sf-min").replaceChildren(
                makeIcon(widget.classList.contains("min") ? "timer" : "minus")
            );
        };

        widget.querySelector("h4").addEventListener("click", () => {
            widget.classList.toggle("min");
            paintMinIcon();
        });

        $("sf-reset").append(makeIcon("rotate-ccw"));
        paintMinIcon();

        updateInfo();
        draw();
    }
})();