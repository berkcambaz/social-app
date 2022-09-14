import{s as e,C as n,j as a,R as s,a as i}from"./index.aafe005b.js";const b=e.button`
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
`;function c({size:o,children:r,onClick:t}){return a(b,{size:o,onClick:t,children:[" ",r]})}const l=e.input`
  box-sizing: content-box;
  line-height: normal;
  
  padding: 0;
  border: 0;
  outline: 0;
  border-radius: 0;

  border-bottom: 1px solid #000000;
  padding-bottom: 1px;
`,p=s.forwardRef(({type:o,onInput:r,placeholder:t},d)=>i(l,{type:o,onInput:r,placeholder:t,ref:d}));export{c as B,p as S};
