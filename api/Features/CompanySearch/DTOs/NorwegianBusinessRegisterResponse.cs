using System.Text.Json.Serialization;

namespace api.Features.CompanySearch.DTOs;

/// <summary>
/// Response from the Norwegian Business Register API.
/// </summary>
public class NorwegianBusinessRegisterResponse
{
    /// <summary>
    /// Embedded data containing the list of companies.
    /// </summary>
    [JsonPropertyName("_embedded")]
    public Embedded? embedded { get; set; }

    /// <summary>
    /// Pagination information.
    /// </summary>
    public Page? page { get; set; }
}

/// <summary>
/// Container for embedded company data.
/// </summary>
public class Embedded
{
    /// <summary>
    /// List of companies from the search result.
    /// </summary>
    [JsonPropertyName("enheter")]
    public IEnumerable<ExternalCompany>? companies { get; set; }
}

/// <summary>
/// Company data returned by the Norwegian Business Register API.
/// Property names use camelCase to match the external API JSON format.
/// </summary>
public class ExternalCompany
{
    /// <summary>
    /// Organization number (9 digits).
    /// </summary>
    [JsonPropertyName("organisasjonsnummer")]
    public string? organisasjonsnummer { get; set; }

    /// <summary>
    /// Company name.
    /// </summary>
    [JsonPropertyName("navn")]
    public string? navn { get; set; }

    /// <summary>
    /// Organization form (e.g., AS, AS, NSF).
    /// </summary>
    [JsonPropertyName("organisasjonsform")]
    public ExternalOrganizationForm? organisasjonsform { get; set; }

    /// <summary>
    /// Company website URL.
    /// </summary>
    [JsonPropertyName("hjemmeside")]
    public string? hjemmeside { get; set; }

    /// <summary>
    /// Business address details.
    /// </summary>
    [JsonPropertyName("forretningsadresse")]
    public ExternalAddress? forretningsadresse { get; set; }

    /// <summary>
    /// Date of establishment.
    /// </summary>
    [JsonPropertyName("stiftelsesdato")]
    public string? stiftelsesdato { get; set; }

    /// <summary>
    /// Indicates if company is registered in VAT register.
    /// </summary>
    [JsonPropertyName("registrertIMvaregisteret")]
    public bool registrertIMvaregisteret { get; set; }

    /// <summary>
    /// Indicates if company is bankrupt.
    /// </summary>
    [JsonPropertyName("konkurs")]
    public bool konkurs { get; set; }

    /// <summary>
    /// Indicates if company is under liquidation.
    /// </summary>
    [JsonPropertyName("underAvvikling")]
    public bool underAvvikling { get; set; }

    /// <summary>
    /// Indicates if company is under compulsory liquidation or dissolution.
    /// </summary>
    [JsonPropertyName("underTvangsavviklingEllerTvangsopplosning")]
    public bool underTvangsavviklingEllerTvangsopplosning { get; set; }
}

/// <summary>
/// Organization form details (code and description).
/// </summary>
public class ExternalOrganizationForm
{
    /// <summary>
    /// Organization form code (e.g., "AS", "NSF").
    /// </summary>
    [JsonPropertyName("kode")]
    public string? kode { get; set; }

    /// <summary>
    /// Organization form description.
    /// </summary>
    [JsonPropertyName("beskrivelse")]
    public string? beskrivelse { get; set; }
}

/// <summary>
/// Address details from the Norwegian Business Register API.
/// </summary>
public class ExternalAddress
{
    /// <summary>
    /// Country name.
    /// </summary>
    [JsonPropertyName("land")]
    public string? land { get; set; }

    /// <summary>
    /// Country code (e.g., "NO").
    /// </summary>
    [JsonPropertyName("landkode")]
    public string? landkode { get; set; }

    /// <summary>
    /// Postal code.
    /// </summary>
    [JsonPropertyName("postnummer")]
    public string? postnummer { get; set; }

    /// <summary>
    /// City/postal location name.
    /// </summary>
    [JsonPropertyName("poststed")]
    public string? poststed { get; set; }

    /// <summary>
    /// Street address lines.
    /// </summary>
    [JsonPropertyName("adresse")]
    public List<string>? adresse { get; set; }

    /// <summary>
    /// Municipality name.
    /// </summary>
    [JsonPropertyName("kommune")]
    public string? kommune { get; set; }

    /// <summary>
    /// Municipality number.
    /// </summary>
    [JsonPropertyName("kommunenummer")]
    public string? kommunenummer { get; set; }
}

/// <summary>
/// Pagination metadata from the Business Register API response.
/// </summary>
public class Page
{
    /// <summary>
    /// Number of items per page.
    /// </summary>
    public int size { get; set; }

    /// <summary>
    /// Total number of items matching the search criteria.
    /// </summary>
    public int totalElements { get; set; }

    /// <summary>
    /// Total number of pages.
    /// </summary>
    public int totalPages { get; set; }

    /// <summary>
    /// Current page number (0-based).
    /// </summary>
    public int number { get; set; }
}