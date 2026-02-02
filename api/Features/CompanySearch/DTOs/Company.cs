namespace api.Features.CompanySearch.DTOs;

/// <summary>
/// Represents a company returned by our API (internal naming in English).
/// </summary>
public class Company
{
    /// <summary>
    /// The organization's registration number.
    /// </summary>
    public string? organizationNumber { get; set; }

    /// <summary>
    /// The name of the organization.
    /// </summary>
    public string? name { get; set; }

    /// <summary>
    /// The organizational form of the company.
    /// </summary>
    public OrganizationForm? organizationForm { get; set; }

    /// <summary>
    /// The website of the organization.
    /// </summary>
    public string? website { get; set; }

    /// <summary>
    /// The business address of the organization.
    /// </summary>
    public Address? businessAddress { get; set; }

    /// <summary>
    /// The establishment date of the organization.
    /// </summary>
    public string? establishmentDate { get; set; }

    /// <summary>
    /// Whether the organization is registered in the value-added tax register.
    /// </summary>
    public bool registeredInVatRegister { get; set; }

    /// <summary>
    /// Whether the organization is bankrupt.
    /// </summary>
    public bool bankrupt { get; set; }

    /// <summary>
    /// Whether the organization is under liquidation.
    /// </summary>
    public bool underLiquidation { get; set; }

    /// <summary>
    /// Whether the organization is under compulsory liquidation or dissolution.
    /// </summary>
    public bool underCompulsoryLiquidationOrDissolution { get; set; }
}

/// <summary>
/// Represents the organizational form of a company.
/// </summary>
public class OrganizationForm
{
    /// <summary>
    /// The code of the organizational form.
    /// </summary>
    public string? code { get; set; }

    /// <summary>
    /// The description of the organizational form.
    /// </summary>
    public string? description { get; set; }
}

/// <summary>
/// Represents an address.
/// </summary>
public class Address
{
    /// <summary>
    /// The country of the address.
    /// </summary>
    public string? country { get; set; }

    /// <summary>
    /// The country code of the address.
    /// </summary>
    public string? countryCode { get; set; }

    /// <summary>
    /// The postal code of the address.
    /// </summary>
    public string? postalCode { get; set; }

    /// <summary>
    /// The city of the address.
    /// </summary>
    public string? city { get; set; }

    /// <summary>
    /// The address lines.
    /// </summary>
    public List<string>? addressLines { get; set; }

    /// <summary>
    /// The municipality of the address.
    /// </summary>
    public string? municipality { get; set; }

    /// <summary>
    /// The municipality number of the address.
    /// </summary>
    public string? municipalityNumber { get; set; }
}