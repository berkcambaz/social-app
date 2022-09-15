import styled, { css } from "styled-components";

export const OuterContainer = styled.div<{ type: "top" | "bottom" }>`
  height: 3rem;

  position: fixed;
  ${props => props.type === "top" ? css`top: 0;` : css`bottom: 0;`};
  left: 0;
  right: 0;

  background-color: #ffffff;
  ${props => props.type === "top" ?
    css`border-bottom: 1px solid #000000;` :
    css`border-top: 1px solid #000000;`
  };

  z-index: 999;
`;

export const InnerContainer = styled.div<{ type: "top" | "bottom" }>`
  max-width: 640px;
  height: inherit;

  margin: 0 auto;

  display: flex;
  align-items: center;
  ${props => props.type === "top" ?
    css`justify-content: space-between;` :
    css`justify-content: space-evenly;`
  };
`;