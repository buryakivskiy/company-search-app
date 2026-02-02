using Microsoft.AspNetCore.Mvc;
using api.Features.CompanySearch.DTOs;
using api.Features.CompanySearch.Interfaces;

namespace api.Features.CompanySearch.Controllers;

/// <summary>
/// Controller for searching companies from Norwegian Business Register.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class CompanySearchController : ControllerBase
{
    private readonly ICompanySearchService _service;

    public CompanySearchController(ICompanySearchService service)
    {
        _service = service;
    }

    /// <summary>
    /// Search for companies with filters and pagination.
    /// </summary>
    /// <param name="request">Search parameters including required organization number, optional name and form, 1-based page and size (1-50).</param>
    /// <returns>A paginated list of companies matching the search criteria.</returns>
    [HttpGet("search")]
    [ProducesResponseType(typeof(CompanySearchResponse), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> SearchCompanies([FromQuery] CompanySearchRequest request)
    {
        var result = await _service.SearchCompaniesAsync(request);
        return Ok(result);
    }
}