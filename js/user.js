$(document).ready(function () {
  var url = "http://104.131.58.229:4000/api";

  //Sign up
  $("#signUp").click(function (e) {
    e.preventDefault();
    var data = {
      user: {
        email: $("#signUp_email").val(),
        name: $("#signUp_name").val(),
        pass: $("#signUp_password").val()
      }
    };

    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: url + "/users",
      data: JSON.stringify(data)
    }).done(function (data) {
      $(location).attr('href', 'http://localhost:8000/#/login/' + data.token);
    })
      .fail(function (data) {
        alert("Datos inválidos, intenta de nuevo");
      });
  });

  //Sign In
  $("#signIn").click(function (e) {
    e.preventDefault();
    var data = {
      user: {
        email: $("#signIn_email").val(),
        pass: $("#signIn_password").val()
      }
    };

    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: url + "/users/login",
      data: JSON.stringify(data)
    })
      .done(function (data) {
        $(location).attr('href', 'http://localhost:8000/#/login/' + data.token);
      })
      .fail(function (data) {
        alert("Correo electrónico o password incorrecto");
      });
  });

});
