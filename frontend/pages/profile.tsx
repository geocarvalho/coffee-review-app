import { useState } from 'react';
import { User, Calendar, PenLine, Star, Coffee, Store, Heart, BarChart3, Home, Search } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('recent');

  const tabs = [
    { id: 'recent', label: 'Recent Brews' },
    { id: 'shop_reviews', label: 'Shop Reviews' },
    { id: 'favorites', label: 'Favorites' },
    { id: 'stats', label: 'Statistics' },
  ];

  const recentBrews = [
    {
      id: 1,
      title: "Ethiopian Yirgacheffe",
      roaster: "Blue Bottle Coffee",
      rating: 4,
      method: "pour over",
      origin: "Ethiopia, Yirgacheffe",
      notes: "Bright and floral with notes of lemon and tea. Perfect morning coffee with a clean finish. Used V60 with 22g coffee to 350g water at 94°C.",
      date: "Aug 2, 2025 at 11:36 PM"
    },
    {
      id: 2,
      title: "Guatemala Huehuetenango",
      roaster: "Intelligentsia Coffee",
      rating: 4,
      method: "chemex",
      origin: "Guatemala, Huehuetenango",
      notes: "Rich and complex with chocolate undertones and a wine-like acidity. Absolutely stellar coffee that showcases what specialty coffee can be.",
      date: "Aug 2, 2025 at 11:36 PM"
    },
    {
      id: 3,
      title: "Colombia Geisha",
      roaster: "Counter Culture Coffee",
      rating: 5,
      method: "v60",
      origin: "Colombia, Nariño",
      notes: "Exceptional cup with jasmine and bergamot notes. This geisha variety is absolutely magical - floral, tea-like, and incredibly clean. Worth every penny.",
      date: "Aug 2, 2025 at 11:36 PM"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'recent':
        return (
          <div className="space-y-4">
            {recentBrews.map((brew) => (
              <Card key={brew.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg text-gray-900">{brew.title}</h3>
                        <div className="flex items-center gap-1">
                          {renderStars(brew.rating)}
                        </div>
                      </div>
                      <p className="text-amber-700 font-medium mb-2">{brew.roaster}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-amber-100 text-amber-800">
                          {brew.method}
                        </div>
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                          {brew.origin}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">{brew.notes}</p>
                      <p className="text-xs text-gray-500 mt-2">{brew.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'shop_reviews':
        return (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 py-16 text-center">
                <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No shop reviews yet</h3>
                <p className="text-gray-600 mb-6">Review a coffee shop visit to see it here.</p>
                <a 
                  href="/log-visit" 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white h-10 px-4 py-2"
                >
                  Review a Shop
                </a>
              </CardContent>
            </Card>
          </div>
        );

      case 'favorites':
        return (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 py-16 text-center">
                <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Favorites coming soon</h3>
                <p className="text-gray-600">Mark your favorite coffees to see them here</p>
              </CardContent>
            </Card>
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-1.5 pb-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Your Coffee Journey
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Favorite Brewing Method</p>
                      <p className="text-sm text-gray-600 capitalize">v60</p>
                    </div>
                    <Coffee className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <svg className="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                        <polyline points="16 7 22 7 22 13"></polyline>
                      </svg>
                      <p className="font-semibold text-gray-900">3</p>
                      <p className="text-sm text-gray-600">Roasters Explored</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Coffee className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900">3</p>
                      <p className="text-sm text-gray-600">Methods Mastered</p>
                    </div>
                  </div>
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
              <a className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900" href="/discover">
                <Search className="w-4 h-4" />
                <span>Discover</span>
              </a>
              <a className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 bg-amber-100 text-amber-800" href="/profile">
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
        <div className="max-w-4xl mx-auto px-4 py-6 pb-20">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  G
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">George Carvalho</h1>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Joined Aug 2025
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <PenLine className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">3</div>
                <div className="text-sm text-gray-600">Coffees Logged</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-2xl font-bold text-amber-600">4.8</span>
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">3</div>
                <div className="text-sm text-gray-600">Roasters Tried</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">3</div>
                <div className="text-sm text-gray-600">Brew Methods</div>
              </CardContent>
            </Card>
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
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-gray-500" href="/discover">
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-tight">Discover</span>
          </a>
          <a className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-1/5 text-center text-amber-600" href="/profile">
            <User className="w-5 h-5 scale-110" />
            <span className="text-[10px] font-medium leading-tight">Profile</span>
          </a>
        </nav>
      </div>
    </div>
  );
} 