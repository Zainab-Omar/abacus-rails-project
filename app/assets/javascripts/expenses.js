$(document).ready(function(){
  attachListeners();
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


}
//end of attachListeners

  class Expense{
    constructor(json) {
      this.description = json.description;
      this.amount = json.amount;
      this.date = json.created_at;
      this.category_name = json.category.name;
    }
  }
  //end of class Expense


  Expense.prototype.updateHtml = function(){

      let trHTML = "";
      trHTML += '<tr><td>' + this.description + '</td><td> $' + this.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + '</td><td>'
      trHTML += this.date+ '</td><td>' + this.category_name + '</td>'
      trHTML += '<td> Edit </td>'+ '<td> Delete </td></tr>';
      $("#groups-exp").append(trHTML)
  }
  //end of prototype updateHtml
