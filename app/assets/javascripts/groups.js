// $(document).ready(function(){
//   loadExpenses();
  // Req 1: Renders index page of expenses through JS

  // SHOWS EXPENSES ON GROUP SHOW PAGE BY CLICKING LINK
  // const $loadExpensesButton = $("a#load_expenses")
  //
  // $("a#load_expenses").on("click", function(e) {
  //   $.get(this.href).success(function(json) {
  //     //json object json = [{}, {}, {}]
  //     let $table = $("#expenses_table")
  //     let trHTML = "";
  //     //iterate over each expense within json
  //     json.forEach(function(expense) {
  //       //expense = {id: 72, description: "1", amount: 1, created_at: "2018-11-16T07:44:08.976Z", category: {…}}
  //       trHTML += '<tr><td>' + expense.description + '</td><td>' + expense.amount + '</td><td>'
  //       trHTML += expenseDate + '</td><td>' + expense.category.name + '</td>'
  //       trHTML += '<td> Edit </td>'+ '<td> Delete </td></tr>';
  //     });
  //     $table.append(trHTML)
  //     $loadExpensesButton.hide();
  //   })
  //   e.preventDefault();
  // })

// });

$(document).ready(function(){
  loadGroups();
  loadExpenses();
  createGroup();
})

function loadGroups(){

}
//end of loadGroups

function loadExpenses(){
  let url = this.location.href
  url += "/expenses.json"
  $.get(url, function(response){
    //json object json = [{}, {}, {}]
    let $table = $("#groups-exp")
    let trHTML = "";
    //iterate over each expense within json
    // Req 2: Renders a has-many relationship from a JSON response
    response.forEach(function(expense){
      trHTML += '<tr><td>' + expense.description + '</td><td> $' + expense.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + '</td><td>'
      trHTML += expense.created_at + '</td><td>' + expense.category.name + '</td>'
      trHTML += '<td> Edit </td>'+ '<td> Delete </td></tr>';
    })
    $table.append(trHTML)
  })
}
// end of loadExpenses

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

// Group.prototype.updateList = function(){
//     let trHTML = "";
//     trHTML += '<tr><td>' + this.name + '</td><td> $' + this.status + '</td>'
//     trHTML += '<td> View </td>'
//     trHTML += '<td> Edit </td>'+ '<td> Delete </td></tr>';
// }
//end of prototype updateHtml

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
