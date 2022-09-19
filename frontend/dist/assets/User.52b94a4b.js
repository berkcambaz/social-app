import{s as c,c as a,k as w,d as x,e as B,r as o,g as f,b as m,f as r,j as y,a as t}from"./index.248dc6d2.js";import{I as b}from"./InfiniteScroll.9f564b7c.js";import{P as T}from"./index.b0cc3a92.js";import{U as j}from"./index.a09d502f.js";import"./Bookmark.esm.a61d870e.js";import"./MultiInput.801fe9b0.js";import"./SingleInput.19c464b9.js";const v=c.div`
  border-bottom: 1px solid #000000;
`,E=c(a)`
  margin-bottom: 0;
`,R=c(a)`
  margin-top: 0;
`;function z(){const n=w(),d=x(),h=B(s=>s.setRoute);o.exports.useEffect(()=>{h({name:"user",showBackButton:!0,path:d.pathname})},[]);const S=f(s=>s.fetchUserByTag),p=m(s=>s.fetchUserPosts),e=f(s=>s.getUserByTag(n.tag)),l=m(s=>s.getUserPosts(e)),[i,U]=o.exports.useState(!1),[g,P]=o.exports.useState(!1);o.exports.useEffect(()=>{(async()=>(n.tag&&await r(()=>S(n.tag))(),U(!0)))()},[]),o.exports.useEffect(()=>{(async()=>i||(e&&await r(()=>p(e.id,"newer"))(),P(!0)))()},[i]);const u=s=>e?p(e.id,s):Promise.resolve();return y("div",{children:[i&&e?t(j,{user:e}):t(v,{children:t(a,{})}),t(b,{onTop:r(()=>u("newer")),onBottom:r(()=>u("older")),topSpinner:t(E,{}),bottomSpinner:t(R,{}),children:g?l.map(s=>t(T,{post:s},s.id)):t(a,{})})]})}export{z as default};
