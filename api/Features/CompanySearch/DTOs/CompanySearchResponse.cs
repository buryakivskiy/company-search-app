namespace api.Features.CompanySearch.DTOs;

/// <summary>
/// Response containing search results and pagination information.
/// </summary>
public class CompanySearchResponse
{
    /// <summary>
    /// List of companies matching the search criteria.
    /// </summary>
    public IEnumerable<Company> items { get; set; } = new List<Company>();

    /// <summary>
    /// Pagination information.
    /// </summary>
    public Pagination pagination { get; set; } = new Pagination();
}

/// <summary>
/// Pagination metadata.
/// </summary>
public class Pagination
{
    /// <summary>
    /// Current page number (1-based).
    /// </summary>
    public int page { get; set; }

    /// <summary>
    /// Number of items per page.
    /// </summary>
    public int pageSize { get; set; }

    /// <summary>
    /// Total number of items across all pages.
    /// </summary>
    public int totalItems { get; set; }

    /// <summary>
    /// Total number of pages.
    /// </summary>
    public int totalPages { get; set; }

    /// <summary>
    /// Whether there is a next page.
    /// </summary>
    public bool hasNext { get; set; }

    /// <summary>
    /// Whether there is a previous page.
    /// </summary>
    public bool hasPrevious { get; set; }
}