// this page will create dom to display details of students
function drawChart(data, total) {
    let ctx = document.getElementById('myChart').getContext('2d');
    let labels = ['< 40% ', '40%-60% ', '60%-80% ', '> 80% '];
    let colorHex = ['#FB3640', '#EFCA08', '#43AA8B', '#253D5B'];
    let m1 = 0,
        m2 = 0,
        m3 = 0,
        m4 = 0
    for (let i = 0; i < data.length; i++) {
        let percent = data[i].totalScore / total * 100
        if (percent < 40)
            m1++
            else if (percent >= 40 && percent < 60)
                m2++
                else if (percent >= 60 && percent < 80)
                    m3++
                    else if (percent >= 80)
                        m4++
    }
    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [m1, m2, m3, m4],
                backgroundColor: colorHex
            }],
            labels: labels
        },
        options: {
            responsive: true,
            legend: {
                position: 'bottom'
            },
            plugins: {
                datalabels: {
                    color: '#fff',
                    anchor: 'end',
                    align: 'center',
                    soffset: 10,
                    borderWidth: 2,
                    borderColor: '#fff',
                    borderRadius: 30,
                    backgroundColor: (context) => {
                        return context.dataset.backgroundColor;
                    },
                    font: {
                        weight: 'bold',
                        size: '10'
                    },
                    formatter: (value) => {
                        return value;
                    }
                }
            }
        }
    })
}

function showStudents() {
    const tok = localStorage.getItem('token');
    if (tok == null) {
        location.replace("../../index.html")
    }

    $.ajax("https://node-examportal.herokuapp.com/examiner/exams", {
        type: 'GET',
        dataType: 'JSON',
        headers: {
            'token': localStorage.getItem('token'),
            'Authorization': 'Bearer '+localStorage.getItem('token')

        },
        success: function(data) {
            let i = 0;
            let count = 1;
            while (i < data.length) {
                let tr = document.createElement('tr')
                tr.innerHTML = "<td class='cursor' id='" + data[i].examCode + "'onclick='studentDetails(this)'>" + data[i].examCode + "</td>" + "<td class='cursor' id='" + data[i].examCode + "'onclick='studentDetails(this)'>" + data[i].examName + "</td>";
                $("#tbdy").append(tr)
                i++;
                count++;
            }
        },
        error: function(error) {
          
        }
    })
}

function logout() {
    localStorage.removeItem("token")
    location.replace("../../index.html")
}
let flag = 0;

function studentDetails(a) {
    $.ajax("https://node-examportal.herokuapp.com/examiner/exams/students", {
        type: 'GET',
        dataType: 'JSON',
        beforeSend: function() {
            $('.loading').fadeIn()
        },
        headers: {
            'examId': a.id,
            'token': localStorage.getItem('token')
        },
        success: function(data) {
            $('.loading').fadeOut()
            $('#tcan').empty()
            let tr = document.createElement('tr')
            tr.innerHTML = "<th>" + " Student Email " + "</th>"+ "<th>" + " Student Name " + "</th>" + "<th>" + " Exam Code " + "</th>" + "<th>" + "Total Score" + "</th>" + "<th>" + "Maximum Marks" + "</th>" + "<th>" + "Percentage %" + "</th>";
            $("#tcan").append(tr)
            let i = 0;
            while (i < data.b.length) {

                let tr = document.createElement('tr')
                tr.innerHTML = "<td>"+data.a[i].email+"</td>"+"<td>" + data.a[i].name + "</td>" + "<td>" + data.b[i].testCode + "</td>" + "<td>" + data.b[i].totalScore + "</td>" + "<td>" + data.c + "</td>" + "<td>" + ((data.b[i].totalScore / data.c) * 100).toFixed(2) + "%" + "</td>";
                $("#tcan").fadeIn()
                $("#tcan").append(tr)
                flag = 1;
                i++;
            }
            if(data.b!=''){
            drawChart(data.b, data.c)
            $('#myChart').show()
            }
            else
            $('#myChart').hide()
        },
        error: function(error) {
           
        }
    })
}