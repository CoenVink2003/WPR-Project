using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace WPR;

public class Employee
{
    [Key]
    public int Id { get; set; }
    
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public String Email { get; set; }
    public String Password { get; set; }
    public bool IsBackofficeEmployee { get; set; }
}