import{s as n,b as a,d as p,r as c,a as t,F as u,e as s}from"./index.fbe81bbb.js";import{u as r,P as k}from"./index.26a4c1f4.js";import{I as d}from"./InfiniteScroll.02a76306.js";import"./Bookmark.esm.17e70c66.js";const f=n(a)`
  margin-bottom: 0;
`,B=n(a)`
  margin-top: 0;
`;function b(){const e=r(o=>o.fetchBookmarkedPosts),m=r(o=>o.getBookmarkedPosts()),i=p(o=>o.setRoute);return c.exports.useEffect(()=>{i({name:"bookmarks",showBackButton:!0})},[]),t(u,{children:t(d,{onInit:s(()=>e("newer",!0)),onTop:s(()=>e("newer")),onBottom:s(()=>e("older")),topSpinner:t(f,{}),bottomSpinner:t(B,{}),children:m.map(o=>t(k,{post:o},o.id))})})}export{b as default};
