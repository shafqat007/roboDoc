import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Picker } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ref, set, push } from 'firebase/database';
import { db } from '../config';

const FetchData = ({ navigation }) => {
  const [options, setOptions] = useState([{ hours: '', minutes: '', period: 'AM', label: 'Medicine 1' }]);
  const [successMessage, setSuccessMessage] = useState('');

  const addOption = () => {
    const newOptions = [...options, { hours: '', minutes: '', period: 'AM', label: `Medicine ${options.length + 1}` }];
    setOptions(newOptions);
  };

  const handleInputChange = (index, fieldName, value) => {
    let newValue = value;
    if (fieldName === 'hours') {
      newValue = isNaN(value) ? '' : Math.max(0, Math.min(12, parseInt(value, 10))).toString();
    }
    if (fieldName === 'minutes') {
      newValue = isNaN(value) ? '' : Math.max(0, Math.min(60, parseInt(value, 10))).toString();
    }
    const newOptions = [...options];
    newOptions[index][fieldName] = newValue;
    setOptions(newOptions);
  };

  const saveOptionsToFirebase = () => {
    options.forEach((option) => {
      if (option.hours.trim() !== '' && option.minutes.trim() !== '') {
        push(ref(db, 'Options'), {
          label: option.label,
          time: `${option.hours}:${option.minutes} ${option.period}`,
        });
      }
    });
    setSuccessMessage('Medicine saved successfully');
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
    // Overwrite previous data in the database
    set(ref(db, 'Options'), options);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="light" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>roboDoc</Text>
      </View>
      <Text style={styles.subHeader}>Set the time for each medicine</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <View key={index} style={styles.optionRow}>
            <Text style={styles.optionLabel}>{option.label}</Text>
            <View style={styles.timeInputContainer}>
              <TextInput
                style={styles.timeInput}
                placeholder="HH"
                value={option.hours}
                keyboardType="numeric"
                maxLength={2}
                onChangeText={(value) => handleInputChange(index, 'hours', value)}
              />
              <Text style={styles.colon}>:</Text>
              <TextInput
                style={styles.timeInput}
                placeholder="MM"
                value={option.minutes}
                keyboardType="numeric"
                maxLength={2}
                onChangeText={(value) => handleInputChange(index, 'minutes', value)}
              />
              <Picker
                style={styles.periodPicker}
                selectedValue={option.period}
                onValueChange={(value) => handleInputChange(index, 'period', value)}
              >
                <Picker.Item color="#000000" label="AM" value="AM" />
                <Picker.Item color="#000000" label="PM" value="PM" />
              </Picker>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.addOptionButton} onPress={addOption}>
          <Text style={styles.addOptionText}>Add More Medicines</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveOptionsButton} onPress={saveOptionsToFirebase}>
          <Text style={styles.saveOptionsText}>Save Options</Text>
        </TouchableOpacity>
        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
      </View>
    </ScrollView>
  );
};

export default FetchData;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 150
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 48,
    color: '#ffffff',
    fontFamily: 'Roboto',
  },
  subHeader: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'Roboto',
  },
  optionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
  },
  optionLabel: {
    color: '#ffffff',
    fontSize: 18,
    marginRight: 10,
    fontFamily: 'Roboto',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    width: 40,
    textAlign: 'center',
    marginRight: 5,
    borderRadius: 5,
    fontSize: 18,
  },
  colon: {
    color: '#ffffff',
    fontSize: 18,
    marginRight: 5,
  },
  periodPicker: {
    color: '#000000',
    width: 80,
  },
  addOptionButton: {
    backgroundColor: '#469b82',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  addOptionText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  saveOptionsButton: {
    backgroundColor: '#469b82',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  saveOptionsText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  successMessage: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Roboto',
    marginTop: 10,
  },
});
