import{d as y,i as x,h as S,r as c,o as a,c as i,e as _,a as V,b as n,g as m,s as v,t as k,F as f,f as I,L as b,_ as w}from"./index.155a4c1b.js";import{U as B}from"./UserSummary.ccfcc732.js";import{c as L}from"./loader.21f57adf.js";import{I as U}from"./Input.72285916.js";import"./Button.ca889a72.js";const N={class:"search"},C={key:1},F=y({__name:"SearchView",setup($){const{t:p}=x.global,h=S(),e=c([]),t=L(),s=[],o=c(!1),l=c({limit:0,current:0,value:"",type:"single"}),g=async()=>{const r=l.value.value.trim();if(r.length===0||r.length>32){e.value=[],o.value=!1;return}s.length===0&&(t.value.status=!0,e.value=[]),s.push(!0),setTimeout(async()=>{if(s.pop(),s.length!==0)return;t.value.status=!0;const u=await h.fetchSearchUser(r);s.length===0&&(t.value.status=!1,l.value.current!==0&&(e.value=u,o.value=!0))},1e3)};return(r,u)=>(a(),i(f,null,[_("div",N,[V(U,{type:"text",text:l.value,placeholder:`${n(p)("user")}...`,onInput:u[0]||(u[0]=d=>g())},null,8,["text","placeholder"]),n(t).status?(a(),m(b,{key:0})):v("",!0),!n(t).status&&e.value.length===0&&o.value?(a(),i("div",C,k(n(p)("no_users_found")),1)):v("",!0)]),_("div",null,[(a(!0),i(f,null,I(e.value,d=>(a(),m(B,{user:d},null,8,["user"]))),256))])],64))}});const z=w(F,[["__scopeId","data-v-d7208b14"]]);export{z as default};