'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { Video } from '@/lib/videoData';

interface FavoritesContextType {
  favorites: string[];
  isLoading: boolean;
  addToFavorites: (videoId: string) => void;
  removeFromFavorites: (videoId: string) => void;
  toggleFavorite: (videoId: string) => void;
  isFavorite: (videoId: string) => boolean;
  getFavoriteVideos: (allVideos: Video[]) => Video[];
  clearAllFavorites: () => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const favoritesHook = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesHook}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};