# ELICSS
EliCSS is a CSS Framework ! No JQuery used, Only Vanilla CSS and CSS | CSS GRID used for Layout |  also very much compatible with Eli PHP Framework


# How to use

#### CDN
https://cdn.jsdelivr.net/gh/aj-techsoul/elicss@latest/eli.min.js

# Add this line before the `</body>` tag
<script src="https://cdn.jsdelivr.net/gh/aj-techsoul/elicss@latest/eli.min.js" ></script>

# Read Documentation / Tool
https://elidocs.techsoul.in/ELI-CSS/

---


Based on the analysis of the repository `aj-techsoul/elicss`, here is the comprehensive technical documentation. This framework is a lightweight, "No-Build" Vanilla CSS framework that relies heavily on CSS Grid and CSS Variables.

---

# EliCSS Framework Documentation

## 1. Introduction
**EliCSS** is a lightweight, Vanilla CSS framework designed for rapid UI development without the need for complex build steps or jQuery. It distinguishes itself by using **CSS Grid** as its primary layout engine rather than Flexbox rows, offering a unique shorthand syntax for grid structures. It includes built-in support for Material Design colors, icons (MDI), and common interactive components via vanilla JavaScript.

**Key Problem Solved:** Simplifies complex CSS Grid layouts into short utility classes (e.g., `.g3` for a 3-column grid) and provides a "drop-in" Material Design aesthetic for PHP or static HTML projects.

## 2. Installation

EliCSS is primarily designed to be used via CDN.

### CDN Links
Add this line just before the closing `</body>` tag:
```html
<!-- EliCSS Interaction Scripts -->
<script src="https://cdn.jsdelivr.net/gh/aj-techsoul/elicss@latest/eli.min.js"></script>
```

## 3. Quick Start

Here is a realistic "Hello World" dashboard card example using EliCSS classes.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EliCSS Quick Start</title>
</head>
<body class="pad-2">

    <!-- Layout: Grid with 1 column on mobile, 3 on medium screens -->
    <div class="g g1 m3 ggap-1">
        
        <!-- Card Component -->
        <div class="card">
            <div class="card-header">
                Hello World
            </div>
            <div class="card-body">
                <h4 class="h4">Welcome to EliCSS</h4>
                <p class="grey-text text-darken-2">
                    This is a card component inside a responsive grid.
                </p>
            </div>
            <div class="card-footer align-r">
                <button class="btn blue shadow-1">
                    <i class="mdi mdi-thumb-up"></i> Like
                </button>
            </div>
        </div>

    </div>

    <script src="https://cdn.jsdelivr.net/gh/aj-techsoul/elicss@latest/eli.min.js"></script>
