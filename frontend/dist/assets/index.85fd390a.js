import{r as a,j as s,S as d,a as r,s as t,C as S,u as N,g as p,b as u,h as P,i as g}from"./index.91ab3643.js";import{B as T}from"./Bookmark.esm.9aafdab0.js";var x=a.exports.forwardRef(function(e,o){var n={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return s(d,{iconAttrs:n,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...e,ref:o,children:[r("path",{fill:"none",d:"M0 0h24v24H0V0z"}),r("path",{d:"M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"})]})});x.displayName="BookmarkBorder";var k=a.exports.forwardRef(function(e,o){var n={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return s(d,{iconAttrs:n,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...e,ref:o,children:[r("path",{fill:"none",d:"M0 0h24v24H0V0z"}),r("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"})]})});k.displayName="Delete";var b=a.exports.forwardRef(function(e,o){var n={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return s(d,{iconAttrs:n,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...e,ref:o,children:[r("path",{fill:"none",d:"M0 0h24v24H0V0z"}),r("path",{d:"M10.67 19.8C5.15 14.85 1.95 12.16 2 8.41c.04-2.97 2.3-4.39 2.35-4.43 3.61-2.46 6.89.22 7.65 1.11.75-.88 3.99-3.51 7.56-1.16.52.34 2.23 1.65 2.42 4.12.32 4.28-4.14 7.76-8.65 11.76-.38.34-.86.5-1.34.5-.47 0-.94-.17-1.32-.51z"})]})});b.displayName="Favorite";var M=a.exports.forwardRef(function(e,o){var n={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return s(d,{iconAttrs:n,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...e,ref:o,children:[r("path",{fill:"none",d:"M0 0h24v24H0V0z"}),r("path",{d:"M19.66 3.99c-2.64-1.8-5.9-.96-7.66 1.1-1.76-2.06-5.02-2.91-7.66-1.1-1.4.96-2.28 2.58-2.34 4.29-.14 3.88 3.3 6.99 8.55 11.76l.1.09c.76.69 1.93.69 2.69-.01l.11-.1c5.25-4.76 8.68-7.87 8.55-11.75-.06-1.7-.94-3.32-2.34-4.28zM12.1 18.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"})]})});M.displayName="FavoriteBorder";var B=a.exports.forwardRef(function(e,o){var n={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return s(d,{iconAttrs:n,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...e,ref:o,children:[r("path",{fill:"none",d:"M0 0h24v24H0V0z"}),r("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"})]})});B.displayName="MoreHoriz";function E(e){const[o,n]=a.exports.useState(!1),i=a.exports.useRef(!1),l=h=>{if(i.current)return void(i.current=!1);if(!e.current)return;e.current.contains(h.target)||n(!1)};return a.exports.useEffect(()=>{if(!!o)return i.current=!0,document.addEventListener("click",l),()=>document.removeEventListener("click",l)},[o]),[o,n]}const L=t.div`
  padding: 1rem 0;
  border-bottom: 1px solid #000000;

  &:last-child {
    border-bottom: 0;
  }
`,j=t.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`,D=t.div`
  padding: 0 0 0.25rem 1rem;
  white-space: pre-wrap;
  word-break: break-word;
`,F=t.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
`,W=t.div`
  display: flex;
  flex-direction: row;
`,$=t.div`
  cursor: pointer;

  display: grid;
  grid-template-columns: auto auto auto;
  margin-bottom: 1px;

  &:hover {
    border-bottom: 1px solid #000000;
    margin-bottom: 0;
  }
`,V=S`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`,q=t.div`
  ${V}
  padding-right: 0.25rem;
`,G=t.div`
  ${V}
`,J=t.div`
  margin: 0 0.25rem;
  white-space: nowrap;
`,K=t.span`
  margin-right: 0.25rem;
`,f=t.button`
  cursor: pointer;
  width: 32px;
  height: 32px;
`,O=t.div`
  position: relative;
`,Q=t.div`
  position: absolute;
  right: 0;
  z-index: 999;

  background-color: #000000;
  border-radius: 5px;
`,X=t.div`
  cursor: pointer;

  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  
  display: flex;
  align-items: center;
  color: #ffffff;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`,Y=t.div`
  padding: 0 0.25rem;
`;function ee({post:e}){const{t:o}=N(),n=p(c=>c.fetchUserById),i=p(c=>c.getUserById(e.userId)),l=p(c=>c.getCurrentUser()),h=u(c=>c.likePost),m=u(c=>c.bookmarkPost),z=u(c=>c.deletePost),C=()=>h(e),y=()=>m(e),H=()=>z(e),A=P(),U=()=>A(`/user/${i==null?void 0:i.tag}`),I=()=>{i&&l&&i.id===l.id&&R(!w)},v=a.exports.useRef(null),[w,R]=E(v);return a.exports.useEffect(()=>{i||n(e.userId)},[]),i?s(L,{children:[s(j,{children:[s(W,{children:[s($,{onClick:U,children:[r(q,{children:i.name}),r("span",{children:"@"}),r(G,{children:i.tag})]}),r(J,{title:g.unix(e.date).format("lll"),children:g.unix(e.date).fromNow()})]}),s(O,{children:[r(f,{as:B,onClick:I}),w&&r(Q,{ref:v,children:s(X,{onClick:H,children:[r(f,{as:k}),r(Y,{children:o("delete")})]})})]})]}),r(D,{children:e.content}),s(F,{children:[r(K,{children:e.likeCount}),r(f,{as:e.liked?b:M,onClick:C}),r(f,{as:e.bookmarked?T:x,onClick:y})]})]}):null}export{ee as P};
