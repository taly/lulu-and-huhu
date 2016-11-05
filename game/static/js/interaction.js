window.prompt = function(content, onSuccess) {
	$("<p>" + content + "</p>").prompt(function(e) {
		if (e.response) {
			if (typeof e.response == "string") {
				onSuccess(e.response); 
			} else { // If response is empty string, e.response will be true and not ""
				onSuccess("");
			}
		}
	});
}

window.alert = function(content, onConfirm) {
	if (onConfirm) {
		$("<p>" + content + "</p>").alert(onConfirm);	
	} else {
		$("<p>" + content + "</p>").alert();	
	}
}

window.confirm = function(content, onConfirm) {
	$("<p>" + content + "</p>").confirm(function(e) {
		if (e.response) {
			onConfirm();
		}
	});
}

function promptPassword(onSuccess) {
	prompt("What is the level password?", function(password) {
		if (password) {
			$.ajax({
			  type: "POST",
			  url: "/password/",
			  data: JSON.stringify({"password": password, "current_path": window.location.pathname}),
			  contentType: 'application/json; charset=utf-8',
			  success: function (data) {
			  	resp = JSON.parse(data)
			  	var url = resp.redirect;
			  	if (onSuccess != null) {
					onSuccess(url);	  		
			  	} else {
			  		window.location = url;
			  	}
			  },
			  error: function (data) {
			  	if (data.status == 403) {
			  		alert("Wrong password :(")
			  	} else {
				  	alert("Unexpected failure :(");
			  	}
			  }
			});
		} else {
			setTimeout(function() {alert("Empty password :(");}, 0);
		}
	});
}
