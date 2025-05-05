import { Invoice } from '../types/invoice'

export type ModalState = {
  selectedInvoice: Invoice | null
  isOpen: boolean
}