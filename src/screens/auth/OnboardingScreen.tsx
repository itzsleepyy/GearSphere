import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Switch } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const carInterests = [
  'JDM', 'European', 'American', 'Classic', 'Modern', 'Muscle',
  'Super Cars', 'Hyper Cars', 'Off-road', 'Tuner', 'Drift', 'Track'
];

export default function OnboardingScreen({ navigation }: any) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('English');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [searchRadius, setSearchRadius] = useState('50');
  const [dateRange, setDateRange] = useState('30');
  const [publicProfile, setPublicProfile] = useState(true);
  const [publicGarage, setPublicGarage] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleComplete = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          username,
          location,
          language,
          interests: selectedInterests,
          search_radius: parseInt(searchRadius),
          date_range: parseInt(dateRange),
          public_profile: publicProfile,
          public_garage: publicGarage,
          created_at: new Date(),
          updated_at: new Date()
        });

      if (error) throw error;

      // Navigate to main app after successful onboarding
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error: any) {
      console.error('Error saving profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Basic Information</Text>
            <Text style={styles.stepDescription}>Let's set up your profile</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Choose a username"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="City, Country"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Language</Text>
              <TextInput
                style={styles.input}
                value={language}
                onChangeText={setLanguage}
                placeholder="English"
              />
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Car Interests</Text>
            <Text style={styles.stepDescription}>Select what you're into</Text>
            
            <ScrollView style={styles.interestsContainer}>
              <View style={styles.interestsGrid}>
                {carInterests.map((interest) => (
                  <TouchableOpacity
                    key={interest}
                    style={[
                      styles.interestButton,
                      selectedInterests.includes(interest) && styles.interestButtonSelected
                    ]}
                    onPress={() => toggleInterest(interest)}
                  >
                    <Text
                      style={[
                        styles.interestButtonText,
                        selectedInterests.includes(interest) && styles.interestButtonTextSelected
                      ]}
                    >
                      {interest}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Discovery Preferences</Text>
            <Text style={styles.stepDescription}>How do you want to find events?</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Default Search Radius (miles)</Text>
              <TextInput
                style={styles.input}
                value={searchRadius}
                onChangeText={setSearchRadius}
                keyboardType="numeric"
                placeholder="50"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Default Date Range (days)</Text>
              <TextInput
                style={styles.input}
                value={dateRange}
                onChangeText={setDateRange}
                keyboardType="numeric"
                placeholder="30"
              />
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Privacy Settings</Text>
            <Text style={styles.stepDescription}>Control who sees your information</Text>
            
            <View style={styles.toggleContainer}>
              <View style={styles.toggleItem}>
                <View>
                  <Text style={styles.toggleTitle}>Public Profile</Text>
                  <Text style={styles.toggleDescription}>Allow others to see your profile details</Text>
                </View>
                <Switch
                  value={publicProfile}
                  onValueChange={setPublicProfile}
                  trackColor={{ false: '#767577', true: '#FF5A5F' }}
                  thumbColor={'#f4f3f4'}
                />
              </View>
              
              <View style={styles.toggleItem}>
                <View>
                  <Text style={styles.toggleTitle}>Public Garage</Text>
                  <Text style={styles.toggleDescription}>Allow others to see your vehicles</Text>
                </View>
                <Switch
                  value={publicGarage}
                  onValueChange={setPublicGarage}
                  trackColor={{ false: '#767577', true: '#FF5A5F' }}
                  thumbColor={'#f4f3f4'}
                />
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Step {step} of 4
        </Text>
        <View style={styles.progressBar}>
          {[1, 2, 3, 4].map(i => (
            <View 
              key={i}
              style={[
                styles.progressStep,
                i <= step && styles.progressStepActive
              ]}
            />
          ))}
        </View>
      </View>
      
      {renderStep()}
      
      <View style={styles.buttonsContainer}>
        {step > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        {step < 4 ? (
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.completeButton} 
            onPress={handleComplete}
            disabled={loading}
          >
            <Text style={styles.completeButtonText}>
              {loading ? 'Saving...' : 'Complete'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  progressBar: {
    flexDirection: 'row',
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
  },
  progressStep: {
    flex: 1,
    marginHorizontal: 2,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
  },
  progressStepActive: {
    backgroundColor: '#FF5A5F',
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  interestsContainer: {
    flex: 1,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestButton: {
    width: '48%',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  interestButtonSelected: {
    backgroundColor: '#FFE5E5',
    borderWidth: 1,
    borderColor: '#FF5A5F',
  },
  interestButtonText: {
    fontSize: 16,
    color: '#333',
  },
  interestButtonTextSelected: {
    color: '#FF5A5F',
    fontWeight: 'bold',
  },
  toggleContainer: {
    marginTop: 10,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 14,
    color: '#666',
    width: '80%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },
  backButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});