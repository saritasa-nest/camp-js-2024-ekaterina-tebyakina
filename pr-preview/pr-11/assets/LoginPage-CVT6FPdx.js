import{r as i,t as v,x as _,l as e,y as j,A as S,z as L,D as w,E as y}from"./index-DUVDcEOC.js";import{z as t,u as E,P,t as T,h as b}from"./handleServerErrors-iqaxEDw3.js";import{T as c}from"./TextField-BlD4L8PC.js";const W="_formWrapper_1xnmn_1",N="_header_1xnmn_11",q="_form_1xnmn_1",A="_errorMessage_1xnmn_26",o={formWrapper:W,header:N,form:q,errorMessage:A},F=t.object({email:t.string({required_error:"This field is required"}).email("Please provide a valid email"),password:t.string({required_error:"This field is required"})}),M=()=>{const d=v(),p=_(),[n,l]=i.useState(!1),{register:m,handleSubmit:u,setError:g,formState:{errors:r,isValid:h}}=E({mode:"onBlur",resolver:T(F)}),f=async s=>{l(!0);try{const a=await S.login(s);L.saveTokens(a),d(w()),p(y)}catch(a){b(a,g,s)}l(!1)},x=s=>{!n&&h&&f(s)};return e.jsxs("div",{className:o.formWrapper,children:[e.jsx("h2",{className:o.header,children:"Log in"}),e.jsxs("form",{onSubmit:u(x),className:o.form,children:[e.jsx(c,{label:"Email",type:"email",variant:"outlined",fullWidth:!0,placeholder:"ivan.pupkin@gmail.com",...m("email",{required:!0}),error:!!r.email,helperText:r.email?r.email.message:""}),e.jsx(c,{label:"Password",type:"password",variant:"outlined",fullWidth:!0,placeholder:"veryStrongPassW0rd",...m("password"),error:!!r.password,helperText:r.password?r.password.message:""}),r.root?e.jsx("span",{className:o.errorMessage,children:r.root.message}):"",n?e.jsx(P,{}):null,e.jsx(j,{type:"submit",variant:"outlined",children:"Login"})]})]})},k=i.memo(M),z=()=>e.jsx(e.Fragment,{children:e.jsx(k,{})}),U=i.memo(z);export{U as LoginPage};
