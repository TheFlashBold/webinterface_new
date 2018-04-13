module.exports = [
    "$scope",
    ($scope,) => {
        let socket = io();

        socket.on('log', (data) => {
            console.log(data);
        });

        $scope.showSidebar = false;
        $scope.openSidebar = () => {
            $scope.showSidebar = true;
        };
        $scope.hideSidebar = () => {
            $scope.showSidebar = false;
        };

        $scope.user = {
            email: "",
            password: ""
        };

        $scope.profileDropdown = {
            'View Profile': () => {}
        };
    }
];