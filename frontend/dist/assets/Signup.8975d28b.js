import{s as p,C as _,u as V,r as u,h as j,k as R,c as W,d as G,j as c,a as e,b as N,e as X}from"./index.144b30fb.js";import{S as q,B as D}from"./SingleInput.fe642a1e.js";var H=/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,J=function(r){if(!r||r.length>254)return!1;var n=H.test(r);if(!n)return!1;var i=r.split("@");if(i[0].length>64)return!1;var g=i[1].split(".");return!g.some(function(h){return h.length>63})};const K=p.div`
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
`;function Y(){const{t:r}=V(),[n,i]=u.exports.useState({usertag:"",email:"",password:""}),g=j(o=>o.signup),[h,w]=u.exports.useState(!1),[s,l]=u.exports.useState({usertag:!1,email:!1,password:!1}),[t,f]=u.exports.useState({usertagLength:!0,usertagCharacters:!1,passwordLength:!0,emailValid:!0}),x=R(),S=W(),I=G(o=>o.setRoute);u.exports.useEffect(()=>{I({name:"signup",path:S.pathname,forGuests:!0})},[]);const L=async()=>{const o=n.usertag,a=n.email,U=n.password;w(!0),await X(()=>g(o,a,U))(),w(!1)},C=()=>{x("/login")},E=o=>{const a=o.currentTarget.value;i({...n,usertag:a}),f({...t,usertagLength:a.length<3||a.length>16,usertagCharacters:!/^[a-z0-9]*$/.test(a)})},b=o=>{const a=o.currentTarget.value;i({...n,email:a}),f({...t,emailValid:!J(a)})},z=o=>{const a=o.currentTarget.value;i({...n,password:a}),f({...t,passwordLength:a.length<8})},B=()=>t.usertagLength||t.usertagCharacters,y=()=>t.emailValid,A=()=>t.passwordLength,F=()=>void l({...s,usertag:!0}),P=()=>void l({...s,usertag:!1}),Z=()=>void l({...s,email:!0}),$=()=>void l({...s,email:!1}),T=()=>void l({...s,password:!0}),k=()=>void l({...s,password:!1});return c(K,{children:[c("div",{children:[e(m,{type:"text",error:B()&&!s.usertag,onInput:E,placeholder:r("usertag"),onFocus:F,onBlur:P}),s.usertag&&c(v,{children:[e(d,{error:t.usertagLength,children:r("error_usertag_length")}),e(d,{error:t.usertagCharacters,children:r("error_usertag_letters")}),e(d,{error:t.usertagCharacters,children:r("error_usertag_numbers")})]})]}),c("div",{children:[e(m,{type:"email",error:y()&&!s.email,onInput:b,placeholder:r("email"),onFocus:Z,onBlur:$}),s.email&&e(v,{children:e(d,{error:t.emailValid,children:r("error_email_valid")})})]}),c("div",{children:[e(m,{type:"password",error:A()&&!s.password,onInput:z,placeholder:r("password"),onFocus:T,onBlur:k}),s.password&&e(v,{children:e(d,{error:t.passwordLength,children:r("error_password_length")})})]}),e(D,{size:"small",onClick:L,children:r("signup")}),e(M,{onClick:C,children:r("i_already_have_an_account")}),h?e(N,{}):""]})}export{Y as default};
