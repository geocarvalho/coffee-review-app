import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Star, Coffee, Home, Store, Search, User, Menu, Heart, MessageCircle, Share2, MapPin, Timer, Scale, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import FloatingActionButton from "@/components/FloatingActionButton";

interface Review {
  id: string;
  name: string;
  date: string;
  title: string;
  roaster: string;
  origin: string;
  method: string;
  ratio: string;
  time: string;
  tags: string[];
  notes: string;
  rating: number;
  likes?: string[];
  likeCount?: number;
}

const Tag = ({ label }: { label: string }) => (
  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-xs bg-amber-50 text-amber-700 hover:bg-amber-100">
    {label}
  </span>
);

const MethodTag = ({ method }: { method: string }) => {
  const getMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case 'pour over':
        return 'bg-blue-100 text-blue-800';
      case 'chemex':
        return 'bg-pink-100 text-pink-800';
      case 'v60':
        return 'bg-indigo-100 text-indigo-800';
      case 'french press':
        return 'bg-purple-100 text-purple-800';
      case 'aeropress':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 ${getMethodColor(method)} border-0`}>
      <Coffee className="w-3 h-3 mr-1" />
      {method}
    </div>
  );
};

export default function BrewLogFeed() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    roaster: '',
    origin: '',
    method: '',
    ratio: '',
    time: '',
    tags: [] as string[],
    notes: '',
    rating: 5
  });
  const [showComments, setShowComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<{[key: string]: any[]}>({});
  const [editingComment, setEditingComment] = useState<{reviewId: string, commentId: string, text: string} | null>(null);
  const [editCommentText, setEditCommentText] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId && !(event.target as Element).closest('.menu-container')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const fetchReviews = async () => {
    // If no API URL is configured, show demo data immediately
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.log('No API URL configured, showing demo data');
      setReviews([
        {
          id: '1',
          name: 'George Carvalho',
          date: 'Dec 15, 2:30 PM',
          title: 'Ethiopian Yirgacheffe',
          roaster: 'Stumptown Coffee',
          origin: 'Ethiopia',
          method: 'pour over',
          ratio: '22g : 350g',
          time: '3:45',
          tags: ['bright', 'floral', 'fruity', 'acidic'],
          notes: 'Absolutely stunning cup! The floral notes are incredible, with a bright acidity that dances on the tongue. The fruity undertones remind me of blueberries and jasmine. This is exactly what I look for in a great Ethiopian coffee.',
          rating: 5,
          likes: ['george'],
          likeCount: 1
        },
        {
          id: '2',
          name: 'George Carvalho',
          date: 'Dec 14, 10:15 AM',
          title: 'Colombian Supremo',
          roaster: 'Blue Bottle Coffee',
          origin: 'Colombia',
          method: 'chemex',
          ratio: '30g : 500g',
          time: '4:20',
          tags: ['chocolate', 'nutty', 'smooth', 'balanced'],
          notes: 'Rich and smooth with beautiful chocolate notes. The nutty undertones add complexity, and the finish is clean and balanced. Perfect for a morning brew.',
          rating: 4,
          likes: [],
          likeCount: 0
        },
        {
          id: '3',
          name: 'George Carvalho',
          date: 'Dec 13, 3:45 PM',
          title: 'Guatemala Antigua',
          roaster: 'Intelligentsia Coffee',
          origin: 'Guatemala',
          method: 'v60',
          ratio: '18g : 300g',
          time: '2:55',
          tags: ['caramel', 'spice', 'medium-body', 'sweet'],
          notes: 'Delicious caramel sweetness with subtle spice notes. Medium body with a smooth finish. The V60 really brings out the complexity of this coffee.',
          rating: 4,
          likes: ['george'],
          likeCount: 1
        }
      ]);
      setError(null);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (id: string) => {
    // In demo mode, just remove from local state
    if (!process.env.NEXT_PUBLIC_API_URL) {
      setReviews(reviews.filter(review => review.id !== id));
      setOpenMenuId(null);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setReviews(reviews.filter(review => review.id !== id));
        setOpenMenuId(null);
      }
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setEditForm({
      title: review.title,
      roaster: review.roaster,
      origin: review.origin,
      method: review.method,
      ratio: review.ratio,
      time: review.time,
      tags: review.tags,
      notes: review.notes,
      rating: review.rating
    });
    setOpenMenuId(null);
  };

  const handleUpdateReview = async () => {
    if (!editingReview) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/reviews/${editingReview.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });
      
      if (response.ok) {
        const updatedReview = await response.json();
        setReviews(reviews.map(review => 
          review.id === editingReview.id ? updatedReview : review
        ));
        setEditingReview(null);
        setEditForm({
          title: '',
          roaster: '',
          origin: '',
          method: '',
          ratio: '',
          time: '',
          tags: [],
          notes: '',
          rating: 5
        });
      }
    } catch (err) {
      console.error('Error updating review:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setEditForm({
      title: '',
      roaster: '',
      origin: '',
      method: '',
      ratio: '',
      time: '',
      tags: [],
      notes: '',
      rating: 5
    });
  };

  const handleLike = async (reviewId: string) => {
    // In demo mode, just update local state
    if (!process.env.NEXT_PUBLIC_API_URL) {
      setReviews(reviews.map(review => {
        if (review.id === reviewId) {
          const isLiked = review.likes?.includes('george') || false;
          const newLikes = isLiked 
            ? (review.likes || []).filter(id => id !== 'george')
            : [...(review.likes || []), 'george'];
          return {
            ...review,
            likes: newLikes,
            likeCount: newLikes.length
          };
        }
        return review;
      }));
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 'george' }),
      });
      
      if (response.ok) {
        const { likes, likeCount } = await response.json();
        setReviews(reviews.map(review => 
          review.id === reviewId 
            ? { ...review, likes, likeCount }
            : review
        ));
      }
    } catch (err) {
      console.error('Error liking review:', err);
    }
  };

  const handleComment = async (reviewId: string) => {
    if (!commentText.trim()) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/reviews/${reviewId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: 'george',
          userName: 'George Carvalho',
          text: commentText.trim()
        }),
      });
      
      if (response.ok) {
        const newComment = await response.json();
        setComments(prev => ({
          ...prev,
          [reviewId]: [...(prev[reviewId] || []), newComment]
        }));
        setCommentText('');
      }
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const loadComments = async (reviewId: string) => {
    if (comments[reviewId]) return; // Already loaded
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/reviews/${reviewId}/comments`);
      if (response.ok) {
        const reviewComments = await response.json();
        setComments(prev => ({
          ...prev,
          [reviewId]: reviewComments
        }));
      }
    } catch (err) {
      console.error('Error loading comments:', err);
    }
  };

  const handleShare = async (review: Review) => {
    const shareText = `Check out this coffee review: ${review.title} by ${review.roaster} - ${review.notes.substring(0, 100)}...`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: review.title,
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Review copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  const handleEditComment = (reviewId: string, commentId: string, currentText: string) => {
    setEditingComment({ reviewId, commentId, text: currentText });
    setEditCommentText(currentText);
  };

  const handleUpdateComment = async () => {
    if (!editingComment || !editCommentText.trim()) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/reviews/${editingComment.reviewId}/comments/${editingComment.commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: 'george',
          text: editCommentText.trim()
        }),
      });
      
      if (response.ok) {
        const updatedComment = await response.json();
        setComments(prev => ({
          ...prev,
          [editingComment.reviewId]: prev[editingComment.reviewId].map(comment => 
            comment.id === editingComment.commentId ? updatedComment : comment
          )
        }));
        setEditingComment(null);
        setEditCommentText('');
      }
    } catch (err) {
      console.error('Error updating comment:', err);
    }
  };

  const handleDeleteComment = async (reviewId: string, commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/reviews/${reviewId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 'george' }),
      });
      
      if (response.ok) {
        setComments(prev => ({
          ...prev,
          [reviewId]: prev[reviewId].filter(comment => comment.id !== commentId)
        }));
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const cancelEditComment = () => {
    setEditingComment(null);
    setEditCommentText('');
  };

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="text-center">Loading coffee reviews...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="text-center text-red-600">
            Error: {error}
            <br />
            <Button onClick={fetchReviews} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Demo Notice */}
      {!process.env.NEXT_PUBLIC_API_URL && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 text-center">
          <p className="text-sm text-blue-800">
            🚀 <strong>Demo Mode:</strong> Showing sample data. Connect a backend API to see real data.
          </p>
        </div>
      )}
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a className="flex items-center gap-3 group" href="#">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BrewLog</h1>
                <p className="text-xs text-gray-500 -mt-1">Coffee Community</p>
              </div>
            </a>
            
            <nav className="hidden md:flex items-center gap-2">
              <a className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 bg-amber-100 text-amber-800" href="#">
                <Home className="w-4 h-4" />
                <span>Feed</span>
              </a>
              <a className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900" href="/log-brew">
                <Coffee className="w-4 h-4" />
                <span>Log Brew</span>
              </a>
              <a className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900" href="/log-visit">
                <Store className="w-4 h-4" />
                <span>Log Visit</span>
              </a>
              <a className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900" href="/discover">
                <Search className="w-4 h-4" />
                <span>Discover</span>
              </a>
              <a className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900" href="/profile">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </a>
            </nav>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">George Carvalho</p>
                  <p className="text-xs text-gray-500">Coffee Enthusiast</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">G</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-6 pb-20">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Good morning, George!</h1>
            <p className="text-gray-600">Discover what the coffee community is brewing today</p>
          </div>
          
          {reviews.length === 0 ? (
            <div className="text-center text-gray-500">
              No coffee reviews yet. Be the first to share your brew!
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="rounded-lg border text-card-foreground shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-amber-100">
                  <div className="flex flex-col space-y-1.5 p-6 pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10 border-2 border-amber-200">
                          <span className="flex h-full w-full items-center justify-center rounded-full bg-muted bg-gradient-to-br from-amber-400 to-orange-500 text-white font-medium">
                            {review.name.charAt(0)}
                          </span>
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">{review.name}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="relative menu-container">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleMenu(review.id)}
                          className="h-8 w-8 text-gray-500 hover:text-gray-700"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                        
                        {openMenuId === review.id && (
                          <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <button
                              onClick={() => handleEditReview(review)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteReview(review.id)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-0">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-xl text-gray-900">{review.title}</h3>
                          <div className="flex items-center gap-1">
                            {Array(review.rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                              ))}
                          </div>
                        </div>
                        <p className="text-amber-700 font-medium">{review.roaster}</p>
                        <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                          <MapPin className="w-3 h-3" />
                          {review.origin}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <MethodTag method={review.method} />
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-gray-600">
                          <Timer className="w-3 h-3 mr-1" />
                          {review.time}
                        </div>
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-gray-600">
                          <Scale className="w-3 h-3 mr-1" />
                          {review.ratio}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {review.tags.map((tag) => (
                          <Tag key={tag} label={tag} />
                        ))}
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed">{review.notes}</p>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-amber-100">
                        <div className="flex items-center gap-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleLike(review.id)}
                            className={`${review.likes?.includes('george') ? 'text-red-500' : 'text-gray-600'} hover:text-red-500`}
                          >
                            <Heart className={`w-4 h-4 mr-1 ${review.likes?.includes('george') ? 'fill-current' : ''}`} />
                            {(review.likeCount || 0) > 0 ? `${review.likeCount} Like${(review.likeCount || 0) !== 1 ? 's' : ''}` : 'Like'}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              if (showComments === review.id) {
                                setShowComments(null);
                              } else {
                                setShowComments(review.id);
                                loadComments(review.id);
                              }
                            }}
                            className="text-gray-600 hover:text-blue-500"
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {(comments[review.id]?.length || 0) > 0 ? `${comments[review.id].length} Comment${(comments[review.id]?.length || 0) !== 1 ? 's' : ''}` : 'Comments'}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleShare(review)}
                            className="text-gray-600 hover:text-green-500"
                          >
                            <Share2 className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                      
                      {/* Comments Section */}
                      {showComments === review.id && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                                                     <div className="space-y-3 mb-4">
                             {comments[review.id]?.map((comment) => (
                               <div key={comment.id} className="flex gap-3">
                                 <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                   {comment.userName.charAt(0)}
                                 </div>
                                 <div className="flex-1">
                                   <div className="flex items-center justify-between mb-1">
                                     <div className="flex items-center gap-2">
                                       <span className="font-medium text-gray-900">{comment.userName}</span>
                                       <span className="text-xs text-gray-500">{comment.date}</span>
                                       {comment.edited && (
                                         <span className="text-xs text-gray-400">(edited)</span>
                                       )}
                                     </div>
                                     {comment.userId === 'george' && (
                                       <div className="flex items-center gap-1">
                                         <button
                                           onClick={() => handleEditComment(review.id, comment.id, comment.text)}
                                           className="text-xs text-gray-500 hover:text-blue-600 p-1"
                                         >
                                           Edit
                                         </button>
                                         <button
                                           onClick={() => handleDeleteComment(review.id, comment.id)}
                                           className="text-xs text-gray-500 hover:text-red-600 p-1"
                                         >
                                           Delete
                                         </button>
                                       </div>
                                     )}
                                   </div>
                                   {editingComment?.commentId === comment.id ? (
                                     <div className="space-y-2">
                                       <textarea
                                         value={editCommentText}
                                         onChange={(e) => setEditCommentText(e.target.value)}
                                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                                         rows={2}
                                       />
                                       <div className="flex gap-2">
                                         <button
                                           onClick={handleUpdateComment}
                                           disabled={!editCommentText.trim()}
                                           className="px-3 py-1 bg-amber-600 text-white rounded text-xs hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                         >
                                           Save
                                         </button>
                                         <button
                                           onClick={cancelEditComment}
                                           className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400"
                                         >
                                           Cancel
                                         </button>
                                       </div>
                                     </div>
                                   ) : (
                                     <p className="text-gray-700 text-sm">{comment.text}</p>
                                   )}
                                 </div>
                               </div>
                             ))}
                            {(!comments[review.id] || comments[review.id].length === 0) && (
                              <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Write a comment..."
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleComment(review.id);
                                }
                              }}
                            />
                            <Button
                              onClick={() => handleComment(review.id)}
                              disabled={!commentText.trim()}
                              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                              Post
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <FloatingActionButton />

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Review</h2>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coffee Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roaster</label>
                  <input
                    type="text"
                    value={editForm.roaster}
                    onChange={(e) => setEditForm({...editForm, roaster: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                  <input
                    type="text"
                    value={editForm.origin}
                    onChange={(e) => setEditForm({...editForm, origin: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brewing Method</label>
                    <select
                      value={editForm.method}
                      onChange={(e) => setEditForm({...editForm, method: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="pour over">Pour Over</option>
                      <option value="chemex">Chemex</option>
                      <option value="v60">V60</option>
                      <option value="french press">French Press</option>
                      <option value="aeropress">AeroPress</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <select
                      value={editForm.rating}
                      onChange={(e) => setEditForm({...editForm, rating: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value={1}>1 Star</option>
                      <option value={2}>2 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={5}>5 Stars</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ratio</label>
                    <input
                      type="text"
                      value={editForm.ratio}
                      onChange={(e) => setEditForm({...editForm, ratio: e.target.value})}
                      placeholder="e.g., 22g : 350g"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brew Time</label>
                    <input
                      type="text"
                      value={editForm.time}
                      onChange={(e) => setEditForm({...editForm, time: e.target.value})}
                      placeholder="e.g., 1:16"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={editForm.tags.join(', ')}
                    onChange={(e) => setEditForm({...editForm, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                    placeholder="bright, floral, fruity, acidic"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tasting Notes</label>
                  <textarea
                    value={editForm.notes}
                    onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleUpdateReview}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                >
                  Update Review
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-amber-100 z-40">
        <nav className="flex items-center justify-around py-1">
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-amber-600" href="/">
            <Home className="w-5 h-5 scale-110" />
            <span className="text-[10px] font-medium leading-tight">Feed</span>
          </a>
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-gray-500" href="/log-brew">
            <Coffee className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-tight">Log Brew</span>
          </a>
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-gray-500" href="/log-visit">
            <Store className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-tight">Log Visit</span>
          </a>
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-gray-500" href="/discover">
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-tight">Discover</span>
          </a>
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-gray-500" href="/profile">
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-tight">Profile</span>
          </a>
        </nav>
      </div>
    </div>
  );
} 