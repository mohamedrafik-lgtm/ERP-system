"use client";

import { useState, useMemo } from 'react';
import { useGetDistributionsQuery } from '@/lip/features/distribution/distributionApi';
import { Distribution, DistributionType } from '../types';

export const useDistributionData = (searchTerm: string, typeFilter: DistributionType) => {
  const [expandedDistributions, setExpandedDistributions] = useState<Set<string>>(new Set());

  const { 
    data: distributions = [], 
    isLoading, 
    error, 
    refetch 
  } = useGetDistributionsQuery({
    search: searchTerm || undefined,
    type: typeFilter !== 'ALL' ? typeFilter : undefined,
  });

  const filteredDistributions = useMemo(() => {
    return distributions.filter(distribution => {
      const matchesSearch = distribution.program.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           distribution.program.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           distribution.academicYear.includes(searchTerm);
      const matchesType = typeFilter === 'ALL' || distribution.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [distributions, searchTerm, typeFilter]);

  const toggleDistribution = (distributionId: string) => {
    setExpandedDistributions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(distributionId)) {
        newSet.delete(distributionId);
      } else {
        newSet.add(distributionId);
      }
      return newSet;
    });
  };

  return {
    distributions: filteredDistributions,
    isLoading,
    error,
    refetch,
    expandedDistributions,
    toggleDistribution
  };
};
