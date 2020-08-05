$(document).ready(function(){
    if(localStorage.getItem('token')!=null)
    {
    $.ajax("https://node-examportal.herokuapp.com/userawake",{
        type: 'GET',
        headers:{
            "token":localStorage.getItem('token')
        },
        success: function(data){
           
            if (data == "Examiner")
                    $(location).attr('href', '../../exminer/views/examiner.html')
                else if (data == "Student")
                    $(location).attr('href', './accessKey.html')
                else {
                    $(location).attr('href', '../../admin/views/adminHome.html')
                }
        }
    })}
})