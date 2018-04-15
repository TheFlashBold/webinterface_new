module.exports = [
    '/',
    {
        template: `
            <div class="row">
                <div class="col-12 grid-margin">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Server</h4>
                            <div class="table-responsive ps ps--theme_default" data-ps-id="5482708a-926a-30a7-7aa6-a3a742f800fe">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>
                                            Server Id
                                        </th>
                                        <th>
                                            Game
                                        </th>
                                        <th>
                                            Players
                                        </th>
                                        <th>
                                            Status
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr ng-repeat="server in user.servers">
                                        <td>
                                            <a ng-href="/server/{{server.id}}">
                                                {{server.id}}
                                            </a>
                                        </td>
                                        <td>
                                            {{server.name}}
                                        </td>
                                        <td class="py-1">
                                            0 / 64
                                        </td>
                                        <td>
                                            <label class="badge badge-gradient-success">online</label>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="ps__scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                                    <div class="ps__scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                                </div>
                                <div class="ps__scrollbar-y-rail" style="top: 0px; right: 0px;">
                                    <div class="ps__scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary"><i class="mdi mdi-server-plus"> Server erstellen</i></button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
];