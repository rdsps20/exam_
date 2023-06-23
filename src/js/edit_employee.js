$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    id = urlParams.get('id')
    getEmployeeData();
});

$("#submit").on('click', function(){
    last_name = $("#last_name").val();
    first_name = $("#first_name").val();
    date_hired = $("#date_hired").val();
    image_upload = $("#image_upload").val();
    proc = true;

    if(last_name == '' || last_name == null){
        $("#last_name_br").attr('hidden', false);
        $("#last_name_required").attr('hidden', false);

        proc = false;
    }

    if(first_name == '' || first_name == null){
        $("#first_name_br").attr('hidden', false);
        $("#first_name_required").attr('hidden', false);

        proc = false;
    }

    if(date_hired == '' || date_hired == null){
        $("#date_hired_br").attr('hidden', false);
        $("#date_hired_required").attr('hidden', false);

        proc = false;
    }

    if(proc == false){
        return false;
    }
    else{
        updateEmployee();
    }
});

$("#last_name").on('change', function(){
    if($("#last_name").val() != ''){
        $("#last_name_br").attr('hidden', true);
        $("#last_name_required").attr('hidden', true);
    }
});

$("#first_name").on('change', function(){
    if($("#first_name").val() != ''){
        $("#first_name_br").attr('hidden', true);
        $("#first_name_required").attr('hidden', true);
    }
});

$("#date_hired").on('change', function(){
    if($("#date_hired").val() != ''){
        $("#date_hired_br").attr('hidden', true);
        $("#date_hired_required").attr('hidden', true);
    }
});

$("#image_upload").on('change', function(){
    if($("#image_upload").val() == '' || $("#image_upload").val() == null){
        $("#image_upload").attr('src', '../../src/images/default_image_icon.png');
    }
    else{
        const [file] = image_upload.files
        if (file) {
            image.src = URL.createObjectURL(file)
        }
    }
});

function getEmployeeData(){
    $.ajax({
        url : "../../functions/action.php",
        type : "GET",
        data : {
            id : id,
            action : 'get_employee_data',
        },
        success : function(res){
            data = JSON.parse(res);

            $("#last_name").val(data.last_name);
            $("#first_name").val(data.first_name);
            $("#middle_name").val(data.middle_name);
            $("#date_hired").val(data.date_hired);
            $("#image_alter").val(data.image);
            $("#image").attr('src', '../../src/images/' + data.image);
        },
    });
}

function updateEmployee(){
    var form = $("#employee_form")[0];
    var formData = new FormData(form);
    formData.append('id', id);
    formData.append('action', 'update_employee');

    $.ajax({
        url : "../../functions/action.php",
        type : "POST",
        contentType : false,
        processData : false,
        data : formData,
        success : function(res){
            alert(res);
            window.location = "employee_list.html";
        },
        error : function(xhr, status,error){
            alert(xhr.responseText);
        }
    });

}