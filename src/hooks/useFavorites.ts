'use client';

import { useState, useEffect } from 'react';
import { Video } from '@/lib/videoData';

const FAVORITES_KEY = 'video-aggregator-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const saveFavorites = (newFavorites: string[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addToFavorites = (videoId: string) => {
    const newFavorites = [...favorites, videoId];
    saveFavorites(newFavorites);
  };

  const removeFromFavorites = (videoId: string) => {
    const newFavorites = favorites.filter(id => id !== videoId);
    saveFavorites(newFavorites);
  };

  const toggleFavorite = (videoId: string) => {
    if (isFavorite(videoId)) {
      removeFromFavorites(videoId);
    } else {
      addToFavorites(videoId);
    }
  };

  const isFavorite = (videoId: string): boolean => {
    return favorites.includes(videoId);
  };

  const getFavoriteVideos = (allVideos: Video[]): Video[] => {
    return allVideos.filter(video => favorites.includes(video.id));
  };

  const clearAllFavorites = () => {
    saveFavorites([]);
  };

  return {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoriteVideos,
    clearAllFavorites,
    favoritesCount: favorites.length
  };
};