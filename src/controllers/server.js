module.exports = [
    "$scope",
    "$routeParams",
    "$http",
    function($scope, $routeParams, $http) {
        $scope.serverId = $routeParams.serverId;

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