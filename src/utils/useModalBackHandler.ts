import { useEffect, useRef } from 'react';

// Every admin drill-down screen (Property Editor, Project Editor, Banner
// Editor, Blog Editor, Media preview, etc.) used a plain boolean/id piece of
// state to decide whether it was open — with no browser-history entry for
// it. The very first browser BACK press after opening one of these had
// nothing in-app to pop to, so it fell through to whatever page existed
// before the admin tab was opened — on mobile that's frequently "leave the
// site" or "phone home screen", which is exactly what was reported.
//
// This hook is the one fix applied everywhere: call it with the drill-down's
// existing open/visible boolean and its existing close handler. It pushes a
// history entry the moment the screen opens, and calls the close handler
// when BACK is pressed while it's open — Save/Cancel/X still work exactly
// as before, this only adds BACK support on top.
export function useModalBackHandler(isOpen: boolean, onClose: () => void) {
  const pushedRef = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (isOpen && !pushedRef.current) {
      pushedRef.current = true;
      try { window.history.pushState({ ...(window.history.state || {}), adminModal: true }, ''); } catch {}
    } else if (!isOpen && pushedRef.current) {
      // Closed via Save/Cancel/X rather than BACK — remove the history
      // entry we added so a later BACK press goes to the real previous
      // screen instead of re-opening this one.
      pushedRef.current = false;
      try { if (window.history.state?.adminModal) window.history.back(); } catch {}
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onPopState = () => {
      if (pushedRef.current) {
        pushedRef.current = false;
        onCloseRef.current();
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [isOpen]);
}
