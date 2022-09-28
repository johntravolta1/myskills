import React, {useState, useEffect} from 'react'
import {View,Text, StyleSheet, TextInput, Platform, FlatList, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity,
        } from 'react-native'
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {

  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greetings, setGreeting] = useState('')


  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    console.log('New skill: ', data )

    setMySkills([ ...mySkills,data ])
    Keyboard.dismiss()
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldstate => oldstate.filter(
      s => s.id !== id
    ))
  }

  useEffect(()=> {
    const currentHour = new Date(new Date().getTime() - 3 *60*60*1000).getHours() //utc -3h
    if(currentHour < 12) {
      setGreeting('Good morning!')
    } else if (currentHour >= 12 && currentHour < 18)
    {
      setGreeting('Good afternoon!')
    } else {
      setGreeting('Good night!')
    }
  }, [])

  return (

      <View style={styles.container}>
        
        <Text testID='welcome' style={styles.title}>Welcome, Fernando</Text>
        <Text style={styles.greetings}>{greetings}</Text>

        <TextInput
          testID='input-new'
          style={styles.input}
          placeholder='New skill'
          placeholderTextColor='#555'
          onChangeText={setNewSkill}
        ></TextInput>

        <Button 
          testID='button-add'
          onPress={() => {
            Keyboard.dismiss;
            handleAddNewSkill();
          }}
          title='Add'>
        </Button>


        <Text style={[styles.title, {marginVertical: 50}] }>
          My skills
        </Text>

          {
            mySkills &&
            <FlatList
              testID='flatskills'
              data= {mySkills}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <SkillCard 
                  skill={item.name}
                  onPress={()=> handleRemoveSkill(item.id)}
                />
              )}
            ></FlatList>
          }
          
      </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 8
  },
  greetings: {
    color: '#fff'
  }
})