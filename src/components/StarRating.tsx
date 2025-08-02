import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  readonly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  onRatingChange, 
  size = 20, 
  readonly = false 
}) => {
  const handleStarClick = (starValue: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starValue);
    }
  };

  const handleStarHover = (starValue: number) => {
    if (!readonly) {
      // Optional: Add hover effects here
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={star <= rating ? '#FFD700' : 'none'}
          stroke={star <= rating ? '#FFD700' : '#ccc'}
          style={{
            cursor: readonly ? 'default' : 'pointer',
            transition: 'all 0.2s ease',
          }}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
        />
      ))}
    </div>
  );
};

export default StarRating; 