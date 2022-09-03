import{_ as k,o as r,c as f,z as N,d as B,i as U,h as I,r as w,m as V,b as s,e as t,t as o,x as m,a as h,w as b,s as u,L as S,g as x,A as E,B as F,F as T,k as C,C as L,j,p as z,l as D}from"./index.d473d418.js";import{c as M}from"./loader.17ebd677.js";import{I as P}from"./Input.a227dd64.js";import{B as $}from"./Button.21f0284b.js";const A={},H={width:"32",height:"32",viewBox:"0 0 24 24","stroke-width":"1",stroke:"#000000",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},p=N('<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect x="4" y="5" width="16" height="16" rx="2"></rect><line x1="16" y1="3" x2="16" y2="7"></line><line x1="8" y1="3" x2="8" y2="7"></line><line x1="4" y1="11" x2="20" y2="11"></line><line x1="11" y1="15" x2="12" y2="15"></line><line x1="12" y1="15" x2="12" y2="18"></line>',7),q=[p];function G(e,_){return r(),f("svg",H,q)}const J=k(A,[["render",G]]),K={key:0,class:"user-edit-profile"},O={class:"container"},Q={class:"text-section"},R={for:"username"},W={class:"text-section"},X={for:"bio"},Y=m("done"),Z={key:0,class:"loader-container"},ee=B({__name:"UserEditProfile",props:{editingProfile:{type:Boolean},user:null},setup(e){const{editingProfile:_,user:n}=e,{t:v}=U.global,y=I(),g=M(),c=w({limit:32,current:0,value:"",type:"single"}),d=w({limit:256,current:0,value:"",type:"multi"}),i=async()=>{const l=c.value.value,a=d.value.value;return l.length===0||l.length>32||a.length>256?!1:(await g.value.wait(y.editUser(l,a)),!0)};return V(()=>{!n||(c.value.value=n.name,c.value.current=n.name.length,d.value.value=n.bio,d.value.current=n.bio.length)}),(l,a)=>e.editingProfile||s(g).status?(r(),f("div",K,[t("div",{class:"background",onClick:a[0]||(a[0]=_e=>e.editingProfile=!1)}),t("div",O,[t("div",Q,[t("label",R,o(s(v)("username")),1),m(" "+o(`${c.value.current}/${c.value.limit}`),1)]),h(P,{type:"text",text:c.value,id:"username"},null,8,["text"]),t("div",W,[t("label",X,o(s(v)("bio")),1),m(" "+o(`${d.value.current}/${d.value.limit}`),1)]),h(P,{type:"text",text:d.value,id:"bio"},null,8,["text"]),h($,{onClick:a[1]||(a[1]=async()=>{await i()&&(e.editingProfile=!1)}),disabled:s(g).status},{default:b(()=>[Y]),_:1},8,["disabled"]),s(g).status?(r(),f("div",Z,[h(S)])):u("",!0)])])):u("",!0)}});const te=k(ee,[["__scopeId","data-v-cbd011c3"]]),se=e=>(z("data-v-557befb6"),e=e(),D(),e),oe={key:1,class:"user"},ne={key:2,class:"user"},le={key:3,class:"user"},ie={class:"username"},ae={class:"usertag-container"},re={class:"usertag"},ue=se(()=>t("span",null,"@",-1)),ce={class:"dynamic"},de={key:0,class:"follows-you"},fe={class:"date"},ve={class:"bottom"},ge={class:"follow-container"},he=B({__name:"User",props:{user:null,searching:{type:Boolean}},setup(e){const _=I(),{t:n}=U.global,v=w(!1),y=i=>{i!==null&&_.follow(i)},g=i=>{i!==null&&C.push(`/user/${i.tag}/followers`)},c=i=>{i!==null&&C.push(`/user/${i.tag}/followings`)},d=()=>{v.value=!1,L(()=>{v.value=!0})};return(i,l)=>(r(),f(T,null,[v.value&&e.user?(r(),x(te,{key:0,editingProfile:v.value,user:e.user},null,8,["editingProfile","user"])):u("",!0),!e.user&&!e.searching?(r(),f("div",oe,o(s(n)("user_not_found")),1)):u("",!0),!e.user&&e.searching?(r(),f("div",ne,[h(S)])):u("",!0),e.user?(r(),f("div",le,[t("div",ie,o(e.user.name),1),t("div",ae,[t("span",re,[ue,t("span",ce,o(e.user.tag),1),e.user.follower?(r(),f("span",de,o(s(n)("follows_you")),1)):u("",!0)])]),E(t("div",{class:"bio"},o(e.user.bio),513),[[F,e.user.bio.length>0]]),t("div",fe,[h(J),t("span",null,o(s(j).unix(e.user.date).format("ll")),1)]),t("div",ve,[t("span",ge,[t("span",{class:"followings",onClick:l[0]||(l[0]=a=>c(e.user))},o(`${e.user.followingCount} ${s(n)("following_count",e.user.followingCount)}`),1),t("span",{class:"followers",onClick:l[1]||(l[1]=a=>g(e.user))},o(`${e.user.followerCount} ${s(n)("follower_count",e.user.followerCount)}`),1)]),e.user.id!==s(_).current?(r(),x($,{key:0,class:"button",onClick:l[2]||(l[2]=a=>y(e.user))},{default:b(()=>[m(o(e.user.following?s(n)("unfollow"):s(n)("follow")),1)]),_:1})):u("",!0),e.user.id===s(_).current?(r(),x($,{key:1,class:"button",onClick:l[3]||(l[3]=a=>d())},{default:b(()=>[m(o(s(n)("edit_profile")),1)]),_:1})):u("",!0)])])):u("",!0)],64))}});const be=k(he,[["__scopeId","data-v-557befb6"]]);export{be as U};