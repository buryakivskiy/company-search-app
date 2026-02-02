using api.Features.CompanySearch.DTOs;

namespace api.Features.CompanySearch.Interfaces;

/// <summary>
/// Service for handling company search operations.
/// </summary>
public interface ICompanySearchService
{
    /// <summary>
    /// Searches for companies using the provided request.
    /// </summary>
    /// <param name="request">The search request.</param>
    /// <returns>A response containing companies and pagination info.</returns>
    Task<CompanySearchResponse> SearchCompaniesAsync(CompanySearchRequest request);
}