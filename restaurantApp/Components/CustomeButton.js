import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

const CustomeButton = ({
                  text,
                  onPress
}) => {
                  return (

                                    <TouchableOpacity style={styles.touchableButton} onPress={onPress}>
                                                      <Text style={styles.buttonText}>{text}</Text>
                                    </TouchableOpacity>
                  )
}

const styles = StyleSheet.create({
                  touchableButton: {
                                    backgroundColor: 'purple', // Custom background color
                                    paddingVertical: 12, // Vertical padding
                                    paddingHorizontal: 24, // Horizontal padding
                                    borderRadius: 8, // Border radius
                                    width:'80%',
                                    marginVertical:20,
                                    
                  },
                  buttonText: {
                                    color: '#fff', // Text color
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    alignSelf:'center'

                                     
                                     
                  },

})
export default CustomeButton