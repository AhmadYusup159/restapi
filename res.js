'use strict';

exports.ok = function(values, res){
    var data ={
        'status' :200,
        'values' : values
    };
     res.json(data);
     res.end();
};
exports.nested = function (values, res) {
    const hasil = values.reduce((pengelompokan, item) => {
        if (pengelompokan[item.nama_mahasiswa]) {
            const group = pengelompokan[item.nama_mahasiswa];
            group.jadwal.push({
                id_mahasiswa: item.id_mahasiswa,
                id_matakuliah: item.id_matakuliah,
                hari: item.hari,
                jam_mulai: item.jam_mulai,
                jam_selesai: item.jam_selesai,
                semester: item.semester,
                nama_kelas: item.nama_kelas,
                nama_matakuliah: item.nama_matakuliah,
                sks: item.sks,
                nama_dosen: item.nama_dosen 
            });
        } else {
            pengelompokan[item.nama_mahasiswa] = {
                id_mahasiswa: item.id_mahasiswa,
                npm: item.npm,
                nama_mahasiswa: item.nama_mahasiswa,
                jk: item.jk,
                alamat: item.alamat,
                foto: item.foto,
                status: item.status,
                notlp: item.notlp,
                email: item.email,
                password: item.password,
                id_kelas: item.id_kelas,
                jadwal: [{
                    id_matakuliah: item.id_matakuliah, 
                    hari: item.hari,
                    jam_mulai: item.jam_mulai,
                    jam_selesai: item.jam_selesai,
                    semester: item.semester,
                    nama_kelas: item.nama_kelas,
                    nama_matakuliah: item.nama_matakuliah,
                    sks: item.sks,
                    nama_dosen: item.nama_dosen 
                }]
            };
        }
        return pengelompokan;
    }, {});

    var data = {
        'status': 200,
        'values': Object.values(hasil) 
    };
    res.json(data);
    res.end();
};
exports.nestedPresensi = function (values, res) {
    const hasil = values.reduce((pengelompokan, item) => {
        if (pengelompokan[item.nama_mahasiswa]) {
            const group = pengelompokan[item.nama_mahasiswa];
            if (Array.isArray(group.jadwal)) {
                group.jadwal.push({
                    hari: item.hari,
                    jam_mulai: item.jam_mulai,
                    jam_selesai: item.jam_selesai,
                    semester: item.semester,
                    nama_kelas: item.nama_kelas,
                    id_matakuliah: item.id_matakuliah, // Include id_matakuliah
                    nama_kelas: item.nama_kelas,
                    nama_matakuliah: item.nama_matakuliah,
                    sks: item.sks,
                    jumlah_presensi: item.jumlah_presensi
                });
            } else {
                group.jadwal = [{
                    hari: group.hari,
                    jam_mulai: group.jam_mulai,
                    jam_selesai: group.jam_selesai,
                    semester: group.semester,
                    nama_kelas: group.nama_kelas, 
                    id_matakuliah: group.id_matakuliah, // Include id_matakuliah
                    nama_kelas: group.nama_kelas,
                    nama_matakuliah: group.nama_matakuliah,
                    sks: group.sks,
                    jumlah_presensi: group.jumlah_presensi
                }, {
                    hari: item.hari,
                    jam_mulai: item.jam_mulai,
                    jam_selesai: item.jam_selesai,
                    semester: item.semester,
                    nama_kelas: item.nama_kelas, 
                    id_matakuliah: item.id_matakuliah, // Include id_matakuliah
                    nama_kelas: item.nama_kelas,
                    nama_matakuliah: item.nama_matakuliah,
                    sks: item.sks,
                    jumlah_presensi: item.jumlah_presensi
                }];
                // Remove unnecessary properties
                delete group.hari;
                delete group.jam_mulai;
                delete group.jam_selesai;
                delete group.semester;
                delete group.id_kelas;
                delete group.id_matakuliah;
                delete group.nama_kelas;
                delete group.nama_matakuliah;
                delete group.sks;
                delete group.jumlah_presensi;
            }
        } else {
            pengelompokan[item.nama_mahasiswa] = {
                id_mahasiswa: item.id_mahasiswa,
                npm: item.npm,
                nama_mahasiswa: item.nama_mahasiswa,
                jk: item.jk,
                alamat: item.alamat,
                foto: item.foto,
                status: item.status,
                notlp: item.notlp,
                email: item.email,
                password: item.password,
                id_kelas: item.id_kelas,
                jadwal: [{
                    hari: item.hari,
                    jam_mulai: item.jam_mulai,
                    jam_selesai: item.jam_selesai,
                    semester: item.semester,
                    nama_kelas: item.nama_kelas, 
                    id_matakuliah: item.id_matakuliah, // Include id_matakuliah
                    nama_kelas: item.nama_kelas,
                    nama_matakuliah: item.nama_matakuliah,
                    sks: item.sks,
                    jumlah_presensi: item.jumlah_presensi
                }]
            };
        }
        return pengelompokan;
    }, {});

    var data = {
        'status': 200,
        'values': Object.values(hasil) 
    };
    res.json(data);
    res.end();
};
exports.nestedJadwalMatakuliah = function (values, res) {
    const hasil = values.reduce((pengelompokan, item) => {
        if (pengelompokan[item.nama_matakuliah]) {
            const group = pengelompokan[item.nama_matakuliah];
            if (Array.isArray(group.jadwal)) {
                group.jadwal.push({
                    id_jadwal: item.id_jadwal,
                    semester: item.semester,
                    hari: item.hari,
                    jam_mulai: item.jam_mulai,
                    jam_selesai: item.jam_selesai,
                    ruangan: {
                        id_ruangan: item.id_ruangan,
                        gedung: item.gedung,
                        lantai: item.lantai,
                        ruangan: item.ruangan
                    }
                });
            } else {
                group.jadwal = [{
                    id_jadwal: group.id_jadwal,
                    semester: group.semester,
                    hari: group.hari,
                    jam_mulai: group.jam_mulai,
                    jam_selesai: group.jam_selesai,
                    ruangan: {
                        id_ruangan: group.ruangan.id_ruangan,
                        gedung: group.ruangan.gedung,
                        lantai: group.ruangan.lantai,
                        ruangan: group.ruangan.ruangan
                    }
                }, {
                    id_jadwal: item.id_jadwal,
                    semester: item.semester,
                    hari: item.hari,
                    jam_mulai: item.jam_mulai,
                    jam_selesai: item.jam_selesai,
                    ruangan: {
                        id_ruangan: item.id_ruangan,
                        gedung: item.gedung,
                        lantai: item.lantai,
                        ruangan: item.ruangan
                    }
                }];
                delete group.id_jadwal;
                delete group.semester;
                delete group.hari;
                delete group.jam_mulai;
                delete group.jam_selesai;
                delete group.ruangan;
            }
        } else {
            pengelompokan[item.nama_matakuliah] = {
                id_matakuliah: item.id_matakuliah,
                kode_matakuliah: item.kode_matakuliah,
                nama_matakuliah: item.nama_matakuliah,
                sks: item.sks,
                foto: item.foto,
                jadwal: [{
                    id_jadwal: item.id_jadwal,
                    semester: item.semester,
                    hari: item.hari,
                    jam_mulai: item.jam_mulai,
                    jam_selesai: item.jam_selesai,
                    ruangan: {
                        id_ruangan: item.id_ruangan,
                        gedung: item.gedung,
                        lantai: item.lantai,
                        ruangan: item.ruangan
                    }
                }]
            };
        }
        return pengelompokan;
    }, {});

    var data = {
        'status': 200,
        'values': Object.values(hasil)
    };
    res.json(data);
    res.end();
};
exports.formatPresensi = function (values, res) {
    const formattedData = values.reduce((result, item) => {
        const key = `${item.id_mahasiswa}-${item.id_matakuliah}`;
        if (!result[key]) {
            result[key] = {
                id_mahasiswa: item.id_mahasiswa,
                npm: item.npm,
                nama_mahasiswa: item.nama_mahasiswa,
                jk: item.jk,
                alamat: item.alamat,
                foto: item.foto,
                status: item.status,
                notlp: item.notlp,
                email: item.email,
                password: item.password,
                id_kelas: item.id_kelas,
                matakuliah: [{
                    id_matakuliah: item.id_matakuliah,
                    kode_matakuliah: item.kode_matakuliah,
                    nama_matakuliah: item.nama_matakuliah,
                    sks: item.sks,
                    presensi: [{
                        tanggal: item.tanggal,
                        lokasi: item.lokasi
                    }]
                }]
            };
        } else {
            result[key].matakuliah[0].presensi.push({
                tanggal: item.tanggal,
                lokasi: item.lokasi
            });
        }
        return result;
    }, {});

    const nestedData = Object.values(formattedData).map(item => {
        return {
            id_mahasiswa: item.id_mahasiswa,
            npm: item.npm,
            nama_mahasiswa: item.nama_mahasiswa,
            jk: item.jk,
            alamat: item.alamat,
            foto: item.foto,
            status: item.status,
            notlp: item.notlp,
            email: item.email,
            password: item.password,
            id_kelas: item.id_kelas,
            matakuliah: item.matakuliah.map(matakuliah => {
                return {
                    id_matakuliah: matakuliah.id_matakuliah,
                    kode_matakuliah: matakuliah.kode_matakuliah,
                    nama_matakuliah: matakuliah.nama_matakuliah,
                    sks: matakuliah.sks,
                    presensi: matakuliah.presensi
                };
            })
        };
    });

    const responseData = {
        'status': 200,
        'values': nestedData
    };
    res.json(responseData);
    res.end();
};
