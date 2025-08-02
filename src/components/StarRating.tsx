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

  const handleStarHover = (_starValue: number) => {
    if (!readonly) {
      // Optional: Add hover effects here
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFullyFilled = star <= Math.floor(rating);
        const isPartiallyFilled = star === Math.ceil(rating) && rating % 1 !== 0;
        const partialFillPercentage = isPartiallyFilled ? (rating % 1) * 100 : 0;

        return (
          <div key={star} style={{ position: 'relative', display: 'inline-block' }}>
            {/* Background star (gray outline) */}
            <Star
              size={size}
              fill="none"
              stroke="#ccc"
              style={{
                cursor: readonly ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
            />
            
            {/* Foreground star (filled) */}
            {(isFullyFilled || isPartiallyFilled) && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${size}px`,
                  height: `${size}px`,
                  overflow: 'hidden',
                  cursor: readonly ? 'default' : 'pointer',
                }}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
              >
                <div
                  style={{
                    width: isPartiallyFilled ? `${partialFillPercentage}%` : '100%',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <Star
                    size={size}
                    fill="#FFD700"
                    stroke="#FFD700"
                    style={{
                      transition: 'all 0.2s ease',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating; 