using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using api.Features.Notes.Entities;

namespace api.Infrastructure.Persistence.Configurations;

public class NoteConfiguration : IEntityTypeConfiguration<Note>
{
    public void Configure(EntityTypeBuilder<Note> builder)
    {
        builder.ToTable("company_notes");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CompanyId).IsRequired();
        builder.Property(x => x.Content).IsRequired().HasMaxLength(4000);
        builder.Property(x => x.CreatedAt).IsRequired();
        builder.Property(x => x.UpdatedAt).IsRequired();

        // One note per company
        builder.HasIndex(x => x.CompanyId).IsUnique();

        // Configure one-to-one relationship and cascade on delete: when a company is removed the note is removed too
        builder.HasOne(n => n.Company)
               .WithOne(c => c.Note)
               .HasForeignKey<Note>(n => n.CompanyId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}