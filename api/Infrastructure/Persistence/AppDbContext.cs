using Microsoft.EntityFrameworkCore;

namespace api.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<api.Features.Companies.Entities.SavedCompany> Companies { get; set; } = null!;
    public DbSet<api.Features.Notes.Entities.Note> Notes { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
