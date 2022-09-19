import{r as c,j as a,S as g,a as e,s as r,u as v,b as u,c as d,d as x,e as w,F as S,f as p}from"./index.f642262d.js";import{M as P}from"./MultiInput.35f90aab.js";import{P as I}from"./index.db56a3da.js";import{I as b}from"./InfiniteScroll.ce69f945.js";import"./Bookmark.esm.ac039aec.js";var m=c.exports.forwardRef(function(o,s){var n={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return a(g,{iconAttrs:n,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...o,ref:s,children:[e("rect",{width:24,height:24,fill:"none"}),e("path",{d:"M3 5.51v3.71c0 .46.31.86.76.97L11 12l-7.24 1.81c-.45.11-.76.51-.76.97v3.71c0 .72.73 1.2 1.39.92l15.42-6.49c.82-.34.82-1.5 0-1.84L4.39 4.58C3.73 4.31 3 4.79 3 5.51z"})]})});m.displayName="Send";const y=r.div`
  padding-top: 1rem;
`,B=r(P)`
  width: 100%;
`,F=r.div`
  display: flex;
  align-items: center;
`,R=r.button`
  cursor: pointer;
  width: 32px;
  height: 32px;
`;function C(){const{t:o}=v(),s=u(i=>i.postPost),[n,l]=c.exports.useState({limit:256,length:0,value:""}),t=c.exports.useRef(null),h=()=>{!t.current||l({...n,length:t.current.value.length,value:t.current.value})},f=async()=>{const i=n.value.trim();i.length>n.limit||(t.current&&(t.current.value="",t.current.dispatchEvent(new Event("input",{bubbles:!0}))),await s(i))};return a(y,{children:[e(B,{onInput:h,placeholder:o("post_create_text"),ref:t}),a(F,{children:[e(R,{as:m,onClick:f}),e("span",{children:`${n.length}/${n.limit}`})]})]})}const T=r(d)`
  margin-bottom: 0;
`,j=r(d)`
  margin-top: 0;
`;function W(){const o=u(t=>t.fetchFeedPosts),s=u(t=>t.getFeedPosts()),n=x(),l=w(t=>t.setRoute);return c.exports.useEffect(()=>{l({name:"home",path:n.pathname})},[]),a(S,{children:[e(C,{}),e(b,{onInit:p(()=>o("newer",!0)),onTop:p(()=>o("newer")),onBottom:p(()=>o("older")),topSpinner:e(T,{}),bottomSpinner:e(j,{}),children:e("div",{children:s.map(t=>e(I,{post:t},t.id))})})]})}export{W as default};
