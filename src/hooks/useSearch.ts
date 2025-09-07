'use client';

import { useState, useEffect, useMemo } from 'react';
import { getAllVideos } from '@/lib/videoData';
import { SearchFilters, searchVideos, debounce } from '@/lib/searchUtils';

export const useSearch = (initialFilters?: Partial<SearchFilters>) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    tags: [],
    sortBy: 'date',
    sortOrder: 'desc',
    minRating: undefined,
    maxDuration: undefined,
    ...initialFilters
  });

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.query || '');

  const allVideos = useMemo(() => getAllVideos(), []);

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      setFilters(prev => ({ ...prev, query }));
      setIsSearching(false);
    }, 300),
    []
  );

  // Handle search query changes
  useEffect(() => {
    if (searchQuery !== filters.query) {
      setIsSearching(true);
      debouncedSearch(searchQuery);
    }
  }, [searchQuery, debouncedSearch, filters.query]);

  // Perform the actual search
  const searchResults = useMemo(() => {
    return searchVideos(allVideos, filters);
  }, [allVideos, filters]);

  const updateFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      query: '',
      category: 'all',
      tags: [],
      sortBy: 'date',
      sortOrder: 'desc',
      minRating: undefined,
      maxDuration: undefined
    });
    setSearchQuery('');
  };

  const addTag = (tag: string) => {
    if (!filters.tags?.includes(tag)) {
      setFilters(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag]
      }));
    }
  };

  const removeTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };

  const toggleTag = (tag: string) => {
    if (filters.tags?.includes(tag)) {
      removeTag(tag);
    } else {
      addTag(tag);
    }
  };

  const hasActiveFilters = useMemo(() => {
    return (
      (filters.query && filters.query.length > 0) ||
      (filters.category && filters.category !== 'all') ||
      (filters.tags && filters.tags.length > 0) ||
      filters.minRating !== undefined ||
      filters.maxDuration !== undefined
    );
  }, [filters]);

  return {
    // Current state
    filters,
    searchResults,
    isSearching,
    searchQuery,
    hasActiveFilters,
    resultCount: searchResults.length,
    
    // Search input
    setSearchQuery,
    
    // Filter management
    updateFilter,
    updateFilters,
    resetFilters,
    
    // Tag management
    addTag,
    removeTag,
    toggleTag,
    
    // Utility
    allVideos
  };
};