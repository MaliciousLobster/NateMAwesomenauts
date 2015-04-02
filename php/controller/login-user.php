<?php
	require_once(__DIR__ . "/../model/config.php");

	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING); //filters input recieved from a post that is being submitted to the file. Makes sure that it's a string.
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING); //filters input recieved from a post that is being submitted to the file. Makes sure that it's a string.

                //selects the salt & password from the table "users" where username is = to the username that the user has input
	$query = $_SESSION["connection"]->query("SELECT salt, password FROM users WHERE username = '$username'");

	if($query->num_rows == 1){
		$row = $query->fetch_array(); //acquires data from the table users and stores it in $row

		if($row["password"] === crypt($password, $row["salt"])){ //checks the password if it was correct 
			$_SESSION["authenticated"] = true; //creates a new session variable
			header("Location: " . $path . "index.php"); //directs the user back to index.php
		}
		else {
			echo "<p>Invalid username and password</p>";
			
		}
	}
	else {
		echo "<p>Invalid username and password</p>";
	}