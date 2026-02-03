using api.Features.Companies.DTOs;
using api.Features.Companies.Interfaces;
using api.Features.Companies.Entities;
using api.Infrastructure.Exceptions;

namespace api.Features.Companies.Services;

public class CompanyService : ICompanyService
{
    private readonly ICompanyRepository _repo;

    public CompanyService(ICompanyRepository repo)
    {
        _repo = repo;
    }

    public async Task<CompanyResponse> CreateAsync(CompanyCreateRequest request)
    {
        // Ensure organization number uniqueness
        if (!string.IsNullOrWhiteSpace(request.OrganizationNumber))
        {
            var existing = await _repo.GetByOrganizationNumberAsync(request.OrganizationNumber);
            if (existing != null)
            {
                throw new ConflictException($"Organization number {request.OrganizationNumber} already exists.");
            }
        }

        var entity = new SavedCompany
        {
            Id = Guid.NewGuid(),
            OrganizationNumber = request.OrganizationNumber,
            Name = request.Name,
            Address = request.Address
        };

        var saved = await _repo.AddAsync(entity);

        return new CompanyResponse
        {
            Id = saved.Id,
            OrganizationNumber = saved.OrganizationNumber,
            Name = saved.Name,
            Address = saved.Address,
            CreatedAt = saved.CreatedAt
        };
    }

    public async Task DeleteAsync(Guid id)
    {
        await _repo.DeleteAsync(id);
    }

    public async Task<CompanyResponse?> GetByIdAsync(Guid id)
    {
        var s = await _repo.GetByIdAsync(id);
        if (s == null) return null;
        return new CompanyResponse
        {
            Id = s.Id,
            OrganizationNumber = s.OrganizationNumber,
            Name = s.Name,
            Address = s.Address,
            CreatedAt = s.CreatedAt
        };
    }

    public async Task<CompanySearchResponse> SearchAsync(CompanySearchRequest request)
    {
        string? name = null;
        string? orgNumber = null;
        if (!string.IsNullOrWhiteSpace(request.Query))
        {
            var q = request.Query.Trim();
            if (System.Text.RegularExpressions.Regex.IsMatch(q, "^\\d{9}$"))
                orgNumber = q;
            else
                name = q;
        }

        var (items, total) = await _repo.SearchAsync(name, orgNumber, request.Page, request.PageSize);

        var dtos = items.Select(s => new CompanyResponse
        {
            Id = s.Id,
            OrganizationNumber = s.OrganizationNumber,
            Name = s.Name,
            Address = s.Address,
            CreatedAt = s.CreatedAt
        }).ToList();

        var totalPages = (int)Math.Ceiling((double)total / request.PageSize);

        return new CompanySearchResponse
        {
            Items = dtos,
            Page = request.Page,
            PageSize = request.PageSize,
            TotalItems = total,
            TotalPages = totalPages,
            HasNext = request.Page < totalPages,
            HasPrevious = request.Page > 1
        };
    }
}