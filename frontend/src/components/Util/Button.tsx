import { MouseEventHandler } from "react";
import styled, { css } from "styled-components"

const StyledButton = styled.button<{ size: "small" | "big" }>`
  cursor: pointer;

  border: 0;
  border-radius: 5px;

  background-color: #000000;
  color: #ffffff;

  ${props => props.size === "small" ?
    css`padding: 0.25rem 1rem;` :
    css`padding: 0.5rem 1.25rem;`
  };

  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

interface Props {
  size: "small" | "big",
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>
}

function Button({ size, children, onClick }: Props) {
  return <StyledButton size={size} onClick={onClick}>{children}</StyledButton >
}

export default Button