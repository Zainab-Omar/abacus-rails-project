$(document).on('turbolinks:load', function(){

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

  $("a#new_expense").on("submit", function(event) {
    alert("You clicked Submit")
    event.preventDefault();
  })

  // $("a#add-expense-form").on("click", function(event){
  //   let $button = $(this)
  //   let url = this.pathname
  //   $.get(url, function(data){
  //   }).success(function(data){
  //     $("div.expense-form").append(data)
  //     $button.hide();
  //   })
  //   .fail(function(data){
  //     console.log("Error: " + data)
  //   });
  //   event.preventDefault();
  // });

  // $("a#cancel-add-expense").on("click", function(event){
  //   let $button = $(this)
  //   let url = this.pathname
  //   $.get(url, function(data){
  //   }).success(function(data){
  //     $("div.expense-form").hide();
  //   })
  //   .fail(function(data){
  //     console.log("Error: " + data)
  //   });
  //   event.preventDefault();
  // });

  $("form").on("submit", function(event) {
    //1. we need URL to submit the POST request
    //2. we need the form data
    // Low Level
    $.ajax({
      type: ($("input[name='_method']").val() || this.method),
      url: this.action,
      data: $(this).serialize(), //either JSON or querystring serializing
      success: function(respsonse) {
        debugger
        $("#expense_description").val("")
        $("#expense_amount").val("")
        $("#expense_category_name").val("")
        var $expense = $("div.new-added-expense")
        $expense.append(response)
      }
    });

    // send a POST request to the correct place that form would've gone too anyway
    //along with the actual form data.
    event.preventDefault();
  })

  // $("#submit-expense").on("click", function(event) {
  //   alert("You clicked Submit")
  //   //1. we need URL to submit the POST request
  //   console.log(this)
  //   //2. we need the form data
  //
  //   // send a POST request to the correct place that form would've gone too anyway
  //   //along with the actual form data.
  //   event.preventDefault();
  // })

  $("a#pencil-icon").on("click", function(event){
    let url = this.pathname;

    $.get(url, function(data){
    }).success(function(data){
      $("div.expense-form").empty()
      $("div.expense-form").append(data)
    })
    .fail(function(data){
      console.log("Error: " + data);
    });
    event.preventDefault();
  });

});

//Submit Comments via AJAX
// $("#new_expense").on("click", function(event) {
//   alert("You clicked Submit")
//   event.preventDefault();
// })
// $("form").submit(function(event) {
//   alert("You clicked Submit")
//   event.preventDefault();
// })
//
//
// class Expense{
//   constructor(json){
//     this.description = json.description
//     this.amount = json.amount
//     this.category.name = json.
//
//   }
// }
