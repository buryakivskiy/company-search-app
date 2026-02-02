using Microsoft.AspNetCore.Mvc;
using api.Features.Companies.DTOs;
using api.Features.Companies.Interfaces;
using api.Infrastructure.Exceptions;

namespace api.Features.Companies.Controllers;

/// <summary>
/// Controller for managing saved companies.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class CompaniesController : ControllerBase
{
    private readonly ICompanyService _service;

    public CompaniesController(ICompanyService service)
    {
        _service = service;
    }

    /// <summary>
    /// Create a new saved company.
    /// </summary>
    /// <param name="request">Company create request.</param>
    /// <returns>Created company.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(CompanyResponse), 201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(409)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> Create([FromBody] CompanyCreateRequest request)
    {
        try
        {
            var company = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = company.Id }, company);
        }
        catch (ConflictException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Search saved companies with filters and pagination.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(CompanySearchResponse), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> Search([FromQuery] CompanySearchRequest request)
    {
        var result = await _service.SearchAsync(request);
        return Ok(result);
    }

    /// <summary>
    /// Get a saved company by id.
    /// </summary>
    /// <param name="id">Company id (GUID)</param>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(CompanyResponse), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var item = await _service.GetByIdAsync(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    /// <summary>
    /// Delete a saved company by id.
    /// </summary>
    /// <param name="id">Company id (GUID)</param>
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var existing = await _service.GetByIdAsync(id);
        if (existing == null) return NotFound();
        await _service.DeleteAsync(id);
        return NoContent();
    }
}