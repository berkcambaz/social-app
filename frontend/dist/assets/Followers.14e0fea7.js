import{s as l,c as n,k as U,d as g,e as x,r as o,g as r,f as a,j as y,a as t}from"./index.248dc6d2.js";import{U as B}from"./index.a09d502f.js";import{U as F}from"./index.8efcfca7.js";import{I as T}from"./InfiniteScroll.9f564b7c.js";import"./MultiInput.801fe9b0.js";import"./SingleInput.19c464b9.js";const b=l.div`
  border-bottom: 1px solid #000000;
`,j=l(n)`
  margin-bottom: 0;
`,E=l(n)`
  margin-top: 0;
`;function L(){const i=U(),f=g(),u=x(e=>e.setRoute);o.exports.useEffect(()=>{u({name:"followers",path:f.pathname,showBackButton:!0})},[]);const m=r(e=>e.fetchUserByTag),c=r(e=>e.fetchUserFollowers),s=r(e=>e.getUserByTag(i.tag)),w=r(e=>e.getFollowers(s)),[p,h]=o.exports.useState(!1),[S,d]=o.exports.useState(!1);return o.exports.useEffect(()=>{(async()=>(i.tag&&await a(()=>m(i.tag))(),h(!0)))()},[]),o.exports.useEffect(()=>{(async()=>p||(s&&await a(()=>c(s,"newer"))(),d(!0)))()},[p]),s?y("div",{children:[p&&s?t(B,{user:s}):t(b,{children:t(n,{})}),t(T,{onTop:a(()=>c(s,"newer")),onBottom:a(()=>c(s,"older")),topSpinner:t(j,{}),bottomSpinner:t(E,{}),children:S?w.map(e=>t(F,{user:e},e.id)):t(n,{})})]}):null}export{L as default};