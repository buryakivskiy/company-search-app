using api.Features.Companies.Interfaces;
using api.Features.Companies.Entities;
using Microsoft.EntityFrameworkCore;
using api.Infrastructure.Persistence;

namespace api.Features.Companies.Repositories;

public class CompanyRepository : ICompanyRepository
{
    private readonly AppDbContext _db;

    public CompanyRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<SavedCompany> AddAsync(SavedCompany entity)
    {
        entity.CreatedAt = DateTime.UtcNow;
        _db.Companies.Add(entity);
        await _db.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(Guid id)
    {
        var found = await _db.Companies.FindAsync(id);
        if (found == null) return;
        _db.Companies.Remove(found);
        await _db.SaveChangesAsync();
    }

    public async Task<SavedCompany?> GetByIdAsync(Guid id)
    {
        return await _db.Companies.FindAsync(id);
    }

    public async Task<(IEnumerable<SavedCompany> Items, int TotalItems)> SearchAsync(string? name, string? organizationNumber, int page, int pageSize)
    {
        var query = _db.Companies.AsQueryable();

        if (!string.IsNullOrWhiteSpace(name))
            query = query.Where(c => EF.Functions.ILike(c.Name, $"%{name}%"));

        if (!string.IsNullOrWhiteSpace(organizationNumber))
            query = query.Where(c => c.OrganizationNumber == organizationNumber);

        var total = await query.CountAsync();

        var items = await query.OrderByDescending(c => c.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, total);
    }
}
