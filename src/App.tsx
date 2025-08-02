import React, { useState, useEffect } from 'react';
import { Coffee, Plus, BarChart3 } from 'lucide-react';
import { CoffeeReview } from './types';
import { loadReviews, addReview, deleteReview, updateReview } from './utils/storage';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import StarRating from './components/StarRating';

const App: React.FC = () => {
  const [reviews, setReviews] = useState<CoffeeReview[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<CoffeeReview | null>(null);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const savedReviews = loadReviews();
    setReviews(savedReviews);
  }, []);

  const handleAddReview = (review: CoffeeReview) => {
    addReview(review);
    setReviews(loadReviews());
    setShowForm(false);
  };

  const handleEditReview = (review: CoffeeReview) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleUpdateReview = (updatedReview: CoffeeReview) => {
    updateReview(updatedReview);
    setReviews(loadReviews());
    setShowForm(false);
    setEditingReview(null);
  };

  const handleDeleteReview = (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview(id);
      setReviews(loadReviews());
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingReview(null);
  };

  const getStats = () => {
    if (reviews.length === 0) return null;

    const totalReviews = reviews.length;
    const uniqueRoasters = new Set(reviews.map(r => r.roaster)).size;
    const uniqueOrigins = new Set(reviews.map(r => r.origin)).size;
    
    const avgRatings = {
      aroma: reviews.reduce((sum, r) => sum + r.aroma, 0) / totalReviews,
      acidity: reviews.reduce((sum, r) => sum + r.acidity, 0) / totalReviews,
      body: reviews.reduce((sum, r) => sum + r.body, 0) / totalReviews,
      sweetness: reviews.reduce((sum, r) => sum + r.sweetness, 0) / totalReviews,
      aftertaste: reviews.reduce((sum, r) => sum + r.aftertaste, 0) / totalReviews,
      balance: reviews.reduce((sum, r) => sum + r.balance, 0) / totalReviews,
    };

    // Calculate overall average using general scores if available, otherwise calculate from individual ratings
    const overallAvg = reviews.reduce((sum, r) => {
      const generalScore = r.generalScore || (r.aroma + r.acidity + r.body + r.sweetness + r.aftertaste + r.balance) / 6;
      return sum + generalScore;
    }, 0) / totalReviews;

    const topRoasters = reviews
      .reduce((acc, review) => {
        acc[review.roaster] = (acc[review.roaster] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const sortedRoasters = Object.entries(topRoasters)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    return {
      totalReviews,
      uniqueRoasters,
      uniqueOrigins,
      avgRatings,
      overallAvg,
      topRoasters: sortedRoasters
    };
  };

  const stats = getStats();

  return (
    <div className="container">
      <div className="header">
        <h1>
          <Coffee size={40} style={{ marginRight: '1rem', verticalAlign: 'middle' }} />
          Coffee Review App
        </h1>
        <p>Track and rate your coffee experiences with detailed reviews</p>
      </div>

      <div className="actions">
        <button
          onClick={() => setShowForm(true)}
          className="btn"
        >
          <Plus size={16} />
          Add New Review
        </button>
        
        {reviews.length > 0 && (
          <button
            onClick={() => setShowStats(!showStats)}
            className="btn btn-secondary"
          >
            <BarChart3 size={16} />
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
        )}
      </div>

      {showStats && stats && (
        <div style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '1.5rem', 
          marginBottom: '2rem',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#8B4513', marginBottom: '1rem' }}>Your Coffee Stats</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '10px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8B4513' }}>{stats.totalReviews}</div>
              <div>Total Reviews</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '10px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8B4513' }}>{stats.uniqueRoasters}</div>
              <div>Unique Roasters</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '10px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8B4513' }}>{stats.uniqueOrigins}</div>
              <div>Countries/Origins</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '10px' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <StarRating rating={Math.round(stats.overallAvg)} readonly size={32} />
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#8B4513' }}>
                {stats.overallAvg.toFixed(1)}/5
              </div>
              <div>General Score Avg</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            {Object.entries(stats.avgRatings).map(([key, value]) => (
              <div key={key} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                border: '1px solid #e0e0e0'
              }}>
                <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>{key}</span>
                <StarRating rating={Math.round(value)} readonly size={16} />
              </div>
            ))}
          </div>

          {stats.topRoasters.length > 0 && (
            <div>
              <h4 style={{ color: '#8B4513', marginBottom: '0.5rem' }}>Top Roasters</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {stats.topRoasters.map(([roaster, count]) => (
                  <div key={roaster} style={{ 
                    padding: '0.5rem 1rem', 
                    background: '#8B4513', 
                    color: 'white', 
                    borderRadius: '20px',
                    fontSize: '0.9rem'
                  }}>
                    {roaster} ({count})
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showForm ? (
        <ReviewForm
          onSubmit={editingReview ? handleUpdateReview : handleAddReview}
          onCancel={handleCancelForm}
        />
      ) : (
        <ReviewList
          reviews={reviews}
          onDelete={handleDeleteReview}
          onEdit={handleEditReview}
        />
      )}
    </div>
  );
};

export default App; 