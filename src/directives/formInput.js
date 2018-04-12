module.exports = [
    "$document",
    function ($document) {
        return {
            restrict: 'AE',
            scope: {
                'type': '@type',
                'label': '@label',
                'model': '=',
                'classes': '@classes'
            },
            template: `
                <div class="{{classes}}" ng-class="{'form-group--active': model != ''}">
                    <input type="{{type}}" class="form-control" ng-model="model">
                    <label>{{label}}</label>
                    <i class="form-group__bar"></i>
                </div>
        `,
            link: (scope, element, attrs) => {

            }
        };
    }
];