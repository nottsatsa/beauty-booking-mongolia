import { useState } from "react";
import { Calendar, Clock, Phone, MapPin, Instagram, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    name: "Нүүр будалт",
    nameEn: "Makeup",
    price: "50,000₮",
    duration: "60 мин",
    description: "Гэрэл зургийн болон өдөр тутмын будалт"
  },
  {
    id: 2,
    name: "Хумс засварлах",
    nameEn: "Nail Care",
    price: "25,000₮",
    duration: "45 мин",
    description: "Маникюр, педикюр, будалт"
  },
  {
    id: 3,
    name: "Хөмсөг засварлах",
    nameEn: "Eyebrow Styling",
    price: "15,000₮",
    duration: "30 мин",
    description: "Хөмсөг засварлах, будах"
  },
  {
    id: 4,
    name: "Үс засварлах",
    nameEn: "Hair Styling",
    price: "35,000₮",
    duration: "90 мин",
    description: "Үс засварлах, буржгар хийх"
  },
  {
    id: 5,
    name: "Арьс арчилгаа",
    nameEn: "Facial Treatment",
    price: "40,000₮",
    duration: "75 мин",
    description: "Арьсны цэвэрлэгээ, тэжээллэг маск"
  }
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
];

const Index = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    setShowSuccess(true);
    setShowBookingForm(false);
    toast({
      title: "Амжилттай захиалагдлаа!",
      description: "Таны захиалгыг хүлээн авлаа. Удахгүй холбогдох болно.",
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      notes: ""
    });
    setShowBookingForm(false);
    setShowSuccess(false);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto text-center shadow-lg">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">Амжилттай!</CardTitle>
            <CardDescription className="text-gray-600">
              Таны захиалгыг хүлээн авлаа
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg text-left">
              <p><strong>Нэр:</strong> {formData.name}</p>
              <p><strong>Утас:</strong> {formData.phone}</p>
              <p><strong>Үйлчилгээ:</strong> {formData.service}</p>
              <p><strong>Огноо:</strong> {formData.date}</p>
              <p><strong>Цаг:</strong> {formData.time}</p>
            </div>
            <p className="text-sm text-gray-600">
              Бид таны захиалгыг баталгаажуулахын тулд удахгүй холбогдох болно.
            </p>
            <Button onClick={resetForm} className="w-full bg-rose-500 hover:bg-rose-600">
              Буцах
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showBookingForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Button 
            onClick={() => setShowBookingForm(false)}
            variant="outline"
            className="mb-6"
          >
            ← Буцах
          </Button>
          
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">Цаг захиалах</CardTitle>
              <CardDescription>
                Мэдээллээ бөглөж таны хүссэн цагт үйлчилгээ аваарай
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Нэр *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Таны нэр"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Утасны дугаар *</Label>
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="99112233"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="service">Үйлчилгээ сонгох *</Label>
                  <Select required value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Үйлчилгээгээ сонгоно уу" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.name}>
                          {service.name} - {service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Огноо *</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Цаг *</Label>
                    <Select required value={formData.time} onValueChange={(value) => setFormData({...formData, time: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Цагаа сонгоно уу" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Нэмэлт тэмдэглэл</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Танд тохирох нэмэлт мэдээлэл..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 text-lg">
                  Захиалах
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Буцах
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">Нараа Beauty Salon</span>
            </div>
          </div>
          <Button 
            onClick={() => setShowBookingForm(true)}
            className="bg-rose-500 hover:bg-rose-600 text-white"
          >
            Цаг захиалах
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Нараа Beauty Salon-д <br />
            <span className="text-rose-500">тавтай морилно уу!</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Гоо сайхныхаа төлөө хамгийн шилдэг үйлчилгээг авахын тулд
            онлайнаар хялбархан цаг захиалаарай
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowBookingForm(true)}
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 text-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Цаг захиалах
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg border-rose-200 hover:bg-rose-50"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Үйлчилгээ үзэх
            </Button>
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-12 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ажиллах цаг</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">Даваа - Баасан</p>
              <p className="text-rose-500">09:00 - 18:00</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">Бямба - Ням</p>
              <p className="text-rose-500">10:00 - 16:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Манай үйлчилгээ</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow duration-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">{service.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">{service.nameEn}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-rose-500">{service.price}</span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                    <Button 
                      onClick={() => setShowBookingForm(true)}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                    >
                      Захиалах
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Холбоо барих</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="font-semibold text-gray-800">Утас</h3>
              <p className="text-gray-600">+976 9911-2233</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="font-semibold text-gray-800">Хаяг</h3>
              <p className="text-gray-600">Сүхбаатар дүүрэг, 1-р хороо<br />Улаанбаатар хот</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                <Instagram className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="font-semibold text-gray-800">Социал сүлжээ</h3>
              <p className="text-gray-600">@naraa_beauty_salon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">TimeBook</span>
          </div>
          <p className="text-gray-400 mb-4">
            Гоо сайхныхаа төлөө цаг захиалга хялбар болгоё!
          </p>
          <p className="text-sm text-gray-500">
            © 2024 TimeBook. Бүх эрх хуулиар хамгаалагдсан.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
