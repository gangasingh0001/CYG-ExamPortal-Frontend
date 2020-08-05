

$(document).ready(function () {
    $("#firstName").on("keyup", (event) => {
        let regex1 = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
        if (regex1.test($("#firstName").val()) == true ) {

            $('#view_Invalid1').hide()
            $('#view_Valid1').show()
        }
        else {
            $('#view_Valid1').hide()
            $('#view_Invalid1').show()
        }
    })
    $("#lastName").on("keyup", (event) => {
        let regex1 = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
        if (regex1.test($("#lastName").val()) == true) {
            $('#view_Invalid2').hide()
            $('#view_Valid2').show()
        }
        else {
            $('#view_Valid2').hide()
            $('#view_Invalid2').show()
        }
        
    })
    $("#inputEmail").on("keyup", (event) => {
      
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
    $("#phoneNumber").on("keyup", (event) => {
        
        let regex1 = /^[5-9]\d{9}$/;

        if (regex1.test($("#phoneNumber").val()) == true) {
            $('#view_Invalid4').hide()
            $('#view_Valid4').show()
        }
        else {
            $('#view_Valid4').hide()
            $('#view_Invalid4').show()
        }
    })
    $("#inputPassword").on("keyup", (event) => {
       
        let regex1 = /(?=.{6,})/;

        if (regex1.test($("#inputPassword").val()) == true) {
            $('#view_Invalid5').hide()
            $('#view_Valid5').show()
        }
        else {
            $('#view_Valid5').hide()
            $('#view_Invalid5').show()
        }
    })
    $("#cnfPassword").on("keyup", (event) => {
       
        let regex1 = $("#inputPassword").val();
        var result = (event.target.value == regex1);

        if (result == true) {
            $('#view_Invalid6').hide()
            $('#view_Valid6').show()
        }
        else {
            $('#view_Valid6').hide()
            $('#view_Invalid6').show()
        }
    })
    

    $("#signUpSubmit").click(function validate() {
        var firstName = $("#firstName").val()
        firstName = firstName.trim()
        var lastName = $("#lastName").val()
        Email = $("#inputEmail").val()
        var PhoneNumber = $("#phoneNumber").val()
        var Password = $("#inputPassword").val()
        confirmPassword = $("#cnfPassword").val()
        var accountType = "Student"
        if ($("#firstName").val().length == 0) {
            $('#view_Invalid1').show()
            return
        }
        if ($("#firstName").val().trim().length == 0) {
            $('#view_Invalid1').show()
            return
        }
        if ($("#lastName").val().length == 0) {
            $('#view_Invalid2').show()
            return
        }
        if ($("#lastName").val().trim().length == 0) {
            $('#view_Invalid1').show()
            return
        }
        if ($("#inputEmail").val().length == 0) {
            $('#view_Invalid3').show()
            return
        }
        if ($("#phoneNumber").val().length == 0) {
            $('#view_Invalid4').show()
            return
        }
        if ($("#inputPassword").val().length == 0) {
            $('#view_Invalid5').show()
        }
        if ($("#cnfPassword").val().length == 0) {
            $('#view_Invalid6').show()
        }
        if ($("#inputPassword").val() != $("#cnfPassword").val()) {
            return alert("Passwords Dont match")
        }
        if (lastName == "") {
            name = firstName;
        }
        else{
            name = firstName + " " + lastName;
        }
        $.ajax("https://node-examportal.herokuapp.com/signUp", {
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            beforeSend: function () {
                $('.main').animate({ opacity: 0.6 })
                $('.mod').fadeIn()
                $('.spinner').show()
            },
            data: JSON.stringify({
                "name": name,
                "email": Email,
                "phoneNumber": "+91" +PhoneNumber,
                "password": Password,
                "accountType": accountType
            }),
            success: function (data) {
                if(data.status=="200"){
                    alert("Your SignUp has been successful")
                    $(location).attr('href', '../views/login.html')
                }else {
                    if(data.status=="400"){
                        window.alert("Please enter a valid email address")
                    }
                }
                alert("Your SignUp has been successful")
                    $(location).attr('href', '../views/login.html')
                
                
            },
            error: function (error) {
                $('.spinner').hide()
                alert("User already Exists")
                $(location).attr('href', './signUp.html')
            }
        })
    })
})
function showpasswordtext()
{
  var x =  document.getElementById("inputPassword");
 
    x.type = "text";
}

function showpassword()
{
  var x = document.getElementById("inputPassword")
  
    x.type = "password";
}