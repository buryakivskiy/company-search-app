namespace api.Features.Companies.DTOs;

/// <summary>
/// Representation of a saved company.
/// </summary>
public class CompanyResponse
{
    /// <summary>
    /// Entity identifier.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Organization number.
    /// </summary>
    public string OrganizationNumber { get; set; } = null!;

    /// <summary>
    /// Company name.
    /// </summary>
    public string Name { get; set; } = null!;

    /// <summary>
    /// Address, if available.
    /// </summary>
    public string? Address { get; set; }

    /// <summary>
    /// Creation timestamp in UTC.
    /// </summary>
    public DateTime CreatedAt { get; set; }
}