'use strict'

const { upload } = require('./uploadfotomahasiswa');
const { uploadAdmin } = require('./uploadfotoadmin');
const { uploadDosen } = require('./uploadfotodosen');

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
    app.route('/tambahdataadmin')
    .post(uploadAdmin.single('foto'), json.tambahdataadmin);
    app.route('/ubahdataadmin/:id')
    .put(uploadAdmin.single('foto'), json.ubahdataadmin);
    app.route('/hapusdataadmin/:id')
    .delete(json.hapusdatamaadmin);
//Dosen
    app.route('/tampilsemuadosen')
    .get(json.getalldatadosen);
    app.route('/tampildosenbyid/:id')
    .get(json.getdatadosenbyid);
    app.route('/tambahdatadosen')
    .post(uploadDosen.single('foto'), json.tambahdatadosen);
    app.route('/ubahdatadosen/:id')
    .put(uploadDosen.single('foto'), json.ubahdatadosen);
    app.route('/hapusdatadosen/:id')
    .delete(json.hapusdatadosen);
//Matakuliah
    app.route('/tampilsemuamatakuliah')
    .get(json.getalldatamatakuliah);
    app.route('/tampilmatakuliahbyid/:id')
    .get(json.getdatamatakuliahbyid);
    app.route('/tambahmatakuliah')
    .post(json.tambahdatamatakuliah);
    app.route('/ubahmatakuliah/:id')
    .put(json.ubahdatamatakuliah);
    app.route('/hapusmatakuliah/:id')
    .delete(json.hapusdatamatakuliah);
    
//Ruangan
    app.route('/tampilsemuaruangan')
    .get(json.getalldataruangan);
    app.route('/tampilruanganbyid/:id')
    .get(json.getdataruanganbyid);
    app.route('/tambahruangan')
        .post(json.tambahdataruangan);
    app.route('/ubahruangan/:id')
        .put(json.ubahdataruangan);
    app.route('/hapusruangan/:id')
        .delete(json.hapusruangan);
//Kelas
//Jadwal
//Presensi
}