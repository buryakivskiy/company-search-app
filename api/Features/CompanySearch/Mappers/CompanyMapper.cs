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
            organizationNumber = ec.organisasjonsnummer,
            name = ec.navn,
            organizationForm = ec.organisasjonsform == null ? null : new OrganizationForm
            {
                code = ec.organisasjonsform.kode,
                description = ec.organisasjonsform.beskrivelse
            },
            website = ec.hjemmeside,
            businessAddress = ec.forretningsadresse == null ? null : new Address
            {
                country = ec.forretningsadresse.land,
                countryCode = ec.forretningsadresse.landkode,
                postalCode = ec.forretningsadresse.postnummer,
                city = ec.forretningsadresse.poststed,
                addressLines = ec.forretningsadresse.adresse,
                municipality = ec.forretningsadresse.kommune,
                municipalityNumber = ec.forretningsadresse.kommunenummer
            },
            establishmentDate = ec.stiftelsesdato,
            registeredInVatRegister = ec.registrertIMvaregisteret,
            bankrupt = ec.konkurs,
            underLiquidation = ec.underAvvikling,
            underCompulsoryLiquidationOrDissolution = ec.underTvangsavviklingEllerTvangsopplosning
        };
    }
}