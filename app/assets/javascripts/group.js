$(document).ready(function() {

  //Render Group Form
  $("a#create_new_group").on("click", function(event) {
    // Fire some AJAX
    // $.ajax({
    //   method: "GET",
    //   url: this.href,
    // }).success(function(response){
    //   console.log(response);
    //   $("div.create_group_form").html(response)
    // });
    $.get(this.href).success(function(response){
      $("div.create_group_form").html(response)
    })
    event.preventDefault();
  })
  //end of create_new_group

})
// end of document ready
