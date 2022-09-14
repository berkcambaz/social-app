import{r as d,j as n,S as g,a as t,s,C as u,u as h,c as p}from"./index.aafe005b.js";var i=d.exports.forwardRef(function(e,a){var o={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return n(g,{iconAttrs:o,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...e,ref:a,children:[t("path",{fill:"none",d:"M0 0h24v24H0V0z"}),t("path",{d:"M18 6.7l-8.48 8.48-3.54-3.54a.996.996 0 10-1.41 1.41l4.24 4.24c.39.39 1.02.39 1.41 0l9.18-9.18a.999.999 0 00-.01-1.42c-.37-.38-1-.38-1.39.01z"})]})});i.displayName="Done";const x="/assets/turkey.f750c532.svg",f="/assets/usa.1feca227.svg",m=s.div`
  display: flex;
  flex-direction: column;
`,r=s.div`
  cursor: pointer;
  
  display: flex;
  align-items: center;
  width: 100%;

  border-bottom: 1px solid #000000;

  &:last-child {
    border-bottom: 0;
  }
`,c=s.button`
  box-sizing: content-box;
  width: 32px;
  height: 32px;
  padding: 0.5rem;
  ${e=>e.hide?u`visibility: hidden;`:""};
`,l=s.img`
  box-sizing: content-box;
  width: 48px;
  height: 48px;
  padding: 0.25rem;
`;function w(){const{i18n:e}=h(),a=p(o=>o.setRoute);return d.exports.useEffect(()=>{a({name:"languages",forAny:!0,showBackButton:!0})},[]),n(m,{children:[n(r,{onClick:()=>{e.changeLanguage("en")},children:[t(c,{as:i,hide:e.language!=="en"}),t(l,{src:f})]}),n(r,{onClick:()=>{e.changeLanguage("tr")},children:[t(c,{as:i,hide:e.language!=="tr"}),t(l,{src:x})]})]})}export{w as default};
