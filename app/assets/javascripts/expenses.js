$(document).ready(function(){
  attachListeners();
  if(window.location.href.indexOf("groups") > -1){
   loadExpenses();
  }
})

var attachListeners = function() {
// RENDER HTML
  $("a#group-summary").on("click", function(event){
    // the jquery object
    let $button = $(this)
    let url = this.pathname
    $.get(url, function(response){
    }).success(function(response){
      $("div.summary").html(response)
      $button.hide();
    })
    .fail(function(response){
      console.log("Error: " + response)
    });
    event.preventDefault();
  });


  //Submits new expenses
  $("form.new_expense").on("submit", function(event) {
    //1. we need URL to submit the POST request
    //2. we need the form data
    // Low Level
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: this.action,
      data: $(this).serialize(), //either JSON or querystring serializing
      success: function(response) {
        // empties the input after successful action
        $("#expense_description").val("")
        $("#expense_amount").val("")
        $("#expense_category_name").val("")

        let expense = new Expense(response)
        expense.updateHtml()
      }
      //end of success
    });
    //end of ajax
    return false;
  })
  //end of submit new expense

  $(".wrapper").on("click", "#previous-button", function(e) {
    e.preventDefault();
    let previousId = parseInt($("#previous-button").attr("data-id"))-1
    let url = "/groups/" + previousId + "/expenses.json"
    $.get(url, function(json){
      debugger
      $("#group-name").text(json[0].group.name)
      let $table = $("#groups-exp tbody")
      $table.remove();
      let trHTML = "";
      if (json.length){
        //checks if the json array is empty
        json.forEach(function(expense){
          trHTML += '<tr><td>' + expense.description + '</td><td> $' + expense.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + '</td><td>'
          trHTML += formatDate(expense.created_at) + '</td><td>' + expense.category.name + '</td>'
          trHTML += '<td>' + `<a class="glyphicon glyphicon-pencil" id="pencil-icon" href="/groups/${expense.group.id}/expenses/${expense.id}/edit">` + '</td>'
          trHTML += '<td>' + `<a data-confirm="Are you sure?" class="glyphicon glyphicon-trash" id="trash-icon" rel="nofollow" data-method="delete" href="/groups/${expense.group.id}/expenses/${expense.id}"></a>` + '</td></tr>';
        })
        $("#groups-exp").append(trHTML)
      }
      //end of if
    })
    //end of get call
  })
  // end of previous-button
}
//end of attachListeners

// Loads all expenses
function loadExpenses(){
  let url = this.location.href
  url += "/expenses.json"
  $.get(url, function(json){
    debugger
    //json object json = [{}, {}, {}]
    let $table = $("#groups-exp")
    let trHTML = "";
    //iterate over each expense within json
    // Req 2: Renders a has-many relationship from a JSON response
    if (json.length){
      debugger
      //checks if the json array is empty
      json.forEach(function(expense){
        trHTML += '<tr><td>' + expense.description + '</td><td> $' + expense.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + '</td><td>'
        trHTML += formatDate(expense.created_at) + '</td><td>' + expense.category.name + '</td>'
        trHTML += '<td>' + `<a class="glyphicon glyphicon-pencil" id="pencil-icon" href="/groups/${expense.group.id}/expenses/${expense.id}/edit">` + '</td>'
        trHTML += '<td>' + `<a data-confirm="Are you sure?" class="glyphicon glyphicon-trash" id="trash-icon" rel="nofollow" data-method="delete" href="/groups/${expense.group.id}/expenses/${expense.id}"></a>` + '</td></tr>';
      })
      $table.append(trHTML)
    } else {
      debugger
      $("div.exp-container").remove();
    }
    //end of if/else
  })

}
// end of loadExpenses

// // Show all group expenses
// function showExpenses(){
//  debugger
//  let url = this.location.href
//  url += "/expenses.json"
//
// }
// // end of showExpenses

  class Expense{
    constructor(json) {
      this.id = json.id
      this.description = json.description;
      this.amount = json.amount;
      this.date = formatDate(json.created_at);
      this.category_name = json.category.name;
      this.groupId = json.group.id;
    }
  }
  //end of class Expense

  function formatDate(date) {
    var d = new Date(date)
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('/');
  }
  // end of formatDate


  Expense.prototype.updateHtml = function(){

      let trHTML = "";
      trHTML += '<tr><td>' + this.description + '</td><td> $' + this.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + '</td><td>'
      trHTML += this.date + '</td><td>' + this.category_name + '</td>'
      trHTML += '<td>' + `<a class="glyphicon glyphicon-pencil" id="pencil-icon" href="/groups/${this.groupId}/expenses/${this.id}/edit">` + '</td>'
      trHTML += '<td>' + `<a data-confirm="Are you sure?" class="glyphicon glyphicon-trash" id="trash-icon" rel="nofollow" data-method="delete" href="/groups/${this.groupId}/expenses/${this.id}"></a>` + '</td></tr>';

      $("#groups-exp").append(trHTML)
  }
  //end of prototype updateHtml
