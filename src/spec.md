# Specification

## Summary
**Goal:** Ensure the Leadership Board reflects new Activity 1 (leadership word) and Activity 2 (micro-solution) submissions automatically while the page remains open, without requiring a manual browser refresh.

**Planned changes:**
- Add client-side polling/refetch on the Leadership Board to periodically refresh leadership word counts and community solutions while the page is open, using a reasonable interval and avoiding visible UI flicker.
- Update the cached leadership word counts immediately after a successful Activity 1 submission so any currently mounted Leadership Board/summary views reflect the new count right away, while preserving existing cache invalidation/reconciliation behavior.
- Update the cached community solutions list immediately after a successful Activity 2 submission so any currently mounted Leadership Board/solutions views include the new micro-solution right away, while preserving existing cache invalidation/reconciliation behavior.

**User-visible outcome:** Users can keep the Leadership Board open and see new Activity 1 and Activity 2 submissions appear automatically, and their own submissions show up immediately after they submit—without manually refreshing the page.
