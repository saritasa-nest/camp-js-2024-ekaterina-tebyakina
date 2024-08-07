"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[682],{6682:(y,u,e)=>{e.r(u),e.d(u,{LoginFormComponent:()=>j});var m,o=e(7788),g=e(7212),a=e(7222),s=e(6375),p=e(4587),d=e(2221),c=e(1051),f=e(7236),h=e(6409),F=e(922),v=e(8578),C=e(5860);class E extends C.b{constructor(l){super(),this.email=l.email,this.password=l.password}}function G(t,l){1&t&&(o.j41(0,"mat-error"),o.EFF(1,"Email is required."),o.k0s())}function x(t,l){1&t&&(o.j41(0,"mat-error"),o.EFF(1,"Enter a valid email address."),o.k0s())}function L(t,l){1&t&&(o.j41(0,"mat-error"),o.EFF(1,"Password is required."),o.k0s())}function b(t,l){if(1&t&&(o.j41(0,"mat-error"),o.EFF(1),o.k0s()),2&t){const r=o.XpG(2);o.R7$(),o.JRh(r.loginFormGroup.getError("serverError"))}}function R(t,l){if(1&t){const r=o.RV6();o.j41(0,"form",3),o.bIt("ngSubmit",function(){o.eBV(r);const n=o.XpG();return o.Njj(n.onLoginSubmit())}),o.j41(1,"mat-form-field",4)(2,"mat-label"),o.EFF(3,"Email"),o.k0s(),o.nrm(4,"input",5),o.DNE(5,G,2,0,"mat-error")(6,x,2,0,"mat-error"),o.k0s(),o.j41(7,"mat-form-field",4)(8,"mat-label"),o.EFF(9,"Password"),o.k0s(),o.nrm(10,"input",6),o.DNE(11,L,2,0,"mat-error"),o.k0s(),o.DNE(12,b,2,1,"mat-error"),o.j41(13,"button",7),o.EFF(14,"Login"),o.k0s()()}if(2&t){let r,i;const n=o.XpG();o.Y8G("formGroup",n.loginFormGroup),o.R7$(5),o.vxM(null!=(r=n.loginFormGroup.get("email"))&&r.hasError("required")&&null!=(r=n.loginFormGroup.get("email"))&&r.touched?5:null!=(r=n.loginFormGroup.get("email"))&&r.hasError("email")&&null!=(r=n.loginFormGroup.get("email"))&&r.touched?6:-1),o.R7$(6),o.vxM(null!=(i=n.loginFormGroup.get("password"))&&i.hasError("required")&&null!=(i=n.loginFormGroup.get("password"))&&i.touched?11:-1),o.R7$(),o.vxM(n.loginFormGroup.hasError("serverError")?12:-1),o.R7$(),o.Y8G("disabled",n.loginFormGroup.invalid)}}(m||(m={})).initialize=function l(r){return r.group({email:r.control("",[a.k0.required,a.k0.email]),password:r.control("",[a.k0.required])})};let j=(()=>{class t{constructor(){this.routerPaths=v.A,this.authorizationApiService=(0,o.WQX)(c.V),this.formBuilder=(0,o.WQX)(a.Qk),this.destroyRef=(0,o.WQX)(o.abz),this.changeDetectorRef=(0,o.WQX)(o.gRc),this.router=(0,o.WQX)(F.Ix),this.loginFormGroup=m.initialize(this.formBuilder)}onLoginSubmit(){const r=new E(this.loginFormGroup.getRawValue());this.authorizationApiService.login(r).pipe((0,g.pQ)(this.destroyRef),(0,f.M)({next:()=>{this.router.navigate([this.routerPaths.Main])},error:i=>{console.warn(i),i instanceof h.yz&&this.handleServerError(i)}})).subscribe()}handleServerError(r){let i="";r.error.errors.forEach(n=>{n.attribute&&this.loginFormGroup.contains(n.attribute)?this.loginFormGroup.controls[n.attribute].setErrors({serverError:n.detail}):i+=`${n.detail}\n`}),this.loginFormGroup.setErrors({serverError:i}),this.changeDetectorRef.markForCheck()}static#o=this.\u0275fac=function(i){return new(i||t)};static#r=this.\u0275cmp=o.VBU({type:t,selectors:[["camp-login-form"]],standalone:!0,features:[o.aNF],decls:4,vars:1,consts:[[1,"login-form-wrapper"],[1,"login-header"],[1,"login-form",3,"formGroup"],[1,"login-form",3,"ngSubmit","formGroup"],["appearance","outline",1,"login-form__field"],["matInput","","type","email","placeholder","ivan.pupkin@gmail.com","formControlName","email"],["matInput","","type","password","placeholder","veryStrongPassW0rd","formControlName","password"],["mat-raised-button","","type","submit",3,"disabled"]],template:function(i,n){1&i&&(o.j41(0,"div",0)(1,"h2",1),o.EFF(2,"Login"),o.k0s(),o.DNE(3,R,15,5,"form",2),o.k0s()),2&i&&(o.R7$(3),o.vxM(n.loginFormGroup?3:-1))},dependencies:[a.X1,a.qT,a.me,a.BC,a.cb,a.j4,a.JD,s.RG,s.rl,s.nJ,s.TL,p.fS,p.fg,d.Hl,d.$z],styles:["[_nghost-%COMP%]{--login-form-min-width: 360px}.login-form-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;align-content:center;padding:var(--space-xl)}.login-header[_ngcontent-%COMP%]{font-size:var(--font-size-xl)}.login-form[_ngcontent-%COMP%]{min-width:var(--login-form-min-width);padding:var(--space-m);border-radius:24px;border:2px var(--border-color) solid;display:flex;flex-direction:column;gap:var(--space-s);align-items:center}.login-form__field[_ngcontent-%COMP%]{width:100%}"],changeDetection:0})}return t})()}}]);