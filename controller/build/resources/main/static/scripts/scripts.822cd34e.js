"use strict";angular.module("curriculumUiApp",["ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","ui.router","ui.bootstrap","ui.utils","ui.jq","ui.select","infinite-scroll","toaster"]).config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("home",{url:"/",templateUrl:"views/home.html",controller:"Home",controllerAs:"home"}).state("curriculum",{url:"/curriculum/:id",templateUrl:"views/curriculum.html",controller:"Curriculum",controllerAs:"curriculum"}).state("profile",{url:"/profile",templateUrl:"views/profile.html",controller:"Profile",controllerAs:"profile"}).state("admin",{url:"/admin",templateUrl:"views/admin.html",controller:"Admin",controllerAs:"admin"}).state("forgotpwd",{url:"/access/forgotpwd",templateUrl:"views/access/forgotpwd.html",controller:"Forgotpwd",controllerAs:"forgotpwd"}).state("signin",{url:"/access/signin",templateUrl:"views/access/signin.html",controller:"Signin",controllerAs:"signin"}).state("signup",{url:"/access/signup",templateUrl:"views/access/signup.html",controller:"Signup",controllerAs:"signup"}),b.otherwise("/")}]).config(["$httpProvider",function(a){document.curriculumHost=window.location.origin,a.defaults.useXDomain=!0,a.defaults.withCredentials=!0,delete a.defaults.headers.common["X-Requested-With"],a.interceptors.push(["$q","$location","$window",function(a,b,c){return{request:function(b){return b.url.startsWith("/api")&&(b.url=document.curriculumHost+b.url),b||a.when(b)},responseError:function(c){return-1===b.$$url.indexOf("/access/")&&(401===c.status?b.path("/access/signin"):403===c.status&&b.path("/")),a.reject(c)}}}])}]).run(["$rootScope","$window","$location","Auth",function(a,b,c,d){a.$on("$stateChangeStart",function(a){var e=d.getToken(),f=c.$$url.indexOf("/access/");e||-1!==f?e&&f>-1?(a.preventDefault(),c.path("/")):e&&!d.user.isPresent&&d.loadUser():(a.preventDefault(),d.toPath=c.$$url,b.location.assign("/#/access/signin"))})}]),angular.module("curriculumUiApp").controller("Main",["Auth",function(a){var b=this;b.user=a.user,b.logout=function(){a.logout()}}]),angular.module("curriculumUiApp").controller("Home",["Storage","Auth","toaster",function(a,b,c){var d=this;d.curriculumHost=document.curriculumHost,d.searchQuery="",d.infiniteScrollLoaded=!0,d.infiniteScrollFinished=!1,d.curriculums=[],d.isEditor=function(){return"ROLE_WRITE"===b.user.role||"ROLE_ADMIN"===b.user.role},d.isAuthor=function(a){return a.createdBy===b.user.id},d.loadCurriculums=function(){var b=0;return function(e){if(e||d.infiniteScrollLoaded){d.infiniteScrollLoaded=!1,c.wait("Завантаження навчальних планів",null,2e3),e&&(b=0,d.infiniteScrollFinished=!1);var f={};f.model="curriculums",f.limit=9,f.offset=b+=1,d.searchQuery&&(f.search=d.searchQuery),a.get(f,function(a){d.infiniteScrollLoaded=!0,e?d.curriculums=a.content:Array.prototype.push.apply(d.curriculums,a.content),a.totalElements===d.curriculums.length&&(d.infiniteScrollFinished=!0)},function(a){c.error("Error",a.data.message)})}}}()}]),angular.module("curriculumUiApp").controller("Profile",["$resource","Storage","toaster",function(a,b,c){var d=this;d.user={},d.password={},d.checkEmail=function(a){return a&&a!==d.checkedEmail&&b.get({model:"users",id:"email",action:a},function(b){d.checkedEmail=a,d.emailError=b.value&&d.user.oldEmail!==a?"Email is already in use":null}),!0},this.activate=function(){b.get({model:"users",id:"current"},function(a){d.user=a,d.user.oldEmail=d.user.email},function(a){c.error("Error",a.data.message)})},d.updateProfile=function(){b.update({model:"users",id:d.user.id},d.user,function(){c.success("Збережено")},function(a){c.error("Error",a.data.message)})},d.updatePassword=function(){d.passwordError=null,b.update({model:"users",id:d.user.id,action:"password"},d.password,function(){d.password={},c.success("Збережено")},function(a){d.passwordError=a.data.message,c.error("Error",a.data.message)})},this.activate()}]),angular.module("curriculumUiApp").controller("Admin",["Auth","Storage","toaster",function(a,b,c){var d=this;d.currentUser=a.user,d.searchQuery="",d.infiniteScrollLoaded=!0,d.infiniteScrollFinished=!1,d.users=[],d.saveUser=function(a){b.update({model:"users",id:a.id,action:"role"},a,function(){a.oldRole=a.role,c.warning("Збережено")},function(a){c.error("Error",a.data.message)})},d.loadUsers=function(){var a=0;return function(e){if(e||d.infiniteScrollLoaded){d.infiniteScrollLoaded=!1,c.wait("Завантаження користувачів",null,2e3),e&&(a=0,d.infiniteScrollFinished=!1);var f={};f.model="users",f.limit=50,f.offset=a+=1,d.searchQuery&&(f.search=d.searchQuery),b.get(f,function(a){d.infiniteScrollLoaded=!0,a.content.forEach(function(a){a.oldRole=a.role}),e?d.users=a.content:Array.prototype.push.apply(d.users,a.content),a.totalElements===d.users.length&&(d.infiniteScrollFinished=!0)},function(a){c.error("Error",a.data.message)})}}}(),d.highlightSearch=function(a){var b=d.searchQuery;return b&&a&&a.toLowerCase().indexOf(b.toLowerCase())>-1},d.constants={id:"default"},d.temporaryConstants={},d.constantTypes=[{title:"Галузі знань",type:"knowledgeBranch"},{title:"Напрями підготовки",type:"trainingDirection"},{title:"Спеціальності",type:"specialty"},{title:"Факультети",type:"faculty"},{title:"Кваліфікаційні рівні",type:"qualificationLevel"},{title:"Тип",type:"type"},{title:"Форми навчання",type:"studyForm"}],d.saveConstants=function(){b.save({model:"constants"},d.constants,function(){c.success("Збережено")},function(a){c.error("Error",a.data.message)})},d.activate=function(){d.constantTypes.forEach(function(a){d.constants[a.type]=[],d.temporaryConstants[a.type]=[]}),b.get({model:"constants",id:d.constants.id},function(a){d.constantTypes.forEach(function(b){a[b.type]&&(d.constants[b.type]=a[b.type],angular.copy(d.constants[b.type],d.temporaryConstants[b.type]))})},function(a){c.error("Error",a.data.message)})},d.activate()}]),angular.module("curriculumUiApp").controller("Curriculum",["$stateParams","Storage","toaster",function(a,b,c){var d=this;d.addModule=function(){d.curriculum.modules||(d.curriculum.modules=[]),d.curriculum.modules.push({code:d.curriculum.modules.length+1})},d.removeModule=function(a){d.curriculum.modules.splice(a,1);var b=0;d.curriculum.modules.forEach(function(a){a.code=++b})},d.addTextbook=function(){d.curriculum.textbooks||(d.curriculum.textbooks=[]),d.curriculum.textbooks.push({code:d.curriculum.textbooks.length+1})},d.removeTextbook=function(a){d.curriculum.textbooks.splice(a,1);var b=0;d.curriculum.textbooks.forEach(function(a){a.code=++b})},d.save=function(){d.curriculum.id?b.update({model:"curriculums",id:d.curriculum.id},d.curriculum,function(){c.success("Збережено")},function(a){c.error("Error",a.data.message)}):b.save({model:"curriculums"},d.curriculum,function(a){c.success("Збережено"),d.curriculum=a},function(a){c.error("Error",a.data.message)})},d.activate=function(){b.get({model:"constants",id:"default"},function(a){d.constants=a,d.activateCurriculum()},function(a){c.error("Error",a.data.message)})},d.activateCurriculum=function(){a.id?b.get({model:"curriculums",id:a.id},function(a){d.curriculum=a},function(a){c.error("Error",a.data.message)}):d.curriculum={knowledgeBranch:d.constants.knowledgeBranch[0],trainingDirection:d.constants.trainingDirection[0],specialty:d.constants.specialty[0],faculty:d.constants.faculty[0],qualificationLevel:d.constants.qualificationLevel[0],type:d.constants.type[0],studyForm:d.constants.studyForm[0],modules:[{code:1}],textbooks:[{code:1}]}},d.activate()}]),angular.module("curriculumUiApp").controller("Signin",["Auth",function(a){var b=this;b.user={},b.authError=a.authError,b.login=function(){a.login(b.user)}}]),angular.module("curriculumUiApp").controller("Signup",["$resource","Storage","Auth","toaster",function(a,b,c,d){var e=this;e.user={},e.checkEmail=function(a){return a&&a!==e.checkedEmail&&b.get({model:"users",id:"email",action:a},function(b){e.checkedEmail=a,e.authError=b.value?"Email is already in use":null}),!0},e.signup=function(){b.save({model:"users"},e.user,function(){c.login(e.user)},function(a){e.authError=a.data.message,d.error("Error",a.data.message)})}}]),angular.module("curriculumUiApp").controller("Forgotpwd",function(){}),angular.module("curriculumUiApp").service("Auth",["$location","$http","$cookies","Storage","toaster",function(a,b,c,d,e){var f=this;f.user={isPresent:!1},f.authError={},f.getToken=function(){var a=c.get("X-Auth-Token");return a},f.loadUser=function(){d.get({model:"authentications"},function(a){f.authError.message=null,f.user.isPresent=!0,f.user.id=a.id,f.user.fullName=a.fullName,f.user.role=a.role},function(a){f.authError.message=a.data.message,e.error("Error",a.data.message)})},f.login=function(b){e.wait("Логін",null,1e3),d.save({model:"authentications"},b,function(){var b=f.toPath?f.toPath:"/";a.path(b)},function(a){f.authError.message=a.data.message,e.error("Error",a.data.message)})},f.logout=function(){f.user.isPresent=!1,delete f.user.id,delete f.user.fullName,delete f.user.role,d["delete"]({model:"authentications"},function(){a.path("/access/signin")},function(a){f.authError.message=a.data.message,e.error("Error",a.data.message)})}}]),angular.module("curriculumUiApp").factory("Storage",["$resource",function(a){return a("/api/:model/:id/:action",{},{replace:{method:"PUT"},update:{method:"PATCH"}})}]),angular.module("curriculumUiApp").directive("constantsForm",function(){return{replace:!0,restrict:"E",templateUrl:"views/directives/constants-form.html",scope:{categoryName:"@",originalArray:"=",categoryArray:"=",saveConstants:"="},link:function(a){a.addCategory=function(){this.categoryArray.push("")},a.deleteCategory=function(a){this.categoryArray.splice(a,1)},a.cancelCategory=function(){angular.copy(this.originalArray,this.categoryArray)},a.saveCategory=function(){angular.copy(this.categoryArray,this.originalArray),this.saveConstants()}}}}),angular.module("curriculumUiApp").run(["$templateCache",function(a){a.put("views/access/forgotpwd.html",'<div class="access container w-xl w-auto-xs"> <div class="m-b-lg"> <div class="wrapper text-center"> <strong>Input your email to reset your password</strong> </div> <form name="reset" ng-init="isCollapsed=true"> <div class="list-group list-group-sm"> <div class="list-group-item"> <input type="email" placeholder="Email" ng-model="email" class="form-control no-border" required> </div> </div> <button type="submit" ng-disabled="reset.$invalid" class="btn btn-lg btn-primary btn-block" ng-click="isCollapsed = !isCollapsed">Send</button> </form> <div collapse="isCollapsed" class="m-t"> <div class="alert alert-success"> <p>A reset link sent to your email address, please check it in 7 days. <a ui-sref="signin" class="btn btn-sm btn-success">Sign in</a></p> </div> </div> </div> </div>'),a.put("views/access/signin.html",'<div class="access container w-xxl w-auto-xs"> <div class="m-b-lg"> <div class="wrapper text-center"> <h3>Sign in</h3> </div> <form name="form" class="form-validation"> <div class="text-danger wrapper text-center" ng-show="signin.authError.message"> {{signin.authError.message}} </div> <div class="list-group list-group-sm"> <div class="list-group-item"> <input type="email" placeholder="Email" class="form-control no-border" ng-model="signin.user.email" required> </div> <div class="list-group-item"> <input type="password" placeholder="Password" class="form-control no-border" ng-model="signin.user.password" required> </div> </div> <button type="submit" class="btn btn-lg btn-primary btn-block" ng-click="signin.login()" ng-disabled="form.$invalid">Log in</button> <div class="text-center m-t m-b"><a ui-sref="forgotpwd">Forgot password?</a></div> <div class="line line-dashed"></div> <p class="text-center"> <small>Do not have an account?</small> </p> <a ui-sref="signup" class="btn btn-lg btn-default btn-block">Create an account</a> </form> </div> </div>'),a.put("views/access/signup.html",'<div class="access container w-xxl w-auto-xs"> <div class="m-b-lg"> <div class="wrapper text-center"> <h3>Sign up</h3> </div> <form name="form" class="form-validation"> <div class="text-danger text-center" ng-show="signup.authError"> <h4>{{signup.authError}}</h4> </div> <div class="list-group list-group-sm"> <div class="list-group-item"> <input placeholder="Прізвище" class="form-control no-border" ng-model="signup.user.lastName" required ng-minlength="3"> </div> <div class="list-group-item"> <input placeholder="Ім\'я" class="form-control no-border" ng-model="signup.user.firstName" required ng-minlength="3"> </div> <div class="list-group-item"> <input placeholder="По батькові" class="form-control no-border" ng-model="signup.user.patronymicName" required ng-minlength="3"> </div> <div class="list-group-item"> <input placeholder="Посада" class="form-control no-border" ng-model="signup.user.position" required ng-minlength="5"> </div> <div class="list-group-item"> <input placeholder="Кафедра" class="form-control no-border" ng-model="signup.user.department" required ng-minlength="5"> </div> <div class="list-group-item"> <input type="email" placeholder="Емейл" class="form-control no-border" ng-model="signup.user.email" required ui-validate=" \'signup.checkEmail($value) && !signup.authError\' " ng-model-options="{debounce: 1000}" ui-validate-watch=" \'signup.authError\' "> </div> <div class="list-group-item"> <input type="password" placeholder="Пароль" class="form-control no-border" ng-model="signup.user.password" required ng-minlength="5"> </div> <div class="list-group-item"> <input type="password" placeholder="Підтвердження паролю" class="form-control no-border" ng-model="signup.user.verifyPassword" required ui-validate=" \'$value==signup.user.password\' " ui-validate-watch=" \'signup.user.password\' "> </div> </div> <br> <button type="submit" class="btn btn-lg btn-primary btn-block" ng-click="signup.signup()" ng-disabled="form.$invalid">Sign up</button> <div class="line line-dashed"></div> <p class="text-center"><span>Already have an account?</span></p> <a ui-sref="signin" class="btn btn-lg btn-default btn-block">Sign in</a> </form> </div> </div>'),a.put("views/admin.html",'<div class="m-t-xl panel"> <tabset justified="true" class="tab-container wrapper-md"> <tab heading="Користувачі"> <input type="text" class="col-sm-6 form-control input-lg m-t m-b" placeholder="Пошук..." ng-model="admin.searchQuery" ng-change="admin.loadUsers(true)" ng-model-options="{debounce: 500}"> <table class="table table-bordered table-hover table-condensed bg-white-only m-t-lg"> <thead class="text-center"> <tr> <th class="text-center">Імя</th> <th class="text-center">Прізвище</th> <th class="text-center">По батькові</th> <th class="text-center">Емейл</th> <th class="text-center w-lg">Роль</th> <th class="w-xs"></th> </tr> </thead> <tbody infinite-scroll="admin.loadUsers()" infinite-scroll-disabled="admin.infiniteScrollFinished"> <tr ng-repeat="user in admin.users"> <td class="text-center"><label class="text-center font-normal m-t-xs" ng-class="{ \'highlight-search\': admin.highlightSearch(user.firstName) }">{{user.firstName}}</label> </td> <td class="text-center"><label class="text-center font-normal m-t-xs" ng-class="{ \'highlight-search\': admin.highlightSearch(user.lastName) }">{{user.lastName}}</label> </td> <td class="text-center"><label class="text-center font-normal m-t-xs" ng-class="{ \'highlight-search\': admin.highlightSearch(user.patronymicName) }">{{user.patronymicName}}</label> </td> <td class="text-center"><label class="text-center font-normal m-t-xs" ng-class="{ \'highlight-search\': admin.highlightSearch(user.email) }">{{user.email}}</label> </td> <td class="text-center"> <div class="btn-group" ng-show="user.id !== admin.currentUser.id"> <label class="btn btn-default" ng-model="user.role" btn-radio="\'ROLE_READ\'">Read</label> <label class="btn btn-default" ng-model="user.role" btn-radio="\'ROLE_WRITE\'">Write</label> <label class="btn btn-default" ng-model="user.role" btn-radio="\'ROLE_ADMIN\'">Admin</label> </div> <div class="btn-group" ng-show="user.id === admin.currentUser.id"> <p class="m-t-xs font-bold">Admin</p> </div> </td> <td> <button type="button" ng-click="admin.saveUser(user)" class="form-control btn btn-sm btn-danger m-t-xxs" ng-if="user.oldRole !== user.role"> Зберегти </button> </td> </tr> </tbody> </table> </tab> <tab heading="Контент"> <tabset justified="true" class="tab-container m-t-lg"> <tab ng-repeat="constantType in admin.constantTypes" heading="{{constantType.title}}"> <constants-form category-name="{{constantType.title}}" category-array="admin.temporaryConstants[constantType.type]" original-array="admin.constants[constantType.type]" save-constants="admin.saveConstants"></constants-form> </tab> </tabset> </tab> </tabset> </div>'),a.put("views/curriculum.html",'<div class="m-t-xl wrapper-md panel"> <tabset justified="true" class="tab-container" ng-init="steps={percent:0, step1:false, step2:false, step3:false, step4:false, step5:false}"> <tab heading="ПРОГРАМА НАВЧАЛЬНОЇ ДИСЦИПЛІНИ" active="steps.step1" select="steps.percent=0"> <br> <progressbar value="steps.percent" class="progress-xs" type="success"></progressbar> <form name="step1" class="form-validation"> <div class="row m-l"> <div class="form-group"> <label class="col-sm-3 control-label m-t-sm">Назва</label> <div class="col-sm-9"> <input type="text" class="form-control" placeholder="Фінансова математика" name="name" ng-model="curriculum.curriculum.name" required> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-sm">Галузь знань</label> <div class="col-sm-9"> <ui-select ng-model="curriculum.curriculum.knowledgeBranch" theme="bootstrap"> <ui-select-match>{{$select.selected}}</ui-select-match> <ui-select-choices repeat="item in curriculum.constants.knowledgeBranch | filter: $select.search"> <div ng-bind-html="item | highlight: $select.search"></div> </ui-select-choices> </ui-select> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-sm">Напрям підготовки</label> <div class="col-sm-9"> <ui-select ng-model="curriculum.curriculum.trainingDirection" theme="bootstrap"> <ui-select-match>{{$select.selected}}</ui-select-match> <ui-select-choices repeat="item in curriculum.constants.trainingDirection | filter: $select.search"> <div ng-bind-html="item | highlight: $select.search"></div> </ui-select-choices> </ui-select> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-sm">Для спеціальності</label> <div class="col-sm-9"> <ui-select ng-model="curriculum.curriculum.specialty" theme="bootstrap"> <ui-select-match>{{$select.selected}}</ui-select-match> <ui-select-choices repeat="item in curriculum.constants.specialty | filter: $select.search"> <div ng-bind-html="item | highlight: $select.search"></div> </ui-select-choices> </ui-select> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-sm">Факультету</label> <div class="col-sm-9"> <ui-select ng-model="curriculum.curriculum.faculty" theme="bootstrap"> <ui-select-match>{{$select.selected}}</ui-select-match> <ui-select-choices repeat="item in curriculum.constants.faculty | filter: $select.search"> <div ng-bind-html="item | highlight: $select.search"></div> </ui-select-choices> </ui-select> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-sm">Форма навчання</label> <div class="col-sm-9"> <ui-select ng-model="curriculum.curriculum.studyForm" theme="bootstrap"> <ui-select-match>{{$select.selected}}</ui-select-match> <ui-select-choices repeat="item in curriculum.constants.studyForm | filter: $select.search"> <div ng-bind-html="item | highlight: $select.search"></div> </ui-select-choices> </ui-select> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-sm">Семестр</label> <div class="col-sm-9"> <input type="number" class="form-control" placeholder="1" name="term" ng-model="curriculum.curriculum.term" ui-validate=" \'$value >= 0\' " required> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-sm">Тип</label> <div class="col-sm-9"> <ui-select ng-model="curriculum.curriculum.type" theme="bootstrap"> <ui-select-match>{{$select.selected}}</ui-select-match> <ui-select-choices repeat="item in curriculum.constants.type | filter: $select.search"> <div ng-bind-html="item | highlight: $select.search"></div> </ui-select-choices> </ui-select> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-sm">Кваліфікаційний рівень</label> <div class="col-sm-9"> <ui-select ng-model="curriculum.curriculum.qualificationLevel" theme="bootstrap"> <ui-select-match>{{$select.selected}}</ui-select-match> <ui-select-choices repeat="item in curriculum.constants.qualificationLevel | filter: $select.search"> <div ng-bind-html="item | highlight: $select.search"></div> </ui-select-choices> </ui-select> </div> </div> </div> <div class="text-right m-t-md"> <button type="submit" class="btn btn-default btn-rounded" ng-class="{ \'btn-success\': step1.$valid }" ng-click="step1.$valid ? (steps.step2=true) : (steps.step2=false)">Next </button> </div> </form> </tab> <tab heading="РІВЕНЬ СФОРМОВАНОСТІ ВМІНЬ І ЗНАНЬ" disabled active="steps.step2" select="steps.percent=20"> <form name="step2" class="form-validation"> <br> <progressbar value="steps.percent" class="progress-xs" type="success"></progressbar> <table class="table table-bordered table-hover table-condensed bg-white-only text-black"> <thead> <tr> <th rowspan="2" class="text-center w-xxs">Шифр змістового модуля</th> <th colspan="2" class="text-center">Зміст умінь і знань, що забезпечується</th> <th rowspan="2" class="w-xxs"></th> </tr> <tr> <th class="text-center w-md">Назва</th> <th class="text-center">Опис</th> </tr> </thead> <tbody> <tr ng-repeat="module in curriculum.curriculum.modules"> <td><label class="form-control m-t-lg text-center">ЗМ{{module.code}}</label> </td> <td><input type="text" class="form-control m-t-lg" placeholder="Прості, складні та неперервні відсотки" name="name" ng-model="module.name" required></td> <td><textarea class="form-control" rows="4" placeholder="Предмет фінансової математики. Вартість грошей і час. Вплив часу на фінансові розрахунки. Проценти, види процентних ставок. Нарощення та дисконтування за простими відсотковими ставками. Нарощення процентів у простому користувацькому кредиті. Конверсія валюти та нарощення процентів. Визначення інших параметрів фінансових угод із простими ставками. Нарахування складних річних відсотків. Нарощення відсотків m разів у році. Номінальна та ефективна ставки. Дисконтування за складними ставками. Визначення інших параметрів угод із складними ставками. Еквівалентність відсоткових ставок. Зміна умов контрактів. Неперервне нарощення та дисконтування. Неперервні відсотки." name="description" ng-model="module.description" required>\r\n              </textarea> </td> <td> <button type="button" ng-click="curriculum.removeModule($index)" class="btn btn-sm btn-danger m-t-lg"> Delete </button> </td> </tr> </tbody> </table> <div class="text-center m-t-md"> <button type="button" class="btn btn-primary btn-rounded" ng-click="curriculum.addModule()">Додати модуль </button> </div> <div class="text-right m-t-md"> <button type="button" class="btn btn-default btn-rounded" ng-click="steps.step1=true">Prev</button> <button type="submit" ng-disabled="step2.$invalid" class="btn btn-default btn-rounded" ng-class="{ \'btn-success\': step2.$valid }" ng-click="step2.$valid ? (steps.step3=true) : (steps.step3=false)">Next </button> </div> </form> </tab> <tab heading="ІНФОРМАЦІЙНИЙ ОБСЯГ ДИСЦИПЛІНИ" disabled active="steps.step3" select="steps.percent=40"> <form name="step3" class="form-validation"> <br> <progressbar value="steps.percent" class="progress-xs" type="success"></progressbar> <div> <p><b>Лекційний курс</b></p> <table class="table table-bordered table-hover table-condensed bg-white-only text-black"> <thead> <tr> <th class="text-center w-xs">Шифр змістового модуля</th> <th class="text-center">Назва змістового модуля</th> <th class="text-center w-xs">Кількість ауд. годин</th> </tr> </thead> <tbody> <tr ng-repeat="module in curriculum.curriculum.modules"> <td class="text-center">ЗМ{{module.code}} </td> <td>{{module.name}}</td> <td><input type="number" class="form-control" placeholder="1" name="code" ng-model="module.lectures" ui-validate=" \'$value >= 0\' " required></td> </tr> </tbody> </table> </div> <div> <p><b>Лабораторні заняття</b></p> <table class="table table-bordered table-hover table-condensed bg-white-only text-black"> <thead> <tr> <th class="text-center w-xs">Шифр змістового модуля</th> <th class="text-center">Назва змістового модуля</th> <th class="text-center w-xs">Кількість ауд. годин</th> </tr> </thead> <tbody> <tr ng-repeat="module in curriculum.curriculum.modules"> <td class="text-center">ЗМ{{module.code}} </td> <td>{{module.name}}</td> <td><input type="number" class="form-control" placeholder="1" name="code" ng-model="module.laboratories" ui-validate=" \'$value >= 0\' " required></td> </tr> </tbody> </table> </div> <div> <p class="text-center"><b>Самостійна робота студента (денна форма навчання)</b></p> <div class="row"> <div class="col-sm-6"> <p class="text-center"><b>Підготовка до лабораторних занять</b></p> <div class="row"> <div class="form-group"> <label class="col-sm-5 control-label">Кількість тижнів</label> <div class="col-sm-7"> <input type="number" class="form-control" placeholder="0" name="laboratory-count" ng-model="curriculum.curriculum.individualWork.laboratory.count" ui-validate=" \'$value >= 0\' " required> </div> </div> <div class="form-group"> <label class="col-sm-5 control-label">Тривалість (год)</label> <div class="col-sm-7"> <input type="number" class="form-control" placeholder="0" name="laboratory-durability" ng-model="curriculum.curriculum.individualWork.laboratory.durability" ui-validate=" \'$value >= 0\' " step="0.5" required> </div> </div> </div> </div> <div class="col-sm-6"> <p class="text-center"><b>Підготовка до колоквіуму (модуля)</b></p> <div class="row"> <div class="form-group"> <label class="col-sm-5 control-label">Кількість модулів</label> <div class="col-sm-7"> <input type="number" class="form-control" placeholder="0" name="colloquium-count" ng-model="curriculum.curriculum.individualWork.colloquium.count" ui-validate=" \'$value >= 0\' " required> </div> </div> <div class="form-group"> <label class="col-sm-5 control-label">Тривалість (год)</label> <div class="col-sm-7"> <input type="number" class="form-control" placeholder="0" name="colloquium-durability" ng-model="curriculum.curriculum.individualWork.colloquium.durability" ui-validate=" \'$value >= 0\' " step="0.5" required> </div> </div> </div> </div> </div> </div> <div class="text-right m-t-md"> <button type="button" class="btn btn-default btn-rounded" ng-click="steps.step1=true">Prev</button> <button type="submit" ng-disabled="step3.$invalid" class="btn btn-default btn-rounded" ng-class="{ \'btn-success\': step3.$valid }" ng-click="step3.$valid ? (steps.step4=true) : (steps.step4=false)">Next </button> </div> </form> </tab> <tab heading="ПЕРЕЛІК РЕКОМЕНДОВАНИХ ПІДРУЧНИКІВ" disabled active="steps.step4" select="steps.percent=60"> <form name="step4" class="form-validation"> <br> <progressbar value="steps.percent" class="progress-xs" type="success"></progressbar> <table class="table table-bordered table-hover table-condensed bg-white-only text-black"> <thead> <tr> <th class="text-center w-xxs">Номер</th> <th class="text-center">ПІДРУЧНИК / НАВЧАЛЬНИЙ ПОСІБНИК</th> <th class="w-xxs"></th> </tr> </thead> <tbody> <tr ng-repeat="textbook in curriculum.curriculum.textbooks"> <td> <label class="text-center m-t-sm form-control">{{textbook.code}}</label> </td> <td><textarea class="form-control" rows="2" placeholder="Васильченко І. П., Васильченко З. М. Фінансова математика: навчальний посібник / І. П. Васильченко, З. М. Васильченко. – К.: Кондор, 2007. – 184 с." name="textbook" ng-model="textbook.value" required>\r\n              </textarea> </td> <td> <button type="button" ng-click="curriculum.removeTextbook($index)" class="btn btn-sm btn-danger m-t-sm"> Delete </button> </td> </tr> </tbody> </table> <div class="text-center m-t-md"> <button type="button" class="btn btn-primary btn-rounded" ng-click="curriculum.addTextbook()">Додати підручник </button> </div> <div class="text-right m-t-md"> <button type="button" class="btn btn-default btn-rounded" ng-click="steps.step1=true">Prev</button> <button type="submit" ng-disabled="step4.$invalid" class="btn btn-default btn-rounded" ng-class="{ \'btn-success\': step4.$valid }" ng-click="step4.$valid ? (steps.step5=true) : (steps.step5=false)">Next </button> </div> </form> </tab> <tab heading="ЗАСОБИ ДІАГНОСТИКИ ПОТОЧНОЇ УСПІШНОСТІ" disabled active="steps.step5" select="steps.percent=80"> <form name="step5" class="form-validation"> <br> <progressbar value="steps.percent" class="progress-xs" type="success"></progressbar> <div class="row"> <div class="form-group"> <label class="col-sm-9 control-label m-t-xs">Виконання домашніх завдань, відповіді та самостійна робота на лабораторних заняттях (ма-ксимум)</label> <div class="col-sm-3"> <input type="number" class="form-control" placeholder="10" name="homework" ng-model="curriculum.curriculum.individualWork.laboratory.progress" ui-validate=" \'$value >= 0\' " required> </div> </div> <div class="form-group"> <label class="col-sm-9 control-label m-t-xs">Результати колоквіумів (максимум)</label> <div class="col-sm-3"> <input type="number" class="form-control" placeholder="40" name="colloquium" ng-model="curriculum.curriculum.individualWork.colloquium.progress" ui-validate=" \'$value >= 0\' " required> </div> </div> </div> <div class="text-right m-t-md"> <button type="button" class="btn btn-default btn-rounded" ng-click="steps.step1=true">Prev</button> <button type="submit" ng-disabled="step5.$invalid" class="btn btn-default btn-rounded" ng-class="{ \'btn-success\': step5.$valid }" ng-click="steps.percent=100; curriculum.save();">Finish </button> </div> </form> </tab> </tabset> </div>'),a.put("views/directives/constants-form.html",'<form name="contentForm" class="form-validation"> <div class="m-t-lg m-b-lg"> <h4 class="text-center">{{categoryName}}</h4> <button type="button" class="btn btn-primary btn-rounded pull-right m-t-n-lg" ng-disabled="contentForm.$invalid" ng-click="addCategory()">Додати </button> </div> <div class="row m-t-xs" ng-repeat="category in categoryArray track by $index"> <div class="col-sm-3"></div> <div class="col-sm-6"> <input type="text" class="form-control" ng-model="categoryArray[$index]" required> </div> <div class="col-sm-3"> <button type="button" class="btn btn-danger btn-rounded pull-left" ng-click="deleteCategory($index)"><i class="fa fa-times"></i> </button> </div> </div> <div class="text-center m-t-xl" ng-show="originalArray.length || categoryArray.length"> <button type="button" class="btn btn-success btn-rounded m-r-lg" ng-disabled="contentForm.$invalid" ng-click="saveCategory()">Зберегти </button> <button type="button" class="btn btn-danger btn-rounded m-l-lg" ng-click="cancelCategory()">Відмінити </button> </div> </form>'),a.put("views/home.html",'<div class="m-t-xxl"> <div class="text-right m-b-n m-t-n row"> <div class="col-sm-8"> <input type="text" class="form-control col-sm-12 transparent-box" placeholder="Пошук..." ng-model="home.searchQuery" ng-change="home.loadCurriculums(true)" ng-model-options="{debounce: 500}"> </div> <div class="col-sm-4"> <button type="button" class="btn btn-success btn-rounded" ng-hide="!home.isEditor()" ui-sref="curriculum({id: \'\' })">Створити </button> </div> </div> <hr> <div class="row" infinite-scroll="home.loadCurriculums()" infinite-scroll-disabled="home.infiniteScrollFinished"> <div ng-repeat="curriculum in home.curriculums" class="col-sm-4"> <div class="panel preview-box" ng-mouseover="curriculum.showActions = true" ng-mouseout="curriculum.showActions = false"> <h4 class="text-center"><b>{{curriculum.name}}</b></h4> <div class="row wrapper-xs"> <div class="col-sm-5"><b>Галузь знань:</b></div> <div class="col-sm-7">{{curriculum.knowledgeBranch}}</div> </div> <div class="row wrapper-xs"> <div class="col-sm-5"><b>Напряму підготовки:</b></div> <div class="col-sm-7">{{curriculum.trainingDirection}}</div> </div> <div class="row wrapper-xs"> <div class="col-sm-5"><b>Для спеціальності:</b></div> <div class="col-sm-7">{{curriculum.specialty}}</div> </div> <div class="row wrapper-xs"> <div class="col-sm-5"><b>Факультету:</b></div> <div class="col-sm-7">{{curriculum.faculty}}</div> </div> <div class="row wrapper-xs"> <div class="col-sm-5"><b>Кваліфікаційний рівень:</b></div> <div class="col-sm-7">{{curriculum.qualificationLevel}}</div> </div> <div class="preview-box-actions" ng-hide="!curriculum.showActions"> <a ui-sref="curriculum({id: \'{{curriculum.id}}\' })" class="padder" ng-show="home.isAuthor(curriculum) && home.isEditor()"><i class="fa fa-pencil-square-o"></i></a> <a href="{{home.curriculumHost}}/api/curriculums/{{curriculum.id}}/pdf" class="padder"><i class="fa fa-download"></i></a> <a href="{{home.curriculumHost}}/api/curriculums/{{curriculum.id}}/pdf" class="padder"><i class="fa fa-file-pdf-o"></i></a> </div> </div> </div> </div> </div>'),
a.put("views/profile.html",'<div class="m-t-xxl panel"> <form name="profileForm" class="form-validation"> <div class="text-center"> <h4>Персональна інформація</h4> </div> <div class="text-danger text-center" ng-show="profile.emailError"> <h4>{{profile.emailError}}</h4> </div> <div class="row m-t padder"> <div class="form-group"> <label class="col-sm-3 control-label m-t-xs">Прізвище</label> <div class="col-sm-9"> <input type="text" class="form-control" name="lastName" ng-model="profile.user.lastName" required ng-minlength="3"> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-xs">Ім\'я</label> <div class="col-sm-9"> <input type="text" class="form-control" name="firstName" ng-model="profile.user.firstName" required ng-minlength="3"> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-xs">По батькові</label> <div class="col-sm-9"> <input type="text" class="form-control" name="patronymicName" ng-model="profile.user.patronymicName" required ng-minlength="3"> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-xs">Посада</label> <div class="col-sm-9"> <input type="text" class="form-control" name="position" ng-model="profile.user.position" required ng-minlength="5"> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-xs">Кафедра</label> <div class="col-sm-9"> <input type="text" class="form-control" name="department" ng-model="profile.user.department" required ng-minlength="5"> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-xs">Емейл</label> <div class="col-sm-9"> <input type="email" class="form-control" name="email" ng-model="profile.user.email" required ui-validate=" \'profile.checkEmail($value) && !profile.emailError\' " ng-model-options="{debounce: 1000}" ui-validate-watch=" \'profile.emailError\' "> </div> </div> <div class="col-sm-12"> <button type="button" class="btn btn-primary btn-rounded pull-right m-t w-xs" ng-disabled="profileForm.$invalid" ng-click="profile.updateProfile()">Зберегти </button> </div> </div> </form> <form name="passwordForm" class="form-validation" autocomplete="off"> <div class="text-center"> <h4>Зміна паролю</h4> </div> <div class="text-danger text-center" ng-show="profile.passwordError"> <h4>{{profile.passwordError}}</h4> </div> <div class="row m-t m-b padder"> <div class="form-group"> <label class="col-sm-3 control-label m-t-xs">Пароль</label> <div class="col-sm-9"> <input type="password" class="form-control" name="old-password" autocomplete="new-password" ng-model="profile.password.password" required ng-minlength="5"> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-xs">Новий пароль</label> <div class="col-sm-9"> <input type="password" class="form-control" name="new-password" ng-model="profile.password.newPassword" required ng-minlength="5"> </div> </div> <br> <div class="form-group"> <label class="col-sm-3 control-label m-t-xs">Підтвердження паролю</label> <div class="col-sm-9"> <input type="password" class="form-control" name="confirm-password" ng-model="profile.password.confirmPassword" required ng-minlength="5" ui-validate=" \'$value==profile.password.newPassword\' " ui-validate-watch=" \'profile.password.newPassword\' "> </div> </div> <br> <div class="col-sm-12"> <button type="button" class="btn btn-primary btn-rounded pull-right m-t m-b w-xs" ng-disabled="passwordForm.$invalid" ng-click="profile.updatePassword()">Змінити </button> </div> <br> </div> </form> </div>')}]);