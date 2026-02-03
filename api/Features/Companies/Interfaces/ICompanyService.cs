using api.Features.Companies.DTOs;

namespace api.Features.Companies.Interfaces;

/// <summary>
/// Service interface for company business logic.
/// </summary>
public interface ICompanyService
{
    /// <summary>
    /// Create a new company in the local database.
    /// </summary>
    Task<CompanyResponse> CreateAsync(CompanyCreateRequest request);

    /// <summary>
    /// Retrieve a company by ID.
    /// </summary>
    Task<CompanyResponse?> GetByIdAsync(Guid id);

    /// <summary>
    /// Delete a company by ID (cascade deletes associated notes).
    /// </summary>
    Task DeleteAsync(Guid id);

    /// <summary>
    /// Search companies with optional filters and pagination.
    /// </summary>
    Task<CompanySearchResponse> SearchAsync(CompanySearchRequest request);
}