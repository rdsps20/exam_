$(document).ready(function(){

    var table = $("#lists").DataTable({
        "language" : {
            "emptyTable" : "No data found, click on <b>Add New</b> button"
        },
        ajax:{
            url : "../functions/get_branch_lists.php",
            type : "GET",
            dataSrc : function(json){
                console.log(json);
                var return_data = new Array();

                for(var i = 0; i < json.length; i++){
                    return_data.push({
                        "id" : json[i].id,
                        "branch_code" : json[i].branch_code,
                        "branch_name" : json[i].branch_name,
                        "address" : json[i].address,
                        "barangay" : json[i].barangay,
                        "city" : json[i].city,
                        "permit_no" : json[i].permit_no,
                        "branch_manager" : json[i].branch_manager,
                        "date_opened" : json[i].date_opened,
                        "isActive" : json[i].active_flag,
                        "action" : `<button type="button" class="edit_btn" onclick="editBtn(${json[i].id})"><i class="fa fa-edit"></i>Edit</button>
                                    <button type="button" class="delete_btn" onclick="deleteBtn(${json[i].id})"><i class="fa fa-trash-o"></i>Delete</button>`
                    });
                }

                return return_data;
            },
        },
        createdRow: function(row, data, dataIndex){
            $( row ).find('td:eq(0)').attr('data-validate', 'branch_code');
            $( row ).find('td:eq(1)').attr('data-validate', 'branch_name');
            $( row ).find('td:eq(2)').attr('data-validate', 'branch_manager');
            $( row ).find('td:eq(3)').attr('data-validate', 'date_opened');
            $( row ).find('td:eq(4)').attr('data-validate', 'action');
        },
        columns:[
            {data: 'branch_code',class: 'text-center mainText py-2',},
            {data: 'branch_name',class: 'text-center mainText py-2',},
            {data: 'branch_manager',class: 'text-center mainText py-2',},
            {data: 'date_opened',class: 'text-center mainText py-2',},
            {data: 'action',class: 'text-center mainText py-2',},
        ],
    });

});

$("#add").on('click', function(){
    addBranch();
});

function addBranch(){
    window.location = "add_branch.html";
}

function editBtn(id){
    window.location = "edit.html?id=" + id;
}

function deleteBtn(id){
    if(id == 0) return false;
    
    $.ajax({
        url : "../functions/action.php",
        type : "POST",
        data : {
            id : id,
            action : "delete_branch"
        },
        success : function (res){
            alert(res);
            location.reload();
        },
        error : function (xhr, status, error){
            alert(xhr.responseText)
        }
    });
}
