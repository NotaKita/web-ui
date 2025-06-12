"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle, FilePlus, BarChart3 } from "lucide-react";
import logo from "../../assets/notakita2.png"


export default function Auth() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #b3c6e6 0%, #e6e6fa 60%, #f8d6e6 100%)"
      }}
    >
      {/* Efek gelombang atas */}
      <svg
        className="absolute top-0 left-0 w-full h-[180px] z-0"
        viewBox="0 0 1440 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 C360,180 1080,0 1440,100 L1440,0 L0,0 Z"
          fill="#4f8edc"
          fillOpacity="0.18"
        />
        <path
          d="M0,120 C400,60 1040,200 1440,80 L1440,0 L0,0 Z"
          fill="#4f8edc"
          fillOpacity="0.12"
        />
      </svg>

      {/* Efek gelombang bawah */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[200px] z-0"
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C400,200 1040,0 1440,120 L1440,200 L0,200 Z"
          fill="#4f8edc"
          fillOpacity="0.18"
        />
        <path
          d="M0,160 C360,60 1080,200 1440,100 L1440,200 L0,200 Z"
          fill="#4f8edc"
          fillOpacity="0.12"
        />
      </svg>

      {/* Gradient warna biru tengah*/}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, #4f8edcbb 0%, #e3f0ff00 80%)",
          filter: "blur(70px)",
          opacity: 0.7,
        }}
      />
      {/* Gradient warna biru muda di kanan */}
      <div
        className="absolute right-0 top-1/3 w-[400px] h-[250px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, #7ecbff88 0%, #e3f0ff00 80%)",
          filter: "blur(60px)",
          opacity: 0.5,
        }}
      />
      {/* Gradient warna merah muda di kiri bawah */}
      <div
        className="absolute left-0 bottom-0 w-[350px] h-[200px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, #ffb6c1aa 0%, #e3f0ff00 80%)",
          filter: "blur(70px)",
          opacity: 0.6,
        }}
      />
      {/* Gradient warna ungu soft di atas */}
      <div
        className="absolute left-1/4 top-0 w-[300px] h-[180px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, #c7b6ff88 0%, #e3f0ff00 80%)",
          filter: "blur(60px)",
          opacity: 0.5,
        }}
      />
      {/* Glassmorphism Card 2 Grid */}
      <div className="backdrop-blur-[32px] bg-white/20 border border-white/80 shadow-2xl shadow-white/30 ring-1 ring-white/40 rounded-[2rem] w-full max-w-[1100px] p-0 flex flex-col md:flex-row-reverse overflow-hidden relative before:content-[''] before:absolute before:inset-0 before:rounded-[2rem] before:pointer-events-none before:shadow-[inset_0_4px_64px_0_rgba(255,255,255,0.45)]">
        {/* Login/Register */}
        <div className="flex-1 flex flex-col justify-center px-20 py-20">
          <CardHeader className="relative text-center pb-6 pt-8">
            <CardTitle className="text-2xl font-semibold text-gray-800 drop-shadow-sm">Welcome Back</CardTitle>
            <CardDescription className="text-gray-800/80 text-base">
              Access your invoice management dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="relative px-8 pb-8">
            <Tabs defaultValue="login" className="w-full">
              {/* Efek Kaca / Glassmorphism */}
              <TabsList className="grid w-full grid-cols-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl p-1 shadow-inner">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400/80 data-[state=active]:to-purple-400/80 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-200/40 data-[state=active]:backdrop-blur-sm text-blue-700 transition-all duration-500 rounded-lg font-medium"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400/80 data-[state=active]:to-purple-400/80 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-200/40 data-[state=active]:backdrop-blur-sm text-blue-700 transition-all duration-500 rounded-lg font-medium"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-5 mt-8 text-blue-900">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-blue-900 font-semibold text-sm">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5 z-10" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="pl-12 pr-4 py-3 bg-white/30 backdrop-blur-xl border border-blue-200/60 focus:border-blue-400/80 focus:ring-2 focus:ring-purple-200/30 text-blue-900 placeholder:text-blue-400/70 rounded-xl shadow-inner transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-blue-900 font-semibold text-sm">
                    Password
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5 z-10" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-12 pr-12 py-3 bg-white/30 backdrop-blur-xl border border-blue-200/60 focus:border-blue-400/80 focus:ring-2 focus:ring-purple-200/30 text-blue-900 placeholder:text-blue-400/70 rounded-xl shadow-inner transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm pt-2">
                  <label className="flex items-center space-x-3 text-blue-900 cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-4 h-4 bg-white/30 backdrop-blur-sm border border-blue-200/60 rounded peer-checked:bg-gradient-to-r peer-checked:from-blue-400 peer-checked:to-purple-400 transition-all duration-300" />
                      <CheckCircle className="absolute inset-0 w-4 h-4 text-blue-500 opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="font-medium">Remember me</span>
                  </label>
                  <button className="text-blue-500 hover:text-purple-700 transition-colors font-medium hover:underline">
                    Forgot password?
                  </button>
                </div>

                <Button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl backdrop-blur-sm">
                  Access Dashboard
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-5 mt-8 text-blue-900">
                <div className="space-y-3">
                  <Label htmlFor="fullName" className="text-blue-900 font-semibold text-sm">
                    Full Name
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5 z-10" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-12 pr-4 py-3 bg-white/30 backdrop-blur-xl border border-blue-200/60 focus:border-blue-400/80 focus:ring-2 focus:ring-purple-200/30 text-blue-900 placeholder:text-blue-400/70 rounded-xl shadow-inner transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="registerEmail" className="text-blue-900 font-semibold text-sm">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5 z-10" />
                      <Input
                        id="registerEmail"
                        type="email"
                        placeholder="Enter your email address"
                        className="pl-12 pr-4 py-3 bg-white/30 backdrop-blur-xl border border-blue-200/60 focus:border-blue-400/80 focus:ring-2 focus:ring-purple-200/30 text-blue-900 placeholder:text-blue-400/70 rounded-xl shadow-inner transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="registerPassword" className="text-blue-900 font-semibold text-sm">
                    Password
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5 z-10" />
                      <Input
                        id="registerPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a secure password"
                        className="pl-12 pr-12 py-3 bg-white/30 backdrop-blur-xl border border-blue-200/60 focus:border-blue-400/80 focus:ring-2 focus:ring-purple-200/30 text-blue-900 placeholder:text-blue-400/70 rounded-xl shadow-inner transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-blue-900 font-semibold text-sm">
                    Confirm Password
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5 z-10" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-12 pr-12 py-3 bg-white/30 backdrop-blur-xl border border-blue-200/60 focus:border-blue-400/80 focus:ring-2 focus:ring-purple-200/30 text-blue-900 placeholder:text-blue-400/70 rounded-xl shadow-inner transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm pt-2">
                  <div className="relative mt-0.5 cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-4 h-4 bg-white/30 backdrop-blur-sm border border-blue-200/60 rounded peer-checked:bg-gradient-to-r peer-checked:from-blue-400 peer-checked:to-purple-400 transition-all duration-300" />
                    <CheckCircle className="absolute inset-0 w-4 h-4 text-blue-500 opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="text-gray-700 leading-relaxed">
                    I agree to the{" "}
                    <button className="text-blue-600 hover:text-purple-700 hover:underline transition-colors font-medium">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button className="text-blue-600 hover:text-purple-700 hover:underline transition-colors font-medium">
                      Privacy Policy
                    </button>
                  </span>
                </div>

                <Button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl backdrop-blur-sm">
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>

            {/* Social Media */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/40" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 py-1 bg-white/25 backdrop-blur-xl text-black rounded-full border border-white/30 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="relative group bg-white/30 backdrop-blur-xl border border-blue-200/60 hover:bg-white/40 text-blue-700 hover:text-purple-700 transition-all duration-300 py-3 rounded-xl font-medium overflow-hidden shadow-md"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <svg className="relative w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="relative">Google</span>
                </Button>

                <Button
                  variant="outline"
                  className="relative group bg-white/30 backdrop-blur-xl border border-blue-200/60 hover:bg-white/40 text-blue-700 hover:text-purple-700 transition-all duration-300 py-3 rounded-xl font-medium overflow-hidden shadow-md"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <svg className="relative w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="relative">Facebook</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
        {/* Logo/Image*/}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-white/20 border-l border-white/30">
          <img src={logo} alt="Logo" className="max-w-[350px] w-full h-auto object-contain drop-shadow-xl mb-6" />
          <div className="text-center">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Invoice Management Platform</h3>
            <div className="flex gap-6 justify-center text-blue-500">
              <div className="flex items-center gap-2">
                <FilePlus className="w-6 h-6" />
                <span className="text-sm font-medium">Create</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span className="text-sm font-medium">Validate</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                <span className="text-sm font-medium">Report</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
