import React, { useState,useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';


// Fisher Yates Shuffle
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

//Fisher-yates shuffle algorithm
function shuffleCardsArray(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        swap(array, currentIndex, randomIndex);
    }
    return array;
}
// Card component
const Card=({card, onClick})=>{
    return(
        <TouchableOpacity onPress={()=> onClick(card)}>
        <View style={styles.card}>
            <Text>{card.number}</Text>
            <Text>{card.suit}</Text>
        </View>
        </TouchableOpacity>
    );
};
const generateDeck = () => {
    const suits = ['♠', '♣', '♦', '♥'];
    const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];
    
    for (const suit of suits) {
        for (const number of numbers) {
            deck.push({ number, suit });
        }
    } 
    const shuffledDeck= shuffleCardsArray(deck);
    return shuffledDeck;
};
    

const Index: React.FC = () => {
    const [shuffledCards, setShuffledCards] = useState(generateDeck());
    const timeout = useRef(null);
    const handleCardClick = (card) => {
        // Implement your logic for handling card clicks here
        console.log('Card clicked:', card);
    };

    const shuffleCards = () => {
        const shuffled = shuffleCardsArray([...shuffledCards]);
       
        
        setShuffledCards(shuffled);
    };
    const[openCards, setOpenCards]= useState([]);
    const[clearedCards, setClearedCards] = useState({});

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {shuffledCards.map((card, index) => (
                    <Card key={index} card={card}onClick={handleCardClick}/>))}
            </ScrollView>
            <TouchableOpacity onPress={shuffleCards} style={styles.button}>
                <Text style={styles.buttonText}>SHUFFLE</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    card: {
        width: 80,
        height: 120,
        borderRadius: 10,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        color:'black',
        
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
       
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
});

export default Index;