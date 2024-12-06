using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WPR;

[Route("api/CompanyCustomer")]
[ApiController]
public class CompanyCustomerController : ControllerBase
{
    private readonly DatabaseContext _context;
    
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
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CompanyCustomer>>> GetCompanyCustomers(
        [FromQuery] int? companyId) // Haal CompanyId uit de querystring
    {
        try
        {
            if (companyId.HasValue)
            {
                // Filter op basis van CompanyId
                var customers = await _context.CompanyCustomers
                    .Where(c => c.Company.Id == companyId.Value)
                    .ToListAsync();
                return Ok(customers);
            }
        
            // Als geen CompanyId wordt meegegeven, geef dan alle klanten terug
            var allCustomers = await _context.CompanyCustomers.ToListAsync();
            return Ok(allCustomers);
        }
        catch (Exception ex)
        {
            // Log de fout
            return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult> CreateCompanyCustomer([FromBody] CompanyCustomerDTO companyCustomerDto)
    {
        try
        {
            var company = await _context.Companies.FindAsync(companyCustomerDto.CompanyId); // Haal de juiste company op
            if (company == null)
            {
                return BadRequest("Company not found");
            }

            var companyCustomer = new CompanyCustomer
            {
                FirstName = companyCustomerDto.FirstName,
                LastName = companyCustomerDto.LastName,
                Email = companyCustomerDto.Email,
                Password = companyCustomerDto.Password,
                IsManager = companyCustomerDto.IsManager,
                Company = company // Wijs de gevonden company toe
            };

            _context.CompanyCustomers.Add(companyCustomer);
            await _context.SaveChangesAsync();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
        }
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