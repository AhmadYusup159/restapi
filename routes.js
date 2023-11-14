'use strict'

module.exports = function(app){
    var json = require('./controller');

    app.route('/')
    .get(json.index);

    app.route('/tampilsemuadatamahasiswa')
    .get(json.getalldatamahasiswa);

    app.route('/tampildatamahasiswabyid/:id')
    .get(json.getdatamahasiswabyid);

    app.route('/tambahmahasiswa')
    .post(json.tambahdatamahasiswa);
}