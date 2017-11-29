'use strict'

const Lucid = use('Lucid')

class Auditor extends Lucid {

  // Le especificamos la tabla a la que se va a conectar
  static get table(){
    return 'users'
  }

}

module.exports = Auditor
