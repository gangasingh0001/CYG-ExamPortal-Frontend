$(document).ready(function(){
    $("#submit").click(function(e){
        e.preventDefault();
        var email=document.getElementById("email").value;
        var name=document.getElementById("name").value;
        var password=document.getElementById("password").value;
        var accountype=document.getElementById("accountype").value;
        var phoneno=document.getElementById("phoneno").value;
        var collegename=document.getElementById("collegename").value;

       
      $.ajax("https://node-examportal.herokuapp.com/examiner",{
        type:"POST",
        dataType:"json",
        contentType:"application/json",
        
            data:JSON.stringify(
                {
                  "email":email,
                  "name":name,
                  "password":password,
                  "accountType":accountype,
                  "collegeName":collegename,
                  "phoneNumber":phoneno

                }
            ),
            success:function(recent){ 
            
              window.location.replace("adminHome.html")
            },
            error:function()
            {
               
            }
            
          });
      });
  });