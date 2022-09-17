import{s as p,C as _,u as j,r as u,g as k,h as R,d as W,e as G,j as c,a as e,c as N,f as X}from"./index.91ab3643.js";import{S as q,B as D}from"./SingleInput.635d5f8d.js";var H=/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,J=function(r){if(!r||r.length>254)return!1;var n=H.test(r);if(!n)return!1;var i=r.split("@");if(i[0].length>64)return!1;var g=i[1].split(".");return!g.some(function(f){return f.length>63})};const K=p.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  >* {
    margin: 0.5rem 0;
  }
`,m=p(q)`
  ${r=>r.error&&_`color: red;`}
`,M=p.div`
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
`,v=p.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  margin-top: 0.25rem;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 5px;
`,d=p.div`
  ${r=>r.error&&_`color: red;`}
`;function Y(){const{t:r}=j(),[n,i]=u.exports.useState({usertag:"",email:"",password:""}),g=k(o=>o.signup),[f,w]=u.exports.useState(!1),[s,l]=u.exports.useState({usertag:!1,email:!1,password:!1}),[t,h]=u.exports.useState({usertagLength:!0,usertagCharacters:!1,passwordLength:!0,emailValid:!0}),x=R(),S=W(),I=G(o=>o.setRoute);u.exports.useEffect(()=>{I({name:"signup",path:S.pathname,forGuests:!0})},[]);const L=async()=>{const o=n.usertag,a=n.email,V=n.password;w(!0),await X(()=>g(o,a,V))(),w(!1)},C=()=>{x("/login")},E=o=>{const a=o.currentTarget.value;i({...n,usertag:a}),h({...t,usertagLength:a.length<3||a.length>16,usertagCharacters:!/^[a-z0-9]*$/.test(a)})},z=o=>{const a=o.currentTarget.value;i({...n,email:a}),h({...t,emailValid:!J(a)})},B=o=>{const a=o.currentTarget.value;i({...n,password:a}),h({...t,passwordLength:a.length<8})},b=()=>t.usertagLength||t.usertagCharacters,y=()=>t.emailValid,A=()=>t.passwordLength,F=()=>void l({...s,usertag:!0}),P=()=>void l({...s,usertag:!1}),Z=()=>void l({...s,email:!0}),$=()=>void l({...s,email:!1}),T=()=>void l({...s,password:!0}),U=()=>void l({...s,password:!1});return c(K,{children:[c("div",{children:[e(m,{type:"text",error:b()&&!s.usertag,onInput:E,placeholder:r("usertag"),onFocus:F,onBlur:P}),s.usertag&&c(v,{children:[e(d,{error:t.usertagLength,children:r("error_usertag_length")}),e(d,{error:t.usertagCharacters,children:r("error_usertag_letters")}),e(d,{error:t.usertagCharacters,children:r("error_usertag_numbers")})]})]}),c("div",{children:[e(m,{type:"email",error:y()&&!s.email,onInput:z,placeholder:r("email"),onFocus:Z,onBlur:$}),s.email&&e(v,{children:e(d,{error:t.emailValid,children:r("error_email_valid")})})]}),c("div",{children:[e(m,{type:"password",error:A()&&!s.password,onInput:B,placeholder:r("password"),onFocus:T,onBlur:U}),s.password&&e(v,{children:e(d,{error:t.passwordLength,children:r("error_password_length")})})]}),e(D,{size:"small",onClick:L,children:r("signup")}),e(M,{onClick:C,children:r("i_already_have_an_account")}),f?e(N,{}):""]})}export{Y as default};
