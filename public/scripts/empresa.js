'use strict'

function getValues(){
  // Obtenemos los tres valores que nos importan
  const nombre  = $("#business").val();
  const folio   = $("#folio").val();
  const imagen  = $("#logo").val();
  // Validamos que estos valores no vengan vacios
  // Ya que son necesarios todos
  if (nombre != "" && folio != ""){
    // Si los tres valores ya fueron ingresados, ahora sí, procedemos
    // ha enviar la informacion
    var formdata = new FormData($("#logoForm")[0]);
    formdata.append("nombre", nombre);
    formdata.append("folio", folio);
    return formdata;
  }
  else {
    // En caso de que se encuentre algun valor vacio, unicamente retornamos
    // NULO
    return null;
  }
}

// Se le agregan un par de atributos para que la peticion al servidor
// Pueda procesar los Archivos de manera correcta
$("#save").click(function(e){
  // Al momento de dar click, deshabilitamos el boton
  var $btn = $(this);
  $btn.prop('disabled', true);
  // Obteneos los valores
  let values = getValues();
  // Verificamos la accion que tendra el boton de guardar
  if ($(this).data('accion') == "actualizar"){
    // Verificamos que tengamos todos los valores necesarios
    // de ser así, proseguimos a enviar la peticion al servidor
    if (values != null){
      // En este caso de actualización la imagen no necesariamente
      // es solicitada ya que es opcional el querer actualizarla
      // =========
      // A los valores que ya tenemos capturados, le agregamos el id de la
      // empresa que deseamos actualizar
      // ** EL ID LO TENEMOS EN EL ATRIBUTO DATA LLAMADO "business" QUE
      // AGREGAMOS AL MOMENTO DE DAR CLICK EN EL BOTON DE ACTUALIZAR **
      values.append('id', $btn.data('business'));
      $.ajax({
          url: '/updatebusiness',
          type: 'POST',
          processData: false,
          contentType: false,
          data: values
        })
        .done(function(res){
          if (res.status == 200){
            alert("Empresa actualizada correctamente");
            window.location.reload();
          }
          else if (res.status == 1001) {
            alert('Ya existe una empresa registrada con el mismo RFC');
          }
          else {
            alert("Algo ha salido mal");
            console.log(res);
          }
        })
        .fail(function(err){
          alert("Algo ha salido mal");
          console.log("Error", err);
        })
        .always(function(){
          // Siempre que la peticion se termine, habilitamos el boton nuevamente
          $btn.prop('disabled', false);
        });
    }
  }
  else {
    // Verificamos que tengamos todos los valores necesarios
    // de ser así, proseguimos a enviar la peticion al servidor
    if (values != null){
      // Verificamos que exista una imagen ya que es registro y ésta es
      // necesaria para completar el registro
      if ($("#logo").val() != ""){
        $.ajax({
          url: '/savebusiness',
          type: 'POST',
          processData: false,
          contentType: false,
          data: values
        })
        .done(function(res){
          if (res.status == 200){
            alert("Empresa registrada correctamente");
            window.location.reload();
          }
          else if (res.status == 1001) {
            alert('Ya existe una empresa registrada con el mismo RFC');
          }
          else {
            alert("Algo ha salido mal");
            console.log(res);
          }
        })
        .fail(function(err){
          alert("Algo ha salido mal");
          console.log("Error", err);
        })
        .always(function(){
          // Siempre que la peticion se termine, habilitamos el boton nuevamente
          $btn.prop('disabled', false);
        });
      }
      else {
        $btn.prop('disabled', false);
        alert("Llena todos los campos ya que son necesarios");
      }
    }
    else {
      // En caso de que venga NULL, por el momento, unicamente mostramos
      // una alerta que nos indique que devemos ingresar toda la informacion
      // Y habilitamos el boton
      $btn.prop('disabled', false);
      alert("Llena todos los campos ya que son necesarios");
    }
  }
});


// Le damos clic al boton y este hará un click automatico al input
// del logotipo que esta escondido en el html
$("#btnFile").click(function(e) {
  $("#logo").trigger("click");
});

// Cuando el input escondido cambia su valor (seleccionamos una foto)
// El nombre de esa foto se coloca en el input
$("#logo").change(function(event) {
  $("#logoInp").val($(this).val());
});

// =====================================================

