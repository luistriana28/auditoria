'use strict'

// Requerimos lo necesario para trabajar
// Encriptado
const Hash = use('Hash')
// Bussiness - Base de datos
const Department = use('App/Model/Department')
const Auditor = use('App/Model/Auditor')
// Acceder a la base de datos
const Database = use('Database')
// Nos ayuda a acceder a los directorios del sistema
const Helpers = use('Helpers')

class departmentController {

  * renderView(req, res){
    const id = req.param('id')
    const audit = yield Database.from('users').where({'role':'auditor', 'active':1})
    console.log(audit)
    return yield res.sendView('departamento', { audits: audit, business: id })
  
}
}
module.exports = departmentController
