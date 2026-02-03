using Microsoft.AspNetCore.Mvc;
using api.Features.Notes.Interfaces;
using api.Features.Notes.DTOs;

namespace api.Features.Notes.Controllers;

/// <summary>
/// Controller for managing company notes.
/// </summary>
[ApiController]
[Route("api/companies/{companyId:guid}/note")]
public class CompanyNotesController : ControllerBase
{
    private readonly ICompanyNoteService _service;

    /// <summary>
    /// Initialize the CompanyNotesController with the note service.
    /// </summary>
    public CompanyNotesController(ICompanyNoteService service)
    {
        _service = service;
    }

    /// <summary>
    /// Retrieve a note for a specific company.
    /// </summary>
    /// <param name="companyId">The company ID (GUID).</param>
    /// <returns>The company's note if exists, otherwise 404.</returns>
    [HttpGet]
    [ProducesResponseType(typeof(NoteResponse), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Get(Guid companyId)
    {
        var res = await _service.GetByCompanyIdAsync(companyId);
        if (res == null) return NotFound();
        return Ok(res);
    }

    /// <summary>
    /// Create a new note or update an existing one for a company (upsert).
    /// </summary>
    /// <param name="companyId">The company ID (GUID).</param>
    /// <param name="request">The note content to create or update.</param>
    /// <returns>The created or updated note, or 404 if company not found.</returns>
    [HttpPut]
    [ProducesResponseType(typeof(NoteResponse), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> CreateOrUpdate(Guid companyId, [FromBody] NoteCreateOrUpdateRequest request)
    {
        var res = await _service.CreateOrUpdateAsync(companyId, request);
        if (res == null) return NotFound();
        return Ok(res);
    }

    /// <summary>
    /// Delete a note for a specific company.
    /// </summary>
    /// <param name="companyId">The company ID (GUID).</param>
    /// <returns>204 No Content on successful deletion.</returns>
    [HttpDelete]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Delete(Guid companyId)
    {
        await _service.DeleteByCompanyIdAsync(companyId);
        return NoContent();
    }
}