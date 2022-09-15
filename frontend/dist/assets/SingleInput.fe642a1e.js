import{s as e,C as n,j as b,R as l,a as u}from"./index.144b30fb.js";const c=e.button`
  cursor: pointer;

  border: 0;
  border-radius: 5px;

  background-color: #000000;
  color: #ffffff;

  ${o=>o.size==="small"?n`padding: 0.25rem 1rem;`:n`padding: 0.5rem 1.25rem;`};

  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;function f({size:o,children:r,onClick:t}){return b(c,{size:o,onClick:t,children:[" ",r]})}const p=e.input`
  box-sizing: content-box;
  line-height: normal;
  
  padding: 0;
  border: 0;
  outline: 0;
  border-radius: 0;

  border-bottom: 1px solid #000000;
  padding-bottom: 1px;
`,m=l.forwardRef(({type:o,onInput:r,onFocus:t,onBlur:d,className:a,placeholder:s},i)=>u(p,{type:o,onInput:r,onFocus:t,onBlur:d,className:a,placeholder:s,ref:i}));export{f as B,m as S};
