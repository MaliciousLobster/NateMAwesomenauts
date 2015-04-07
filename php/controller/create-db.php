<?php
	require_once(__DIR__ . "/../model/config.php");	//creates connection to the server


	//runs a query to create a table for users, none of the values can be null
	$query = $_SESSION["connection"]->query("CREATE TABLE users (" //creates a table called post using the _SESSION variable connection to do a query
		. "id int(11) NOT NULL AUTO_INCREMENT, "                   //creates an ID for the user
		. "username varchar(30) NOT NULL, "						   //creatses a username for user
		. "password char(128) NOT NULL, "                          //creates a password for user
		. "salt char(128) NOT NULL, "							   //protects against malware
		. "exp int(4)," 
		. "exp1 int(4),"
		. "exp2 int(4),"
		. "exp3 int(4),"
		. "exp4 int(4),"
		. "PRIMARY KEY (id))");
	
