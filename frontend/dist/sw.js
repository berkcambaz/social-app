if(!self.define){let s,e={};const l=(l,n)=>(l=new URL(l+".js",n).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(n,i)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let o={};const u=s=>l(s,r),a={module:{uri:r},exports:o,require:u};e[r]=Promise.all(n.map((s=>a[s]||u(s)))).then((s=>(i(...s),o)))}}define(["./workbox-958fa2bd"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/About.aa28ea13.js",revision:null},{url:"assets/Account.4846cff6.js",revision:null},{url:"assets/Bookmark.esm.1c65bcde.js",revision:null},{url:"assets/Bookmarks.ca7be834.js",revision:null},{url:"assets/en.44dcc8f5.js",revision:null},{url:"assets/Followers.26f77561.js",revision:null},{url:"assets/Followings.cb7897da.js",revision:null},{url:"assets/Home.467b6eb0.js",revision:null},{url:"assets/index.144b30fb.js",revision:null},{url:"assets/index.47e59ae2.js",revision:null},{url:"assets/index.580060d0.js",revision:null},{url:"assets/index.974091ac.js",revision:null},{url:"assets/InfiniteScroll.0da5f2d0.js",revision:null},{url:"assets/Languages.aa6ad741.js",revision:null},{url:"assets/Login.7510144e.js",revision:null},{url:"assets/Menu.8b573309.js",revision:null},{url:"assets/MultiInput.027897a1.js",revision:null},{url:"assets/NotFound.6f6c874d.js",revision:null},{url:"assets/Search.6ae9b5d2.js",revision:null},{url:"assets/Signup.8975d28b.js",revision:null},{url:"assets/SingleInput.fe642a1e.js",revision:null},{url:"assets/tr.5105c902.js",revision:null},{url:"assets/turkey.f750c532.svg",revision:null},{url:"assets/usa.1feca227.svg",revision:null},{url:"assets/User.cc6c9147.js",revision:null},{url:"favicon.ico",revision:"dbee29231b8d37d98f2ca00f51790216"},{url:"index.html",revision:"36ede89b5df8161903214197a012e7ff"},{url:"locales/en/translation.json",revision:"4c156b74201cc2d9fc7544aa98db6286"},{url:"locales/tr/translation.json",revision:"4a0ceb086e1d404d56f755689bf8f0b8"},{url:"logo192.png",revision:"f41e7b9c5c07952466c6a3a978e1e811"},{url:"logo512.png",revision:"ababe03f56cbb767cba7a4d8b75c7b05"},{url:"manifest.json",revision:"279f046e0d7706e927e8049e0d82568e"},{url:"logo192.png",revision:"f41e7b9c5c07952466c6a3a978e1e811"},{url:"logo512.png",revision:"ababe03f56cbb767cba7a4d8b75c7b05"},{url:"manifest.webmanifest",revision:"9eb8749c9daad27c6a45ae19df854f11"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
