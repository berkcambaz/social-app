import{d as _,j as f,r as u,c as v,b as s,f as n,i as g,l as m,a as l,p as w,_ as k}from"./index.e12cdffc.js";import{c as b,L as y}from"./Loader.01b90a30.js";const x={class:"signup"},L=["disabled"],I=_({__name:"LoginView",setup(V){const p=w(),c=f(),t=u(),a=u(),o=b(),d=()=>{if(!t.value||!a.value)return;const r=t.value.value,e=a.value.value;o.value.wait(c.login(r,e))};return(r,e)=>(l(),v("div",x,[s("input",{type:"text",class:"input",ref_key:"usertagInput",ref:t,placeholder:"usertag..."},null,512),s("input",{type:"password",class:"input",ref_key:"passwordInput",ref:a,placeholder:"password..."},null,512),s("button",{class:"button",onClick:e[0]||(e[0]=i=>d()),disabled:n(o).status},"login",8,L),s("span",{class:"text",onClick:e[1]||(e[1]=i=>n(p).push("/signup"))},"i don't have an account"),n(o).status?(l(),g(y,{key:0})):m("",!0)]))}});const h=k(I,[["__scopeId","data-v-19d3bd00"]]);export{h as default};
