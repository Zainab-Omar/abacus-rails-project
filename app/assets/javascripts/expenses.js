$(document).ready(function(){
  attachListeners();
  if(window.location.href.indexOf("groups") > -1){
   loadExpenses();
  }
})

var attachListeners = function() {
// RENDER HTML
  // $("a#group-summary").on("click", function(event){
  //   // the jquery object
  //   let $button = $(this)
  //   let url = this.pathname
  //   $.get(url, function(response){
  //   }).success(function(response){
  //     $("div.summary").html(response)
  //     $button.hide();
  //   })
  //   .fail(function(response){
  //     console.log("Error: " + response)
  //   });
  //   event.preventDefault();
  // });

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
         emptyInput();

         let expense = new Expense(response);
         // expense => {id: 211, description: "5 Cents", amount: 0.05, date: "11/25/2018", category_name: "Gifts", …}
         expense.addExpenseHtml();
         //adds the newly created expense to the bottom of the table
         if ($.trim($("div.total").html())==''){
           //if the total is empty, for the first expense
           $("div.total").html('<h3> TOTAL $' + expense.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + '</h3>')
         } else {
           expense.updateTotalHtml();
           //updates the total amount
         }
         //end of if/else
       }
       //end of success
     });
     //end of ajax
     return false;
   })
   //end of submit new expense

  ///expenses.json
  $(".wrapper").on("click", "#previous-button", function(e) {
    e.preventDefault();
    let previousId = parseInt($("#previous-button").attr("data-groupid"))-1
    let url = "/groups/" + previousId + ".json"
    $.get(url, function(json){
      debugger
      $("#group-name").text(json.name)

      //update the data-group-id for all buttons
      updateGroupId(previousId)
      //remove previous table
      let $table = $("#groups-exp tbody")
      $table.remove();
      updateTableHtml(json)
    })
    //end of get call
  })
  // end of previous-button


  $(".wrapper").on("click", "#next-button", function(e) {
    e.preventDefault();
    let nextId = parseInt($("#previous-button").attr("data-groupid"))+1
    let url = "/groups/" + nextId + "/expenses.json"
    $.get(url, function(json){
      $("#group-name").text(json.name)
      //update the data-group-id for all buttons
      updateGroupId(nextId)
      //remove previous table
      let $table = $("#groups-exp tbody")
      $table.remove();
      updateTableHtml(json)
    })
    //end of get call
  })
  // end of next-button

  //clears the input when cancel is clicked
  $("#cancel-add-expense").on("click", function(event) {
    emptyInput();
    // $("#expense_description").val("")
    // $("#expense_amount").val("0.00")
    // $("#expense_category_name").val("")
    event.preventDefault();
  })
  //end of cancel expense

  //pencil icone - edit expense
  $("div.exp-container").on("click", "a#pencil-icon", (e)=> {
    e.preventDefault();
    let $pencilIcon = e.target
    let url = $pencilIcon.href
    $.get(url, function(response){
      $(".expense-form-container").hide();
      $(".edit-expense").html(response)
    })
    // end of get call
  })
  //end of pencil icon

}
//end of attachListeners


// Loads all expenses
function loadExpenses(){
  let url = this.location.href
  url += ".json"
  $.get(url, function(json){
    debugger
    updateTableHtml(json)
  })
  //end of get call
}
// end of loadExpenses

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

  function emptyInput(){
    $("#expense_description").val("")
    $("#expense_amount").val("0.00")
    $("#expense_category_name").val("")
  }
  //end of emptyInput

  function updateGroupId(newGroupId){
    //update the data-group-id for all buttons
    $("#group-name").attr("data-groupid", newGroupId)
    $("#previous-button").attr("data-groupid", newGroupId)
    $("#next-button").attr("data-groupid", newGroupId)
    //update groupid for form
    $("form.new_expense").attr("action", "/groups/" + newGroupId + "/expenses")
    //update table groupid
    $("#groups-exp").attr("data-groupid", newGroupId)
  }
  //end of UpdateGroupID

  function updateTableHtml(json){
    let amount = "";
    let total = 0;
    let totalHTML = "";
    let groupId = json.id
    let groupExpenses = json.expenses
    //iterate over each expense within json
    if (groupExpenses.length) {
      //checks if the json array is empty
      groupExpenses.forEach(function(expense){
        // expense => {id: 210, description: "5", amount: 5, created_at: "2018-11-26T03:57:56.291Z", category: {…}, …}amount: 5category: {name: "Gifts"}created_at: "2018-11-26T03:57:56.291Z"description: "5"group: {id: 159, name: "5"}id: 210__proto__: Object
        let $table = $("#groups-exp")
        let trHTML = "";
        trHTML += '<tr><td>' + expense.description + '</td><td> $' + expense.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + '</td><td>'
        trHTML += formatDate(expense.created_at) + '</td><td>' + expense.category.name + '</td>'
        trHTML += '<td>' + `<a class="glyphicon glyphicon-pencil" id="pencil-icon" href="/groups/${groupId}/expenses/${expense.id}/edit">` + '</td>'
        trHTML += '<td>' + `<a data-confirm="Are you sure?" class="glyphicon glyphicon-trash" id="trash-icon" rel="nofollow" data-method="delete" href="/groups/${groupId}/expenses/${expense.id}"></a>` + '</td></tr>';
        $table.append(trHTML)
        amount = parseFloat(expense.amount)
        total += amount
      })
        totalHTML += '<h3> TOTAL $' + total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + '</h3>'
        $("div.total").html($(totalHTML));
    }
  }
  //end of updateTableHtml

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

  Expense.prototype.addExpenseHtml = function(){
      // adds the newly created expense to bototm of the table
      let trHTML = "";
      trHTML += '<tr><td>' + this.description + '</td><td> $' + this.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + '</td><td>'
      trHTML += this.date + '</td><td>' + this.category_name + '</td>'
      trHTML += '<td>' + `<a class="glyphicon glyphicon-pencil" id="pencil-icon" href="/groups/${this.groupId}/expenses/${this.id}/edit">` + '</td>'
      trHTML += '<td>' + `<a data-confirm="Are you sure?" class="glyphicon glyphicon-trash" id="trash-icon" rel="nofollow" data-method="delete" href="/groups/${this.groupId}/expenses/${this.id}"></a>` + '</td></tr>';
      $("#groups-exp").append(trHTML)
    }
    //end of prototype addExpenseHtml

  Expense.prototype.updateTotalHtml = function(){
      // updates the total amount
      let $total = $("div.total")
      let currentTotal = Number($("div.total").text().replace(/[^0-9.-]+/g,""))
      let amount = this.amount;
      let total = currentTotal + this.amount;

      total = total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
      let totalHTML = '<h3>TOTAL $' + total + '</h3>'
      $total.html($(totalHTML));
  }
  //end of prototype updateTotalHtml
