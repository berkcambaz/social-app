import{d as v,r as o,e as d,c,t as f,o as i,_ as r}from"./index.b68e357f.js";const m=["value"],y=v({__name:"Input",props:{text:null},setup(l){const{text:e}=l,u=o(null),t=o(null),s=()=>{let a="";if(e.type==="single"&&u.value)a=u.value.value;else if(e.type==="multi"&&t.value)a=t.value.value;else return;if(e.current=a.length,e.value=a,e.type==="multi"&&t.value){const n=t.value;n.style.height="0",n.style.height=n.scrollHeight+"px"}},_=()=>(t.value&&(t.value.value=e.value),s(),e.value);return d(()=>{s()}),(a,n)=>l.text.type==="single"?(i(),c("input",{key:0,ref_key:"singleInput",ref:u,onInput:n[0]||(n[0]=p=>s()),class:"input-single",value:l.text.value},null,40,m)):(i(),c("textarea",{key:1,ref_key:"multiInput",ref:t,onInput:n[1]||(n[1]=p=>s()),class:"input-multi"},f(_()),545))}});const k=r(y,[["__scopeId","data-v-9a1c0d40"]]);function L(){return o({status:!1,wait:async function(e){this.status=!0;const u=new Promise(s=>{setTimeout(s,500)}),[t]=await Promise.all([e,u]);return this.status=!1,t}})}const g={},x={class:"loader"};function I(l,e){return i(),c("div",x)}const $=r(g,[["render",I],["__scopeId","data-v-f21cc314"]]);export{k as I,$ as L,L as c};
