import React, { useRef, useState } from 'react';
import { Animated, Button, Dimensions, StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

const { width } = Dimensions.get('window');
const boxWidth = 200;

export default function App() {
  const translateX = useRef(new Animated.Value(0)).current;
  const [onRight, setOnRight] = useState(false);
  const animate = () => {
    Animated.spring(translateX, {
      toValue: onRight ? 0 : width - boxWidth,
      useNativeDriver: true,
    }).start();
    setOnRight(!onRight);
  };

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Inter_900Black', fontSize: 15, marginLeft: 30 }}>React native incrível/ Translate - Animated</Text>
      <Animated.View style={[styles.box, { transform: [{ translateX }] }]} />
      <View style={styles.btn}>
        <Button
          onPress={animate}
          title={onRight ? 'Mova para a esquerda' : 'Mova para a direita'}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccffff',
    justifyContent: 'space-around',
  },
  box: {
    height: boxWidth,
    width: boxWidth,
    backgroundColor: '#1affff',
  },
  btn: {
    paddingHorizontal: 90,
  },
});