module.exports = [
    "$document",
    "$http",
    "$timeout",
    function ($document, $http, $timeout) {
        return {
            restrict: 'AE',
            scope: {
                'user': '='
            },
            template: `
            <div class="login">
                <div class="login__block" ng-class="{'toggled': state == 'login'}" id="l-login">
                    <div class="login__block__header">
                        <i class="zmdi zmdi-account-circle"></i>
                        Hi there! Please Sign in            
                        <div class="actions login__block__actions">
                            <dropdown fields="loginDropdown"></dropdown>
                        </div>
                    </div>
            
                    <div class="login__block__body">
                        <form-input label="Email Address" type="text" classes="form-group form-group--float form-group--centered form-group--centered" model="user.email"></form-input>
                        
                        <form-input label="Password" type="password" classes="form-group form-group--float form-group--centered form-group--centered" model="user.password"></form-input>
            
                        <button class="btn btn--light btn--icon m-t-15" ng-click="login()"><i class="zmdi zmdi-long-arrow-right"></i></button>
                    </div>
                </div>
                <div class="login__block" ng-class="{'toggled': state == 'register'}" id="l-register">
                    <div class="login__block__header palette-Blue bg">
                        <i class="zmdi zmdi-account-circle"></i>
                        Create an account
                        <div class="actions login__block__actions">
                            <dropdown fields="registerDropdown"></dropdown>
                        </div>
                    </div>
            
                    <div class="login__block__body">
                    
                        <form-input label="Name" type="text" classes="form-group form-group--float form-group--centered form-group--centered" model="user.name"></form-input>
                        <form-input label="Email Address" type="text" classes="form-group form-group--float form-group--centered form-group--centered" model="user.email"></form-input>
                        <form-input label="Password" type="password" classes="form-group form-group--float form-group--centered form-group--centered" model="user.password"></form-input>
                        <div class="input-centered">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" value="" ng-model="user.agb">
                                    <i class="input-helper"></i>
                                    Accept the license agreement
                                </label>
                            </div>
                        </div>
            
                        <button class="btn btn--light btn--icon m-t-15" ng-click="register()"><i class="zmdi zmdi-plus"></i></button>
                    </div>
                </div>
            
                <!-- Forgot Password -->
                <div class="login__block" ng-class="{'toggled': state == 'forgotpassword'}" id="l-forget-password">
                    <div class="login__block__header palette-Purple bg">
                        <i class="zmdi zmdi-account-circle"></i>
                        Forgot Password?
            
                        <div class="actions login__block__actions">
                            <dropdown fields="forgotpasswordDropdown"></dropdown>
                        </div>
                    </div>
            
                    <div class="login__block__body">
                        <p class="m-t-30">Lorem ipsum dolor fringilla enim feugiat commodo sed ac lacus.</p>
            
                        <div class="form-group form-group--float form-group--centered">
                            <input type="text" class="form-control">
                            <label>Email Address</label>
                            <i class="form-group__bar"></i>
                        </div>
            
                        <button class="btn btn--light btn--icon m-t-15"><i class="zmdi zmdi-check"></i></button>
                    </div>
                </div>
            </div>
        `,
            link: (scope, element, attrs) => {
                scope.state = 'login';

                scope.loginDropdown = {
                    'Create an account': () => {
                        scope.state = 'register';
                    },
                    'Forgot password?': () => {
                        scope.state = 'forgotpassword';
                    }
                };

                scope.registerDropdown = {
                    'Already have an account?': () => {
                        scope.state = 'login';
                    },
                    'Forgot password?': () => {
                        scope.state = 'forgotpassword';
                    }
                };

                scope.forgotpasswordDropdown = {
                    'Already have an account?': () => {
                        scope.state = 'login';
                    },
                    'Create an account': () => {
                        scope.state = 'register';
                    }
                };

                scope.login = () => {
                    $http.post('/login', scope.user).then((data) => {
                        if (data.data.success && data.data.success === true) {
                            let user = data.data;
                            delete user.success;
                            $timeout(() => {
                                scope.user = user;
                            });
                            console.log("success");
                        }
                    }, (error) => {
                        console.log(error);
                    });
                };

                scope.register = () => {
                    console.log(scope.user);
                };
            }
        };
    }
];