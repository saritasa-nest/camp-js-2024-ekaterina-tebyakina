"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[696],{5696:(M,m,t)=>{t.r(m),t.d(m,{LoginFormComponent:()=>j});var r=t(7788),h=t(7212),n=t(7222),a=t(6375),f=t(4587),c=t(2221),d=t(1051),u=t(4526),p=t(8823),v=t(7236),F=t(6409),E=t(922),S=t(8578),C=t(5860);class R extends C.b{constructor(l){super(),this.email=l.email,this.password=l.password}}let y=(()=>{class i{constructor(){this.formBuilder=(0,r.WQX)(n.Qk),this.errors={required:"This field is required.",email:"Enter a valid email address."},this.form=this.initialize()}initialize(){return this.formBuilder.group({email:this.formBuilder.control("",[n.k0.required,n.k0.email]),password:this.formBuilder.control("",[n.k0.required])})}handleServerError(s){let o="";s.error.errors.forEach(e=>{e.attribute&&this.form.contains(e.attribute)?this.form.controls[e.attribute].setErrors({serverError:e.detail}):o+=`${e.detail}\n`}),this.form.setErrors({serverError:o})}getErrorMessage(s){const o=this.form.get(s);for(const[e,g]of Object.entries(this.errors))if(o&&o.hasError(e)&&o.touched)return g;return null}static#r=this.\u0275fac=function(o){return new(o||i)};static#o=this.\u0275prov=r.jDH({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function b(i,l){if(1&i&&(r.j41(0,"mat-error"),r.EFF(1),r.k0s()),2&i){const s=r.XpG();r.R7$(),r.JRh(s.loginFormService.form.getError("serverError"))}}let j=(()=>{class i{constructor(){this.routerPaths=S.A,this.loginFormService=(0,r.WQX)(y),this.authorizationApiService=(0,r.WQX)(d.V),this.destroyRef=(0,r.WQX)(r.abz),this.changeDetectorRef=(0,r.WQX)(r.gRc),this.router=(0,r.WQX)(E.Ix)}onLoginSubmit(){if(this.loginFormService.form.invalid)return;const s=new R(this.loginFormService.form.getRawValue());this.authorizationApiService.login(s).pipe((0,h.pQ)(this.destroyRef),(0,u.W)(o=>(o instanceof F.yz&&(this.loginFormService.handleServerError(o),this.changeDetectorRef.markForCheck()),(0,p.$)(()=>o))),(0,v.M)(()=>{this.loginFormService.form.reset(),this.router.navigate([this.routerPaths.Main])})).subscribe()}static#r=this.\u0275fac=function(o){return new(o||i)};static#o=this.\u0275cmp=r.VBU({type:i,selectors:[["camp-login-form"]],standalone:!0,features:[r.aNF],decls:19,vars:6,consts:[[1,"login-form-wrapper"],[1,"login-header"],[1,"login-form",3,"ngSubmit","formGroup"],["appearance","outline",1,"login-form__field"],["matInput","","type","email","placeholder","ivan.pupkin@gmail.com",3,"formControl"],["matInput","","type","password","placeholder","veryStrongPassW0rd",3,"formControl"],["mat-raised-button","","type","submit"]],template:function(o,e){1&o&&(r.j41(0,"div",0)(1,"h2",1),r.EFF(2,"Login"),r.k0s(),r.j41(3,"form",2),r.bIt("ngSubmit",function(){return e.onLoginSubmit()}),r.j41(4,"mat-form-field",3)(5,"mat-label"),r.EFF(6,"Email"),r.k0s(),r.nrm(7,"input",4),r.j41(8,"mat-error"),r.EFF(9),r.k0s()(),r.j41(10,"mat-form-field",3)(11,"mat-label"),r.EFF(12,"Password"),r.k0s(),r.nrm(13,"input",5),r.j41(14,"mat-error"),r.EFF(15),r.k0s()(),r.DNE(16,b,2,1,"mat-error"),r.j41(17,"button",6),r.EFF(18," Login "),r.k0s()()()),2&o&&(r.R7$(3),r.Y8G("formGroup",e.loginFormService.form),r.R7$(4),r.Y8G("formControl",e.loginFormService.form.controls.email),r.R7$(2),r.JRh(e.loginFormService.getErrorMessage("email")),r.R7$(4),r.Y8G("formControl",e.loginFormService.form.controls.password),r.R7$(2),r.JRh(e.loginFormService.getErrorMessage("password")),r.R7$(),r.vxM(e.loginFormService.form.hasError("serverError")?16:-1))},dependencies:[n.X1,n.qT,n.me,n.BC,n.cb,n.l_,n.j4,a.RG,a.rl,a.nJ,a.TL,f.fS,f.fg,c.Hl,c.$z],styles:["[_nghost-%COMP%]{--login-form-min-width: 360px}.login-form-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:var(--space-xl)}.login-header[_ngcontent-%COMP%]{font-size:var(--font-size-xl)}.login-form[_ngcontent-%COMP%]{min-width:var(--login-form-min-width);padding:var(--space-m);border-radius:24px;border:2px var(--border-color) solid;display:flex;flex-direction:column;gap:var(--space-s);align-items:center}.login-form__field[_ngcontent-%COMP%]{width:100%}"],changeDetection:0})}return i})()}}]);