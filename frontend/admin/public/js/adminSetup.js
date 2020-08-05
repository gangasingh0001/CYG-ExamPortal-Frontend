const tok = localStorage.getItem('token');
if (tok == null) {
    location.replace("../../index.html")
}
$.ajax("https://node-examportal.herokuapp.com/checkadmin", {
    type: 'GET',
    headers: {
        "token": localStorage.getItem('token'),
        'Authorization': 'Bearer '+localStorage.getItem('token')

    },
    success: function(data) {
        document.getElementById('main').style.display='block';
        return
    },
    error: function(error) {
        if(error.responseText=="unauthorized")
        {
            window.location.replace('../../un.html')
        }
    }
})
function showpasswordtext()
{
  var x = document.getElementById("password");
 
    x.type = "text";
}

function showpassword()
{
  var x = document.getElementById("password");
  
    x.type = "password";
}
function logout() {
    localStorage.removeItem("token");
    localStorage.clear()
    window.location.replace("../../index.html");
}
$(document).ready(function() {
    // Email
    $("#email").on("keyup", (event) => {
        let regex1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
        if (regex1.test($("#email").val()) == true ) {

            $('#view_Invalid1').hide()
            $('#view_Valid1').show()
        }
        else {
            $('#view_Valid1').hide()
            $('#view_Invalid1').show()
        }
    })
    // Name
    $("#name").on("keyup", (event) => {
        let regex1 = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
        if (regex1.test($("#name").val()) == true ) {

            $('#view_Invalid2').hide()
            $('#view_Valid2').show()
        }
        else {
            $('#view_Valid2').hide()
            $('#view_Invalid2').show()
        }
    }) 
    //Password
    $("#password").on("keyup", (event) => {
        let regex1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
        if (regex1.test($("#password").val()) == true) {
            $('#view_Invalid3').hide()
            $('#view_Valid3').show()
        }
        else {
            $('#view_Valid3').hide()
            $('#view_Invalid3').show()
        }
    })
    //phone no
    $("#phoneno").on("keyup", (event) => {
        let regex1 = /^[0-9]\d{9}$/;
        if (regex1.test($("#phoneno").val()) == true) {
            $('#view_Invalid4').hide()
            $('#view_Valid4').show()
        }
        else {
            $('#view_Valid4').hide()
            $('#view_Invalid4').show()
        }
    })
    //collegename
    $("#collegename").on("keyup", (event) => {
        let regex1 = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (regex1.test($("#collegename").val()) == true) {
            $('#view_Invalid5').hide()
            $('#view_Valid5').show()
        }
        else {
            $('#view_Valid5').hide()
            $('#view_Invalid5').show()
        }
    })
        $.ajax("https://node-examportal.herokuapp.com/loggedIn", {
            type: 'GET',
           // dataType: 'JSON',
            headers: {
                "token": localStorage.getItem('token'),
                'Authorization': 'Bearer ' + localStorage.getItem('token')
    
            },
            success: function (data) {
                document.getElementById('span').innerHTML = 'Welcome ' + data.name + '! &nbsp; &nbsp; '
                localStorage.setItem("loggedInName", data.name)
            },
            error: function (error) {
            }
        })
    
    
    $("#submit").click(function(e) {
        e.preventDefault();
        var email = document.getElementById("email").value;
        var name = document.getElementById("name").value;
        var password = document.getElementById("password").value;
        var accountype = document.getElementById("accountype").value;
        var phoneno = document.getElementById("phoneno").value;
        var collegename = document.getElementById("collegename").value;
        var flag = 1;
        if ($("#email").val().length == 0) {
            $('#view_Invalid1').show()
            flag=0;
            return
        }
         if ($("#name").val().length == 0) {
            $('#view_Invalid2').show()
            flag=0;
            return
        }
         if ($("#password").val().length == 0) {
            $('#view_Invalid3').show()
            flag=0;
            return
        }
         if ($("#phoneno").val().length == 0) {
            $('#view_Invalid4').show()
            flag=0;
            return
        }
         if ($("#collegename").val().length == 0) {
            $('#view_Invalid5').show()
            flag=0;
            return
        }
        if (flag == 1) {

            $.ajax("https://node-examportal.herokuapp.com/examiner", {
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                headers: {
                    "token": localStorage.getItem('token'),
                    'Authorization': 'Bearer '+localStorage.getItem('token')
        
                },

                data: JSON.stringify({
                    "email": email,
                    "name": name,
                    "password": password,
                    "accountType": accountype,
                    "collegeName": collegename,
                    "phoneNumber": phoneno

                }),
                success: function(recent) {
                    if (recent.message == "user already exist") {
                        window.alert("User Already Exist");
                    } else {
                        window.alert("Account Created");
                        location.replace("../views/adminHome.html")
                    }

                },
                error: function() {
                }

            });
        }
        flag = 1;
    });
});
