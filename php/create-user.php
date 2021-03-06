<!DOCTYPE html>
<html lang="en">

	<head>
		 <meta charset="utf-8" />
		 <link rel="stylesheet" href="/Employee/php/create-user.css" />
		 <link href='https://fonts.googleapis.com/css?family=Allerta' rel='stylesheet'>

		<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-app.js"></script>
		
		<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-auth.js"></script>
		<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-database.js"></script>
		<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-firestore.js"></script>
		<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-messaging.js"></script>
		<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-functions.js"></script>
		 
		
	</head>

	<body>
	<?php
	echo '<div id="account-create-div">
		<div id="back-button-div">
			<button type="button" id="back-button"  onclick="backOnClick()">Back</button>
		</div>
	
		<div id="title">
			<h3>Account Creation</h3>
		</div>
		
		<div id="login-credentials">
			<input type="text" id="email-field-create" class="text-fields" placeholder="Email" size="35" onkeyup="emailOnChangeCreate()">
			<input type="text" id="username-field-create" class="text-fields" placeholder="Username" size="35" onkeyup="usernameOnChangeCreate()">
			<input type="password" id="password-field-create" class="text-fields" placeholder="Password" size="35" onkeyup="passwordOnChangeCreate()">
			<input type="text" id="company-field-create" class="text-fields" placeholder="Company" size="35" onkeyup="companyOnChangeCreate()">
			
			<button type="button" id="submit-button-create" class="buttons" onclick="createOnClick()">Create Account</button>
        </div>       
	</div>	

		<script type="text/javascript" src="/Employee/php/firebase-init.js"></script> 
		<script type="text/javascript" src="/Employee/php/create-user.js"></script>';
		?>
	</body>

</html>