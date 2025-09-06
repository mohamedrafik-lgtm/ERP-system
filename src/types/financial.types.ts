// Interface Segregation Principle - تقسيم interfaces كبيرة
export interface IAccount {
  id: number;
  name: string;
  code: string;
  debit: number;
  credit: number;
  type: string;
  parentId: number | null;
  balance: number;
  hasChildren?: boolean;
}

export interface IAccountFilter {
  searchTerm: string;
  type: 'all' | 'credit' | 'debit';
  level: 'all' | 'main' | 'child';
  hasBalance: 'all' | 'yes' | 'no';
}

export interface IAccountTreeManager {
  getFilteredAccounts(accounts: IAccount[], filters: IAccountFilter): IAccount[];
  toggleAccount(accountId: number): void;
  hideSiblings(accountId: number): void;
  isAccountOpen(accountId: number): boolean;
  isSiblingHidden(accountId: number): boolean;
}

export interface IAccountRenderer {
  renderAccount(account: IAccount, level: number): React.ReactNode;
  renderAccountActions(account: IAccount): React.ReactNode;
}

export interface IAccountFilterStrategy {
  filter(accounts: IAccount[], filter: IAccountFilter): IAccount[];
}

export interface IAccountSearchStrategy {
  search(accounts: IAccount[], searchTerm: string): IAccount[];
}

export interface IAccountBalanceStrategy {
  filterByBalance(accounts: IAccount[], hasBalance: 'all' | 'yes' | 'no'): IAccount[];
}

export interface IAccountTypeStrategy {
  filterByType(accounts: IAccount[], type: 'all' | 'credit' | 'debit'): IAccount[];
}

export interface IAccountLevelStrategy {
  filterByLevel(accounts: IAccount[], level: 'all' | 'main' | 'child'): IAccount[];
}
