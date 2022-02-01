const express = require('express');
const router = express.Router();

const Expedientes = new require('../../../../dao/expedientes/expedientes.model');
const expedientesmodel = new Expedientes();

router.get('/', (req, res) => {
    res.status(200).json(
    {
        endpoint: 'Expedientes',
        updates: new Date(2022,0,19,18,41,00)
    }
    );
}); //GET /

router.get('/all', async (req, res) => {
    try {
        const rows = await expedientemodel.getAll();
        res.status(200).json({status:'ok', expediente: rows});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
} );
// /byid/1;
router.get('/byid/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const row = await expedientemodel.getById(parseInt(id));
        res.status(200).json({ status: 'ok', expedientes: row });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});

router.get('/byagegender/:age/:gender', async (req, res) => {
    try {
        const { age, gender } = req.params;
        const row = {};
        res.status(200).json({ status: 'ok', expediente: row });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});

router.post('/new', async (req, res) => {
    const {identidad, Fecha, Descripcion, Observacion, registros, UltimaActualizacion } = req.body;
    try {
    rslt = await expedientemodel.new(identidad, Fecha, Descripcion, Observacion, registros, UltimaActualizacion);
    res.status(200).json(
        {
        status: 'ok',
        result: rslt
    });
    } catch (ex) {
        console.log(ex);
        res.status(500).json(
    {
        status: 'failed',
        result: {}
    });
    }
}); //POST /new


//router.put();
router.put('/update/:id', async (req, res) => {
    try{
        const { identidad, Fecha, Descripcion, Observacion, registros, UltimaActualizacion} = req.body;
        const { identidad } = req.params;
        const result = await expedientemodel.updateOne(identidad, Fecha, Descripcion, Observacion, registros, UltimaActualizacion);
        res.status(200).json({
        status:'ok',
        result
    });
    } catch(ex){
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});

//router.delete();
router.delete('/delete/:id', async (req, res) => {
    try {
        const { identidad } = req.params;
        const result = await expedientemodel.deleteOne(identidad);
        res.status(200).json({
        status: 'ok',
        result
    });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});


module.exports = router;