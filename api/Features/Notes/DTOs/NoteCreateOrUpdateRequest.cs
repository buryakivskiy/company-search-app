using System.ComponentModel.DataAnnotations;

namespace api.Features.Notes.DTOs;

public class NoteCreateOrUpdateRequest
{
    [Required]
    [MaxLength(4000, ErrorMessage = "Content cannot exceed 4000 characters")]
    public string Content { get; set; } = string.Empty;
}