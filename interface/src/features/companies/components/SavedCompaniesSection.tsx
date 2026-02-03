export function SavedCompaniesSection() {
  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Mine kunder</h2>
      
      <div className="space-y-3">
        {/* Company items */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 flex justify-between items-center">
          <span className="font-medium">Firmanavn 1</span>
          <button className="text-gray-400 hover:text-gray-600">⊕</button>
        </div>
        
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 flex justify-between items-center">
          <span className="font-medium">Firmanavn 2</span>
          <button className="text-gray-400 hover:text-gray-600">⊕</button>
        </div>
        
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 flex justify-between items-center">
          <span className="font-medium">Firmanavn 3</span>
          <button className="text-gray-400 hover:text-gray-600">⊕</button>
        </div>
      </div>
    </div>
  );
}
