'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req,res){
    response.ok("API Berjalan",res)
};
//Mahasiswa
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
    var notlp = req.body.notlp;
    var email = req.body.email;
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
    if (!notlp ) {
        return res.status(400).json({ error: "No Telepon harus diisi." });
    }
    if (!email) {
        return res.status(400).json({ error: "Email harus diisi." });
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Format email tidak valid." });
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
            connection.query('INSERT INTO mahasiswa (npm, nama_mahasiswa, jk, alamat, foto, status, notlp, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [npm, nama_mahasiswa, jk, alamat, foto, status, notlp, email, password], function(error, rows, fields){
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
    var npm = req.body.npm;
    var nama_mahasiswa = req.body.nama_mahasiswa;
    var jk = req.body.jk;
    var alamat = req.body.alamat;
    var foto = req.file.filename; 
    var status = req.body.status;
    var notlp = req.body.notlp;
    var email = req.body.email;
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
    if (!notlp ) {
        return res.status(400).json({ error: "No Telepon harus diisi." });
    }
    if (!email) {
        return res.status(400).json({ error: "Email harus diisi." });
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Format email tidak valid." });
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
            connection.query('UPDATE mahasiswa SET npm=?, nama_mahasiswa=?, jk=?, alamat=?, foto=?, status=?, notlp=?, email=?, password=? WHERE id=?', [npm, nama_mahasiswa, jk, alamat, foto, status, notlp,email, password, id], function(error, rows, fields){
                if(error){
                    console.log(error);
                    return res.status(500).json({ error: "Gagal mengubah data di database." });
                } else {
                    return res.status(200).json({ message: "Berhasil mengubah data." });
                }
            });
        }
    });
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
//Admin
exports.getalldataadmin = function(req, res) {
    
    connection.query('SELECT * FROM admin', function(error, rows, fields) {
        if (error) {
            console.log(error);  
        } else {
            response.ok(rows, res);
        }
    });
};
exports.getadminbyid = function(req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM admin where id = ?',[id], function(error, rows, fields) {
        if (error) {
            console.log(error);  
           return res.status(500).json({ error: "data dengan ID id tidak ditemukan" });
        } else {
            response.ok(rows, res);
        }
    });
};
exports.tambahdataadmin = function(req, res){
    var nama_admin = req.body.nama_admin;
    var username = req.body.username;
    var password = req.body.password;
    var status = req.body.status;
    var foto = req.file.filename; 
    

  
    if (!nama_admin) {
        return res.status(400).json({ error: "Nama harus diisi." });
    }   
    if (!username) {
        return res.status(400).json({ error: "Username harus diisi." });
    }
    if (!password) {
        return res.status(400).json({ error: "Password harus diisi." });
    }
    if (!status || (status !== 'Aktif' && status !== 'Tidak Aktif')) {
        return res.status(400).json({ error: "Status harus diisi dengan 'Aktif' atau 'Tidak Aktif'." });
    }
    if (!req.file) {
        return res.status(400).json({ error: "Foto harus diunggah." });
    }
    if (typeof nama_admin !== 'string') {
        return res.status(400).json({ error: "Nama harus berupa string." });
    }

    connection.query('SELECT * FROM admin WHERE username = ?', [username], function(error, result, fields){
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Gagal memeriksa Username di database." });
        }

        if (result.length > 0) {
            return res.status(400).json({ error: "Username sudah terdaftar." });
        } else {
            connection.query('INSERT INTO admin (nama_admin, username, password, status, foto) VALUES (?, ?, ?, ?, ?)', [nama_admin, username, password, status, foto], function(error, rows, fields){
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
    exports.ubahdataadmin = function(req,res){
        let id = req.params.id;
        var nama_admin = req.body.nama_admin;
        var username = req.body.username;
        var password = req.body.password;
        var status = req.body.status;
        var foto = req.file.filename; 
        

    
        if (!nama_admin) {
            return res.status(400).json({ error: "Nama harus diisi." });
        }   
        if (!username) {
            return res.status(400).json({ error: "Username harus diisi." });
        }
        if (!password) {
            return res.status(400).json({ error: "Password harus diisi." });
        }
        if (!status || (status !== 'Aktif' && status !== 'Tidak Aktif')) {
            return res.status(400).json({ error: "Status harus diisi dengan 'Aktif' atau 'Tidak Aktif'." });
        }
        if (!req.file) {
            return res.status(400).json({ error: "Foto harus diunggah." });
        }
        if (typeof nama_admin !== 'string') {
            return res.status(400).json({ error: "Nama harus berupa string." });
        }

        connection.query('SELECT * FROM admin WHERE username = ?', [username], function(error, result, fields){
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Gagal memeriksa Username di database." });
            }

            if (result.length > 0) {
                return res.status(400).json({ error: "Username sudah terdaftar." });
            } else {
                connection.query('UPDATE admin SET nama_admin=?, username=?, password=?, status=?, foto=? WHERE id=?', [nama_admin, username, password, status, foto, id], function(error, rows, fields){
                    if(error){
                        console.log(error);
                        return res.status(500).json({ error: "Gagal menambahkan data ke database." });
                    } else {
                        return res.status(200).json({ message: "Berhasil Mengubah data." });
                    }
                });
            }
        });
};
exports.hapusdatamaadmin = function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM admin WHERE id=?',[id],function(error, rows, fields) {
        if (error) {
            console.log(error);  
           return res.status(500).json({ error: "data dengan ID id tidak ditemukan" });
        } else {
            response.ok("Data Berhasil Dihapus", res);
        }
    });
}
