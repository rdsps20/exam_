<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname= "sde";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error){
    die("Connection failed");
}
?>