import{s as e,C as g,u as m,h as a,k as h,j as r,a as n}from"./index.144b30fb.js";import{B as u}from"./SingleInput.fe642a1e.js";const x=e.div`
  cursor: pointer;

  padding: 1rem 0;
  border-bottom: 1px solid #000000;
  
  &:last-child {
    border-bottom: 0;
  }
`,b=e.div`
  display: flex;
  flex-direction: row;
`,v=e.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  align-items: baseline;
`,U=e.span`
  white-space: nowrap;
`,c=g`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`,C=e.span`
  ${c}
  margin-right: 0.25rem;
`,y=e.span`
  ${c}
  margin-right: 0.25rem;
`,k=e.span`
  border-bottom: 1px solid #000000;
  white-space: nowrap;
`,j=e.div`
  padding: 0.5rem 0;
  white-space: pre-wrap;
  word-break: break-word;
`,B=e.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`,F=e.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0.25rem 0;
`,s=e.div`
  margin-right: 0.5rem;
  white-space: nowrap;
`;function $({user:o}){const{t}=m(),d=a(l=>l.followUser),i=a(l=>l.getCurrentUser()),p=h(),w=()=>p(`/user/${o.tag}`),f=l=>{l.stopPropagation(),d(o)};return r(x,{onClick:w,children:[n(b,{children:r(v,{children:[n(C,{children:o.name}),n(U,{children:"@"}),n(y,{children:o.tag}),o.follower?n(k,{children:t("follows_you")}):null]})}),n(j,{children:o.bio}),r(B,{children:[r(F,{children:[r(s,{children:[o.followingCount," ",t("followings",{count:o.followingCount})]}),r(s,{children:[o.followerCount," ",t("followers",{count:o.followerCount})]})]}),i&&i.id!==o.id&&n(u,{size:"big",onClick:f,children:o.following?t("unfollow"):t("follow")})]})]})}export{$ as U};
