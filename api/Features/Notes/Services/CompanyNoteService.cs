using api.Features.Notes.Interfaces;
using api.Features.Notes.DTOs;
using api.Features.Notes.Entities;
using api.Features.Companies.Interfaces;

namespace api.Features.Notes.Services;

public class CompanyNoteService : ICompanyNoteService
{
    private readonly ICompanyNoteRepository _repo;
    private readonly ICompanyRepository _companyRepo;

    public CompanyNoteService(ICompanyNoteRepository repo, ICompanyRepository companyRepo)
    {
        _repo = repo;
        _companyRepo = companyRepo;
    }

    public async Task<NoteResponse?> GetByCompanyIdAsync(Guid companyId)
    {
        var note = await _repo.GetByCompanyIdAsync(companyId);
        if (note == null) return null;
        return new NoteResponse
        {
            Id = note.Id,
            Content = note.Content,
            CreatedAt = note.CreatedAt,
            UpdatedAt = note.UpdatedAt
        };
    }

    public async Task<NoteResponse?> CreateOrUpdateAsync(Guid companyId, NoteCreateOrUpdateRequest request)
    {
        var company = await _companyRepo.GetByIdAsync(companyId);
        if (company == null) return null; // caller will return 404

        var existing = await _repo.GetByCompanyIdAsync(companyId);
        if (existing == null)
        {
            var entity = new Note
            {
                Id = Guid.NewGuid(),
                CompanyId = companyId,
                Content = request.Content,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var saved = await _repo.AddAsync(entity);
            return new NoteResponse
            {
                Id = saved.Id,
                Content = saved.Content,
                CreatedAt = saved.CreatedAt,
                UpdatedAt = saved.UpdatedAt
            };
        }
        else
        {
            existing.Content = request.Content;
            var updated = await _repo.UpdateAsync(existing);
            return new NoteResponse
            {
                Id = updated.Id,
                Content = updated.Content,
                CreatedAt = updated.CreatedAt,
                UpdatedAt = updated.UpdatedAt
            };
        }
    }

    public async Task DeleteByCompanyIdAsync(Guid companyId)
    {
        await _repo.DeleteByCompanyIdAsync(companyId);
    }
}