// Funcion que nos permite obtener toda la información de las empresas que
// ya tenemos registradas
function consultingData(){
  $.ajax({
    url: '/getAllBusiness', // No olvidar crear la ruta en ROUTES.JS
    type: 'POST'
  })
  .done(function(res) {
    // Recorremos la respuesta, y por cada elemto, lo agregamos a la tabla
    $.each(res, function(index, el) {
      $("#empresasTable tbody").append(`
        <tr>
          <td>${el.name}</td>
          <td>${el.folio}</td>
          <td>
            <button type="button" class="btn btn-primary btnUpd" data-obj='${JSON.stringify(el)}'>Actualizar</button>
            <button type="button" class="btn btn-danger btnDel" data-obj='${JSON.stringify(el)}'>Eliminar</button>
            <button type="button" class="btn btn-success btnDep" data-obj='${JSON.stringify(el)}'>Departamento</button>
          </td>
        </tr>
      `);
    });
    // Inicializamos la tabla ya con los valores agregados
    $('#empresasTable').bootstrapTable();
  })
  .fail(function(err) {
    alert("Algo ha salido mal al obtener las empresas");
    console.log(err);
  });
}

// =====================================================

// Click para mostrar la informacion de la empresa a actualizar
// ya que el elemento no existe en nuestro html, accedemos a el de esta manera
$("body").on('click', '.btnUpd', function(event) {
  // Obtenemos la información de la empresa ya que se la asignamos al boton
  // al momento de llenar la tabla
  var obj = $(this).data('obj');
  $("#sectionTable").fadeOut('slow', function(){
    // Insertamos la información en los inputs
    $("#business").val(obj.name);
    $("#folio").val(obj.folio);
    $("#logoInp").val(obj.logo);
    // Le asignamos un atributo al boton guardar para que nos haga la funcionalidad
    // de guardar, y poder reutilizarlo
    $("#save").data('accion', 'actualizar');
    // Guardamos en un atributo, el id de la empresa para saber cual es la
    // que vamos a actualizar
    $("#save").data('business', obj.id);
    $("#sectionData").fadeIn('slow');
  });
});

//
$("body").on('click', '.btnDep', function(event) {
  // Obtenemos la información de la empresa ya que se la asignamos al boton
  // al momento de llenar la tabla
  var obj = $(this).data('obj');
  window.location.href="/department/"+ obj.id;
});

// =====================================================

// Click para eliminar a la empresa
$("body").on('click', '.btnDel', function(event) {
  // Al momento de dar click, deshabilitamos el boton
  var $btn = $(this);
  $btn.prop('disabled', true);
  // Obtenemos la información de la empresa ya que se la asignamos al boton
  // al momento de llenar la tabla
  var obj = $(this).data('obj');
  // ** SE DEBE DE PREGUNTAR SI ESTA SEGURO DE Eliminar
  //    PERO POR LAS PRISAS LO HAREMOS DE MANERA DIRECTA **
  $.ajax({
    url: '/inactivebusiness',
    type: 'POST',
    data: { id : obj.id }
  })
  .done(function(res){
    if (res.status == 200){
      alert("Empresa eliminada correctamente");
      window.location.reload();
    }
    else {
      alert("Algo ha salido mal");
      console.log(res);
    }
  })
  .fail(function(err){
    alert("Algo ha salido mal");
    console.log("Error", err);
  })
  .always(function(){
    // Siempre que la peticion se termine, habilitamos el boton nuevamente
    $btn.prop('disabled', false);
  });
});


// =================================================
// _TODO LO QUE SE EJECUTE A PARTIR DE AQUI SE REALIZARÁ DESPUES
//  DE QUE LA PAGINA ESTE COMPLETAMENTE CARGADA, PARA EVITAR ERRORES
// PARA ESTO SE USA LA FUNCION AUTOEJECUTADA COMO SE MUESTRA ACONTINUACIÓN

$(function(){

  // Mostramos el formulario de registro
  $("#add").click(function(e){
    $("#sectionTable").fadeOut('slow', function(){
      // Le asignamos un atributo al boton guardar para que nos haga la funcionalidad
      // de registrar, y poder reutilizarlo
      $("#save").data('accion', 'registrar');
      $("#sectionData").fadeIn('slow');
    });
  });

  // Cancelamos y volvemos a mostrar la tabla
  $("#btnCancel").click(function(e){
    $("#sectionData").fadeOut('slow', function(){
      $(".form-control1").val("");
      $("#sectionTable").fadeIn('slow');
    });
  });

  // Obtenemos las empresas
  consultingData();


});
