import{s as l,c as a,k as d,d as U,e as x,r as o,g as r,f as n,j as y,a as e}from"./index.248dc6d2.js";import{U as B}from"./index.a09d502f.js";import{U as F}from"./index.8efcfca7.js";import{I as T}from"./InfiniteScroll.9f564b7c.js";import"./MultiInput.801fe9b0.js";import"./SingleInput.19c464b9.js";const b=l.div`
  border-bottom: 1px solid #000000;
`,j=l(a)`
  margin-bottom: 0;
`,E=l(a)`
  margin-top: 0;
`;function L(){const i=d(),f=U(),u=x(s=>s.setRoute);o.exports.useEffect(()=>{u({name:"followings",path:f.pathname,showBackButton:!0})},[]);const m=r(s=>s.fetchUserByTag),c=r(s=>s.fetchUserFollowings),t=r(s=>s.getUserByTag(i.tag)),g=r(s=>s.getFollowings(t)),[p,w]=o.exports.useState(!1),[h,S]=o.exports.useState(!1);return o.exports.useEffect(()=>{(async()=>(i.tag&&await n(()=>m(i.tag))(),w(!0)))()},[]),o.exports.useEffect(()=>{(async()=>p||(t&&await n(()=>c(t,"newer"))(),S(!0)))()},[p]),t?y("div",{children:[p&&t?e(B,{user:t}):e(b,{children:e(a,{})}),e(T,{onTop:n(()=>c(t,"newer")),onBottom:n(()=>c(t,"older")),topSpinner:e(j,{}),bottomSpinner:e(E,{}),children:h?g.map(s=>e(F,{user:s},s.id)):e(a,{})})]}):null}export{L as default};