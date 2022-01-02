/**************************************************
Shambhuraj Wadghule
Honors Contract
File: to-do.js
Purpose: Provide javascipt for the To Do List web page.
***************************************************/

$(document).ready(function(){
  $("input[type=checkbox]").removeAttr("checked");
  $("#tab").tabs();
  //Makes unordered list draggable in x axis
  $("ul").sortable({axis:"x", containment:"#tab"});
  //Makes ordered list draggable in y axis
  $("ol").sortable({axis:"y", containment:"#tab"});
  $("#tab").on("click", "input[type=checkbox]", function(){
    $(this).closest("li").slideUp(function(){
      $(this).remove();
    });
  });
  // Close Icon not working, figure out later
  $("#tab").on("click", "span.ui-icon-close", function(){
    var index = $(this).closest("li").index();
    var id = $("#all li:eq(" + index + ") a").attr("href");
    $("#all li:eq(" + index + ")").remove();
    $(id).remove();
    $("#tab").tabs("refresh");
  });

  //Button click function
  $("#buttonAddTask").button()
  .click(function(){
    $("#task-dialog").dialog({width:400, resizable:false, modal:true,
        buttons:{
          "Add new task": function(){
            $("#tab").tabs("refresh");
            var activeTab = $("#tab").tabs("option", "active");
            var title = $("#all > li:nth-child(" + (activeTab+1) +") > a").attr("href");
            $("#tab " + title).append("<li><input type='checkbox'>" + $("#new-task").val() + "</li>");
            $("#new-task").val("");
            $(this).dialog("close");
          },
          "Cancel":function(){
            $("#new-task").val("");
            $(this).dialog("close");
          }
        }
      });
  });

    //Button click function
  $("#buttonAddTab").button()
  .click(function(){

    $("#project-dialog").dialog({width:400, resizable:false, modal:true,
        buttons:{
          "Add new tab":function(){
            var projectName = $("#new-project").val();
            var replaceName = projectName.split(" ").join("_");
            $("<li><a href='#" + replaceName + "'>" + projectName + "</a></a><span class='ui-icon ui-icon-close'></span></li>")
            .appendTo("#all");
            $("<ol id='" + replaceName + "'></ol>").appendTo("#tab").sortable();
            $("#tab").tabs("refresh");
            var tabCount = $("#tab .ui-tabs-nav li").length;
            $("#tab").tabs("option", "active", tabCount-1);
            $("#new-project").val("");
            $(this).dialog("close");
          },
          //Close tab
          "Cancel":function(){
            $("#new-project").val("");
            $(this).dialog("close");
          }
        }});
  });
});
