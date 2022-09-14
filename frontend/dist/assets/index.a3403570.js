import{r as k,j as u,S as g,a,e as U,i as M,f as h,g as b,s as f,C as A,h as E}from"./index.aafe005b.js";import{B as F}from"./Bookmark.esm.65356c4e.js";var B=k.exports.forwardRef(function(t,r){var o={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return u(g,{iconAttrs:o,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...t,ref:r,children:[a("path",{fill:"none",d:"M0 0h24v24H0V0z"}),a("path",{d:"M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"})]})});B.displayName="BookmarkBorder";var y=k.exports.forwardRef(function(t,r){var o={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return u(g,{iconAttrs:o,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...t,ref:r,children:[a("path",{fill:"none",d:"M0 0h24v24H0V0z"}),a("path",{d:"M10.67 19.8C5.15 14.85 1.95 12.16 2 8.41c.04-2.97 2.3-4.39 2.35-4.43 3.61-2.46 6.89.22 7.65 1.11.75-.88 3.99-3.51 7.56-1.16.52.34 2.23 1.65 2.42 4.12.32 4.28-4.14 7.76-8.65 11.76-.38.34-.86.5-1.34.5-.47 0-.94-.17-1.32-.51z"})]})});y.displayName="Favorite";var C=k.exports.forwardRef(function(t,r){var o={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return u(g,{iconAttrs:o,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...t,ref:r,children:[a("path",{fill:"none",d:"M0 0h24v24H0V0z"}),a("path",{d:"M19.66 3.99c-2.64-1.8-5.9-.96-7.66 1.1-1.76-2.06-5.02-2.91-7.66-1.1-1.4.96-2.28 2.58-2.34 4.29-.14 3.88 3.3 6.99 8.55 11.76l.1.09c.76.69 1.93.69 2.69-.01l.11-.1c5.25-4.76 8.68-7.87 8.55-11.75-.06-1.7-.94-3.32-2.34-4.28zM12.1 18.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"})]})});C.displayName="FavoriteBorder";var z=k.exports.forwardRef(function(t,r){var o={fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};return u(g,{iconAttrs:o,iconVerticalAlign:"middle",iconViewBox:"0 0 24 24",...t,ref:r,children:[a("path",{fill:"none",d:"M0 0h24v24H0V0z"}),a("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"})]})});z.displayName="MoreHoriz";const v=U(M((t,r)=>({posts:{},feedPostIds:[],userPostIds:{},bookmarkedPostIds:[],getFeedPosts:()=>{const o=r(),s=[];return o.feedPostIds.forEach(n=>{const e=o.posts[n];e&&s.push(e)}),s},getUserPosts:o=>{if(o===null)return[];const s=r(),n=[],e=s.userPostIds[o.id];return e?(e.forEach(i=>{const d=s.posts[i];d&&n.push(d)}),n):[]},getBookmarkedPosts:()=>{const o=r(),s=[];return o.bookmarkedPostIds.forEach(n=>{const e=o.posts[n];e&&s.push(e)}),s},postPost:async o=>{const{data:s,err:n}=await h.postPost(o);if(n||s.post===void 0)return;const e=s.post;t(i=>{i.posts[e.id]=e,i.feedPostIds.push(e.id),i.feedPostIds=P(i.feedPostIds)})},likePost:async o=>{const{data:s,err:n}=await h.likePost(o.id);if(n||s.state===void 0)return;const e=s.state;t(i=>{const d=i.posts[o.id];!d||(d.liked=e,d.likeCount+=e?1:-1)})},bookmarkPost:async o=>{const{data:s,err:n}=await h.bookmarkPost(o.id);if(n||s.state===void 0)return;const e=s.state;t(i=>{const d=i.posts[o.id];!d||(d.bookmarked=e,w(i.bookmarkedPostIds,d.id))})},deletePost:async o=>{const s=b.getState().getCurrentUser();if(s===null||s.id!==o.userId)return;const{err:n}=await h.deletePost(o.id);n||t(e=>{delete e.posts[o.id],w(e.feedPostIds,o.id),w(e.userPostIds[o.userId],o.id),w(e.bookmarkedPostIds,o.id)})},fetchFeedPosts:async(o,s)=>{const n=r(),{data:e,err:i}=await h.getFeedPosts(I(n.feedPostIds,o,s),o);if(i||e.posts===void 0||e.posts.length===0)return;const d=e.posts;t(l=>{d.forEach(c=>{l.posts[c.id]=c,l.feedPostIds.push(c.id)}),l.feedPostIds=P(l.feedPostIds)})},fetchUserPosts:async(o,s,n)=>{const e=r(),{data:i,err:d}=await h.getUserPosts(o,I(e.userPostIds[o],s,n),s);if(d||i.posts===void 0||i.posts.length===0)return;const l=i.posts;t(c=>{c.userPostIds[o]||(c.userPostIds[o]=[]),l.forEach(m=>{c.posts[m.id]=m,c.userPostIds[o].push(m.id)}),c.userPostIds[o]=P(c.userPostIds[o])})},fetchBookmarkedPosts:async(o,s)=>{const n=r(),{data:e,err:i}=await h.getBookmarkedPosts(I(n.bookmarkedPostIds,o,s),o);if(i||e.posts===void 0||e.posts.length===0)return;const d=e.posts;t(l=>{d.forEach(c=>{l.posts[c.id]=c,l.bookmarkedPostIds.push(c.id)}),l.bookmarkedPostIds=P(l.bookmarkedPostIds)})}})));function I(t,r,o){if(!t||t.length===0||o)return-1;const s=r==="newer"?t[0]:t[t.length-1];return s===void 0?-1:s}function P(t){return[...new Set(t)].sort((r,o)=>o-r)}function w(t,r){if(!t)return;const o=t.findIndex(s=>s===r);o!==-1&&t.splice(o,1)}const H=f.div`
  padding: 1rem 0;
  border-bottom: 1px solid #000000;

  &:last-child {
    border-bottom: 0;
  }
`,S=f.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`,N=f.div`
  padding: 0 0 0.25rem 1rem;
  white-space: pre-wrap;
  word-break: break-word;
`,j=f.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
`,R=f.div`
  display: flex;
  flex-direction: row;
`,$=f.div`
  cursor: pointer;

  display: grid;
  grid-template-columns: auto auto auto;
  margin-bottom: 1px;

  &:hover {
    border-bottom: 1px solid #000000;
    margin-bottom: 0;
  }
`,V=A`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`,T=f.div`
  ${V}
  padding-right: 0.25rem;
`,D=f.div`
  ${V}
`,L=f.div`
  margin: 0 0.25rem;
  white-space: nowrap;
`,W=f.span`
  margin-right: 0.25rem;
`,x=f.button`
  cursor: pointer;
  width: 32px;
  height: 32px;
`;function J({post:t}){const r=b(p=>p.fetchUserById),o=b(p=>p.getUserById(t.userId)),s=v(p=>p.likePost),n=v(p=>p.bookmarkPost),e=v(p=>p.deletePost),i=()=>s(t),d=()=>n(t),l=()=>e(t),c=E(),m=()=>c(`/user/${o==null?void 0:o.tag}`);return k.exports.useEffect(()=>{o||r(t.userId)},[]),o?u(H,{children:[u(S,{children:[u(R,{children:[u($,{onClick:m,children:[a(T,{children:o.name}),a("span",{children:"@"}),a(D,{children:o.tag})]}),a(L,{children:"2 hours ago"})]}),a(x,{as:z,onClick:l})]}),a(N,{children:t.content}),u(j,{children:[a(W,{children:t.likeCount}),a(x,{as:t.liked?y:C,onClick:i}),a(x,{as:t.bookmarked?F:B,onClick:d})]})]}):null}export{J as P,v as u};
