import{U as u}from"./User.15cb1941.js";import{_ as o}from"./PostLister.vue_vue_type_script_setup_true_lang.030f6025.js";import{d as n,h as l,g as c,r as m,c as i,e as f,k as p,l as _,F as g,a as t}from"./index.52a2db16.js";import"./date.6932e95c.js";const T=n({__name:"UserView",setup(v){const r=l.currentRoute.value.params.tag,s=c(),e=m(null),a=async()=>{r!==void 0&&(await s.fetchUserByTag(r),e.value=s.getUserByTag(r),e.value===null&&setTimeout(()=>{a()},500))};return a(),(d,U)=>(t(),i(g,null,[f(u,{user:e.value},null,8,["user"]),e.value!==null?(t(),p(o,{key:0,user:e.value},null,8,["user"])):_("",!0)],64))}});export{T as default};