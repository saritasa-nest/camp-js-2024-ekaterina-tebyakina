import{s as I,_ as c,r as n,u as C,a as R,T as m,j as e,c as $,b as A,d as b,L as E,G as F,e as w,f as g,g as S,O as k}from"./index-BLJua9-z.js";import{l as j,L as B,g as D,T as M,a as O,b as U,I as W,d as H}from"./Delete-DWyNpIWy.js";const q=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],z=s=>{const{classes:t,inset:o,primary:i,secondary:d,dense:p}=s;return A({root:["root",o&&"inset",p&&"dense",i&&d&&"multiline"],primary:["primary"],secondary:["secondary"]},D,t)},J=I("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(s,t)=>{const{ownerState:o}=s;return[{[`& .${j.primary}`]:t.primary},{[`& .${j.secondary}`]:t.secondary},t.root,o.inset&&t.inset,o.primary&&o.secondary&&t.multiline,o.dense&&t.dense]}})(({ownerState:s})=>c({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},s.primary&&s.secondary&&{marginTop:6,marginBottom:6},s.inset&&{paddingLeft:56})),K=n.forwardRef(function(t,o){const i=C({props:t,name:"MuiListItemText"}),{children:d,className:p,disableTypography:l=!1,inset:N=!1,primary:f,primaryTypographyProps:y,secondary:v,secondaryTypographyProps:G}=i,P=R(i,q),{dense:h}=n.useContext(B);let a=f??d,r=v;const _=c({},i,{disableTypography:l,inset:N,primary:!!a,secondary:!!r,dense:h}),x=z(_);return a!=null&&a.type!==m&&!l&&(a=e.jsx(m,c({variant:h?"body2":"body1",className:x.primary,component:y!=null&&y.variant?void 0:"span",display:"block"},y,{children:a}))),r!=null&&r.type!==m&&!l&&(r=e.jsx(m,c({variant:"body2",className:x.secondary,color:"text.secondary",display:"block"},G,{children:r}))),e.jsxs(J,c({className:$(x.root,p),ownerState:_,ref:o},P,{children:[a,r]}))}),Q=b(s=>s.genres.genres,s=>s),V=b(s=>s.genres.isLoading,s=>s),X="_form_1yioa_1",Y="_field_1yioa_9",L={form:X,field:Y},Z=()=>e.jsx("form",{className:L.form,children:e.jsx(M,{className:L.field,label:"Search",variant:"outlined"})}),ss=n.memo(Z),es="_list_1mjbp_1",ts="_item_1mjbp_9",T={list:es,item:ts},os=({genres:s})=>e.jsx(O,{className:T.list,children:s.map(t=>e.jsx(U,{className:T.item,secondaryAction:e.jsx(W,{edge:"end","aria-label":"delete",children:e.jsx(H,{})}),component:E,to:`/${F}/${t.id}`,children:e.jsx(K,{primary:t.name})},t.id))}),as=n.memo(os),rs="_main_roiwr_1",ns="_section_roiwr_8",is="_details_roiwr_14",u={main:rs,section:ns,details:is},cs=()=>{const s=w(),t=g(Q),o=g(V);return n.useEffect(()=>{s(S())},[s]),o?e.jsx("div",{children:"Loading"}):e.jsxs("main",{className:u.main,children:[e.jsxs("div",{className:u.section,children:[e.jsx(ss,{}),e.jsx(as,{genres:t})]}),e.jsx("div",{className:u.details,children:e.jsx(k,{})})]})},ds=n.memo(cs);export{ds as GenresPage};