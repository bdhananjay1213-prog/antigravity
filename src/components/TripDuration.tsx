import { Calendar, Clock, MapPin } from 'lucide-react'

export default function TripDuration({
  days,
  onDaysChange
}: {
  days: number
  onDaysChange: (days: number) => void
}) {
  const suggestions = [
    { days: 1, label: 'Day Trip', desc: 'Quick visit, see main attractions' },
    { days: 2, label: 'Weekend Getaway', desc: 'Relaxed pace, explore more' },
    { days: 3, label: 'Short Vacation', desc: 'Comprehensive experience' },
    { days: 5, label: 'Extended Stay', desc: 'Deep dive into the region' },
  ]

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="h-6 w-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Trip Duration</h2>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How many days are you planning for this trip?
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min="1"
            max="30"
            value={days}
            onChange={(e) => onDaysChange(parseInt(e.target.value) || 1)}
            className="w-24 px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg font-semibold"
          />
          <span className="text-gray-700 font-medium">days</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.days}
            onClick={() => onDaysChange(suggestion.days)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              days === suggestion.days
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Clock className={`h-5 w-5 ${days === suggestion.days ? 'text-primary-600' : 'text-gray-400'}`} />
              <span className={`font-semibold ${days === suggestion.days ? 'text-primary-700' : 'text-gray-700'}`}>
                {suggestion.label}
              </span>
            </div>
            <p className="text-sm text-gray-600">{suggestion.desc}</p>
          </button>
        ))}
      </div>

      {days > 0 && (
        <div className="mt-6 bg-gradient-to-r from-primary-50 to-green-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Your {days}-Day Itinerary Plan:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-primary-600 mt-0.5" />
              <span>Day 1: Arrival and check-in, explore nearby attractions</span>
            </li>
            {days > 1 && (
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary-600 mt-0.5" />
                <span>Day 2-{days - 1}: Visit main destinations and famous spots</span>
              </li>
            )}
            {days > 2 && (
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary-600 mt-0.5" />
                <span>Day {days}: Final exploration and departure</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}




