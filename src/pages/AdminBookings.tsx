
import { useState } from "react";
import { Calendar, Clock, Phone, User, Filter, Search, CheckCircle, XCircle, ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Mock захиалгын өгөгдөл
const mockBookings = [
  {
    id: 1,
    customerName: "Сарангэрэл",
    phone: "99112233",
    service: "Нүүр будалт",
    date: "2024-01-15",
    time: "10:00",
    status: "confirmed",
    notes: "Гэрэл зургийн будалт хэрэгтэй",
    price: "50,000₮"
  },
  {
    id: 2,
    customerName: "Энхтүвшин",
    phone: "88994455",
    service: "Хумс засварлах",
    date: "2024-01-15",
    time: "14:30",
    status: "pending",
    notes: "",
    price: "25,000₮"
  },
  {
    id: 3,
    customerName: "Оюунчимэг",
    phone: "77665544",
    service: "Арьс арчилгаа",
    date: "2024-01-16",
    time: "11:00",
    status: "completed",
    notes: "Арьсны цэвэрлэгээ",
    price: "40,000₮"
  },
  {
    id: 4,
    customerName: "Болормаа",
    phone: "99887766",
    service: "Үс засварлах",
    date: "2024-01-16",
    time: "15:00",
    status: "cancelled",
    notes: "Өвчтэй болсон",
    price: "35,000₮"
  },
  {
    id: 5,
    customerName: "Цэцэгмаа",
    phone: "88776655",
    service: "Хөмсөг засварлах",
    date: "2024-01-17",
    time: "09:30",
    status: "pending",
    notes: "",
    price: "15,000₮"
  }
];

const statusConfig = {
  pending: { label: "Хүлээгдэж буй", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Баталгаажсан", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Дууссан", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Цуцлагдсан", color: "bg-red-100 text-red-800" }
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.phone.includes(searchTerm) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateBookingStatus = (bookingId: number, newStatus: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
    toast({
      title: "Захиалгын төлөв шинэчлэгдлээ",
      description: `Захиалга #${bookingId} ${statusConfig[newStatus as keyof typeof statusConfig].label} болгогдлоо`,
    });
  };

  const todayBookings = bookings.filter(b => b.date === "2024-01-15").length;
  const weeklyRevenue = bookings
    .filter(b => b.status === "completed")
    .reduce((sum, b) => sum + parseInt(b.price.replace(/[₮,]/g, "")), 0);

  if (selectedBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Button 
            onClick={() => setSelectedBooking(null)}
            variant="outline"
            className="mb-6"
          >
            ← Буцах
          </Button>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Захиалгын дэлгэрэнгүй</CardTitle>
              <CardDescription>Захиалга #{selectedBooking.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Үйлчлүүлэгчийн мэдээлэл</h3>
                  <p><strong>Нэр:</strong> {selectedBooking.customerName}</p>
                  <p><strong>Утас:</strong> {selectedBooking.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Үйлчилгээний мэдээлэл</h3>
                  <p><strong>Үйлчилгээ:</strong> {selectedBooking.service}</p>
                  <p><strong>Үнэ:</strong> {selectedBooking.price}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Огноо цаг</h3>
                  <p><strong>Огноо:</strong> {selectedBooking.date}</p>
                  <p><strong>Цаг:</strong> {selectedBooking.time}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Төлөв</h3>
                  <Badge className={statusConfig[selectedBooking.status as keyof typeof statusConfig].color}>
                    {statusConfig[selectedBooking.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
              </div>
              
              {selectedBooking.notes && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Нэмэлт тэмдэглэл</h3>
                  <p className="bg-gray-50 p-3 rounded-lg">{selectedBooking.notes}</p>
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={() => updateBookingStatus(selectedBooking.id, "confirmed")}
                  className="bg-blue-500 hover:bg-blue-600"
                  disabled={selectedBooking.status === "completed" || selectedBooking.status === "cancelled"}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Баталгаажуулах
                </Button>
                <Button 
                  onClick={() => updateBookingStatus(selectedBooking.id, "completed")}
                  className="bg-green-500 hover:bg-green-600"
                  disabled={selectedBooking.status === "completed" || selectedBooking.status === "cancelled"}
                >
                  Дуусгах
                </Button>
                <Button 
                  onClick={() => updateBookingStatus(selectedBooking.id, "cancelled")}
                  variant="destructive"
                  disabled={selectedBooking.status === "completed" || selectedBooking.status === "cancelled"}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Цуцлах
                </Button>
              </div>
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
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/naraa-salon">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Буцах
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">Захиалгын удирдлага</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Өнөөдрийн захиалга</p>
                    <p className="text-2xl font-bold text-rose-600">{todayBookings}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-rose-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Долоо хоногийн орлого</p>
                    <p className="text-2xl font-bold text-green-600">{weeklyRevenue.toLocaleString()}₮</p>
                  </div>
                  <Clock className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Хүлээгдэж буй</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {bookings.filter(b => b.status === "pending").length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Баталгаажсан</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {bookings.filter(b => b.status === "confirmed").length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Нэр, утас, үйлчилгээгээр хайх..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Төлөвөөр шүүх" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all">Бүгд</SelectItem>
                      <SelectItem value="pending">Хүлээгдэж буй</SelectItem>
                      <SelectItem value="confirmed">Баталгаажсан</SelectItem>
                      <SelectItem value="completed">Дууссан</SelectItem>
                      <SelectItem value="cancelled">Цуцлагдсан</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Захиалгууд ({filteredBookings.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Үйлчлүүлэгч</TableHead>
                    <TableHead>Үйлчилгээ</TableHead>
                    <TableHead>Огноо/Цаг</TableHead>
                    <TableHead>Төлөв</TableHead>
                    <TableHead>Үнэ</TableHead>
                    <TableHead>Үйлдэл</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.customerName}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {booking.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{booking.service}</TableCell>
                      <TableCell>
                        <div>
                          <div>{booking.date}</div>
                          <div className="text-sm text-gray-500">{booking.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig[booking.status as keyof typeof statusConfig].color}>
                          {statusConfig[booking.status as keyof typeof statusConfig].label}
                        </Badge>
                      </TableCell>
                      <TableCell>{booking.price}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {booking.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, "confirmed")}
                              className="bg-blue-500 hover:bg-blue-600"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AdminBookings;
