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
      debugger
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
    debugger
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
