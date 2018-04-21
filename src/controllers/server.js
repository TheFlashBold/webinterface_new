module.exports = [
    "$scope",
    "$routeParams",
    "$http",
    "$rootScope",
    function ($scope, $routeParams, $http, $rootScope) {
        $scope.serverId = $routeParams.serverId;
        $scope.progress = 0;
        $scope.state = "";
        $scope.log = "";

        for (let i = 0; i < $rootScope.user.servers.length; i++) {
            let server = $rootScope.user.servers[i];
            if (server._id === $scope.serverId) {
                $scope.server = server;
            }
        }

        $http.get('/api/server/' + $scope.serverId).then(
            (data) => {
                if (data.data.success) {
                    $scope.server = Object.assign($scope.server, data.data.server);
                } else {
                    console.log(data.data.error);
                }
            },
            (err) => {
                console.log(err);
            }
        );

        $scope.save = () => {
            $http.post('/api/server/' + $scope.serverId, $scope.server.values).then((data) => {
                if (data.data.success) {
                    console.log('saved!!!');
                }
            }, (err) => {
                console.log(err);
            });
        };

        $scope.start = () => {
            $http.get('/api/server/' + $scope.serverId + '/start').then((data) => {
                if (data.data.success) {
                    console.log('started!!!');
                }
            }, (err) => {
                console.log(err);
            });
        };

        $scope.stop = () => {
            $http.get('/api/server/' + $scope.serverId + '/stop').then((data) => {
                if (data.data.success) {
                    console.log('stopped!!!');
                }
            }, (err) => {
                console.log(err);
            });
        };

        $scope.install = () => {
            $http.get('/api/server/' + $scope.serverId + '/install').then((data) => {
                if (data.data.success) {
                    console.log('install started!!!');
                }
            }, (err) => {
                console.log(err);
            });
        };

        $rootScope.socket.on('log', (data) => {
            if (data.id === $scope.serverId) {
                $scope.$applyAsync(() => {
                    $scope.log = data.data + $scope.log;
                })
                console.log(data.data);
            }
        });

        $rootScope.socket.on('progress', (data) => {
            if (data.id === $scope.serverId) {
                $scope.$applyAsync(() => {
                    $scope.progress = data.data.progress;
                    $scope.state = data.data.state;
                });
                console.log(data.data);
            }
        });

        $scope.$on('$routeChangeStart', ($event, next, current) => {
            $rootScope.socket.off('log');
            $rootScope.socket.off('progress');
        });
    }
];