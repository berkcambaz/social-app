import{d,j as f,o as n,c,a as m,b as e,t,w,v as _,g as h,h as v,q as y,s as p,x as g,m as k,k as S,p as x,l as C,_ as b}from"./index.dd9a2301.js";import"./date.6932e95c.js";import{L as B}from"./Loader.503a8bf7.js";import{B as U}from"./Button.944ee2e6.js";const I=s=>(x("data-v-c245af30"),s=s(),C(),s),N={key:0,class:"user-summary"},V={class:"user-info-container"},$={class:"user-info"},D={class:"username dynamic"},L=I(()=>e("span",null,"@",-1)),j={class:"dynamic"},q={class:"follow-container"},E={class:"followings"},M={class:"followers"},T=d({__name:"UserSummary",props:{user:null},setup(s){const l=f(),r=o=>{o!==null&&l.follow(o)},i=o=>{o!==null&&S.push(`/user/${o.tag}`)};return(o,a)=>s.user?(n(),c("div",{key:1,class:"user-summary clickable",onClick:a[1]||(a[1]=u=>i(s.user))},[e("span",V,[e("span",$,[e("span",D,t(s.user.name),1),L,e("span",j,t(s.user.tag),1)])]),w(e("div",{class:"bio"},t(s.user.bio),513),[[_,s.user.bio.length>0]]),e("div",q,[e("span",null,[e("span",E,t(s.user.followingCount)+" following",1),e("span",M,t(s.user.followerCount)+" followers",1)]),s.user.id!==h(l).current?(n(),v(U,{key:0,class:"follow-button",onClick:a[0]||(a[0]=g(u=>r(s.user),["stop"]))},{default:y(()=>[p(t(s.user.following?"unfollow":"follow"),1)]),_:1})):k("",!0)])])):(n(),c("div",N,[m(B)]))}});const H=b(T,[["__scopeId","data-v-c245af30"]]);export{H as U};