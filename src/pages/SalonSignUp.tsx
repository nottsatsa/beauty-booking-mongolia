
"use client";
import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import SocialUrlInput from "@/components/SocialUrlInput";
import WorkingHours from "@/components/WorkingHours";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

interface SocialUrl {
  url: string;
  urlName: string;
}

interface WorkingDay {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

interface FormData {
  companyName: string;
  logo: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
  about: string;
  category: string;
  socialUrls: SocialUrl[];
  workingHours: WorkingDay[];
}

const socialUrlSchema = z.object({
  url: z.string().url(),
  urlName: z.string().min(1),
});

const workingDaySchema = z.object({
  day: z.string(),
  isOpen: z.boolean(),
  openTime: z.string(),
  closeTime: z.string(),
});

const formSchema = z
  .object({
    companyName: z.string().min(2, { message: "Нэрээ бүтэн бичнэ үү" }),
    logo: z
      .any()
      .refine((file) => file instanceof File || (file && file.length > 0), {
        message: "Лого зургаа оруулна уу",
      }),
    email: z.string().min(2, { message: "Зөв имэйл оруулна уу" }),
    phoneNumber: z.string().min(8, { message: "Зөв утасны дугаар оруулна уу" }),
    address: z.string().min(10, { message: "Хаягаа бүтэн оруулна уу" }),
    password: z
      .string()
      .min(8, { message: "Нууц үг 8-аас их тэмдэгттэй байх ёстой" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Нууц үг 8-аас их тэмдэгттэй байх ёстой" }),
    about: z.string(),
    category: z.string().min(2, { message: "Төрлөө сонгоно уу" }),
    socialUrls: z.array(socialUrlSchema),
    workingHours: z.array(workingDaySchema),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Нууц үг буруу байна.",
  });

const SalonSignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    logo: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    about: "",
    category: "",
    socialUrls: [],
    workingHours: [],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      logo: undefined,
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
      about: "",
      category: "",
      socialUrls: [],
      workingHours: [],
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "Үсчин",
    "Гоо сайхан",
    "Спа",
    "Эмчилгээний спа",
    "Нүүр будалт",
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSocialUrlsChange = (socialUrls: SocialUrl[]) => {
    setFormData((prev) => ({ ...prev, socialUrls }));
  };

  const handleWorkingHoursChange = (workingHours: WorkingDay[]) => {
    setFormData((prev) => ({ ...prev, workingHours }));
    form.setValue('workingHours', workingHours);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange("logo", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({...values, workingHours: formData.workingHours});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Join Our Beauty Network
          </h1>
          <p className="text-gray-600 text-lg">
            Register your salon and connect with customers in Mongolia
          </p>
        </div>

        <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800">
              Salon Registration
            </CardTitle>
            <CardDescription className="text-gray-600">
              Fill in your salon details to get started
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-5 pb-8"
            >
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Байгууллагын нэр</FormLabel>
                    <FormControl>
                      <Input placeholder="Энд нэрээ оруулна уу" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo"
                render={({ field: { onChange, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Байгууллагын лого</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-between gap-4">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Байгууллагын и-мэйл</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Энд мэйлээ оруулна уу"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Байгууллагын утасны дугаар</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Энд утасны дугаараа оруулна уу"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Байгууллагын хаяг</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Энд хаягаа оруулна уу"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Байгууллагын төрөл</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Төрлөө сонгоно уу" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-between gap-4">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Нууц үг</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Энд нууц үг оруулна уу"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Нууц үг давтах</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Энд нууц үг оруулна уу"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Байгууллагын тухай</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Танай байгууллагын онцлог зүйлсийг дурдана уу."
                        className="min-h-[100px] resize-none focus:border-purple-500 transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialUrls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Сошиал хаяг</FormLabel>
                    <FormControl>
                      <SocialUrlInput
                        socialUrls={formData.socialUrls}
                        onChange={handleSocialUrlsChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workingHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ажиллах цагийн хуваарь</FormLabel>
                    <FormControl>
                      <WorkingHours
                        workingHours={formData.workingHours}
                        onChange={handleWorkingHoursChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
                type="submit"
              >
                Бүртгүүлэх
              </Button>
            </form>
          </Form>
        </Card>

        <div className="text-center mt-6 text-gray-600">
          <p>
            Бүртгэлтэй бол
            <a
              href="#"
              className="text-purple-600 hover:text-purple-700 font-medium ml-1"
            >
              Нэвтрэх
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalonSignUp;
