import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

const MapScreen = () => {
  const [data, setData] = useState([]);

  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //For the current location
      position => {
        console.log('Location', position);
        apiRequest(position.coords.latitude, position.coords.longitude);
      },
      error => {},
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const apiRequest = async (lat, lng) => {
    const type = 'restaurant';
    const key = 'AIzaSyDykNAwyTAuVpHMx5krcUkYyPvVQTEcwkY';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=${type}&key=${key}`;
    // console.log(url);

    axios
      .get(url)
      .then(function (response) {
        // handle response
        console.log(response.data.results);
        setData(response.data.results);

        console.log(err); //Axios entire error message
        console.log(err.response.data.error);
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executes at the last of any API call
      });
  };

  const renderItem = ({item}) => (
    <View style={styles.box}>
      <Image
        style={styles.image}
        source={{
          uri: `${item.icon}`,
        }}
      />
      <View style={styles.verticleBox}>
        <Text style={styles.date}>{item.place_id}</Text>

        {item.name?.length > 0 ? (
          <Text style={styles.date}>{item.name}</Text>
        ) : null}

        {item.vicinity?.length > 0 ? (
          <Text style={styles.para}>{item.vicinity}</Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={styles.body}>
      <FlatList
        style={styles.container}
        enableEmptySections={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={value => value.place_id}
      />
    </View>
  );
};

//Styles

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
  body: {
    padding: 2,
    backgroundColor: '#E6E6FA',
  },
  box: {
    padding: 2,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      height: 2,
    },
    elevation: 6,
  },
  verticleBox: {
    padding: 2,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    elevation: 2,
  },

  para: {
    color: '#20B2AA',
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: 10,
    flexWrap: 'wrap',
    flex: 2,
  },
});
export default MapScreen;
