import{r as h,j as a,S as p,a as s,s as o,C as x,u as f,d as l,e as m,n as w}from"./index.144b30fb.js";var r=h.exports.forwardRef(function(e,i){var n={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return a(p,{iconAttrs:n,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...e,ref:i,children:[s("path",{fill:"none",d:"M0 0h24v24H0V0z"}),s("path",{d:"M18 6.7l-8.48 8.48-3.54-3.54a.996.996 0 10-1.41 1.41l4.24 4.24c.39.39 1.02.39 1.41 0l9.18-9.18a.999.999 0 00-.01-1.42c-.37-.38-1-.38-1.39.01z"})]})});r.displayName="Done";const b="/assets/turkey.f750c532.svg",v="/assets/usa.1feca227.svg",y=o.div`
  display: flex;
  flex-direction: column;
`,d=o.div`
  cursor: pointer;
  
  display: flex;
  align-items: center;
  width: 100%;

  border-bottom: 1px solid #000000;

  &:last-child {
    border-bottom: 0;
  }
`,g=o.button`
  box-sizing: content-box;
  width: 32px;
  height: 32px;
  padding: 0.5rem;
  ${e=>e.hide?x`visibility: hidden;`:""};
`,u=o.img`
  box-sizing: content-box;
  width: 48px;
  height: 48px;
  padding: 0.25rem;
`;function C(){const{i18n:e}=f(),i=l(t=>t.setRoute);h.exports.useEffect(()=>{i({name:"languages",forAny:!0,showBackButton:!0})},[]);const n=l(t=>t.setLoading),c=async t=>{n(!0),await m(()=>Promise.all([e.changeLanguage(t),w(t)]))(),n(!1)};return a(y,{children:[a(d,{onClick:()=>{c("en")},children:[s(g,{as:r,hide:e.languages[0]!=="en"}),s(u,{src:v})]}),a(d,{onClick:()=>{c("tr")},children:[s(g,{as:r,hide:e.languages[0]!=="tr"}),s(u,{src:b})]})]})}export{C as default};
