import{s as c,c as a,k as w,d as x,e as B,r as o,g as f,b as m,f as r,j as y,a as t}from"./index.f642262d.js";import{I as b}from"./InfiniteScroll.ce69f945.js";import{P as T}from"./index.db56a3da.js";import{U as j}from"./index.7096014b.js";import"./Bookmark.esm.ac039aec.js";import"./MultiInput.35f90aab.js";import"./SingleInput.062eb0c9.js";const v=c.div`
  border-bottom: 1px solid #000000;
`,E=c(a)`
  margin-bottom: 0;
`,R=c(a)`
  margin-top: 0;
`;function z(){const n=w(),d=x(),h=B(s=>s.setRoute);o.exports.useEffect(()=>{h({name:"user",showBackButton:!0,path:d.pathname})},[]);const S=f(s=>s.fetchUserByTag),p=m(s=>s.fetchUserPosts),e=f(s=>s.getUserByTag(n.tag)),l=m(s=>s.getUserPosts(e)),[i,U]=o.exports.useState(!1),[g,P]=o.exports.useState(!1);o.exports.useEffect(()=>{(async()=>(n.tag&&await r(()=>S(n.tag))(),U(!0)))()},[]),o.exports.useEffect(()=>{(async()=>i||(e&&await r(()=>p(e.id,"newer"))(),P(!0)))()},[i]);const u=s=>e?p(e.id,s):Promise.resolve();return y("div",{children:[i&&e?t(j,{user:e}):t(v,{children:t(a,{})}),t(b,{onTop:r(()=>u("newer")),onBottom:r(()=>u("older")),topSpinner:t(E,{}),bottomSpinner:t(R,{}),children:g?l.map(s=>t(T,{post:s},s.id)):t(a,{})})]})}export{z as default};
