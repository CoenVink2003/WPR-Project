using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WPR;

[Route("api/Company")]
[ApiController]
public class CompanyController : ControllerBase
{
    private readonly DatabaseContext _context;
    
    public CompanyController(DatabaseContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context)); // Gooi een fout als _context null is
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
    {
        return await _context.Companies.ToListAsync();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Company>> GetCompany(int id)
    {
        var company= await _context.Companies.FindAsync(id);

        if (company == null)
        {
            return NotFound();
        }

        return company;
    }

    [HttpPost]
    public async Task<ActionResult<Company>> PostCompany([FromBody] Company company)
    {
        if (company == null)
        {
            return BadRequest("Company object is null");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        _context.Companies.Add(company);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetCompany", new { id = company.Id }, company);
    }
        
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCompany(int id, Company company)
    {
        
        if (id != company.Id)
        {
            return BadRequest("ID in URL komt niet overeen met ID in het Company-object.");
        }
        
        _context.Entry(company).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {

            if (!_context.Companies.Any(e => e.Id == id))
            {
                return NotFound("Company niet gevonden.");
            }
            else
            {
                throw;
            }
        }
        
        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCompany(int id)
    {
        var company = await _context.Companies.FindAsync(id);
        if (company == null)
        {
            return NotFound();
        }
        
        _context.Remove(company);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}