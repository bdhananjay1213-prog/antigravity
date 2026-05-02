import { useState, useEffect } from 'react'
import { AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react'

type TrafficLevel = 'low' | 'moderate' | 'high' | 'heavy'

interface TrafficData {
  level: TrafficLevel
  description: string
  color: string
  icon: React.ReactNode
}

export default function TrafficInfo({ destination }: { destination: string }) {
  const [traffic, setTraffic] = useState<TrafficData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (destination) {
      fetchTraffic()
    }
  }, [destination])

  const fetchTraffic = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      // Randomly determine traffic based on "time of day" simulation
      const hour = new Date().getHours()
      let possibleLevels: TrafficLevel[] = ['low', 'moderate']

      if ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 19)) {
        possibleLevels = ['high', 'heavy', 'moderate']
      } else if (hour > 10 && hour < 17) {
        possibleLevels = ['moderate', 'high']
      }

      const randomLevel = possibleLevels[Math.floor(Math.random() * possibleLevels.length)]
      setTraffic(getTrafficData(randomLevel))
      setLoading(false)
    }, 1500)
  }

  const getTrafficData = (level: TrafficLevel): TrafficData => {
    const trafficData: Record<TrafficLevel, TrafficData> = {
      low: {
        level: 'low',
        description: 'Light traffic, smooth journey expected',
        color: 'green',
        icon: <TrendingDown className="h-6 w-6" />
      },
      moderate: {
        level: 'moderate',
        description: 'Normal traffic conditions',
        color: 'yellow',
        icon: <Minus className="h-6 w-6" />
      },
      high: {
        level: 'high',
        description: 'Heavy traffic, expect delays',
        color: 'orange',
        icon: <TrendingUp className="h-6 w-6" />
      },
      heavy: {
        level: 'heavy',
        description: 'Very heavy traffic, significant delays expected',
        color: 'red',
        icon: <AlertCircle className="h-6 w-6" />
      }
    }
    return trafficData[level]
  }

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'from-green-400 to-green-600',
      yellow: 'from-yellow-400 to-yellow-600',
      orange: 'from-orange-400 to-orange-600',
      red: 'from-red-400 to-red-600'
    }
    return colors[color as keyof typeof colors] || colors.green
  }

  const getBgColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-50 border-green-200',
      yellow: 'bg-yellow-50 border-yellow-200',
      orange: 'bg-orange-50 border-orange-200',
      red: 'bg-red-50 border-red-200'
    }
    return colors[color as keyof typeof colors] || colors.green
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <AlertCircle className="h-6 w-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Traffic Conditions at {destination}</h2>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking traffic...</p>
        </div>
      ) : traffic ? (
        <div className={`rounded-xl p-6 border-2 ${getBgColorClasses(traffic.color)}`}>
          <div className="flex items-center space-x-4">
            <div className={`p-4 rounded-full bg-gradient-to-br ${getColorClasses(traffic.color)} text-white`}>
              {traffic.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-1 capitalize">
                {traffic.level} Traffic
              </h3>
              <p className="text-gray-700">{traffic.description}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t-2 border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Tip:</strong> {traffic.level === 'heavy' || traffic.level === 'high'
                ? 'Consider leaving earlier or using alternative routes to avoid peak traffic hours.'
                : 'Current traffic conditions are favorable for your journey.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Unable to fetch traffic data
        </div>
      )}
    </div>
  )
}

