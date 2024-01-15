import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Audio } from 'expo-av';



import Dice from './components/Dice';
import Button from './components/Button';

const scores = [1, 2, 0, 4, 5, 6];

export default function App() {
  const [dice, setDice] = useState([0, 0, 0, 0, 0, 0]);
  const [selectedDice, setSelectedDice] = useState([false, false, false, false, false, false]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [sound, setSound] = useState();

  console.log('dice', dice);
  console.log('selectedDice', selectedDice);

  const rollDice = () => {
    // console.log('Rolling dice...');
    playSound();
    if (!selectedDice.every((isSelected) => isSelected)) {
      setDice(prevDice => {
        const newDice = prevDice.map((value, index) => (selectedDice[index] ? value : Math.floor(Math.random() * 6) + 1));
        console.log('newDice', newDice);
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

  const onSelect = (index) => {
    toggleSelect(index);
  };

  const getScore = (dice) => {
    const score = scores[dice - 1];
    return score;
  }

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/dice.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);


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
      <Pressable style={styles.rollButton} onPress={rollDice} >
        <Text style={{ color: 'white', fontSize: 30 }}>Roll Dice</Text>
      </Pressable>
      <View>
        <Text style={{ color: 'white', fontSize: 30 }}>
          Score: {player1Score}
        </Text>
      </View>
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
