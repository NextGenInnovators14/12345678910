# V13 — SPA Scroll Navigation Fix

## Problem
Opening another page from any scroll position could preserve the previous page's scroll offset.
On mobile, if the destination page was shorter, it could appear to open at/near its footer.

## Fix
- Set `history.scrollRestoration = 'manual'`.
- Reset scroll immediately inside the central `setActiveView()` navigation function.
- Reset again with two animation frames to catch delayed browser restoration.
- Added `useLayoutEffect` + `useEffect` route resets for view/detail-ID changes.
- Same-view clicks also reset to the top because the reset is now centralized in `setActiveView()`.

This applies globally to the SPA routes, including Home, Properties, Projects, Services, Offers, Contact, Register, Sign In, Broker, Affiliate, etc.
