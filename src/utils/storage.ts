import { CoffeeReview } from '../types';

const STORAGE_KEY = 'coffee-reviews';

export const saveReviews = (reviews: CoffeeReview[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch (error) {
    console.error('Error saving reviews to localStorage:', error);
  }
};

export const loadReviews = (): CoffeeReview[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading reviews from localStorage:', error);
    return [];
  }
};

export const addReview = (review: CoffeeReview): void => {
  const reviews = loadReviews();
  reviews.unshift(review); // Add to beginning of array
  saveReviews(reviews);
};

export const deleteReview = (id: string): void => {
  const reviews = loadReviews();
  const filteredReviews = reviews.filter(review => review.id !== id);
  saveReviews(filteredReviews);
};

export const updateReview = (updatedReview: CoffeeReview): void => {
  const reviews = loadReviews();
  const index = reviews.findIndex(review => review.id === updatedReview.id);
  if (index !== -1) {
    reviews[index] = updatedReview;
    saveReviews(reviews);
  }
}; 