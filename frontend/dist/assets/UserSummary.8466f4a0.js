import{d as g,j as v,a as u,c as a,e as y,b as l,t,w as b,v as k,p as r,f as C,l as $,k as i,_ as U}from"./index.b1d055d6.js";import"./date.6932e95c.js";import{L as S}from"./Loader.4afae494.js";const x={key:0,class:"user-summary"},h={class:"username"},B={class:"follow-container"},N=g({__name:"UserSummary",props:{user:null},setup(s){const f=v(),c=o=>{o!==null&&f.follow(o)},m=o=>{o!==null&&i.push(`/user/${o.tag}/followers`)},w=o=>{o!==null&&i.push(`/user/${o.tag}/followings`)},d=o=>{o!==null&&i.push(`/user/${o.tag}`)};return(o,e)=>s.user?(u(),a("div",{key:1,class:"user-summary",onClick:e[3]||(e[3]=n=>d(s.user))},[l("div",null,[l("span",h,t(s.user.name),1),l("span",null,"@"+t(s.user.tag),1)]),b(l("div",{class:"bio"},t(s.user.bio),513),[[k,s.user.bio.length>0]]),l("div",B,[l("span",null,[l("span",{class:"followings",onClick:e[0]||(e[0]=r(n=>w(s.user),["stop"]))},t(s.user.followingCount)+" following",1),l("span",{class:"followers",onClick:e[1]||(e[1]=r(n=>m(s.user),["stop"]))},t(s.user.followerCount)+" followers",1)]),s.user.id!==C(f).current?(u(),a("button",{key:0,class:"follow-button",onClick:e[2]||(e[2]=r(n=>c(s.user),["stop"]))},t(s.user.following?"unfollow":"follow"),1)):$("",!0)])])):(u(),a("div",x,[y(S)]))}});const F=U(N,[["__scopeId","data-v-153fb6bf"]]);export{F as U};
