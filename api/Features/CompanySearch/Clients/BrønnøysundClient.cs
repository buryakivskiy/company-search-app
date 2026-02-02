using System.Text.Json;
using System.Web;
using api.Features.CompanySearch.DTOs;
using api.Features.CompanySearch.Interfaces;
using api.Infrastructure.Configurations;
using Microsoft.Extensions.Options;

namespace api.Features.CompanySearch.Clients;

public class BrønnøysundClient : ICompanySearchClient
{
    private readonly HttpClient _httpClient;
    private readonly BrønnøysundApiConfiguration _config;

    public BrønnøysundClient(HttpClient httpClient, IOptions<BrønnøysundApiConfiguration> config)
    {
        _httpClient = httpClient;
        _config = config.Value;
        _httpClient.BaseAddress = new Uri(_config.BaseUrl);
        _httpClient.DefaultRequestHeaders.Add("User-Agent", "CompanySearchApp/1.0");
    }

    public async Task<BrønnøysundResponse> SearchCompaniesAsync(CompanySearchRequest request)
    {
        try
        {
            var query = HttpUtility.ParseQueryString(string.Empty);

            if (!string.IsNullOrEmpty(request.Name))
                query["navn"] = request.Name;

            if (!string.IsNullOrEmpty(request.Organisasjonsnummer))
                query["organisasjonsnummer"] = request.Organisasjonsnummer;

            if (!string.IsNullOrEmpty(request.Organisasjonsform))
                query["organisasjonsform"] = request.Organisasjonsform;

            query["page"] = request.Page.ToString();
            query["size"] = request.Size.ToString();

            var url = $"enheter?{query}";

            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<BrønnøysundResponse>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        return result ?? new BrønnøysundResponse();
        }
        catch (HttpRequestException ex)
        {
            // Log error or handle
            throw new Exception("Error calling Brønnøysund API", ex);
        }
        catch (JsonException ex)
        {
            // Log error or handle
            throw new Exception("Error deserializing response", ex);
        }
    }
}