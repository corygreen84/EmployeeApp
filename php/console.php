<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="utf-8" />
		<link rel="stylesheet" href="/Employee/php/console.css" />
		<link href='https://fonts.googleapis.com/css?family=Allerta' rel='stylesheet'>
		 
		<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-app.js"></script>
		
		<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-auth.js"></script>
		<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-database.js"></script>
		<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-firestore.js"></script>
		<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-messaging.js"></script>
		<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-functions.js"></script>
		 
	</head>

	<body>
		<div id="main-body">
			<div id="top-banner">
			<!-- user profile in the far top right hand corner -->
				<div id="user-profile">
					<img src="/Employee/profile.png" id="profile-pic">
					<div id="user-name-block">
						<label id="welcome-label">Welcome, </label>
						<label id="user-name"></label>
					</div>
					<div class="dropdown">
						<button onclick="showDropDown()" class="dropbtn">Profile</button>
						<div id="myDropdown" class="dropdown-content">
							<a href="#" id="0">View Profile</a>
							<a href="#" id="1">Log Out</a>
						</div>
					</div>
				</div>
				
			</div>

			<div id="side-nav" class="sidenav">
				<div id="title-bar">
					<label id="title-label"></label>
				</div>
				
				<a href="#">Jobs</a>
				<a href="#">Employees</a>
				<a href="#">Reports</a>
				<a href="#">Pay Period</a>
				<a href="#">Communication</a>
			</div>
		</div>
		
		
		<script type="text/javascript" src="/Employee/php/firebase-init.js"></script> 
		<script type="text/javascript" src="/Employee/php/console.js"></script> 
	</body>

</html>