using System.Text.Json;
using System.Web;
using api.Features.CompanySearch.DTOs;
using api.Features.CompanySearch.Interfaces;
using api.Infrastructure.Configurations;
using Microsoft.Extensions.Options;

namespace api.Features.CompanySearch.Clients;

public class NorwegianBusinessRegisterClient : ICompanySearchClient
{
    private readonly HttpClient _httpClient;
    private readonly NorwegianBusinessRegisterApiConfiguration _config;

    public NorwegianBusinessRegisterClient(HttpClient httpClient, IOptions<NorwegianBusinessRegisterApiConfiguration> config)
    {
        _httpClient = httpClient;
        _config = config.Value;
        _httpClient.BaseAddress = new Uri(_config.BaseUrl);
        _httpClient.DefaultRequestHeaders.Add("User-Agent", "CompanySearchApp/1.0");
    }

    public async Task<NorwegianBusinessRegisterResponse> SearchCompaniesAsync(ExternalCompanySearchRequest request)
    {
        try
        {
            var query = HttpUtility.ParseQueryString(string.Empty);

            if (!string.IsNullOrEmpty(request.Name))
                query["navn"] = request.Name;

            if (!string.IsNullOrEmpty(request.OrganizationNumber))
                query["organisasjonsnummer"] = request.OrganizationNumber;

            if (!string.IsNullOrEmpty(request.OrganizationForm))
                query["organisasjonsform"] = request.OrganizationForm;

            // external API expects 0-based page and "size" parameter
            query["page"] = request.Page.ToString();
            query["size"] = request.PageSize.ToString();

            var url = $"enheter?{query}";

            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<NorwegianBusinessRegisterResponse>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return result ?? new NorwegianBusinessRegisterResponse();
        }
        catch (HttpRequestException ex)
        {
            // Log error or handle
            throw new Exception("Error calling Norwegian Business Register API", ex);
        }
        catch (JsonException ex)
        {
            // Log error or handle
            throw new Exception("Error deserializing response", ex);
        }
    }
}