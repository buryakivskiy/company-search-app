using api.Features.Companies.Entities;

namespace api.Features.Companies.Interfaces;

/// <summary>
/// Repository interface for SavedCompany data access operations.
/// </summary>
public interface ICompanyRepository
{
    /// <summary>
    /// Add a new company to the database.
    /// </summary>
    Task<SavedCompany> AddAsync(SavedCompany entity);

    /// <summary>
    /// Retrieve a company by ID.
    /// </summary>
    Task<SavedCompany?> GetByIdAsync(Guid id);

    /// <summary>
    /// Retrieve a company by organization number (9 digits).
    /// </summary>
    Task<SavedCompany?> GetByOrganizationNumberAsync(string organizationNumber);

    /// <summary>
    /// Delete a company by ID.
    /// </summary>
    Task DeleteAsync(Guid id);

    /// <summary>
    /// Search companies with optional filters and pagination.
    /// </summary>
    Task<(IEnumerable<SavedCompany> Items, int TotalItems)> SearchAsync(string? name, string? organizationNumber, int page, int pageSize);
} 