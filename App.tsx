import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const flatListRef = useRef();

  const sendMessage = () => {
    if (message.trim() === '') return;

    setMessages([...messages, { text: message, id: messages.length }]);
    setMessage('');

    // Role automaticamente para a nova mensagem
    flatListRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Digite sua mensagem"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    alignSelf: 'flex-end',
    margin: 5,
    backgroundColor: '#E6A1C6',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#E6A1C6',
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
  },
});

export default ChatScreen;