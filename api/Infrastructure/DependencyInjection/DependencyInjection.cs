using api.Features.CompanySearch.Clients;
using api.Features.CompanySearch.Interfaces;
using api.Features.CompanySearch.Services;
using api.Infrastructure.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;

namespace api.Infrastructure.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // Configuration
        services.Configure<NorwegianBusinessRegisterApiConfiguration>(configuration.GetSection("NorwegianBusinessRegisterApi"));

        // Company Search Services
        services.AddHttpClient<ICompanySearchClient, NorwegianBusinessRegisterClient>();
        services.AddScoped<ICompanySearchService, CompanySearchService>();
        services.AddScoped<ICompanyMapper, api.Features.CompanySearch.Mappers.CompanyMapper>();

        // Persistence / Companies
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<api.Infrastructure.Persistence.AppDbContext>(options => options.UseNpgsql(connectionString));
        services.AddScoped<api.Features.Companies.Interfaces.ICompanyRepository, api.Features.Companies.Repositories.CompanyRepository>();
        services.AddScoped<api.Features.Companies.Interfaces.ICompanyService, api.Features.Companies.Services.CompanyService>();

        // Swagger/OpenAPI
        services.AddSwaggerGen(c =>
        {
            // Use unique schema ids to avoid collisions when different types share the same class name in different namespaces
            c.CustomSchemaIds(type => (type.FullName ?? type.Name).Replace('+', '.'));

            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Company Search API",
                Version = "v1",
                Description = "API for searching Norwegian companies from Brønnøysund Register Centre"
            });

            var xmlFile = Path.Combine(AppContext.BaseDirectory, "api.xml");
            if (File.Exists(xmlFile))
            {
                c.IncludeXmlComments(xmlFile);
            }
        });

        return services;
    }
}
