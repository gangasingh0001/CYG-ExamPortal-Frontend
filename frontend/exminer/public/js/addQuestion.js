var tempExamCode = ''
tempExamCode = localStorage.getItem('addQuestionid')

localStorage.removeItem('addQuestionid')
$(document).ready(function() {
    $.ajax("https://node-examportal.herokuapp.com/checkExaminer", {
            type: 'GET',
            //contentType: "application/json",
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
                   
                    window.location.replace('../../un.html')
                }
            
            }

        })


    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function(e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {

            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function() {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');

    $('input[name="colorRadio"]').click(function() {
        var inputValue = $(this).attr("value");
        var targetBox = $("." + inputValue);
        $(".box").not(targetBox).hide();
        $(targetBox).show();
    });
    $("#submitBtn").click(function(){
        
        var question = document.getElementById("addtestQuestion").value;
        var weightage = document.getElementById("addtestWeightage").value;
        if (question === "") {
            alert("Please enter question");
            return
        }
        var option = $("input[type=radio][name=colorRadio]:checked").val();
        if (option == undefined || option === '') {
            alert("select answer type")
            return
        }
        let option1 = '',
            option2 = '',
            option3 = '',
            option4 = '',
            answer = '',
            answerType = ''

        if (option == "red") {
            option1 = $("#addtestOption1").val();
            option2 = $("#addtestOption2").val();
            option3 = $("#addtestOption3").val();
            option4 = $("#addtestOption4").val();
            answerType = "multipleOption"
            $.each($("input[type=checkbox][name=option]:checked"), function () {
                if ($(this).val()) {
                    answer += $(this).val() + ' '
                }
            })
            answer = answer.trim()
            if (option1 === "" || option2 === "" || option3 === "" || option4 === "" || answer == ''|| answer===undefined) {
                alert("Please fill all options and tick answers");
                return
            }

        } else if (option == "green") {
            option1 = $("#addtestOption1G").val();
            option2 = $("#addtestOption2G").val();
            option3 = $("#addtestOption3G").val();
            option4 = $("#addtestOption4G").val();
            answerType = "singleOption"
            answer = $("input[type=radio][name=option1]:checked").val();
            
            if (option1 === "" || option2 === "" || option3 === "" || option4 === "" || answer == ''||answer == undefined) {
                alert("Please fill all options and select answer");
                return
            }
        }
        if (weightage === "") {
            alert("Please enter weightage");
            return
        }
        var formData = new FormData();

        formData.append('questionText', question);
        formData.append('answer', answer);
        formData.append('option1', option1);
        formData.append('option2', option2);
        formData.append('option3', option3);
        formData.append('option4', option4);
        formData.append('weightage', weightage);
        formData.append('examCode', tempExamCode);
        formData.append('answerType', answerType);
        formData.append('questionImage', $('input[type=file]')[0].files[0]);
        $.ajax("https://node-examportal.herokuapp.com/exam/question", {
            type: "POST",
            data: formData,
            dataType: "json",
            headers: {
                token: localStorage.getItem('token'),
                Authorization: "Bearer "+localStorage.getItem('token')
            },
            contentType: false,
            processData: false,
            success: function (data, status) {
                document.getElementById("addtestQuestion").value = '';
                // ("#addtestAnswer").value = '';
                if (answerType == "multipleOption") {
                    document.getElementById("addtestOption1").value = '';
                    document.getElementById("addtestOption2").value = '';
                    document.getElementById("addtestOption3").value = '';
                    document.getElementById("addtestOption4").value = '';
                    let checkBox = $('input[type=checkbox][name=option]')
                    $.each(checkBox, (i, chk) => {
                        if ($(chk).val()) {
                            $(chk).prop('checked', false)
                        }
                    })
                } else {
                    document.getElementById("addtestOption1G").value = '';
                    document.getElementById("addtestOption2G").value = '';
                    document.getElementById("addtestOption3G").value = '';
                    document.getElementById("addtestOption4G").value = '';
                    if ($('input[type=radio][name=option1]:checked').val()) {
                        $('input[type=radio][name=option1]').prop('checked', false)
                    }
                }
                document.getElementById("addtestWeightage").value = '';
                alert('Question Added')
            },
            error: function (error) {
            }
        });
    })
});
function excelUpload(event) {
 
    event.preventDefault();
    var formData = new FormData();
    formData.append('examCode', tempExamCode)
   
    formData.append('excelFile', $('input[type=file]')[0].files[0])
    $.ajax("https://node-examportal.herokuapp.com/exam/questions/uploadExcel", {
        type: 'POST',
        data: formData,
        headers: {
            token: localStorage.getItem('token'),
            Authorization: "Bearer "+localStorage.getItem('token')
        },
        lowerCaseHeaders: true,
        contentType:false,
        processData: false,
        success: function (data) {
            alert("You have successfully uploaded the questions through excel file")
            $(location).attr('href', './exam.html')
            
        },
        error: function (error) {
        }
    })
}

function logout() {
    localStorage.clear()
    location.replace("../../index.html")

}

function submitAllBtn() {
    location.replace("./questions.html")
}
