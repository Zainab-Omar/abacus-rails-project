// $(function(){
//
//   $("a#view_expenses").on("click", function(event){
//     let url = this.pathname
//     debugger
//     $.get(url, function(data){
//       debugger
//     }).success(function(data){
//       $("div.expenses-list").append(data)
//     })
//     .fail(function(data){
//       console.log("Error: " + data)
//     });
//     event.preventDefault();
//   });
// });

// $("a#view_expenses").on("click", function(event){
    // let url = this.pathname
    // $.getJSON(url).success(function(json){
    //   var $ul = $("div.expenses-list ul")
    //   $ul.html("")
    //
    //   // iterate over each expense within json
    //   json.forEach(function(expense){
    //     // with each expense data, append an LI to the UL
    //     $ul.append("<li>" + expense.description + " - " + expense.amount + "</li>");
    //   })
    // })
//     event.preventDefault();
//   });
// });


// $("a#view_expenses").on("click", function(event){
//
//   $.ajax({
//     method: "GET",
//     url: this.pathname,
//     dataType: 'script'
//   }).success(function(data){
//     $('div.expenses-list').append(data);
//   })
//   .error(function(data){
//     alert("BROKEN FIX ME")
//   })
//     event.preventDefault();
//   });
// });
