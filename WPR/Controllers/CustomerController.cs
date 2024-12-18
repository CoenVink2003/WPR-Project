using System.Text.Json;
using Microsoft.AspNetCore.JsonPatch;

namespace WPR.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WPR;

[Route("api/Customer")]
[ApiController]
public class CustomerController : ControllerBase
{
    private readonly DatabaseContext _context;

    // Constructor voor Dependency Injection van de DatabaseContext
    public CustomerController(DatabaseContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context)); // Gooi een fout als _context null is
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers([FromQuery] string? email = null)
    {
        // Start with the base query
        var query = _context.Customers.AsQueryable();

        // Apply filter if the email parameter is provided
        if (!string.IsNullOrEmpty(email))
        {
            query = query.Where(customer => customer.Email == email);
        }

        // Execute the query and return the result
        return await query.ToListAsync();
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
    public async Task<ActionResult<Customer>> PostCustomer([FromBody] Customer customer)
    {
        if (customer == null)
        {
            return BadRequest("Customer object is null.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutCustomer(int id, Customer customer)
    {
        if (id != customer.Id)
        {
            return BadRequest("ID in URL komt niet overeen met ID in het Customer-object.");
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
    
    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchCustomer(int id, [FromBody] JsonElement rawPatchData)
    {
        // Haal de klant op uit de database
        var customer = await _context.Customers.FindAsync(id);
        if (customer == null)
        {
            return NotFound("Customer not found.");
        }

        // Parse de inkomende JSON handmatig
        var updatedCustomer = JsonSerializer.Deserialize<Customer>(
            rawPatchData.GetRawText(),
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );

        if (updatedCustomer == null)
        {
            return BadRequest("Invalid data.");
        }

        // Controleer en werk alleen de meegegeven velden bij
        if (updatedCustomer.FirstName != null)
            customer.FirstName = updatedCustomer.FirstName;

        if (updatedCustomer.LastName != null)
            customer.LastName = updatedCustomer.LastName;

        if (updatedCustomer.Email != null)
            customer.Email = updatedCustomer.Email;

        if (updatedCustomer.Password != null)
            customer.Password = updatedCustomer.Password;

        // Sla de wijzigingen op
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Customers.Any(c => c.Id == id))
            {
                return NotFound("Customer not found.");
            }
            else
            {
                throw;
            }
        }

        return NoContent(); // Retourneer 204 bij succesvolle update
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
