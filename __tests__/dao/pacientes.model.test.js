const Pacientes = require('../../dao/pacientes/pacientes.model');
let lastId = 0;
describe('Testing Pacientes Model',() => {
    let pacientesModel = null;
    beforeAll( (done)=>{
        pacientesModel = new Pacientes();
        setTimeout(()=>{
            done();
        },3000);
    });

    it('pacientesModel Esta Definido', () =>{
        return expect(pacientesModel).toBeDefined();
    } );

    it('getAll Devuelve un array', async ()=>{
        const arrPacientes = await pacientesModel.getAll();
        return expect(arrPacientes.length).toBeGreaterThanOrEqual(0);
    });

    it('obtener un dato', async ()=>{
        const resutado = await pacientesModel.getById(lastId);
        console.log(resutado);
        return expect(resutado).toBeDefined();
    });
});