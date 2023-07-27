import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { v4 as uuidv4 } from 'uuid';

const FlatListApp = () => {
  const [items, setItems] = useState([]);
  const [txt, setTxt] = useState('');

  const handleAddItem = () => {
    if (txt.trim() !== '') {
      setItems((prevItems) => [
        ...prevItems,
        { id: uuidv4(), text: txt.trim() },
      ]);
      setTxt('');
    }
  };

  const handleDeleteItem = (itemId) => {
    Alert.alert('Confirmar', '¿Deseas borrar el elemento?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Borrar',
        style: 'destructive',
        onPress: () => {
          setItems((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
          );
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleDeleteItem(item.id)}
      style={{ paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}
    >
      <Text>{item.text}</Text>
      <Icon name="delete" size={24} color="red" style={{ marginLeft: 10 }} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="FlatList App" />
      </Appbar.Header>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={{ padding: 20 }}>
        <TextInput
          placeholder="Añadir elemento"
          onChangeText={(text) => setTxt(text)}
          value={txt}
        />
        <Button
          mode="contained"
          onPress={handleAddItem}
          style={{ marginTop: 10 }}
        >
          Añadir
        </Button>
      </View>
    </View>
  );
};

export default FlatListApp;
