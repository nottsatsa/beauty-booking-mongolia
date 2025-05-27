
import { useState } from "react";
import { Search, MapPin, Star, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const companies = [
  {
    id: 1,
    name: "Нараа Beauty Salon",
    nameEn: "Naraa Beauty Salon",
    description: "Гоо сайхны иж бүрэн үйлчилгээ",
    rating: 4.8,
    reviews: 156,
    location: "Сүхбаатар дүүрэг",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    services: ["Нүүр будалт", "Хумс засварлах", "Үс засварлах"],
    priceRange: "25,000₮ - 50,000₮",
    workingHours: "09:00 - 18:00"
  },
  {
    id: 2,
    name: "Элегант спа төв",
    nameEn: "Elegant Spa Center",
    description: "Тайвшрал, арчилгааны төв",
    rating: 4.9,
    reviews: 89,
    location: "Чингэлтэй дүүрэг",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
    services: ["Массаж", "Арьс арчилгаа", "Spa терапи"],
    priceRange: "40,000₮ - 80,000₮",
    workingHours: "10:00 - 22:00"
  },
  {
    id: 3,
    name: "Модерн үсчин",
    nameEn: "Modern Hair Studio",
    description: "Орчин үеийн үс засварлах төв",
    rating: 4.7,
    reviews: 203,
    location: "Баянзүрх дүүрэг",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
    services: ["Үс засварлах", "Өнгө оруулах", "Хэв маяг"],
    priceRange: "30,000₮ - 60,000₮",
    workingHours: "09:00 - 19:00"
  },
  {
    id: 4,
    name: "Лакс хумс студио",
    nameEn: "Lux Nail Studio",
    description: "Хумсны иж бүрэн арчилгаа",
    rating: 4.6,
    reviews: 124,
    location: "Хан-Уул дүүрэг",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
    services: ["Маникюр", "Педикюр", "Nail Art"],
    priceRange: "15,000₮ - 35,000₮",
    workingHours: "10:00 - 20:00"
  }
];

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">TimeBook</span>
            </div>
            <div className="text-sm text-gray-600">
              Гоо сайхны үйлчилгээ онлайнаар захиалаарай
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Таны <span className="text-purple-600">гоо сайхны</span><br />
            <span className="text-pink-500">хэрэгцээнд</span> зориулсан
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Улаанбаатарын шилдэг гоо сайхны салон, спа төвүүдээс 
            онлайнаар хялбархан цаг захиалаарай
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Салон, үйлчилгээ хайх..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg rounded-full border-2 border-gray-200 focus:border-purple-400 bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-gray-600">Бүртгэлтэй салон</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-500">1000+</div>
              <div className="text-gray-600">Амжилттай захиалга</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">4.8★</div>
              <div className="text-gray-600">Дундаж үнэлгээ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Танд тохирсон салоноо сонгоорой
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-xl transition-all duration-300 bg-white overflow-hidden group">
                <div className="relative">
                  <img 
                    src={company.image} 
                    alt={company.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{company.rating}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">{company.name}</CardTitle>
                  <CardDescription className="text-gray-600">{company.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {company.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {company.reviews} үнэлгээ
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {company.workingHours}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="text-sm text-gray-600 mb-2">Үйлчилгээ:</div>
                    <div className="flex flex-wrap gap-2">
                      {company.services.map((service, index) => (
                        <span 
                          key={index}
                          className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-gray-800">{company.priceRange}</span>
                    </div>
                    <Link to={company.id === 1 ? "/naraa-salon" : "#"}>
                      <Button 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        disabled={company.id !== 1}
                      >
                        {company.id === 1 ? "Цаг захиалах" : "Удахгүй"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">TimeBook</span>
            </div>
            <p className="text-gray-400 mb-4">
              Гоо сайхныхаа төлөө цаг захиалга хялбар болгоё!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold mb-2">Холбоо барих</h3>
              <p className="text-gray-400 text-sm">support@timebook.mn</p>
              <p className="text-gray-400 text-sm">+976 7777-8888</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Үйлчилгээ</h3>
              <p className="text-gray-400 text-sm">Онлайн захиалга</p>
              <p className="text-gray-400 text-sm">Салон бүртгэл</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Дагах</h3>
              <p className="text-gray-400 text-sm">Facebook</p>
              <p className="text-gray-400 text-sm">Instagram</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2024 TimeBook. Бүх эрх хуулиар хамгаалагдсан.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
