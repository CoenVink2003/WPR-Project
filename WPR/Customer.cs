using System.ComponentModel.DataAnnotations;

namespace WPR;

public class Customer
{
    [Key]
    public int Id { get; set; }
    
    public string Name { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string ZipCode { get; set; }
    public string HouseNumber { get; set; }
    public string Email { get; set; }
    public int PhoneNumber { get; set; }
}