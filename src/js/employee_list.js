$(document).ready(function(){
    getEmployeeList();
});

function getEmployeeList(){
    $.ajax({
        url : "../../functions/action.php",
        type : "GET",
        data : {
            action : 'get_employee_list',
        },
        success : function (res){
            data = JSON.parse(res);
            
            if(data.length > 0){
                
                for(var i = 0; i < data.length; i++){
                    $("#employee_lists tbody").append(`
                    <tr>
                        <td>${data[i].last_name}</td>
                        <td>${data[i].first_name}</td>
                        <td>${data[i].middle_name}</td>
                        <td>${data[i].date_hired}</td>
                        <td><button type="button" id="edit-employee-btn" onclick="editEmployeeBtn(${data[i].id})">Edit</button>
                       <button type="button" id="delete-employee-btn" onclick="deleteEmployeeBtn(${data[i].id})">Delete</button></td>
                    </tr>`
                    );
                }
            }
        },
        error : function(xhr, status, error){
            $("#employee_lists tbody").append(`<tr><td colsplan="5">No Data Available</td></tr>`);
        }
    });
}

function editEmployeeBtn(id){
    window.location = "edit_employee.html?id=" + id;
}

function deleteEmployeeBtn(id){
    if(id == 0) return false;

    $.ajax({
        url : "../../functions/action.php",
        type : "POST",
        data : {
            id : id,
            action : "delete_employee",
        },
        success : function(res){
            alert(res);
            location.reload();
        },
        error : function(xhr, status, error){
            alert(xhr.responseText);
        }
    });
}