import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, {useState} from 'react';

import Dice from './components/dice';
import Button from './components/button';

const diceImages = {
  1: require('./assets/1dice.png'),
  2: require('./assets/2dice.png'),
  3: require('./assets/3dice.png'),
  4: require('./assets/4dice.png'),
  5: require('./assets/5dice.png'),
  6: require('./assets/6dice.png'),
};

const scores = new Map([
  [1, 1],
  [2, 2],
  [3, 0],
  [4, 4],
  [5, 5],
  [6, 6],
]);

export default function App() {
  const [dice, setDice] = useState([0, 0, 0, 0, 0, 0]);
  const [selectedDice, setSelectedDice] = useState([false, false, false, false, false, false]);
  const [player1Dice, setPlayer1Dice] = useState([0]);
  const [player2Dice, setPlayer2Dice] = useState([0]);
  console.log('dice', dice);

  const rollDice = () => {
    console.log('Rolling dice...');
    if (!selectedDice.every((isSelected) => isSelected)) {
      setDice(prevDice => {
        const newDice = prevDice.map((value, index) => (selectedDice[index] ? value : Math.floor(Math.random() * 6) + 1));
        return newDice;
      });
    }
  };  

  const toggleSelect = (index) => {
    if (!selectedDice.every((isSelected) => isSelected)) {
      const newSelectedDice = [...selectedDice];
      newSelectedDice[index] = !newSelectedDice[index];
      setSelectedDice(newSelectedDice);
    }
  };

  // Modify onSelect to handle selection without generating a random number
  const onSelect = (index) => {
    toggleSelect(index);
  };


  return (
    <View style={styles.container}>
      <View style={styles.diceRow}>
        {dice.slice(0, 3).map((_, index) => (
          <Dice key={index} selected={selectedDice[index]} onSelect={() => onSelect(index)} number={dice[index]} />
        ))}
      </View>
      <View style={styles.diceRow}>
        {dice.slice(3).map((_, index) => (
          <Dice key={index + 3} selected={selectedDice[index + 3]} onSelect={() => onSelect(index + 3)} number={dice[index + 3]} />
        ))}
      </View>
      <Pressable style={styles.rollButton} onPress={rollDice}>
        <Text style={{ color: 'white', fontSize: 30 }}>Roll Dice</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#708090',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    borderRadius: 8,
    padding: 6,
  },
  rollButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  diceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
