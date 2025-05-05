import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchInvoices } from '../api/invoiceApi'
import { InvoiceModal } from '../components/InvoiceModal'
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Invoice } from '../types/invoice'
import { useEffect } from 'react'

export const InvoiceTable = () => {
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState(search)
    const [isSearching, setIsSearching] = useState(false)
    const [page, setPage] = useState(1)
    const pageSize = 10
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
    const [sortBy, setSortBy] = useState<'vendor_name' | 'amount' | 'due_date' | 'paid'>('vendor_name')
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')

    // Debounce effect
    useEffect(() => {
        setIsSearching(true)
        const handler = setTimeout(() => {
            setDebouncedSearch(search)
            setIsSearching(false)
        }, 300) 

        return () => {
            clearTimeout(handler)
            setIsSearching(false)
        }
    }, [search])

    const toggleSort = (col: typeof sortBy) => {
        if (sortBy === col) {
            setOrder(order === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(col)
            setOrder('asc')
        }
        setPage(1) 
    }

    const { data } = useQuery({
        queryKey: ['invoices', { page, pageSize, search: debouncedSearch, sortBy, order }],
        queryFn: () => fetchInvoices({ page, pageSize, search: debouncedSearch, sortBy, order }),
    })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="search"
                        placeholder="Search invoices..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPage(1) }}
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {isSearching && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    )}
                </div>
            </div>


            {/* TABLE CONTAINER */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {[
                                    { label: 'Vendor', field: 'vendor_name' },
                                    { label: 'Description', field: 'description' },
                                    { label: 'Due Date', field: 'due_date' },
                                    { label: 'Amount', field: 'amount' },
                                    { label: 'Status', field: 'paid' },
                                ].map(({ label, field }) => (
                                    <th
                                        key={field}
                                        onClick={() => field !== 'description' && toggleSort(field as any)}
                                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                                            ${field !== 'description' ? 'cursor-pointer select-none hover:bg-gray-100' : ''}`}
                                    >
                                        <div className="flex items-center">
                                            {label}
                                            {sortBy === field && (
                                                order === 'asc' ? (
                                                    <ChevronUpIcon className="w-4 h-4 ml-1" />
                                                ) : (
                                                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                                                )
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data?.items.map(inv => (
                                <tr 
                                    key={inv.id} 
                                    onClick={() => setSelectedInvoice(inv)}
                                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {inv.vendor_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {inv.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(inv.due_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                        ${inv.amount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            inv.paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {inv.paid ? 'Paid' : 'Pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between items-center sm:hidden">
                        <button 
                            disabled={page === 1} 
                            onClick={() => setPage(p => p - 1)}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-700">
                            Page <span className="font-medium">{page}</span>
                        </span>
                        <button 
                            disabled={page * pageSize >= (data?.total ?? 0)} 
                            onClick={() => setPage(p => p + 1)}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{((page - 1) * pageSize) + 1}</span> to{' '}
                                <span className="font-medium">{Math.min(page * pageSize, data?.total || 0)}</span> of{' '}
                                <span className="font-medium">{data?.total || 0}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(p => p - 1)}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Previous</span>
                                    <ChevronUpIcon className="h-5 w-5 transform rotate-90" aria-hidden="true" />
                                </button>
                                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                    {page}
                                </span>
                                <button
                                    disabled={page * pageSize >= (data?.total ?? 0)}
                                    onClick={() => setPage(p => p + 1)}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Next</span>
                                    <ChevronDownIcon className="h-5 w-5 transform rotate-90" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <InvoiceModal 
                invoice={selectedInvoice} 
                onClose={() => setSelectedInvoice(null)} 
            />
        </div>
    )
}