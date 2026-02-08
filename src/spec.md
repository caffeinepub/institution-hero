# Specification

## Summary
**Goal:** Display the uploaded QR code image on the existing Slides tab (/slides).

**Planned changes:**
- Add the uploaded file `Morris, 2012, QR code.png` to the frontend’s public static assets directory (following the existing assets path convention).
- Update the Slides page (`/slides`) to render the QR code image instead of returning `null`.
- Ensure the image is responsive (fits within the page width without overflowing) and includes an English alt text.

**User-visible outcome:** Visiting the Slides tab (/slides) shows the QR code image on the page, scaled to fit the layout.
