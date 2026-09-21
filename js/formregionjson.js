console.log("formregionjson.js");

const urlPostRegion = "http://localhost:8080/api/regioner";

function createRegion() {
    const region = {};
    region.kode = "3995";
    region.navn = "Østerbro";
    region.href = "http://nørrebro";
    return region;
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

async function postRegion(region) {
    try {
        const nogetjson = await postDataAsJson(urlPostRegion, region);
        console.log("noget json");
        console.log(nogetjson);
    } catch (e) {
        console.error(e);
    }
}

const reg1 = createRegion();
console.log(reg1);
postRegion(reg1);

