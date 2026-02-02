using api.Features.CompanySearch.DTOs;
using api.Features.CompanySearch.Interfaces;

namespace api.Features.CompanySearch.Services;

public class CompanySearchService : ICompanySearchService
{
    private readonly ICompanySearchClient _client;
    private readonly ICompanyMapper _mapper;

    public CompanySearchService(ICompanySearchClient client, ICompanyMapper mapper)
    {
        _client = client;
        _mapper = mapper;
    }

    public async Task<CompanySearchResponse> SearchCompaniesAsync(CompanySearchRequest request)
    {
        // Prepare request for external API (external API expects 0-based page and parameter name "size").
        var apiRequest = new CompanySearchRequest
        {
            Name = request.Name,
            OrganizationNumber = request.OrganizationNumber,
            OrganizationForm = request.OrganizationForm,
            Page = request.Page - 1, // Convert to 0-based for external API
            PageSize = request.PageSize
        };

        var apiResponse = await _client.SearchCompaniesAsync(apiRequest);

        var externalCompanies = apiResponse.embedded?.companies ?? Enumerable.Empty<ExternalCompany>();
        var items = externalCompanies.Select(ec => _mapper.Map(ec)).ToList();

        var currentPage = (apiResponse.page?.number ?? 0) + 1; // 1-based
        var totalPages = apiResponse.page?.totalPages ?? 0;

        return new CompanySearchResponse
        {
            Items = items,
            Page = currentPage,
            PageSize = apiResponse.page?.size ?? request.PageSize,
            TotalItems = apiResponse.page?.totalElements ?? 0,
            TotalPages = totalPages,
            HasNext = currentPage < totalPages,
            HasPrevious = currentPage > 1
        };
    }
}