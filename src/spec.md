# Specification

## Summary
**Goal:** Prevent Villainous/negative inputs from generating validation/feedback, ensure Activity 2 validations only use Heroic responses, and add a new Leadership Board page showing existing community feedback in two columns.

**Planned changes:**
- Activity 2: Update validation generation so it uses only the Heroic response (and other non-villain fields as needed) and never the Villain response text.
- Activity 1 & Activity 2: When the user requests feedback/validation and the input is determined to be Villainous/negative, block generation and show a user-facing English error message that includes the literal error code "000" (no affirmation/validation result shown).
- Add a new main navigation tab "Leadership Board" that routes to a new page with a 2-column layout: "Leadership Words" and "Community Solutions".
- On the Leadership Board page, render the existing leadership words community feedback UI in the first column and the existing community micro-solution feedback list UI in the second column, with responsive stacking on small screens.

**User-visible outcome:** Users can only generate feedback/validation for Heroic (non-negative) inputs; negative inputs show an error including code "000", and users can visit a new Leadership Board tab to view community feedback in two columns.
