using System.ComponentModel.DataAnnotations;

namespace WPR;

public class Company
{
    
    [Key]
    public int Id { get; set; }
    
    public string CompanyName { get; set; } 
    public int KvkNumber { get; set; }
    public string StreetName { get; set; }
    public string HouseNumber { get; set; }
    public string ZipCode { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}