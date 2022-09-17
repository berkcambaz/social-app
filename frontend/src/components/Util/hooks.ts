import { MutableRefObject, useEffect, useRef, useState } from "react";

export function useViewToggler<T>(ref: MutableRefObject<T>) {
  const [show, setShow] = useState(false);
  const block = useRef(false);

  const handler = (ev: globalThis.MouseEvent): any => {
    if (block.current) return void (block.current = false);
    if (!ref.current) return;
    const node = ref.current as unknown as Node;
    if (!node.contains(ev.target as Node)) setShow(false);
  }

  useEffect(() => {
    if (!show) return;
    block.current = true;
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [show])

  return [show, setShow] as const;
}