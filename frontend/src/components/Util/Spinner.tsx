import styled, { keyframes } from "styled-components"

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  border: 0.25rem solid #000000;
  border-top: 0.25rem solid #ffffff;
  border-radius: 50%;

  width: 1.5rem;
  height: 1.5rem;
  margin: 1rem 0;

  box-sizing: border-box;

  animation: ${spin} 2s linear infinite;
`;

interface Props {
  className?: string;
}

function Spinner({ className }: Props) {
  return <StyledSpinner className={className} />
}

export default Spinner

export function useWait<T>(start: () => Promise<T>): () => Promise<T> {

  const threshold = 500;
  let out: T;

  return () => new Promise(async (resolve) => {
    let waited = false;
    let loaded = false;

    setTimeout(() => {
      waited = true;

      if (loaded) {
        resolve(out)
      }
    }, threshold);

    out = await start();
    
    loaded = true;
    if (waited) {
      resolve(out)
    }
  })
}