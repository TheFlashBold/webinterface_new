module.exports = [
    "$scope",
    "$rootScope",
    function($scope, $rootScope) {
        $scope.state = 'login';

        $rootScope.user = {
            email: "tycho.holzer@gmail.com",
            password: "lelele"
        };

        $scope.isAccessable = false;

        $scope.lock = () => {
            $rootScope.changeState('locked');
        };

        $rootScope.changeState = (state) => {
            $scope.$applyAsync(() => {
                $scope.state = state;
                //console.log(state);
            });
        };

        $rootScope.socket = io();
    }
];