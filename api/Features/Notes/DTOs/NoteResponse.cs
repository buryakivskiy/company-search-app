namespace api.Features.Notes.DTOs;

/// <summary>
/// Response containing note information.
/// </summary>
public class NoteResponse
{
    /// <summary>
    /// Note identifier.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Note content.
    /// </summary>
    public string Content { get; set; } = string.Empty;

    /// <summary>
    /// Creation timestamp in UTC.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Last update timestamp in UTC.
    /// </summary>
    public DateTime UpdatedAt { get; set; }
}