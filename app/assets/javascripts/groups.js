$(document).on('turbolinks:load', function(){

  $("a#new_group_form").on("click", function(event){
    //Fire some AJAX
    $.ajax({
      method: "GET",
      url: this.href,
      ///groups/new
    }).success(function(response) {
      //chain a callback function on what to when we're done
      $("div.group_form").html(response)
      $("a#new_group_form").hide();
    });
    event.preventDefault();
  })

})
