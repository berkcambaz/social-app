import{U as i}from"./User.70d52f16.js";import{d,k as f,j as m,u as v,r as w,o as p,g as U,c as l,e as g,F as u,h,f as _,l as P,a as r,i as k}from"./index.e12cdffc.js";import{P as y}from"./Post.8a74a457.js";import"./date.6932e95c.js";import"./Loader.01b90a30.js";const N=d({__name:"UserView",setup(B){const t=f.currentRoute.value.params.tag,o=m(),s=v(),e=w(null),n=c=>{window.scrollY<=0&&e.value!==null&&s.fetchUserPosts(e.value.id,"newer"),window.innerHeight+window.scrollY>=document.body.offsetHeight&&e.value!==null&&s.fetchUserPosts(e.value.id,"older")};return(async()=>{t!==void 0&&(await o.fetchUserByTag(t),e.value=o.getUserByTag(t),e.value!==null&&s.fetchUserPosts(e.value.id,"newer",!0))})(),p(()=>{window.addEventListener("scroll",n)}),U(()=>{window.removeEventListener("scroll",n)}),(c,L)=>(r(),l(u,null,[g(i,{user:e.value},null,8,["user"]),e.value?(r(!0),l(u,{key:0},h(_(s).getUserPosts(e.value),a=>(r(),k(y,{post:a,key:a.id},null,8,["post"]))),128)):P("",!0)],64))}});export{N as default};
