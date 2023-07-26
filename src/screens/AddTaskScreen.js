import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const AddTaskScreen = () => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = async () => {
    if (taskTitle.trim() === '') {
      return;
    }

    try {
      // Save the task to AsyncStorage
      const storedTasks = await AsyncStorage.getItem('@tasks');
      let tasks = [];

      if (storedTasks !== null) {
        tasks = JSON.parse(storedTasks);
      }

      tasks.push({ title: taskTitle });
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
      setTaskTitle('');
    } catch (error) {
      console.error('Error saving task', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={taskTitle}
        onChangeText={(text) => setTaskTitle(text)}
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default AddTaskScreen;
