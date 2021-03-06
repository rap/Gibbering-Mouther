$(document).ready(function() {

	viewportFit();
	chatHandlers();
	titleFlop();

    var client = new Faye.Client('http://localhost:8000/');
    // receive chat messages

    client.subscribe('/messages', function(message) {
        var p = $("<div class='chatLine' style='display:block;'><div class='chatLineContent'><span class='chatLineUsername'>" + message.user + ": </span>" + message.text + "</div></div>");
        $('#' + message.id).find('.chats').append(p);
        $('#' + message.id).find('.chats').scrollTop($('.chats').attr("scrollHeight"));
    });

    $(".pubmsg").keyup(function(event) {
		if ((event.keyCode == '13' || event.keyCode == undefined) && $(this).val()) {
			client.publish('/messages', {
				text: $(this).val(),
                user: $(this).closest('.chatContainer').find('.username').val() || "Unknown",
				id: $(this).closest('.chatContainer').attr('id')
			});

			console.log($(this).closest('.chatContainer').attr('id'));

			$(this).val("").focus();
		}
    });

    $('.pubsend').click(function() {
		$(this).closest('.chatContainer').find('.pubmsg').keyup();
    });

	// JQUERY UI AWAYYYYYYYYY
	$(".chatContainer" ).draggable({ stack: ".chatContainer" }).resizable({
		maxHeight: 2000,
		maxWidth: 1000,
		minHeight: 225,
		minWidth: 195
	}).resize(function() {
		$(this).find('.chats').width($(this).width());
		$(this).find('.chats').height($(this).height() - 91);
		$(this).find('.chatPanel').width($(this).width());
		$(this).find('.pubmsg').width($(this).width() - 55);
		$(this).find('.username').width($(this).width() - 65);
	});
});

viewportFit = function() {
	$('#container').height($(window).height() - 30);
	$('#container').width($(window).width() - 30);

	$(window).resize(function() {
		$('#container').height($(window).height() - 30);
		$('#container').width($(window).width() - 30);
	});
}

chatHandlers = function() {
	$('.chatContainer').mousedown(function() {
		$('.chatContainer').each(function(index) {
			$(this).removeClass('focusedChat');
		});

		$(this).addClass('focusedChat');
		$(this).find('.pubmsg').focus();
	});	
}

titleFlop = function() {
	$('.chatTitle').click(function() {
		$(this).replaceWith('<input type="text" class="titleFlop" value="'+$(this).html()+'" />');
		$('.titleFlop').focus().keyup(function(event) {
			// make the following evaluation scrape for spaces!
			if ((event.keyCode == '13' || event.keyCode == undefined) && $(this).val()) {
				var newTitle = $(this).val();
				// these next lines would ideally strip non-utf8 characters, non-websafe characters, executable script, et al.
				// but... they don't!! because i am shitty at regex. but also because i am drunk!!
				// <3 swift
				$(this).closest('.chatContainer').attr({'id' : newTitle.replace(/\s/g, "-")});
				$(this).replaceWith('<h3 class="chatTitle">' + newTitle + '</h3>');
				$('#' + newTitle.replace(/\s/g, "-")).find('.chatTitle').css({'backgroundColor': '#efc'}).animate({backgroundColor: '#eee'}, 500);
				titleFlop();
			}
		}).focusout(function(event) {
			var newTitle = $(this).val();
			// these next lines would ideally strip non-utf8 characters, non-websafe characters, executable script, et al.
			// but... they don't!! because i am shitty at regex. but also because i am drunk!!
			// <3 swift
			$(this).closest('.chatContainer').attr({'id' : newTitle.replace(/\s/g, "-")});
			$(this).replaceWith('<h3 class="chatTitle">' + newTitle + '</h3>');
			$('#' + newTitle.replace(/\s/g, "-")).find('.chatTitle').css({'backgroundColor': '#efc'}).animate({backgroundColor: '#eee'}, 500);
			titleFlop();
		});
	});
}