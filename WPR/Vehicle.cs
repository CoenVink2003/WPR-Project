using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WPR;
[PrimaryKey("Id")]

public class Vehicle
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    public string Brand { get; set; }
    public string Type { get; set; }
    public string LicencePlate { get; set; }
    public string Color { get; set; }
    public int Bought { get; set; }
    public string VehicleType { get; set; }
}