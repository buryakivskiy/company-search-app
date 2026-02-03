using api.Features.Notes.Entities;

namespace api.Features.Notes.Interfaces;

/// <summary>
/// Repository interface for Note data access operations.
/// </summary>
public interface ICompanyNoteRepository
{
    /// <summary>
    /// Retrieve a note by company ID (one-to-one relationship).
    /// </summary>
    Task<Note?> GetByCompanyIdAsync(Guid companyId);

    /// <summary>
    /// Add a new note to the database.
    /// </summary>
    Task<Note> AddAsync(Note entity);

    /// <summary>
    /// Update an existing note.
    /// </summary>
    Task<Note> UpdateAsync(Note entity);

    /// <summary>
    /// Delete a note by company ID.
    /// </summary>
    Task DeleteByCompanyIdAsync(Guid companyId);
}
