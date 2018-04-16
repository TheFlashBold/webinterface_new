module.exports = [
    '/server/:serverId',
    {
        controller: 'server',
        template: `
            <div class="col-lg-12 grid-margin">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">{{serverId}}</h4>
                        <div class="accordion" role="tablist">
                            <div class="card" ng-if="config.fields">
                                <div class="card-header" role="tab">
                                    <h6 class="mb-0">
                                        <a data-toggle="collapse" href="#settings" class="collapsed">
                                           Settings
                                        </a>
                                    </h6>
                                </div>
                                <div id="settings" class="collapse" role="tabpanel" data-parent="#accordion"
                                     style="">
                                    <div class="card-body">
                                        <div class="form-group row" ng-repeat="(name, field) in config.fields">
                                            <label class="col-sm-3 col-form-label">{{field[1]}}</label>
                                            <div class="col-sm-9" ng-switch="field[2]">
                                                <input ng-switch-when="Number" type="number" class="form-control" placeholder="{{field[0]}}" min="{{field[3]}}" max="{{field[4]}}">
                                                <input ng-switch-when="String" type="string" class="form-control" placeholder="{{field[0]}}" minlength="{{field[3]}}" maxlength="{{field[4]}}">
                                                <select ng-switch-when="Enumerator" class="form-control form-control-sm">
                                                    <option ng-repeat="value in field[3]" value="{{value}}">{{value}}</option>
                                                </select>
                                                <label class="form-check-label" ng-switch-when="Boolean" style="left: 15px; position: absolute;">
                                                    <input type="checkbox" class="form-check-input" ng-checked="{{field[0]}}">
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card" ng-repeat="(file, content) in config.files">
                                <div class="card-header" role="tab">
                                    <h6 class="mb-0">
                                        <a class="collapsed" data-toggle="collapse" href="#{{file|filenames}}">
                                            {{file}}
                                        </a>
                                    </h6>
                                </div>
                                <div id="{{file|filenames}}" class="collapse" role="tabpanel" data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="form-group row" ng-repeat="(name, field) in content.fields">
                                            <label class="col-sm-3 col-form-label">{{field[1]}}</label>
                                            <div class="col-sm-9" ng-switch="field[2]" ng-class="{'form-check': field[2] == 'Boolean'}">
                                                <input ng-switch-when="Number" type="number" class="form-control" placeholder="{{field[0]}}" min="{{field[3]}}" max="{{field[4]}}">
                                                <input ng-switch-when="String" type="string" class="form-control" placeholder="{{field[0]}}" minlength="{{field[3]}}" maxlength="{{field[4]}}">
                                                <select ng-switch-when="Enumerator" class="form-control form-control-sm">
                                                    <option ng-repeat="value in field[3]" value="{{value}}">{{value}}</option>
                                                </select>
                                                <label class="form-check-label" ng-switch-when="Boolean" style="left: 15px; position: absolute;">
                                                    <input type="checkbox" class="form-check-input" ng-checked="{{field[0]}}">
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        `
    }
];