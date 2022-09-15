import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";

interface Props {
  children: React.ReactNode;
  onInit?: () => Promise<any>;
  onTop?: () => Promise<any>;
  onBottom?: () => Promise<any>;
  initSpinner?: React.ReactNode;
  topSpinner?: React.ReactNode;
  bottomSpinner?: React.ReactNode;
}

function InfiniteScroll({ children, onInit, onTop, onBottom, initSpinner, topSpinner, bottomSpinner }: Props) {
  const previousHeightEqual = () => previousHeight.current === document.body.offsetHeight;
  const scrolledTop = () => window.scrollY <= 0;
  const scrolledBottom = () => window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight;

  const [spinners, setSpinners] = useState({ top: false, mid: false, bottom: false });
  const previousHeight = useRef(document.body.offsetHeight);
  const overScrolled = useRef(false);

  const onScroll = (): void => {
    if (!previousHeightEqual()) return void (previousHeight.current = document.body.offsetHeight);

    if (scrolledTop() && !overScrolled.current) {
      setSpinners({ ...spinners, top: true });
    }
    else if (scrolledBottom() && !overScrolled.current) {
      setSpinners({ ...spinners, bottom: true });
    }

    overScrolled.current = scrolledTop() || scrolledBottom();
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
      overScrolled.current = false;
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
      {spinners.top && (topSpinner || <Spinner />)}
      {spinners.mid ? (initSpinner || <Spinner />) : <div>{children}</div>}
      {spinners.bottom && (bottomSpinner || <Spinner />)}
    </>
  )
}

export default InfiniteScroll