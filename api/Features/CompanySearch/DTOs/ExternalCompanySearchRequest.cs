namespace api.Features.CompanySearch.DTOs;

/// <summary>
/// Internal DTO used to call the external Norwegian Business Register API.
/// </summary>
public class ExternalCompanySearchRequest
{
    /// <summary>
    /// Company name filter (partial match).
    /// </summary>
    public string? Name { get; set; }

    /// <summary>
    /// Organization number filter (9 digits).
    /// </summary>
    public string? OrganizationNumber { get; set; }

    /// <summary>
    /// Page number (0-based for external API).
    /// </summary>
    public int Page { get; set; }

    /// <summary>
    /// Number of items per page.
    /// </summary>
    public int PageSize { get; set; }
}
