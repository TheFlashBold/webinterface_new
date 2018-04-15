module.exports = [
    "$document",
    "$http",
    "$timeout",
    function ($document, $http, $timeout) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                'user': '='
            },
            template: `
                <div class="row">
                    <div class="content-wrapper full-page-wrapper d-flex align-items-center text-center lock-screen">
                    <div class="backhground-bg"></div>
                        <div class="card col-lg-4 ml-auto mr-auto">
                            <div class="card-body">
                            <img ng-src="{{user.profilePicture}}" alt="">
                            <p class="user-name text-white mb-5 pb-3">{{user.email}}</p>
                            <form>
                                <div class="form-group">
                                    <input type="text" class="form-control w-75" placeholder="Password" ng-model="user.password">
                                </div>
                                <button type="submit" class="btn btn-primary" ng-click="unlock()">Unlock</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            link: (scope, element, attrs) => {
                scope.unlock = () => {
                    if(!(scope.user && scope.user.email && scope.user.password)){
                        return;
                    }
                    $http.post('/login', scope.user).then((data) => {
                        if (data.data.success && data.data.success === true) {
                            let user = data.data;
                            delete user.success;
                            scope.$applyAsync(() => {
                                scope.user = user;
                            });
                            changeState('loggedin');
                        }
                    }, (error) => {
                        console.log(error);
                    });
                };
            }
        };
    }
];