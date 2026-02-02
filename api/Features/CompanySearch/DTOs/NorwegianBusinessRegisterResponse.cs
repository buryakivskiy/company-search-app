using System.Text.Json.Serialization;

namespace api.Features.CompanySearch.DTOs;

public class NorwegianBusinessRegisterResponse
{
    [JsonPropertyName("_embedded")]
    public Embedded? embedded { get; set; }
    public Page? page { get; set; }
}

public class Embedded
{
    [JsonPropertyName("enheter")]
    public IEnumerable<ExternalCompany>? companies { get; set; }
}

// External DTOs (mirror external API JSON names)
public class ExternalCompany
{
    [JsonPropertyName("organisasjonsnummer")]
    public string? organisasjonsnummer { get; set; }

    [JsonPropertyName("navn")]
    public string? navn { get; set; }

    [JsonPropertyName("organisasjonsform")]
    public ExternalOrganizationForm? organisasjonsform { get; set; }

    [JsonPropertyName("hjemmeside")]
    public string? hjemmeside { get; set; }

    [JsonPropertyName("forretningsadresse")]
    public ExternalAddress? forretningsadresse { get; set; }

    [JsonPropertyName("stiftelsesdato")]
    public string? stiftelsesdato { get; set; }

    [JsonPropertyName("registrertIMvaregisteret")]
    public bool registrertIMvaregisteret { get; set; }

    [JsonPropertyName("konkurs")]
    public bool konkurs { get; set; }

    [JsonPropertyName("underAvvikling")]
    public bool underAvvikling { get; set; }

    [JsonPropertyName("underTvangsavviklingEllerTvangsopplosning")]
    public bool underTvangsavviklingEllerTvangsopplosning { get; set; }
}

public class ExternalOrganizationForm
{
    [JsonPropertyName("kode")]
    public string? kode { get; set; }

    [JsonPropertyName("beskrivelse")]
    public string? beskrivelse { get; set; }
}

public class ExternalAddress
{
    [JsonPropertyName("land")]
    public string? land { get; set; }

    [JsonPropertyName("landkode")]
    public string? landkode { get; set; }

    [JsonPropertyName("postnummer")]
    public string? postnummer { get; set; }

    [JsonPropertyName("poststed")]
    public string? poststed { get; set; }

    [JsonPropertyName("adresse")]
    public List<string>? adresse { get; set; }

    [JsonPropertyName("kommune")]
    public string? kommune { get; set; }

    [JsonPropertyName("kommunenummer")]
    public string? kommunenummer { get; set; }
}

public class Page
{
    public int size { get; set; }
    public int totalElements { get; set; }
    public int totalPages { get; set; }
    public int number { get; set; }
}