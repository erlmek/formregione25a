

function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json())
}

async function restDelete(url) {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: ""
    }
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        console.log("Delete failed");
    }
    return response;
}



export {fetchAnyUrl, restDelete};


