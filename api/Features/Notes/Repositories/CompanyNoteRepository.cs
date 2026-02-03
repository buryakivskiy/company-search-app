using api.Features.Notes.Entities;
using api.Features.Notes.Interfaces;
using api.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace api.Features.Notes.Repositories;

public class CompanyNoteRepository : ICompanyNoteRepository
{
    private readonly AppDbContext _db;

    public CompanyNoteRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Note?> GetByCompanyIdAsync(Guid companyId)
    {
        return await _db.Notes.FirstOrDefaultAsync(n => n.CompanyId == companyId);
    }

    public async Task<Note> AddAsync(Note entity)
    {
        entity.CreatedAt = DateTime.UtcNow;
        entity.UpdatedAt = DateTime.UtcNow;
        _db.Notes.Add(entity);
        await _db.SaveChangesAsync();
        return entity;
    }

    public async Task<Note> UpdateAsync(Note entity)
    {
        entity.UpdatedAt = DateTime.UtcNow;
        _db.Notes.Update(entity);
        await _db.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteByCompanyIdAsync(Guid companyId)
    {
        var existing = await _db.Notes.FirstOrDefaultAsync(n => n.CompanyId == companyId);
        if (existing == null) return;
        _db.Notes.Remove(existing);
        await _db.SaveChangesAsync();
    }
}
