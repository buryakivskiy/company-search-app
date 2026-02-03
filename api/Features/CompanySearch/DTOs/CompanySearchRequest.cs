using System.ComponentModel.DataAnnotations;

namespace api.Features.CompanySearch.DTOs;

/// <summary>
/// Request parameters for company search.
/// Single `Query` parameter may contain either a company name or an organization number (9 digits).
/// </summary>
public class CompanySearchRequest
{
    /// <summary>
    /// Search query: either name (partial match) or exact 9-digit organization number.
    /// </summary>
    [MaxLength(200, ErrorMessage = "Query cannot exceed 200 characters")]
    public string? Query { get; set; }

    /// <summary>
    /// Page number (1-based).
    /// </summary>
    [Range(1, int.MaxValue, ErrorMessage = "Page must be >= 1")]
    public int Page { get; set; } = 1;

    /// <summary>
    /// Number of items per page.
    /// </summary>
    [Range(1, 50, ErrorMessage = "PageSize must be between 1 and 50")]
    public int PageSize { get; set; } = 10;
}