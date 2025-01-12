import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      {/* Task List and Management */}
    </View>
  );
};

//styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default TaskScreen;
