using api.Features.Companies.DTOs;

namespace api.Features.Companies.Interfaces;

public interface ICompanyService
{
    Task<CompanyResponse> CreateAsync(CompanyCreateRequest request);
    Task<CompanyResponse?> GetByIdAsync(Guid id);
    Task DeleteAsync(Guid id);
    Task<CompanySearchResponse> SearchAsync(CompanySearchRequest request);
}