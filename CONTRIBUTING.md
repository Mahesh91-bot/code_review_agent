# Contributing to SAGE

Thank you for helping improve **SAGE (Stateful Audit & Generation Engine)**. We welcome bug reports, feature proposals, docs improvements, and code contributions from the community. 🙌

## Ways to Contribute

- 🐞 Report bugs
- ✨ Propose features
- 🧠 Improve review quality prompts and memory workflows
- 📝 Improve docs and onboarding
- 🧪 Add tests and reproducible evaluation scenarios

---

## Reporting Bugs

Before creating a bug report:

1. Search existing issues to avoid duplicates.
2. Reproduce on the latest `main`.
3. Gather logs, error messages, and steps.

Include the following in your issue:

- **Expected behavior**
- **Actual behavior**
- **Reproduction steps**
- **Environment**
  - OS
  - Node version
  - npm version
  - Browser (if frontend bug)
- Screenshots / terminal output (if available)

Use title format:

`[Bug] Short description of failure`

---

## Requesting Features

Feature requests are welcome. Please include:

- Problem statement
- Proposed solution
- Why this matters for users/hackathon judges
- Trade-offs or alternatives considered

Use title format:

`[Feature] Short proposal title`

---

## Development Setup Expectations

Please complete local setup first:

1. Follow [`SETUP.md`](./SETUP.md) fully.
2. Ensure both backend and frontend start successfully.
3. Confirm environment variables are configured locally.

---

## Pull Request Process

1. **Fork** the repository and create a branch:
   - `feat/<short-name>`
   - `fix/<short-name>`
   - `docs/<short-name>`
2. Make focused changes (small, reviewable PRs).
3. Run checks before opening PR:
   - Backend starts without runtime errors
   - Frontend lint/build passes:
     ```bash
     cd frontend
     npm run lint
     npm run build
     ```
4. **Run SAGE on your own changed code** and include the summary in your PR description.
   - This is required to reinforce dogfooding quality.
5. Update docs if behavior or APIs changed.
6. Open a PR with:
   - Problem
   - Approach
   - Test evidence
   - Screenshots/video for UI changes

---

## Coding Standards

- Prefer clarity over cleverness.
- Keep functions focused and composable.
- Preserve existing API shapes unless explicitly changing them.
- Add comments only where logic is non-obvious.
- Avoid introducing breaking changes without discussion.
- Keep secrets and credentials out of code and commits.

### SAGE Review Requirement

Before submitting a PR, run your changes through SAGE and include:

- Top issues found
- What you fixed
- Any justified exceptions

This ensures contributors use the same quality gate users will experience.

---

## Commit Message Guidance

Use concise, descriptive commits:

- `feat: add structured review score badge`
- `fix: handle empty feedback correction payload`
- `docs: improve setup guide for env validation`

---

## Review and Merge

- At least one maintainer approval is required.
- PRs may be asked to split scope before merge.
- Maintainers may request tests/docs updates before approval.

---

## Community Values

Be respectful, collaborative, and constructive. Please follow [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

