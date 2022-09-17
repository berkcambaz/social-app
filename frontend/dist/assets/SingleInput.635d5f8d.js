import{s as e,C as n,a as d,R as u}from"./index.91ab3643.js";const l=e.button`
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
`;function g({size:o,children:r,onClick:t}){return d(l,{size:o,onClick:t,children:r})}const c=e.input`
  box-sizing: content-box;
  line-height: normal;
  
  padding: 0;
  border: 0;
  outline: 0;
  border-radius: 0;

  border-bottom: 1px solid #000000;
  padding-bottom: 1px;
`,f=u.forwardRef(({type:o,onInput:r,onFocus:t,onBlur:a,className:s,placeholder:i},b)=>d(c,{type:o,onInput:r,onFocus:t,onBlur:a,className:s,placeholder:i,ref:b}));export{g as B,f as S};
