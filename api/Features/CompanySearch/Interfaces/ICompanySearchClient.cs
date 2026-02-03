using api.Features.CompanySearch.DTOs;

namespace api.Features.CompanySearch.Interfaces;

/// <summary>
/// Interface for searching companies from external data sources.
/// </summary>
public interface ICompanySearchClient
{
    /// <summary>
    /// Searches for companies based on the provided request parameters.
    /// </summary>
    /// <param name="request">The search request containing filters for the external API.</param>
    /// <returns>The full response from the API including companies and pagination.</returns>
    Task<NorwegianBusinessRegisterResponse> SearchCompaniesAsync(ExternalCompanySearchRequest request);
}