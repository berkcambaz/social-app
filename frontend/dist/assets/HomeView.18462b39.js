import{d as _,u as f,r as l,o as v,a as i,c as p,b as o,e as a,S as h,t as g,f as u,_ as x,F as y}from"./index.2b49b488.js";import{_ as C}from"./PostLister.vue_vue_type_script_setup_true_lang.58e85211.js";const I={class:"post-create"},P={class:"bottom"},$=_({__name:"PostCreate",setup(m){const r=f(),t=l(null),s=l({limit:256,current:0}).value,n=()=>{const e=t.value;!e||(s.current=e.value.length,e.style.height="0",e.style.height=e.scrollHeight+"px")},d=()=>{const e=t.value;!e||e.value.length>s.limit||(r.post(e.value),e.value="",n())};return v(()=>{n()}),(e,c)=>(i(),p("div",I,[o("textarea",{class:"input",ref_key:"contentInput",ref:t,placeholder:"Write your thoughts...",onInput:n},null,544),o("div",P,[a(h,{class:"icon",onClick:c[0]||(c[0]=B=>d())}),o("span",null,g(`${u(s).current}/${u(s).limit}`),1)])]))}});const k=x($,[["__scopeId","data-v-a39c4d42"]]),b=_({__name:"HomeView",setup(m){return(r,t)=>(i(),p(y,null,[a(k),a(C,{user:null})],64))}});export{b as default};
