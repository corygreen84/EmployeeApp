<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="utf-8" />
		
		<link rel="stylesheet" href="/Employee/php/index.css" />
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
		echo '<div id="account-login-div" class="credentials">
	
				<div id="title">
					<h3>Account Login</h3>
				</div>
		
				<div id="login-credentials">

					<input type="text" id="email-field" class="text-fields" placeholder="Email" size="35" onkeyup="emailOnChange()">
					<input type="password" id="password-field" class="text-fields" placeholder="Password" size="35" onkeyup="passwordOnChange()">
			
				</div>
		
				<div id="submit-div">
					<button type="button" id="submit-button" onclick="loginOnClick()">Login</button>
				</div>
		
				<div id="more-options">
			
					<button type="button" id="create-user" class="buttons" onclick="createUserAccountOnClick()">Create Account</button>
					<button type="button" id="forgot-password" class="buttons" onclick="forgotPasswordOnClick()">Forgot Password?</button>
				</div>        
			</div>	
		
				<script type="text/javascript" src="/Employee/php/firebase-init.js"></script> 
				<script type="text/javascript" src="/Employee/php/index.js"></script>';
	?>
	
	
	
	
	</body>

</html>