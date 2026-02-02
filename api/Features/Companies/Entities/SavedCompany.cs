namespace api.Features.Companies.Entities;

public class SavedCompany
{
    public Guid Id { get; set; }
    public string OrganizationNumber { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string? Address { get; set; }
    public DateTime CreatedAt { get; set; }
}
