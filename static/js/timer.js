var ins='';
 var p1_tickets='';
var p1;
var p2;
var p3;
var p4;
var days;
var category_label;
var category_count;
$.ajax({
      type: "GET",
      url: "/tickets",
    })
      .success(function( tickets ) {
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

          }$('#p1').html(ins);

          for(var i in p2_tickets) {
              if(p2_tickets[i]['Time left']=='Breached'){
                  color = 'badge-danger';
              }else if(p2_tickets[i]['Time left']<60){
                  color = 'badge-danger';
              }else if(p2_tickets[i]['Time left']<120){
                  color = 'badge-warning';
              }else if(p2_tickets[i]['Time left']<180){
                  color = 'badge-primary';
              }else if(p2_tickets[i]['Time left']<240){
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

          }$('#p2').html(ins);

          for(var i in p3_tickets) {
              if(p3_tickets[i]['Time left']=='Breached'){
                  color = 'badge-danger';
              }else if(p3_tickets[i]['Time left']<60){
                  color = 'badge-danger';
              }else if(p3_tickets[i]['Time left']<120){
                  color = 'badge-warning';
              }else if(p3_tickets[i]['Time left']<180){
                  color = 'badge-primary';
              }else if(p3_tickets[i]['Time left']<240){
                  color = 'badge-success';
              };
              var Minutes = p3_tickets[i]['Time left'];
              if(p3_tickets[i]['Time left']!=='Breached') {
                  ins += "<li class=\"list-group-item\">\n" + "<a href=\"#\"> <i class=\"fa fa-envelope-o\"></i>" + i + "<span class=\"timer-pause  badge " + color + " pull-right\" data-minutes-left=" + p3_tickets[i]['Time left'] + " id=" + i + "></span></a>\n" + "</li>";
              }
              else {
                  ins += "<li class=\"list-group-item\">\n" + "<a href=\"#\"> <i class=\"fa fa-envelope-o\"></i>" + i + "<span class=\"badge " + color + " pull-right\"  id=" + i + ">"+ p3_tickets[i]['Time left'] +"</span></a>\n" + "</li>";
              }

          }$('#p3').html(ins);

          for(var i in p4_tickets) {
              if(p4_tickets[i]['Time left']=='Breached'){
                  color = 'badge-danger';
              }else if(p4_tickets[i]['Time left']<60){
                  color = 'badge-danger';
              }else if(p4_tickets[i]['Time left']<120){
                  color = 'badge-warning';
              }else if(p4_tickets[i]['Time left']<180){
                  color = 'badge-primary';
              }else if(p4_tickets[i]['Time left']<240){
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

          }$('#p4').html(ins);
          $('.timer-pause').startTimer();

          });

