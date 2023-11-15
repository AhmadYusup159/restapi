'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req,res){
    response.ok("API Berjalan",res)
};


exports.getalldatamahasiswa = function(req, res) {
    
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields) {
        if (error) {
            console.log(error);  
        } else {
            response.ok(rows, res);
        }
    });
};
exports.getdatamahasiswabyid = function(req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa where id = ?',[id], function(error, rows, fields) {
        if (error) {
            console.log(error);  
           return res.status(500).json({ error: "data dengan ID id tidak ditemukan" });
        } else {
            response.ok(rows, res);
        }
    });
};
exports.tambahdatamahasiswa = function(req, res){
    var npm = req.body.npm;
    var nama_mahasiswa = req.body.nama_mahasiswa;
    var jk = req.body.jk;
    var alamat = req.body.alamat;
    var foto = req.file.filename; 
    var status = req.body.status;
    var password = req.body.password;

    if (!npm ) {
        return res.status(400).json({ error: "NPM harus diisi." });
    }
    if (!nama_mahasiswa) {
        return res.status(400).json({ error: "Nama harus diisi." });
    }
    if (!jk || (jk !== 'Laki-laki' && jk !== 'Perempuan')) {
        return res.status(400).json({ error: "Jenis Kelamin harus diisi dengan 'Laki-laki' atau 'Perempuan'." });
    }    
    if (!alamat) {
        return res.status(400).json({ error: "Alamat harus diisi." });
    }
    if (!req.file) {
        return res.status(400).json({ error: "Foto harus diunggah." });
    }
    
    if (!status || (status !== 'Aktif' && status !== 'Tidak Aktif')) {
        return res.status(400).json({ error: "Status harus diisi dengan 'Aktif' atau 'Tidak Aktif'." });
    }    
    if (!password) {
        return res.status(400).json({ error: "Password harus diisi." });
    }

    if (!npm || npm.length !== 10) {
        return res.status(400).json({ error: "NPM harus terdiri dari 10 karakter." });
    }    

    if (typeof nama_mahasiswa !== 'string') {
        return res.status(400).json({ error: "Nama harus berupa string." });
    }

    connection.query('SELECT * FROM mahasiswa WHERE npm = ?', [npm], function(error, result, fields){
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Gagal memeriksa NPM di database." });
        }

        if (result.length > 0) {
            return res.status(400).json({ error: "NPM sudah terdaftar." });
        } else {
            connection.query('INSERT INTO mahasiswa (npm, nama_mahasiswa, jk, alamat,foto,status, password) VALUES (?, ?, ?, ?, ?, ?, ?)', [npm, nama_mahasiswa, jk, alamat, foto, status, password], function(error, rows, fields){
                if(error){
                    console.log(error);
                    return res.status(500).json({ error: "Gagal menambahkan data ke database." });
                } else {
                    return res.status(200).json({ message: "Berhasil Menambahkan data." });
                }
            });
        }
    });
};
exports.ubahdatamahasiswa = function (req, res) {
    let id = req.params.id;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var password = req.body.password;
    if (!nim ) {
        return res.status(400).json({ error: "NIM harus diisi." });
    }
    if (!nama) {
        return res.status(400).json({ error: "Nama harus diisi." });
    }
    if (!password) {
        return res.status(400).json({ error: "Password harus diisi." });
    }

    if (!nim || nim.length !== 10) {
        return res.status(400).json({ error: "NIM harus terdiri dari 10 karakter." });
    }    

    if (typeof nama !== 'string') {
        return res.status(400).json({ error: "Nama harus berupa string." });
    }

    if (isNaN(nama)) {
    connection.query('SELECT * FROM mahasiswa WHERE nim = ?', [nim], function(error, result, fields){
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Gagal memeriksa NIM di database." });
        }

        if (result.length > 0) {
            return res.status(400).json({ error: "NIM sudah terdaftar." });
        } else {
            connection.query('UPDATE mahasiswa SET nim=?, nama=?, password=? WHERE id=?', [nim, nama, password, id], function(error, rows, fields){
                if(error){
                    console.log(error);
                    return res.status(500).json({ error: "Gagal menambahkan data ke database." });
                } else {
                    return res.status(200).json({ message: "Berhasil mengubah data." });
                }
            });
        }
    });
    } else {
        return res.status(400).json({ error: "Nama harus berupa string." });
    }
    
};
exports.hapusdatamahasiswa = function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM mahasiswa WHERE id=?',[id],function(error, rows, fields) {
        if (error) {
            console.log(error);  
           return res.status(500).json({ error: "data dengan ID id tidak ditemukan" });
        } else {
            response.ok("Data Berhasil Dihapus", res);
        }
    });
}

