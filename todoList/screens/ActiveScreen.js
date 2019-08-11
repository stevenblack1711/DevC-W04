import React, {useState} from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { TODOS } from '../utils/data.js';

const TodoItem = props => {  
  const statusStyle = {
    backgroundColor: props.todo.status === 'Done' ? '#48AAAD' : '#FFB2AA'
  };
  return (
    <View
      style={[styles.todoItem, statusStyle]}
    >
      <Text style={styles.todoText}>
        
        {props.idx + 1}: {props.todo.body}
      </Text>
    </View>
  );
}

export default function ActiveScreen(props) {
  const [todoList, setTodoList] = useState(TODOS);
  const todo = todoList.filter(todo => todo.status === 'Done');
  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      {todoList.map((todo, idx) => {
    return (
      <TodoItem
        idx={idx}
        todo={todo}
        key={todo.body}
      />
    );
  })}
    </ScrollView>
  );
}

ActiveScreen.navigationOptions = {
  title: 'Active Todos'
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
});