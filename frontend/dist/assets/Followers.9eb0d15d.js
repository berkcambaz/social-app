import{s as l,b as n,l as U,c as g,d as x,r as o,h as r,e as a,j as y,a as t}from"./index.fbe81bbb.js";import{U as B}from"./index.a0e9d034.js";import{U as F}from"./index.3655e993.js";import{I as b}from"./InfiniteScroll.02a76306.js";import"./SingleInput.f833c64e.js";import"./MultiInput.28c51c79.js";const T=l.div`
  border-bottom: 1px solid #000000;
`,j=l(n)`
  margin-bottom: 0;
`,E=l(n)`
  margin-top: 0;
`;function L(){const i=U(),u=g(),f=x(e=>e.setRoute);o.exports.useEffect(()=>{f({name:"followers",path:u.pathname,showBackButton:!0})},[]);const m=r(e=>e.fetchUserByTag),c=r(e=>e.fetchUserFollowers),s=r(e=>e.getUserByTag(i.tag)),w=r(e=>e.getFollowers(s)),[p,h]=o.exports.useState(!1),[S,d]=o.exports.useState(!1);return o.exports.useEffect(()=>{(async()=>(i.tag&&await a(()=>m(i.tag))(),h(!0)))()},[]),o.exports.useEffect(()=>{(async()=>p||(s&&await a(()=>c(s,"newer"))(),d(!0)))()},[p]),s?y("div",{children:[p&&s?t(B,{user:s}):t(T,{children:t(n,{})}),t(b,{onTop:a(()=>c(s,"newer")),onBottom:a(()=>c(s,"older")),topSpinner:t(j,{}),bottomSpinner:t(E,{}),children:S?w.map(e=>t(F,{user:e},e.id)):t(n,{})})]}):null}export{L as default};
