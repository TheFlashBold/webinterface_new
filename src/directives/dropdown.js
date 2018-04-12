module.exports = [
    "$document",
    function ($document) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                'fields': '='
            },
            template: `
                <div class="dropdown" ng-class="{'open': state}">
                    <a href="#" ng-click="open()">
                        <i class="zmdi zmdi-more-vert"></i>
                    </a>

                    <ul class="dropdown-menu pull-right">
                        <li ng-repeat="(text, action) in fields"><a href="#" ng-click="action()" ng-bind-html="text"></a></li>
                    </ul>
                </div>
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