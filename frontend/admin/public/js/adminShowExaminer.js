
function deleteexaminer(id)
{
  $("#modelid").attr('id',id)
}
function logout()
{
   localStorage.removeItem("token");
   localStorage.clear();
   window.location.replace("../../user/views/login.html");
}
function samepage()
{
  window.location.replace("../views/adminShowExaminer.html");
}

function loadSetupExaminerPage(data){
  $('#performance').empty()
  $.get('./adminSetupExaminer.html',function(template){
    var rendered = Mustache.render(template,{data:data})
    $('#targetPage').html(rendered)
  })
}


$(document).ready(function () {
  const tok =localStorage.getItem('token');
  if(tok == null)
  {
    location.replace("../../index.html")
  }
  //$.ajax('http://localhost:'+localStorage.getItem('server-port')+'/exam/accessKey', {
  $.ajax("https://node-examportal.herokuapp.com/examiner", {
    type: "GET",
    dataType: 'JSON',
    contentType: "application/json;charset=utf-8",
    headers:{
      token: localStorage.getItem('token')
    },
    success: function (recent) {
      display(recent);
      document.getElementById('main').style.display='block';
      return
     
    },
    error: function (error) {
      if (error.responseText == "unauthorized");
      {
        window.location.replace('../../un.html')
      }
     
    }

  });

  function display(recent) {
    const displaytemplate = document.querySelector("#index-template").innerHTML;
    const html = Mustache.render(displaytemplate, { data: recent })
    const performance = document.querySelector("#performance");
    performance.insertAdjacentHTML("beforeend", html)
  }
  $(document).on('click', '.deleteButton', function () {
    let id = $(this).attr('id')
   
    $.ajax("https://node-examportal.herokuapp.com/examiner/"+id, {
      type: "DELETE",
      dataType: "json",
      contentType: "application/json",
      headers:{
        token: localStorage.getItem('token')
      },
      data: JSON.stringify(
        {
          "_id": id
        }
      ),
      success: function (recent) {
        window.location.replace("../views/adminShowExaminer.html")
      },
      error: function () {
        
      }

    })
  })

  $(document).on('click', '.viewButton', function () {
    let id = $(this).attr('id')
    $.ajax("https://node-examportal.herokuapp.com/examiner/id", {
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      data: {
        "id": id
      },
      success: function (recent) {
      },
      error: function () {
      }

    })
  })
})