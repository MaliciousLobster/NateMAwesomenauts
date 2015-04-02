<?php
	require_once(__DIR__ . "/Database.php");	
	session_start(); //creates info to be used throughout the files, once
	session_regenerate_id(true); //when a session is started, the session gets an id that stays with it the entire life of the session. 
	                             //when this file is called upon it regenerates the id. Helps prevent against hackers.

	$path = "/NateMAwesomenauts/php/"; //stores direct path to the project
	
	$host = "localhost";
	$username = "root";
	$password = "root";
	$database = "awesomenauts_db";

	//verifies when the session variable "connection" doesn't have info in it
	if(!isset($_SESSION["connection"])) {
		$connection = new Database($host, $username, $password, $database); //helps query on the database
		$_SESSION["connection"] = $connection; //creating database object, storing it in connection, and assigning it to the session variable "connection"
	}	