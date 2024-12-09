using System;
using System.IO;
using System.Net;
using System.Net.Mail;

namespace WPR
{
    public class Email
    {
        private readonly string username = "service.freezerapp@gmail.com";
        private readonly string appPassword = "jtcf jefi wjwp chhk";

        public void SendEmail(string recipientEmail, string subject, string body)
        {
            try
            {
                using (SmtpClient client = new SmtpClient("smtp.gmail.com", 587))
                {
                    client.Credentials = new NetworkCredential(username, appPassword);
                    client.EnableSsl = true;

                    using (MailMessage message = new MailMessage())
                    {
                        message.From = new MailAddress(username);
                        message.To.Add(recipientEmail);
                        message.Subject = subject;
                        message.Body = body;

                        client.Send(message);
                    }
                }

                Console.WriteLine("E-mail is verzonden naar " + recipientEmail);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Er is een fout opgetreden: " + ex.Message);
            }
        }
    }
}
