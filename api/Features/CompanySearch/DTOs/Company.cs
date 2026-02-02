namespace api.Features.CompanySearch.DTOs;

/// <summary>
/// Represents a company returned by our API.
/// </summary>
public class Company
{
    /// <summary>
    /// The organization's registration number.
    /// </summary>
    public string? OrganizationNumber { get; set; }

    /// <summary>
    /// The name of the organization.
    /// </summary>
    public string? Name { get; set; }

    /// <summary>
    /// The organizational form of the company.
    /// </summary>
    public OrganizationForm? OrganizationForm { get; set; }

    /// <summary>
    /// The website of the organization.
    /// </summary>
    public string? Website { get; set; }

    /// <summary>
    /// The business address of the organization.
    /// </summary>
    public Address? BusinessAddress { get; set; }

    /// <summary>
    /// The establishment date of the organization.
    /// </summary>
    public string? EstablishmentDate { get; set; }

    /// <summary>
    /// Whether the organization is registered in the value-added tax register.
    /// </summary>
    public bool RegisteredInVatRegister { get; set; }

    /// <summary>
    /// Whether the organization is bankrupt.
    /// </summary>
    public bool Bankrupt { get; set; }

    /// <summary>
    /// Whether the organization is under liquidation.
    /// </summary>
    public bool UnderLiquidation { get; set; }

    /// <summary>
    /// Whether the organization is under compulsory liquidation or dissolution.
    /// </summary>
    public bool UnderCompulsoryLiquidationOrDissolution { get; set; }
}

/// <summary>
/// Represents the organizational form of a company.
/// </summary>
public class OrganizationForm
{
    /// <summary>
    /// The code of the organizational form.
    /// </summary>
    public string? Code { get; set; }

    /// <summary>
    /// The description of the organizational form.
    /// </summary>
    public string? Description { get; set; }
}

/// <summary>
/// Represents an address.
/// </summary>
public class Address
{
    /// <summary>
    /// The country of the address.
    /// </summary>
    public string? Country { get; set; }

    /// <summary>
    /// The country code of the address.
    /// </summary>
    public string? CountryCode { get; set; }

    /// <summary>
    /// The postal code of the address.
    /// </summary>
    public string? PostalCode { get; set; }

    /// <summary>
    /// The city of the address.
    /// </summary>
    public string? City { get; set; }

    /// <summary>
    /// The address lines.
    /// </summary>
    public List<string>? AddressLines { get; set; }

    /// <summary>
    /// The municipality of the address.
    /// </summary>
    public string? Municipality { get; set; }

    /// <summary>
    /// The municipality number of the address.
    /// </summary>
    public string? MunicipalityNumber { get; set; }
}