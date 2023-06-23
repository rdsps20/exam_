<?php
require "dbconnection.php";

if(isset($_POST['action'])){
    if($_POST['action'] == 'add_new_branch'){
        addNewBranch();
    }
    else if($_POST['action'] == 'delete_branch'){
        deleteBranch();
    }
    else if($_POST['action'] == 'update_branch'){
        updateBranch();
    }
    else if($_POST['action'] == 'add_employee'){
        addEmployee();
    }
    else if($_POST['action'] == 'delete_employee'){
        deleteEmployee();
    }
    else if($_POST['action'] == 'update_employee'){
        updateEmployee();
    }
}
if(isset($_GET['action'])){
    if($_GET['action'] == 'get_branch_data'){
        getBranchData();
    }
    else if($_GET['action'] == 'get_employee_list'){
        getEmployeeList();
    }
    else if($_GET['action'] == 'get_employee_data'){
        getEmployeeData();
    }
    else if($_GET['action'] == 'get_employee_drop_down'){
        getEmployeeDropDown();
    }
}

function addNewBranch(){
   global $conn;

   $branch_code = $_POST['branch_code'];
   $branch_name = mysqli_escape_string($conn, $_POST['branch_name']);
   $address = mysqli_escape_string($conn, $_POST['address']);
   $barangay = mysqli_escape_string($conn, $_POST['barangay']);
   $city = mysqli_escape_string($conn, $_POST['city']);
   $permit_no = mysqli_escape_string($conn, $_POST['permit_no']);
   $branch_manager = mysqli_escape_string($conn, $_POST['branch_manager']);
   $date_opened = $_POST['date_opened'];
   $active_flag = $_POST['active_flag'];

   $sql = "INSERT INTO branch_lists(branch_code, branch_name, address, barangay, city, permit_no, branch_manager, date_opened, active_flag)";
   $sql .=  " VALUES ('$branch_code', '$branch_name', '$address', '$barangay', '$city', '$permit_no', '$branch_manager', '$date_opened', '$active_flag')";

    if($conn->query($sql) === TRUE){
        http_response_code(201);
        echo "Branch Successfully Added";
    }
    else{
        http_response_code(400);
        echo "Something went wrong";
    }
}

function deleteBranch(){
    global $conn;

    $id = $_POST['id'];
    
    $sql = "DELETE FROM branch_lists WHERE id = '$id'";
    
    if($conn->query($sql) === TRUE){
        echo "Branch Deleted";
    }

}

function getBranchData(){
    global $conn;

    $id = $_GET['id'];

    $sql = "SELECT * FROM branch_lists WHERE id = '$id'";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        $found = mysqli_fetch_array($result);
        
        echo json_encode($found);
    }
    
}

function updateBranch(){
    global $conn;

    $id = $_POST['id'];
    $branch_code = $_POST['branch_code'];
    $branch_name = mysqli_escape_string($conn, $_POST['branch_name']);
    $address = mysqli_escape_string($conn, $_POST['address']);
    $barangay = mysqli_escape_string($conn, $_POST['barangay']);
    $city = mysqli_escape_string($conn, $_POST['city']);
    $permit_no = mysqli_escape_string($conn, $_POST['permit_no']);
    $branch_manager = mysqli_escape_string($conn, $_POST['branch_manager']);
    $date_opened = $_POST['date_opened'];
    $active_flag = $_POST['active_flag'];

    $sql = "UPDATE branch_lists SET branch_code = '$branch_code',";
    $sql .= " branch_name = '$branch_name', address = '$address',";
    $sql .= " barangay = '$barangay', city = '$city', permit_no = '$permit_no',";
    $sql .= " branch_manager = '$branch_manager', date_opened = '$date_opened', active_flag = '$active_flag'";
    $sql .= " WHERE id = '$id'";

    if($conn->query($sql) === TRUE){
        http_response_code(200);
        echo "Branch Updated";
    }
    else{
        http_response_code(500);
        echo "Failed";
    }
}

