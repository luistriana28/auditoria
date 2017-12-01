'use strict'

function getValues(){
  const value = {
    'username': $("#username").val(),
    'password': $("#password").val()
  }
  return value;
}


$("#login-btn").click(function(e){
  let values = getValues();
  console.log(values);
  $.ajax({
    'url': '/login',
    'method': 'POST',
    'data': values
  })
  .done(function(res){
    if (res.status == 200){
      window.location.href='/dashboard'
    }
    if (res.status == 401) {
      alert('Tus credenciales son incorrectas')
      console.log(res)
    }
    if (res.status ==404) {
      alert('El usuario no existe')
    }
    console.log("Exito", res);
  })
  .fail(function(err){
    console.log("Error", err);
  });
});
