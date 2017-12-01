'use strict'

const Lucid = use('Lucid')

class Departamento extends Lucid {

  // Le especificamos la tabla a la que se va a conectar
  static get table(){
    return 'departments'
  }

}

module.exports = Departamento
