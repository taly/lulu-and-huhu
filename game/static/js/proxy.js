function promptPassword(onSuccess) {
	var password = prompt("What is the level password?", "");
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
	}
}