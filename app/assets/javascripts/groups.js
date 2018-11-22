$(document).ready(function(){
  createGroup();
  // loadGroups();
  attachGroupListeners();
})

// function loadGroups(){
//   debugger
//
// }
//end of loadGroups

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
        debugger
        console.log(response)
        let trHTML = "";
            trHTML += '<tr><td>' + group.name + '</td><td>' + group.status + '</td>'
            trHTML += '<td>' + `<a class="glyphicon glyphicon-eye-open" id="eye-icon" href="/groups/${group.id}"></a>` + '</td>'
            trHTML += '<td>' + `<a class="glyphicon glyphicon-pencil" id="pencil-icon" href="/groups/${group.id}/edit">` +  '</td>'
            trHTML += '<td>' + `<a data-confirm="Are you sure?" class="glyphicon glyphicon-trash" id="trash-icon" rel="nofollow" data-method="delete" href="/groups/${group.id}"></a>` + '</td></tr>'
        if (group.status === "Active") {
          $("div.active_groups table").append(trHTML)
        } else {
          $("div.inactive_groups table").append(trHTML)
        }
        //end of if else
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

  $("a#pencil-icon").on("click", function(event) {
    debugger
    let pencilIcon = $(this);
    let url = this.href
    $.get(url, function(response){
      $(".group-form").hide();
      $(".edit-group").html(response)
    })
    event.preventDefault();
  })
  //end of pencil-icon

  // $("div.edit-group div.group-form form.edit_group").on("submit", function(event){
  //   debugger
  //   console.log(this)
  //   event.preventDefault();
  // })
  // // end of edit group form

  $("#trash-icon").on("click", function(event) {
    event.preventDefault();
  })
  //end of trash icon
}
//end of attachGroupListeners

class Group{
  constructor(json) {
    debugger
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

// //Submits new expenses
// $("form.new_expense").on("submit", function(event) {
//   //1. we need URL to submit the POST request
//   //2. we need the form data
//   // Low Level
//   event.preventDefault();
//   $.ajax({
//     type: "POST",
//     url: this.action,
//     data: $(this).serialize(), //either JSON or querystring serializing
//     success: function(response) {
//       // empties the input after successful action
//       $("#expense_description").val("")
//       $("#expense_amount").val("")
//       $("#expense_category_name").val("")
//
//       let expense = new Expense(response)
//       expense.updateHtml()
//     }
//   });
//   return false;
// })
