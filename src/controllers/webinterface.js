module.exports = [
    "$scope",
    function($scope) {
        $scope.state = 'login';

        $scope.user = {
            email: "tycho.holzer@gmail.com",
            password: "lelele"
        };

        $scope.isAccessable = false;

        $scope.lock = () => {
            changeState('locked');
        };

        window.changeState = (state) => {
            $scope.$applyAsync(() => {
                $scope.state = state;
                //console.log(state);
            });
        };

        let socket = io();

        socket.on('log', (data) => {
            console.log(data);
        });
    }
];