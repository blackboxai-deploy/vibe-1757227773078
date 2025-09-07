import { Video } from './videoData';

export interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  sortBy?: 'date' | 'views' | 'rating' | 'title' | 'duration';
  sortOrder?: 'asc' | 'desc';
  minRating?: number;
  maxDuration?: number; // in minutes
}

export const searchVideos = (videos: Video[], filters: SearchFilters): Video[] => {
  let filteredVideos = [...videos];

  // Text search in title and description
  if (filters.query && filters.query.trim() !== '') {
    const query = filters.query.toLowerCase().trim();
    filteredVideos = filteredVideos.filter(video =>
      video.title.toLowerCase().includes(query) ||
      video.description.toLowerCase().includes(query) ||
      video.author.toLowerCase().includes(query) ||
      video.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Category filter
  if (filters.category && filters.category !== 'all') {
    filteredVideos = filteredVideos.filter(video => video.category === filters.category);
  }

  // Tags filter
  if (filters.tags && filters.tags.length > 0) {
    filteredVideos = filteredVideos.filter(video =>
      filters.tags!.some(filterTag => 
        video.tags.some(videoTag => videoTag.toLowerCase().includes(filterTag.toLowerCase()))
      )
    );
  }

  // Rating filter
  if (filters.minRating !== undefined) {
    filteredVideos = filteredVideos.filter(video => video.rating >= filters.minRating!);
  }

  // Duration filter (convert duration string to minutes)
  if (filters.maxDuration !== undefined) {
    filteredVideos = filteredVideos.filter(video => {
      const durationMinutes = parseDurationToMinutes(video.duration);
      return durationMinutes <= filters.maxDuration!;
    });
  }

  // Sorting
  if (filters.sortBy) {
    filteredVideos.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
          break;
        case 'views':
          comparison = a.views - b.views;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'duration':
          const aDuration = parseDurationToMinutes(a.duration);
          const bDuration = parseDurationToMinutes(b.duration);
          comparison = aDuration - bDuration;
          break;
        default:
          break;
      }
      
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  return filteredVideos;
};

export const parseDurationToMinutes = (duration: string): number => {
  const parts = duration.split(':').map(Number);
  if (parts.length === 3) {
    // Format: HH:MM:SS
    return parts[0] * 60 + parts[1] + parts[2] / 60;
  } else if (parts.length === 2) {
    // Format: MM:SS
    return parts[0] + parts[1] / 60;
  }
  return 0;
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  const secs = Math.floor((minutes % 1) * 60);
  
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
};

export const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  }
  return `${views} views`;
};

export const formatUploadDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
};

export const getRelatedVideos = (currentVideo: Video, allVideos: Video[], limit: number = 6): Video[] => {
  const related = allVideos
    .filter(video => video.id !== currentVideo.id)
    .map(video => ({
      video,
      score: calculateRelatedScore(currentVideo, video)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.video);
    
  return related;
};

const calculateRelatedScore = (video1: Video, video2: Video): number => {
  let score = 0;
  
  // Same category bonus
  if (video1.category === video2.category) {
    score += 3;
  }
  
  // Common tags bonus
  const commonTags = video1.tags.filter(tag => video2.tags.includes(tag));
  score += commonTags.length * 2;
  
  // Same author bonus
  if (video1.author === video2.author) {
    score += 1;
  }
  
  // Similar rating bonus
  const ratingDiff = Math.abs(video1.rating - video2.rating);
  if (ratingDiff < 0.5) {
    score += 1;
  }
  
  return score;
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};