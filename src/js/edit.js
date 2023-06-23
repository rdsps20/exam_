$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    id = urlParams.get('id')

    getEmployeeDropDown();
    
});

$("#submit").on('click', function(){
    branch_code = $("#branch_code").val();
    branch_name = $("#branch_name").val();
    address = $("#address").val();
    barangay = $("#barangay").val();
    city = $("#city").val();
    proc = true;

    if(branch_code == '' || branch_code == null){
        $("#branch_code_br").attr('hidden', false);
        $("#branch_code_required").attr('hidden', false);

        proc = false;
    }

    if(branch_name == '' || branch_name == null){
        $("#branch_name_br").attr('hidden', false);
        $("#branch_name_required").attr('hidden', false);

        proc = false;
    }

    if(address == '' || address == null){
        $("#address_br").attr('hidden', false);
        $("#address_required").attr('hidden', false);

        proc = false;
    }

    if(barangay == '' || barangay == null){
        $("#barangay_br").attr('hidden', false);
        $("#barangay_required").attr('hidden', false);

        proc = false;
    }

    if(city == '' || city == null){
        $("#city_br").attr('hidden', false);
        $("#city_required").attr('hidden', false);

        proc = false;
    }

    if(proc == false){
        return false;
    }
    else{
        updateBranch(branch_code, branch_name, address, barangay, city);
    }
});

$("#branch_code").on('change', function(){
    if($("#branch_code").val() != ''){
        $("#branch_code_br").attr('hidden', true);
        $("#branch_code_required").attr('hidden', true);
    }
});

$("#branch_name").on('change', function(){
    if($("#branch_name").val() != ''){
        $("#branch_name_br").attr('hidden', true);
        $("#branch_name_required").attr('hidden', true);
    }
});

$("#address").on('change', function(){
    if($("#address").val() != ''){
        $("#address_br").attr('hidden', true);
        $("#address_required").attr('hidden', true);
    }
});

$("#barangay").on('change', function(){
    if($("#barangay").val() != ''){
        $("#barangay_br").attr('hidden', true);
        $("#barangay_required").attr('hidden', true);
    }
});

$("#city").on('change', function(){
    if($("#city").val() != ''){
        $("#city_br").attr('hidden', true);
        $("#city_required").attr('hidden', true);
    }
});

function getBranchData(){
    
    $.ajax({
        url : "../functions/action.php",
        type : "GET",
        data : {
            id : id,
            action : 'get_branch_data',
        },
        success : function (res){
            data = JSON.parse(res);
            
            $("#branch_code").val(data.branch_code);
            $("#branch_name").val(data.branch_name);
            $("#address").val(data.address);
            $("#barangay").val(data.barangay);
            $("#city").val(data.city);
            $("#permit_no").val(data.permit_no);
            $("#date_opened").val(data.date_opened);
            $("#branch_manager").val(data.branch_manager);

            if(data.active_flag == 0){
                $("#active_flag").attr('checked', false) 
            }
            else{
                $("#active_flag").attr('checked', true) 
            }
        },
    });
}

function getEmployeeDropDown(){
    $.ajax({
        url : "../functions/action.php",
        type : "GET",
        data : {
            action : 'get_employee_drop_down',
        },
        success : function (res){
            data = JSON.parse(res);
            console.log(data);
            for(var i = 0; i < data.length; i++){
                if(data[i].middle_name != '' || data[i].middle_name != null){
                    fullname = data[i].first_name + " " + data[i].middle_name + " " + data[i].last_name;
                }
                else{
                    fullname = data[i].first_name + " " + data[i].last_name;
                }
                $("#branch_manager").append(`
                    <option value="${fullname}">${fullname}</option>
                `);
            }

            getBranchData();
        }
    });
}

function updateBranch(branch_code, branch_name, address, barangay, city){
    permit_no = $("#permit_no").val();
    branch_manager = $("#branch_manager").val();
    date_opened = $("#date_opened").val();
    if($("#active_flag").is(":checked")){
        active_flag = 1
    }
    else{
        active_flag = 0;
    }
    
    $.ajax({
        url : "../functions/action.php",
        type : "POST",
        data : {
            id : id,
            branch_code : branch_code,
            branch_name : branch_name,
            address : address,
            barangay : barangay,
            city : city,
            permit_no : permit_no,
            branch_manager : branch_manager,
            date_opened : date_opened,
            active_flag : active_flag,
            action : "update_branch",
        },
        success : function(res){
            alert(res);
            window.location = "index.html";
        },
        error : function(xhr, status, error){
            alert(xhr.responseText);
        }
    });
}
