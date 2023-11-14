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
            connection.query('INSERT INTO mahasiswa (nim, nama, password) VALUES (?, ?, ?)', [nim, nama, password], function(error, rows, fields){
                if(error){
                    console.log(error);
                    return res.status(500).json({ error: "Gagal menambahkan data ke database." });
                } else {
                    return res.status(200).json({ message: "Berhasil Menambahkan data." });
                }
            });
        }
    });
} else {
    return res.status(400).json({ error: "Nama harus berupa string." });
}
};

