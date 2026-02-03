export function CompanySearchSection() {
  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Legg til ny kunde</h2>
      
      {/* Search input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Søk etter firma..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Search results */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 min-h-80">
          <h3 className="font-bold text-gray-700 mb-4">Søkeresultater fra Brønnøysund</h3>
          {/* Results will go here */}
        </div>

        {/* Right: Notes */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 min-h-80">
          <h3 className="font-bold text-gray-700 mb-2">Firmanavn 1</h3>
          <p className="text-sm text-gray-600 mb-4">Notat</p>
          <textarea
            placeholder="Legg til notat om kunden her..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
            rows={5}
          />
          <div className="flex gap-3 justify-end">
            <button className="px-6 py-2 text-black border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
              Avbryt
            </button>
            <button className="px-6 py-2 bg-blue-600 text-black rounded-lg font-medium hover:bg-blue-700">
              Lagre og legg til
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
