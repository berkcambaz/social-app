import{d as _,u as f,r as c,o as v,a as i,c as p,b as o,e as a,S as h,t as g,f as u,_ as x,F as b}from"./index.f0fafa43.js";import{_ as y}from"./PostLister.vue_vue_type_script_setup_true_lang.cb463dac.js";const C={class:"post-create"},I={class:"bottom"},P=_({__name:"PostCreate",setup(d){const r=f(),s=c(null),t=c({limit:256,current:0}).value,n=()=>{const e=s.value;!e||(e.value.length>t.limit&&(e.value=e.value.substring(0,t.limit)),t.current=e.value.length,e.style.height="0",e.style.height=e.scrollHeight+"px")},m=()=>{const e=s.value;!e||(r.post(e.value),e.value="",n())};return v(()=>{n()}),(e,l)=>(i(),p("div",C,[o("textarea",{class:"input",ref_key:"contentInput",ref:s,placeholder:"Write your thoughts...",onInput:n},null,544),o("div",I,[a(h,{class:"icon",onClick:l[0]||(l[0]=k=>m())}),o("span",null,g(`${u(t).current}/${u(t).limit}`),1)])]))}});const $=x(P,[["__scopeId","data-v-b3fd1d1b"]]),V=_({__name:"HomeView",setup(d){return(r,s)=>(i(),p(b,null,[a($),a(y,{user:null})],64))}});export{V as default};
