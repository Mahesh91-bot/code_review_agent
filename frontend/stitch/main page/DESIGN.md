# Design System Strategy: The Kinetic Architect

## 1. Overview & Creative North Star
The North Star for this design system is **"The Kinetic Architect."** 

In the world of AI code review, we are not just building another dashboard; we are creating a high-precision instrument for digital engineers. This system rejects the "flat and friendly" SaaS aesthetic in favor of a high-contrast, editorial layout that mimics the depth and focus of a modern IDE, refined through the lens of premium luxury.

We break the "template" look by utilizing **intentional asymmetry**—aligning technical metadata to strict grids while allowing AI insights to float on elevated glass layers. Overlapping elements and high-contrast typography scales create a sense of movement and "intelligence" that feels active, not static.

---

## 2. Colors & Tonal Depth
Our palette is rooted in the void. We use deep charcoals and pitch blacks to create an environment where code—and the AI’s critique—becomes the only source of "light."

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning or layout containment. Traditional "boxes" make an interface feel dated and rigid. Instead, define boundaries through:
- **Background Color Shifts:** A `surface_container_low` (#131315) section sitting directly on a `surface` (#0e0e10) background.
- **Tonal Transitions:** Using whitespace and subtle shifts in value to imply the end of one zone and the start of another.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of tinted obsidian.
1.  **Base Layer:** `surface_container_lowest` (#000000) for the deepest background or the subtle grid pattern container.
2.  **Primary Canvas:** `surface` (#0e0e10) for the main application workspace.
3.  **Floating Elements:** `surface_container_highest` (#262528) with 60% opacity and a `20px` backdrop blur to create a "Glassmorphism" effect.

### Signature Textures
To provide "soul," use a subtle gradient for primary actions. Instead of a flat `primary` fill, use a linear gradient from `primary` (#9cff93) to `primary_container` (#00fc40) at a 135-degree angle. This creates a "neon-glowing" effect that feels electrified.

---

## 3. Typography: Editorial Precision
The interplay between the geometric **Inter** and the technical **Fira Code** defines our brand's dual nature: Human Strategy vs. Machine Execution.

- **Display & Headlines:** Use **Inter** with tight letter spacing (-0.02em). The high-contrast scale (Display-lg at 3.5rem) should be used sparingly to create "hero" moments in the UI.
- **The Technical Layer:** All code snippets, commit hashes, and file paths must use **Fira Code**. 
- **Labels:** **Space Grotesk** (label-md/sm) is reserved for metadata and micro-copy, providing a "brutalist" technical feel that separates system data from user content.

---

## 4. Elevation & Depth
We convey hierarchy through **Tonal Layering** rather than traditional structural lines.

### The Layering Principle
Depth is achieved by "stacking" surface tiers. Place a `surface_container_highest` card on top of a `surface_container_low` section. This creates a soft, natural lift.

### Ambient Shadows
Shadows are never black. Use a tinted shadow based on the `on_surface` color at 4-8% opacity with a blur radius of at least `32px`. This mimics natural, ambient light diffusion within a dark space.

### The "Ghost Border" Fallback
If a boundary is required for accessibility (e.g., inside a dense code diff), use a **Ghost Border**:
- **Stroke:** 1px
- **Color:** `outline_variant` (#48474a)
- **Opacity:** 15% - 20%
- **Requirement:** Never use 100% opaque, high-contrast borders.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`) with a `0 0 15px` outer glow in the same hue. Text is `on_primary` (#006413).
- **Secondary:** Transparent background with a "Ghost Border" and `secondary` (#d277ff) text.
- **Tertiary:** No border, no background. `tertiary` (#8af2ff) text with an underline that appears only on hover.

### AI Insight Cards (The "Glass" Card)
- **Background:** `surface_container_highest` at 40% opacity.
- **Blur:** `backdrop-filter: blur(12px)`.
- **Accent:** A 2px left-side border using the `secondary` (#d277ff) neon purple to denote "AI Agent" activity.
- **Spacing:** Use `xl` (0.75rem) roundedness for a modern feel.

### Input Fields
- **State:** `surface_container_low` background. 
- **Focus State:** No thick border change; instead, the background shifts to `surface_container_high` and the `primary` accent glows softly underneath the text.

### Code Diff Blocks
- **Logic:** Forbid divider lines between lines of code. Use background highlights: `primary_container` (at 10% opacity) for additions and `error_container` (at 10% opacity) for deletions.
- **Typography:** Fira Code (body-md).

---

## 6. Do's and Don'ts

### Do
- **Do** use the grid pattern (`#ffffff` at 3% opacity) as a background texture to anchor floating glass elements.
- **Do** use generous vertical white space. If you think it's enough, add 16px more.
- **Do** use `secondary_dim` (#d277ff) for AI-generated suggestions to distinguish them from system-generated alerts.

### Don't
- **Don't** use `#000000` for everything. Use the `surface` tokens to create depth; a pure black UI feels "flat" and "cheap" without tonal variation.
- **Don't** use standard blue for links. Use `tertiary` (#8af2ff).
- **Don't** use sharp corners. Use the `md` (0.375rem) or `lg` (0.5rem) roundedness scale to keep the "premium" feel.
- **Don't** use 100% white text. Use `on_surface` (#f9f5f8) for better readability in dark mode.