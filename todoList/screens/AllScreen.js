import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { TODOS } from '../utils/data.js';


const TodoItem = props => {  
  const statusStyle = {
    backgroundColor: props.todo.status === 'Done' ? '#48AAAD' : '#FFB2AA'
  };

  const onLongPress = todo => {
    Alert.alert(
      'Delete your todo?',
      todo.body,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => props.onDeleteTodo(todo.id) }
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      key={props.todo.body}
      style={[styles.todoItem, statusStyle]}
      onPress={() => props.onToggleTodo(props.todo.id)}
      onLongPress={() => onLongPress(props.todo)}
    >
      <Text style={styles.todoText}>
        {props.idx + 1}: {props.todo.body}
      </Text>
    </TouchableOpacity>
  );
};

export default function AllScreen(props) {
  const [todoList, setTodoList] = useState(TODOS);
  const [todoBody, setTodoBody] = useState('');

  const onToggleTodo = id => {
    const todo = todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    const foundIndex = todoList.findIndex(todo => todo.id === id);
    todoList[foundIndex] = todo;
    const newTodoList = [...todoList];
    setTodoList(newTodoList);

    setTimeout(() => {
      props.navigation.navigate('SingleTodo', {
        updatedTodo: todo
      });
    }, 1000);
  };

    const onDeleteTodo = id => {
      const newTodoList = todoList.filter(todo => todo.id !== id);
      setTodoList(newTodoList);
    };
  
    const onSubmitTodo = () => {
      const newTodo = {
        body: todoBody,
        status: 'Active',
        id: todoList.length + 1
      };
      const newTodoList = [...todoList, newTodo];
      setTodoList(newTodoList);
      setTodoBody('');
    };

    
  return (
    <ImageBackground style={styles.container} source={require('../assets/images/background.png')}>
    <KeyboardAvoidingView
    behavior="padding"
    style={styles.keyboard}
    keyboardVerticalOffset={100} >
    <ScrollView >     
      <View>
  {todoList.map((todo, idx) => {
    return (
      <TodoItem
        idx={idx}
        todo={todo}
        key={todo.body}
        onToggleTodo={onToggleTodo}
        onDeleteTodo={onDeleteTodo}
      />
    );
  })}
    <View style={styles.inputContainer}>
    <TextInput
      value={todoBody}
      style={styles.todoInput}
      onChangeText={text => setTodoBody(text)}
    />
    <TouchableOpacity style={styles.button} onPress={onSubmitTodo}>
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
    </View>
    </View>
  </ScrollView>
  </KeyboardAvoidingView>
  </ImageBackground>
  );
}

AllScreen.navigationOptions = {
  title: 'All Todos'
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  keyboard:
  {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  todoItem: {
    margin: 5,
    padding: 10,
    width: '95%',
    minHeight: 20,
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  todoInput: {
    minHeight: 40,
    width: '95%',
    color: 'black',
    borderWidth: 1,
    marginTop: '10%',
    marginBottom: '5%',
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  inputContainer: {
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 50,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#C98474',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});
