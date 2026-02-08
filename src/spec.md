# Specification

## Summary
**Goal:** Let users submit Activity 1 and Activity 2 responses anonymously without being blocked by Internet Identity authentication or identity-loading state.

**Planned changes:**
- Update Activity 1 and Activity 2 pages so the submission forms are always accessible and not gated by the “Connecting… Please wait while we establish a secure connection.” experience.
- Refactor usage of the SignInGate component on Activities 1 & 2 so it does not wrap the submission forms; gate only any truly authenticated-only sections (e.g., community contributions) if they remain.
- Adjust Activity 1/2 submit (and any post-submit quote fetching) to use an anonymous actor when authenticated identity is unavailable, rather than treating identity loading as a prerequisite.
- Update backend access control to allow anonymous principals to submit Activity 1 and Activity 2 responses, and to retrieve Activity 1/2 quotes if those endpoints are used immediately after anonymous submission.

**User-visible outcome:** Users can open Activity 1 and Activity 2 and successfully submit responses even when not signed in or when Internet Identity never finishes loading; only any authenticated-only sections (if present) prompt for sign-in.
