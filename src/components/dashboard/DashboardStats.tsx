export function DashboardStats() {
  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      <div className="bg-white p-4 rounded border">
        <p className="text-sm text-gray-600">Total Income</p>
        <p className="text-2xl font-bold">$0</p>
      </div>
      <div className="bg-white p-4 rounded border">
        <p className="text-sm text-gray-600">Total Expenses</p>
        <p className="text-2xl font-bold">$0</p>
      </div>
      <div className="bg-white p-4 rounded border">
        <p className="text-sm text-gray-600">Total Debts</p>
        <p className="text-2xl font-bold">$0</p>
      </div>
      <div className="bg-white p-4 rounded border">
        <p className="text-sm text-gray-600">Net Worth</p>
        <p className="text-2xl font-bold">$0</p>
      </div>
    </div>
  )
}
