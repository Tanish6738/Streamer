
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import UserService from '../../Services/User'
import type { LoginUserData } from '../../Services/User'

const LoginForm = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<LoginUserData>({
    email: '',
    password: ''
  })
  const [loginMethod, setLoginMethod] = useState<'email' | 'username'>('email')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {      // Prepare login data based on selected method
      const loginData: LoginUserData = {
        password: formData.password
      }
      
      if (loginMethod === 'email') {
        loginData.email = formData.email
      } else {
        loginData.username = formData.email // Using email field for username too
      }

      // Call login service
      await UserService.loginUser(loginData)
      
      // Redirect on success
      navigate('/profile')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleLoginMethod = () => {
    setLoginMethod(prev => prev === 'email' ? 'username' : 'email')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {loginMethod === 'email' ? 'Email' : 'Username'}
            </label>
            <button 
              type="button" 
              onClick={toggleLoginMethod} 
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Use {loginMethod === 'email' ? 'username' : 'email'} instead
            </button>
          </div>
          <input
            type={loginMethod === 'email' ? 'email' : 'text'}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={loginMethod === 'email' ? 'you@example.com' : 'username'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <a href="#" className="text-xs text-blue-600 hover:text-blue-800">
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm