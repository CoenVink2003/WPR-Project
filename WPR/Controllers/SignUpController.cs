namespace WPR.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WPR;

[Route("api/SignUp")]
[ApiController]
public class SignUpController : ControllerBase
{
    private readonly DatabaseContext _context;

    // Constructor voor Dependency Injection van de DatabaseContext
    public SignUpController(DatabaseContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context)); // Gooi een fout als _context null is
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SignUp>>> GetSignUps([FromQuery] string? email = null)
    {
        // Start with the base query
        var query = _context.SignUps.AsQueryable();

        // Apply filter if the email parameter is provided
        if (!string.IsNullOrEmpty(email))
        {
            query = query.Where(signUp => signUp.Email == email);
        }

        // Execute the query and return the result
        return await query.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SignUp>> GetSignUp(int id)
    {
        var signup = await _context.SignUps.FindAsync(id);

        if (signup == null)
        {
            return NotFound();
        }

        return signup;
    }

    [HttpPost]
    public async Task<ActionResult<SignUp>> PostSignUp([FromBody] SignUp signup)
    {
        if (signup == null)
        {
            return BadRequest("Signup object is null.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.SignUps.Add(signup);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetSignUp", new { id = signup.Id }, signup);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutSignUp(int id, SignUp signup)
    {
        if (id != signup.Id)
        {
            return BadRequest("ID in URL komt niet overeen met ID in het SignUp-object.");
        }

        _context.Entry(signup).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.SignUps.Any(v => v.Id == id))
            {
                return NotFound("SignUp niet gevonden.");
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSignUp(int id)
    {
        var signup = await _context.SignUps.FindAsync(id);
        if (signup == null)
        {
            return NotFound();
        }

        _context.Remove(signup);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
