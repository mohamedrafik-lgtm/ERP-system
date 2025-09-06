import { AccountTreeManager } from '@/services/AccountTreeManager';
import { AccountFilterService } from '@/services/AccountFilterService';
import { IAccount, IAccountFilter } from '@/types/financial.types';

describe('AccountTreeManager', () => {
  let treeManager: AccountTreeManager;
  let mockAccounts: IAccount[];

  beforeEach(() => {
    treeManager = new AccountTreeManager();
    mockAccounts = [
      {
        id: 1,
        name: 'الأصول',
        code: '1000',
        debit: 100000,
        credit: 0,
        type: 'ASSET',
        parentId: null,
        balance: 100000,
        hasChildren: true,
      },
      {
        id: 2,
        name: 'الأصول الثابتة',
        code: '1100',
        debit: 50000,
        credit: 0,
        type: 'ASSET',
        parentId: 1,
        balance: 50000,
        hasChildren: false,
      },
      {
        id: 3,
        name: 'الخصوم',
        code: '2000',
        debit: 0,
        credit: 80000,
        type: 'LIABILITY',
        parentId: null,
        balance: -80000,
        hasChildren: true,
      },
    ];
  });

  describe('Account Management', () => {
    it('should toggle account open/close state', () => {
      expect(treeManager.isAccountOpen(1)).toBe(false);
      
      treeManager.toggleAccount(1);
      expect(treeManager.isAccountOpen(1)).toBe(true);
      
      treeManager.toggleAccount(1);
      expect(treeManager.isAccountOpen(1)).toBe(false);
    });

    it('should hide/show siblings', () => {
      expect(treeManager.isSiblingHidden(1)).toBe(false);
      
      treeManager.hideSiblings(1);
      expect(treeManager.isSiblingHidden(1)).toBe(true);
      
      treeManager.hideSiblings(1);
      expect(treeManager.isSiblingHidden(1)).toBe(false);
    });

    it('should get open accounts', () => {
      treeManager.toggleAccount(1);
      treeManager.toggleAccount(2);
      
      const openAccounts = treeManager.getOpenAccounts();
      expect(openAccounts).toEqual([1, 2]);
    });

    it('should get hidden siblings', () => {
      treeManager.hideSiblings(1);
      treeManager.hideSiblings(3);
      
      const hiddenSiblings = treeManager.getHiddenSiblings();
      expect(hiddenSiblings).toEqual([1, 3]);
    });

    it('should clear all states', () => {
      treeManager.toggleAccount(1);
      treeManager.hideSiblings(2);
      
      treeManager.clearAll();
      
      expect(treeManager.getOpenAccounts()).toEqual([]);
      expect(treeManager.getHiddenSiblings()).toEqual([]);
    });
  });

  describe('Tree Operations', () => {
    it('should expand all accounts with children', () => {
      treeManager.expandAll(mockAccounts);
      
      const openAccounts = treeManager.getOpenAccounts();
      expect(openAccounts).toContain(1); // Has children
      expect(openAccounts).toContain(3); // Has children
      expect(openAccounts).not.toContain(2); // No children
    });

    it('should collapse all accounts', () => {
      treeManager.toggleAccount(1);
      treeManager.toggleAccount(2);
      
      treeManager.collapseAll();
      
      expect(treeManager.getOpenAccounts()).toEqual([]);
    });

    it('should calculate account level correctly', () => {
      const level0 = treeManager.getAccountLevel(mockAccounts[0], mockAccounts);
      const level1 = treeManager.getAccountLevel(mockAccounts[1], mockAccounts);
      
      expect(level0).toBe(0); // Root account
      expect(level1).toBe(1); // Child account
    });

    it('should get account children', () => {
      const children = treeManager.getAccountChildren(1, mockAccounts);
      
      expect(children).toHaveLength(1);
      expect(children[0].id).toBe(2);
    });

    it('should get account path', () => {
      const path = treeManager.getAccountPath(2, mockAccounts);
      
      expect(path).toHaveLength(2);
      expect(path[0].id).toBe(1); // Parent
      expect(path[1].id).toBe(2); // Child
    });
  });

  describe('Filtering', () => {
    it('should filter accounts using filter service', () => {
      const filters: IAccountFilter = {
        searchTerm: 'أصول',
        type: 'all',
        level: 'all',
        hasBalance: 'all',
      };

      const filteredAccounts = treeManager.getFilteredAccounts(mockAccounts, filters);
      
      expect(filteredAccounts).toHaveLength(2); // Should find "الأصول" and "الأصول الثابتة"
      expect(filteredAccounts.every(acc => acc.name.includes('أصول'))).toBe(true);
    });

    it('should filter by type', () => {
      const filters: IAccountFilter = {
        searchTerm: '',
        type: 'credit',
        level: 'all',
        hasBalance: 'all',
      };

      const filteredAccounts = treeManager.getFilteredAccounts(mockAccounts, filters);
      
      expect(filteredAccounts).toHaveLength(1);
      expect(filteredAccounts[0].id).toBe(3); // Only liability account has credit
    });

    it('should filter by level', () => {
      const filters: IAccountFilter = {
        searchTerm: '',
        type: 'all',
        level: 'main',
        hasBalance: 'all',
      };

      const filteredAccounts = treeManager.getFilteredAccounts(mockAccounts, filters);
      
      expect(filteredAccounts).toHaveLength(2);
      expect(filteredAccounts.every(acc => acc.parentId === null)).toBe(true);
    });

    it('should filter by balance', () => {
      const filters: IAccountFilter = {
        searchTerm: '',
        type: 'all',
        level: 'all',
        hasBalance: 'yes',
      };

      const filteredAccounts = treeManager.getFilteredAccounts(mockAccounts, filters);
      
      expect(filteredAccounts).toHaveLength(2);
      expect(filteredAccounts.every(acc => acc.balance > 0)).toBe(true);
    });
  });

  describe('Dependency Injection', () => {
    it('should allow setting custom filter service', () => {
      const mockFilterService = {
        filter: jest.fn().mockReturnValue([])
      } as any;

      treeManager.setFilterService(mockFilterService);
      
      const filters: IAccountFilter = {
        searchTerm: 'test',
        type: 'all',
        level: 'all',
        hasBalance: 'all',
      };

      treeManager.getFilteredAccounts(mockAccounts, filters);
      
      expect(mockFilterService.filter).toHaveBeenCalledWith(mockAccounts, filters);
    });
  });
});
