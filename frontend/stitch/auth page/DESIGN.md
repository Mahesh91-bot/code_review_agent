# Design System Strategy: Terminal Editorial

## 1. Overview & Creative North Star: "The Kinetic Ledger"
This design system is built to transform the technical rigor of a stateful audit engine into a high-end editorial experience. We are moving away from the "SaaS Template" look. Our Creative North Star, **"The Kinetic Ledger,"** treats the UI as a living, breathing document—a blend of high-fashion typography and terminal-grade performance. 

We break the standard grid through **intentional asymmetry**: large display type should often bleed off-center, while technical data (monospace) anchors the corners. We use overlapping layers and "glowing" focal points to guide the eye, creating a sense of depth that feels like looking through a high-tech viewfinder.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a "Void Black" foundation, punctuated by the high-voltage energy of Electric Green.

### The Palette
- **Primary Focus:** `primary_container` (#00FF41) is our signature. It is used sparingly for high-impact actions and "live" status indicators.
- **Backgrounds:** The foundation is `surface` (#131315), transitioning into `surface_container_lowest` (#0e0e10) for maximum contrast.
- **The "No-Line" Rule:** To maintain a premium feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined solely through background color shifts. For example, a `surface_container_low` section sitting on a `surface` background creates a sophisticated, invisible edge.
- **Surface Hierarchy & Nesting:** Treat the UI as stacked sheets of obsidian glass. An inner container should always be one "tier" higher or lower than its parent (e.g., a `surface_container_high` card inside a `surface_container` section).
- **The "Glass & Gradient" Rule:** Floating elements must use Glassmorphism. Apply `surface_variant` at 40% opacity with a `24px` backdrop blur. 
- **Signature Textures:** Use subtle linear gradients for CTAs, transitioning from `primary_container` (#00FF41) to `primary_fixed_dim` (#00e639) at a 135-degree angle. This adds "soul" and prevents the green from appearing flat or "cheap."

---

## 3. Typography: Editorial Authority
We utilize a high-contrast typographic scale to separate narrative storytelling from technical data.

- **Display & Headlines (Inter):** These are the "Voices" of the system. Use `display-lg` and `headline-lg` with tight letter spacing (-0.02em) and bold weights. They should feel massive, authoritative, and occasionally asymmetric in placement.
- **The Technical Accent (Space Grotesk):** All labels and metadata (`label-md`, `label-sm`) use Space Grotesk. This introduces a geometric, monospace-adjacent feel that reinforces the "Engine" aspect of the product.
- **Body Copy:** Keep `body-lg` clean and legible. Use `on_surface_variant` (#b9ccb2) for secondary body text to reduce visual noise and maintain the dark-mode atmosphere.

---

## 4. Elevation & Depth
We eschew traditional "drop shadows" for Tonal Layering.

- **The Layering Principle:** Place a `surface_container_lowest` element on a `surface_container_low` background to create a "recessed" look, or vice-versa for a "lifted" look.
- **Ambient Shadows:** For floating modals, use a "Green Glow" shadow: `0px 20px 40px rgba(0, 255, 65, 0.04)`. The shadow is a tinted version of our primary color, mimicking light emission from a screen.
- **The "Ghost Border":** If a container requires a boundary for accessibility, use the `outline_variant` token at **15% opacity**. It should feel like a faint reflection on the edge of glass, never a solid line.
- **Grid Patterns:** Overlay a subtle 24px square grid on `surface_container_lowest` sections using `outline_variant` at 5% opacity to evoke the feeling of a technical blueprint.

---

## 5. Components

### Buttons
- **Primary:** Background `primary_container` (#00FF41), Text `on_primary_fixed` (#002203). Bold Inter. No border.
- **Secondary (The Glass Button):** Background `surface_variant` at 20% opacity, Backdrop Blur 12px, Ghost Border at 20%.
- **Tertiary:** Text-only in `primary_fixed`, with a 1px underline that appears on hover.

### Input Fields
- **Default State:** Background `surface_container_highest`, no border, `sm` roundedness (0.125rem).
- **Focus State:** A 1px Ghost Border in `primary` and a subtle outer glow (`primary_container` at 10% opacity).
- **Labeling:** Labels must use `label-sm` (Space Grotesk) in uppercase with 0.1em letter spacing.

### Cards & Lists
- **Rule:** **Strictly no divider lines.** 
- Separate list items using vertical white space (8px or 16px) or by alternating background tones between `surface_container_low` and `surface_container_lowest`.
- **Surgical Accents:** Use a 2px vertical "status bar" of `primary_container` on the left edge of an active card to indicate state, rather than changing the whole card color.

### Tooltips & Overlays
- **Aesthetic:** Dark and sharp. Use `surface_container_highest` with a 100% `outline_variant` Ghost Border. Typography must be `label-sm`.

---

## 6. Do’s and Don’ts

### Do
- **Do** use extreme scale. Pair a `display-lg` headline with a tiny `label-sm` tag for a professional, editorial look.
- **Do** embrace "Pitch Black" (#09090b). Let the black space breathe; it makes the Electric Green feel more powerful.
- **Do** use asymmetrical layouts. Push content to the edges to create a "wide-screen" cinematic feel.

### Don’t
- **Don't** use pure white text for long body copy. Use `on_surface` (#e5e1e4) to prevent eye strain against the black background.
- **Don't** use rounded corners larger than `md` (0.375rem). This system is about precision and "tech," not "softness." 
- **Don't** use standard box shadows. If an element isn't defined by a background shift or a ghost border, it shouldn't be there.
- **Don't** use 100% opaque borders. They break the "glass" immersion.