using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WPR;

[Route("api/CompanyCustomer")]
[ApiController]
public class CompanyCustomerController : ControllerBase
{
    private readonly DatabaseContext _context;
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CompanyCustomer>>> GetCompanyCustom()
    {
        return await _context.CompanyCustomers.ToListAsync();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Customer>> GetCustomer(int id)
    {
        var customer = await _context.Customers.FindAsync(id);

        if (customer == null)
        {
            return NotFound();
        }

        return customer;
    }

    [HttpPost]
    public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
    {
        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
    }
        
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCustomer(int id, Customer customer)
    {
        
        if (id != customer.Id)
        {
            return BadRequest("ID in URL komt niet overeen met ID in het Employee-object.");
        }
        
        _context.Entry(customer).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {

            if (!_context.Customers.Any(c => c.Id == id))
            {
                return NotFound("Customer niet gevonden.");
            }
            else
            {
                throw;
            }
        }
        
        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
        var customer = await _context.Customers.FindAsync(id);
        if (customer == null)
        {
            return NotFound();
        }
        
        _context.Remove(customer);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}