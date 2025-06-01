import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface LoadingSkeletonProps {
  height?: number;
  width?: string | number;
  borderRadius?: number;
  marginBottom?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  height = 20,
  width = '100%',
  borderRadius = 4,
  marginBottom = 8
}) => {
  return (
    <View
      style={[
        styles.skeleton,
        {
          height,
          width,
          borderRadius,
          marginBottom
        }
      ]}
    />
  );
};

interface CardSkeletonProps {
  showImage?: boolean;
  lines?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  showImage = true,
  lines = 3
}) => {
  return (
    <View style={styles.cardSkeleton}>
      {showImage && (
        <LoadingSkeleton height={200} borderRadius={8} marginBottom={12} />
      )}
      {Array.from({ length: lines }).map((_, index) => (
        <LoadingSkeleton
          key={index}
          height={16}
          width={index === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </View>
  );
};

interface EventCardSkeletonProps {}

export const EventCardSkeleton: React.FC<EventCardSkeletonProps> = () => {
  return (
    <View style={styles.eventCardSkeleton}>
      <LoadingSkeleton height={250} borderRadius={12} marginBottom={16} />
      <LoadingSkeleton height={24} width="80%" marginBottom={8} />
      <LoadingSkeleton height={16} width="60%" marginBottom={8} />
      <LoadingSkeleton height={16} width="70%" marginBottom={16} />
      
      <View style={styles.tagsRow}>
        <LoadingSkeleton height={28} width={60} borderRadius={14} marginBottom={0} />
        <LoadingSkeleton height={28} width={80} borderRadius={14} marginBottom={0} />
        <LoadingSkeleton height={28} width={70} borderRadius={14} marginBottom={0} />
      </View>
    </View>
  );
};

interface VehicleCardSkeletonProps {}

export const VehicleCardSkeleton: React.FC<VehicleCardSkeletonProps> = () => {
  return (
    <View style={styles.vehicleCardSkeleton}>
      <LoadingSkeleton height={180} borderRadius={8} marginBottom={12} />
      <LoadingSkeleton height={20} width="70%" marginBottom={8} />
      <LoadingSkeleton height={16} width="50%" marginBottom={12} />
      
      <View style={styles.modsSection}>
        <LoadingSkeleton height={14} width="40%" marginBottom={6} />
        <LoadingSkeleton height={14} width="60%" marginBottom={4} />
        <LoadingSkeleton height={14} width="55%" marginBottom={4} />
      </View>
    </View>
  );
};

interface ListSkeletonProps {
  itemCount?: number;
  showImage?: boolean;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
  itemCount = 5,
  showImage = true
}) => {
  return (
    <View style={styles.listSkeleton}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <View key={index} style={styles.listItem}>
          {showImage && (
            <LoadingSkeleton height={60} width={60} borderRadius={8} marginBottom={0} />
          )}
          <View style={styles.listItemContent}>
            <LoadingSkeleton height={18} width="80%" marginBottom={6} />
            <LoadingSkeleton height={14} width="60%" marginBottom={4} />
            <LoadingSkeleton height={14} width="40%" marginBottom={0} />
          </View>
        </View>
      ))}
    </View>
  );
};

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = '#FF5A5F',
  text
}) => {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.spinnerText}>{text}</Text>}
    </View>
  );
};

interface FullScreenLoadingProps {
  text?: string;
}

export const FullScreenLoading: React.FC<FullScreenLoadingProps> = ({
  text = 'Loading...'
}) => {
  return (
    <View style={styles.fullScreenLoading}>
      <ActivityIndicator size="large" color="#FF5A5F" />
      <Text style={styles.fullScreenLoadingText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  cardSkeleton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventCardSkeleton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  vehicleCardSkeleton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  modsSection: {
    marginTop: 8,
  },
  listSkeleton: {
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 12,
  },
  listItemContent: {
    flex: 1,
  },
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  spinnerText: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  fullScreenLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  fullScreenLoadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});
