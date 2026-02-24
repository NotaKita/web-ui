"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Lock, User, Eye, EyeOff, CheckCircle, FilePlus, BarChart3 } from "lucide-react";
import logo from "../../assets/notakita2.png"
import { authAPI } from "@/lib/api"


export default function Auth() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Login form
  const [loginUsername, setLoginUsername] = useState('admin')
  const [loginPassword, setLoginPassword] = useState('admin123')

  // Register form
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await authAPI.login(loginUsername, loginPassword)
      
      if (response.success && response.data?.token) {
        localStorage.setItem('auth_token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/dasboard')
      } else {
        setError(response.message || 'Login failed')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (registerPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      const response = await authAPI.register(registerUsername, registerPassword)
      
      if (response.success && response.data?.token) {
        localStorage.setItem('auth_token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/dasboard')
      } else {
        setError(response.message || 'Registration failed')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

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
            <Tabs value={mode} onValueChange={(v) => setMode(v as 'login' | 'register')} className="w-full">
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
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-3">
                    <Label htmlFor="username" className="text-blue-900 font-semibold text-sm">
                      Username
                    </Label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5 z-10" />
                        <Input
                          id="username"
                          type="text"
                          placeholder="Enter your username"
                          value={loginUsername}
                          onChange={(e) => setLoginUsername(e.target.value)}
                          disabled={isLoading}
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
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          disabled={isLoading}
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

                  {error && <p className="text-sm text-red-500">{error}</p>}

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Logging in...' : 'Access Dashboard'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-5 mt-8 text-blue-900">
                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="space-y-3">
                    <Label htmlFor="registerUsername" className="text-blue-900 font-semibold text-sm">
                      Username
                    </Label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5 z-10" />
                        <Input
                          id="registerUsername"
                          type="text"
                          placeholder="Choose a username"
                          value={registerUsername}
                          onChange={(e) => setRegisterUsername(e.target.value)}
                          disabled={isLoading}
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
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          disabled={isLoading}
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
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          disabled={isLoading}
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

                  {error && <p className="text-sm text-red-500">{error}</p>}

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
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
