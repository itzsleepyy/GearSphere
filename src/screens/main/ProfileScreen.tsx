import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const [publicProfile, setPublicProfile] = useState(true);
  const [publicGarage, setPublicGarage] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEditProfile = () => {
    Alert.alert(
      "Edit Profile",
      "Would you like to edit your profile?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Edit", onPress: () => console.log("Edit profile") }
      ]
    );
  };

  const handleChangeProfilePhoto = () => {
    Alert.alert(
      "Change Profile Photo",
      "Would you like to change your profile photo?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Take Photo", onPress: () => console.log("Take photo") },
        { text: "Choose from Library", onPress: () => console.log("Choose from library") }
      ]
    );
  };

  const handleOpenSettings = () => {
    Alert.alert(
      "Settings",
      "Would you like to open app settings?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open", onPress: () => console.log("Open settings") }
      ]
    );
  };

  const handleViewEvent = () => {
    Alert.alert(
      "View Event",
      "Navigate to event details",
      [
        { text: "Cancel", style: "cancel" },
        { text: "View", onPress: () => console.log("View event details") }
      ]
    );
  };

  const handleViewAllEvents = () => {
    Alert.alert(
      "View All Events",
      "Navigate to all events",
      [
        { text: "Cancel", style: "cancel" },
        { text: "View", onPress: () => console.log("View all events") }
      ]
    );
  };
  
  // Mock data for user stats
  const userStats = {
    eventsAttended: 12,
    badgesEarned: 3,
    vehiclesInGarage: 2,
    following: 24,
    followers: 18
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleOpenSettings}>
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.profileHeader}>
          <TouchableOpacity 
            style={styles.profileImageContainer}
            onPress={handleChangeProfilePhoto}
          >
            <View style={styles.profileImage}>
              <Ionicons name="person" size={50} color="#fff" />
            </View>
            <TouchableOpacity 
              style={styles.editProfileImageButton}
              onPress={handleChangeProfilePhoto}
            >
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>JDM_Enthusiast</Text>
            <Text style={styles.profileLocation}>San Francisco, CA</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{userStats.eventsAttended}</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.stat}>
            <Text style={styles.statValue}>{userStats.badgesEarned}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.stat}>
            <Text style={styles.statValue}>{userStats.vehiclesInGarage}</Text>
            <Text style={styles.statLabel}>Vehicles</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.stat}>
            <Text style={styles.statValue}>{userStats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.stat}>
            <Text style={styles.statValue}>{userStats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity 
            style={styles.upcomingEvent}
            onPress={handleViewEvent}
          >
            <View style={styles.upcomingEventDate}>
              <Text style={styles.upcomingEventDay}>15</Text>
              <Text style={styles.upcomingEventMonth}>May</Text>
            </View>
            
            <View style={styles.upcomingEventDetails}>
              <Text style={styles.upcomingEventTitle}>Bay Area Car Meet</Text>
              <Text style={styles.upcomingEventLocation}>San Francisco, CA</Text>
              <Text style={styles.upcomingEventTime}>6:00 PM - 9:00 PM</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.upcomingEventAction}
              onPress={handleViewEvent}
            >
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={handleViewAllEvents}
          >
            <Text style={styles.viewAllButtonText}>View All Events</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingTitle}>Public Profile</Text>
              <Text style={styles.settingDescription}>Allow others to see your profile</Text>
            </View>
            <Switch
              value={publicProfile}
              onValueChange={setPublicProfile}
              trackColor={{ false: '#767577', true: '#FF5A5F' }}
              thumbColor={'#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingTitle}>Public Garage</Text>
              <Text style={styles.settingDescription}>Allow others to see your vehicles</Text>
            </View>
            <Switch
              value={publicGarage}
              onValueChange={setPublicGarage}
              trackColor={{ false: '#767577', true: '#FF5A5F' }}
              thumbColor={'#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingDescription}>Receive event and social updates</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: '#FF5A5F' }}
              thumbColor={'#f4f3f4'}
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <Ionicons name="log-out-outline" size={20} color="#FF5A5F" />
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF5A5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfileImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#666',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileLocation: {
    fontSize: 14,
    color: '#666',
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  editProfileButtonText: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  upcomingEvent: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  upcomingEventDate: {
    width: 50,
    height: 50,
    backgroundColor: '#FF5A5F',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  upcomingEventDay: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  upcomingEventMonth: {
    color: '#fff',
    fontSize: 12,
  },
  upcomingEventDetails: {
    flex: 1,
  },
  upcomingEventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  upcomingEventLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  upcomingEventTime: {
    fontSize: 14,
    color: '#666',
  },
  upcomingEventAction: {
    alignSelf: 'center',
  },
  viewAllButton: {
    alignItems: 'center',
    padding: 10,
  },
  viewAllButtonText: {
    color: '#FF5A5F',
    fontSize: 14,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    width: '80%',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#FF5A5F',
    borderRadius: 10,
    marginBottom: 30,
  },
  signOutButtonText: {
    color: '#FF5A5F',
    fontSize: 16,
    marginLeft: 10,
  },
});