import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Spinner from "./Spinner";

interface Props {
  children: React.ReactNode;
  onInit?: () => Promise<any>;
  onTop?: () => Promise<any>;
  onBottom?: () => Promise<any>;
}

function InfiniteScroll({ children, onInit, onTop, onBottom }: Props) {
  const previousHeightEqual = () => previousHeight.current === document.body.offsetHeight;
  const scrolledTop = () => window.scrollY <= 0;
  const scrolledBottom = () => window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight;

  const [spinners, setSpinners] = useState({ top: false, mid: false, bottom: false });
  const previousHeight = useRef(document.body.offsetHeight);

  const onScroll = () => {
    if (!previousHeightEqual()) return previousHeight.current = document.body.offsetHeight;

    if (scrolledTop()) {
      setSpinners({ ...spinners, top: true });
    }
    else if (scrolledBottom()) {
      setSpinners({ ...spinners, bottom: true });
    }
  }

  useEffect(() => {
    if (!spinners.mid) return;
    (async () => {
      onInit && await onInit();
      setSpinners({ ...spinners, mid: false });
    })();
  }, [spinners.mid])

  useEffect(() => {
    if (!spinners.top) return;
    (async () => {
      onTop && await onTop();
      setSpinners({ ...spinners, top: false });
    })();
  }, [spinners.top])

  useEffect(() => {
    if (!spinners.bottom) {
      if (scrolledBottom()) window.scrollTo(0, window.scrollY - 1);
      return;
    }

    (async () => {
      onBottom && await onBottom();
      setSpinners({ ...spinners, bottom: false });
    })();
  }, [spinners.bottom])

  useEffect(() => {
    setSpinners({ ...spinners, mid: true });

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  return (
    <>
      {spinners.top && <Spinner />}
      {spinners.mid ? <Spinner /> : <div>{children}</div>}
      {spinners.bottom && <Spinner />}
    </>
  )
}

export default InfiniteScroll