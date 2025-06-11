"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from "lucide-react";
import logo from "../../assets/notakita.png"


export default function Auth() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#ecbb6b] via-[#f8d290] to-[#F8F3E8] items-center justify-center relative">
      {/* Glassmorphism Card 2 Grid */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl rounded-2xl w-full max-w-6xl p-0 flex flex-col md:flex-row overflow-hidden">
        {/* Login/Register */}
        <div className="flex-1 flex flex-col justify-center">
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
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500/90 data-[state=active]:to-yellow-600/90 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:backdrop-blur-sm transition-all duration-500 rounded-lg font-medium"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500/90 data-[state=active]:to-yellow-600/90 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:backdrop-blur-sm transition-all duration-500 rounded-lg font-medium"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-5 mt-8">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-800 font-semibold text-sm">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5 z-10" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="pl-12 pr-4 py-3 bg-white/30 backdrop-blur-xl border border-white/40 focus:border-yellow-400/60 focus:ring-2 focus:ring-red-400/20 text-gray-800 placeholder:text-black-400/70 rounded-xl shadow-inner transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-gray-800 font-semibold text-sm">
                    Password
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5 z-10" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-12 pr-12 py-3 bg-white/30 backdrop-blur-xl border border-white/40 focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/20 text-yellow-800 placeholder:text-black-400/70 rounded-xl shadow-inner transition-all duration-300"
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
                  <label className="flex items-center space-x-3 text-yellow-700 cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-4 h-4 bg-white/30 backdrop-blur-sm border border-white/40 rounded peer-checked:bg-gradient-to-r peer-checked:from-gray-500 peer-checked:to-gray-600 transition-all duration-300" />
                      <CheckCircle className="absolute inset-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="font-medium">Remember me</span>
                  </label>
                  <button className="text-yellow-600 hover:text-yellow-800 transition-colors font-medium hover:underline">
                    Forgot password?
                  </button>
                </div>

                <Button className="w-full mt-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl backdrop-blur-sm">
                  Access Dashboard
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-5 mt-8">
                <div className="space-y-3">
                  <Label htmlFor="fullName" className="text-gray-800 font-semibold text-sm">
                    Full Name
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5 z-10" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-12 pr-4 py-3 bg-white/30 backdrop-blur-xl border border-white/40 focus:border-black-400/60 focus:ring-2 focus:ring-black-400/20 text-black-800 placeholder:text-black-400/70 rounded-xl shadow-inner transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="registerEmail" className="text-gray-800 font-semibold text-sm">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5 z-10" />
                      <Input
                        id="registerEmail"
                        type="email"
                        placeholder="Enter your email address"
                        className="pl-12 pr-4 py-3 bg-white/30 backdrop-blur-xl border border-white/40 focus:border-black-400/60 focus:ring-2 focus:ring-black-400/20 text-black-800 placeholder:text-black-400/70 rounded-xl shadow-inner transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="registerPassword" className="text-gray-800 font-semibold text-sm">
                    Password
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5 z-10" />
                      <Input
                        id="registerPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a secure password"
                        className="pl-12 pr-12 py-3 bg-white/30 backdrop-blur-xl border border-white/40 focus:border-black-400/60 focus:ring-2 focus:ring-red-400/20 text-black-800 placeholder:text-black-400/70 rounded-xl shadow-inner transition-all duration-300"
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
                  <Label htmlFor="confirmPassword" className="text-gray-800 font-semibold text-sm">
                    Confirm Password
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5 z-10" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-12 pr-12 py-3 bg-white/30 backdrop-blur-xl border border-white/40 focus:border-black-400/60 focus:ring-2 focus:ring-yellow-400/20 text-black-800 placeholder:text-black-400/70 rounded-xl shadow-inner transition-all duration-300"
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
                  <div className="relative mt-0.5">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-4 h-4 bg-white/30 backdrop-blur-sm border border-white/40 rounded peer-checked:bg-gradient-to-r peer-checked:from-gray-500 peer-checked:to-gray-600 transition-all duration-300" />
                    <CheckCircle className="absolute inset-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="text-gray-700 leading-relaxed">
                    I agree to the{" "}
                    <button className="text-red-600 hover:text-gray-800 underline transition-colors font-medium">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button className="text-red-600 hover:text-red-800 underline transition-colors font-medium">
                      Privacy Policy
                    </button>
                  </span>
                </div>

                <Button className="w-full mt-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl backdrop-blur-sm">
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
                  className="relative group bg-white/25 backdrop-blur-xl border border-white/40 hover:bg-white/35 text-black hover:text-yellow-800 transition-all duration-300 py-3 rounded-xl font-medium overflow-hidden"
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
                  className="relative group bg-white/25 backdrop-blur-xl border border-white/40 hover:bg-white/35 text-black hover:text-gray-800 transition-all duration-300 py-3 rounded-xl font-medium overflow-hidden"
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
        {/* Logo/Image */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-white/20 border-l border-white/30">
          <img src={logo} alt="Logo" className="max-w-[350px] w-full h-auto object-contain drop-shadow-xl" />
        </div>
      </div>
    </div>
  )
}
