import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';

const OrderConfirmPage = () => {
  const [isAnimationPlayed, setIsAnimationPlayed] = useState(false);
  const [isTextDisplay, setIsTextDisplay] = useState(false);

  const onAnimationFinish = () => {
    setIsTextDisplay(true);
    setIsAnimationPlayed(true);
   };

  
   return (
    <View style={styles.container}>
      
      <View style={{ width: '100%', height: '40%' }}>
        <LottieView
          source={require('../animationAsset/successanimation.json')}
          autoPlay={!isAnimationPlayed}
          onAnimationFinish={onAnimationFinish}
          loop={false}
          resizeMode='cover'
        />

      </View>
      
      {isTextDisplay ? (
        <Text style={styles.text}>Your order Confirmed</Text>
      ) : (
        <Text style={styles.text}>{" "}</Text> // Display an empty space text
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default OrderConfirmPage;
