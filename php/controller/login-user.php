<?php
	require_once(__DIR__ . "/../model/config.php");

	$array = array(
		'exp'=> '',
		'exp1'=> '',
		'exp2'=> '',
		'exp3'=> '',
		'exp4'=> '',
	);

	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING); //filters input recieved from a post that is being submitted to the file. Makes sure that it's a string.
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING); //filters input recieved from a post that is being submitted to the file. Makes sure that it's a string.
	$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username'");

                //selects the salt & password from the table "users" where username is = to the username that the user has input
	$query = $_SESSION["connection"]->query("SELECT salt, password FROM users WHERE username = '$username'");

	if($query->num_rows == 1){
		$row = $query->fetch_array(); //acquires data from the table users and stores it in $row

		if($row["password"] === crypt($password, $row["salt"])){ //checks the password if it was correct 
			$_SESSION["authenticated"] = true; //creates a new session variable
			$array["exp"] = $row["exp"]; //taking exp vars from the row (the answers from the query)
			$array["exp"] = $row["exp"];
			$array["exp"] = $row["exp"];
			$array["exp"] = $row["exp"];
			$array["exp"] = $row["exp"];


			echo "login successful";
		}
		else {
			echo "<p>Invalid username and password</p>";
			
		}
	}
	else {
		echo "<p>Invalid username and password</p>";
	}