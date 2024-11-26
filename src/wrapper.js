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
            console.log(response);
            return true;
        } else {
            console.log(response);
            return false;
        }
    } catch (error) {
        console.error("Fout tijdens POST-verzoek:", error);
        return false; // Fout in netwerk of andere uitzondering
    }
}
