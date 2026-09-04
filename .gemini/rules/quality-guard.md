# Mandatory 2nd-Level Verification Guard for Crystal Jaipuria

## Purpose
Prevent runtime regression errors, missing React imports, 404 page bugs, and broken product routes before any code is released or declared complete.

## Strict Rule:
Whenever any file in `src/` (especially `ProductDetailsSlug.jsx`, `CategoryPage.jsx`, `App.jsx`, or `src/admin-vijay/`) is modified:

1. **Never skip 2nd-level automated verification**:
   Always execute:
   ```bash
   npm.cmd run verify
   ```
2. **Checks performed by the verifier**:
   - Validates that all critical standardizer, metadata, and routing identifiers are imported.
   - Tests live database API connectivity and product slug resolution (`/products/slug/:slug`).
   - Ensures the legacy product registry & slug aliases exports remain valid.
   - Runs full production Vite build check.
3. **Only proceed if all checks PASS (0 failures)**.
