import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { ref, set } from 'firebase/database';


import { db } from '../config';

const FetchData = ({ navigation }) => {



  const [email, setEmail] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  //adding data realtime
  const dataAddon = () => {
    if (email.trim() !== '' && email.includes('@') && email.includes('.')) {
      // Sanitize the email address to remove characters like "." and "@"
      const sanitizedEmail = email.replace(/[.@]/g, '-');

      // Save email to Firebase database
      set(ref(db, 'All emails/' + sanitizedEmail), {
        email: email,
      })
        .then(() => {
          // Clear email input after successful submission
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

        {/* <Image blurRadius={70} source={require('../assets/images/bg.png')} style={styles.backgroundImage} /> */}
        <StatusBar style="light" />
      
        <View style={styles.headerContainer}>
          <Text style={[styles.header, { fontFamily: 'rakkas-regular' }]}>weatherSense</Text>

        </View>
       

        <View style={styles.dataContainer}>


          <Text style={[styles.emailHeader, {
            color: 'white', fontFamily: 'rakkas-regular', fontSize: 24,
            alignItems: 'center',
            textAlign: 'center',
            alignSelf: 'center',
            marginTop: -2,
            color: 'white',

          }]}>For Future Update</Text>

          <View style={styles.emailcontent}>
            <TextInput
              placeholder='add_your_email@example.com'
              value={email}
              placeholderTextColor="#D9D9D9"
              onChangeText={(text) => setEmail(text)}
              style={[styles.email]}


            />

            <TouchableOpacity style={styles.emailButton} onPress={dataAddon}>
         <Image source={require('../assets/icon.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>

          </View>{submissionMessage !== '' && (
            <Text style={{ alignSelf: 'center', marginTop: -10, color: submissionMessage.includes('Email') ? 'cyan' : 'red' }}>
              {submissionMessage}</Text>)}
        </View>





      </View>

    </ScrollView>
  );
};

export default FetchData;

const styles = StyleSheet.create({

  footer: {
    flex: 1,
    backgroundColor: 'rgba(220, 250, 220, 0.1)',
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',

    width: "100%"
  },

  container: {
    flex: 1,
    backgroundColor: 'rgba(100, 20, 40, 0.9)',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 150
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
    justifyContent: 'space-between', // Align horizontally to the center
    marginBottom: 15,
    width: '100%',
    borderBottomWidth: 1, // Add a border only at the bottom
    borderBottomColor: 'white', // Color of the border
    paddingBottom: 5, // P
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  email: {
    fontSize: 15,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: -2,
    color: 'white',

  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Add this line to center the items horizontally
    marginBottom: 10,

  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    color: 'rgba(220, 250, 220, 0.9)',
    fontFamily: 'rakkas-regular',
    marginRight: 'auto',
  },
  buttonmap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: -3,
    backgroundColor: 'rgba(220, 220, 230, 0)',
  },
  creditButton: {
    position: 'absolute',
    top: 63,
    right: 10,
    padding: 4,
    borderRadius: 5,
    marginLeft: 10,
  },
  creditIcon: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Align horizontally to the center
    marginBottom: 15,
    width: '75%',
    borderBottomWidth: 1, // Add a border only at the bottom
    borderBottomColor: 'white', // Color of the border
    paddingBottom: 5, // Padding at the bottom to separate the line from the text
  },
  input: {
    flex: 1,
    height: 40, // Set height back to 40
    paddingHorizontal: 10,
    color: 'white',
  },
  searchButton: {
    padding: 2,
    marginLeft: -7,
  }, emailButton: {
    padding: 2,
    marginLeft: -20,
  },
  suggestionsContainer: {
    width: '60%',
    marginBottom: 10,

  },
  suggestion: {
    backgroundColor: 'rgba(220, 220, 230, 0.4)',
    padding: 10,
    marginBottom: 4,
    fontSize: 16,
    color: 'black',
    borderRadius: 7,
  },
  headContainer: {
    // backgroundColor: 'rgba(70, 155, 130, 0.3)',
    padding: 0,
    width: 'auto',
    borderRadius: 0,
    marginBottom: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },

  emailHeader: {
    // backgroundColor: 'rgba(70, 155, 130, 0.3)',
    padding: 0,
    width: 'auto',
    borderRadius: 0,
    marginBottom: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  map: {
    width: Dimensions.get('window').width * 0.69,
    height: Dimensions.get('window').height * 0.3,
    alignSelf: 'center',
    borderRadius: 10,
  },
  dataContainer: {
    backgroundColor: 'rgba(70, 155, 130, 0.3)',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    width: '72%',
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',

  },
  locationContainer: {
    backgroundColor: 'rgba(70, 155, 130, 0.3)',
    paddingLeft: 2,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 2,
    width: '72%',
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

  },

  userdaynight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
    , marginTop: -27
  },

  daynight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  containerWrapper: {
    flexDirection: 'row', // Stack containers vertically
    paddingHorizontal: 10,

    zIndex: 0,
    elevation: 10,
    margin: 20,
    width: '70%'
  },
  containers: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    paddingHorizontal: 0,
    paddingVertical: -20,
    width: '10%',
    borderRadius: 10,
    marginBottom: -1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 5

  },

  dayContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flex: 3, // Occupies 2/3 of the available space
    marginHorizontal: -15,
    elevation: 4,
    zIndex: 2,
    alignItems: 'flex-start', paddingLeft: 10,
  },

  nightContainer: {
    textAlign: 'right',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    flex: 1, // Occupies 1/3 of the available space
    marginHorizontal: -15,
    elevation: 0,
    alignItems: 'flex-start'

  },

  daylabel: {
    fontSize: 10,
    textAlign: 'center',

    color: 'black',
    flexDirection: 'row'
  },
  nightlabel: {
    fontSize: 10,
    textAlign: 'center',

    color: 'white',
    flexDirection: 'row'
  },
  daydata: {
    fontSize: 10,
    textAlign: 'center',

    color: 'rgba(255, 0, 0, 1)',
    flexDirection: 'row'
  },

  label: {
    fontSize: 15,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: -2,
    color: 'white',


  },
  datalab1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  data: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: -3,
    color: 'cyan',

  },
  nightdata: {
    fontSize: 10,
    textAlign: 'center',

    color: 'cyan',
    flexDirection: 'row'
  },
  weatherIcon: {
    position: 'absolute',
    height: 200,
    width: '20%',
    top: 40,
    right: 30,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',

  },

});