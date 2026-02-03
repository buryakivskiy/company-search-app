using api.Features.Notes.DTOs;

namespace api.Features.Notes.Interfaces;

public interface ICompanyNoteService
{
    Task<NoteResponse?> GetByCompanyIdAsync(Guid companyId);
    Task<NoteResponse?> CreateOrUpdateAsync(Guid companyId, NoteCreateOrUpdateRequest request);
    Task DeleteByCompanyIdAsync(Guid companyId);
}
