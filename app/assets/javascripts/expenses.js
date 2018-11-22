$(document).ready(function(){
  attachListeners();
  loadExpenses();
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

  // $("a.js-more").on("click", function(event) {
  //   let id = $(".js-more").attr("data-id")
  //   id = parseInt(id) + 1
  //   console.log(id)
  //   $.get("/groups/" + id + "/expenses", function(response) {
  //     debugger
  //     console.log(json)
  //   })
  //   //end of get call
  //   event.preventDefault();
  // })
  //end of js-more


}
//end of attachListeners

// Loads all expenses
function loadExpenses(){
  let url = this.location.href
  url += "/expenses.json"
  $.get(url, function(response){
    //json object json = [{}, {}, {}]
    let $table = $("#groups-exp")
    let trHTML = "";
    debugger
    let $total = $("div.total")
    debugger
    //iterate over each expense within json
    // Req 2: Renders a has-many relationship from a JSON response
    response.forEach(function(expense){
      debugger
      trHTML += '<tr><td>' + expense.description + '</td><td> $' + expense.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + '</td><td>'
      trHTML += formatDate(expense.created_at) + '</td><td>' + expense.category.name + '</td>'
      trHTML += '<td>' + `<a class="glyphicon glyphicon-pencil" id="pencil-icon" href="/groups/${expense.group.id}/expenses/${expense.id}/edit">` + '</td>'
      trHTML += '<td>' + `<a data-confirm="Are you sure?" class="glyphicon glyphicon-trash" id="trash-icon" rel="nofollow" data-method="delete" href="/groups/${expense.group.id}/expenses/${expense.id}"></a>` + '</td></tr>';
      debugger
    })
    $table.append(trHTML)
  })
}
// end of loadExpenses

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
