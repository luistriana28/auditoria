'use strict'

// Requerimos lo necesario para trabajar
// Encriptado
const Hash = use('Hash')
// Bussiness - Base de datos
const Auditor = use('App/Model/Auditor')
// Acceder a la base de datos
const Database = use('Database')
// Nos ayuda a acceder a los directorios del sistema
const Helpers = use('Helpers')

class AuditorController {

  * getAllAuditor (req, res){
    // Hacemos la consulta de todas las empresas que se encuentren activas
    const audits = yield Database.from('users').where({
      'role': 'auditor',
      'active': 1
    })
    return res.send(audits)
  }

  * update (req, res){
    // Obteneos todos los datos que enviamos en el AJAX
    const data = req.all()
    // Revisamos si existe ya una epresa con el folio que estamos enviando
    const query = yield Database.from('users').where({'username': data.username})
    // En caso de que la empresa exista, regresamos un estatus que nos indique
    // que ya existe y obvio ya no se registra esta empresa
    // EN ESTE CASO VAMOS A COMPARAR QUE EL FOLIO SEA DIFERENTE AL QUE YA TIENE
    // LA EMPRESA QUE VAMOS A ACTUALIZAR
    const toUpdate = yield Database.from('users').where({'id': data.id})
    if (query.length > 0){
      return res.send({
        'status':1001
      })
    }
    else{
      // Usando el Modelo, hacemos una condicion de actualizacion, donde indicamos
      // que se actualizará por ID y cuales serán los valores
      yield Auditor.query()
      .where('id', data.id)
      .update({
        username  : data.username,
      })
      // regresamos un estatus 200, lo que nos indica que todo se ha completado
      // de manera exitos (Puede ser cualquier estatus que se desee, siempre
      // y cuando sepamos que significa para nosotros, "Yo utilizo estos por
      // estandar universal").
      return res.send({ status  : 200 })
    }
  }

  * inactive (req, res){
    // Obteneos todos los datos que enviamos en el AJAX
    const data = req.all()
    // No se debe eliminar "NUNCA" ningun registro de la base de datos, esto se
    // hace por seguridad, unicamente se deberá de cambiar el estatus
    yield Auditor.query()
    .where('id', data.id)
    .update({ active  : 0 })
    // regresamos un estatus 200, lo que nos indica que todo se ha completado
    // de manera exitos (Puede ser cualquier estatus que se desee, siempre
    // y cuando sepamos que significa para nosotros, "Yo utilizo estos por
    // estandar universal").
    return res.send({ status  : 200 })
  }

}

module.exports = AuditorController
