module.exports = [
    "$document",
    "$http",
    "$timeout",
    "$rootScope",
    function ($document, $http, $timeout, $rootScope) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                'user': '='
            },
            template: `
                <div class="container-fluid page-body-wrapper">
                    <div class="row" ng-show="state == 'login'">
                        <div class="content-wrapper full-page-wrapper d-flex align-items-center auth-pages">
                            <div class="card col-lg-4 mx-auto">
                                <div class="card-body px-5 py-5">
                                    <h3 class="card-title text-left mb-3">Login</h3>
                                    <form>
                                        <div class="form-group">
                                            <label>Username or email *</label>
                                            <input type="text" class="form-control p_input" ng-model="user.email">
                                        </div>
                                        <div class="form-group">
                                            <label>Password *</label>
                                            <input type="password" class="form-control p_input" ng-model="user.password">
                                        </div>
                                        <div class="form-group d-flex align-items-center justify-content-between">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input type="checkbox" class="form-check-input" ng-model="user.remember">
                                                    Remember me?
                                                    <i class="input-helper"></i></label>
                                            </div>
                                            <a href="#" class="forgot-pass">Forgot password</a>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary btn-block enter-btn" ng-click="login()">Login</button>
                                        </div>
                                        <p class="sign-up">Don't have an Account?<a href="#" ng-click="showRegister()"> Sign Up</a></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row"  ng-show="state == 'register'">
                        <div class="content-wrapper full-page-wrapper d-flex align-items-center auth-pages">
                            <div class="card col-lg-4 mx-auto">
                                <div class="card-body px-5 py-5">
                                    <h3 class="card-title text-left mb-3">Register</h3>
                                    <form>
                                        <div class="form-group">
                                            <label>Name</label>
                                            <input type="text" class="form-control p_input" ng-model="user.name">
                                        </div>
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="email" class="form-control p_input" ng-model="user.email">
                                        </div>
                                        <div class="form-group">
                                            <label>Password</label>
                                            <input type="password" class="form-control p_input" ng-model="user.password">
                                        </div>
                                        <div class="form-group d-flex align-items-center justify-content-between">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input type="checkbox" class="form-check-input" ng-model="user.remember">
                                                    Remember me
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>
                                            <a href="#" class="forgot-pass">Forgot password</a>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary btn-block enter-btn">Login</button>
                                        </div>
                                        <p class="sign-up text-center">Already have an Account?<a href="#" ng-click="showLogin()"> Sign In</a></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            link: (scope, element, attrs) => {
                scope.state = 'login';

                scope.showLogin = () => {
                    scope.state = 'login';
                };

                scope.showRegister = () => {
                    scope.state = 'register';
                };

                scope.login = () => {
                    if(!(scope.user && scope.user.email && scope.user.password)){
                        return;
                    }
                    $http.post('/login', scope.user).then((data) => {
                        if (data.data.success && data.data.success === true) {
                            let user = data.data;
                            delete user.success;
                            $rootScope.$applyAsync(() => {
                                $rootScope.user = user;
                            });
                            //console.log(user);
                            window.changeState('loggedin');
                        }
                    }, (error) => {
                        console.log(error);
                    });
                };
            }
        };
    }
];