import{d as m,u as c,o as e,g as s,w as k,c as i,f as p,b as u,F as d}from"./index.d473d418.js";import{L as f}from"./LoaderContainer.1813c997.js";import{P as l}from"./Post.b47b0b88.js";import"./loader.17ebd677.js";import"./BookmarkIcon.2a060479.js";const L=m({__name:"BookmarksView",setup(B){const o=c(),r=()=>o.fetchBookmarkedPosts("newer",!0),n=()=>o.fetchBookmarkedPosts("newer"),a=()=>o.fetchBookmarkedPosts("older");return(_,P)=>(e(),s(f,{onInit:r,onTop:n,onBottom:a},{default:k(()=>[(e(!0),i(d,null,p(u(o).getBookmarkedPosts,t=>(e(),s(l,{post:t,key:t.id},null,8,["post"]))),128))]),_:1}))}});export{L as default};