module.exports = [
    "$document",
    function ($document) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                'fields': '=',
                'profilePicture': '@'
            },
            template: `
                <li class="top-menu__profile dropdown" ng-class="{'open': state}">
                    <a href="#" ng-click="open()">
                        <img ng-src="profilePicture" alt="">
                    </a>
        
                    <ul class="dropdown-menu pull-right dropdown-menu--icon">
                        <li ng-repeat="(text, action) in fields">
                            <a href="#" ng-click="action()"><i class="zmdi zmdi-account"></i> {{text}}</a>
                        </li>
                    </ul>
                </li>
        `,
            link: (scope, element, attrs) => {
                scope.state = false;

                scope.open = () => {
                    scope.state = true;
                };

                function isDescendant(parent, child) {
                    let node = child.parentNode;
                    while (node != null) {
                        if (node == parent) {
                            return true;
                        }
                        node = node.parentNode;
                    }
                    return false;
                }

                $document.bind('click', function (event) {
                    if (!isDescendant(angular.element(element)[0], event.target)) {
                        scope.$apply(function () {
                            scope.state = false;
                        });
                    }
                });
            }
        };
    }
];