import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OfflineBanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Offline — showing cached data</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f57c00', padding: 8 },
  text: { color: 'white', textAlign: 'center' },
});
