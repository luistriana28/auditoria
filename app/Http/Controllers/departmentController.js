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
  * save (req, res){
    // Obteneos todos los datos que enviamos en el AJAX
    var data = req.all()
    // Obtenemos la imagen, de esta manera ya que es un archivo y no
    // solo es texto como la Información anterior
    // En caso de que la empresa exista, regresamos un estatus que nos indique
    // que ya existe y obvio ya no se registra esta empresa
      // ** Se ingresan cada uno de los atributos que tengamos en la base de datos **
      var department    = new Department()
      department.name   = data.nombre
      department.username  = data.user_id
      department.active = 1
      yield business.save()
      // regresamos un estatus 200, lo que nos indica que todo se ha completado
      // de manera exitos (Puede ser cualquier estatus que se desee, siempre
      // y cuando sepamos que significa para nosotros, "Yo utilizo estos por
      // estandar universal"), y ademas enviamos la información de la empresa que
      // acabamos de registrar.
    }

* getAllDepartment (req, res){
  // Hacemos la consulta de todas las empresas que se encuentren activas
  const id = req.param('id')
  const departments = yield Database.from('departments').where({
    'bunsiness_id': id
  })
  return res.send(departments)

  }
  * update (req, res){
    // Obteneos todos los datos que enviamos en el AJAX
    const data = req.all()
    // Revisamos si existe ya una epresa con el folio que estamos enviando
    const query = yield Database.from('departments').where({'business_id': data.id})
    // En caso de que la empresa exista, regresamos un estatus que nos indique
    // que ya existe y obvio ya no se registra esta empresa
    // EN ESTE CASO VAMOS A COMPARAR QUE EL FOLIO SEA DIFERENTE AL QUE YA TIENE
    // LA EMPRESA QUE VAMOS A ACTUALIZAR
    const toUpdate = yield Database.from('departments').where({'business_id': data.id})
    if (query.length > 0){
      return res.send({
        'status':1001
      })
    }
    else{
      // Usando el Modelo, hacemos una condicion de actualizacion, donde indicamos
      // que se actualizará por ID y cuales serán los valores
      yield Deparment.query()
      .where('business_id', data.id)
      .update({
        name  : data.name,
        userid: data.username
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
    yield Department.query()
    .where('id', data.id)
    .update({ active  : 0 })
    // regresamos un estatus 200, lo que nos indica que todo se ha completado
    // de manera exitos (Puede ser cualquier estatus que se desee, siempre
    // y cuando sepamos que significa para nosotros, "Yo utilizo estos por
    // estandar universal").
    return res.send({ status  : 200 })
  }
}
module.exports = departmentController
