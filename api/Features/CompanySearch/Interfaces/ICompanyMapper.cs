using api.Features.CompanySearch.DTOs;

namespace api.Features.CompanySearch.Interfaces;

public interface ICompanyMapper
{
    Company Map(ExternalCompany external);
}