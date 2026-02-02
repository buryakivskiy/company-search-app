using System.Collections.Generic;

namespace api.Features.Companies.DTOs;

/// <summary>
/// Search result for saved companies with pagination.
/// </summary>
public class CompanySearchResponse
{
    /// <summary>
    /// Matching items.
    /// </summary>
    public IEnumerable<CompanyResponse> Items { get; set; } = new List<CompanyResponse>();

    /// <summary>
    /// Current page number (1-based).
    /// </summary>
    public int Page { get; set; }

    /// <summary>
    /// Page size.
    /// </summary>
    public int PageSize { get; set; }

    /// <summary>
    /// Total number of matching items.
    /// </summary>
    public int TotalItems { get; set; }

    /// <summary>
    /// Total number of pages.
    /// </summary>
    public int TotalPages { get; set; }

    /// <summary>
    /// Whether there is a next page.
    /// </summary>
    public bool HasNext { get; set; }

    /// <summary>
    /// Whether there is a previous page.
    /// </summary>
    public bool HasPrevious { get; set; }
}