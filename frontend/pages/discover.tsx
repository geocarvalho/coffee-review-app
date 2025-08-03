import { useState } from 'react';
import { Search, TrendingUp, Building2, MapPin, Coffee, Star, Home, Store, User } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function Discover() {
  const [activeTab, setActiveTab] = useState('trending');

  const tabs = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'roasters', label: 'Roasters', icon: Building2 },
    { id: 'origins', label: 'Origins', icon: MapPin },
    { id: 'methods', label: 'Methods', icon: Coffee },
  ];

  const trendingCoffees = [
    {
      id: 1,
      name: "Ethiopia Yirgacheffe",
      roaster: "Blue Bottle Coffee",
      rating: 4.8,
      brews: 12,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Colombia Geisha",
      roaster: "Counter Culture Coffee",
      rating: 4.9,
      brews: 8,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Kenya AA",
      roaster: "Stumptown Coffee",
      rating: 4.7,
      brews: 15,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop"
    }
  ];

  const roasters = [
    {
      id: 1,
      name: "Blue Bottle Coffee",
      location: "Oakland, CA",
      rating: 4.5,
      reviews: 1,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Intelligentsia Coffee",
      location: "Chicago, IL",
      rating: 4.8,
      reviews: 1,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Counter Culture Coffee",
      location: "Durham, NC",
      rating: 5.0,
      reviews: 1,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop"
    }
  ];

  const origins = [
    {
      id: 1,
      name: "Ethiopia, Yirgacheffe",
      brews: 1,
      color: "green"
    },
    {
      id: 2,
      name: "Guatemala, Huehuetenango",
      brews: 1,
      color: "green"
    },
    {
      id: 3,
      name: "Colombia, Nariño",
      brews: 1,
      color: "green"
    }
  ];

  const methods = [
    {
      id: 1,
      name: "pour over",
      rating: 4.5,
      brews: 1,
      color: "purple"
    },
    {
      id: 2,
      name: "chemex",
      rating: 4.8,
      brews: 1,
      color: "purple"
    },
    {
      id: 3,
      name: "v60",
      rating: 5.0,
      brews: 1,
      color: "purple"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'trending':
        return (
          <div className="space-y-6">
            {/* Highest Rated Coffees Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-600">
                    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                    <circle cx="12" cy="8" r="6"></circle>
                  </svg>
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Highest Rated Coffees</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border border-amber-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">Colombia Geisha</h3>
                      <div className="flex items-center gap-1">
                        {renderStars(5)}
                      </div>
                    </div>
                    <p className="text-amber-700 font-medium text-sm">Counter Culture Coffee</p>
                    <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                      <MapPin className="w-3 h-3" />
                      Colombia, Nariño
                    </div>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 mt-2 bg-amber-100 text-amber-800">
                      v60
                    </div>
                  </div>
                  
                  <div className="p-4 border border-amber-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">Guatemala Huehuetenango</h3>
                      <div className="flex items-center gap-1">
                        {renderStars(4)}
                      </div>
                    </div>
                    <p className="text-amber-700 font-medium text-sm">Intelligentsia Coffee</p>
                    <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                      <MapPin className="w-3 h-3" />
                      Guatemala, Huehuetenango
                    </div>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 mt-2 bg-amber-100 text-amber-800">
                      chemex
                    </div>
                  </div>
                  
                  <div className="p-4 border border-amber-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">Ethiopian Yirgacheffe</h3>
                      <div className="flex items-center gap-1">
                        {renderStars(4)}
                      </div>
                    </div>
                    <p className="text-amber-700 font-medium text-sm">Blue Bottle Coffee</p>
                    <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                      <MapPin className="w-3 h-3" />
                      Ethiopia, Yirgacheffe
                    </div>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 mt-2 bg-amber-100 text-amber-800">
                      pour over
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Brewing Methods Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Popular Brewing Methods</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Coffee className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 capitalize">pour over</h3>
                    <p className="text-sm text-gray-600">1 brews</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Coffee className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 capitalize">chemex</h3>
                    <p className="text-sm text-gray-600">1 brews</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Coffee className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 capitalize">v60</h3>
                    <p className="text-sm text-gray-600">1 brews</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'roasters':
        return (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Top Roasters</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roasters.map((roaster, index) => (
                    <div key={roaster.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{roaster.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < roaster.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{roaster.rating.toFixed(1)} avg • {roaster.reviews} reviews</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'origins':
        return (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Popular Origins</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {origins.map((origin) => (
                    <div key={origin.id} className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{origin.name}</h3>
                      <p className="text-sm text-gray-600">{origin.brews} coffees logged</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'methods':
        return (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Coffee className="w-5 h-5 text-purple-600" />
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Brewing Methods Overview</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {methods.map((method) => (
                    <div key={method.id} className="p-6 border border-purple-200 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 capitalize">{method.name}</h3>
                        <Coffee className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {renderStars(method.rating)}
                          </div>
                          <span className="text-sm text-gray-600">{method.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-sm text-gray-600">{method.brews} brews logged</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
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
              <a className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900" href="/log-brew">
                <Coffee className="w-4 h-4" />
                <span>Log Brew</span>
              </a>
              <a className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900" href="/log-visit">
                <Store className="w-4 h-4" />
                <span>Log Visit</span>
              </a>
              <a className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 bg-amber-100 text-amber-800" href="/discover">
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

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Coffee</h1>
            <p className="text-gray-600">Explore trending coffees, top roasters, and community favorites</p>
          </div>

          {/* Tab Navigation */}
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-1 p-1 bg-gray-100 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {renderTabContent()}
            </div>
          </div>
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
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-gray-500" href="/log-visit">
            <Store className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-tight">Log Visit</span>
          </a>
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-amber-600" href="/discover">
            <Search className="w-5 h-5 scale-110" />
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