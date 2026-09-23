import { fetchAnyUrl, restDelete, fetchRegioner } from "./modulejson.js"
console.log("er i kommunetable")

const urlKommune = "http://localhost:8080/api/kommuner"
const pbCreateKommuneTable = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")

function createTable(kommune) {
    let cellCount = 0
    let rowCount = tblKommuner.rows.length
    let row = tblKommuner.insertRow(rowCount)
    row.id = kommune.navn

    let cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.kode
    cell.style.width = "5%"

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.navn
    cell.style.width = "15%"

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.href
    cell.style.width = "20%"

    cell = row.insertCell(cellCount++)
    let img = document.createElement("img")
    img.setAttribute("src", kommune.hrefPhoto)
    img.setAttribute("alt", "hej")
    img.setAttribute("width", 150)
    img.setAttribute("height", 150)
    cell.appendChild(img)

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.region.kode
    cell.style.width = "5%"

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.region.navn
    cell.style.width = "15%"

    //Add region dropdown
    cell = row.insertCell(cellCount++)
    const dropdown = document.createElement('select');

    regmap.forEach(reg => {
        const element = document.createElement('option');
        element.textContent = reg.navn
        element.value = reg.kode
        element.region = reg
        dropdown.append(element);
    })

    cell.append(dropdown)
    dropdown.value = kommune.region.kode //sætter dropdown til rigtige region for kommunen.

    cell = row.insertCell(cellCount++)
    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Slet kommune");
    pbDelete.className = "btn1"
    cell.appendChild(pbDelete);
    pbDelete.onclick = async function() {
        if (await deleteKommune(kommune)) {
            document.getElementById(kommune.navn).remove();
        }
    }
}

async function deleteKommune(kommune) {
    try {
        const url = urlKommune + "/" + kommune.kode;
        const response = await restDelete(url);
        if (response.ok) {
            console.log("Kommune slettet:" + kommune.navn);
            const body = await response.text();
            alert(body);
            console.log(body);
        } else {
            console.log(response.status);
            return false;
        }
    } catch (error) {
        alert(error.message);
        return false;
    }
    return true;
}

function mysort(kommuner) {
    return kommuner.sort((kom1,kom2) => {
        if (kom1.region.kode>kom2.region.kode) {return -1}
        else if (kom2.region.kode > kom1.region.kode) {return 1}
        else {return (kom1.navn > kom2.navn) ? 1 : -1}
    })
}


let kommuner = [];
let regmap = new Map();
async function fetchKommuner() {
    regmap = await fetchRegioner()
    kommuner = await fetchAnyUrl(urlKommune);
    if (kommuner) {
        mysort(kommuner);
        kommuner.forEach(createTable)
    }
    console.log(kommuner);
}

function actionGetKommuner() {
    fetchKommuner();
}

pbCreateKommuneTable.addEventListener("click", actionGetKommuner)

