using System.ComponentModel.DataAnnotations;

namespace WPR;

public class CompanyCustomer
{
    [Key]
    public int Id { get; set; }
    
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public Company Company { get; set; }
    public bool IsManager { get; set; }
}

public class CompanyCustomerDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public bool IsManager { get; set; }
    public int CompanyId { get; set; } // Voeg de CompanyId toe
}