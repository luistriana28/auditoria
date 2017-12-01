'use strict'

const Lucid = use('Lucid')

class Auditoria extends Lucid {

  // Le especificamos la tabla a la que se va a conectar
  static get table(){
    return 'audits'
  }

}

module.exports = Auditoria
