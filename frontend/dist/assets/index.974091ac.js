import{r as d,j as r,S as I,a as t,s as n,b as F,u as k,h as w,e as W,m as V,k as $,l as j}from"./index.144b30fb.js";import{S as H,B as v}from"./SingleInput.fe642a1e.js";import{M as E}from"./MultiInput.027897a1.js";var C=d.exports.forwardRef(function(e,o){var a={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return r(I,{iconAttrs:a,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...e,ref:o,children:[t("path",{fill:"none",d:"M0 0h24v24H0V0z"}),t("path",{d:"M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"})]})});C.displayName="CalendarToday";const M=n.div`
  position: absolute;
  margin-top: 1rem;
`,R=n.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.25);
`,T=n.div`
  z-index: 1001;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);

  background-color: #ffffff;
  border-radius: 5px;
  padding: 1rem;

  display: flex;
  flex-direction: column;

  &>* {
    margin-bottom: 1rem;
  
    &:last-child {
      margin-bottom: 0;
    }
  }
`;function A({children:e,show:o,setShow:a}){return o?r(M,{children:[t(R,{onClick:()=>void a(!1)}),t(T,{children:e})]}):null}const U=n.div`
  display: flex;
  justify-content: space-between;
`,D=n.div`
  display: flex;
  justify-content: center;
`,L=n(F)`
  margin: 0;
`;function N({user:e,show:o,setShow:a}){const{t:i}=k(),[s,m]=d.exports.useState({limit:32,length:e.name.length,value:e.name}),[p,g]=d.exports.useState({limit:256,length:e.bio.length,value:e.bio}),c=d.exports.useRef(null),l=d.exports.useRef(null),h=()=>{!c.current||m({...s,length:c.current.value.length,value:c.current.value})},u=()=>{!l.current||g({...p,length:l.current.value.length,value:l.current.value})};d.exports.useLayoutEffect(()=>{c.current&&(c.current.value=s.value),l.current&&(l.current.value=p.value)},[]);const[x,b]=d.exports.useState(!1),z=w(f=>f.editUser),B=async()=>{if(x)return;const f=s.value.trim(),y=p.value.trim();f.length===0||f.length>32||y.length>256||(b(!0),await W(()=>z(f,y))(),b(!1),a(!1))};return r(A,{show:o,setShow:a,children:[r(U,{children:[t("label",{htmlFor:"usermame",children:i("username")}),`${s.length}/${s.limit}`]}),t(H,{type:"text",onInput:h,placeholder:i("username"),ref:c}),r(U,{children:[t("label",{htmlFor:"bio",children:i("bio")}),`${p.length}/${p.limit}`]}),t(E,{onInput:u,placeholder:i("bio"),ref:l}),t(v,{size:"small",onClick:B,children:i("save")}),x&&t(D,{children:t(L,{})})]})}const O=n.div`
  padding: 1rem 0;
  border-bottom: 1px solid #000000;
`,P=n.div`
  font-size: ${e=>e.theme.font.big}px;
  white-space: pre-wrap;
  word-break: break-word;
`,_=n.div`
  display: flex;
  flex-direction: row;
`,X=n.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: baseline;
`,Y=n.span`
  white-space: nowrap;
`,q=n.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`,G=n.span`
  border-bottom: 1px solid #000000;
  margin-left: 0.5rem;
  white-space: nowrap;
`,J=n.div`
  padding-top: 0.5rem;
  white-space: pre-wrap;
  word-break: break-word;
`,K=n.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
`,Q=n.div`
  margin-left: 0.25rem;
`,Z=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`,ee=n.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0.25rem 0;
`,S=n.div`
  cursor: pointer;
  
  margin-right: 0.5rem;
  white-space: nowrap;

  &:hover {
    border-bottom: 1px solid #000000;
    margin-bottom: -1px;
  }
`;function re({user:e}){const{t:o}=k(),a=w(u=>u.followUser),i=w(u=>u.getCurrentUser()),s=V(),m=$(),p=()=>m(`/user/${s.tag}/followings`),g=()=>m(`/user/${s.tag}/followers`),c=()=>a(e),[l,h]=d.exports.useState(!1);return r(O,{children:[l&&t(N,{user:e,show:l,setShow:h}),t(P,{children:e.name}),t(_,{children:r(X,{children:[t(Y,{children:"@"}),t(q,{children:e.tag}),e.follower?t(G,{children:o("follows_you")}):null]})}),t(J,{children:e.bio}),r(K,{children:[t(C,{size:32}),t(Q,{children:j.unix(e.date).format("ll")})]}),r(Z,{children:[r(ee,{children:[r(S,{onClick:p,children:[e.followingCount," ",o("followings",{count:e.followingCount})]}),r(S,{onClick:g,children:[e.followerCount," ",o("followers",{count:e.followerCount})]})]}),i&&i.id!==e.id?t(v,{size:"big",onClick:c,children:e.following?o("unfollow"):o("follow")}):null,i&&i.id===e.id?t(v,{size:"big",onClick:()=>void h(!l),children:o("edit_profile")}):null]})]})}export{re as U};
