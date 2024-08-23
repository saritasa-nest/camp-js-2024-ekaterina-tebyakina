"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[543],{4543:($,f,o)=>{o.r(f),o.d(f,{RegistrationFormComponent:()=>P});var r=o(7788),u=o(7212),s=o(7222),l=o(6375),c=o(4587),d=o(2221),h=o(5860);class g extends h.b{constructor(m){super(),this.email=m.email,this.firstName=m.firstName,this.lastName=m.lastName,this.password=m.password}}var p=o(1051),v=o(4526),F=o(8823),E=o(7236),R=o(922),S=o(6409),C=o(8578);function y(i,m){return a=>{const e=a.controls[i],n=a.controls[m];return!e||!n||n.errors&&!n.errors.mustMatch||n.setErrors(e.value!==n.value?{mustMatch:!0}:null),null}}let j=(()=>{class i{constructor(){this.formBuilder=(0,r.WQX)(s.Qk),this.errors={required:"This field is required.",email:"Enter a valid email address.",mustMatch:"Passwords must match."},this.form=this.initialize()}initialize(){return this.formBuilder.group({email:this.formBuilder.control("",[s.k0.required,s.k0.email]),firstName:this.formBuilder.control("",[s.k0.required]),lastName:this.formBuilder.control("",[s.k0.required]),password:this.formBuilder.control("",[s.k0.required]),retypedPassword:this.formBuilder.control("",[s.k0.required])},{validators:y("password","retypedPassword")})}handleServerError(a){let t="";a.error.errors.forEach(e=>{e.attribute&&this.form.contains(e.attribute)?this.form.controls[e.attribute].setErrors({serverError:e.detail}):t+=`${e.detail}\n`}),this.form.setErrors({serverError:t})}getErrorMessage(a){const t=this.form.get(a);for(const[e,n]of Object.entries(this.errors))if(t&&t.hasError(e)&&t.touched)return n;return t&&t.hasError("serverError")&&t.touched?t.getError("serverError"):null}static#r=this.\u0275fac=function(t){return new(t||i)};static#t=this.\u0275prov=r.jDH({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function M(i,m){if(1&i&&(r.j41(0,"mat-error"),r.EFF(1),r.k0s()),2&i){const a=r.XpG();r.R7$(),r.JRh(a.registrationFormService.form.getError("serverError"))}}let P=(()=>{class i{constructor(){this.routerPaths=C.A,this.registrationFormService=(0,r.WQX)(j),this.authorizationApiService=(0,r.WQX)(p.V),this.router=(0,r.WQX)(R.Ix),this.destroyRef=(0,r.WQX)(r.abz),this.changeDetectorRef=(0,r.WQX)(r.gRc)}onRegistrationSubmit(){if(this.registrationFormService.form.invalid)return;const a=new g(this.registrationFormService.form.getRawValue());this.authorizationApiService.register(a).pipe((0,u.pQ)(this.destroyRef),(0,v.W)(t=>(t instanceof S.yz&&(this.registrationFormService.handleServerError(t),this.changeDetectorRef.markForCheck()),(0,F.$)(()=>t))),(0,E.M)(()=>{this.router.navigate([this.routerPaths.Main])})).subscribe()}static#r=this.\u0275fac=function(t){return new(t||i)};static#t=this.\u0275cmp=r.VBU({type:i,selectors:[["camp-registration-form"]],standalone:!0,features:[r.aNF],decls:37,vars:12,consts:[[1,"registration-form-wrapper"],[1,"registration-header"],[1,"registration-form",3,"ngSubmit","formGroup"],["appearance","outline",1,"registration-form__field"],["matInput","","type","email","placeholder","ivan.pupkin@gmail.com",3,"formControl"],["matInput","","type","text","placeholder","Ivan",3,"formControl"],["matInput","","type","text","placeholder","Pupkin",3,"formControl"],["matInput","","type","password","placeholder","veryStrongPassW0rd",3,"formControl"],["matInput","","type","password","placeholder","veryStrongPassW0rd","type","password",3,"formControl"],["mat-raised-button","","type","submit"]],template:function(t,e){1&t&&(r.j41(0,"div",0)(1,"h2",1),r.EFF(2,"Registration"),r.k0s(),r.j41(3,"form",2),r.bIt("ngSubmit",function(){return e.onRegistrationSubmit()}),r.j41(4,"mat-form-field",3)(5,"mat-label"),r.EFF(6,"Email"),r.k0s(),r.nrm(7,"input",4),r.j41(8,"mat-error"),r.EFF(9),r.k0s()(),r.j41(10,"mat-form-field",3)(11,"mat-label"),r.EFF(12,"First Name"),r.k0s(),r.nrm(13,"input",5),r.j41(14,"mat-error"),r.EFF(15),r.k0s()(),r.j41(16,"mat-form-field",3)(17,"mat-label"),r.EFF(18,"Last Name"),r.k0s(),r.nrm(19,"input",6),r.j41(20,"mat-error"),r.EFF(21),r.k0s()(),r.j41(22,"mat-form-field",3)(23,"mat-label"),r.EFF(24,"Password"),r.k0s(),r.nrm(25,"input",7),r.j41(26,"mat-error"),r.EFF(27),r.k0s()(),r.j41(28,"mat-form-field",3)(29,"mat-label"),r.EFF(30," Repeat the password"),r.k0s(),r.nrm(31,"input",8),r.j41(32,"mat-error"),r.EFF(33),r.k0s()(),r.DNE(34,M,2,1,"mat-error"),r.j41(35,"button",9),r.EFF(36," Register "),r.k0s()()()),2&t&&(r.R7$(3),r.Y8G("formGroup",e.registrationFormService.form),r.R7$(4),r.Y8G("formControl",e.registrationFormService.form.controls.email),r.R7$(2),r.JRh(e.registrationFormService.getErrorMessage("email")),r.R7$(4),r.Y8G("formControl",e.registrationFormService.form.controls.firstName),r.R7$(2),r.JRh(e.registrationFormService.getErrorMessage("firstName")),r.R7$(4),r.Y8G("formControl",e.registrationFormService.form.controls.lastName),r.R7$(2),r.JRh(e.registrationFormService.getErrorMessage("lastName")),r.R7$(4),r.Y8G("formControl",e.registrationFormService.form.controls.password),r.R7$(2),r.JRh(e.registrationFormService.getErrorMessage("password")),r.R7$(4),r.Y8G("formControl",e.registrationFormService.form.controls.retypedPassword),r.R7$(2),r.JRh(e.registrationFormService.getErrorMessage("retypedPassword")),r.R7$(),r.vxM(e.registrationFormService.form.hasError("serverError")?34:-1))},dependencies:[s.X1,s.qT,s.me,s.BC,s.cb,s.l_,s.j4,l.RG,l.rl,l.nJ,l.TL,c.fS,c.fg,d.Hl,d.$z],styles:["[_nghost-%COMP%]{--registration-form-min-width: 360px}.registration-form-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:var(--space-xl)}.registration-header[_ngcontent-%COMP%]{font-size:var(--font-size-xl)}.registration-form[_ngcontent-%COMP%]{min-width:var(--registration-form-min-width);padding:var(--space-m);border-radius:24px;border:2px var(--border-color) solid;display:flex;flex-direction:column;gap:var(--space-s);align-items:center}.registration-form__field[_ngcontent-%COMP%]{width:100%}"],changeDetection:0})}return i})()}}]);