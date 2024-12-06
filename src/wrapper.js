let server_location = "https://localhost:7211/api/";


export async function wrapperPOST(controller, endpoint, data) {
    try {
        const response = await fetch(server_location + controller + "/" + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false; // Fout in netwerk of andere uitzondering
    }
}

export async function wrapperGET(controller, endpoint, data) {
    try {
        const urlEncodedData = Object.entries(data)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');


        const response = await fetch(server_location + controller + "/" + endpoint + "?" + urlEncodedData, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return await response.json(); // Return parsed JSON body
        } else {
            const errorBody = await response.text(); // Capture error body
            throw new Error(`Error: ${response.status} ${response.statusText}. Body: ${errorBody}`);
        }
    } catch (error) {
        console.error(error);
        throw error; // Rethrow to allow calling code to handle it
    }
}

export async function wrapperPUT(controller, endpoint, id, new_data) {
    try {
        const response = await fetch(server_location + controller + "/" + endpoint + "/" + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new_data),
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        throw error; // Rethrow to allow calling code to handle it
    }
}


