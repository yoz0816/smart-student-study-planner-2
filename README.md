# StudyFlow – Smart Student Study Planner

**StudyFlow** is a browser-based student study planner that helps students organize courses, academic tasks, study sessions, reminders, and learning progress. It also provides an administrator dashboard for monitoring registered student accounts and platform activity.

The project is built with HTML, CSS, and vanilla JavaScript. It uses the browser's LocalStorage API for data persistence and does not require a backend or database.

---

## 1. Project Overview

### Background and Problem

University students juggle several courses at once, each with its own assignments, exams, and deadlines. In practice this information ends up scattered across notebooks, chat messages, and calendars. Deadlines are missed, study time is planned poorly, and students have no clear picture of how much progress they are really making.

### The Solution

**StudyFlow** is a browser-based Smart Student Study Planner that brings these academic activities into one organized workspace. A student can record courses, break coursework into prioritized tasks, schedule study sessions without time conflicts, receive reminders, run focus sessions with a Pomodoro-style timer, and review progress through simple visual summaries. A built-in study streak encourages consistent daily habits.

### Scope and Users

StudyFlow is a frontend application built with HTML, CSS, and vanilla JavaScript. It stores data in the browser's LocalStorage, so it runs without a backend or database. It serves two roles:

- **Student:** Plans and tracks personal courses, tasks, study sessions, reminders, and progress.
- **Administrator:** Monitors platform statistics, searches student accounts, and activates or deactivates them.

### Design Approach

The interface follows a consistent design system: a light and dark theme, a responsive layout for desktop and mobile, a single icon library, and original illustrations. All visual assets are stored as files in the `assets/` folder rather than being embedded in the HTML or JavaScript code.

---

## 2. Main Features

### Student Features

- **Student Dashboard:** Displays an overview of academic activities and statistics.
- **Course Management:** Create and manage personal course records.
- **Task Management:** Create, update, delete, search, and filter academic tasks.
- **Study Schedule:** Plan study sessions by date and time and manage their status.
- **Progress Tracking:** View task completion, course progress, and study activity.
- **Reminders:** Create, edit, complete, undo, and delete academic reminders.
- **Focus Timer:** Use a 25-minute focus session and a 5-minute break timer.
- **Study Streak:** Track consecutive calendar days on which a focus session has been completed. Focus totals and streak records are stored separately for each signed-in student.
- **Browser Notifications:** When permission is granted, StudyFlow can display a browser notification when a reminder becomes due while the Reminders page is open.
- **Authentication:** Register a student account, log in, and log out.

### Administrator Features

- **Administrator Dashboard:** View platform statistics.
- **Student Management:** View registered student accounts.
- **Student Search:** Search student accounts by name or email.
- **Account Management:** Activate or deactivate student accounts.
- **Recent Registrations:** View recently registered students.
- **Platform Overview:** Monitor available student and academic activity statistics.

---

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| SVG asset files | Icons, logo, and illustrations stored in `assets/` |
| CSS3 | Styling, layouts, themes, and responsive design |
| Vanilla JavaScript | Application logic and interactions |
| LocalStorage | Browser-based data persistence |
| Browser Notification API | Reminder notifications |
| Python HTTP Server | Local development server |

No frontend framework, Node.js, npm, backend framework, or database server is required.

---

## 4. Project Structure

The project contains the following files and folders:

```text
smart-student-study-planner/
│
├── assets/
│   ├── icons/
│   ├── logo/            
│   ├── illustrations/    
│   └── images/         
│
├── css/
│   ├── style.css
│   ├── auth.css
│   ├── dashboard.css
│   ├── components.css
│   ├── responsive.css
│   ├── theme.css
│   └── icons.css
│
├── js/
│   ├── storage.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── courses.js
│   ├── tasks.js
│   ├── schedule.js
│   ├── progress.js
│   ├── reminders.js
│   ├── admin.js
│   └── theme.js
│
├── pages/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── courses.html
│   ├── tasks.html
│   ├── schedule.html
│   ├── progress.html
│   ├── reminders.html
│   └── admin-dashboard.html
│
├── .gitignore
├── README.md
└── index.html
```

