using api.Features.Companies.Entities;

namespace api.Features.Companies.Interfaces;

public interface ICompanyRepository
{
    Task<SavedCompany> AddAsync(SavedCompany entity);
    Task<SavedCompany?> GetByIdAsync(Guid id);
    Task<SavedCompany?> GetByOrganizationNumberAsync(string organizationNumber);
    Task DeleteAsync(Guid id);
    Task<(IEnumerable<SavedCompany> Items, int TotalItems)> SearchAsync(string? name, string? organizationNumber, int page, int pageSize);
} 