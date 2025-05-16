import { useEffect, useState } from 'react'
import UserService from '../../Services/User'

const Profile = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await UserService.getCurrentUser()
        setUser(res.data)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  if (loading) return <div className="text-center mt-10">Loading...</div>
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>
  if (!user) return null

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
      <div className="flex flex-col items-center">
        <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-blue-500" />
        <h2 className="text-2xl font-bold mb-1">{user.fullName}</h2>
        <p className="text-gray-600 mb-2">@{user.username}</p>
        <p className="text-gray-700 mb-2">{user.email}</p>
        {user.coverImage && (
          <img src={user.coverImage} alt="Cover" className="w-full h-32 object-cover rounded-md mt-4" />
        )}
      </div>
    </div>
  )
}

export default Profile