import styled from "styled-components";

const Outer = styled.div`
  position: absolute;
  margin-top: 1rem;
`;

const Background = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.25);
`;

const Inner = styled.div`
  z-index: 1001;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);

  background-color: #ffffff;
  border-radius: 5px;
  padding: 1rem;

  display: flex;
  flex-direction: column;

  &>* {
    margin-bottom: 1rem;
  
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

interface Props {
  children?: React.ReactNode;
  show: boolean;
  setShow: (show: boolean) => void;
}

function HoverMenu({ children, show, setShow }: Props) {
  if (!show) return null;

  return (
    <Outer>
      <Background onClick={() => void setShow(false)} />
      <Inner>{children}</Inner>
    </Outer>
  )
}

export default HoverMenu