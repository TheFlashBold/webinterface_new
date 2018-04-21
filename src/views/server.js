module.exports = [
    '/server/:serverId',
    {
        controller: 'server',
        template: `
            <div class="col-lg-12 grid-margin">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">{{server.name}}</h4>
                        <p class="card-description">
                            <p>
                                <button type="button" class="btn btn-primary" ng-click="install()"><i class="mdi mdi-download"></i> install</button>
                            </p>
                            <p>
                                <button type="button" class="btn btn-primary" ng-click="save()"><i class="mdi mdi-content-save"></i> save</button>
                                <button type="button" class="btn btn-primary" ng-click="start()"><i class="mdi mdi-play"></i> start</button>
                                <button type="button" class="btn btn-primary" ng-click="stop()"><i class="mdi mdi-stop"></i> stop</button>
                            </p>
                            <p>{{state}}</p>
                            <div class="progress progress-md" ng-if="progress != 0 && progress != 100">
                                <div class="progress-bar bg-gradient-primary" role="progressbar" style="width: {{progress}}%">{{progress}}</div>
                            </div>
                        </p>
                        <div class="accordion" role="tablist">
                            <div class="card" ng-if="server.config.fields">
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
                                        <div class="form-group row" ng-repeat="(name, field) in server.config.fields">
                                            <label class="col-sm-3 col-form-label">{{field[1]}}</label>
                                            <div class="col-sm-9" ng-switch="field[2]">
                                                <input ng-switch-when="Number" ng-model="server.values.fields[name]" type="number" class="form-control" placeholder="{{field[0]}}" min="{{field[3]}}" max="{{field[4]}}">
                                                <input ng-switch-when="String" ng-model="server.values.fields[name]" type="string" class="form-control" placeholder="{{field[0]}}" minlength="{{field[3]}}" maxlength="{{field[4]}}">
                                                <select ng-switch-when="Enumerator" ng-model="server.values.fields[name]" class="form-control form-control-sm">
                                                    <option ng-repeat="value in field[3]" value="{{value}}">{{value}}</option>
                                                </select>
                                                <label class="form-check-label" ng-switch-when="Boolean" style="left: 15px; position: absolute;">
                                                    <input ng-model="server.values.fields[name]" type="checkbox" class="form-check-input" ng-checked="{{field[0]}}">
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card" ng-repeat="(file, content) in server.config.files">
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
                                                <input ng-switch-when="Number" ng-model="server.values.files[file].fields[name]" type="number" class="form-control" placeholder="{{field[0]}}" min="{{field[3]}}" max="{{field[4]}}">
                                                <input ng-switch-when="String" ng-model="server.values.files[file].fields[name]" type="string" class="form-control" placeholder="{{field[0]}}" minlength="{{field[3]}}" maxlength="{{field[4]}}">
                                                <select ng-switch-when="Enumerator" ng-model="server.values.files[file].fields[name]" class="form-control form-control-sm">
                                                    <option ng-repeat="value in field[3]" value="{{value}}">{{value}}</option>
                                                </select>
                                                <label class="form-check-label" ng-switch-when="Boolean" style="left: 15px; position: absolute;">
                                                    <input ng-model="server.values.files[file].fields[name]" type="checkbox" class="form-check-input" ng-checked="{{field[0]}}">
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary" ng-click="save()"><i class="mdi mdi-content-save"></i> Save</button>
                    </div>
                </div>
                <p style="height: 26px"></p>
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Log</h4>
                        <input type="text" class="form-control" placeholder="Command">
                        <pre class="log">{{log}}</pre>
                    </div>
                </div>
            </div>
        `
    }
];