using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using api.Features.Companies.Entities;

namespace api.Infrastructure.Persistence.Configurations;

public class SavedCompanyConfiguration : IEntityTypeConfiguration<SavedCompany>
{
    public void Configure(EntityTypeBuilder<SavedCompany> builder)
    {
        builder.ToTable("companies");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.OrganizationNumber).IsRequired().HasMaxLength(20);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(200);
        builder.Property(x => x.Address).HasMaxLength(500);
        builder.Property(x => x.CreatedAt).IsRequired();
        builder.HasIndex(x => x.OrganizationNumber);
    }
}
