import{r as p,j as a,S as m,a as o,s as i,u as f,b as g,c as x,F as v,d as l}from"./index.aafe005b.js";import{u as d,P as w}from"./index.a3403570.js";import{M as P}from"./MultiInput.482a5251.js";import{I}from"./InfiniteScroll.9bb2ba07.js";import"./Bookmark.esm.65356c4e.js";var u=p.exports.forwardRef(function(n,s){var t={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return a(m,{iconAttrs:t,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...n,ref:s,children:[o("rect",{width:24,height:24,fill:"none"}),o("path",{d:"M3 5.51v3.71c0 .46.31.86.76.97L11 12l-7.24 1.81c-.45.11-.76.51-.76.97v3.71c0 .72.73 1.2 1.39.92l15.42-6.49c.82-.34.82-1.5 0-1.84L4.39 4.58C3.73 4.31 3 4.79 3 5.51z"})]})});u.displayName="Send";const S=i.div`
  padding-top: 1rem;
`,F=i(P)`
  width: 100%;
`,T=i.div`
  display: flex;
  align-items: center;
`,y=i.button`
  cursor: pointer;
  width: 32px;
  height: 32px;
`;function B(){const{t:n}=f(),s=d(r=>r.postPost),[t,c]=p.exports.useState({limit:256,length:0,value:""}),e=r=>{c({...t,length:r.currentTarget.value.length,value:r.currentTarget.value})},h=()=>{t.length>t.limit||s(t.value)};return a(S,{children:[o(F,{onInput:e,placeholder:n("post_create_text")}),a(T,{children:[o(y,{as:u,onClick:h}),o("span",{children:`${t.length}/${t.limit}`})]})]})}function R(){const n=d(e=>e.fetchFeedPosts),s=d(e=>e.getFeedPosts()),t=g(),c=x(e=>e.setRoute);return p.exports.useEffect(()=>{c({name:"home",path:t.pathname})},[]),a(v,{children:[o(B,{}),o(I,{onInit:l(()=>n("newer",!0)),onTop:l(()=>n("newer")),onBottom:l(()=>n("older")),children:o("div",{children:s.map(e=>o(w,{post:e},e.id))})})]})}export{R as default};
