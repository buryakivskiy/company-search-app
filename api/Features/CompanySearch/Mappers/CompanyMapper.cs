using api.Features.CompanySearch.DTOs;
using api.Features.CompanySearch.Interfaces;

namespace api.Features.CompanySearch.Mappers;

public class CompanyMapper : ICompanyMapper
{
    public Company Map(ExternalCompany ec)
    {
        if (ec == null) return new Company();

        return new Company
        {
            OrganizationNumber = ec.organisasjonsnummer,
            Name = ec.navn,
            OrganizationForm = ec.organisasjonsform == null ? null : new OrganizationForm
            {
                Code = ec.organisasjonsform.kode,
                Description = ec.organisasjonsform.beskrivelse
            },
            Website = ec.hjemmeside,
            BusinessAddress = ec.forretningsadresse == null ? null : new Address
            {
                Country = ec.forretningsadresse.land,
                CountryCode = ec.forretningsadresse.landkode,
                PostalCode = ec.forretningsadresse.postnummer,
                City = ec.forretningsadresse.poststed,
                AddressLines = ec.forretningsadresse.adresse,
                Municipality = ec.forretningsadresse.kommune,
                MunicipalityNumber = ec.forretningsadresse.kommunenummer
            },
            EstablishmentDate = ec.stiftelsesdato,
            RegisteredInVatRegister = ec.registrertIMvaregisteret,
            Bankrupt = ec.konkurs,
            UnderLiquidation = ec.underAvvikling,
            UnderCompulsoryLiquidationOrDissolution = ec.underTvangsavviklingEllerTvangsopplosning
        };
    }
}