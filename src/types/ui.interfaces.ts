// Interface Segregation Principle - تقسيم interfaces كبيرة
import { ReactNode, HTMLAttributes } from "react";

// Basic UI Components
export interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  url: string;
  name: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

export interface IInputProps extends HTMLAttributes<HTMLInputElement> {
  type: string;
  className?: string;
  placeholder?: string;
  id?: string;
  error?: string;
  label?: string;
  required?: boolean;
}

export interface ISelectProps extends HTMLAttributes<HTMLSelectElement> {
  options: { value: string | number; label: string }[];
  placeholder?: string;
  error?: string;
  label?: string;
  required?: boolean;
  multiple?: boolean;
}

export interface ITextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  required?: boolean;
  rows?: number;
  cols?: number;
}

// Form Components
export interface IFormFieldProps {
  label: string;
  error?: string;
  className?: string;
  required?: boolean;
  children: ReactNode;
}

export interface IFormProps {
  onSubmit: (data: any) => void;
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

// Modal/Dialog Components
export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closable?: boolean;
}

export interface IDialogProps extends IModalProps {
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// Table Components
export interface ITableColumn<T = any> {
  key: string;
  title: string;
  dataIndex: string;
  render?: (value: any, record: T, index: number) => ReactNode;
  sorter?: boolean;
  filterable?: boolean;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
}

export interface ITableProps<T = any> {
  columns: ITableColumn<T>[];
  data: T[];
  loading?: boolean;
  pagination?: IPaginationProps;
  onRowClick?: (record: T, index: number) => void;
  rowKey?: string | ((record: T) => string);
  className?: string;
}

// Pagination
export interface IPaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => ReactNode;
}

// Navigation
export interface INavItem {
  label: string;
  url?: string;
  icon: ReactNode;
  children?: INavItem[];
  active?: boolean;
}

export interface INavbarProps {
  items: INavItem[];
  logo?: ReactNode;
  user?: IUserInfo;
  onLogout?: () => void;
}

// User Interface
export interface IUserInfo {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

// Loading States
export interface ILoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  overlay?: boolean;
}

export interface ISkeletonProps {
  rows?: number;
  columns?: number;
  height?: string;
  width?: string;
}

// Notification/Toast
export interface INotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  closable?: boolean;
  onClose?: () => void;
}

// Filter Components
export interface IFilterProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
  value?: string;
  multiple?: boolean;
  searchable?: boolean;
}

// Card Components
export interface ICardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  hoverable?: boolean;
}

// Layout Components
export interface ILayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export interface ISidebarProps {
  items: INavItem[];
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}
