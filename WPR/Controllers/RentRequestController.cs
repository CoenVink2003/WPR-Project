using System.Text.Json;
using Microsoft.AspNetCore.JsonPatch;

namespace WPR.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WPR;

[Route("api/RentRequest")]
[ApiController]
public class RentRequestController : ControllerBase
{
    private readonly DatabaseContext _context;

    // Constructor voor Dependency Injection van de DatabaseContext
    public RentRequestController(DatabaseContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context)); // Gooi een fout als _context null is
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<RentRequest>>> getRentRequests()
    {
        var rentrequests = await _context.RentRequests.ToListAsync();

        return rentrequests;

    }

    [HttpGet("{id}")]
    public async Task<ActionResult<RentRequest>> GetRentRequest(int id)
    {
        var rentrequest = await _context.RentRequests.FindAsync(id);

        if (rentrequest == null)
        {
            return NotFound();
        }

        return rentrequest;
    }

    [HttpPost]
    public async Task<ActionResult<RentRequest>> PostRentRequest([FromBody] RentRequest rentrequest)
    {
        if (rentrequest == null)
        {
            return BadRequest("Customer object is null.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.RentRequests.Add(rentrequest);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetRentRequest", new { id = rentrequest.Id }, rentrequest);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutRentRequest(int id, RentRequest rentrequest)
    {
        if (id != rentrequest.Id)
        {
            return BadRequest("ID in URL komt niet overeen met ID in het RentRequest-object.");
        }

        _context.Entry(rentrequest).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.RentRequests.Any(c => c.Id == id))
            {
                return NotFound("RentRequest niet gevonden.");
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }
    
    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchRentRequest(int id, [FromBody] JsonElement rawPatchData)
    {
        // Haal de klant op uit de database
        var rentrequest = await _context.RentRequests.FindAsync(id);
        if (rentrequest == null)
        {
            return NotFound("Customer not found.");
        }

        // Parse de inkomende JSON handmatig
        var updatedCustomer = JsonSerializer.Deserialize<RentRequest>(
            rawPatchData.GetRawText(),
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );

        if (updatedCustomer == null)
        {
            return BadRequest("Invalid data.");
        }

        // Controleer en werk alleen de meegegeven velden bij
        if (updatedCustomer.Vehicle != null)
            rentrequest.Vehicle = updatedCustomer.Vehicle;

        if (updatedCustomer.Customer != null)
            rentrequest.Customer = updatedCustomer.Customer;
        
        if (updatedCustomer.CompanyCustomer != null)
            rentrequest.CompanyCustomer = updatedCustomer.CompanyCustomer;
        
        if (updatedCustomer.Start_date != null)
            rentrequest.Start_date = updatedCustomer.Start_date;
        
        if (updatedCustomer.End_date != null)
            rentrequest.End_date = updatedCustomer.End_date;
        
        if (updatedCustomer.Comment != null)
            rentrequest.Comment = updatedCustomer.Comment;

        if (updatedCustomer.Accepted != null)
            rentrequest.Accepted = updatedCustomer.Accepted;
        
        // Sla de wijzigingen op
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.RentRequests.Any(c => c.Id == id))
            {
                return NotFound("RentRequest not found.");
            }
            else
            {
                throw;
            }
        }

        return NoContent(); // Retourneer 204 bij succesvolle update
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRentRequest(int id)
    {
        var rentrequest = await _context.RentRequests.FindAsync(id);
        if (rentrequest == null)
        {
            return NotFound();
        }

        _context.Remove(rentrequest);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
