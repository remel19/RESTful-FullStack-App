$("span").on('click', function(event) {
  if(event.target.className == "fa fa-times"){
    $.ajax({
      url: '/people/'+ event.target.id,
      type: 'DELETE',
    });
    window.location.replace('/people');
  }
});

$(".update-button ").on('click', function(event) {
  var uid = "updateCity"+event.target.id;
  var updateCity = $("#"+uid).val();
  $.ajax({
    url: '/people/'+event.target.id,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({updateCity: updateCity}),
  });
  setTimeout(timeout, 500);
});

function timeout(){
  window.location.replace('/people');
}
