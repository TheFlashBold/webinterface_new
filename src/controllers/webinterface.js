module.exports = [
    "$scope",
    ($scope) => {
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

        $scope.$watch('user.token', () => {
           console.log($scope.user);
        });
    }
];