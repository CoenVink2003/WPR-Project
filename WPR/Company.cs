using System.ComponentModel.DataAnnotations;

namespace WPR;

public class Company
{
    
    [Key]
    public int Id { get; set; }
    
    public string CompanyName { get; set; } 
    public string Address { get; set; }
    public string City { get; set; }
    public string ZipCode { get; set; }
    public string HouseNumber { get; set; }
    public int KvkNumber { get; set; }
    public string Email { get; set; }
}