import{s as l,b as n,m as U,c as g,d as x,r as o,h as r,e as a,j as y,a as t}from"./index.144b30fb.js";import{U as B}from"./index.974091ac.js";import{U as F}from"./index.47e59ae2.js";import{I as b}from"./InfiniteScroll.0da5f2d0.js";import"./SingleInput.fe642a1e.js";import"./MultiInput.027897a1.js";const T=l.div`
  border-bottom: 1px solid #000000;
`,j=l(n)`
  margin-bottom: 0;
`,E=l(n)`
  margin-top: 0;
`;function L(){const i=U(),m=g(),u=x(e=>e.setRoute);o.exports.useEffect(()=>{u({name:"followers",path:m.pathname,showBackButton:!0})},[]);const f=r(e=>e.fetchUserByTag),c=r(e=>e.fetchUserFollowers),s=r(e=>e.getUserByTag(i.tag)),w=r(e=>e.getFollowers(s)),[p,h]=o.exports.useState(!1),[S,d]=o.exports.useState(!1);return o.exports.useEffect(()=>{(async()=>(i.tag&&await a(()=>f(i.tag))(),h(!0)))()},[]),o.exports.useEffect(()=>{(async()=>p||(s&&await a(()=>c(s,"newer"))(),d(!0)))()},[p]),s?y("div",{children:[p&&s?t(B,{user:s}):t(T,{children:t(n,{})}),t(b,{onTop:a(()=>c(s,"newer")),onBottom:a(()=>c(s,"older")),topSpinner:t(j,{}),bottomSpinner:t(E,{}),children:S?w.map(e=>t(F,{user:e},e.id)):t(n,{})})]}):null}export{L as default};
