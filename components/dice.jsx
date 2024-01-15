import React from 'react';
import { Image, View, Dimensions, TouchableOpacity } from 'react-native';

const Dice = ({ onSelect, selected, number }) => {
    const diceImages = [
      require('../assets/1dice.png'),
      require('../assets/2dice.png'),
      require('../assets/3dice.png'),
      require('../assets/4dice.png'),
      require('../assets/5dice.png'),
      require('../assets/6dice.png'),
    ];
  
    const windowWidth = Dimensions.get('window').width;
    const diceSize = windowWidth * 0.2;
  
    const toggleSelect = () => {
      onSelect(); // Notify the parent component that this die is selected
    };
  
    const diceImage = diceImages[number - 1];
  
    return (
      <TouchableOpacity onPress={toggleSelect}>
        <View>
          <Image
            style={{ width: diceSize, height: diceSize, opacity: selected ? 0.5 : 1 }}
            source={diceImage}
          />
        </View>
      </TouchableOpacity>
    );
  };
  
  export default Dice;
  