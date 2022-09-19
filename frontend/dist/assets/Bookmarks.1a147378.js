import{s as n,c as a,b as r,e as p,r as c,a as t,F as u,f as s}from"./index.f642262d.js";import{P as f}from"./index.db56a3da.js";import{I as k}from"./InfiniteScroll.ce69f945.js";import"./Bookmark.esm.ac039aec.js";const d=n(a)`
  margin-bottom: 0;
`,B=n(a)`
  margin-top: 0;
`;function b(){const e=r(o=>o.fetchBookmarkedPosts),m=r(o=>o.getBookmarkedPosts()),i=p(o=>o.setRoute);return c.exports.useEffect(()=>{i({name:"bookmarks",showBackButton:!0})},[]),t(u,{children:t(k,{onInit:s(()=>e("newer",!0)),onTop:s(()=>e("newer")),onBottom:s(()=>e("older")),topSpinner:t(d,{}),bottomSpinner:t(B,{}),children:m.map(o=>t(f,{post:o},o.id))})})}export{b as default};
