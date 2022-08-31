import{_ as $,o as i,c as d,z as S,d as P,j as B,r as _,e as N,g,b as t,s as m,t as a,a as v,q as w,m as c,p as V,l as E,h as y,w as F,v as T,F as L,k as b,A as j}from"./index.b68e357f.js";import{d as p}from"./date.6932e95c.js";import{c as z,I as C,L as U}from"./Loader.3ff1853c.js";import{B as k}from"./Button.aeb2ade2.js";const D={},M={width:"32",height:"32",viewBox:"0 0 24 24","stroke-width":"1",stroke:"#000000",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},q=S('<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect x="4" y="5" width="16" height="16" rx="2"></rect><line x1="16" y1="3" x2="16" y2="7"></line><line x1="8" y1="3" x2="8" y2="7"></line><line x1="4" y1="11" x2="20" y2="11"></line><line x1="11" y1="15" x2="12" y2="15"></line><line x1="12" y1="15" x2="12" y2="18"></line>',7),A=[q];function H(e,h){return i(),d("svg",M,A)}const G=$(D,[["render",H]]),I=e=>(V("data-v-aeb0a3aa"),e=e(),E(),e),J={key:0,class:"user-edit-profile"},K={class:"container"},O={class:"text-section"},Q=I(()=>t("label",{for:"username"},"username",-1)),R={class:"text-section"},W=I(()=>t("label",{for:"bio"},"bio",-1)),X=m("done"),Y={key:0,class:"loader-container"},Z=P({__name:"UserEditProfile",props:{editingProfile:{type:Boolean},user:null},setup(e){const{editingProfile:h,user:l}=e,x=B(),f=z(),r=_({limit:32,current:0,value:"",type:"single"}),u=_({limit:256,current:0,value:"",type:"multi"}),n=async()=>{const s=r.value.value,o=u.value.value;return s.length===0||s.length>32||o.length>256?!1:(await f.value.wait(x.editUser(s,o)),!0)};return N(()=>{!l||(r.value.value=l.name,r.value.current=l.name.length,u.value.value=l.bio,u.value.current=l.bio.length)}),(s,o)=>e.editingProfile||g(f).status?(i(),d("div",J,[t("div",{class:"background",onClick:o[0]||(o[0]=de=>e.editingProfile=!1)}),t("div",K,[t("div",O,[Q,m(" "+a(`${r.value.current}/${r.value.limit}`),1)]),v(C,{type:"text",text:r.value,id:"username"},null,8,["text"]),t("div",R,[W,m(" "+a(`${u.value.current}/${u.value.limit}`),1)]),v(C,{type:"text",text:u.value,id:"bio"},null,8,["text"]),v(k,{onClick:o[1]||(o[1]=async()=>{await n()&&(e.editingProfile=!1)}),disabled:g(f).status},{default:w(()=>[X]),_:1},8,["disabled"]),g(f).status?(i(),d("div",Y,[v(U)])):c("",!0)])])):c("",!0)}});const ee=$(Z,[["__scopeId","data-v-aeb0a3aa"]]),te={key:1,class:"user"},se={key:2,class:"user"},ne={key:3,class:"user"},oe={class:"username"},le={class:"usertag"},ie={class:"date"},ae={class:"bottom"},re={class:"follow-container"},ue=m("edit profile"),ce=P({__name:"User",props:{user:null,searching:{type:Boolean}},setup(e){const h=B(),l=_(!1),x=n=>{n!==null&&h.follow(n)},f=n=>{n!==null&&b.push(`/user/${n.tag}/followers`)},r=n=>{n!==null&&b.push(`/user/${n.tag}/followings`)},u=()=>{l.value=!1,j(()=>{l.value=!0})};return(n,s)=>(i(),d(L,null,[l.value&&e.user?(i(),y(ee,{key:0,editingProfile:l.value,user:e.user},null,8,["editingProfile","user"])):c("",!0),!e.user&&!e.searching?(i(),d("div",te,"user not found")):c("",!0),!e.user&&e.searching?(i(),d("div",se,[v(U)])):c("",!0),e.user?(i(),d("div",ne,[t("div",oe,a(e.user.name),1),t("div",le,"@"+a(e.user.tag),1),F(t("div",{class:"bio"},a(e.user.bio),513),[[T,e.user.bio.length>0]]),t("div",ie,[v(G),t("span",null,a(g(p).unix(e.user.date).format("ll")),1)]),t("div",ae,[t("span",re,[t("span",{class:"followings",onClick:s[0]||(s[0]=o=>r(e.user))},a(e.user.followingCount)+" following",1),t("span",{class:"followers",onClick:s[1]||(s[1]=o=>f(e.user))},a(e.user.followerCount)+" followers",1)]),e.user.id!==g(h).current?(i(),y(k,{key:0,class:"button",onClick:s[2]||(s[2]=o=>x(e.user))},{default:w(()=>[m(a(e.user.following?"unfollow":"follow"),1)]),_:1})):c("",!0),e.user.id===g(h).current?(i(),y(k,{key:1,class:"button",onClick:s[3]||(s[3]=o=>u())},{default:w(()=>[ue]),_:1})):c("",!0)])])):c("",!0)],64))}});const me=$(ce,[["__scopeId","data-v-2a0a3a81"]]);export{me as U};
