const getDb = require('../db');
let db = null;
class expedientes {

    constructor() {
        getDb()
        .then( (database) => {
        db = database;
            if (process.env.MIGRATE === 'true') {
                const createStatement = 'CREATE TABLE IF NOT EXISTS expedientes (identidad TEXT, fecha TEXT, descripcion TEXT, observacion TEXT, registros TEXT);';
            db.run(createStatement);
        }
    })
    .catch((err) => { console.error(err)});
    }

    new ( identidad, Fecha, Descripcion, Observacion, registros, UltimaActualizacion) {
        return new Promise( (accept, reject)=> {
            db.run(
                'INSERT INTO expedientes (identidad, Fecha, Descripcion, Observacion, registros, UltimaActualizacion) VALUES (?, ?, ?, ?, ?, ?);',
                [iidentidad, Fecha, Descripcion, Observacion, registros, UltimaActualizacion],
                (err, rslt)=>{
                    if(err) {
                        console.error(err);
                        reject(err);
                    }
                accept(rslt);
                }
            );
        });
    }

    getAll () {
        return new Promise ( (accept, reject) => {
            db.all('SELECT * from expedientes;', (err, rows) => {
            if(err){
                console.error(err);
                reject(err);
                } else {
                    accept(rows);
                }
            });
        });
    }

    getById(identidad) {
        return new Promise((accept, reject) => {
        db.get(
            'SELECT * from expedientes where identidad=?;',
            [identidad],
            (err, row) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    } else {
                    accept(row);
            }
        });
    });
    }

    updateOne (identidad, Fecha, Descripcion, Observacion, registros, UltimaActualizacion) {
        return new Promise(
            (accept, reject) => {
                const sqlUpdate = 'UPDATE expedientes set Fecha = ?, Descripcion = ?, registros = ?, obsercacion = ?, registros = ? where identidad = ?;';
                db.run(
                sqlUpdate,
                [Fecha, Descripcion, Observacion, registros, UltimaActualizacion,identidad],
                function (err) {
                    if(err){
                        reject(err);
                    } else {
                        accept(this);
                        }
                    }
                );
            }
        );
    }
}

module.exports = expedientes;