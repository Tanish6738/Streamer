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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#181A20] to-[#232526]"><span className="text-[#C7C9D3] text-lg">Loading...</span></div>
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#181A20] to-[#232526]"><span className="text-red-400 text-lg font-semibold">{error}</span></div>
  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#181A20] to-[#232526] flex flex-col items-center pt-24 pb-12 px-2">
      <div className="w-full max-w-md bg-[#23272F] rounded-2xl shadow-2xl border border-[#353945] p-8 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center w-full">
          <div className="relative mb-4">
            <img src={user.avatar} alt="Avatar" className="w-28 h-28 rounded-full object-cover border-4 border-[#ff512f] shadow-lg" />
            {user.coverImage && (
              <img src={user.coverImage} alt="Cover" className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-16 object-cover rounded-xl border-2 border-[#353945] shadow-md opacity-80" />
            )}
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-1 tracking-tight drop-shadow">{user.fullName}</h2>
          <p className="text-[#ff512f] font-semibold mb-1">@{user.username}</p>
          <p className="text-[#C7C9D3] mb-2">{user.email}</p>
        </div>
        {user.coverImage && (
          <div className="w-full flex justify-center mt-2">
            <img src={user.coverImage} alt="Cover" className="w-full h-28 object-cover rounded-xl border border-[#353945] shadow" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile