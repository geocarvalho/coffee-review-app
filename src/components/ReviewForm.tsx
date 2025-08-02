import React, { useState, useRef } from 'react';
import { Coffee, Camera, X } from 'lucide-react';
import { CoffeeReview, ROAST_LEVELS, BREWING_METHODS } from '../types';
import StarRating from './StarRating';

interface ReviewFormProps {
  onSubmit: (review: CoffeeReview) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    beanName: '',
    origin: '',
    roaster: '',
    roastLevel: 'Medium' as string,
    brewingMethod: 'V60' as string,
    aroma: 3,
    acidity: 3,
    body: 3,
    sweetness: 3,
    aftertaste: 3,
    balance: 3,
    overallComment: '',
  });
  
  const [imageUrl, setImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('rating') ? parseInt(value) || 0 : value
    }));
  };

  const handleRatingChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReview: CoffeeReview = {
      id: Date.now().toString(),
      ...formData,
      imageUrl: imageUrl || undefined,
      createdAt: new Date().toISOString(),
    };
    
    onSubmit(newReview);
  };

  const RatingInput = ({ label, field, value }: { label: string; field: string; value: number }) => (
    <div className="rating-input">
      <label>{label}:</label>
      <StarRating
        rating={value}
        onRatingChange={(rating) => handleRatingChange(field, rating)}
        size={24}
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className="form-group">
        <label htmlFor="beanName">Bean Name *</label>
        <input
          type="text"
          id="beanName"
          name="beanName"
          value={formData.beanName}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="origin">Origin *</label>
        <input
          type="text"
          id="origin"
          name="origin"
          value={formData.origin}
          onChange={handleInputChange}
          className="form-control"
          placeholder="e.g., Ethiopia, Colombia, Brazil"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="roaster">Roaster *</label>
        <input
          type="text"
          id="roaster"
          name="roaster"
          value={formData.roaster}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="roastLevel">Roast Level</label>
        <select
          id="roastLevel"
          name="roastLevel"
          value={formData.roastLevel}
          onChange={handleInputChange}
          className="form-control"
        >
          {ROAST_LEVELS.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="brewingMethod">Brewing Method</label>
        <select
          id="brewingMethod"
          name="brewingMethod"
          value={formData.brewingMethod}
          onChange={handleInputChange}
          className="form-control"
        >
          {BREWING_METHODS.map(method => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Ratings (1-5)</label>
        <div className="rating-group">
          <RatingInput label="Aroma" field="aroma" value={formData.aroma} />
          <RatingInput label="Acidity" field="acidity" value={formData.acidity} />
          <RatingInput label="Body" field="body" value={formData.body} />
          <RatingInput label="Sweetness" field="sweetness" value={formData.sweetness} />
          <RatingInput label="Aftertaste" field="aftertaste" value={formData.aftertaste} />
          <RatingInput label="Balance" field="balance" value={formData.balance} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="overallComment">Overall Comment</label>
        <textarea
          id="overallComment"
          name="overallComment"
          value={formData.overallComment}
          onChange={handleInputChange}
          className="form-control"
          rows={4}
          placeholder="Share your thoughts about this coffee..."
        />
      </div>

      <div className="form-group">
        <label>Add Photo</label>
        <div className="actions">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-secondary"
          >
            <Camera size={16} />
            Upload Photo
          </button>
          {imageUrl && (
            <button
              type="button"
              onClick={() => setImageUrl('')}
              className="btn btn-secondary"
            >
              <X size={16} />
              Remove Photo
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        {imageUrl && (
          <img src={imageUrl} alt="Coffee preview" className="image-preview" />
        )}
      </div>

      <div className="actions">
        <button type="submit" className="btn">
          <Coffee size={16} />
          Save Review
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewForm; 