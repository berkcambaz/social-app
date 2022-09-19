import{s as a,u as d,g as S,r as n,e as g,j as x,a as r,c as y}from"./index.248dc6d2.js";import{U}from"./index.8efcfca7.js";import{S as j}from"./SingleInput.19c464b9.js";const v=a.div`
  display: flex;
  justify-content: center;

  margin: 1rem 0;
`,R=a.div`
  display: flex;
  justify-content: center;
`;function w(){const{t:o}=d(),i=S(t=>t.fetchSearchUser),[p,c]=n.exports.useState([]),[l,u]=n.exports.useState(!1),s=n.exports.useRef([]),e=n.exports.useRef(""),f=t=>{if(e.current=t.currentTarget.value.trim(),e.current.length===0||e.current.length>32){c([]),u(!1);return}u(!0),s.current.push(!0),setTimeout(async()=>{if(s.current.pop(),s.current.length!==0||e.current.length===0||e.current.length>32)return;const m=await i(e.current);s.current.length===0&&(e.current.length===0||e.current.length>32||(c(m),u(!1)))},1e3)},h=g(t=>t.setRoute);return n.exports.useEffect(()=>{h({name:"search",path:location.pathname})},[]),x("div",{children:[r(v,{children:r(j,{type:"text",placeholder:o("user"),onInput:f})}),l?r(R,{children:r(y,{})}):r("div",{children:p.map(t=>r(U,{user:t},t.id))})]})}export{w as default};
