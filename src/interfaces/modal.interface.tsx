export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  onSubmit: () => void;
  submitText: string;
}

export enum ModalEnum {
  CreateMap = "createMap",
  AddPlayer = "addPlayer",
}
