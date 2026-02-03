using api.Features.Notes.Entities;

namespace api.Features.Notes.Interfaces;

public interface ICompanyNoteRepository
{
    Task<Note?> GetByCompanyIdAsync(Guid companyId);
    Task<Note> AddAsync(Note entity);
    Task<Note> UpdateAsync(Note entity);
    Task DeleteByCompanyIdAsync(Guid companyId);
}
