import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomSelect = ({ data, placeholder, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
    toggleOpen();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleOpen} style={styles.selectButton}>
        <Text style={styles.selectButtonText}>
          {selectedItem ? selectedItem.value : placeholder}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(item)}
              style={styles.option}
            >
              <Text style={styles.optionText}>{item.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    // Estilos para o botão de seleção
  },
  selectButtonText: {
    // Estilos para o texto do botão de seleção
  },
  optionsContainer: {
    // Estilos para o contêiner das opções
  },
  option: {
    color: '#34898F',
    fontSize: 16,
  },
  optionText: {
    // Estilos para o texto de cada opção
  },
});

export default CustomSelect;
