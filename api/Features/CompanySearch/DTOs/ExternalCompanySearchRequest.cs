namespace api.Features.CompanySearch.DTOs;

/// <summary>
/// Internal DTO used to call the external Norwegian Business Register API.
/// </summary>
public class ExternalCompanySearchRequest
{
    public string? Name { get; set; }
    public string? OrganizationNumber { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}
