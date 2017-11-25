'use strict'

// Requerimos lo necesario para trabajar
// Encriptado
const Hash = use('Hash')
// Bussiness - Base de datos
const Company = use('App/Model/Business')
// Acceder a la base de datos
const Database = use('Database')
// Nos ayuda a acceder a los directorios del sistema
const Helpers = use('Helpers')

class BusinessController {

  * save (req, res){
    // Obteneos todos los datos que enviamos en el AJAX
    var data = req.all()
    // Obtenemos la imagen, de esta manera ya que es un archivo y no
    // solo es texto como la Información anterior
    var file = req.file("logo")
    // Revisamos si existe ya una epresa con el folio que estamos enviando
    var query = yield Database.from('business').where({'folio':data.folio})
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
      const nameImage = Math.floor((Math.random() * 999999999999999999) + 1) + timestamp.getTime() + '.' + file.extension()
      // Le especificamos directamente la ruta donde se guardará la imagen
      // Por defecto de esta manera inicia desde PUBLIC
      // Y se guardará con el nombre random que acabamos de generar
      yield file.move(Helpers.publicPath('/assets/images/bussiness/'), nameImage)
      // Generamos una INSTANCIA de Company para crear una nueva Bussines en
      // la base de datos. COMPANY SE DECLARA EN LA PARTE DE ARRIBA DE
      // ESTE ARCHIVO
      // ** Se ingresan cada uno de los atributos que tengamos en la base de datos **
      var business    = new Company()
      business.name   = data.nombre
      business.logo   = nameImage // Guardamos el nombre random que generamos
      business.folio  = data.folio
      business.active = 1
      yield business.save()
      // regresamos un estatus 200, lo que nos indica que todo se ha completado
      // de manera exitos (Puede ser cualquier estatus que se desee, siempre
      // y cuando sepamos que significa para nosotros, "Yo utilizo estos por
      // estandar universal"), y ademas enviamos la información de la empresa que
      // acabamos de registrar.
      return res.send({
        status  : 200,
        data    : business
      })
    }
  }

  * getAllBusiness (req, res){
    // Hacemos la consulta de todas las empresas que se encuentren activas
    const business = yield Database.from('business').where('active', 1)
    return res.send(business)
  }

  * update (req, res){
    // Obteneos todos los datos que enviamos en el AJAX
    const data = req.all()
    // Obtenemos la imagen, de esta manera ya que es un archivo y no
    // solo es texto como la Información anterior
    const file = req.file("logo")
    // Revisamos si existe ya una epresa con el folio que estamos enviando
    const query = yield Database.from('business').where({'folio': data.folio})
    // En caso de que la empresa exista, regresamos un estatus que nos indique
    // que ya existe y obvio ya no se registra esta empresa
    // EN ESTE CASO VAMOS A COMPARAR QUE EL FOLIO SEA DIFERENTE AL QUE YA TIENE
    // LA EMPRESA QUE VAMOS A ACTUALIZAR
    const toUpdate = yield Database.from('business').where({'id': data.id})
    if (query.length > 0 && data.folio != toUpdate[0].folio){
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
      const nameImage = Math.floor((Math.random() * 999999999999999999) + 1) + timestamp.getTime() + '.' + file.extension()
      // Le especificamos directamente la ruta donde se guardará la imagen
      // Por defecto de esta manera inicia desde PUBLIC
      // Y se guardará con el nombre random que acabamos de generar

      // Revisamos si estamos enviando una imagen
      // ** En caso de que no vaya imagen, nos indica que simplemente la imagen no se
      // esta actualizando
      if (file){
        yield file.move(Helpers.publicPath('/assets/images/bussiness/'), nameImage)
      }
      else {
        // Si no existe imagen por actualizar, simplemente le indicamos
        // que el nombre de la imagen será el mismo que ya tiene
        nameImage = toUpdate[0].logo
      }
      // Usando el Modelo, hacemos una condicion de actualizacion, donde indicamos
      // que se actualizará por ID y cuales serán los valores
      yield Company.query()
      .where('id', data.id)
      .update({
        name  : data.nombre,
        logo  : nameImage,
        folio : data.folio
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
    yield Company.query()
    .where('id', data.id)
    .update({ active  : 0 })
    // regresamos un estatus 200, lo que nos indica que todo se ha completado
    // de manera exitos (Puede ser cualquier estatus que se desee, siempre
    // y cuando sepamos que significa para nosotros, "Yo utilizo estos por
    // estandar universal").
    return res.send({ status  : 200 })
  }

}

module.exports = BusinessController
