using System.ComponentModel.DataAnnotations;

namespace api.Features.Companies.DTOs;

/// <summary>
/// Parameters for searching saved companies.
/// </summary>
public class CompanySearchRequest
{
    /// <summary>
    /// Partial or full company name to match.
    /// </summary>
    public string? Name { get; set; }

    /// <summary>
    /// Exact organization number to match (9 digits).
    /// </summary>
    [RegularExpression(@"^\d{9}$", ErrorMessage = "Organization number must be exactly 9 digits")]
    public string? OrganizationNumber { get; set; }

    /// <summary>
    /// Page number (1-based).
    /// </summary>
    [Range(1, int.MaxValue, ErrorMessage = "Page must be >= 1")]
    public int Page { get; set; } = 1;

    /// <summary>
    /// Page size.
    /// </summary>
    [Range(1, 50, ErrorMessage = "Page size must be between 1 and 50")]
    public int PageSize { get; set; } = 10;
}