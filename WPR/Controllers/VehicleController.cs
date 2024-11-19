using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WPR;

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
    public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
    {
        return await _context.Vehicles.ToListAsync();
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

    [HttpPost]
    public async Task<ActionResult<Vehicle>> PostVehicle([FromBody] Vehicle vehicle)
    {
        if (vehicle == null)
        {
            return BadRequest("Vehicle object is null.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Vehicles.Add(vehicle);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetVehicle", new { id = vehicle.Id }, vehicle);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutVehicle(int id, Vehicle vehicle)
    {
        if (id != vehicle.Id)
        {
            return BadRequest("ID in URL komt niet overeen met ID in het Vehicle-object.");
        }

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
