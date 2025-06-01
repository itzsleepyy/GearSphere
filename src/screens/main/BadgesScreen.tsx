import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for badges
const MOCK_BADGES = [
  {
    id: '1',
    name: 'Car Meet Rookie',
    description: 'Attended your first car meet',
    image: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg',
    date: 'May 2, 2025',
    event: 'Bay Area Car Meet',
    tier: 'Bronze',
  },
  {
    id: '2',
    name: 'Track Day Participant',
    description: 'Attended a track day event',
    image: 'https://images.pexels.com/photos/12801194/pexels-photo-12801194.jpeg',
    date: 'April 15, 2025',
    event: 'Sonoma Track Day',
    tier: 'Silver',
  },
  {
    id: '3',
    name: 'Show Winner',
    description: 'Won an award at a car show',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    date: 'March 22, 2025',
    event: 'Classic Car Show',
    tier: 'Gold',
  },
];

// Mock achievement data
const MOCK_ACHIEVEMENTS = [
  {
    id: '1',
    name: 'Meet Master',
    description: 'Attend 10 car meets',
    progress: 2,
    total: 10,
    reward: 'Gold badge',
  },
  {
    id: '2',
    name: 'Track Enthusiast',
    description: 'Attend 5 track days',
    progress: 1,
    total: 5,
    reward: 'Silver badge',
  },
  {
    id: '3',
    name: 'Car Show Regular',
    description: 'Attend 5 car shows',
    progress: 3,
    total: 5,
    reward: 'Exclusive badge',
  },
];

