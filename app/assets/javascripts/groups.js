$(document).ready(function(){
  createGroup();
  // if(window.location.href.indexOf("users") > -1){
  //   loadGroups();
  // }
  attachGroupListeners();
})


// // Loads all expenses
// function loadExpenses(){
//   let url = this.location.href
//   url += "/expenses.json"
//   $.get(url, function(response){
//     //json object json = [{}, {}, {}]
//     let $table = $("#groups-exp")
//     let trHTML = "";
//     //iterate over each expense within json
//     // Req 2: Renders a has-many relationship from a JSON response
//     response.forEach(function(expense){
//       trHTML += '<tr><td>' + expense.description + '</td><td> $' + expense.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + '</td><td>'
//       trHTML += formatDate(expense.created_at) + '</td><td>' + expense.category.name + '</td>'
//       trHTML += '<td>' + `<a class="glyphicon glyphicon-pencil" id="pencil-icon" href="/groups/${expense.group.id}/expenses/${expense.id}/edit">` + '</td>'
//       trHTML += '<td>' + `<a data-confirm="Are you sure?" class="glyphicon glyphicon-trash" id="trash-icon" rel="nofollow" data-method="delete" href="/groups/${expense.group.id}/expenses/${expense.id}"></a>` + '</td></tr>';
//     })
//     $table.append(trHTML)
//   })
// }
// // end of loadExpenses

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
        let trHTML = "";
            trHTML += '<tr><td>' + group.name + '</td><td>' + group.status + '</td>'
            trHTML += '<td>' + `<a class="glyphicon glyphicon-eye-open" id="eye-icon" href="/groups/${group.id}"></a>` + '</td>'
            trHTML += '<td>' + `<a class="glyphicon glyphicon-pencil" id="pencil-icon" href="/groups/${group.id}/edit">` +  '</td>'
            trHTML += '<td>' + `<a data-confirm="Are you sure?" class="glyphicon glyphicon-trash" id="trash-icon" rel="nofollow" data-method="delete" href="/groups/${group.id}"></a>` + '</td></tr>'
        if (group.status === "Active") {
          $("div.active_groups table").prepend(trHTML)
        } else {
          $("div.inactive_groups table").prepend(trHTML)
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

  $("div.groups-container").on("click", "a#pencil-icon", (e)=> {
    e.preventDefault();
    let $pencilIcon = e.target
    let url = $pencilIcon.href
    debugger
    $.get(url, function(response){
      $(".group-form").hide();
      $(".edit-group").html(response)
    })
    // end of get call
  })
  //end of pencil icon

  // $("div.groups-container").on("click", "a#trash-icon", (e)=> {
  //   alert("You clicked me")
  //   e.preventDefault();
  //   let url = e.target.href
  //   $.ajax({
  //     type: "DELETE",
  //     url: url,
  //
  //   })
  //   debugger
  // })
  // //end of trash icon


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

}
//end of attachGroupListeners

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
