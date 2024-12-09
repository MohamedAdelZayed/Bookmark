

var nameInput = document.getElementById("webName");
var urlInput = document.getElementById("webUrl");

var BtnSub = document.getElementById("subBtn");

var UpdateBtn = document.getElementById("updateBtn");

var SearchBtn = document.getElementById("search");

var alertName = document.getElementById("alertName")

var alertUrl = document.getElementById("alertUrl")

var cancelAlert = document.querySelector(".alertBox");

var cancelBtn = document.querySelector(".cancel");

var deleteAll = document.getElementById("deleteAllBtn")

var counter = document.querySelector(".count");


var current = 0 ;

var arr= [];


if( localStorage.getItem("webContainer") != null ){

    arr = JSON.parse( localStorage.getItem("webContainer") );

    displayData();
}



BtnSub.addEventListener( "click" , function addWebsite(){

         
        var website = {
            name : nameInput.value,
            url : urlInput.value
        }
    
        if( validationInputs(nameInput ,"alertName") && validationInputs(urlInput , "alertUrl") && duplicate(arr , website) ){
        
            arr.push(website);
    
            localStorage.setItem( "webContainer" , JSON.stringify( arr ) )
        
            displayData();
            AddOk();
        
            clearForm();
            clearValidation();



    }else{
        showAlertBox();
    }


} );


function AddOk(){
    Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Website Added",
        showConfirmButton: false,

        customClass: {
            title: "my-custom-title" // Add a class for the title
        }
    

      });
}

function okUpdate(){
    Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Update Done",
        showConfirmButton: false,

        customClass: {
            title: "my-custom-title" // Add a class for the title
        }
    

      });
}


function displayData(){

    var cartona = "";

    for( var i = 0 ; i < arr.length ; i++){

        cartona += createMark(i);


    }

    document.getElementById("webData").innerHTML = cartona;

    
    if( arr.length > 0 ){
        deleteAll.classList.remove("d-none");
        counter.innerHTML = arr.length;

        console.log(arr.length)
    }else{
        deleteAll.classList.add("d-none");

    }

}

function createMark(indx){

return `

                    <tr>
                    <th scope="row">${indx + 1}</th>
                    <td class ="text-capitalize" >${arr[indx].name}</td>
                    <td> <button onclick = "visitWeb(${indx})" class="btn visit"> <i class="fa-solid fa-eye"></i> Visit </button> </td>
                    <td> <button onclick = "updateInfo(${indx})" class="btn btn-primary text-white"> <i class="fa-solid fa-pen-to-square"></i> Update </button> </td>
                    <td> <button onclick = "deleteWeb(${indx})" class="btn btn-danger delete"> <i class="fa-solid fa-trash-can"></i> Delete </button> </td>
                  </tr>

`
}

function clearForm(){
    
    nameInput.value = null;
    urlInput.value = null;


}


function visitWeb(inxxx){

    window.open( arr[inxxx].url )
}

function deleteWeb(indddd){

    arr.splice( indddd , 1 );

    localStorage.setItem( "webContainer" , JSON.stringify( arr ) )

    displayData();

}

function updateInfo(ineee){

    current= ineee;

    nameInput.value = arr[ineee].name;
    urlInput.value = arr[ineee].url;

    BtnSub.classList.add("d-none");
    UpdateBtn.classList.remove("d-none");
    
}


UpdateBtn.onclick = function ( ){

        var website = {
            name : nameInput.value,
            url : urlInput.value
        }

        // if( validationInputs(nameInput ,"alertName") && validationInputs(urlInput , "alertUrl") && duplicate(arr , website) ){

    
        arr.splice( current , 1 , website );
    
        localStorage.setItem( "webContainer" , JSON.stringify( arr ) )
    
        displayData();

        okUpdate();
    
        clearForm();
    
        clearValidation();
    
    
        BtnSub.classList.remove("d-none");
        UpdateBtn.classList.add("d-none");

    // }else{
    //     showAlertBox();
    // }


}


SearchBtn.addEventListener ( "input" , function(){

    var cartona = "";

    for( var i = 0 ; i < arr.length ; i++){

        if( arr[i].name.toLowerCase().includes( SearchBtn.value.toLowerCase() ) ){

            cartona += createMark(i);

        }

    }

    document.getElementById("webData").innerHTML = cartona;


} )


function validationInputs( ele , msg ){

    var paraMsg = document.getElementById(msg);

    var regex = {

        webName : /^[a-zA-Z0-9]{3,15}$/ ,

        webUrl :  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/ ,
    }

    if( regex[ele.id].test( ele.value ) ){

        ele.classList.add("is-valid");
        ele.classList.remove("is-invalid");

        paraMsg.classList.add("d-none");

        return true;


    }else{
        ele.classList.add("is-invalid");
        ele.classList.remove("is-valid");

        paraMsg.classList.remove("d-none");

        return false;

    }

}


function clearValidation(){

    nameInput.classList.remove("is-valid");
    urlInput.classList.remove("is-valid");

}


cancelBtn.onclick = function(){

    cancelAlert.classList.add("d-none")

}


function showAlertBox (){

        cancelAlert.classList.remove("d-none")
}



function duplicate( webArr , newObj){


    for( var i = 0 ; i < webArr.length ; i++){

        if( webArr[i].name == newObj.name || webArr[i].url == newObj.url ){
   
            return false;
            
        }

    }

    return true;



}


deleteAll.onclick = function(){

    arr = [];

    localStorage.clear();

    displayData();

} 
