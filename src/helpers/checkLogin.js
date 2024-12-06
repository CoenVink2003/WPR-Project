export default function checkLogin(enable_redirect = true) {
    if (sessionStorage.getItem("customer_id") === null) {
        window.location.href = "/Customer/Login";
        return false;
    }
    return true;
}
