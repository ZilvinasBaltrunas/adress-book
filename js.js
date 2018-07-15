$(document).ready(function() {
	// all jquery code goes here
	
	//load data
	function loadData() {
		var string = window.localStorage.getItem('data');
		// console.log( JSON.parse(string) );
		if (string == null) {
			return [];
		}
		return JSON.parse(string);
	}

	// save data
	function saveData(data) {
		var json = JSON.stringify(data);
		// console.log(data);
		// console.log(json);
		window.localStorage.setItem('data', json);
	}
	
	function onUserCreate(e) {
		e.preventDefault();

		var newUser = {};
		newUser.title = $('#title').val();
		if ( $('#firstName').val() === "") {
			alert('first Name is required!');
			return;
		}
		newUser.firstName = $('#firstName').val();
		newUser.lastName = $('#lastName').val();
		newUser.phone = $('#phone').val();
		var users = loadData();

		var userIndex = $('#myForm').data('user');

		if (userIndex) {
			users[userIndex] = newUser;
			$('#myForm').data('user', '');
		} else {
			users.push(newUser);
		}
		
		saveData(users);
		printUsers();
		$('#myForm')[0].reset();
		$('form').fadeOut();
	}

	
	$('#save').click(onUserCreate);

	
	function printUsers() {
		var users = loadData();
		$('ul').html('');
		if (users) {
			for(var i = 0; i < users.length; i++) {
				var element = '<li data-index="'+ i +'"">'+ users[i].firstName + ' ' + users[i].lastName + '</li>';
				$('ul').append(element);
			}
		}
	}
	
	function onClickLi() {
		//getting users from array
		var index = $(this).data('index');
		var users = loadData();
		var user = users[index];
		//printing details

		if ( $(this).hasClass('open') ){
			$(this).find('.user-details').remove();
		} else {
		var userTitle = "<p>" + user.title + "</p>";
		var userFirstName = "<p>" + user.firstName + "</p>";
		var userLastName = "<p>" + user.lastName + "</p>";
		var userPhone = "<p>" + user.phone + "</p>";
		var deleteButton = '<button id="delete-item">Delete</button>';
		var editButton = '<button id="edit-item">Edit</button>';
		var userHTML = userTitle + userFirstName + userLastName + userPhone + deleteButton + editButton;
		$(this).append("<div class='user-details'>" + userHTML + "</div>");
	}
	$(this).toggleClass('open');
}

	$('ul').on('click', 'li', onClickLi);

	function onDeleteItem() {
		var index = $(this).parent().parent().data('index');
		var users = loadData();
		users.splice(index, 1);
		saveData(users);
		printUsers();
	}
	$('ul').on('click', '#delete-item', onDeleteItem);


	function onEdit() {
		var index = $(this).parent().parent().data('index');
		var users = loadData();
		var user = users[index];
		$('#firstName').val(user.firstName);
		$('#lastName').val(user.lastName);
		$('#phone').val(user.phone);
		$('#title').val(user.title);
		//display the form
		$('#myForm').data('user', index);
		$('form').fadeIn();
	}
	$('ul').on('click','#edit-item', onEdit);



	printUsers();

	

	function onAddClick() {
		$('form').fadeIn();
	}
	$('#add').click(onAddClick);

	function onDeleteClick() {
		window.localStorage.removeItem('data');
		$('ul').html('');
	}
	$('#remove').click(onDeleteClick);

});


// function onAddClick() {
// 	$('#form').show();
// }

// function onButtonClick() {
// 	var valueName = ($('#saveName').val() );
// 	$('#saveName').val('');
// 	var valueLastName = ($('#saveLastName').val() );
// 	$('#saveLastName').val('');
// 	// $('#save').val('');
// 	var valuePhone = ($('#savePhone').val() );
// 	$('#savePhone').val('');
// 	$('ul').append('<li>' + valueName + " " + valueLastName + " " + valuePhone + '</li>');
// }


// $('#form').hide();
// $('#add').click(onAddClick);
// $('#save').click(onButtonClick);