import { useEffect } from "react";

function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  onClickOutside: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (!element) return;
      const target = event.target as Node | null;
      if (target && element.contains(target)) return;
      onClickOutside(event);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [ref, onClickOutside]);
}

export default useClickOutside;


