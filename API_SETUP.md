# API Setup Guide

This guide will help you set up the required APIs for the Kerala Guide app to work with real data.

## Required APIs

1. **OpenWeatherMap API** - For weather data
2. **Google Maps API** - For maps, routes, places, and traffic

## Step 1: OpenWeatherMap API Setup

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API keys section
4. Copy your API key
5. Add it to your `.env` file:
   ```
   VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
   ```

**Free Tier Limits:**
- 60 calls/minute
- 1,000,000 calls/month
- Perfect for development and small apps

## Step 2: Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API** - For interactive maps
   - **Directions API** - For route planning
   - **Places API** - For nearby places and hotels
   - **Geocoding API** - For address to coordinates conversion
   - **Distance Matrix API** - For traffic information

### Enabling APIs:
1. Go to "APIs & Services" > "Library"
2. Search for each API name above
3. Click on each API and click "Enable"

### Creating API Key:
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy your API key
4. (Recommended) Restrict the API key:
   - Click on the API key to edit it
   - Under "API restrictions", select "Restrict key"
   - Choose the APIs you enabled above
   - Under "Application restrictions", you can restrict by HTTP referrer for web apps

5. Add it to your `.env` file:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

**Free Tier Limits:**
- $200 free credit per month
- Maps JavaScript API: Free for 28,000 loads/month
- Directions API: $5 per 1,000 requests
- Places API: $17 per 1,000 requests
- Geocoding API: $5 per 1,000 requests

## Step 3: Environment Variables

Create a `.env` file in the root of your project:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**Important:** 
- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Restart your development server after adding API keys

## Step 4: Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Trip Planner page
3. Enter a destination (e.g., "Munnar, Kerala")
4. The app will automatically use the APIs if keys are configured
5. If APIs are not configured, the app will fall back to mock data

## Troubleshooting

### Weather API Not Working
- Check if your API key is correct
- Verify the API key is active in OpenWeatherMap dashboard
- Check browser console for error messages
- Ensure the location name is valid

### Google Maps Not Loading
- Verify all required APIs are enabled
- Check if API key restrictions allow your domain
- Verify billing is enabled (required even for free tier)
- Check browser console for specific error messages

### Places/Hotels Not Showing
- Ensure Places API is enabled
- Check API key has Places API access
- Verify billing account is set up

### Route Not Displaying
- Ensure Directions API is enabled
- Check if both origin and destination are valid addresses
- Verify the API key has Directions API access

## Cost Management

### Google Maps API Costs
- Set up billing alerts in Google Cloud Console
- Monitor usage in the dashboard
- Consider caching results to reduce API calls
- Use mock data during development

### OpenWeatherMap Costs
- Free tier is usually sufficient for development
- Monitor API usage in dashboard
- Consider caching weather data (updates every 10 minutes)

## Security Best Practices

1. **Restrict API Keys**: Always restrict your Google Maps API key to specific APIs and domains
2. **Use Environment Variables**: Never hardcode API keys in your code
3. **Monitor Usage**: Set up alerts for unusual API usage
4. **Rotate Keys**: Regularly rotate API keys if compromised
5. **Use HTTPS**: Always use HTTPS in production

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify API keys are correct
3. Ensure all APIs are enabled
4. Check API quotas and limits
5. Review API documentation for specific errors




