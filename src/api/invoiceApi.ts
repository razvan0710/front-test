import apiClient from './apiClient'
import { Invoice } from '../types/invoice'
import { handleApiError } from './errorHandler'

export interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export interface InvoicesResponse {
    items: Invoice[]
    total: number
  }
  export interface FetchInvoicesParams {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: 'vendor_name' | 'amount' | 'due_date' | 'paid'; // Keep frontend definition
    order?: 'asc' | 'desc';
  }

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', { email, password })
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

export const fetchInvoices = async (
    params: FetchInvoicesParams = {},
  ): Promise<InvoicesResponse> => {
    console.log('params TRIMISE:', params); 
    try {
      // Clean up parameters - remove undefined/empty values
      const cleanedParams = Object.fromEntries(
        Object.entries(params)
          .filter(([_, value]) => value !== undefined && value !== '')
      );
      
      const response = await apiClient.get<InvoicesResponse>('/invoices', {
        params: cleanedParams,
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

// just in case that we want to 
export const fetchInvoiceDetails = async (id: string): Promise<Invoice> => {
  try {
    const response = await apiClient.get<Invoice>(`/invoices/${id}`)
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}