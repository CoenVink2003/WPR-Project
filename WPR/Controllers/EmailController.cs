using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.EntityFrameworkCore.Storage;
using WPR;

[ApiController]
[Route("api/send-email")]
public class EmailController : ControllerBase
{
    [HttpPost]
    public IActionResult SendEmail([FromBody] EmailRequest request)
    {
        if (request == null || request.RecipientEmail == null || request.Subject == null || request.Message == null)
        {
            return BadRequest();
        }
        
        try
        {
            Email emailSender = new Email();
            string subject = request.Subject;
            string body = request.Message;

            emailSender.SendEmail(request.RecipientEmail, subject, body);

            return Ok(new { message = "E-mail succesvol verzonden." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}

public class EmailRequest
{
    public string RecipientEmail { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }
}