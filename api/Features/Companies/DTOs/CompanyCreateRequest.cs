using System.ComponentModel.DataAnnotations;

namespace api.Features.Companies.DTOs;

/// <summary>
/// Request to create a company in the local database.
/// </summary>
public class CompanyCreateRequest
{
    /// <summary>
    /// Organization (registration) number — exactly 9 digits.
    /// </summary>
    [Required]
    [RegularExpression(@"^\d{9}$", ErrorMessage = "Organization number must be exactly 9 digits")]
    public string OrganizationNumber { get; set; } = null!;

    /// <summary>
    /// Company name (max 200 characters).
    /// </summary>
    [Required]
    [MaxLength(200, ErrorMessage = "Name cannot exceed 200 characters")]
    public string Name { get; set; } = null!;

    /// <summary>
    /// Postal or street address (optional, max 500 characters).
    /// </summary>
    [MaxLength(500, ErrorMessage = "Address cannot exceed 500 characters")]
    public string? Address { get; set; }
}