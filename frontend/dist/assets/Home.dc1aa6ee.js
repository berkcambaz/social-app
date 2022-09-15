import{r as a,j as c,S as g,a as e,s as r,u as x,b as m,c as v,d as S,F as w,e as p}from"./index.fbe81bbb.js";import{u,P}from"./index.26a4c1f4.js";import{M as I}from"./MultiInput.28c51c79.js";import{I as y}from"./InfiniteScroll.02a76306.js";import"./Bookmark.esm.17e70c66.js";var h=a.exports.forwardRef(function(o,s){var n={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return c(g,{iconAttrs:n,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...o,ref:s,children:[e("rect",{width:24,height:24,fill:"none"}),e("path",{d:"M3 5.51v3.71c0 .46.31.86.76.97L11 12l-7.24 1.81c-.45.11-.76.51-.76.97v3.71c0 .72.73 1.2 1.39.92l15.42-6.49c.82-.34.82-1.5 0-1.84L4.39 4.58C3.73 4.31 3 4.79 3 5.51z"})]})});h.displayName="Send";const B=r.div`
  padding-top: 1rem;
`,F=r(I)`
  width: 100%;
`,R=r.div`
  display: flex;
  align-items: center;
`,b=r.button`
  cursor: pointer;
  width: 32px;
  height: 32px;
`;function C(){const{t:o}=x(),s=u(i=>i.postPost),[n,l]=a.exports.useState({limit:256,length:0,value:""}),t=a.exports.useRef(null),d=()=>{!t.current||l({...n,length:t.current.value.length,value:t.current.value})},f=async()=>{const i=n.value.trim();i.length>n.limit||(t.current&&(t.current.value="",d()),await s(i))};return c(B,{children:[e(F,{onInput:d,placeholder:o("post_create_text"),ref:t}),c(R,{children:[e(b,{as:h,onClick:f}),e("span",{children:`${n.length}/${n.limit}`})]})]})}const T=r(m)`
  margin-bottom: 0;
`,j=r(m)`
  margin-top: 0;
`;function _(){const o=u(t=>t.fetchFeedPosts),s=u(t=>t.getFeedPosts()),n=v(),l=S(t=>t.setRoute);return a.exports.useEffect(()=>{l({name:"home",path:n.pathname})},[]),c(w,{children:[e(C,{}),e(y,{onInit:p(()=>o("newer",!0)),onTop:p(()=>o("newer")),onBottom:p(()=>o("older")),topSpinner:e(T,{}),bottomSpinner:e(j,{}),children:e("div",{children:s.map(t=>e(P,{post:t},t.id))})})]})}export{_ as default};
