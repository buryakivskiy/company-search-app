namespace api.Features.Notes.Entities;

public class Note
{
    public Guid Id { get; set; }
    public Guid CompanyId { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public api.Features.Companies.Entities.SavedCompany? Company { get; set; }
}