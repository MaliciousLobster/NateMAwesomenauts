<?php
	require_once(__DIR__ . "/../model/config.php");	//creates connection to the server



	$query = $_SESSION["connection"]->query("CREATE TABLE posts (" //creates a table called post with an id
		. "id int(11) NOT NULL AUTO_INCREMENT,"        //and a title with up to 255 characters
		. "title varchar(255) NOT NULL,"               //noneh of them can be null.
		. "post text NOT NULL,"
		. "DateTime datetime NOT NULL,"
		. "PRIMARY KEY (id) )");						//tells our table that the primary key is my ID

	if($query) {
		echo " Succesfully created table: posts"; //runs the query, creates the table once
	}
	else {
		// echo "<p>" . $_SESSION["connection"]->error . "</p>"; //echos out that the table has already been created
	}

	//runs a query to create a table for users, none of the values can be null
	$query = $_SESSION["connection"]->query("CREATE TABLE users (" //creates a table called post using the _SESSION variable connection to do a query
		. "id int(11) NOT NULL AUTO_INCREMENT, "                   //creates an ID for the user
		. "username varchar(30) NOT NULL, "						   //creates an email for user
		. "email varchar(50) NOT NULL, "						   //creatses a username for user
		. "password char(128) NOT NULL, "                          //creates a password for user
		. "salt char(128) NOT NULL, "							   //protects against malware
		. "PRIMARY KEY (id))");
	
