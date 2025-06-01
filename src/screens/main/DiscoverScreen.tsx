import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  useAnimatedGestureHandler,
  runOnJS 
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

// Mock data for events
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Bay Area Car Meet',
    date: 'May 15, 2025',
    time: '6:00 PM - 9:00 PM',
    location: 'San Francisco, CA',
    image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg',
    attendees: 124,
    distance: '5 miles away',
    tags: ['JDM', 'European', 'American'],
  },
  {
    id: '2',
    title: 'Classic Car Show',
    date: 'May 22, 2025',
    time: '10:00 AM - 4:00 PM',
    location: 'Oakland, CA',
    image: 'https://images.pexels.com/photos/2834653/pexels-photo-2834653.jpeg',
    attendees: 210,
    distance: '12 miles away',
    tags: ['Classic', 'Vintage', 'Restoration'],
  },
  {
    id: '3',
    title: 'Track Day at Sonoma',
    date: 'June 5, 2025',
    time: '8:00 AM - 3:00 PM',
    location: 'Sonoma Raceway, CA',
    image: 'https://images.pexels.com/photos/9460497/pexels-photo-9460497.jpeg',
    attendees: 75,
    distance: '45 miles away',
    tags: ['Track', 'Racing', 'Performance'],
  },
];

export default function DiscoverScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [radius, setRadius] = useState('50');
  const [dateRange, setDateRange] = useState('30');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [garageMatch, setGarageMatch] = useState(false);
  
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  
  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  const nextCard = () => {
    if (currentIndex < MOCK_EVENTS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the first event
    }
    translateX.value = 0;
    rotation.value = 0;
    scale.value = 1;
  };
  
  const handleSwipeLeft = () => {
    translateX.value = withSpring(-300);
    rotation.value = withSpring(-30);
    scale.value = withSpring(0.8);
    
    setTimeout(() => {
      nextCard();
    }, 300);
  };
  
  const handleSwipeRight = () => {
    translateX.value = withSpring(300);
    rotation.value = withSpring(30);
    scale.value = withSpring(0.8);
    
    setTimeout(() => {
      nextCard();
    }, 300);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx: any) => {
      translateX.value = ctx.startX + event.translationX;
      // Calculate rotation based on swipe distance (max 30 degrees)
      rotation.value = (event.translationX / 10) * 3;
      // Slightly reduce scale as card is swiped
      scale.value = Math.max(0.85, 1 - Math.abs(event.translationX) / 1000);
    },
    onEnd: (event) => {
      if (event.translationX > 100) {
        // Swiped right far enough
        translateX.value = withSpring(500);
        rotation.value = withSpring(30);
        scale.value = withSpring(0.8);
        runOnJS(nextCard)();
      } else if (event.translationX < -100) {
        // Swiped left far enough
        translateX.value = withSpring(-500);
        rotation.value = withSpring(-30);
        scale.value = withSpring(0.8);
        runOnJS(nextCard)();
      } else {
        // Not swiped far enough, return to center
        translateX.value = withSpring(0);
        rotation.value = withSpring(0);
        scale.value = withSpring(1);
      }
    },
  });
  
  const currentEvent = MOCK_EVENTS[currentIndex];
  
  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleInfoPress = () => {
    setShowEventDetails(true);
  };

  const handleSharePress = () => {
    Alert.alert(
      "Share Event",
      `Share ${currentEvent.title} with friends`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Share", onPress: () => console.log("Share event:", currentEvent.title) }
      ]
    );
  };
  
  const allTags = ['JDM', 'European', 'American', 'Classic', 'Modern', 'Super Cars', 
                   'Track', 'Racing', 'Vintage', 'Restoration', 'Performance'];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="options-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardContainer}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.card, cardStyle]}>
            <Image 
              source={{ uri: currentEvent.image }}
              style={styles.cardImage}
            />
            <View style={styles.cardOverlay}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{currentEvent.title}</Text>
                <View style={styles.cardInfo}>
                  <View style={styles.cardInfoItem}>
                    <Ionicons name="calendar-outline" size={18} color="#fff" />
                    <Text style={styles.cardInfoText}>{currentEvent.date}</Text>
                  </View>
                  <View style={styles.cardInfoItem}>
                    <Ionicons name="time-outline" size={18} color="#fff" />
                    <Text style={styles.cardInfoText}>{currentEvent.time}</Text>
                  </View>
                  <View style={styles.cardInfoItem}>
                    <Ionicons name="location-outline" size={18} color="#fff" />
                    <Text style={styles.cardInfoText}>{currentEvent.location}</Text>
                  </View>
                  <View style={styles.cardInfoItem}>
                    <Ionicons name="people-outline" size={18} color="#fff" />
                    <Text style={styles.cardInfoText}>{currentEvent.attendees} attendees</Text>
                  </View>
                  <View style={styles.cardInfoItem}>
                    <Ionicons name="navigate-outline" size={18} color="#fff" />
                    <Text style={styles.cardInfoText}>{currentEvent.distance}</Text>
                  </View>
                </View>
                
                <View style={styles.tagsContainer}>
                  {currentEvent.tags.map(tag => (
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButtonSecondary}
          onPress={handleInfoPress}
        >
          <Ionicons name="information-circle-outline" size={28} color="#FF5A5F" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.actionButtonNo]}
          onPress={handleSwipeLeft}
        >
          <Ionicons name="close" size={32} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.actionButtonYes]}
          onPress={handleSwipeRight}
        >
          <Ionicons name="checkmark" size={32} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButtonSecondary}
          onPress={handleSharePress}
        >
          <Ionicons name="share-outline" size={28} color="#FF5A5F" />
        </TouchableOpacity>
      </View>
      
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Discovery Filters</Text>
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
                <Text style={styles.filterSectionTitle}>Date Range</Text>
                <Text style={styles.filterSectionSubtitle}>
                  Show events in the next {dateRange} days
                </Text>
                {/* Date range slider would go here */}
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
              
              <View style={styles.filterSection}>
                <View style={styles.garageMatchContainer}>
                  <View>
                    <Text style={styles.filterSectionTitle}>Garage Match</Text>
                    <Text style={styles.filterSectionSubtitle}>
                      Only show events that match your garage
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.garageMatchButton,
                      garageMatch && styles.garageMatchButtonSelected
                    ]}
                    onPress={() => setGarageMatch(!garageMatch)}
                  >
                    {garageMatch && (
                      <Ionicons name="checkmark" size={18} color="#fff" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  setRadius('50');
                  setDateRange('30');
                  setSelectedTags([]);
                  setGarageMatch(false);
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

      {/* Event Details Modal */}
      <Modal
        visible={showEventDetails}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{currentEvent.title}</Text>
              <TouchableOpacity onPress={() => setShowEventDetails(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <Image 
                source={{ uri: currentEvent.image }}
                style={styles.eventDetailImage}
              />
              
              <View style={styles.eventDetailSection}>
                <View style={styles.eventDetailItem}>
                  <Ionicons name="calendar-outline" size={22} color="#FF5A5F" />
                  <Text style={styles.eventDetailText}>{currentEvent.date}</Text>
                </View>
                
                <View style={styles.eventDetailItem}>
                  <Ionicons name="time-outline" size={22} color="#FF5A5F" />
                  <Text style={styles.eventDetailText}>{currentEvent.time}</Text>
                </View>
                
                <View style={styles.eventDetailItem}>
                  <Ionicons name="location-outline" size={22} color="#FF5A5F" />
                  <Text style={styles.eventDetailText}>{currentEvent.location}</Text>
                </View>
                
                <View style={styles.eventDetailItem}>
                  <Ionicons name="people-outline" size={22} color="#FF5A5F" />
                  <Text style={styles.eventDetailText}>{currentEvent.attendees} attendees</Text>
                </View>
              </View>
              
              <View style={styles.eventDetailSection}>
                <Text style={styles.eventDetailSectionTitle}>Tags</Text>
                <View style={styles.eventDetailTags}>
                  {currentEvent.tags.map(tag => (
                    <View key={tag} style={styles.eventDetailTag}>
                      <Text style={styles.eventDetailTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.eventDetailSection}>
                <Text style={styles.eventDetailSectionTitle}>Description</Text>
                <Text style={styles.eventDetailDescription}>
                  Join us for an amazing car event with enthusiasts from all over the region. 
                  Bring your ride and share your passion with fellow car lovers!
                </Text>
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => setShowEventDetails(false)}
              >
                <Text style={styles.resetButtonText}>Close</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  Alert.alert("RSVP", "You've successfully RSVP'd to this event!");
                  setShowEventDetails(false);
                }}
              >
                <Text style={styles.applyButtonText}>RSVP</Text>
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
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardContent: {
    width: '100%',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  cardInfo: {
    marginBottom: 15,
  },
  cardInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardInfoText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonNo: {
    backgroundColor: '#FD5D5D',
  },
  actionButtonYes: {
    backgroundColor: '#75D701',
  },
  actionButtonSecondary: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF5A5F',
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
    height: '80%',
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
  garageMatchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  garageMatchButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  garageMatchButtonSelected: {
    backgroundColor: '#FF5A5F',
    borderColor: '#FF5A5F',
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
  eventDetailImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  eventDetailSection: {
    marginBottom: 20,
  },
  eventDetailSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventDetailText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  eventDetailTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  eventDetailTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  eventDetailTagText: {
    color: '#666',
    fontSize: 14,
  },
  eventDetailDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});