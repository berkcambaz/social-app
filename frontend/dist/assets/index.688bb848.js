import{r as s,j as r,S as B,a as t,s as o,k as I,u as U,g as w,d as F,l as T,h as W}from"./index.aafe005b.js";import{S as V,B as v}from"./SingleInput.7cc316a0.js";import{M as $}from"./MultiInput.482a5251.js";var S=s.exports.forwardRef(function(e,n){var i={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return r(B,{iconAttrs:i,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...e,ref:n,children:[t("path",{fill:"none",d:"M0 0h24v24H0V0z"}),t("path",{d:"M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"})]})});S.displayName="CalendarToday";const j=o.div`
  position: absolute;
  margin-top: 1rem;
`,H=o.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.25);
`,E=o.div`
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
`;function M({children:e,show:n,setShow:i}){return n?r(j,{children:[t(H,{onClick:()=>void i(!1)}),t(E,{children:e})]}):null}const b=o.div`
  display: flex;
  justify-content: space-between;
`,R=o.div`
  display: flex;
  justify-content: center;
`,A=o(I)`
  margin: 0;
`;function D({user:e,show:n,setShow:i}){const{t:l}=U(),[a,m]=s.exports.useState({limit:32,length:e.name.length,value:e.name}),[c,h]=s.exports.useState({limit:256,length:e.bio.length,value:e.bio}),u=s.exports.useRef(null),d=s.exports.useRef(null),g=p=>{m({...a,length:p.currentTarget.value.length,value:p.currentTarget.value})},f=p=>{h({...c,length:p.currentTarget.value.length,value:p.currentTarget.value})};s.exports.useLayoutEffect(()=>{u.current&&(u.current.value=a.value),d.current&&(d.current.value=c.value)},[]);const[k,x]=s.exports.useState(!1),C=w(p=>p.editUser),z=async()=>{x(!0),await F(()=>C(a.value,c.value))(),x(!1),i(!1)};return r(M,{show:n,setShow:i,children:[r(b,{children:[t("label",{htmlFor:"usermame",children:l("username")}),`${a.length}/${a.limit}`]}),t(V,{type:"text",onInput:g,placeholder:l("username"),ref:u}),r(b,{children:[t("label",{htmlFor:"bio",children:l("bio")}),`${c.length}/${c.limit}`]}),t($,{onInput:f,placeholder:l("bio"),ref:d}),t(v,{size:"small",onClick:z,children:l("save")}),k&&t(R,{children:t(A,{})})]})}const L=o.div`
  padding: 1rem 0;
  border-bottom: 1px solid #000000;
`,N=o.div`
  font-size: ${e=>e.theme.font.big}px;
  white-space: pre-wrap;
  word-break: break-word;
`,O=o.div`
  display: flex;
  flex-direction: row;
`,P=o.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: baseline;
`,_=o.span`
  white-space: nowrap;
`,X=o.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`,Y=o.span`
  border-bottom: 1px solid #000000;
  margin-left: 0.5rem;
  white-space: nowrap;
`,q=o.div`
  padding-top: 0.5rem;
  white-space: pre-wrap;
  word-break: break-word;
`,G=o.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
`,J=o.div`
  margin-left: 0.25rem;
`,K=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`,Q=o.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0.25rem 0;
`,y=o.div`
  cursor: pointer;
  
  margin-right: 0.5rem;
  white-space: nowrap;

  &:hover {
    border-bottom: 1px solid #000000;
    margin-bottom: -1px;
  }
`;function oe({user:e}){const{t:n}=U(),i=w(f=>f.followUser),l=w(f=>f.getCurrentUser()),a=T(),m=W(),c=()=>m(`/user/${a.tag}/followings`),h=()=>m(`/user/${a.tag}/followers`),u=()=>i(e),[d,g]=s.exports.useState(!1);return r(L,{children:[d&&t(D,{user:e,show:d,setShow:g}),t(N,{children:e.name}),t(O,{children:r(P,{children:[t(_,{children:"@"}),t(X,{children:e.tag}),e.follower?t(Y,{children:n("follows_you")}):null]})}),t(q,{children:e.bio}),r(G,{children:[t(S,{size:32}),t(J,{children:"Aug 27, 2022"})]}),r(K,{children:[r(Q,{children:[r(y,{onClick:c,children:[e.followingCount," ",n("followings",{count:e.followingCount})]}),r(y,{onClick:h,children:[e.followerCount," ",n("followers",{count:e.followerCount})]})]}),l&&l.id!==e.id?t(v,{size:"big",onClick:u,children:e.following?n("unfollow"):n("follow")}):null,l&&l.id===e.id?t(v,{size:"big",onClick:()=>void g(!d),children:n("edit_profile")}):null]})]})}export{oe as U};
