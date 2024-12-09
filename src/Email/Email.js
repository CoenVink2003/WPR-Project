import {wrapperPOST} from "../wrapper";

function Email(recipientEmail, subject, message) {
    try {
        wrapperPOST("send-email", "", {
            RecipientEmail: recipientEmail,
            subject: subject,
            message: message,
        });
    } catch (error) {
        return false
    }
}

export default Email;
