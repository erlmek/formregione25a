import { fetchAnyUrl, restDelete } from "./modulejson.js"
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
    cell.innerHTML = kommune.region.kode
    cell.style.width = "5%"

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.region.navn
    cell.style.width = "15%"

    cell = row.insertCell(cellCount++)
    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Slet kommune");
    pbDelete.className = "btn1"
    cell.appendChild(pbDelete);
    pbDelete.onclick = function() {
        if (deleteKommune(kommune)) {
            document.getElementById(kommune.navn).remove();
        }
    }
}

async function deleteKommune(kommune) {
    try {
        const url = urlKommune + "/" + kommune.kode;
        debugger;
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


let kommuner = [];
async function fetchKommuner() {
    kommuner = await fetchAnyUrl(urlKommune);
    if (kommuner) {
        kommuner.forEach(createTable)
    }
    console.log(kommuner);
}

function actionGetKommuner() {
    fetchKommuner();
}

pbCreateKommuneTable.addEventListener("click", actionGetKommuner)

