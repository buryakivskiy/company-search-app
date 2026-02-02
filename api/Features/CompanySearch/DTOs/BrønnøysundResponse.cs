namespace api.Features.CompanySearch.DTOs;

public class BrønnøysundResponse
{
    public Embedded? _embedded { get; set; }
    public Page? page { get; set; }
}

public class Embedded
{
    public IEnumerable<Company>? enheter { get; set; }
}

public class Page
{
    public int size { get; set; }
    public int totalElements { get; set; }
    public int totalPages { get; set; }
    public int number { get; set; }
}