---

## 5. Visual Assets and Icons

All icons, logos, and illustrations are separate files in the `assets/` folder. None are written inside the HTML or JavaScript.

| Folder | Contents |
|---|---|
| `assets/icons/` | SVG line icons that share one 24 px grid and stroke style |
| `assets/logo/` | StudyFlow logo mark (gradient and white versions), favicons, app icons |
| `assets/illustrations/` | Dashboard hero artwork (dark and light), three showcase scenes, login/register artwork |
| `assets/images/` | Social preview image (`og-image.png`) |

**Using an icon.** Add an element with the `icon` class and the icon name:

```html
<i class="icon i-bell" aria-hidden="true"></i>
```

`css/icons.css` draws each icon with a CSS mask, so icons automatically take the surrounding text colour, follow the light and dark themes, and react to hover and active states. Icon size follows `font-size`.

**Adding a new icon.** Place a 24 × 24 SVG in `assets/icons/` and add one line to `css/icons.css`:

```css
.i-my-icon { -webkit-mask-image: url("../assets/icons/my-icon.svg"); mask-image: url("../assets/icons/my-icon.svg"); }
```

**Note:** Icon masks are loaded by the browser as separate files, so run the project through a local server (see the next section) instead of opening the HTML files directly.

---

## 6. Installation and Setup

### Prerequisites

You need:

- A computer with a modern web browser.
- Python 3 installed.
- A code editor such as Visual Studio Code.

### Step 1: Get the Project

Download or clone the project repository.

If the project is already on your computer, open a terminal and navigate to its folder:

```bash
cd ~/Documents/smart-student-study-planner
```

### Step 2: Start the Local Server

Run:

```bash
python3 -m http.server 5500
```

### Step 3: Open StudyFlow

Open your browser and visit:

```text
http://localhost:5500
```

The StudyFlow landing page should appear.

To stop the server, return to the terminal and press:

```text
Ctrl + C
```

**Important:** Use `http://localhost:5500` rather than opening the HTML files directly. The local server also provides a secure context for browser notification permission in browsers that recognize localhost as trustworthy.

---

## 7. How to Use the Application

### Student

1. Open the StudyFlow landing page.
2. Navigate to the registration page.
3. Register a student account.
4. Log in with the registered email and password.
5. Use the dashboard to access courses, tasks, schedule, progress, and reminders.
6. Use the focus timer on the student dashboard to complete focus sessions.
7. Open the Reminders page and enable browser notifications if you want due reminders to appear as browser notifications.

### Administrator

The application initializes a default administrator account when the login page loads if a matching administrator account does not already exist.

**Default administrator credentials:**

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `admin1234` |

Log in with these credentials to open the Administrator Dashboard.

---

## 8. Focus Timer and Study Streak

The focus timer provides:

- A 25-minute focus session.
- A 5-minute break session.
- Start, pause, mode-switch, and reset controls.
- A completed-focus-minutes total.
- A consecutive-day study streak.

A completed 25-minute focus session adds 25 minutes to the student's focus total and records the current local calendar date. Break sessions do not add focus minutes or count toward the streak.

Focus records are stored using a user-specific LocalStorage key, so one student's focus totals and streak are not shared with another student using the same browser.

The timer runs in the active browser page. It is not a background timer and does not continue counting after the page is closed or refreshed.

---

## 9. Reminder Notifications

StudyFlow uses the browser's Notification API.

To enable notifications:

1. Open the Reminders page.
2. Select **Enable notifications**.
3. Allow notifications when the browser asks for permission.

When permission is granted, StudyFlow checks reminders while the Reminders page is open and displays a browser notification when a reminder becomes due.

Important limitations:

