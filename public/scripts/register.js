'use strict'

function getValues(){
  const value = {
    'username': $("#username").val(),
    'password': $("#password").val(),
    'cpassword': $("#cpassword").val()
  }
  return value;
}


$("#reg-btn").click(function(e){
  let values = getValues();
  if (values.password != values.cpassword) {
    alert ("Contraseñas no coinciden")
  }
  else{
    $.ajax({
    'url': '/reg',
    'method': 'POST',
    'data': values
  })
  .done(function(res){
    console.log(res);
    if (res.status == 200){
      window.location.href='/'
    }
    else {
      if (res.status == 1001){
        alert('Username ya existe')
      }
    }
  })
  .fail(function(err){
    console.log("Error", err);
  });
  }
});
