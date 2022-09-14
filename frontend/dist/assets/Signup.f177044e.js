import{s as u,u as y,r as o,g as I,h as T,b as _,c as b,j,a as t,k,d as P}from"./index.aafe005b.js";import{S as r,B}from"./SingleInput.7cc316a0.js";const C=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  >* {
    margin: 0.5rem 0;
  }
`,E=u.div`
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
`;function U(){const{t:a}=y(),[e,n]=o.exports.useState({usertag:"",email:"",password:""}),p=I(s=>s.signup),[c,i]=o.exports.useState(!1),l=T(),g=_(),d=b(s=>s.setRoute);o.exports.useEffect(()=>{d({name:"signup",path:g.pathname,forGuests:!0})},[]);const m=async()=>{const s=e.usertag,v=e.email,w=e.password;i(!0),await P(()=>p(s,v,w))(),i(!1)},f=()=>{l("/login")},h=s=>{n({...e,usertag:s.currentTarget.value})},x=s=>{n({...e,email:s.currentTarget.value})},S=s=>{n({...e,password:s.currentTarget.value})};return j(C,{children:[t(r,{type:"text",onInput:h,placeholder:a("usertag")}),t(r,{type:"email",onInput:x,placeholder:a("email")}),t(r,{type:"password",onInput:S,placeholder:a("password")}),t(B,{size:"small",onClick:m,children:a("signup")}),t(E,{onClick:f,children:a("i_already_have_an_account")}),c?t(k,{}):""]})}export{U as default};
