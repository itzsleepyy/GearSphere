import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// Mock data for events
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Bay Area Car Meet',
    date: 'May 15, 2025',
    time: '6:00 PM - 9:00 PM',
    location: 'San Francisco, CA',
    coordinate: { latitude: 37.7749, longitude: -122.4194 },
    attendees: 124,
    tags: ['JDM', 'European', 'American'],
  },
  {
    id: '2',
    title: 'Classic Car Show',
    date: 'May 22, 2025',
    time: '10:00 AM - 4:00 PM',
    location: 'Oakland, CA',
    coordinate: { latitude: 37.8044, longitude: -122.2711 },
    attendees: 210,
    tags: ['Classic', 'Vintage', 'Restoration'],
  },
  {
    id: '3',
    title: 'Track Day at Sonoma',
    date: 'June 5, 2025',
    time: '8:00 AM - 3:00 PM',
    location: 'Sonoma Raceway, CA',
    coordinate: { latitude: 38.1611, longitude: -122.4547 },
    attendees: 75,
    tags: ['Track', 'Racing', 'Performance'],
  },
  {
    id: '4',
    title: 'Cars & Coffee',
    date: 'May 18, 2025',
    time: '8:00 AM - 11:00 AM',
    location: 'San Jose, CA',
    coordinate: { latitude: 37.3382, longitude: -121.8863 },
    attendees: 95,
    tags: ['Super Cars', 'Coffee', 'Morning'],
  },
  {
    id: '5',
    title: 'Import Showdown',
    date: 'May 25, 2025',
    time: '12:00 PM - 6:00 PM',
    location: 'Santa Clara, CA',
    coordinate: { latitude: 37.3541, longitude: -121.9552 },
    attendees: 150,
    tags: ['JDM', 'Tuner', 'Competition'],
  },
];

export default function MapScreen() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [radius, setRadius] = useState('50');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const allTags = ['JDM', 'European', 'American', 'Classic', 'Modern', 'Super Cars', 
                   'Track', 'Racing', 'Vintage', 'Restoration', 'Performance', 'Coffee',
                   'Morning', 'Tuner', 'Competition'];
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);
  
  const handleMarkerPress = (event: any) => {
    setSelectedEvent(event);
  };
  
  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Filter events based on selected tags
  const filteredEvents = selectedTags.length > 0
    ? MOCK_EVENTS.filter(event => 
        event.tags.some(tag => selectedTags.includes(tag))
      )
    : MOCK_EVENTS;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Map</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="options-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.mapContainer}>
        {location && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            showsUserLocation
          >
            {filteredEvents.map(event => (
              <Marker
                key={event.id}
                coordinate={event.coordinate}
                onPress={() => handleMarkerPress(event)}
              >
                <View style={styles.markerContainer}>
                  <View style={styles.marker}>
                    <Ionicons name="car-sport" size={18} color="#fff" />
                  </View>
                </View>
                
                <Callout tooltip>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{event.title}</Text>
                    <Text style={styles.calloutText}>{event.date}</Text>
                    <Text style={styles.calloutText}>{event.time}</Text>
                    <Text style={styles.calloutAttendees}>
                      {event.attendees} attendees
                    </Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        )}
        
        {selectedEvent && (
          <View style={styles.eventPreview}>
            <View style={styles.eventPreviewHeader}>
              <Text style={styles.eventPreviewTitle}>{selectedEvent.title}</Text>
              <TouchableOpacity
                onPress={() => setSelectedEvent(null)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.eventPreviewDetails}>
              <View style={styles.eventPreviewDetail}>
                <Ionicons name="calendar-outline" size={18} color="#FF5A5F" />
                <Text style={styles.eventPreviewDetailText}>{selectedEvent.date}</Text>
              </View>
              
              <View style={styles.eventPreviewDetail}>
                <Ionicons name="time-outline" size={18} color="#FF5A5F" />
                <Text style={styles.eventPreviewDetailText}>{selectedEvent.time}</Text>
              </View>
              
              <View style={styles.eventPreviewDetail}>
                <Ionicons name="location-outline" size={18} color="#FF5A5F" />
                <Text style={styles.eventPreviewDetailText}>{selectedEvent.location}</Text>
              </View>
              
              <View style={styles.eventPreviewDetail}>
                <Ionicons name="people-outline" size={18} color="#FF5A5F" />
                <Text style={styles.eventPreviewDetailText}>
                  {selectedEvent.attendees} attendees
                </Text>
              </View>
            </View>
            
            <View style={styles.eventPreviewTags}>
              {selectedEvent.tags.map((tag: string) => (
                <View key={tag} style={styles.eventPreviewTag}>
                  <Text style={styles.eventPreviewTagText}>{tag}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.eventPreviewActions}>
              <TouchableOpacity style={styles.eventPreviewActionButton}>
                <Text style={styles.eventPreviewActionButtonText}>View Details</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[
                styles.eventPreviewActionButton, 
                styles.eventPreviewActionButtonPrimary
              ]}>
                <Text style={styles.eventPreviewActionButtonTextPrimary}>
                  RSVP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Map Filters</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Distance</Text>
                <Text style={styles.filterSectionSubtitle}>
                  Show events within {radius} miles
                </Text>
                {/* Distance slider would go here */}
              </View>
              
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Event Tags</Text>
                <View style={styles.filterTags}>
                  {allTags.map(tag => (
                    <TouchableOpacity
                      key={tag}
                      style={[
                        styles.filterTag,
                        selectedTags.includes(tag) && styles.filterTagSelected
                      ]}
                      onPress={() => handleToggleTag(tag)}
                    >
                      <Text
                        style={[
                          styles.filterTagText,
                          selectedTags.includes(tag) && styles.filterTagTextSelected
                        ]}
                      >
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  setRadius('50');
                  setSelectedTags([]);
                }}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  filterButton: {
    padding: 8,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF5A5F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  calloutContainer: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  calloutAttendees: {
    fontSize: 14,
    color: '#FF5A5F',
    marginTop: 5,
  },
  eventPreview: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  eventPreviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  eventPreviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventPreviewDetails: {
    marginBottom: 15,
  },
  eventPreviewDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventPreviewDetailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  eventPreviewTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  eventPreviewTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  eventPreviewTagText: {
    color: '#666',
    fontSize: 12,
  },
  eventPreviewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventPreviewActionButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  eventPreviewActionButtonPrimary: {
    backgroundColor: '#FF5A5F',
    borderColor: '#FF5A5F',
    marginRight: 0,
  },
  eventPreviewActionButtonText: {
    color: '#666',
    fontSize: 14,
  },
  eventPreviewActionButtonTextPrimary: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 25,
  },
  filterSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  filterSectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  filterTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  filterTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  filterTagSelected: {
    backgroundColor: '#FFE5E5',
    borderWidth: 1,
    borderColor: '#FF5A5F',
  },
  filterTagText: {
    fontSize: 14,
    color: '#666',
  },
  filterTagTextSelected: {
    color: '#FF5A5F',
    fontWeight: 'bold',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  resetButton: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  resetButtonText: {
    color: '#666',
    fontSize: 16,
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#FF5A5F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});