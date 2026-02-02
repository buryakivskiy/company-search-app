namespace api.Features.CompanySearch.DTOs;

/// <summary>
/// Represents a company from the Norwegian Business Register.
/// </summary>
public class Company
{
    /// <summary>
    /// The organization's registration number.
    /// </summary>
    public string? organisasjonsnummer { get; set; }

    /// <summary>
    /// The name of the organization.
    /// </summary>
    public string? navn { get; set; }

    /// <summary>
    /// The organizational form of the company.
    /// </summary>
    public Organisasjonsform? organisasjonsform { get; set; }

    /// <summary>
    /// The website of the organization.
    /// </summary>
    public string? hjemmeside { get; set; }

    /// <summary>
    /// The business address of the organization.
    /// </summary>
    public Adresse? forretningsadresse { get; set; }

    /// <summary>
    /// The establishment date of the organization.
    /// </summary>
    public string? stiftelsesdato { get; set; }

    /// <summary>
    /// Whether the organization is registered in the value-added tax register.
    /// </summary>
    public bool registrertIMvaregisteret { get; set; }

    /// <summary>
    /// Whether the organization is bankrupt.
    /// </summary>
    public bool konkurs { get; set; }

    /// <summary>
    /// Whether the organization is under liquidation.
    /// </summary>
    public bool underAvvikling { get; set; }

    /// <summary>
    /// Whether the organization is under compulsory liquidation or dissolution.
    /// </summary>
    public bool underTvangsavviklingEllerTvangsopplosning { get; set; }
}

/// <summary>
/// Represents the organizational form of a company.
/// </summary>
public class Organisasjonsform
{
    /// <summary>
    /// The code of the organizational form.
    /// </summary>
    public string? kode { get; set; }

    /// <summary>
    /// The description of the organizational form.
    /// </summary>
    public string? beskrivelse { get; set; }
}

/// <summary>
/// Represents an address.
/// </summary>
public class Adresse
{
    /// <summary>
    /// The country of the address.
    /// </summary>
    public string? land { get; set; }

    /// <summary>
    /// The country code of the address.
    /// </summary>
    public string? landkode { get; set; }

    /// <summary>
    /// The postal code of the address.
    /// </summary>
    public string? postnummer { get; set; }

    /// <summary>
    /// The city of the address.
    /// </summary>
    public string? poststed { get; set; }

    /// <summary>
    /// The address lines.
    /// </summary>
    public List<string>? adresse { get; set; }

    /// <summary>
    /// The municipality of the address.
    /// </summary>
    public string? kommune { get; set; }

    /// <summary>
    /// The municipality number of the address.
    /// </summary>
    public string? kommunenummer { get; set; }
}