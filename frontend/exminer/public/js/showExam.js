function addQuestion(id) {
    localStorage.setItem('addQuestionid', id);
    $(location).attr('href', '../views/addQuestion.html');
}

function showQuestion(id) {
    let examCode = $('#' + id).parent().prev().prev().prev().prev().find('p').html()
    localStorage.setItem('examCode', examCode)
    $(location).attr('href', '../views/questions.html')
}

function updateExam(examObjId) {
    
    let examDetail = {
        examName: $('#addExamName').val(),
        examCode: $('#addExamCode').val(),
        examDuration: $('#addExamDuration').val(),
        examStartTime: $('#addExamDate').val(),
        instructions: $('#addExamInstruction').val()
    }
    $.ajax("https://node-examportal.herokuapp.com/exam/" + examObjId, {
        type: 'PATCH',
        dataType: 'json',
        contentType: "application/json",
        headers: {
            token: localStorage.getItem('token'),
            Authorization: "Bearer "+localStorage.getItem('token')
        },
        data: JSON.stringify(examDetail),
        success: function(data) {
            alert('Updated')
            location.reload(true)
        },
        error: function(error) {
            alert('something went wrong')
          
        }
    })
}

function editExamDetail(id) {
    let examObjId = $('#' + id).parent().parent().attr('id')
    let mainId = $('#' + id).parent().parent().parent().parent().attr('id')
    $('#' + mainId).hide()
    $.ajax("https://node-examportal.herokuapp.com/exam/" + examObjId, {
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        headers: {
            token: localStorage.getItem('token'),
            Authorization: "Bearer "+localStorage.getItem('token')
        },
        success: function(data) {
            let editForm = $("#edit-exam-detail").html()
            $("#display-form").append(Mustache.render(editForm, data))
        },
        error: function(error) {
            alert('something went wrong')
           
        }
    })
}

function setId(id) {
    $("#del").attr('id', id)
}

function deleteExam(id) {
    examObjId = $('#' + id).parent().parent().attr('id')
    $.ajax("https://node-examportal.herokuapp.com/exam/" + examObjId, {
        type: 'DELETE',
        dataType: 'json',
        contentType: "application/json",
        headers: {
            token: localStorage.getItem('token'),
            Authorization: "Bearer "+localStorage.getItem('token')
        },
        success: function(data) {
            location.reload(true)
        },
        error: function(error) {
            alert('something went wrong')
           
        }
    })
}

$(document).ready(() => {
    
    
        $.ajax("https://node-examportal.herokuapp.com/exam", {
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            headers: {
                token: localStorage.getItem('token'),
                Authorization: "Bearer "+localStorage.getItem('token')
            },
            success: function(data) {
                if (data.msg == 'No Exam') {
                    alert("Exam Does not exist in your account")
                    return
                }
                let parent = $(".exam-detail")
                    // load html template to display exam detail
                $.each(data, (index, values) => {
                    let html = $('#display-exam-detail').html()
                    values.examStartTime= moment(values.examStartTime).format('LLL');
                    values.index = index
                    parent.append(Mustache.render(html, values))
                })
            },
            error: function(error) {
                if (error.responseText == 'No Exam') {
                    alert('No Exam created')
                    $(location).attr('href', '../views/examiner.html')
                }
            
            }
        })
       $.ajax("https://node-examportal.herokuapp.com/checkExaminer", {
            type: 'GET',
            headers: {
                token: localStorage.getItem('token'),
                Authorization: "Bearer "+localStorage.getItem('token')
            },
            success: function(data) {
                                document.getElementById('main').style.display='block';
                return
            },
            error: function(error) {
                  if(error.responseText=="unauthorized")
                {
                
                }
            
            }

        })
    })
    