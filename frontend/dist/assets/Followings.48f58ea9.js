import{s as l,b as a,l as d,c as U,d as x,r as o,h as r,e as n,j as y,a as e}from"./index.fbe81bbb.js";import{U as B}from"./index.a0e9d034.js";import{U as F}from"./index.3655e993.js";import{I as b}from"./InfiniteScroll.02a76306.js";import"./SingleInput.f833c64e.js";import"./MultiInput.28c51c79.js";const T=l.div`
  border-bottom: 1px solid #000000;
`,j=l(a)`
  margin-bottom: 0;
`,E=l(a)`
  margin-top: 0;
`;function L(){const i=d(),u=U(),f=x(s=>s.setRoute);o.exports.useEffect(()=>{f({name:"followings",path:u.pathname,showBackButton:!0})},[]);const m=r(s=>s.fetchUserByTag),c=r(s=>s.fetchUserFollowings),t=r(s=>s.getUserByTag(i.tag)),g=r(s=>s.getFollowings(t)),[p,w]=o.exports.useState(!1),[h,S]=o.exports.useState(!1);return o.exports.useEffect(()=>{(async()=>(i.tag&&await n(()=>m(i.tag))(),w(!0)))()},[]),o.exports.useEffect(()=>{(async()=>p||(t&&await n(()=>c(t,"newer"))(),S(!0)))()},[p]),t?y("div",{children:[p&&t?e(B,{user:t}):e(T,{children:e(a,{})}),e(b,{onTop:n(()=>c(t,"newer")),onBottom:n(()=>c(t,"older")),topSpinner:e(j,{}),bottomSpinner:e(E,{}),children:h?g.map(s=>e(F,{user:s},s.id)):e(a,{})})]}):null}export{L as default};
