import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const Agendamento: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [timeOptions, setTimeOptions] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    axios.get('http://localhost/phpmyadmin/index.php?route=/database/structure&db=pet_shop')
      .then(response => {
        setTimeOptions(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os horários:', error);
      });
  }, []);

  function handleAgendamento() {
    const formattedDate = selectedDate.toDateString();
    const agendamentoInfo = {
      date: formattedDate,
      time: selectedTime,
    };

    Alert.alert('Agendamento Confirmado', JSON.stringify(agendamentoInfo));
  }

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Agendamento</Text>
      <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>Selecionar Data</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
      <RNPickerSelect
        value={selectedTime}
        onValueChange={value => setSelectedTime(value)}
        items={timeOptions.map(option => ({
          label: option.timeLabel,
          value: option.timeValue,
        }))}
      />
      <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => handleAgendamento()}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7E7CE',
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Agendamento;
