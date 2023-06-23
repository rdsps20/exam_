<?php
require "dbconnection.php";
global $conn;
$sql = "SELECT * FROM branch_lists";
$result = $conn->query($sql);
$lists = [];
if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        array_push($lists, $row);
    }
}
echo json_encode($lists);
?>