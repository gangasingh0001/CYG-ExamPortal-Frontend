function showpasswordtext()
{
  var x = document.getElementById("inputPassword");
 
    x.type = "text";
}

function showpassword()
{
  var x = document.getElementById("inputPassword");
  
    x.type = "password";
}
$(document).on('click', '#loginButton', function() {
        let email = $('#inputEmail').val()
        let password = $('#inputPassword').val()
        $.ajax('https://node-examportal.herokuapp.com/login', {
            type: 'POST',
            dataType: 'JSON',
            contentType: "application/json;charset=utf-8",
            beforeSend: function() {
                $('.main').animate({ opacity: 0.4 })
                $('.mod').fadeIn()
                $('.spinner').show()
            },
            data: JSON.stringify({
                'email': email,
                'password': password
            }),
            success:async function(data) {
                // localStorage.setItem('token', data.token)
                // if(data.verification=="required"){
                //     localStorage.setItem('email',email)
                //     location.replace('./otp.html')
                // }
                // else
                 if (data.accountType == "Examiner")
                    {
                        localStorage.setItem('token', data.token);
                        $(location).attr('href', '../../exminer/views/examiner.html');
                    }
                else if (data.accountType == "Student"){
                    localStorage.setItem('token', data.token);
                    $(location).attr('href', './accessKey.html')
                }
                    
                else if(data.accountType == "Admin") {
                    localStorage.setItem('token', data.token);
                    $(location).attr('href', '../../admin/views/adminHome.html')
                }
            },
            error: function(data) {
                $('.main').animate({ opacity: 1 })
                $('.mod').fadeOut()
                $('.spinner').hide()
                $('#alert-box').show();
            }

        })
    })
    var input = document.getElementById("inputPassword");
    var loginEmail = document.getElementById("inputEmail");

    input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("loginButton").click();
  }
});
$("#inputEmail").on("keyup", (event) => {
    $('#alert-box').hide();

    let regex1 = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (regex1.test($("#inputEmail").val()) == true) {
        $('#view_Invalid3').hide()
        $('#view_Valid3').show()
    }
    else {
        $('#view_Valid3').hide()
        $('#view_Invalid3').show()
    }
})
$("#inputPassword").on("keyup",(event) => {
    $('#alert-box').hide();
})

loginEmail.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("loginButton").click();
  }
});


    // })