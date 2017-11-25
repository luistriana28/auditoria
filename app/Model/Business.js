'use strict'

const Lucid = use('Lucid')

class Business extends Lucid {

  // Le especificamos la tabla a la que se va a conectar
  static get table(){
    return 'business'
  }

}

module.exports = Business
