import React from 'react';
import { Trash2, Edit, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { CoffeeReview } from '../types';
import StarRating from './StarRating';

interface ReviewCardProps {
  review: CoffeeReview;
  onDelete: (id: string) => void;
  onEdit: (review: CoffeeReview) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onDelete, onEdit }) => {
  // Use the stored general score or calculate it if not available (for backward compatibility)
  const generalScore = review.generalScore || 
    (review.aroma + review.acidity + review.body + review.sweetness + review.aftertaste + review.balance) / 6;

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return '#28a745';
    if (rating >= 4) return '#17a2b8';
    if (rating >= 3.5) return '#ffc107';
    if (rating >= 3) return '#fd7e14';
    return '#dc3545';
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div>
          <h3 className="review-title">{review.beanName}</h3>
          <div className="review-meta">
            <div>Origin: {review.origin}</div>
            <div>Roaster: {review.roaster}</div>
            <div>Roast Level: {review.roastLevel}</div>
            <div>Brewing Method: {review.brewingMethod}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Calendar size={14} />
              {format(new Date(review.createdAt), 'MMM dd, yyyy')}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => onEdit(review)}
            className="btn btn-secondary"
            style={{ padding: '8px', fontSize: '0.8rem' }}
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => onDelete(review.id)}
            className="btn btn-secondary"
            style={{ padding: '8px', fontSize: '0.8rem', background: 'linear-gradient(135deg, #dc3545, #c82333)' }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {review.imageUrl && (
        <img 
          src={review.imageUrl} 
          alt={`${review.beanName} coffee`} 
          className="image-preview"
          style={{ marginBottom: '1rem' }}
        />
      )}

      <div className="review-ratings">
        <div className="rating-item">
          <span className="rating-label">Aroma</span>
          <StarRating rating={review.aroma} readonly size={16} />
        </div>
        <div className="rating-item">
          <span className="rating-label">Acidity</span>
          <StarRating rating={review.acidity} readonly size={16} />
        </div>
        <div className="rating-item">
          <span className="rating-label">Body</span>
          <StarRating rating={review.body} readonly size={16} />
        </div>
        <div className="rating-item">
          <span className="rating-label">Sweetness</span>
          <StarRating rating={review.sweetness} readonly size={16} />
        </div>
        <div className="rating-item">
          <span className="rating-label">Aftertaste</span>
          <StarRating rating={review.aftertaste} readonly size={16} />
        </div>
        <div className="rating-item">
          <span className="rating-label">Balance</span>
          <StarRating rating={review.balance} readonly size={16} />
        </div>
      </div>

      <div style={{ 
        textAlign: 'center', 
        margin: '1rem 0', 
        padding: '1rem', 
        background: '#f8f9fa', 
        borderRadius: '10px',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{ fontWeight: 'bold', color: '#8B4513', marginBottom: '0.5rem' }}>
          General Score
        </div>
        <StarRating rating={generalScore} readonly size={24} />
        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
          {generalScore.toFixed(1)} / 5
        </div>
      </div>

      {review.overallComment && (
        <div className="review-comment">
          "{review.overallComment}"
        </div>
      )}
    </div>
  );
};

export default ReviewCard; 