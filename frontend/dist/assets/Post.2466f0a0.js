import{_ as d,a as i,c as a,b as s,d as y,u as B,j as I,r as C,f,e as r,t as c,n as m,k as M}from"./index.24049e98.js";import{d as p}from"./date.6932e95c.js";import{c as P,L as b}from"./Loader.efc6bd8f.js";const j={},z={width:"32",height:"32",viewBox:"0 0 24 24","stroke-width":"1",stroke:"#000000",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},H=s("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"},null,-1),U=s("path",{d:"M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"},null,-1),L=[H,U];function N(t,e){return i(),a("svg",z,L)}const V=d(j,[["render",N]]),D={},E={width:"32",height:"32",viewBox:"0 0 24 24","stroke-width":"1",stroke:"#000000",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},S=s("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"},null,-1),q=s("path",{d:"M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2"},null,-1),A=[S,q];function F(t,e){return i(),a("svg",E,A)}const G=d(D,[["render",F]]),J={},K={width:"32",height:"32",viewBox:"0 0 24 24","stroke-width":"1",stroke:"#000000",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},O=s("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"},null,-1),Q=s("circle",{cx:"5",cy:"12",r:"1"},null,-1),R=s("circle",{cx:"12",cy:"12",r:"1"},null,-1),T=s("circle",{cx:"19",cy:"12",r:"1"},null,-1),W=[O,Q,R,T];function X(t,e){return i(),a("svg",K,W)}const Y=d(J,[["render",X]]),Z={key:0,class:"post"},ss={key:1,class:"post"},ts={class:"top"},es={class:"username"},os={class:"usertag"},ns=["title"],ls={class:"mid"},cs={class:"bottom"},is={class:"count"},as=y({__name:"Post",props:{post:null},setup(t){const{post:e}=t,u=B(),_=I(),n=C(null),k=P(),$=()=>{n.value!==null&&M.push(`/user/${n.value.tag}`)},x=l=>{l!==null&&u.like(l)},g=l=>{l!==null&&u.bookmark(l)},w=()=>{e.userId===_.current&&e!==null&&u.delete(e)},v=async()=>{n.value=_.getUserById(e.userId),n.value===null&&(await k.value.wait(_.fetchUserById(e.userId)),v())};return v(),(l,o)=>!n.value||f(k).status?(i(),a("div",Z,[r(b)])):(i(),a("div",ss,[s("div",ts,[s("span",null,[s("span",{class:"user-info",onClick:o[0]||(o[0]=h=>$())},[s("span",es,c(n.value.name),1),s("span",os,"@"+c(n.value.tag),1)]),s("span",{class:"date",title:f(p).unix(t.post.date).format("lll")},c(f(p).unix(t.post.date).fromNow()),9,ns)]),s("span",null,[r(Y,{class:"icon more",onClick:o[1]||(o[1]=h=>w())})])]),s("div",ls,c(t.post.content),1),s("div",cs,[s("span",is,c(t.post.likeCount),1),r(V,{class:m(["icon",{active:t.post.liked}]),onClick:o[2]||(o[2]=h=>x(t.post))},null,8,["class"]),r(G,{class:m(["icon",{active:t.post.bookmarked}]),onClick:o[3]||(o[3]=h=>g(t.post))},null,8,["class"])])]))}});const _s=d(as,[["__scopeId","data-v-54cef6d8"]]);export{_s as P};