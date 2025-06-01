import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for vehicles
const MOCK_VEHICLES = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Supra',
    year: '1994',
    image: 'https://images.pexels.com/photos/12801195/pexels-photo-12801195.jpeg',
    mods: ['HKS Exhaust', 'Tein Coilovers', 'Volk TE37 Wheels'],
    public: true,
  },
  {
    id: '2',
    make: 'Nissan',
    model: '240SX',
    year: '1989',
    image: 'https://images.pexels.com/photos/13459817/pexels-photo-13459817.jpeg',
    mods: ['SR20DET Swap', 'Custom Roll Cage', 'Bride Seats'],
    public: true,
  },
];

export default function GarageScreen() {
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showVehicleOptions, setShowVehicleOptions] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [mods, setMods] = useState('');
  
  const handleAddVehicle = () => {
    // In a real app, this would add the vehicle to the database
    setShowAddVehicle(false);
    
    // Reset form
    setMake('');
    setModel('');
    setYear('');
    setIsPublic(true);
    setMods('');
  };

  const handleVehicleOptions = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setShowVehicleOptions(true);
  };

  const handleEditVehicle = () => {
    if (selectedVehicle) {
      Alert.alert(
        "Edit Vehicle",
        `Edit details for your ${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`,
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Edit", 
            onPress: () => {
              // In a real app, this would open the edit form with pre-filled data
              setShowVehicleOptions(false);
              Alert.alert("Edit Vehicle", "Vehicle edit form would open here");
            }
          }
        ]
      );
    }
  };

  const handleViewEvents = () => {
    if (selectedVehicle) {
      setShowVehicleOptions(false);
      Alert.alert("Vehicle Events", "View all events this vehicle has attended");
    }
  };

  const handleViewGallery = () => {
    if (selectedVehicle) {
      setShowVehicleOptions(false);
      Alert.alert("Vehicle Gallery", "View all photos of this vehicle");
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Garage</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddVehicle(true)}
        >
          <Ionicons name="add" size={24} color="#FF5A5F" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.vehiclesContainer}>
        {MOCK_VEHICLES.map(vehicle => (
          <View key={vehicle.id} style={styles.vehicleCard}>
            <Image 
              source={{ uri: vehicle.image }}
              style={styles.vehicleImage}
            />
            
            <View style={styles.vehicleContent}>
              <View style={styles.vehicleHeader}>
                <View>
                  <Text style={styles.vehicleTitle}>
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </Text>
                  {vehicle.public ? (
                    <View style={styles.publicBadge}>
                      <Ionicons name="eye-outline" size={12} color="#fff" />
                      <Text style={styles.publicBadgeText}>Public</Text>
                    </View>
                  ) : (
                    <View style={styles.privateBadge}>
                      <Ionicons name="eye-off-outline" size={12} color="#fff" />
                      <Text style={styles.privateBadgeText}>Private</Text>
                    </View>
                  )}
                </View>
                
                <TouchableOpacity
                  onPress={() => handleVehicleOptions(vehicle)}
                >
                  <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.modsList}>
                <Text style={styles.modsTitle}>Modifications:</Text>
                {vehicle.mods.map((mod, index) => (
                  <View key={index} style={styles.modItem}>
                    <Ionicons name="checkmark-circle-outline" size={16} color="#FF5A5F" />
                    <Text style={styles.modText}>{mod}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.vehicleFooter}>
                <TouchableOpacity 
                  style={styles.vehicleButton}
                  onPress={() => {
                    setSelectedVehicle(vehicle);
                    handleEditVehicle();
                  }}
                >
                  <Ionicons name="pencil-outline" size={16} color="#666" />
                  <Text style={styles.vehicleButtonText}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.vehicleButton}
                  onPress={() => {
                    setSelectedVehicle(vehicle);
                    handleViewEvents();
                  }}
                >
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Text style={styles.vehicleButtonText}>Events</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.vehicleButton}
                  onPress={() => {
                    setSelectedVehicle(vehicle);
                    handleViewGallery();
                  }}
                >
                  <Ionicons name="images-outline" size={16} color="#666" />
                  <Text style={styles.vehicleButtonText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        
        <TouchableOpacity 
          style={styles.addVehicleCard}
          onPress={() => setShowAddVehicle(true)}
        >
          <Ionicons name="add-circle-outline" size={40} color="#FF5A5F" />
          <Text style={styles.addVehicleText}>Add Vehicle</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <Modal
        visible={showAddVehicle}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Vehicle</Text>
              <TouchableOpacity onPress={() => setShowAddVehicle(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Vehicle Details</Text>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Make</Text>
                  <TextInput
                    style={styles.input}
                    value={make}
                    onChangeText={setMake}
                    placeholder="e.g. Toyota"
                  />
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Model</Text>
                  <TextInput
                    style={styles.input}
                    value={model}
                    onChangeText={setModel}
                    placeholder="e.g. Supra"
                  />
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Year</Text>
                  <TextInput
                    style={styles.input}
                    value={year}
                    onChangeText={setYear}
                    placeholder="e.g. 1994"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              
              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Modifications</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={mods}
                  onChangeText={setMods}
                  placeholder="List your modifications, one per line"
                  multiline
                  numberOfLines={4}
                />
              </View>
              
              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Vehicle Images</Text>
                <TouchableOpacity 
                  style={styles.uploadButton}
                  onPress={() => Alert.alert("Upload Images", "Image picker would open here")}
                >
                  <Ionicons name="camera-outline" size={24} color="#FF5A5F" />
                  <Text style={styles.uploadButtonText}>Upload Images</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.formSection}>
                <View style={styles.toggleContainer}>
                  <View>
                    <Text style={styles.formSectionTitle}>Visibility</Text>
                    <Text style={styles.formSectionSubtitle}>
                      Make your vehicle visible to other users
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.visibilityToggle,
                      isPublic && styles.visibilityToggleActive
                    ]}
                    onPress={() => setIsPublic(!isPublic)}
                  >
                    {isPublic && (
                      <Ionicons name="checkmark" size={18} color="#fff" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddVehicle(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddVehicle}
              >
                <Text style={styles.saveButtonText}>Save Vehicle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Vehicle Options Modal */}
      <Modal
        visible={showVehicleOptions}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.optionsModalContainer}>
          <View style={styles.optionsModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Vehicle Options</Text>
              <TouchableOpacity onPress={() => setShowVehicleOptions(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.optionsList}>
              <TouchableOpacity 
                style={styles.optionItem}
                onPress={handleEditVehicle}
              >
                <Ionicons name="pencil-outline" size={24} color="#FF5A5F" />
                <Text style={styles.optionText}>Edit Vehicle</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionItem}
                onPress={handleViewEvents}
              >
                <Ionicons name="calendar-outline" size={24} color="#FF5A5F" />
                <Text style={styles.optionText}>View Vehicle Events</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionItem}
                onPress={handleViewGallery}
              >
                <Ionicons name="images-outline" size={24} color="#FF5A5F" />
                <Text style={styles.optionText}>View Gallery</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => {
                  setShowVehicleOptions(false);
                  Alert.alert("Share Vehicle", "Share this vehicle with your friends");
                }}
              >
                <Ionicons name="share-social-outline" size={24} color="#FF5A5F" />
                <Text style={styles.optionText}>Share Vehicle</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.optionItem, styles.deleteOption]}
                onPress={() => {
                  setShowVehicleOptions(false);
                  Alert.alert(
                    "Delete Vehicle",
                    "Are you sure you want to delete this vehicle?",
                    [
                      { text: "Cancel", style: "cancel" },
                      { 
                        text: "Delete", 
                        style: "destructive",
                        onPress: () => Alert.alert("Deleted", "Vehicle has been deleted")
                      }
                    ]
                  );
                }}
              >
                <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                <Text style={styles.deleteOptionText}>Delete Vehicle</Text>
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
  addButton: {
    padding: 8,
  },
  vehiclesContainer: {
    flex: 1,
    padding: 15,
  },
  vehicleCard: {
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
  vehicleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  vehicleContent: {
    padding: 15,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  vehicleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  publicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  publicBadgeText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  privateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#666',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  privateBadgeText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  modsList: {
    marginBottom: 15,
  },
  modsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  modText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  vehicleFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  vehicleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  vehicleButtonText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 5,
  },
  addVehicleCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 30,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#f0f0f0',
    borderStyle: 'dashed',
  },
  addVehicleText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
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
    height: '90%',
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
  formSection: {
    marginBottom: 25,
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formSectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    color: '#FF5A5F',
    fontSize: 16,
    marginLeft: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  visibilityToggle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  visibilityToggleActive: {
    backgroundColor: '#FF5A5F',
    borderColor: '#FF5A5F',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#FF5A5F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  optionsModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  optionsList: {
    padding: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  deleteOption: {
    borderBottomWidth: 0,
  },
  deleteOptionText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#FF3B30',
  },
});