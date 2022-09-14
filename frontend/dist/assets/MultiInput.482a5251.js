import{s as l,R as c,r as s,a}from"./index.aafe005b.js";const p=l.textarea`
  box-sizing: content-box;
  line-height: normal;

  overflow: hidden;
  resize: none;
  padding: 0;
  border: 0;
  outline: 0;
  border-radius: 0;

  border-bottom: 1px solid #000000;
  padding-bottom: 1px;
`,f=c.forwardRef(({onInput:n,className:i,placeholder:u},r)=>{const e=s.exports.useRef(null);s.exports.useEffect(()=>{o(null)},[]);const o=t=>{t&&n&&n(t),e.current&&(e.current.style.height="0",e.current.style.height=e.current.scrollHeight+"px")};return a(p,{ref:t=>{e.current=t,typeof r=="function"?r(t):r&&(r.current=t)},onInput:o,className:i,placeholder:u})});export{f as M};
