import{s as l,b as a,m as d,c as U,d as x,r as o,h as r,e as n,j as y,a as e}from"./index.144b30fb.js";import{U as B}from"./index.974091ac.js";import{U as F}from"./index.47e59ae2.js";import{I as b}from"./InfiniteScroll.0da5f2d0.js";import"./SingleInput.fe642a1e.js";import"./MultiInput.027897a1.js";const T=l.div`
  border-bottom: 1px solid #000000;
`,j=l(a)`
  margin-bottom: 0;
`,E=l(a)`
  margin-top: 0;
`;function L(){const i=d(),m=U(),u=x(s=>s.setRoute);o.exports.useEffect(()=>{u({name:"followings",path:m.pathname,showBackButton:!0})},[]);const f=r(s=>s.fetchUserByTag),c=r(s=>s.fetchUserFollowings),t=r(s=>s.getUserByTag(i.tag)),g=r(s=>s.getFollowings(t)),[p,w]=o.exports.useState(!1),[h,S]=o.exports.useState(!1);return o.exports.useEffect(()=>{(async()=>(i.tag&&await n(()=>f(i.tag))(),w(!0)))()},[]),o.exports.useEffect(()=>{(async()=>p||(t&&await n(()=>c(t,"newer"))(),S(!0)))()},[p]),t?y("div",{children:[p&&t?e(B,{user:t}):e(T,{children:e(a,{})}),e(b,{onTop:n(()=>c(t,"newer")),onBottom:n(()=>c(t,"older")),topSpinner:e(j,{}),bottomSpinner:e(E,{}),children:h?g.map(s=>e(F,{user:s},s.id)):e(a,{})})]}):null}export{L as default};