- Notifications require browser support and permission.
- Notifications require a secure context, such as `http://localhost` or an HTTPS website.
- The Reminders page must remain open for its JavaScript reminder checker to run.
- Notifications are not delivered by a server or service worker when the browser or page is closed.
- Browser settings may block notifications even after the application requests permission.

---

## 10. Data Storage

StudyFlow uses the browser's LocalStorage API to store application data.

Main LocalStorage keys include:

| Key | Description |
|---|---|
| `studyflow_users` | Registered student and administrator accounts |
| `studyflow_session` | Current login session |
| `studyflow_courses` | Course records |
| `studyflow_tasks` | Academic task records |
| `studyflow_schedule` | Study session records |
| `studyflow_reminders` | Reminder records |
| `studyflow_theme` | Selected light or dark theme |
| `studyflow_focus_<userId>` | Focus minutes and study dates for an individual student |
| `studyflow_notified_reminders_<userId>` | Notification history for an individual student |

The focus and notification keys include the signed-in student's identifier.

Data remains in the browser until it is cleared or removed. It does not automatically synchronize between browsers or devices.

---

## 11. Security and Limitations

StudyFlow is an academic frontend prototype developed for educational purposes.

Its authentication and authorization logic runs in the browser. It is not suitable for production use because:

- Passwords are stored in browser LocalStorage.
- Client-side authentication can be bypassed.
- Administrator access is implemented on the frontend.
- There is no server-side authorization or centralized database.
- LocalStorage data is limited to the current browser and origin.

A production version should use a secure backend, password hashing, server-side authentication, database storage, and server-side authorization.

---

## 12. Future Improvements

Possible future enhancements include:

- Backend integration using Python and FastAPI.
- MySQL database integration.
- Secure authentication and authorization.
- Cloud-based data synchronization.
- Server-side or push notifications.
- Calendar integration.
- Advanced academic analytics.
- Mobile application support.
- Exporting academic schedules and progress reports.

---

## 13. Project Objectives

### General Objective

To design and develop a responsive, easy-to-use web application that helps university students organize their courses, manage tasks and deadlines, plan study time, and track academic progress in one place, while also giving administrators oversight of student accounts.

### Specific Objectives

1. **Organize academic work:** Let students create and manage courses and tasks, with priorities, deadlines, search, and filtering.
2. **Plan study time:** Provide a study schedule by date and time that prevents overlapping sessions.
3. **Prevent missed deadlines:** Provide reminders, including optional browser notifications when a reminder becomes due.
4. **Build consistent habits:** Provide a focus timer (25-minute focus, 5-minute break) and a daily study streak stored separately for each student.
5. **Show progress clearly:** Present task completion, course progress, and weekly study activity through simple summaries.
6. **Support two roles:** Implement role-based workflows for students and administrators, including account search and activation or deactivation.
7. **Deliver a professional interface:** Provide light and dark themes, a responsive layout, and a consistent icon and illustration set kept in a dedicated `assets/` folder.

### Technical Learning Objectives

As a Web Programming academic project, StudyFlow demonstrates practical use of:

- HTML page structuring and semantic markup.
- CSS styling, themes, and responsive web design.
- JavaScript programming and DOM manipulation.
- Event handling and form validation.
- Browser LocalStorage for data persistence.
- Create, read, update, and delete (CRUD) operations.
- The browser Notification API.
- User interface design and reusable asset management.
- Role-based application workflows.

### Expected Outcome

A working, well-structured prototype that a student can use to plan a semester, and that shows how a frontend-only application can handle realistic study-management workflows.

---

## 14. Conclusion

StudyFlow provides students with a centralized environment for organizing academic activities and monitoring learning progress. By combining course management, task tracking, study scheduling, reminders, a focus timer, and progress monitoring, the application aims to make academic planning more organized and manageable.

**StudyFlow – Plan Smarter. Study Better. Achieve More.**
