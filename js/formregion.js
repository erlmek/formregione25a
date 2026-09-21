console.log("formregionjson.js");

const urlPostRegion = "http://localhost:8080/api/regioner";

document.addEventListener('DOMContentLoaded', createFormEventListener);
let formRegion;

function createFormEventListener() {
    formRegion = document.getElementById("formRegion");
    formRegion.addEventListener("submit", handleFormSubmit);
}

async function postDataAsJson(url, obj){
    const objectAsJsonString = JSON.stringify(obj);
    console.log(objectAsJsonString);
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: objectAsJsonString
    };
    const response = await fetch(url,fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}

async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault(); //sørg for browser IKKE udfører submit kald til backend
    try {
        debugger;
        const formData = new FormData(formRegion);
        const plainFormData = Object.fromEntries(formData.entries());
        console.log(formData);
        const responseData = await postDataAsJson(urlPostRegion, plainFormData);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}





