$(document).on('click', '#verify',function () {
        var OTP = $(".form-control").val();
        if(OTP==""){
            return alert("Please enter OTP to continue")
        }
        
        $.ajax("https://node-examportal.herokuapp.com/login/otp/verification", {
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            beforeSend: function () {
                $('.main').animate({ opacity: 0.6 })
                $('.mod').fadeIn()
                $('.spinner').show()
            },
            headers : {
                "email":localStorage.getItem('email')
            },
            data: JSON.stringify({
                "otp":OTP,
                // "email":"gangaldh@yahoo.com"
            }),
            success: function (data) {
                if(data.code=="200"&&data.message=="verified successfully"){
                    localStorage.removeItem('email');
                    //localStorage.setItem('token',data.token);
                    window.alert("Your Email has been verified! Login again to continue")
                    $(location).attr('href', './login.html')
                }else if(data.code=="400"){
                    alert("Your OTP does not matched. Try again")
                    location.reload();
                }
                
            },
            error: function (error) {
                $('.spinner').hide()
                alert("An error occured please login again")
                location.replace('./login.html')
                
              
            }
        })
    })

    $(document).ready(function(){
        $.ajax('https://node-examportal.herokuapp.com/login/otp', {
            type: 'POST',
            dataType: 'JSON',
            contentType: "application/json;charset=utf-8",
            beforeSend: function() {
                $('.main').animate({ opacity: 0.4 })
                $('.mod').fadeIn()
                $('.spinner').show()
            },
            headers: {
                "email": localStorage.getItem('email'),
                Authorization: "Bearer "+localStorage.getItem('token')
            },
            success:function(data) {

                if(data.status=="200"){
                    $('.spinner').hide()
                    $('.main').animate({ opacity: 1 })
                    // $(".output").attr('placeholder','Otp sent to your phone')
                    
                    //$(location).attr('href', '../views/otp.html');
                }else {
                    window.alert("server error occured: please login again")
                    location.reload();
                }
            },
            error: function(data) {
                alert("error")
            }

        })
    })