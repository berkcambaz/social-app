import{s as u,u as v,r as n,g as w,d as y,h as I,e as L,j as T,a as t,B as _,c as j,f as P}from"./index.248dc6d2.js";import{S as i}from"./SingleInput.19c464b9.js";const b=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  >* {
    margin: 0.5rem 0;
  }
`,k=u.div`
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
`;function R(){const{t:e}=v(),[o,a]=n.exports.useState({usertag:"",password:""}),c=w(s=>s.login),[p,r]=n.exports.useState(!1),l=y(),g=I(),d=L(s=>s.setRoute);n.exports.useEffect(()=>{d({name:"login",path:l.pathname,forGuests:!0})},[]);const f=async()=>{const s=o.usertag,S=o.password;r(!0),await P(()=>c(s,S))(),r(!1)},m=()=>{g("/signup")},x=s=>{a({...o,usertag:s.currentTarget.value})},h=s=>{a({...o,password:s.currentTarget.value})};return T(b,{children:[t(i,{type:"text",onInput:x,placeholder:e("usertag")}),t(i,{type:"password",onInput:h,placeholder:e("password")}),t(_,{size:"small",onClick:f,children:e("login")}),t(k,{onClick:m,children:e("i_dont_have_an_account")}),p?t(j,{}):""]})}export{R as default};