export default function BadgesScreen() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [showAchievements, setShowAchievements] = useState(false);
  
  const handleShareBadge = () => {
    if (selectedBadge) {
      Alert.alert(
        "Share Badge",
        `Share your "${selectedBadge.name}" badge with friends`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Share", onPress: () => console.log("Share badge:", selectedBadge.name) }
        ]
      );
    }
  };

  const handleViewEvent = () => {
    if (selectedBadge) {
      Alert.alert(
        "View Event",
        `View details for ${selectedBadge.event}`,
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "View", 
            onPress: () => {
              setSelectedBadge(null);
              // In a real app, this would navigate to the event details screen
              console.log("Navigate to event:", selectedBadge.event);
            }
          }
        ]
      );
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Collector Wall</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.achievementsButton}
            onPress={() => setShowAchievements(true)}
          >
            <Ionicons name="trophy-outline" size={22} color="#FF5A5F" />
          </TouchableOpacity>
          
          <View style={styles.viewToggle}>
            <TouchableOpacity 
              style={[
                styles.viewToggleButton,
                viewMode === 'grid' && styles.viewToggleButtonActive
              ]}
              onPress={() => setViewMode('grid')}
            >
              <Ionicons 
                name="grid-outline" 
                size={20} 
                color={viewMode === 'grid' ? '#FF5A5F' : '#666'} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.viewToggleButton,
                viewMode === 'timeline' && styles.viewToggleButtonActive
              ]}
              onPress={() => setViewMode('timeline')}
            >
              <Ionicons 
                name="list-outline" 
                size={20} 
                color={viewMode === 'timeline' ? '#FF5A5F' : '#666'} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {viewMode === 'grid' ? (
        <ScrollView style={styles.badgesContainer}>
          <View style={styles.badgesGrid}>
            {MOCK_BADGES.map(badge => (
              <TouchableOpacity 
                key={badge.id} 
                style={styles.badgeCard}
                onPress={() => setSelectedBadge(badge)}
              >
                <Image 
                  source={{ uri: badge.image }}
                  style={styles.badgeImage}
                />
                <View style={[
                  styles.badgeTier,
                  badge.tier === 'Bronze' && styles.badgeTierBronze,
                  badge.tier === 'Silver' && styles.badgeTierSilver,
                  badge.tier === 'Gold' && styles.badgeTierGold,
                ]}>
                  <Text style={styles.badgeTierText}>{badge.tier}</Text>
                </View>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeDate}>{badge.date}</Text>
              </TouchableOpacity>
            ))}
            
            {/* Empty badge placeholders */}
            {[1, 2, 3, 4, 5].map(placeholder => (
              <View key={`placeholder-${placeholder}`} style={styles.badgePlaceholder}>
                <View style={styles.badgePlaceholderIcon}>
                  <Ionicons name="add" size={30} color="#ddd" />
                </View>
                <Text style={styles.badgePlaceholderText}>Locked</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.timelineContainer}>
          {MOCK_BADGES.map(badge => (
            <TouchableOpacity 
              key={badge.id} 
              style={styles.timelineItem}
              onPress={() => setSelectedBadge(badge)}
            >
              <View style={styles.timelineBadge}>
                <Image 
                  source={{ uri: badge.image }}
                  style={styles.timelineBadgeImage}
                />
                <View style={[
                  styles.timelineBadgeTier,
                  badge.tier === 'Bronze' && styles.badgeTierBronze,
                  badge.tier === 'Silver' && styles.badgeTierSilver,
                  badge.tier === 'Gold' && styles.badgeTierGold,
                ]}>
                  <Text style={styles.badgeTierText}>{badge.tier}</Text>
                </View>
              </View>
              
              <View style={styles.timelineContent}>
                <Text style={styles.timelineBadgeName}>{badge.name}</Text>
                <Text style={styles.timelineBadgeDescription}>{badge.description}</Text>
                <View style={styles.timelineInfo}>
                  <View style={styles.timelineInfoItem}>
                    <Ionicons name="calendar-outline" size={14} color="#666" />
                    <Text style={styles.timelineInfoText}>{badge.date}</Text>
                  </View>
                  <View style={styles.timelineInfoItem}>
                    <Ionicons name="navigate-outline" size={14} color="#666" />
                    <Text style={styles.timelineInfoText}>{badge.event}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      
      <Modal
        visible={!!selectedBadge}
        animationType="slide"
        transparent={true}
      >
        {selectedBadge && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setSelectedBadge(null)}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.badgeDetailContainer}>
                <Image 
                  source={{ uri: selectedBadge.image }}
                  style={styles.badgeDetailImage}
                />
                <View style={[
                  styles.badgeDetailTier,
                  selectedBadge.tier === 'Bronze' && styles.badgeTierBronze,
                  selectedBadge.tier === 'Silver' && styles.badgeTierSilver,
                  selectedBadge.tier === 'Gold' && styles.badgeTierGold,
                ]}>
                  <Text style={styles.badgeTierText}>{selectedBadge.tier}</Text>
                </View>
                
                <Text style={styles.badgeDetailName}>{selectedBadge.name}</Text>
                <Text style={styles.badgeDetailDescription}>
                  {selectedBadge.description}
                </Text>
                
                <View style={styles.badgeDetailInfo}>
                  <View style={styles.badgeDetailInfoItem}>
                    <Ionicons name="calendar-outline" size={18} color="#FF5A5F" />
                    <Text style={styles.badgeDetailInfoText}>
                      Earned on {selectedBadge.date}
                    </Text>
                  </View>
                  
                  <View style={styles.badgeDetailInfoItem}>
                    <Ionicons name="navigate-outline" size={18} color="#FF5A5F" />
                    <Text style={styles.badgeDetailInfoText}>
                      At {selectedBadge.event}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.badgeDetailActions}>
                  <TouchableOpacity 
                    style={styles.badgeDetailAction}
                    onPress={handleShareBadge}
                  >
                    <Ionicons name="share-social-outline" size={20} color="#666" />
                    <Text style={styles.badgeDetailActionText}>Share</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.badgeDetailAction}
                    onPress={handleViewEvent}
                  >
                    <Ionicons name="eye-outline" size={20} color="#666" />
                    <Text style={styles.badgeDetailActionText}>View Event</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </Modal>
      
      <Modal
        visible={showAchievements}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Achievements</Text>
              <TouchableOpacity onPress={() => setShowAchievements(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.achievementsContainer}>
              {MOCK_ACHIEVEMENTS.map(achievement => (
                <View key={achievement.id} style={styles.achievementCard}>
                  <View style={styles.achievementHeader}>
                    <Text style={styles.achievementName}>{achievement.name}</Text>
                    <View style={styles.achievementProgress}>
                      <Text style={styles.achievementProgressText}>
                        {achievement.progress}/{achievement.total}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                  
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBar,
                        { width: `${(achievement.progress / achievement.total) * 100}%` }
                      ]} 
                    />
                  </View>
                  
                  <View style={styles.achievementReward}>
                    <Ionicons name="gift-outline" size={16} color="#FF5A5F" />
                    <Text style={styles.achievementRewardText}>
                      Reward: {achievement.reward}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementsButton: {
    padding: 8,
    marginRight: 10,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 4,
  },
  viewToggleButton: {
    padding: 6,
    borderRadius: 16,
  },
  viewToggleButtonActive: {
    backgroundColor: '#fff',
  },
  badgesContainer: {
    flex: 1,
    padding: 15,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  badgeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  badgeTier: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeTierBronze: {
    backgroundColor: '#CD7F32',
  },
  badgeTierSilver: {
    backgroundColor: '#C0C0C0',
  },
  badgeTierGold: {
    backgroundColor: '#FFD700',
  },
  badgeTierText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  badgeName: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 5,
  },
  badgeDate: {
    fontSize: 12,
    color: '#666',
    padding: 10,
    paddingTop: 0,
  },
  badgePlaceholder: {
    width: '48%',
    height: 200,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#f0f0f0',
    borderStyle: 'dashed',
  },
  badgePlaceholderIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  badgePlaceholderText: {
    fontSize: 14,
    color: '#999',
  },
  timelineContainer: {
    flex: 1,
    padding: 15,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  timelineBadge: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
  },
  timelineBadgeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  timelineBadgeTier: {
    position: 'absolute',
    top: 5,
    right: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  timelineContent: {
    flex: 1,
    justifyContent: 'center',
  },
  timelineBadgeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timelineBadgeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  timelineInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timelineInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  timelineInfoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
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
  badgeDetailContainer: {
    padding: 20,
    alignItems: 'center',
  },
  badgeDetailImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  badgeDetailTier: {
    position: 'absolute',
    top: 30,
    right: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  badgeDetailName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  badgeDetailDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  badgeDetailInfo: {
    width: '100%',
    marginBottom: 30,
  },
  badgeDetailInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeDetailInfoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  badgeDetailActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 20,
  },
  badgeDetailAction: {
    alignItems: 'center',
  },
  badgeDetailActionText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  achievementsContainer: {
    flex: 1,
    padding: 20,
  },
  achievementCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  achievementProgress: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  achievementProgressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 15,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF5A5F',
    borderRadius: 4,
  },
  achievementReward: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementRewardText: {
    fontSize: 14,
    color: '#FF5A5F',
    marginLeft: 5,
  },
});