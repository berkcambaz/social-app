import{d,k as p,h as w,r as v,o as s,c as n,a as u,b as l,w as U,F as c,f as g,g as h}from"./index.d473d418.js";import{c as _}from"./loader.17ebd677.js";import{U as y}from"./User.5b880796.js";import{U as F}from"./UserSummary.d37fde6e.js";import{L as B}from"./LoaderContainer.1813c997.js";import"./Input.a227dd64.js";import"./Button.21f0284b.js";const R=d({__name:"UserFollowersView",setup(k){const a=p.currentRoute.value.params.tag,r=w(),e=v(null),t=_(),i=async()=>{a!==void 0&&(await t.value.wait(r.fetchUserByTag(a)),e.value=r.getUserByTag(a),e.value!==null&&await r.fetchUserFollowers(e.value.id,"newer",!0))},m=async()=>{e.value!==null&&await r.fetchUserFollowers(e.value.id,"newer")},f=async()=>{e.value!==null&&await r.fetchUserFollowers(e.value.id,"older")};return(L,x)=>(s(),n(c,null,[u(y,{user:e.value,searching:l(t).status},null,8,["user","searching"]),u(B,{onInit:i,onTop:m,onBottom:f},{default:U(()=>[(s(!0),n(c,null,g(l(r).getFollowers(e.value),o=>(s(),h(F,{user:o,key:o.id},null,8,["user"]))),128))]),_:1})],64))}});export{R as default};