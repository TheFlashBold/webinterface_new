module.exports = [
    "$scope",
    "$routeParams",
    function($scope, $routeParams) {
        $scope.serverId = $routeParams.serverId;
    }
];