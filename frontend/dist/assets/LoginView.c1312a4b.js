import{d as v,i as x,h as f,r as u,o as i,c as w,a as o,b as e,w as y,e as V,t as c,g as h,s as k,z as B,G as L,L as C,_ as b}from"./index.155a4c1b.js";import{c as N}from"./loader.21f57adf.js";import{I as p}from"./Input.72285916.js";import{B as $}from"./Button.ca889a72.js";const I={class:"signup"},T=v({__name:"LoginView",setup(z){const{t:s}=x.global,d=L(),_=f(),n=u({limit:16,current:0,value:"",type:"single"}),r=u({limit:9999,current:0,value:"",type:"single"}),a=N(),g=()=>{const l=n.value.value,t=r.value.value;a.value.wait(_.login(l,t))};return(l,t)=>(i(),w("div",I,[o(p,{type:"text",text:n.value,placeholder:`${e(s)("usertag")}...`},null,8,["text","placeholder"]),o(p,{type:"password",text:r.value,placeholder:`${e(s)("password")}...`},null,8,["text","placeholder"]),o($,{onClick:t[0]||(t[0]=m=>g()),disabled:e(a).status},{default:y(()=>[B(c(e(s)("login")),1)]),_:1},8,["disabled"]),V("span",{class:"text",onClick:t[1]||(t[1]=m=>e(d).push("/signup"))},c(e(s)("i_dont_have_an_account")),1),e(a).status?(i(),h(C,{key:0})):k("",!0)]))}});const S=b(T,[["__scopeId","data-v-aa1e6251"]]);export{S as default};