
var ins='';
var p1_tickets='';
var p1;
var p2;
var p3;
var p4;
var days;
var category_label;
var category_count;
$(document).ready(function(){
   jQuery.ajax({
       method: "GET",
       url: "/tickets",
     success: function( tickets ) {
          //console.log(instances[0].Instances[0].InstanceId);
          p1_tickets=tickets['tickets'][0];
          var p2_tickets=tickets['tickets'][1];
          var p3_tickets=tickets['tickets'][2];
          var p4_tickets=tickets['tickets'][3];
          days = tickets['ticket_count']['Days'];
          p1 = tickets['ticket_count']['P1'];
          p2 = tickets['ticket_count']['P2'];
          p3 = tickets['ticket_count']['P3'];
          p4 = tickets['ticket_count']['P4'];
          category_label = tickets['category']['label'];
          category_count = tickets['category']['count'];
         // console.log(Object.keys(p1_tickets).length);
          var color=''
          for(var i in p1_tickets) {
              if(p1_tickets[i]['Time left']=='Breached'){
                  color = 'badge-danger';
              }else if(p1_tickets[i]['Time left']<60){
                  color = 'badge-danger';
              }else if(p1_tickets[i]['Time left']<120){
                  color = 'badge-warning';
              }else if(p1_tickets[i]['Time left']<180){
                  color = 'badge-primary';
              }else if(p1_tickets[i]['Time left']<240){
                  color = 'badge-success';
              };
              var Minutes = p1_tickets[i]['Time left'];
              if(p1_tickets[i]['Time left']!=='Breached') {
                  ins += "<li class=\"list-group-item\">\n" + "<a href=\"#\"> <i class=\"fa fa-envelope-o\"></i>" + i + "<span class=\"timer-pause  badge " + color + " pull-right\" data-minutes-left=" + p1_tickets[i]['Time left'] + " id=" + i + "></span></a>\n" + "</li>";
              }
              else {
                  ins += "<li class=\"list-group-item\">\n" + "<a href=\"#\"> <i class=\"fa fa-envelope-o\"></i>" + i + "<span class=\"badge " + color + " pull-right\"  id=" + i + ">"+ p1_tickets[i]['Time left'] +"</span></a>\n" + "</li>";
              }

          }jQuery('#p1').html(ins);

          for(var i in p2_tickets) {
              if(p2_tickets[i]['Time left']=='Breached'){
                  color = 'badge-danger';
              }else if(p2_tickets[i]['Time left']<120){
                  color = 'badge-danger';
              }else if(p2_tickets[i]['Time left']<240){
                  color = 'badge-warning';
              }else if(p2_tickets[i]['Time left']<360){
                  color = 'badge-primary';
              }else if(p2_tickets[i]['Time left']<480){
                  color = 'badge-success';
              };
              var Minutes = p2_tickets[i]['Time left'];
              if(p2_tickets[i]['Time left']!=='Breached') {
                  ins += "<li class=\"list-group-item\">\n" + "<a href=\"#\"> <i class=\"fa fa-envelope-o\"></i>" + i + "<span class=\"timer-pause  badge " + color + " pull-right\" data-minutes-left=" + p2_tickets[i]['Time left'] + " id=" + i + "></span></a>\n" + "</li>";
              }
              else {
                  ins += "<li class=\"list-group-item\">\n" + "<a href=\"#\"> <i class=\"fa fa-envelope-o\"></i>" + i + "<span class=\"badge " + color + " pull-right\"  id=" + i + ">"+ p2_tickets[i]['Time left'] +"</span></a>\n" + "</li>";
              }
              //startTimer(Minutes, display);

          }jQuery('#p2').html(ins);

          for(var i in p3_tickets) {
              if(p3_tickets[i]['Time left']=='Breached'){
                  color = 'badge-danger';
              }else if(p3_tickets[i]['Time left']<60){
                  color = 'badge-danger';
              }else if(p3_tickets[i]['Time left']<720){
                  color = 'badge-warning';
              }else if(p3_tickets[i]['Time left']<1440){
                  color = 'badge-primary';
              }else if(p3_tickets[i]['Time left']<2880){
                  color = 'badge-success';
              };
              var Minutes = p3_tickets[i]['Time left'];
              if(p3_tickets[i]['Time left']!=='Breached') {
                  ins += "<li class=\"list-group-item\">\n" + "<a href=\"#\"> <i class=\"fa fa-envelope-o\"></i>" + i + "<span class=\"timer-pause  badge " + color + " pull-right\" data-minutes-left=" + p3_tickets[i]['Time left'] + " id=" + i + "></span></a>\n" + "</li>";
              }
              else {
                  ins += "<li class=\"list-group-item\">\n" + "<a href=\"#\"> <i class=\"fa fa-envelope-o\"></i>" + i + "<span class=\"badge " + color + " pull-right\"  id=" + i + ">"+ p3_tickets[i]['Time left'] +"</span></a>\n" + "</li>";
              }

          }jQuery('#p3').html(ins);

          for(var i in p4_tickets) {
              if(p4_tickets[i]['Time left']=='Breached'){
                  color = 'badge-danger';
              }else if(p4_tickets[i]['Time left']<60){
                  color = 'badge-danger';
              }else if(p4_tickets[i]['Time left']<1080){
                  color = 'badge-warning';
              }else if(p4_tickets[i]['Time left']<2160){
                  color = 'badge-primary';
              }else if(p4_tickets[i]['Time left']<4320){
                  color = 'badge-success';
              };
              var Minutes = p4_tickets[i]['Time left'];
              if(p4_tickets[i]['Time left']!=='Breached') {
                  ins += "<li class=\"list-group-item\">\n" + "<a href=\"#\"> <i class=\"fa fa-envelope-o\"></i>" + i + "<span class=\"timer-pause  badge " + color + " pull-right\" data-minutes-left=" + p4_tickets[i]['Time left'] + " id=" + i + "></span></a>\n" + "</li>";
              }
              else {
                  ins += "<li class=\"list-group-item\">\n" + "<a href=\"#\"> <i class=\"fa fa-envelope-o\"></i>" + i + "<span class=\"badge " + color + " pull-right\"  id=" + i + ">"+ p4_tickets[i]['Time left'] +"</span></a>\n" + "</li>";
              }
              //startTimer(Minutes, display);

          }jQuery('#p4').html(ins);
          jQuery('.timer-pause').startTimer();

          var ctx = document.getElementById( "sales-chart" );
    ctx.height = 150;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: days,
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [ {
                label: "P1",
                data: p1,
                backgroundColor: 'transparent',
                borderColor: 'rgba(220,53,69,0.75)',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(220,53,69,0.75)',
                    }, {
                label: "P2",
                data: p2,
                backgroundColor: 'transparent',
                borderColor: '#ffc107',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#ffc107',
                    },
		   {
                label: "P3",
                data: p3,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#007bff',
                    },
		{
                label: "P4",
                data: p4,
                backgroundColor: 'transparent',
                borderColor: '#28a745',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#28a745',
                    } ]
        },
        options: {
            responsive: true,

            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },
            },
            scales: {
                xAxes: [ {
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                        } ],
                yAxes: [ {
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                        } ]
            },
            title: {
                display: false,
                text: 'Normal Legend'
            }
        }
    } );

//bar chart
    var ctx = document.getElementById( "barChart" );
    //    ctx.height = 200;
    var myChart = new Chart( ctx, {
        type: 'bar',
        data: {
            labels: category_label,
            datasets: [
                {
                    label: "Ticket volume",
                    data: category_count,
                    borderColor: "rgba(0, 123, 255, 0.9)",
                    borderWidth: "0",
                    backgroundColor: "rgba(0, 123, 255, 0.5)"
                            }
                        ]
        },
        options: {
            scales: {
                yAxes: [ {
                    ticks: {
                        beginAtZero: true
                    }
                                } ]
            }
        }
    } );



            }
     });


});
