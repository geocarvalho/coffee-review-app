import React, { useState } from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { CoffeeReview } from '../types';
import ReviewCard from './ReviewCard';

interface ReviewListProps {
  reviews: CoffeeReview[];
  onDelete: (id: string) => void;
  onEdit: (review: CoffeeReview) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'rating'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterRoaster, setFilterRoaster] = useState('');
  const [filterOrigin, setFilterOrigin] = useState('');

  // Get unique roasters and origins for filter dropdowns
  const roasters = [...new Set(reviews.map(r => r.roaster))].sort();
  const origins = [...new Set(reviews.map(r => r.origin))].sort();

  const filteredAndSortedReviews = reviews
    .filter(review => {
      const matchesSearch = 
        review.beanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.roaster.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.origin.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRoaster = !filterRoaster || review.roaster === filterRoaster;
      const matchesOrigin = !filterOrigin || review.origin === filterOrigin;
      
      return matchesSearch && matchesRoaster && matchesOrigin;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'name':
          comparison = a.beanName.localeCompare(b.beanName);
          break;
        case 'rating':
          const avgA = (a.aroma + a.acidity + a.body + a.sweetness + a.aftertaste + a.balance) / 6;
          const avgB = (b.aroma + b.acidity + b.body + b.sweetness + b.aftertaste + b.balance) / 6;
          comparison = avgA - avgB;
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterRoaster('');
    setFilterOrigin('');
  };

  return (
    <div className="review-list">
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
              <input
                type="text"
                placeholder="Search beans, roasters, origins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>
          
          <select
            value={filterRoaster}
            onChange={(e) => setFilterRoaster(e.target.value)}
            className="form-control"
            style={{ minWidth: '150px' }}
          >
            <option value="">All Roasters</option>
            {roasters.map(roaster => (
              <option key={roaster} value={roaster}>{roaster}</option>
            ))}
          </select>
          
          <select
            value={filterOrigin}
            onChange={(e) => setFilterOrigin(e.target.value)}
            className="form-control"
            style={{ minWidth: '150px' }}
          >
            <option value="">All Origins</option>
            {origins.map(origin => (
              <option key={origin} value={origin}>{origin}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SortAsc size={16} />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'rating')}
              className="form-control"
              style={{ width: 'auto', minWidth: '120px' }}
            >
              <option value="date">Date</option>
              <option value="name">Bean Name</option>
              <option value="rating">Average Rating</option>
            </select>
          </div>
          
          <button
            onClick={toggleSortOrder}
            className="btn btn-secondary"
            style={{ padding: '8px 12px', fontSize: '0.9rem' }}
          >
            {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
          
          {(searchTerm || filterRoaster || filterOrigin) && (
            <button
              onClick={clearFilters}
              className="btn btn-secondary"
              style={{ padding: '8px 12px', fontSize: '0.9rem' }}
            >
              <Filter size={16} />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {filteredAndSortedReviews.length === 0 ? (
        <div className="empty-state">
          <h3>No reviews found</h3>
          <p>
            {reviews.length === 0 
              ? "You haven't added any coffee reviews yet. Start by adding your first review!"
              : "No reviews match your current filters. Try adjusting your search criteria."
            }
          </p>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '1rem', color: '#666' }}>
            Showing {filteredAndSortedReviews.length} of {reviews.length} reviews
          </div>
          {filteredAndSortedReviews.map(review => (
            <ReviewCard
              key={review.id}
              review={review}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList; 