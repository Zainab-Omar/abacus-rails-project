$(document).ready(function(){
  createGroup();
  // if(window.location.href.indexOf("users") > -1){
  //   loadGroups();
  // }
  // showGroupSummary();
  attachGroupListeners();
})

//submits new Group
function createGroup() {
  $("form.new_group").on("submit", function(event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: this.action,
      data: $(this).serialize(),
      success: function(response){
        // empties the input after successful action
        $("#group_name").val("")
        let group = new Group(response)
        group.addGroupHtml()
      }
      // end of success
    })
    // end of ajax call
    return false;
  })
}
//end of createGroup

function attachGroupListeners(){

  $("#cancel-group").on("click", function(event) {
    $("#group_name").val("")
    event.preventDefault();
  })
  //end of cancel-group

  $("div.groups-container").on("click", "a#pencil-icon", (e)=> {
    e.preventDefault();
    $("#flash_notice").html("")
    let $pencilIcon = e.target
    let url = $pencilIcon.href
    $.get(url, function(response){
      $(".group-form").hide();
      $(".edit-group").html(response)
    })
    // end of get call
  })
  //end of pencil icon

  // $("div.groups-container").on("click", "a#trash-icon", (e)=> {
  //   alert("You clicked me")
  //   debugger
  //   e.preventDefault();
  //   //e.target => <a data-confirm="Are you sure?" class="glyphicon glyphicon-trash" id="trash-icon" rel="nofollow" data-method="delete" href="/groups/165"></a>
  //   let trashIcon = e.target
  //   let url = trashIcon.href
  //   debugger
  //   // url => "http://localhost:3000/groups/165"
  //   let groupId = trashIcon.pathname.replace("/groups/", "")
  //   // groupId = "165"
  //
  //   // $.post(url, {id:groupId, action:'delete'});
  //   debugger
  //   $.ajax({
  //     url: url,
  //     type: 'POST',
  //     data: {_method: 'delete'}
  //   })
  //     .done(function( data ) {
  //       console.log(data);
  //     });
  //   //end of success
  //     // trashIcon.parentNode.parentElement.remove();
  // })
  // // //end of trash icon


  // $("a#pencil-icon").on("click", function(event) {
  //   debugger
  //   event.preventDefault();
  //   let pencilIcon = $(this);
  //   let url = this.href
  //   $.get(url, function(response){
  //     $(".group-form").hide();
  //     $(".edit-group").html(response)
  //   })
  //   event.preventDefault();
  // })
  // //end of pencil-icon

  // $("div.edit-group div.group-form form.edit_group").on("submit", function(event){
  //   debugger
  //   console.log(this)
  //   event.preventDefault();
  // })
  // // end of edit group form

  // $("a#group-summary").on("click", function(event){
  //   alert("You clicked summary")
  //   event.preventDefault();
  //   debugger
  // })

  $("div#group-expenses-page").on("click", "#group-summary", (e)=> {
       $("div.group-summary").toggle();
   });

}
//end of attachGroupListeners

// function showGroupSummary() {
//   debugger
//   var $groupSummary = document.getElementById("group-summary");
//   if ($groupSummary.style.display === "none") {
//       $groupSummary.style.display = "block";
//   } else {
//       $groupSummary.style.display = "none";
//   }
// }
// //end of showGroupSummary

class Group{
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    if (json.status === 0){
      this.status = "Active"
    } else {
      this.status = "Inactive"
    }
    // end of if else
  }
}
//end of class Group

Group.prototype.addGroupHtml = function(){
    // adds the newly created group to top of the table
    let trHTML = "";
        trHTML += '<tr><td>' + this.name + '</td><td>' + this.status + '</td>'
        trHTML += '<td>' + `<a class="glyphicon glyphicon-eye-open" id="eye-icon" href="/groups/${this.id}"></a>` + '</td>'
        trHTML += '<td>' + `<a class="glyphicon glyphicon-pencil" id="pencil-icon" href="/groups/${this.id}/edit">` +  '</td>'
        trHTML += '<td>' + `<a data-confirm="Are you sure?" class="glyphicon glyphicon-trash" id="trash-icon" rel="nofollow" data-method="delete" href="/groups/${this.id}"></a>` + '</td></tr>'
    if (this.status === "Active") {
      $("div.active_groups table").prepend(trHTML)
    } else {
      $("div.inactive_groups table").prepend(trHTML)
    }
    //end of if else
  }
  //end of prototype addGroupHtml
