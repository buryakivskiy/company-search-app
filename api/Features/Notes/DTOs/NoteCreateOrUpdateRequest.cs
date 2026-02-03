using System.ComponentModel.DataAnnotations;

namespace api.Features.Notes.DTOs;

/// <summary>
/// Request to create or update a company note.
/// </summary>
public class NoteCreateOrUpdateRequest
{
    /// <summary>
    /// Note content (max 4000 characters).
    /// </summary>
    [Required]
    [MaxLength(4000, ErrorMessage = "Content cannot exceed 4000 characters")]
    public string Content { get; set; } = string.Empty;
}