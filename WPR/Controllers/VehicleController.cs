using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WPR;
using System.IO;

[Route("api/Vehicle")]
[ApiController]
public class VehicleController : ControllerBase
{
    private readonly DatabaseContext _context;

    // Constructor voor Dependency Injection van de DatabaseContext
    public VehicleController(DatabaseContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context)); // Gooi een fout als _context null is
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles(
        [FromQuery] DateTime? startDate,
        [FromQuery] DateTime? endDate,
        [FromQuery] string vehicleType = "default")
    {
        try
        {
            if (vehicleType != "default")
            {
                return await _context.Vehicles.Where(v => v.VehicleType == vehicleType).ToListAsync();
            }
            
            return await _context.Vehicles.ToListAsync();
        }
        catch (Exception ex)
        {
            // Log the error
            return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
        }
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Vehicle>> GetVehicle(int id)
    {
        var vehicle = await _context.Vehicles.FindAsync(id);

        if (vehicle == null)
        {
            return NotFound();
        }

        return vehicle;
    }

        // POST: api/vehicle
    [HttpPost]
    public async Task<ActionResult<Vehicle>> PostVehicle([FromForm] Vehicle vehicle, IFormFile image)
    {
        if (vehicle == null)
        {
            return BadRequest("Vehicle object is null.");
        }

        if (image == null || image.Length == 0)
        {
            return BadRequest("Image file is required.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Lees de afbeelding naar een byte[] en sla op in het Vehicle object
        using (var memoryStream = new MemoryStream())
        {
            await image.CopyToAsync(memoryStream);
            vehicle.Image = memoryStream.ToArray();
        }

        _context.Vehicles.Add(vehicle);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetVehicle", new { id = vehicle.Id }, vehicle);
        
    }

    // PUT method to update an existing vehicle with an image (uploaded as a file)
    [HttpPut("{id}")]
    public async Task<IActionResult> PutVehicle(int id, [FromBody] Vehicle vehicle)
    {
        if (id != vehicle.Id)
        {
            return BadRequest("ID in URL komt niet overeen met ID in het Vehicle-object.");
        }

        // // Handle the image file if it exists
        // if (image != null)
        // {
        //     using (var memoryStream = new MemoryStream())
        //     {
        //         await image.CopyToAsync(memoryStream);
        //         vehicle.Image = memoryStream.ToArray(); // Convert the image to a byte array
        //     }
        // }

        _context.Entry(vehicle).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Vehicles.Any(v => v.Id == id))
            {
                return NotFound("Vehicle niet gevonden.");
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVehicle(int id)
    {
        var vehicle = await _context.Vehicles.FindAsync(id);
        if (vehicle == null)
        {
            return NotFound();
        }

        _context.Remove(vehicle);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
