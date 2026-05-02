# GodsOwnRoute - Your Travel Companion

A comprehensive travel planning app for tourists visiting Kerala, India. This app helps users plan their trips with route navigation, weather forecasts, hotel recommendations, and much more.

## Features

1. **Route Planning** - Shows the best route from current location to destination
2. **Weather Forecast** - Displays weather conditions at the destination
3. **Traffic Information** - Real-time traffic levels at destination
4. **Nearby Places** - Suggests tourist attractions near the destination
5. **Hotel Recommendations** - Finds hotels within 5km of current location and destination
6. **Transport Options** - Choose between own vehicle or public transport (train/bus timings)
7. **Destination Photos** - Shows photos and famous attractions of the destination
8. **Trip Duration Planning** - Organizes itinerary based on trip duration
9. **To-Do List** - Helps users prepare for their trip with a checklist
10. **Beautiful UI** - Colorful, user-friendly interface with blurred backgrounds

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kerala-guide
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (optional, for API integrations):
```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## API Integration

✅ **The app now supports real API integrations!** 

The app will automatically use real APIs when API keys are provided, and fall back to mock data when keys are not available.

### Quick Setup

1. Create a `.env` file in the root directory
2. Add your API keys (see `.env.example`)
3. Restart the development server

For detailed setup instructions, see [API_SETUP.md](./API_SETUP.md)

### APIs Used

- **OpenWeatherMap API** - Weather forecasts
- **Google Maps JavaScript API** - Interactive maps
- **Google Directions API** - Route planning
- **Google Places API** - Nearby places and hotels
- **Google Geocoding API** - Address to coordinates
- **Google Distance Matrix API** - Traffic information

All components automatically detect API keys and use real data when available.

## Project Structure

```
kerala-guide/
├── src/
│   ├── components/       # Reusable components
│   │   ├── WeatherCard.tsx
│   │   ├── RouteMap.tsx
│   │   ├── NearbyPlaces.tsx
│   │   ├── HotelRecommendations.tsx
│   │   ├── TransportOptions.tsx
│   │   ├── DestinationPhotos.tsx
│   │   ├── TripDuration.tsx
│   │   ├── TrafficInfo.tsx
│   │   └── Navigation.tsx
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── TripPlanner.tsx
│   │   └── TodoList.tsx
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Features in Detail

### Route Planning
- Enter current location and destination
- View route on map
- See distance, duration, and route type

### Weather Forecast
- Current temperature
- Weather conditions
- Humidity and wind speed

### Hotel Recommendations
- Hotels within 5km radius
- Ratings and prices
- Amenities and contact information

### Transport Options
- Own vehicle mode
- Public transport with train and bus schedules
- Real-time timing information

### To-Do List
- Add custom items
- Pre-suggested common items
- Progress tracking
- Local storage persistence

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on the repository.

