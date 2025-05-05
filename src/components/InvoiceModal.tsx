import { Dialog } from '@headlessui/react'
import { Invoice } from '../types/invoice'

interface Props {
  invoice: Invoice | null
  onClose: () => void
}

export const InvoiceModal = ({ invoice, onClose }: Props) => {
    if (!invoice) return null
  
    return (
      <Dialog
        open={!!invoice}
        onClose={onClose}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          {/* <Dialog.Overlay className="fixed inset-0 bg-black/30" /> */}
          
          <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-auto shadow-xl">
            <h3 className="text-2xl font-bold mb-4 border-b pb-2">
              Invoice Details
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Payee:</span>
                <span>{invoice.vendor_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Amount:</span>
                <span>${invoice.amount.toFixed(2)}</span>
              </div>
              {/* <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{new Date(invoice.date).toLocaleDateString()}</span>
              </div> */}
              <div className="flex justify-between">
                <span className="font-medium">Due Date:</span>
                <span>{new Date(invoice.due_date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Description:</span>
                <span className="text-right">{invoice.description || 'No description'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className={`font-semibold ${
                  invoice.paid ? 'text-green-600' : 'text-red-600'
                }`}>
                  {invoice.paid ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>
  
            <button
              onClick={onClose}
              className="mt-6 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    )
  }