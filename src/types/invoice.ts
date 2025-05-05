export interface User {
    id: string
    email: string
    name: string
  }
  
  export interface Invoice {
    id: number
    vendor_name: string
    amount: number
    due_date: string
    paid: boolean
    user_id: number
    description?: string
  }