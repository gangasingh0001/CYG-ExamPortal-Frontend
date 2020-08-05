var tempExamCode = ''


$(document).ready(function () {
    document.getElementById('exam').style.fontWeight='700';
    document.getElementById('exam').style.color='#007bff';

    document.getElementById('disable').style.display='none'
    document.getElementById('disabled2').style.display='none'
    document.getElementById('disabled3').style.display='none'
    document.getElementById('span').innerHTML = "Welcome " + localStorage.getItem('loggedInName') + "! &nbsp;&nbsp;"
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');
    allWells.hide();

    navListItems.click(function (e) {
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
    
    allNextBtn.click(function () {
        document.getElementById('addQuestion').style.fontWeight='700';
    document.getElementById('addQuestion').style.color='#007bff';
    document.getElementById('upload').style.fontWeight='400';
    document.getElementById('upload').style.color='black';

        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;
        // document.getElementById('disabled3').href='#step-3'

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
    $('input[name="colorRadio"]').click(function () {
        var inputValue = $(this).attr("value");
        var targetBox = $("." + inputValue);
        $(".box").not(targetBox).hide();
        $(targetBox).show();
    });
});


$(document).ready(function () {
    $('#btnSave').attr('disabled', true)
    $('.form-test input').keyup(function () {
        $("#addExamName").on("keyup", (event) => {
            let regex1 = /^([a-zA-Z\s]){3,30}$/;
            if (regex1.test($("#addExamName").val()) == true) {
                $('#view_Invalid1').hide()
                $('#view_Valid1').show()

            }
            else {
                $('#btnSave').attr('disabled',true)
                $('#view_Valid1').hide()
                $('#view_Invalid1').show()
            }
        })

        $("#addExamCode").on("keyup", (event) => {
            let regex1 = /^([a-zA-Z0-9 _-]){3,8}$/;        ;
            if (regex1.test($("#addExamCode").val()) == true) {
                $('#view_Invalid2').hide()
                $('#view_Valid2').show()
            }
            else {
                $('#btnSave').attr('disabled',true)
                $('#view_Valid2').hide()
                $('#view_Invalid2').show()
            }
        })
        $("#addExamDuration").on("keyup", (event) => {
            // let regex1 = /^([0-9]\s){1,4}$/;
            let regex1= /^([0-9\s]){0,4}$/
            if (regex1.test($("#addExamDuration").val()) == true) {
                $('#view_Invalid3').hide()
                $('#view_Valid3').show()
            }
            else {
                $('#btnSave').attr('disabled',true)
                $('#view_Valid3').hide()
                $('#view_Invalid3').show()
            }
        })
        
        let isTrue = true
        if($('#addExamName').val() === ''){
            isTrue = false
        }
        else if($('#addExamCode').val() === ''){
            isTrue = false
        }
        else if($('#addExamDuration').val() === ''){
            isTrue = false
        }
        if(isTrue  == true){
            $('#btnSave').removeAttr('disabled')
        }
        else{
            $('#btnSave').attr('disabled',true)
        }

    })

    document.getElementById('btnSave').addEventListener('click', validateForm)
    function validateForm() {
        var testName = document.getElementById("addExamName").value;
        var testCode = document.getElementById("addExamCode").value;
        var testDuration = document.getElementById("addExamDuration").value;
        var testDate = document.getElementById("addExamTestDate").value;
        localStorage.setItem('examName',testName);
        localStorage.setItem('examCode',testCode);
        var flag = 0;
        
        
        if (flag == 0) {
            const testD = testDate.slice(0, 10);
            const testd = testDate.slice(11, 16)
            testDate = testD.concat(" " + testd + ":00")
            tempExamCode = testCode
            let examDetail = {
                examName: testName,
                examCode: tempExamCode,
                examDuration: testDuration,
                examStartTime: testDate
            }
            $.ajax("https://node-examportal.herokuapp.com/exam", {
                type: "POST",
                dataType: "json",
                headers: {
                    token: localStorage.getItem('token'),
                    Authorization: "Bearer " + localStorage.getItem('token')
                },
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(examDetail),
                contentType: "application/json; charset=utf-8",
                success: function (recent) {
                    document.getElementById("addExamName").value = '';
                    document.getElementById("addExamCode").value = '';
                    document.getElementById("addExamDuration").value = '';
                    document.getElementById("addExamTestDate").value = '';
                    document.getElementById('step-1').style.display = 'none';
                    document.getElementById('step-2').style.display = 'block';
                    document.getElementById('step-3').style.display = 'none';
                    document.getElementById('exam').style.fontWeight='400';
                    document.getElementById('exam').style.color='black';
                    document.getElementById('upload').style.fontWeight='700';
                    document.getElementById('upload').style.color='#007bff';
                    document.getElementById('exam-card').style.display='block';
                    document.getElementById('sampleExamName').innerHTML=localStorage.getItem('examName');
                    document.getElementById('sampleExamCode').innerHTML=localStorage.getItem('examCode');



                    // down.innerHTML = "Link disabled";
                },
                error: function (error){
                    alert("Exam Code Already Exist");
                }
            })
        }
    }
})

$(document).ready(function () {
    document.getElementById('submitBtn').addEventListener('click', (event) => {

        var question = document.getElementById("addtestQuestion").value;
        var weightage = document.getElementById("addtestWeightage").value;
        // if (question === "") {
        //     alert("Please enter question");
        //     return
        // }
        if ($("#addExamName").val().length == 0) {
            $('#view_Invalid5').show()
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
            // if (option1 === "" || option2 === "" || option3 === "" || option4 === "" || answer == ''|| answer===undefined) {
            //     alert("Please fill all options and tick answers");
            //     return
            // }

        } else if (option == "green") {
            option1 = $("#addtestOption1G").val();
            option2 = $("#addtestOption2G").val();
            option3 = $("#addtestOption3G").val();
            option4 = $("#addtestOption4G").val();
            answerType = "singleOption"
            answer = $("input[type=radio][name=option1]:checked").val();
            // if (option1 === "" || option2 === "" || option3 === "" || option4 === "" || answer == ''||answer == undefined) {
            //     alert("Please fill all options and select answer");
            //     return
            // }
            if (answer == undefined) {
                alert("Please select answer");
                return
            }
        }
        if (weightage === "") {
            alert("Please enter weightage");
            return
        }
        if ($("#addtestWeightage").val().length == 0) {
            $('#view_Invalid6').show()
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
        formData.append('questionImage', $('input[type=file]')[1].files[0]);
        // debugger
        $.ajax("https://node-examportal.herokuapp.com/exam/question", {
            type: "POST",
            data: formData,
            dataType: "JSON",
            headers: {
                token: localStorage.getItem('token'),
                Authorization: "Bearer " + localStorage.getItem('token')
            },
            contentType: false,
            processData: false,
            success: function (data) {
                document.getElementById("addtestQuestion").value = '';
                // ("#addtestAnswer").value = '';
                if (answerType == "multipleOption") {
                    document.getElementById("addtestOption1").value = '';
                    document.getElementById("addtestOption2").value = '';
                    document.getElementById("addtestOption3").value = '';
                    document.getElementById("addtestOption4").value = '';
                    document.getElementById("myImage").value = ''
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
                    document.getElementById("myImage").value = '';
                    if ($('input[type=radio][name=option1]:checked').val()) {
                        $('input[type=radio][name=option1]').prop('checked', false)
                    }
                }
                document.getElementById("addtestWeightage").value = '';
                alert("Question Added")
            },
            error: function (error) {
            }
        });
    })

    // function validateForm(event) { }
})

//this uploads excel file
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
            Authorization: "Bearer " + localStorage.getItem('token')
        },
        lowerCaseHeaders: true,
        contentType: false,
        processData: false,
        success: function (data) {
            alert("You have successfully uploaded the questions through excel file")
            $(location).attr('href', './exam.html')

        },
        error: function (error) {
        }
    })
}

function submitAllBtn() {
    localStorage.setItem('examCode',tempExamCode)
    location.replace("./questions.html")

}
