# AI Prompt Log

## Purpose

This document records the AI prompts used during the development of the PlayPower frontend assignment.

The log is intentionally limited to prompts that can be verified from the project workflow/conversation. It does **not** invent or reconstruct prompts that were not actually recorded.

---

## 1. Project Understanding & Planning

### Prompt
> Understand the Next.js exercise and help me plan the implementation according to the assignment requirements.

### Purpose
Used to understand the assignment scope, required screens, interactions, architecture-diagram requirement, and expected submission deliverables.

---

## 2. Frontend Technology Decision

### Prompt
> Which frontend tech should I use — React, Next.js, or Angular — as per my experience for a new project?

### Purpose
Used to select the frontend technology for the assignment.

### Decision
Next.js was selected for the implementation.

---

## 3. Architecture Diagram

### Prompt
> The assignment asks for a high-level architecture diagram for a production-scale vacation-rental marketplace. Make the architecture accordingly.

### Purpose
Used to define a production-scale architecture covering frontend, backend, storage, search, deployment, and external integrations.

### Output
A professional architecture diagram was created as `SystemArchitecture.png`.

---

## 4. Architecture Diagram Visual Design

### Prompt
> Instead, only generate the image for it in a professional, industry-accepted standard.

### Purpose
Used to generate the final visual architecture diagram rather than implementing the diagram in the application.

---

## 5. Property Visual Assets

### Prompt
> Generate the required property images for the Airbnb-style listing and keep the visual style consistent across the property.

### Purpose
Used to create the visual assets required for the property gallery and related sections.

### Asset approach
The images were generated independently and then manually integrated into the frontend. Reference/clone repositories were not used as implementation or asset sources.

---

## 6. Visual Consistency / Property Image Direction

### Prompt
> Create a visual bible for the property so that all generated images remain visually consistent.

### Purpose
Used to establish consistent architecture, materials, furniture, lighting, photography style, and room characteristics across the generated property images.

### Output
The resulting guidance was documented in:

`PROPERTY_VISUAL_BIBLE.md`

---

## 7. Photo Tour

### Prompt
> Implement the Photo Tour according to the assignment requirements, including category navigation, gallery layout, scrolling, and opening individual photos.

### Purpose
Used to implement the full-screen photo-tour experience and its interactions.

---

## 8. Lightbox

### Prompt
> Implement the Lightbox with previous/next navigation, keyboard arrow navigation, Escape-to-close, and the required transitions and interactions.

### Purpose
Used to implement the individual-photo viewer.

---

## 9. Amenities Dialog

### Prompt
> Implement the amenities dialog with the required sections, scrolling, close interaction, and accessibility behaviour.

### Purpose
Used to implement the full amenities modal.

---

## 10. Sticky Navigation

### Prompt
> Implement the sticky navigation that appears after the hero gallery and allows navigation between Photos, Amenities, Reviews, and Location.

### Purpose
Used to implement the sticky section navigation and active-section behaviour.

---

## 11. Listing Page

### Prompt
> Recreate the Airbnb-style listing page from the provided reference with matching layout, spacing, typography, colours, gallery, listing information, booking card, reviews, host section, location, and nearby stays.

### Purpose
Used as the main implementation direction for the listing page.

---

## 12. Interaction & Accessibility Refinement

### Prompt
> Review the implemented interactions and refine them to match the reference, including hover states, transitions, keyboard navigation, Escape handling, modal behaviour, focus management, and reduced-motion support.

### Purpose
Used for interaction and accessibility refinement across the application.

---

## 13. Visual QA & Debugging

### Prompt
> Review the implementation against the reference and identify visual or behavioural mismatches that should be fixed before submission.

### Purpose
Used for visual QA and refinement of the completed frontend.

---

## 14. Lightbox Control Visibility Fix

### Prompt
> The Lightbox controls are not visible on the white background. Fix the control styling so the close button and previous/next buttons remain clearly visible.

### Purpose
Used to correct the contrast problem caused by the lightbox controls retaining light/white styling after the background was changed to white.

---

## 15. Nearby Stays Image Fix

### Prompt
> The nearby-stay cards are showing solid colour placeholders instead of the generated images. Update the cards to use the actual `stay.image` assets.

### Purpose
Used to connect the generated nearby-stay images to the UI.

---

## 16. Photo Data Mapping Fix

### Prompt
> The photo data is incorrectly repeating the first image. Fix the photo mapping so all 43 photos use their correct category, source, alt text, and category index.

### Purpose
Used to correct the gallery data mapping and ensure all generated photos are associated with the intended listing-photo entries.

---

## 17. Validation

### Prompt
> Run the project validation checks and confirm that the application builds successfully and that there are no lint errors.

### Purpose
Used for final technical validation.

### Result
- `npm run lint` completed with **0 errors**.
- Remaining lint output consists of `<img>` recommendation warnings.
- `npm run build` completed successfully.

---

## 18. Submission Preparation

### Prompt
> Prepare the project for final submission, including the architecture diagram, AI workflow documentation, prompt log, and a clean submission package without `node_modules` or `.next`.

### Purpose
Used to prepare the final assignment deliverables.

---

## Notes on AI Usage

- AI was used as a development assistant for planning, implementation guidance, debugging, visual refinement, image generation, and validation.
- The application itself is a frontend-only Next.js implementation.
- No backend service was implemented for the assignment.
- The production-scale architecture diagram is conceptual and represents how a marketplace could scale beyond this frontend-only submission.
- Generated visual assets were independently created rather than copied from a public clone repository.
- Prompts that were not preserved verbatim have intentionally not been fabricated in this document. If an exact Antigravity prompt is available in its conversation/history, it should be pasted into this log rather than reconstructed.

