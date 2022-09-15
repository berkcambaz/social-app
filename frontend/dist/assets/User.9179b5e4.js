import{s as c,b as a,l as w,c as x,d as B,r as o,h as m,e as r,j as y,a as t}from"./index.fbe81bbb.js";import{I as b}from"./InfiniteScroll.02a76306.js";import{u as f,P as T}from"./index.26a4c1f4.js";import{U as j}from"./index.a0e9d034.js";import"./Bookmark.esm.17e70c66.js";import"./SingleInput.f833c64e.js";import"./MultiInput.28c51c79.js";const v=c.div`
  border-bottom: 1px solid #000000;
`,E=c(a)`
  margin-bottom: 0;
`,R=c(a)`
  margin-top: 0;
`;function z(){const n=w(),h=x(),d=B(s=>s.setRoute);o.exports.useEffect(()=>{d({name:"user",showBackButton:!0,path:h.pathname})},[]);const l=m(s=>s.fetchUserByTag),p=f(s=>s.fetchUserPosts),e=m(s=>s.getUserByTag(n.tag)),S=f(s=>s.getUserPosts(e)),[i,U]=o.exports.useState(!1),[P,g]=o.exports.useState(!1);o.exports.useEffect(()=>{(async()=>(n.tag&&await r(()=>l(n.tag))(),U(!0)))()},[]),o.exports.useEffect(()=>{(async()=>i||(e&&await r(()=>p(e.id,"newer"))(),g(!0)))()},[i]);const u=s=>e?p(e.id,s):Promise.resolve();return y("div",{children:[i&&e?t(j,{user:e}):t(v,{children:t(a,{})}),t(b,{onTop:r(()=>u("newer")),onBottom:r(()=>u("older")),topSpinner:t(E,{}),bottomSpinner:t(R,{}),children:P?S.map(s=>t(T,{post:s},s.id)):t(a,{})})]})}export{z as default};
