(this.webpackJsonpmybutton=this.webpackJsonpmybutton||[]).push([[0],{100:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));const r={APP_NAME:"MyButton",APP_SHORT_NAME:"MyBTN",VERSION:.1,...{...{LOCAL:{FRONT_DOMAIN:"http://localhost:3000"},PRODUCTION:{FRONT_DOMAIN:"https://mybutton.click"},DEVELOPMENT:{FRONT_DOMAIN:"https://dev.mybutton.click"}}[window.MODE]||{}}};window.CONFIG=r},113:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(35);const a=Object(r.b)("setOpenShareModal")},144:function(e,t,n){"use strict";var r=n(0);var a=[{path:["/share"],exact:!1,component:Object(r.lazy)((()=>n.e(9).then(n.bind(null,684))))},{path:["*"],exact:!1,component:Object(r.lazy)((()=>Promise.all([n.e(4),n.e(5)]).then(n.bind(null,691))))}],c=n(145),o=n(2),s=n(4);t.a=e=>{const t=Object(r.useRef)(!0),{fallback:n,base:i="",defaultRoute:l,routes:u=a}=e;let d;return!(!t.current||!l)&&(t.current=!1,d=Object(s.jsx)(o.b,{path:i,element:Object(s.jsx)(o.a,{to:i+l,replace:!0})},"default")),Object(s.jsx)(r.Suspense,{fallback:(null===n||void 0===n?void 0:n())||Object(s.jsx)(c.a,{}),children:Object(s.jsxs)(o.d,{children:[d,u.map(((e,t)=>e.path.map((n=>Object(s.jsx)(o.b,{path:"".concat(i).concat(n),element:Object(s.jsx)(e.component,{})},t)))))]})})}},145:function(e,t,n){"use strict";var r,a=n(0);function c(){return c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c.apply(null,arguments)}function o(e,t){let{title:n,titleId:o,...s}=e;return a.createElement("svg",c({width:135,height:135,viewBox:"0 0 135 135",xmlns:"http://www.w3.org/2000/svg",fill:"#290759",ref:t,"aria-labelledby":o},s),n?a.createElement("title",{id:o},n):null,r||(r=a.createElement("path",{d:"M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z"},a.createElement("animateTransform",{attributeName:"transform",type:"rotate",from:"0 67 67",to:"-360 67 67",dur:"1.3s",repeatCount:"indefinite"}))))}const s=a.forwardRef(o);n.p;var i=n(4);t.a=e=>{let{className:t=""}=e;return Object(i.jsx)("div",{className:"loading-cover "+t,children:Object(i.jsx)(s,{className:"loading-cover-loader "+t})})}},152:function(e,t){},174:function(e,t,n){},175:function(e,t,n){},176:function(e,t,n){},177:function(e,t,n){},178:function(e,t,n){},186:function(e,t,n){},190:function(e,t){},319:function(e,t,n){},321:function(e,t,n){"use strict";n.r(t);n(174),n(175),n(176),n(177),n(178);var r=n(144),a=n(4);var c=()=>Object(a.jsx)(r.a,{}),o=n(148),s=(n(186),n(141)),i=n(150),l=n(41),u=n(35),d=n(158),b=n(60),h=n(9),f=n(88),m=n(159),p=n.n(m),j=n(113);var O=Object(u.c)({openShareModal:!1},{[j.a.type]:(e,t)=>{let{payload:n}=t;return{...e,openShareModal:n}}}),v=n(100),w=n(160);const g=n.n(w)()();var x=Object(h.b)({localStorage:Object(f.persistReducer)({storage:p.a,key:"storage",keyPrefix:"".concat(v.a.APP_SHORT_NAME,"-"),blacklist:["openShareModal"],transforms:[g]},O)});const y={blacklist:["persist/PERSIST","persist/REHYDRATE"]},E=Object(u.a)({devTools:l.d,reducer:x,middleware:e=>{const t=e({serializableCheck:!1});return t.push(Object(i.createStateSyncMiddleware)(y)),t}});var N=e=>{let{children:t}=e;return Object(a.jsx)(s.a,{store:E,children:Object(a.jsx)(d.a,{persistor:Object(b.a)(E),children:t})})};var S,T=e=>{e&&e instanceof Function&&n.e(10).then(n.bind(null,687)).then((t=>{let{getCLS:n,getFID:r,getFCP:a,getLCP:c,getTTFB:o}=t;n(e),r(e),a(e),c(e),o(e)}))},M=n(66),R=(n(319),n(0)),P=n(334);function A(){return A=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},A.apply(null,arguments)}function I(e,t){let{title:n,titleId:r,...a}=e;return R.createElement("svg",A({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 64 512",ref:t,"aria-labelledby":r},a),n?R.createElement("title",{id:r},n):null,S||(S=R.createElement("path",{d:"M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"})))}const k=R.forwardRef(I);n.p;class C extends R.Component{constructor(){super(...arguments),this.state={hasError:!1,remainTime:10}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,t){if(l.d)return;console.error(e,t);const n=setInterval((()=>{this.setState((e=>0===e.remainTime?(window.location.href="/",clearInterval(n)):{...e,remainTime:e.remainTime-1}))}),1e3)}render(){return this.state.hasError?Object(a.jsxs)("div",{className:"error-boundary-layout",children:[Object(a.jsx)(k,{className:"w-1/3 icon"}),Object(a.jsx)("h1",{children:"Something went wrong !"}),Object(a.jsxs)(P.a,{href:"/",className:"go-to-home-btn",children:["Back to home",0!==this.state.remainTime?" (".concat(this.state.remainTime,"s)"):""]}),Object(a.jsx)(P.a,{className:"report-btn",href:"mailto:mybutton@openscilab.com",children:"Report to OSL"})]}):this.props.children}}const D=Object(a.jsx)(C,{children:Object(a.jsx)(M.a,{children:Object(a.jsx)(N,{children:Object(a.jsx)(c,{})})})}),z=document.querySelector("#root");Object(o.createRoot)(z).render(D),T()},41:function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return o}));n(62),n(322),n(4);const r=!1,a=function(){let e="";for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return n.forEach((t=>{if("string"===typeof t)return e+=t+" ";e+=Object.entries(t||{}).filter((e=>!0===e[1])).map((e=>e[0])).join(" ")})),e},c=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return{className:a(...t||[])}},o=async e=>{const t="text/plain",n=new Blob([e],{type:"text/plain"}),r=[new ClipboardItem({[t]:n})];return await navigator.clipboard.write(r)}}},[[321,1,2]]]);
//# sourceMappingURL=main.1ebe059b.chunk.js.map