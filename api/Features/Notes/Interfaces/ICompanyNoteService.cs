using api.Features.Notes.DTOs;

namespace api.Features.Notes.Interfaces;

/// <summary>
/// Service interface for note business logic.
/// </summary>
public interface ICompanyNoteService
{
    /// <summary>
    /// Retrieve a note for a company.
    /// </summary>
    Task<NoteResponse?> GetByCompanyIdAsync(Guid companyId);

    /// <summary>
    /// Create a new note or update existing one (upsert pattern).
    /// </summary>
    Task<NoteResponse?> CreateOrUpdateAsync(Guid companyId, NoteCreateOrUpdateRequest request);

    /// <summary>
    /// Delete a note by company ID.
    /// </summary>
    Task DeleteByCompanyIdAsync(Guid companyId);
}
