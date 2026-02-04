# Specification

## Summary
**Goal:** Provide per-signed-in-user (Internet Identity Principal), non-repeating feedback quote cycling for Activities 1 and 2, persisted in the Motoko canister and consistent across reloads/devices.

**Planned changes:**
- Add separate backend quote pools for Activity 1 and Activity 2 with >= 400 quotes per activity (>= 100 each from Star Wars, Avengers, Batman, and Harry Potter), each quote including text, attribution, and franchise label.
- Implement canister-side per-Principal, per-activity non-repeating quote cycling that resets after a user exhausts an activity’s quote pool.
- Expose new Candid endpoints in `backend/main.mo` to fetch the next quote for Activity 1 and Activity 2 for the calling user (supporting Activity 2’s “Generate Another” behavior).
- Update Activity 1 frontend to display the canister-provided next quote in the “Get a Word of Affirmation” feedback section (replacing the current deterministic Star Wars-only selector).
- Update Activity 2 frontend so “Validate My Micro-Solution” and “Generate Another” display canister-provided quotes, while keeping existing citation/message generation behavior intact unless changes are required to support the new quote source.
- Add React Query hooks/mutations to call the new quote endpoints, handling identity changes correctly and failing gracefully (English messaging) when the authenticated actor is not ready.
- Preserve backward compatibility for existing Activity 1/2 stored submissions while adding new quote-cycling state; add `backend/migration.mo` only if needed to avoid losing existing state on upgrade.

**User-visible outcome:** Signed-in users see feedback quotes in Activities 1 and 2 pulled from large multi-franchise pools, with quotes not repeating for that user within an activity until the pool is exhausted; quote sequences persist across reloads/devices and are independent per activity and per user.
