using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace WPR;

public class RentRequest
{
    [Key]
    public int Id { get; set; }
    
    public Vehicle Vehicle { get; set; }
    public Customer Customer { get; set; }

    public CompanyCustomer CompanyCustomer { get; set; }

    public string Start_date { get; set; }
    public string End_date { get; set; }
    public string Comment { get; set; }
    public int Accepted { get; set; }

    
}