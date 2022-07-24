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

const WeatherScreen = () => {
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
      //For check the current location
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
    const key = '508145aaa72c7410d4e5c3bbbc6c3adc';
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&cnt=16&appid=${key}`;
    //console.log(url);

    axios
      .get(url)
      .then(function (response) {
        // handle response
        setData(response.data.list);
        // console.log(list);
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
          uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }}
      />

      <View style={styles.verticleBox}>
        <Text style={styles.date}>{item.dt_txt}</Text>
        {item.weather?.length > 0 ? (
          <Text style={styles.main}>{item.weather[0].main}</Text>
        ) : null}
        {item.weather?.length > 0 ? (
          <Text style={styles.description}>{item.weather[0].description}</Text>
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
        keyExtractor={value => value.dt}
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
      height: 1,
    },
    elevation: 2,
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
  main: {
    color: '#20B2AA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10,
  },
  description: {
    color: '#20B2AA',
    fontSize: 12,
    alignSelf: 'center',
    marginLeft: 10,
  },

  date: {
    color: '#20B2AA',
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: 10,
  },
});
export default WeatherScreen;
