'use strict'

const Hash = use('Hash')
const User = use('App/Model/User')
const Database = use('Database')

class LoginController {

  * login(req, res){
    try {

      var data = req.all()
      let usuario = yield Database.from('users').where({'active':1, 'username':data.username})
      if (usuario.length>0) {
        var login = yield req.auth.attempt(data.username,data.password)
        if (login) {
            return res.send({
              'status':200
            })
        }
        else {
          return res.send({
            'status':401
          })
        }
      }
      else {
        return res.send({
          'status':404
        })
      }
      return res.send(usuario)

    } catch (e) {
      return res.send({
        'status':401,
        'data': e
      })
      console.log(e);
    }

  }

  *logout(req,res){
    yield req.auth.logout()
    return res.redirect('/')
  }

  *reg(req, res){
    var data = req.all()
    var query = yield Database.from('users').where({'username':data.username})
    if (query.length > 0){
      return res.send({
      'status':1001
    })
    }
    else{
      var user = new User()
      user.username = data.username
      user.password = yield Hash.make(data.password)
      user.token = yield Hash.make(data.username)
      user.role = 'Administer'
      yield user.save()
      return res.send({
        'status':200
    })

    }
  }

}

module.exports = LoginController
