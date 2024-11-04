using System.ComponentModel.DataAnnotations;

namespace WPR;

public class Vehicle
{
    [Key]
    public int Id { get; set; }
    
    public string Brand { get; set; }
    public string Type { get; set; }
    public string LicencePlate { get; set; }
    public string Color { get; set; }
    public int Bought { get; set; }
    public string VehicleType { get; set; }
}