</body>
</html>
```

## 4. Core Concepts

1.  **CSS Variables (`:root`):** All theming is handled via CSS variables. You can override these in your own stylesheet to change the look globally.
2.  **Grid-First Layout:** Unlike Bootstrap's 12-column row system, EliCSS applies grids directly to the container. A class of `g3` creates a `grid-template-columns: repeat(3, 1fr)`.
3.  **Material Design Colors:** The framework includes a massive utility file (`eli-color.css`) mapping standard Material colors (e.g., `red darken-1`) to background and text colors.
4.  **Floating Labels:** Form inputs rely on specific DOM ordering (`input` before `label`) and CSS `:placeholder-shown` selectors to create floating label effects.

## 5. UI/UX & Styling Reference (Deep Dive)

This section details the specific class names required to programmatically build the UI.

### A. The Grid System (`eli-grid.css`)
EliCSS uses a unique nomenclature for grids.
*   **Container:** Must have class `.g` (display: grid).
*   **Gap:** `.ggap` (0.5em), `.ggap-1` (1em), `.ggap-2` (2em).

| Class Pattern | Description | CSS Equivalent |
| :--- | :--- | :--- |
| `g{1-6}` | Equal columns (1 to 6) | `grid-template-columns: repeat(N, 1fr)` |
| `ga` | Auto width columns | `grid-template-columns: repeat(1, auto)` |
| `ga1` | Auto, then 1fr | `grid-template-columns: auto 1fr` |
| `g1a` | 1fr, then Auto | `grid-template-columns: 1fr auto` |
| `ga1a` | Auto, 1fr, Auto | `grid-template-columns: auto 1fr auto` |
| `gaa1` | Auto, Auto, 1fr | `grid-template-columns: auto auto 1fr` |

**Responsive Prefixes:**
Add prefixes to change layout at breakpoints:
*   `xs` (0px+), `s` (369px+), `m` (801px+), `l` (1025px+), `xl` (1281px+).
*   **Example:** `class="g s1 m3 l4"` (1 column on mobile, 3 on tablet, 4 on desktop).

**Alignment Classes:**
*   `align-l` / `align-r` / `align-c`: Justify content start/end/center.
*   `valign-t` / `valign-b` / `valign-c`: Align content start/end/center.
*   `align-fc`: Fully center (align and justify).

### B. Color Utilities (`eli-color.css`)
Follows the pattern: `.{colorname}` for background, `.{colorname}-text` for text.
*   **Base Colors:** `red`, `pink`, `purple`, `deep-purple`, `indigo`, `blue`, `light-blue`, `cyan`, `teal`, `green`, `light-green`, `lime`, `yellow`, `amber`, `orange`, `deep-orange`, `brown`, `grey`, `blue-grey`, `black`, `white`, `transparent`.
*   **Modifiers:** `lighten-{1-5}`, `darken-{1-4}`, `accent-{1-4}`.
*   **Example:** `<div class="blue darken-2 white-text">...</div>`

### C. Spacing & Helpers (`eli-helpers.css`)
Use these specifically for spacing adjustments.

*   **Margin:** `margin`, `margin-{1-20}` (0.5em increments).
    *   Directional: `margin-t-1` (top), `margin-b-1` (bottom), `margin-l-1` (left), `margin-r-1` (right).
    *   Auto: `margin-auto`.
*   **Padding:** `pad`, `pad-{1-20}` (0.5em increments).
    *   Directional: `pad-t-1`, etc.
*   **Sizing:**
    *   Width: `w-{1-100}` (vw based) or `w-p{1-100}` (percentage based). `w-full`, `w-half`, `w-qtr`.
    *   Height: `h-{1-100}` (vh based) or `h-p{1-100}` (percentage based).
*   **Shadows:** `shadow-0` (none) to `shadow-3` (large).
*   **Radius:** `radius`, `radius-{1-20}`, `circle`, `rounded` (50px), `noround`.

### D. Theme Variables (`:root`)
Override these in your CSS to customize the framework.

```css
:root {
    /* Dimensions */
    --radius: .25rem;
    --margin: .25rem;
    --padding: 1.25rem;
    --input-min-height: 44px;

    /* Colors */
    --bordercolor: rgba(0,0,0,.05);
    --boxheadercolor: linear-gradient(177deg, rgba(240,239,241,0.6) 0%, rgba(255,255,255,0.9) 100%);
    --btn-color: #1976d2; /* Primary Action Color */
    --input-border-color: rgba(26, 115, 232, 1);
    
    /* Data Tables */
    --elitable_highlight: rgb(230, 72, 72);
    --editable_status_active: #4CAF50;
    
    /* Sidebar */
    --sidebar-width: 300px;
    --sidebar-bg: rgba(0,0,0,.9);
    --sidebar-color: white;
}
```

## 6. Component Reference

### Buttons (`eli-forms.css`)
Buttons automatically support ripples via JS if `eli.js` is included.

| Class | Description |
| :--- | :--- |
| `.btn` | Base button style. |
| `.btn.small` / `.med` / `.big` | Size variations. |
| `.btn-block` | Stretches to fill grid cell. |
| `.btn-group` | Flex container for connected buttons. |
| `.btn-dropdown` | Used for dropdown triggers (requires sibling `.dropdown`). |

### Cards (`eli-components.css`)
Designed for Grid layouts.

*   **Structure:**
    ```html
    <div class="card">
        <div class="card-header">Title</div> <!-- Optional -->
        <img src="..." class="card-img-top"> <!-- Optional -->
        <div class="card-body">Content</div>
        <div class="card-footer">Links/Buttons</div>
    </div>
    ```
*   **Modifiers:** `.card.auto` (auto height), `.card.top/bottom/center` (vertical alignment in grid).

### Form Inputs (`eli-forms.css`)
EliCSS uses a "Floating Label" pattern. The styling depends on `placeholder=" "` being present on the input.

*   **Text Input:**
    ```html
    <div class="input-field">
        <i class="mdi mdi-account"></i> <!-- Optional Icon -->
        <input type="text" id="name" placeholder=" ">
        <label for="name">Full Name</label>
    </div>
    ```
*   **Checkbox:**
    ```html
    <div class="input-checkbox">
        <label>
            <input type="checkbox">
            <span>I agree</span>
        </label>
    </div>
    ```
*   **Switch:** Wrap a checkbox in `<div class="switchbox">`.

### Navbar (`eli-grid.css`)
*   **Container:** `<header>`
*   **Layouts:** `.ha1` (Logo left, nav right), `.h1a1` (Nav, Logo, Nav), `.h1r1` (Logo top, nav bottom).
*   **Items:** `.brand` (for logo), `<nav>` (container for links).

### Modal (`eli-forms.css` / JS)
*   **Trigger:** Any element with `onclick="ToggleModal('modalID')"` (Assuming helper JS usage) or manual class manipulation.
*   **Structure:**
    ```html
    <div id="myModal" class="modal">
        <div class="modal-container">
            <i class="modalclosebtn mdi mdi-close" onclick="..."></i>
            <!-- Content -->
        </div>
    </div>
    ```
*   **State:** Add class `.active` to the `.modal` container to show it.

### Data Tables (`eli-datatables.css`)
Vanilla HTML tables styled with specific classes.
*   **Wrapper:** `.elitable_container`
*   **Header:** `.elitable_header`
*   **Body:** `.elitable_body` containing a `<table>`.
*   **Features:** Supports sticky headers and hover effects on rows.
*   **Status Labels:** Inside `td`, use `<span class="status active">Active</span>`.

### Tabs (`eli-forms.css`)
*   **List:** `<ul class="tabs">` containing `<li>` elements.
*   **Content:** `<div class="tab-content">`.
*   **State:** Class `.active` on both the `li` and the corresponding `tab-content` determines visibility.

## 7. Programmatic Implementation Notes

When generating UI programmatically using this framework:

1.  **Grid Calculation:** Calculate your column count. If you have 4 items, assign the parent `g4`. If you need the first column fixed width, use `gaaaa` or `g1aaa` based on precise needs.
2.  **Icons:** Use the `mdi mdi-{icon-name}` pattern.
3.  **Input IDs:** Ensure every `<input>` has a unique `id` and the sibling `<label>` has a matching `for` attribute, or the floating animation will not work.
4.  **Z-Index:** Modals use `z-index: 99`. Sidebars use `z-index: 3`. Ensure generated overlays respect this stack.