function getEmployeeList(){
    global $conn;

    $sql = "SELECT * FROM employee_lists";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        $lists = [];

        while($row = $result->fetch_assoc()){
            array_push($lists, $row);
        }

        echo json_encode($lists);
    }
    else{
        http_response_code(404);
        echo "No Data Availabe";
    }
    
}

function addEmployee(){
    global $conn;

    $last_name = $_POST['last_name'];
    $first_name = mysqli_escape_string($conn, $_POST['first_name']);
    $middle_name = mysqli_escape_string($conn, $_POST['middle_name']);
    $date_hired = mysqli_escape_string($conn, $_POST['date_hired']);

    $image = $_FILES['image_upload']['tmp_name'];
    $extension = pathinfo($_FILES['image_upload']['name'], PATHINFO_EXTENSION);
    $filename = $last_name . "_uploaded_" . time() . "." . $extension;
    $dir = "../src/images/" . $filename;

    if(move_uploaded_file($image, $dir)){
        $sql = "INSERT INTO employee_lists ";
        $sql .= "(last_name, first_name, middle_name, date_hired, image) ";
        $sql .= "VALUES ";
        $sql .= "('$last_name', '$first_name', '$middle_name', '$date_hired', '$filename')";

        if($conn->query($sql) === TRUE){
            http_response_code(201);
            echo "New Employee Added";
        }
        else{
            http_response_code(500);
            echo "Failed";
        }
    }
    else{
        http_response_code(500);
        echo "There was a problem uploading the image";
    }
}

function deleteEmployee(){
    global $conn;

    $id = $_POST['id'];

    $sql = "DELETE FROM employee_lists WHERE id = '$id'";
    
    if($conn->query($sql) == TRUE){
        http_response_code(200);
        echo "Employee Deleted";
    }
    else{
        http_response_code(500);
        echo "Server Error";
    }
}

function getEmployeeData(){
    global $conn;

    $id = $_GET['id'];
    
    $sql = "SELECT * FROM employee_lists WHERE id = '$id'";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        $found = mysqli_fetch_array($result);

        http_response_code(200);
        echo json_encode($found);
    }
}

function updateEmployee(){
    global $conn;

    $id = $_POST['id'];
    $last_name = $_POST['last_name'];
    $first_name = mysqli_escape_string($conn, $_POST['first_name']);
    $middle_name = mysqli_escape_string($conn, $_POST['middle_name']);
    $date_hired = mysqli_escape_string($conn, $_POST['date_hired']);
    $image_alter = mysqli_escape_string($conn, $_POST['image_alter']);
    $image = $_FILES['image_upload']['tmp_name'];
    

    if($image == '' || $image == NULL){
        $filename = $image_alter;
    }
    else{
        $extension = pathinfo($_FILES['image_upload']['name'], PATHINFO_EXTENSION);
        $filename = $last_name . "_uploaded_" . time() . "." . $extension;
        $dir = "../src/images/" . $filename;

        move_uploaded_file($image, $dir);
    }

    $sql = "UPDATE employee_lists SET last_name = '$last_name', ";
    $sql .= "first_name = '$first_name', middle_name = '$middle_name', ";
    $sql .= "date_hired = '$date_hired', image = '$filename' ";
    $sql .= "WHERE id = '$id'";

    if($conn->query($sql) === TRUE){
        http_response_code(200);
        echo "Employee Updated";
    }
    else{
        http_response_code(500);
        echo "Internal Server Error";
    }
    
}

function getEmployeeDropDown(){
    global $conn;

    $sql = "SELECT * FROM employee_lists";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        $emp_lists = [];
        while($row = $result->fetch_assoc()){
            array_push($emp_lists, $row);
        }
    http_response_code(200);
    echo json_encode($emp_lists);
    }
    else{
        http_response_code(404);
        echo "No data available";
    }
}
?>