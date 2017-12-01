'use strict'

// Requerimos lo necesario para trabajar
// Encriptado
const Hash = use('Hash')
// Bussiness - Base de datos
const Auditoria = use('App/Model/Auditoria')
// Acceder a la base de datos
const Database = use('Database')
// Nos ayuda a acceder a los directorios del sistema
const Helpers = use('Helpers')

class auditoriaController {

  * save (req, res){
    // Obteneos todos los datos que enviamos en el AJAX
    var data = req.all()
    // Revisamos si existe ya una epresa con el folio que estamos enviando
    var query = yield Database.from('audits').where({'name':data.nombre})
    // En caso de que la empresa exista, regresamos un estatus que nos indique
    // que ya existe y obvio ya no se registra esta empresa
    if (query.length > 0){
      return res.send({
        'status':1001
      })
    }
    else{
      // Llegamos a esta parte en caso de que la empresa no exista según el
      // folio que se ha ingresado

      // Generaos un nombre random para la imagen y le concatenamos
      // la extension del archivo al final
      const timestamp = new Date();
      const codigo = Math.floor((Math.random() * 999999999999999999) + 1) + timestamp.getTime()
      // Le especificamos directamente la ruta donde se guardará la imagen
      // Por defecto de esta manera inicia desde PUBLIC
      // Y se guardará con el nombre random que acabamos de generar
  
      // Generamos una INSTANCIA de Company para crear una nueva Bussines en
      // la base de datos. COMPANY SE DECLARA EN LA PARTE DE ARRIBA DE
      // ESTE ARCHIVO
      // ** Se ingresan cada uno de los atributos que tengamos en la base de datos **
      var auditoria    = new Auditoria()
      auditoria.name   = data.nombre
      auditoria.codigo   = codigo // Guardamos el nombre random que generamos
      auditoria.active = 1
      yield auditoria.save()
      // regresamos un estatus 200, lo que nos indica que todo se ha completado
      // de manera exitos (Puede ser cualquier estatus que se desee, siempre
      // y cuando sepamos que significa para nosotros, "Yo utilizo estos por
      // estandar universal"), y ademas enviamos la información de la empresa que
      // acabamos de registrar.
      return res.send({
        status  : 200,
        data    : auditoria
      })
    }
  }

  * getAllAuditoria (req, res){
    // Hacemos la consulta de todas las auditorias que se encuentren activas
    const auditoria = yield Database.from('audits').where('active', 1)
    return res.send(auditoria)
  }

  * update (req, res){
    // Obteneos todos los datos que enviamos en el AJAX
    const data = req.all()
  
    // Revisamos si existe ya una epresa con el folio que estamos enviando
    const query = yield Database.from('audits').where({'name': data.nombre})
    // En caso de que la empresa exista, regresamos un estatus que nos indique
    // que ya existe y obvio ya no se registra esta empresa
    // EN ESTE CASO VAMOS A COMPARAR QUE EL FOLIO SEA DIFERENTE AL QUE YA TIENE
    // LA EMPRESA QUE VAMOS A ACTUALIZAR
    const toUpdate = yield Database.from('audits').where({'id': data.id})
    if (query.length > 0 && data.nombre != toUpdate[0].nombre){
      return res.send({
        'status':1001
      })
    }
    else{
      // Llegamos a esta parte en caso de que la empresa no exista según el
      // folio que se ha ingresado

      // Generaos un nombre random para la imagen y le concatenamos
      // la extension del archivo al final
      const timestamp = new Date();
      const codigo = Math.floor((Math.random() * 999999999999999999) + 1) + timestamp.getTime()
     
      yield Auditoria.query()
      .where('id', data.id)
      .update({
        name  : data.nombre
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
    yield Auditoria.query()
    .where('id', data.id)
    .update({ active  : 0 })
    // regresamos un estatus 200, lo que nos indica que todo se ha completado
    // de manera exitos (Puede ser cualquier estatus que se desee, siempre
    // y cuando sepamos que significa para nosotros, "Yo utilizo estos por
    // estandar universal").
    return res.send({ status  : 200 })
  }

}

module.exports = auditoriaController
