import{r as d,j as e,S as h,a as o,s as u,u as A,g,h as C,e as V,P as y}from"./index.248dc6d2.js";import{B}from"./Bookmark.esm.a61d870e.js";var f=d.exports.forwardRef(function(t,r){var n={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return e(h,{iconAttrs:n,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...t,ref:r,children:[o("path",{fill:"none",d:"M0 0h24v24H0V0z"}),o("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm0-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"})]})});f.displayName="Info";var p=d.exports.forwardRef(function(t,r){var n={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return e(h,{iconAttrs:n,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...t,ref:r,children:[o("path",{fill:"none",d:"M0 0h24v24H0V0z"}),o("path",{d:"M5 5h6c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h6c.55 0 1-.45 1-1s-.45-1-1-1H5V5z"}),o("path",{d:"M20.65 11.65l-2.79-2.79a.501.501 0 00-.86.35V11h-7c-.55 0-1 .45-1 1s.45 1 1 1h7v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.19.2-.51.01-.7z"})]})});p.displayName="Logout";var m=d.exports.forwardRef(function(t,r){var n={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return e(h,{iconAttrs:n,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...t,ref:r,children:[o("rect",{width:24,height:24,fill:"none"}),o("path",{d:"M12.65 15.67c.14-.36.05-.77-.23-1.05l-2.09-2.06.03-.03A17.52 17.52 0 0014.07 6H16a1 1 0 001-.99v-.02c0-.54-.45-.99-.99-.99H10V3c0-.55-.45-1-1-1s-1 .45-1 1v1H1.99c-.54 0-.99.45-.99.99 0 .55.45.99.99.99h10.17C11.5 7.92 10.44 9.75 9 11.35c-.81-.89-1.49-1.86-2.06-2.88A.885.885 0 006.16 8c-.69 0-1.13.75-.79 1.35.63 1.13 1.4 2.21 2.3 3.21L3.3 16.87a.99.99 0 000 1.42c.39.39 1.02.39 1.42 0L9 14l2.02 2.02c.51.51 1.38.32 1.63-.35zM17.42 10c-.65 0-1.22.4-1.45 1l-3.64 9.69a.96.96 0 00.9 1.3c.41 0 .77-.26.91-.64l.86-2.43h4.84l.85 2.42c.14.39.5.65.91.65a.96.96 0 00.9-1.3L18.87 11c-.23-.6-.81-1-1.45-1zm-1.79 7.19l1.74-4.96h.1l1.74 4.96h-3.58z"})]})});m.displayName="Translate";const M=u.div`
  display: flex;
  flex-direction: column;
`,a=u.div`
  cursor: pointer;
  
  display: flex;
  align-items: center;
  width: 100%;

  border-bottom: 1px solid #000000;

  &:last-child {
    border-bottom: 0;
  }
`,l=u.button`
  box-sizing: content-box;
  width: 32px;
  height: 32px;
  padding: 0.75rem;
`,i=u.span`
  font-size: ${t=>t.theme.font.big}px;
`;function I(){const{t}=A(),r=g(s=>s.logout),n=g(s=>s.getCurrentUser()),c=C(),v=V(s=>s.setRoute);d.exports.useEffect(()=>{v({name:"menu",showBackButton:!0,forAny:!0})},[]);const w=()=>c("/account"),x=()=>c("/bookmarks"),k=()=>c("/languages"),b=()=>c("/about"),z=async()=>{await r(),c("/login")};return e(M,{children:[n!==void 0?e(a,{onClick:w,children:[o(l,{as:y}),o(i,{children:t("account")})]}):null,n!==void 0?e(a,{onClick:x,children:[o(l,{as:B}),o(i,{children:t("bookmarks")})]}):null,e(a,{onClick:k,children:[o(l,{as:m}),o(i,{children:t("languages")})]}),e(a,{onClick:b,children:[o(l,{as:f}),o(i,{children:t("about")})]}),n!==void 0?e(a,{onClick:z,children:[o(l,{as:p}),o(i,{children:t("logout")})]}):null]})}export{I as default};
