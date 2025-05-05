import {InvoiceTable} from '../components/InvoiceTable'
import { useAuth } from '../hooks/useAuth'

export default function Invoices() {
    useAuth()
    
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Invoice Management</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <InvoiceTable />
        </div>
      </div>
    )
  }