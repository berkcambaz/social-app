import{l as U,b as S,c as x,r as t,g as r,d as a,j as d,a as o,k as l}from"./index.aafe005b.js";import{U as y}from"./index.688bb848.js";import{U as B}from"./index.c86f6874.js";import{I as F}from"./InfiniteScroll.9bb2ba07.js";import"./SingleInput.7cc316a0.js";import"./MultiInput.482a5251.js";function b(){const n=U(),u=S(),f=x(s=>s.setRoute);t.exports.useEffect(()=>{f({name:"followings",path:u.pathname,showBackButton:!0})},[]);const p=r(s=>s.fetchUserByTag),i=r(s=>s.fetchUserFollowings),e=r(s=>s.getUserByTag(n.tag)),m=r(s=>s.getFollowings(e)),[c,g]=t.exports.useState(!1),[w,h]=t.exports.useState(!1);return t.exports.useEffect(()=>{(async()=>(n.tag&&await a(()=>p(n.tag))(),g(!0)))()},[]),t.exports.useEffect(()=>{(async()=>c||(e&&await a(()=>i(e,"newer"))(),h(!0)))()},[c]),e?d("div",{children:[c?o(y,{user:e}):o(l,{}),o(F,{onTop:a(()=>i(e,"newer")),onBottom:a(()=>i(e,"older")),children:w?m.map(s=>o(B,{user:s},s.id)):o(l,{})})]}):null}export{b as default};
