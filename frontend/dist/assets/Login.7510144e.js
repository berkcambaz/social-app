import{s as u,u as v,r as n,h as w,c as y,k as I,d as L,j as T,a as t,b as _,e as b}from"./index.144b30fb.js";import{S as i,B as j}from"./SingleInput.fe642a1e.js";const k=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  >* {
    margin: 0.5rem 0;
  }
`,P=u.div`
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
`;function R(){const{t:e}=v(),[o,a]=n.exports.useState({usertag:"",password:""}),c=w(s=>s.login),[p,r]=n.exports.useState(!1),l=y(),g=I(),d=L(s=>s.setRoute);n.exports.useEffect(()=>{d({name:"login",path:l.pathname,forGuests:!0})},[]);const m=async()=>{const s=o.usertag,S=o.password;r(!0),await b(()=>c(s,S))(),r(!1)},f=()=>{g("/signup")},x=s=>{a({...o,usertag:s.currentTarget.value})},h=s=>{a({...o,password:s.currentTarget.value})};return T(k,{children:[t(i,{type:"text",onInput:x,placeholder:e("usertag")}),t(i,{type:"password",onInput:h,placeholder:e("password")}),t(j,{size:"small",onClick:m,children:e("login")}),t(P,{onClick:f,children:e("i_dont_have_an_account")}),p?t(_,{}):""]})}export{R as default};
