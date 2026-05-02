# Step-by-Step Guide: How to Add APIs and Run the App

## 📊 Current Status: **MOCK DATA** (Not Real-Time)

**Right now, your app is using MOCK DATA** (fake/sample data for testing). This means:
- ✅ App works immediately without API keys
- ❌ Weather, routes, places are NOT real-time
- ❌ Data is randomly generated for demonstration

**To get REAL-TIME data**, you need to add API keys (see below).

---

## 🚀 Part 1: How to Run the App (Works Right Now!)

### Step 1: Install Dependencies
Open your terminal in the project folder and run:
```bash
npm install
```

### Step 2: Start the App
```bash
npm run dev
```

### Step 3: Open in Browser
You'll see a message like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open `http://localhost:5173/` in your browser.

**✅ The app will work with MOCK DATA immediately!**

---

## 🔑 Part 2: How to Add API Keys (For Real-Time Data)

### Option A: Quick Start (Skip APIs for Now)
**You can skip this and use mock data!** The app works perfectly without API keys.

### Option B: Get Real-Time Data (Recommended for Production)

#### **API 1: OpenWeatherMap (Weather Data)**

1. **Sign Up for Free Account**
   - Go to: https://openweathermap.org/api
   - Click "Sign Up" (top right)
   - Fill in your details
   - Verify your email

2. **Get Your API Key**
   - After login, go to: https://home.openweathermap.org/api_keys
   - You'll see your API key (or click "Create Key")
   - Copy the key (looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

3. **Add to .env File**
   - In your project folder, create a file named `.env`
   - Add this line:
     ```
     VITE_WEATHER_API_KEY=paste_your_key_here
     ```
   - Replace `paste_your_key_here` with your actual key

#### **API 2: Google Maps (Routes, Places, Traffic)**

1. **Create Google Cloud Account**
   - Go to: https://console.cloud.google.com/
   - Sign in with your Google account
   - Accept terms if prompted

2. **Create a Project**
   - Click "Select a project" (top bar)
   - Click "New Project"
   - Name it: "Kerala Guide" (or any name)
   - Click "Create"

3. **Enable Billing** (Required, but free tier available)
   - Go to: https://console.cloud.google.com/billing
   - Click "Link a billing account"
   - Add a payment method (Google gives $200 free credit/month)
   - Link it to your project

4. **Enable Required APIs**
   - Go to: https://console.cloud.google.com/apis/library
   - Search and enable these APIs (one by one):
     - ✅ **Maps JavaScript API** → Click "Enable"
     - ✅ **Directions API** → Click "Enable"
     - ✅ **Places API** → Click "Enable"
     - ✅ **Geocoding API** → Click "Enable"
     - ✅ **Distance Matrix API** → Click "Enable"

5. **Create API Key**
   - Go to: https://console.cloud.google.com/apis/credentials
   - Click "Create Credentials" → "API Key"
   - Copy your API key (looks like: `AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567`)

6. **Add to .env File**
   - Open your `.env` file
   - Add this line:
     ```
     VITE_GOOGLE_MAPS_API_KEY=paste_your_google_key_here
     ```
   - Replace `paste_your_google_key_here` with your actual key

#### **Final .env File Should Look Like:**
```env
VITE_WEATHER_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
VITE_GOOGLE_MAPS_API_KEY=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567
```

---

## 🔄 Part 3: Restart the App (After Adding API Keys)

1. **Stop the server** (Press `Ctrl + C` in terminal)

2. **Start again:**
   ```bash
   npm run dev
   ```

3. **Now the app will use REAL-TIME data!** 🎉

---

## ✅ How to Check if It's Real-Time or Mock Data

### **Mock Data (No API Keys):**
- Weather shows random temperatures
- Routes show fake distances
- Places are hardcoded examples
- Traffic is randomly generated

### **Real-Time Data (With API Keys):**
- Weather shows actual current weather
- Routes show real Google Maps routes
- Places are actual nearby attractions
- Traffic shows real-time conditions

**Check the browser console (F12) for API calls to verify!**

---

## 📝 Quick Reference

### Run App (Mock Data):
```bash
npm install
npm run dev
```

### Run App (Real-Time Data):
```bash
# 1. Create .env file with API keys
# 2. Then run:
npm run dev
```

### Stop App:
Press `Ctrl + C` in terminal

---

## 🆘 Troubleshooting

### App Won't Start?
- Make sure you ran `npm install` first
- Check if Node.js is installed: `node --version`

### APIs Not Working?
- Check `.env` file exists in root folder
- Make sure API keys are correct (no spaces)
- Restart the server after adding keys
- Check browser console (F12) for errors

### Still Using Mock Data?
- Verify `.env` file is in the root folder (same level as `package.json`)
- Make sure keys start with `VITE_`
- Restart the development server

---

## 💡 Pro Tips

1. **Start with Mock Data**: Test the app first, then add APIs
2. **Free Tiers Available**: Both APIs have generous free tiers
3. **Development**: Mock data is perfect for development
4. **Production**: Add API keys for real users

---

## 📞 Need Help?

- Check `API_SETUP.md` for detailed API setup
- Check browser console (F12) for error messages
- Verify API keys are active in their dashboards




