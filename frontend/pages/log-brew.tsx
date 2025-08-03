import { useState } from 'react';
import { Coffee, Camera, Upload, Timer, Scale, Thermometer, ChevronDown, Home, Store, Search, User } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function LogBrew() {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    coffeeName: '',
    roaster: '',
    origin: '',
    brewMethod: '',
    grindSize: '',
    brewTime: '',
    coffeeWeight: '',
    waterWeight: '',
    waterTemp: '',
    notes: '',
    privacy: 'public'
  });

  const flavorTags = [
    'fruity', 'floral', 'chocolatey', 'nutty', 'caramel', 'bright', 
    'acidic', 'smooth', 'bold', 'earthy', 'sweet', 'bitter', 'spicy', 'creamy'
  ];

  const brewMethods = [
    'espresso', 'pour_over', 'french_press', 'aeropress', 'cold_brew', 
    'drip', 'chemex', 'v60', 'moka_pot', 'turkish', 'other'
  ];

  const grindSizes = [
    'extra_coarse', 'coarse', 'medium_coarse', 'medium', 
    'medium_fine', 'fine', 'extra_fine'
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reviewData = {
      ...formData,
      rating,
      tags: selectedTags,
      id: Date.now().toString(),
      name: "George Carvalho",
      date: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      title: formData.coffeeName,
      method: formData.brewMethod,
      ratio: `${formData.coffeeWeight}g : ${formData.waterWeight}g`,
      time: formData.brewTime,
      notes: formData.notes
    };

    // Send to backend
    fetch('http://localhost:4000/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Reset form
      setFormData({
        coffeeName: '', roaster: '', origin: '', brewMethod: '', grindSize: '',
        brewTime: '', coffeeWeight: '', waterWeight: '', waterTemp: '', notes: '', privacy: 'public'
      });
      setRating(0);
      setSelectedTags([]);
      alert('Coffee logged successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error logging coffee');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a className="flex items-center gap-3 group" href="/">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Coffee className="w-6 h-6 text-white" />
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
              <a className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 bg-amber-100 text-amber-800" href="/log-brew">
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
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-6 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Log Your Coffee</h1>
            <p className="text-gray-600">Share your brewing experience with the community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Coffee Photo Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Camera className="w-5 h-5" />
                  <h3 className="text-2xl font-semibold">Coffee Photo</h3>
                </div>
                <div className="border-2 border-dashed border-amber-200 rounded-lg p-8 text-center">
                  <input type="file" accept="image/*" className="hidden" id="photo-upload" />
                  <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Upload a photo</p>
                      <p className="text-sm text-gray-500">Show off your brew setup or final cup</p>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Coffee Details Section */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Coffee Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium" htmlFor="coffee_name">Coffee Name *</label>
                      <input
                        type="text"
                        id="coffee_name"
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="e.g., Ethiopian Yirgacheffe"
                        value={formData.coffeeName}
                        onChange={(e) => setFormData({...formData, coffeeName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium" htmlFor="roaster">Roaster *</label>
                      <input
                        type="text"
                        id="roaster"
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="e.g., Blue Bottle Coffee"
                        value={formData.roaster}
                        onChange={(e) => setFormData({...formData, roaster: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium" htmlFor="origin">Origin</label>
                    <input
                      type="text"
                      id="origin"
                      className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder="e.g., Ethiopia, Sidamo"
                      value={formData.origin}
                      onChange={(e) => setFormData({...formData, origin: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Rating *</label>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <svg
                            className={`w-8 h-8 transition-colors ${
                              star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                          </svg>
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">Rate this coffee</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Brewing Method Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Coffee className="w-5 h-5" />
                  <h3 className="text-2xl font-semibold">Brewing Method</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium" htmlFor="brew_method">Method *</label>
                    <select
                      id="brew_method"
                      className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      value={formData.brewMethod}
                      onChange={(e) => setFormData({...formData, brewMethod: e.target.value})}
                      required
                    >
                      <option value="">Select brewing method</option>
                      {brewMethods.map(method => (
                        <option key={method} value={method}>
                          {method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium" htmlFor="grind_size">Grind Size</label>
                      <select
                        id="grind_size"
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        value={formData.grindSize}
                        onChange={(e) => setFormData({...formData, grindSize: e.target.value})}
                      >
                        <option value="">Select grind size</option>
                        {grindSizes.map(size => (
                          <option key={size} value={size}>
                            {size.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium flex items-center gap-1" htmlFor="brew_time">
                        <Timer className="w-4 h-4" />
                        Brew Time
                      </label>
                      <input
                        type="text"
                        id="brew_time"
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="e.g., 4:00"
                        value={formData.brewTime}
                        onChange={(e) => setFormData({...formData, brewTime: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium flex items-center gap-1" htmlFor="coffee_weight">
                        <Scale className="w-4 h-4" />
                        Coffee (g)
                      </label>
                      <input
                        type="number"
                        id="coffee_weight"
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="22"
                        value={formData.coffeeWeight}
                        onChange={(e) => setFormData({...formData, coffeeWeight: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium flex items-center gap-1" htmlFor="water_weight">
                        <Scale className="w-4 h-4" />
                        Water (g)
                      </label>
                      <input
                        type="number"
                        id="water_weight"
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="350"
                        value={formData.waterWeight}
                        onChange={(e) => setFormData({...formData, waterWeight: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium flex items-center gap-1" htmlFor="water_temp">
                        <Thermometer className="w-4 h-4" />
                        Temp (°C)
                      </label>
                      <input
                        type="number"
                        id="water_temp"
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="94"
                        value={formData.waterTemp}
                        onChange={(e) => setFormData({...formData, waterTemp: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flavor Profile Section */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Flavor Profile</h3>
                <div className="flex flex-wrap gap-2">
                  {flavorTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all cursor-pointer ${
                        selectedTags.includes(tag)
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'text-foreground hover:bg-amber-50 hover:border-amber-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tasting Notes Section */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Tasting Notes</h3>
                <textarea
                  className="flex w-full rounded-md border bg-background px-3 py-2 text-sm border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[100px]"
                  placeholder="Share your thoughts on this coffee - aroma, taste, brewing tips, or anything else worth noting..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </CardContent>
            </Card>

            {/* Submit Section */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <label className="text-sm font-medium" htmlFor="privacy">Privacy</label>
                <select
                  id="privacy"
                  className="flex h-10 items-center justify-between rounded-md border bg-background px-3 py-2 text-sm border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 w-32"
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
                Log Coffee
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
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-amber-600" href="/log-brew">
            <Coffee className="w-5 h-5 scale-110" />
            <span className="text-[10px] font-medium leading-tight">Log Brew</span>
          </a>
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-gray-500" href="/log-visit">
            <Store className="w-5 h-5" />
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