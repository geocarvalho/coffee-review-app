import { useState } from 'react';
import { Store, Camera, Upload, Tag, Star, Home, Coffee, Search, User } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function LogVisit() {
  const [rating, setRating] = useState(0);
  const [orderedItems, setOrderedItems] = useState<string[]>([]);
  const [currentItem, setCurrentItem] = useState('');
  const [formData, setFormData] = useState({
    shopName: '',
    reviewText: '',
    privacy: 'public'
  });

  const handleAddItem = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentItem.trim()) {
      e.preventDefault();
      setOrderedItems([...orderedItems, currentItem.trim()]);
      setCurrentItem('');
    }
  };

  const removeItem = (index: number) => {
    setOrderedItems(orderedItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Log Visit Data:', {
      ...formData,
      rating,
      orderedItems
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a className="flex items-center gap-3 group" href="/">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BrewLog</h1>
                <p className="text-xs text-gray-500 -mt-1">Coffee Community</p>
              </div>
            </a>
            <nav className="hidden md:flex items-center gap-2">
              <a className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900" href="/">
                <Home className="w-4 h-4" />
                <span>Feed</span>
              </a>
              <a className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900" href="/log-brew">
                <Coffee className="w-4 h-4" />
                <span>Log Brew</span>
              </a>
              <a className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 bg-amber-100 text-amber-800" href="/log-visit">
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
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-6 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Review a Coffee Shop</h1>
            <p className="text-gray-600">Share your experience at a local or favorite spot.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shop Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight mb-4">Shop Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium leading-none" htmlFor="coffee_shop_name">
                      Coffee Shop Name *
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      id="coffee_shop_name"
                      placeholder="e.g., The Daily Grind"
                      required
                      value={formData.shopName}
                      onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium leading-none">Rating *</label>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="focus:outline-none"
                          onClick={() => setRating(star)}
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 hover:text-amber-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">Rate your visit</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visit Photo */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2 mb-4">
                  <Camera className="w-5 h-5" />
                  Visit Photo
                </h3>
                <div className="border-2 border-dashed border-amber-200 rounded-lg p-8 text-center">
                  <input type="file" accept="image/*" className="hidden" id="photo-upload" />
                  <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Upload a photo</p>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Your Review */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight mb-4">Your Review</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium leading-none flex items-center gap-1" htmlFor="ordered_items">
                      <Tag className="w-4 h-4" />
                      What did you order?
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      id="ordered_items"
                      placeholder="Type an item and press Enter..."
                      value={currentItem}
                      onChange={(e) => setCurrentItem(e.target.value)}
                      onKeyDown={handleAddItem}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {orderedItems.map((item, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-amber-600 hover:text-amber-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium leading-none" htmlFor="review_text">
                      Review Notes
                    </label>
                    <textarea
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                      id="review_text"
                      placeholder="Share your thoughts on the ambiance, service, and of course, the coffee..."
                      value={formData.reviewText}
                      onChange={(e) => setFormData({...formData, reviewText: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Section */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <label className="text-sm font-medium leading-none" htmlFor="privacy">
                  Privacy
                </label>
                <select
                  className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-32"
                  value={formData.privacy}
                  onChange={(e) => setFormData({...formData, privacy: e.target.value})}
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 px-8 py-3 text-lg font-medium flex items-center gap-2"
              >
                Post Review
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-amber-100 z-40">
        <nav className="flex items-center justify-around py-1">
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-gray-500" href="/">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-tight">Feed</span>
          </a>
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-gray-500" href="/log-brew">
            <Coffee className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-tight">Log Brew</span>
          </a>
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-amber-600" href="/log-visit">
            <Store className="w-5 h-5 scale-110" />
            <span className="text-[10px] font-medium leading-tight">Log Visit</span>
          </a>
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-gray-500" href="#">
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-tight">Discover</span>
          </a>
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-gray-500" href="#">
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-tight">Profile</span>
          </a>
        </nav>
      </div>
    </div>
  );
} 