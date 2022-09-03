import{d as U,i as R,h as q,r as n,o as p,c as m,e as o,a as h,b as r,n as l,t as u,s as w,w as D,g as G,x as j,G as H,L as J,_ as K}from"./index.d473d418.js";import{c as M}from"./loader.17ebd677.js";import{I}from"./Input.a227dd64.js";import{B as O}from"./Button.21f0284b.js";var Q=/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,W=function(c){if(!c||c.length>254)return!1;var t=Q.test(c);if(!t)return!1;var v=c.split("@");if(v[0].length>64)return!1;var x=v[1].split(".");return!x.some(function(d){return d.length>63})};const X={class:"signup"},Y={key:0,class:"info"},ee={key:0,class:"info"},se={key:0,class:"info"},te=U({__name:"SignupView",setup(c){const{t}=R.global,v=H(),x=q(),d=n({limit:0,current:0,value:"",type:"single"}),y=n({limit:0,current:0,value:"",type:"single"}),$=n({limit:0,current:0,value:"",type:"single"}),B=M(),g=n(!1),_=n(!1),f=n(!1),e=n({usertagLength:!0,usertagCharacters:!1,passwordLength:!0,emailValid:!0}),L=()=>{const s=d.value.value,a=y.value.value,i=$.value.value;B.value.wait(x.signup(s,a,i))},C=()=>{const s=v.currentRoute.value.query.to;v.push(`/login${s?`?to=${s}`:""}`)},V=()=>e.value.usertagCharacters||e.value.usertagLength,k=()=>e.value.emailValid,z=()=>e.value.passwordLength,E=()=>{const s=d.value.value;e.value.usertagLength=s.length<3||s.length>16,e.value.usertagCharacters=!/^[a-z0-9]*$/.test(s)},A=()=>{const s=y.value.value;e.value.emailValid=!W(s)},F=()=>{const s=$.value.value;e.value.passwordLength=s.length<8},Z=()=>{g.value=!0},b=()=>{g.value=!1},N=()=>{_.value=!0},P=()=>{_.value=!1},S=()=>{f.value=!0},T=()=>{f.value=!1};return(s,a)=>(p(),m("div",X,[o("div",null,[h(I,{type:"text",text:d.value,placeholder:`${r(t)("usertag")}...`,onFocus:Z,onBlur:b,class:l({error:V()&&!g.value}),onInput:a[0]||(a[0]=i=>E())},null,8,["text","placeholder","class"]),g.value?(p(),m("div",Y,[o("div",{class:l({error:e.value.usertagLength})},u(r(t)("error_usertag_length")),3),o("div",{class:l({error:e.value.usertagCharacters})},u(r(t)("error_usertag_letters")),3),o("div",{class:l({error:e.value.usertagCharacters})},u(r(t)("error_usertag_numbers")),3)])):w("",!0)]),o("div",null,[h(I,{type:"email",text:y.value,placeholder:`${r(t)("email")}...`,onFocus:N,onBlur:P,class:l({error:k()&&!_.value}),onInput:a[1]||(a[1]=i=>A())},null,8,["text","placeholder","class"]),_.value?(p(),m("div",ee,[o("div",{class:l({error:e.value.emailValid})},u(r(t)("error_email_valid")),3)])):w("",!0)]),o("div",null,[h(I,{type:"password",text:$.value,placeholder:`${r(t)("password")}...`,onFocus:S,onBlur:T,class:l({error:z()&&!f.value}),onInput:a[2]||(a[2]=i=>F())},null,8,["text","placeholder","class"]),f.value?(p(),m("div",se,[o("div",{class:l({error:e.value.passwordLength})},u(r(t)("error_password_length")),3)])):w("",!0)]),h(O,{onClick:a[3]||(a[3]=i=>L()),disabled:r(B).status},{default:D(()=>[j(u(r(t)("signup")),1)]),_:1},8,["disabled"]),o("span",{class:"text",onClick:a[4]||(a[4]=i=>C())},u(r(t)("i_already_have_an_account")),1),r(B).status?(p(),G(J,{key:0})):w("",!0)]))}});const ne=K(te,[["__scopeId","data-v-ded16464"]]);export{ne as default};