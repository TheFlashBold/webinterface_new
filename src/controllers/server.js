module.exports = [
    "$scope",
    "$routeParams",
    "$http",
    "$rootScope",
    function ($scope, $routeParams, $http, $rootScope) {
        $scope.serverId = $routeParams.serverId;
        console.log($rootScope.user);
        $scope.server = $rootScope.user.servers[$scope.serverId];

        $http.get('/api/server/' + $scope.serverId).then(
            (data) => {
                console.log(data);
                $scope.config = data.data;
            },
            (err) => {

            }
        );
    }
];