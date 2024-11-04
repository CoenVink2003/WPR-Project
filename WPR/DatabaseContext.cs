using Microsoft.EntityFrameworkCore;

namespace WPR;

public class DatabaseContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder b) => b.UseSqlite("Data Source=WPR.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<Employee> Employees { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<CompanyCustomer> CompanyCustomers { get; set; }
    public DbSet<Company> Companies { get; set; }
}
