import{d as _,k as g,j as v,r as p,e as U,f as h,c as i,a as y,g as r,h as c,m as d,F as f,i as F,o,_ as L}from"./index.b68e357f.js";import{c as m,L as k}from"./Loader.3ff1853c.js";import{U as B}from"./User.fd9a88a2.js";import{U as V}from"./UserSummary.7c755f4d.js";import"./date.6932e95c.js";import"./Button.aeb2ade2.js";const x=_({__name:"UserFollowingsView",setup(b){const t=g.currentRoute.value.params.tag,s=v(),e=p(null),n=m(),a=m(),l=w=>{window.scrollY<=0&&e.value!==null&&s.fetchUserFollowings(e.value.id,"newer"),window.innerHeight+window.scrollY>=document.body.offsetHeight&&e.value!==null&&s.fetchUserFollowings(e.value.id,"older")};return U(()=>{window.addEventListener("scroll",l)}),h(()=>{window.removeEventListener("scroll",l)}),(async()=>{t!==void 0&&(await n.value.wait(s.fetchUserByTag(t)),e.value=s.getUserByTag(t),e.value!==null&&a.value.wait(s.fetchUserFollowings(e.value.id,"newer",!0)))})(),(w,S)=>(o(),i(f,null,[y(B,{user:e.value,searching:r(n).status},null,8,["user","searching"]),r(a).status?(o(),c(k,{key:0,class:"loader"})):d("",!0),r(a).status?d("",!0):(o(!0),i(f,{key:1},F(r(s).getFollowings(e.value),u=>(o(),c(V,{user:u,key:u.id},null,8,["user"]))),128))],64))}});const I=L(x,[["__scopeId","data-v-e386f8bf"]]);export{I as default};
