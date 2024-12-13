export default function checkLogin(enable_redirect = true) {
    if (sessionStorage.getItem("customer_id") === null) {
        if (enable_redirect) {
            const currentUrl = encodeURIComponent(window.location.href); // Encodeer de huidige URL
            window.location.href = `/Customer/Login?redirect=${currentUrl}`;
        }
        return false;
    }
    return true;
}


export function checkRedirect(defaultRedirect = "/Home") {
    const urlParams = new URLSearchParams(window.location.search); // Haal de queryparameters op
    const redirectUrl = urlParams.get("redirect") || defaultRedirect; // Gebruik de redirect-parameter of de default waarde

    window.location.href = redirectUrl; // Redirect naar de opgegeven of default pagina
}
