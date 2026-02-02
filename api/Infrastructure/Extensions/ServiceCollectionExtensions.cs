using api.Features.CompanySearch.Clients;
using api.Features.CompanySearch.Interfaces;
using api.Features.CompanySearch.Services;
using api.Infrastructure.Configurations;
using Microsoft.OpenApi;

namespace api.Infrastructure.Extensions;

/// <summary>
/// Extension methods for configuring dependency injection.
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Adds infrastructure services to the dependency injection container.
    /// </summary>
    /// <param name="services">The service collection.</param>
    /// <param name="configuration">The application configuration.</param>
    /// <returns>The service collection with added services.</returns>
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // Configuration
        services.Configure<BrønnøysundApiConfiguration>(configuration.GetSection("BrønnøysundApi"));

        // Company Search Services
        services.AddHttpClient<ICompanySearchClient, BrønnøysundClient>();
        services.AddScoped<ICompanySearchService, CompanySearchService>();

        // Swagger/OpenAPI
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Company Search API",
                Version = "v1",
                Description = "API for searching Norwegian companies from Brønnøysund Register Centre"
            });

            // Include XML comments if file exists
            var xmlFile = Path.Combine(AppContext.BaseDirectory, "api.xml");
            if (File.Exists(xmlFile))
            {
                c.IncludeXmlComments(xmlFile);
            }
        });

        return services;
    }
}