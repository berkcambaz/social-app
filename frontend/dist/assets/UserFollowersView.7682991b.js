import{d as _,k as v,j as p,r as U,o as g,g as h,c as u,e as y,f as t,h as c,l as i,F as d,i as F,a as s,_ as L}from"./index.ec8aeeb9.js";import{c as f,L as k}from"./Loader.07f4b009.js";import{U as B}from"./User.bb504939.js";import{U as V}from"./UserSummary.b4413fa5.js";import"./date.6932e95c.js";const x=_({__name:"UserFollowersView",setup(E){const o=v.currentRoute.value.params.tag,r=p(),e=U(null),m=f(),a=f(),l=w=>{window.scrollY<=0&&e.value!==null&&r.fetchUserFollowers(e.value.id,"newer"),window.innerHeight+window.scrollY>=document.body.offsetHeight&&e.value!==null&&r.fetchUserFollowers(e.value.id,"older")};return g(()=>{window.addEventListener("scroll",l)}),h(()=>{window.removeEventListener("scroll",l)}),(async()=>{o!==void 0&&(await m.value.wait(r.fetchUserByTag(o)),e.value=r.getUserByTag(o),e.value!==null&&a.value.wait(r.fetchUserFollowers(e.value.id,"newer",!0)))})(),(w,C)=>(s(),u(d,null,[y(B,{user:e.value},null,8,["user"]),t(a).status?(s(),c(k,{key:0,class:"loader"})):i("",!0),t(a).status?i("",!0):(s(!0),u(d,{key:1},F(t(r).getFollowers(e.value),n=>(s(),c(V,{user:n,key:n.id},null,8,["user"]))),128))],64))}});const j=L(x,[["__scopeId","data-v-0ca6ad9c"]]);export{j as default};
