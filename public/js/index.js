var socket = io();


console.log('indexjs');
var roomDropDown = jQuery('#selectRoom');

socket.on('updateRoomList',function(users){
  roomDropDown.empty();
  $.each(options, function(i, p) {
    roomDropDown.append($('<option></option>').val(p).html(p));
  });
});
