var LogButton = $("#LogSub");
var AddPromButton = $("#SubAProb");
var AddNewsButton = $("#LogANews");
var SearchButton = $("#subser");
function openInNewTab() {
  window.open("https://www.w3schools.com");
}

function check(){
  $.ajax({
      url:"PHP/applicationLayer.php",
      type:"POST",
      data: {"action":"ValidateSession"},
      dataType: "json",
      success:function(json) {
        if (json.session == "TRUE") {
          return "true";
        }else{
          return "false";
        }
      },
      error:function(errorMsg) {
        console.log("Not Working Yow");
      }
  });

}

function onloaded(){
  if(check() == "false"){
    window.location.href = "index.html";
  }
  loadNewsAndProblems();
  loadProblems();
}


$("#Logout").on("click",function(){
  var jsonSend = {
    "action": "RemoveSessionA"
  };
  $.ajax({
    url:"./PHP/applicationLayer.php",
    type: "POST",
    data: jsonSend,
    ContentType: "application/json",
    dataType: "json",
    success: function(response){
      window.location.href = "adminlog.html";
    },
    error: function (errorMS){
      alert("Error " + errorMS.statusText);
    }
  });
});

$("#menu > li").on("click", function(){
       $(".selected").removeClass("selected");

        var currentClass = $(this).attr("class");
        $(this).addClass("selected");
        console.log(currentClass);
        $(".selectedSection").addClass("notSelectedSection");
        $(".selectedSection").removeClass("selectedSection");


        $("#" + currentClass + "Section").addClass("selectedSection");
        $("#" + currentClass + "Section").removeClass("notSelectedSection");
    });


    function validateLog(){
      if(check() == "false"){
        window.location.href = "index.html";
      }
      var Input = $(".formElement");
      var Struct = $(".InputLog");
      var Part = $(".Parte");
      var flag =true;
      if(Input.eq(0).val() == ""){
        Part.eq(0).html("Falta ID");
        flag = false;
      }else{
        Part.eq(0).html("");
      }
      if(Input.eq(1).val() == "" && !Input.eq(0) == ""){
        Part.eq(1).html("Falta Constraseña");
        flag = false;
      }else{
        Part.eq(1).html("");
      }
      if(Input.eq(2).val() == ""){
        flag = false;
        if(Input.eq(1).val() != ""){
            Part.eq(2).html("Falta Tu Confirmacion de Constraseña");
        }
      }else{
        if(Input.eq(1).val() != Input.eq(2).val()){
          Part.eq(2).html("Constraseña no es la misma");
          flag = false;
        }else{
          Part.eq(2).html("");
        }

      }
      if(flag){
        var jsonSend = {
              "uID" : Input.eq(0).val() ,
              "uPass" : Input.eq(1).val(),
              "action": "RegAdmin"
        };
        $.ajax({
          url: "./PHP/applicationLayer.php",
          type: "POST",
          data : jsonSend,
          ContentType : "application/json",
          dataType: "json",
          success: function(response){
            alert("Admin was registed");
          },
          error: function (errorMS){
            alert("Something went wrong " + errorMS.statusText);
          }
        });
      }
    }

    function AddProblem(){
      if(check() == "false"){
        window.location.href = "index.html";
      }
      var From = $('[name = "AProblem"]:checked');
      var flag = true;
      var test = $('[name = "Tags"]:checked');
      var tags = [];
      var source;

      if($("#TextTitleP").val()==""){
        flag = false;
        $(".Parte2").eq(0).html("Missing problems name");
      }else{
        $(".Parte2").eq(0).html("");
      }
      if(From.val() == "Other" && $("#TextReg").val() == ""){
        flag=false;
        $(".Parte2").eq(1).html("Missing name");
      }else{
        if(From.val() == "Other"){
          source = $("#TextReg").val();
        }else{
          source = From.val();
        }
        $(".Parte2").eq(1).html("");
      }
      if($("#TextLink").val()==""){
        flag = false;
        $(".Parte2").eq(2).html("Missing link to problem");
      }else{
        $(".Parte2").eq(2).html("");
      }
      test.each(function() {
          tags.push($(this).val());
      });
      if(tags.length == 0){
        flag = false;
        $(".Parte2").eq(3).html("Need at least 1 tag");
      }else{
        $(".Parte2").eq(3).html("");
      }
      if(flag){
        var jsonSend = {
              "Source" : source ,
              "Link" : $("#TextLink").val(),
              "Tags" : tags,
              "Title": $("#TextTitleP").val(),
              "action": "AddProblem"
        };
        $.ajax({
          url: "./PHP/applicationLayer.php",
          type: "POST",
          data : jsonSend,
          ContentType : "application/json",
          dataType: "json",
          success: function(response){
            alert("Problem was uploaded sucessfull");
          },
          error: function (errorMS){
            alert("Something went wrong " + errorMS.statusText);
          }
        });
      }
    }
    function AddNews(){
      if(check() == "false"){
        window.location.href = "index.html";
      }
      var From = $('[name = "ANews"]:checked');
      var flag = true;
      var source;
      if($("#TextTitle").val() == ""){
        $(".ParteANews").eq(0).html("Missing Title");
      }else{
        $(".ParteANews").eq(0).html("");
      }
      if(From.val() == "Other" && $("#TextNews").val() == ""){
        flag=false;
        $(".ParteANews").eq(1).html("Missing name");
      }else{
        if(From.val() == "Other"){
          source = $("#TextReg").val();
        }else{
          source = From.val();
        }
        $(".ParteANews").eq(1).html("");
      }
      if($("#TextLinkN").val() == ""){
        $(".ParteANews").eq(2).html("Missing Link");
      }else{
        $(".ParteANews").eq(2).html("");
      }
      if(flag){
        var jsonSend = {
              "Title" : $("#TextTitle").val(),
              "Source" : source ,
              "Link" : $("#TextLinkN").val(),
              "action": "AddNews"
        };
        $.ajax({
          url: "./PHP/applicationLayer.php",
          type: "POST",
          data : jsonSend,
          ContentType : "application/json",
          dataType: "json",
          success: function(response){
            alert("News was uploadd sucessfull");
          },
          error: function (errorMS){
            alert("Something went wrong " + errorMS.statusText);
          }
        });
      }
    }

    function LoadNews(){
      if(check() == "false"){
        window.location.href = "index.html";
      }
      window.open($(this).attr('var'));
    }

    function loadNewsAndProblems() { //Only load news for the moment
      $.ajax({
        url: "./PHP/applicationLayer.php",
        type: "POST",
        data : {"action":"loadNewsAndProblems"},
        ContentType : "application/json",
        dataType: "json",
        success: function(response){
          var html="";
          response.forEach(function(jsonf){
            html += "<div class=\"card\">";
            html += "<div class=\"card-block\">";
            html += "<blockquote class=\"card-blockquote\">";
            html += "<h4 class=\"card-title\">" + jsonf.title + "</h4>";
            html += "<h6 class=\"card-subtitle mb-2 text-muted\">" + jsonf.orgfrom + "</h6>";
            html += "<a href=\"#\" var=\"" + jsonf.link + "\" class=\"card-link\">Go to News</a>";
            html += "<div class=\"card-footer text-muted\"> Poested at: " + jsonf.timeposted  + " </div>";
            html += "</blockquote>";
            html += "</div>";
            html += "</div>";
          });
          $("#NewsLink").append(html);
        },
        error: function (errorMS){
          alert("Something went wrong loading the news" + errorMS.statusText);
        }
      });
    }

  function loadProblems(){
    $.ajax({
      url: "./PHP/applicationLayer.php",
      type: "POST",
      data : {"action":"loadProblems"},
      ContentType : "application/json",
      dataType: "json",
      success: function(response){
        var html="";
        response.forEach(function(jsonf){
          html += "<div class=\"card\" style=\"width: 20rem;\">";
          html += "<div class=\"card-block\">";
          html += "<h4 class=\"card-title\">" + jsonf.id + ": " + jsonf.title + "</h4>";
          html += "<p class=\"card-text\">" + jsonf.orgfrom + "</p>";
          html += "</div>";
          html += "<ul class=\"list-group list-group-flush\">";
          jsonf.tags.forEach(function(tagg){
              html += "<li class=\"list-group-item\">" + tagg + "</li>";
          });
          html += "</ul>";
          html +=  "<a href=\"#\" var = \""+ jsonf.link +"\" class=\"card-link\">Go to problem</a>";
          html += "</div> </div>";
          /*html += "<div id=\"" + jsonf.link + "\" class =\"Prom\">";
          html += "<div> ID: " + jsonf.id + "</div>";
          html += "<div> Title: " + jsonf.title + "</div>";
          html += "<div> From: " + jsonf.orgfrom + "</div>";
          html += "<div> Tags: ";
              jsonf.tags.forEach(function(tagg){
                  html += "<span> [" + tagg + "] </span>";
              });
          html += "</div>"
          html += "</div>"*/
        });
        $("#ProblemLink").append(html);
      },
      error: function (errorMS){
        alert("Something went wrong loading the news" + errorMS.statusText);
      }
    });
  }

  function searchProblems(){
    if(check() == "false"){
    window.location.href = "index.html";
    }
    var test = $('[name = "Tags"]:checked');
    var tags = [];
    //console.log(test);
    var search = $("#NameSearch").val();
    tags.push("dummy");
    test.each(function() {
      console.log($(this).val());
        tags.push($(this).val());
    });
    if(search != "" || tags.length > 1){
      $.ajax({
        url: "./PHP/applicationLayer.php",
        type: "POST",
        data : {"action":"searchProblem", "search":search ,"Tags":tags},
        ContentType : "application/json",
        dataType: "json",
        success: function(response){
          $("#ProblemLink").empty();
          var html="";
          response.forEach(function(jsonf){
            html += "<div class=\"card\" style=\"width: 20rem;\">";
            html += "<div class=\"card-block\">";
            html += "<h4 class=\"card-title\">" + jsonf.id + ": " + jsonf.title + "</h4>";
            html += "<p class=\"card-text\">" + jsonf.orgfrom + "</p>";
            html += "</div>";
            html += "<ul class=\"list-group list-group-flush\">";
            jsonf.tags.forEach(function(tagg){
                html += "<li class=\"list-group-item\">" + tagg + "</li>";
            });
            html += "</ul>";
            html +=  "<a href=\"#\" var = \""+ jsonf.link +"\" class=\"card-link\">Go to problem</a>";
            html += "</div> </div>";
          });
          $("#ProblemLink").append(html);
        },
        error: function (errorMS){
          alert("Something went wrong loading the news" + errorMS.statusText);
        }
      });
    }else{
      $("#ProblemLink").empty();
      loadProblems();
    }

  }

AddNewsButton.click("on",AddNews);
AddPromButton.click("on",AddProblem);
$("#NewsLink").on("click",".card-link",LoadNews);
$("#ProblemLink").on("click",".card-link",LoadNews);
SearchButton.on("click",searchProblems);
LogButton.click("on",validateLog);
$(document).ready(onloaded);
