# GearSphere

GearSphere is a mobile-first app that redefines how car enthusiasts discover and connect with automotive events. From car meets and shows to race weekends, GearSphere combines swipe-based discovery, personalized recommendations, social features, and gamified attendance tracking to create the world's most engaging car culture platform.

## Features (MVP)

- **User Onboarding**: Account creation via Email, profile setup with car interests
- **Swipe-Based Event Discovery**: Swipe left/right to explore nearby events
- **Map View (Explore Mode)**: Interactive event map with filters
- **Event Profile Pages**: Event details, attendees, and RSVP options
- **Garage Profiles**: Add multiple vehicles with details and images
- **Collector Wall & Badging**: Earn digital badges for attending events

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase (Authentication, Database, Storage)
- **Maps**: React Native Maps (Google Maps)
- **Other**: Expo Location, React Navigation

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the app: `npm run start`

## Project Structure

- `/src/screens`: All app screens organized by auth and main flows
- `/src/components`: Reusable UI components
- `/src/contexts`: Context providers (Auth)
- `/src/lib`: Utility functions and API clients
- `/src/navigation`: Navigation configuration

## Database Schema

The app requires the following tables in Supabase:

- **profiles**: User profiles with preferences
- **vehicles**: User's vehicles/garage
- **events**: Car events with details
- **attendees**: Event attendance records
- **badges**: Achievement badges

## Future Enhancements

- AI-Powered Event Matching
- Social Layer (follows, group chats)
- Live Event Feed
- Verified Organiser System
- Ratings & Trust System
- Media Integration
- Marketplace