import{s as c,u as d,h as S,r as n,d as g,j as x,a as r,b as y}from"./index.144b30fb.js";import{U}from"./index.47e59ae2.js";import{S as j}from"./SingleInput.fe642a1e.js";const v=c.div`
  display: flex;
  justify-content: center;

  margin: 1rem 0;
`,R=c.div`
  display: flex;
  justify-content: center;
`;function b(){const{t:o}=d(),i=S(t=>t.fetchSearchUser),[p,a]=n.exports.useState([]),[l,u]=n.exports.useState(!1),s=n.exports.useRef([]),e=n.exports.useRef(""),f=t=>{if(e.current=t.currentTarget.value.trim(),e.current.length===0||e.current.length>32){a([]),u(!1);return}u(!0),s.current.push(!0),setTimeout(async()=>{if(s.current.pop(),s.current.length!==0||e.current.length===0||e.current.length>32)return;const m=await i(e.current);s.current.length===0&&(e.current.length===0||e.current.length>32||(a(m),u(!1)))},1e3)},h=g(t=>t.setRoute);return n.exports.useEffect(()=>{h({name:"search",path:location.pathname})},[]),x("div",{children:[r(v,{children:r(j,{type:"text",placeholder:o("user"),onInput:f})}),l?r(R,{children:r(y,{})}):r("div",{children:p.map(t=>r(U,{user:t},t.id))})]})}export{b as default};
