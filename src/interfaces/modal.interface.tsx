export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
  submitText: string;
  showCancelButton?: boolean;
  cancelText?: string;
}
