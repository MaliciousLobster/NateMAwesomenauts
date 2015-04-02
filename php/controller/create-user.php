<?php
	require_once(__DIR__ . "/../model/config.php");

	
	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING); //filters input that is passed to the file, FILTER_SANITIZE_STRING makes the value display as a string
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING); //filters input that is passed to the file, FILTER_SANITIZE_STRING makes the value display as a string

	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$"; //creating a salt variable, running the password ecrypter SHA_256 5000 times, then creating a unique id and making sure it is random

	$hashedPassword = crypt($password, $salt); //stores the result of the function crypt which takes the values of password and salt and encrypts it


	//creating a query that inserts into the table Users, sets values to email, username, password, and salt
	$query = $_SESSION["connection"]->query("INSERT INTO users SET "
		. "username = '$username',"
		. "password = '$hashedPassword',"
		. "salt = '$salt', "
		. "exp = 0,"
		. "exp1 = 0,"
		. "exp2 = 0,"
		. "exp3 = 0,"
		. "exp4 = 0");


	$_SESSION["name"] = $username;

	if($query){
		//need this for ajax on index.php
		echo "true";
	}else{
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}