$(document).ready(function () {
    $("#loggedInName").on("keyup", (event) => {
        let regex1 = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
        if (regex1.test($("#loggedInName").val()) == true ) {
    
            $('#view_Invalid1').hide()
            $('#view_Valid1').show()
        }
        else {
            $('#view_Valid1').hide()
            $('#view_Invalid1').show()
        }
    })
    $("#loggedInPhone").on("keyup", (event) => {
        let regex1 = /^[5-9]\d{9}$/;

        if (regex1.test($("#loggedInPhone").val()) == true) {
            $('#view_Invalid4').hide()
            $('#view_Valid4').show()
        }
        else {
            $('#view_Valid4').hide()
            $('#view_Invalid4').show()
        }
    })
    const tok = localStorage.getItem('token');
    if (tok == null) {
        location.replace("../../index.html")
    }
    $.ajax("https://node-examportal.herokuapp.com/checkexaminer", {
        type: 'GET',
        headers: {
            "token": localStorage.getItem('token'),
            'Authorization': 'Bearer ' + localStorage.getItem('token')

        },
        success: function (data) {
                       document.getElementById('main').style.display='block';
            

        },
        error: function (error) {
            if(error.responseText=="unauthorized")
            {
                window.location.replace('../../un.html')
            }
        }
    })

})


function showEdit() {
    $("#showEditDiv").fadeIn("slow");
    $.ajax("https://node-examportal.herokuapp.com/loggedIn", {
        type: 'GET',
        dataType: 'JSON',
        headers: {
            "token": localStorage.getItem('token'),
            'Authorization': 'Bearer ' + localStorage.getItem('token')

        },
        success: function (data) {

            changeInputFields(data)

        },
        error: function (error) {
        }
    })
}

function showName() {
    $.ajax("https://node-examportal.herokuapp.com/loggedIn", {
        type: 'GET',
        dataType: 'JSON',
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

}

function changeInputFields(data) {
    document.getElementById('loggedInEmail').value = data.email;
    document.getElementById('loggedInName').value = data.name;
    document.getElementById('loggedInPhone').value = data.phoneNumber;
    document.getElementById('loggedInCollege').value = data.collegeName;
    document.getElementById('loggedInPassword').value = data.password;

}
function editDetails() {
    var email = document.getElementById('loggedInEmail').value
    var name = document.getElementById('loggedInName').value
    var phone = document.getElementById('loggedInPhone').value
    var college = document.getElementById('loggedInCollege').value

    $.ajax("https://node-examportal.herokuapp.com/examiner", {
        type: 'PATCH',
        dataType: 'JSON',   
        contentType : "application/json",
        headers: {
            "token": localStorage.getItem('token'),
            'Authorization': 'Bearer ' + localStorage.getItem('token')

        },
        data: JSON.stringify({
            "email": email,
            "name": name,
            "phoneNumber": phone,
            "collegeName": college,
        }),

        success: function (data) {
            window.alert('User Details Updated !')
            hideEditDetails()
            showName()


        },
        error: function (error) {
            window.alert('Not Updated')
        }
    })
}

function hideEditDetails() {
    $("#showEditDiv").fadeOut("slow");
}

function logout() {
    localStorage.removeItem("token")
    localStorage.clear()
    location.replace("../../index.html")
}