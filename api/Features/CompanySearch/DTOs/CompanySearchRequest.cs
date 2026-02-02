using System.ComponentModel.DataAnnotations;

namespace api.Features.CompanySearch.DTOs;

/// <summary>
/// Request parameters for company search.
/// </summary>
public class CompanySearchRequest
{
    /// <summary>
    /// Search by company name (partial match).
    /// </summary>
    [MaxLength(100, ErrorMessage = "Company name cannot exceed 100 characters")]
    public string? Name { get; set; }

    /// <summary>
    /// Search by organization number.
    /// </summary>
    [RegularExpression(@"^\d{9}$", ErrorMessage = "Organization number must be exactly 9 digits")]
    public string? Organisasjonsnummer { get; set; }

    /// <summary>
    /// Filter by organizational form code.
    /// </summary>
    [MaxLength(10, ErrorMessage = "Organization form cannot exceed 10 characters")]
    public string? Organisasjonsform { get; set; }

    /// <summary>
    /// Page number (1-based).
    /// </summary>
    [Range(1, int.MaxValue, ErrorMessage = "Page must be greater than 0")]
    public int Page { get; set; } = 1;

    /// <summary>
    /// Number of items per page.
    /// </summary>
    [Range(1, 50, ErrorMessage = "Page size must be between 1 and 50")]
    public int Size { get; set; } = 10;
}