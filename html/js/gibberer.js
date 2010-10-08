$(document).ready(function() {
    var client = new Faye.Client('http://localhost:8000/');
    // receive chat messages

    client.subscribe('/messages', function(message) {
        var p = $("<div class='chatLine' style='display:block;'><div class='chatLineContent'><span class='chatLineUsername'>" + message.user + ": </span>" + message.text + "</div></div>");
		console.log(p);
        $('.chats').append(p);
        $('.chats').scrollTop($('.chats').attr("scrollHeight"));
    });

    $(".pubmsg").keyup(function(event) {
		console.log($(this).closest('.chatContainer').find('.username').val());
		if ((event.keyCode == '13' || event.keyCode == undefined) && $(this).val()) {
			client.publish('/messages', {
				text: $(this).val(),
                user: $(this).closest('.chatContainer').find('.username').val() || "Unknown",
			});
	
			$(this).val("").focus();
		}
    });

    $('.pubsend').click(function() {
		$(this).closest('.pubmsg').keyup();
    });

	// JQUERY UI AWAYYYYYYYYY
	$( ".chatContainer" ).draggable({ stack: ".chatContainer" });

});

