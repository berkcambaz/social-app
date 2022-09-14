import{s as m,u as d,g,r,c as S,j as x,a as s,k as y}from"./index.aafe005b.js";import{U}from"./index.c86f6874.js";import{S as j}from"./SingleInput.7cc316a0.js";const v=m.div`
  display: flex;
  justify-content: center;

  margin: 1rem 0;
`;function k(){const{t:c}=d(),o=g(t=>t.fetchSearchUser),[i,a]=r.exports.useState([]),[p,u]=r.exports.useState(!1),n=r.exports.useRef([]),e=r.exports.useRef(""),l=t=>{if(e.current=t.currentTarget.value.trim(),e.current.length===0||e.current.length>32){a([]),u(!1);return}u(!0),n.current.push(!0),setTimeout(async()=>{if(n.current.pop(),n.current.length!==0||e.current.length===0||e.current.length>32)return;const h=await o(e.current);n.current.length===0&&(e.current.length===0||e.current.length>32||(a(h),u(!1)))},1e3)},f=S(t=>t.setRoute);return r.exports.useEffect(()=>{f({name:"search",path:location.pathname})},[]),x("div",{children:[s(v,{children:s(j,{type:"text",placeholder:c("user"),onInput:l})}),p?s(y,{}):s("div",{children:i.map(t=>s(U,{user:t},t.id))})]})}export{k as default};
