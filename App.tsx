import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const flatListRef = useRef();

  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = { text: message, id: messages.length + 1, isUser: true };
    setMessages([...messages, newMessage]);
    setMessage('');

    // Role automaticamente para a nova mensagem
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const deleteMessage = (id) => {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
            {item.isUser && (
              <TouchableOpacity onPress={() => deleteMessage(item.id)}>
                <Text style={styles.deleteButton}>Apagar</Text>
              </TouchableOpacity>
            )}
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
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  messageText: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
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
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: 'white',
  },
});

export default ChatScreen;
