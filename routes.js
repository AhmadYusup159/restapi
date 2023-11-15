'use strict'

const { upload } = require('./midleware');

module.exports = function(app){
    var json = require('./controller');
    

    app.route('/')
    .get(json.index);
//Mahasiswa
    app.route('/tampilsemuadatamahasiswa')
    .get(json.getalldatamahasiswa);
    app.route('/tampildatamahasiswabyid/:id')
    .get(json.getdatamahasiswabyid);
    app.route('/tambahmahasiswa')
    .post(upload.single('foto'), json.tambahdatamahasiswa);
    app.route('/ubahdatamahasiswa/:id')
    .put(upload.single('foto'), json.ubahdatamahasiswa);
    app.route('/hapusdatamahasiswa/:id')
    .delete(json.hapusdatamahasiswa);

//Admin
    app.route('/tampilsemuaadmin')
    .get(json.getalldataadmin);
    app.route('/tampiladminbyid/:id')
    .get(json.getadminbyid);
}