# Specification

## Summary
**Goal:** Build the “Institution Hero” workshop app with core content pages, a cohesive academic/cinematic-mentor theme, Internet Identity authentication, and two interactive activities with persistent submissions and basic community summaries.

**Planned changes:**
- Create the core information architecture and navigable pages: Overview (abstract + short abstract), Bio, Learning Outcomes, Takeaways, Activities, Session Outline, and References, using the provided proposal content as the source of truth.
- Implement Activity 1 (“Your Leadership Word”) with single-word input, reflection prompts, submit/share flow, persistent storage, and an aggregated patterns view (top words with counts).
- Implement Activity 2 (“Resilient Leadership for Campus Solutions”) with challenge selection (including custom), villain/heroic responses, protective factor selection (including custom), micro-solution creation, submit/share flow, persistent storage, and a community list of submitted micro-solutions.
- Add Internet Identity sign-in/out UI and gate Activity 1 and 2 submissions behind authentication, attributing submissions to the signed-in Principal.
- Add a Session Outline view displaying the provided agenda items and durations in a responsive facilitation-friendly format.
- Implement backend (single Motoko actor) data models and APIs to store Activity 1 and 2 submissions, query Activity 1 word-count aggregates, and list Activity 2 micro-solutions.
- Apply a consistent “academic + cinematic mentor” visual theme across all pages (non blue/purple primary palette).
- Add generated static images (logo + hero banner) under `frontend/public/assets/generated` and render them in the header and Overview/landing section.

**User-visible outcome:** Users can navigate the full Institution Hero workshop content, sign in with Internet Identity, complete and submit both activities with responses saved across refresh, and view community patterns (top leadership words) and a list of shared micro-solutions.
