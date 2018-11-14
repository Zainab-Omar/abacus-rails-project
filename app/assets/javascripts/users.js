$(document).on('turbolinks:load', function(){

  $("a#create-group-form").on("click", function(event){
    let url = this.pathname;

    $.get(url, function(response){
    }).success(function(response){
      $("div.group-form").html(response)
    })
    .fail(function(response){
      alert("Error: " + response);
    });
    event.preventDefault();
  });

  $("a#submit-group").on("click", function(event){
    let url = this.pathname;

    $.get(url, function(response){
    }).success(function(response){
      debugger
      $("div.group-form").append(respsonse);
    })
    event.preventDefault();
  });


  $("a#cancel-group").on("click", function(event){
    let url = this.pathname;

    $.get(url, function(response){
    }).success(function(response){
      $("div.group-form").hide();
    })
    event.preventDefault();
  });

  $("a#pencil-icon").on("click", function(event){
    let url = this.pathname;

    $.get(url, function(response){
    }).success(function(response){
      $("div.group-form").html(response)
    })
    .fail(function(response){
      console.log("Error: " + response);
    });
    event.preventDefault();
  });

// Rendering JSON
  // $("a#eye-icon").on("click", function(event){
  //   let url = this.href;
  //
  //   $.get(url).success(function(json){
  //     //clear the div for any stale data
  //     $("div.group-form").html("")//emptied the div
  //
  //     //iterate over object each expense witih json
  //     json.forEach(function(expense){
  //       //with each expense data, append the data
  //     $("div.group-form").append(expense.description + " - " + expense.amount + " - " + expense.category.name)
  //     })
  //
  //   })
  //   event.preventDefault();
  // });

  // $("a#eye-icon").on("click", function(event){
  //   $.ajax({
  //     url: this.href,
  //     dataType: 'script'
  //   })
  //   event.preventDefault();
  // })


});
