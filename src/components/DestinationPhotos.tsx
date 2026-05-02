import { useState, useEffect } from 'react'
import { Camera, Star } from 'lucide-react'

interface Attraction {
  name: string
  description: string
  image: string
  rating: number
}

export default function DestinationPhotos({ destination }: { destination: string }) {
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (destination) {
      fetchAttractions()
    }
  }, [destination])

  const fetchAttractions = async () => {
    setLoading(true)
    try {
      // Mock data - In production, use Google Places API or Unsplash API for images
      setTimeout(() => {
        const mockAttractions: Attraction[] = [
          {
            name: 'Tea Plantations',
            description: 'Beautiful rolling hills covered with tea gardens, a must-visit for nature lovers',
            image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800',
            rating: 4.8
          },
          {
            name: 'Waterfalls',
            description: 'Stunning waterfalls surrounded by lush greenery, perfect for photography',
            image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800',
            rating: 4.7
          },
          {
            name: 'Wildlife Sanctuary',
            description: 'Home to diverse flora and fauna, ideal for wildlife enthusiasts',
            image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
            rating: 4.6
          },
          {
            name: 'Heritage Sites',
            description: 'Rich cultural heritage with ancient temples and traditional architecture',
            image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800',
            rating: 4.9
          },
        ]
        setAttractions(mockAttractions)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching attractions:', error)
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Camera className="h-6 w-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Famous Attractions at {destination}</h2>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading attractions...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {attractions.map((attraction, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-200 to-green-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-16 w-16 text-white/50" />
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">{attraction.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{attraction.name}</h3>
                <p className="text-gray-600">{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}




