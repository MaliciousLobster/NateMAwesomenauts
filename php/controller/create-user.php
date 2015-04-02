<?php
	require_once(__DIR__ . "/../model/config.php");

	$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL); //filters input that is passed to the file, FILTER_SANITIZE_EMAIL makes the input display as a string and gets rid of any non-emial related characters
	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING); //filters input that is passed to the file, FILTER_SANITIZE_STRING makes the value display as a string
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING); //filters input that is passed to the file, FILTER_SANITIZE_STRING makes the value display as a string

	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$"; //creating a salt variable, running the password ecrypter SHA_256 5000 times, then creating a unique id and making sure it is random

	$hashedPassword = crypt($password, $salt); //stores the result of the function crypt which takes the values of password and salt and encrypts it


	//creating a query that inserts into the table Users, sets values to email, username, password, and salt
	$query = $_SESSION["connection"]->query("INSERT INTO users SET "
		. "email = '$email',"
		. "username = '$username',"
		. "password = '$hashedPassword',"
		. "salt = '$salt'");

