$(document).ready(function() {
    var client = new Faye.Client('http://mole.local:8000/');
    // receive chat messages

    client.subscribe('/messages', function(message) {
        var p = $("<div class='chat' style='display:block;'><div class='content'><span class='username'>" + message.user + ": </span>" + message.text + "</div></div>");
        $('#chats').append(p);
        $('#chats').scrollTop($('#chats').attr("scrollHeight"));
    });

    $("#pubmsg").keyup(function(event) {
            if ((event.keyCode == '13' || event.keyCode == undefined) && $("#pubmsg").val()) {
            client.publish('/messages', {
                      text: $("#pubmsg").val(),
                      user: $("#username").val() || "Unknown",
                    });
                    $("#pubmsg").val("").focus();
            }
    });

    $('#pubsend').click(function() {
      $('#pubmsg').keyup();
    });

});

