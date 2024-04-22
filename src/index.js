import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ref, set } from 'firebase/database';
import { db } from '../config';

const FetchData = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const dataAddon = () => {
    if (email.trim() !== '' && email.includes('@') && email.includes('.')) {
      const sanitizedEmail = email.replace(/[.@]/g, '-');
      set(ref(db, 'All emails/' + sanitizedEmail), {
        email: email,
      })
      .then(() => {
        setEmail('');
        setSubmissionMessage('Email submitted successfully!');
      })
      .catch((error) => {
        console.error('Error submitting email:', error);
        setSubmissionMessage('Error submitting email. Please try again.');
      });
    } else {
      setSubmissionMessage('Please enter a valid email address');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.headerContainer}>
          <Text style={[styles.header, { fontFamily: 'rakkas-regular' }]}>roboDoc</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={[styles.emailHeader, { color: 'white', fontFamily: 'rakkas-regular', fontSize: 24 }]}>For Future Update</Text>
          <View style={styles.emailcontent}>
            <TextInput
              placeholder='add_your_email@example.com'
              value={email}
              placeholderTextColor="#D9D9D9"
              onChangeText={(text) => setEmail(text)}
              style={styles.email}
            />
            <TouchableOpacity style={styles.emailButton} onPress={dataAddon}>
              <Image source={require('../assets/icon.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
          {submissionMessage !== '' && (
            <Text style={{ alignSelf: 'center', marginTop: -10, color: submissionMessage.includes('Email') ? 'cyan' : 'red' }}>
              {submissionMessage}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default FetchData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(100, 20, 40, 0.9)',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 150
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    color: 'rgba(220, 250, 220, 0.9)',
    fontFamily: 'rakkas-regular',
    marginRight: 'auto',
  },
  dataContainer: {
    flex: 1,
    backgroundColor: 'rgba(100, 20, 40, 0.9)',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 0
  },
  emailcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingBottom: 5,
  },
  email: {
    fontSize: 15,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: -2,
    color: 'white',
  },
  emailButton: {
    padding: 2,
    marginLeft: -20,
  },
  emailHeader: {
    color: 'white',
    fontFamily: 'rakkas-regular',
    fontSize: 24,
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: -2,
  },
});
