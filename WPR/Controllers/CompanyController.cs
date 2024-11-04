using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;
using Microsoft.EntityFrameworkCore;
using WPR;

[Route("api/Company")]
[ApiController]
public class CompanyController : ControllerBase
{
    private DatabaseContext _context = new DatabaseContext();
    
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
    public async Task<ActionResult<Company>> PostCompany(Company company)
    {
        _context.Companies.Add(company);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetCompany", new { id = employee.Id }, employee);
    }
        
    [HttpPut("{id}")]
    public async Task<IActionResult> PutEmployee(int id, Employee employee)
    {
        
        if (id != employee.Id)
        {
            return BadRequest("ID in URL komt niet overeen met ID in het Employee-object.");
        }
        
        _context.Entry(employee).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {

            if (!_context.Employees.Any(e => e.Id == id))
            {
                return NotFound("Employee niet gevonden.");
            }
            else
            {
                throw;
            }
        }
        
        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null)
        {
            return NotFound();
        }
        
        _context.Remove(employee);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}