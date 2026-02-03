using Microsoft.AspNetCore.Mvc;
using api.Features.Notes.Interfaces;
using api.Features.Notes.DTOs;

namespace api.Features.Notes.Controllers;

[ApiController]
[Route("api/companies/{companyId:guid}/note")]
public class CompanyNotesController : ControllerBase
{
    private readonly ICompanyNoteService _service;

    public CompanyNotesController(ICompanyNoteService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(typeof(NoteResponse), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Get(Guid companyId)
    {
        var res = await _service.GetByCompanyIdAsync(companyId);
        if (res == null) return NotFound();
        return Ok(res);
    }

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

    [HttpDelete]
    [ProducesResponseType(204)]
    public async Task<IActionResult> Delete(Guid companyId)
    {
        await _service.DeleteByCompanyIdAsync(companyId);
        return NoContent();
    }
}