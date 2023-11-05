import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';

const Agendamento: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedEstabelecimento, setSelectedEstabelecimento] = useState('Estabelecimento A');
  const estabelecimentos = ['Estabelecimento A', 'Estabelecimento B', 'Estabelecimento C'];

  function handleAgendamento() {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Agendamento</Text>
      <DatePicker
        date={selectedDate}
        onDateChange={newDate => setSelectedDate(newDate)}
      />
      {/* <Picker
        selectedValue={selectedTime}
        onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}
      >
        <Picker.Item label="Selecione um horário" value="" />
        <Picker.Item label="9:00 AM" value="9:00 AM" />
        <Picker.Item label="10:00 AM" value="10:00 AM" />
        <Picker.Item label="11:00 AM" value="11:00 AM" />
        <Picker.Item label="2:00 PM" value="2:00 PM" />
        <Picker.Item label="3:00 PM" value="3:00 PM" />
        <Picker.Item label="4:00 PM" value="4:00 PM" />
      </Picker>
      <Picker
        selectedValue={selectedEstabelecimento}
        onValueChange={(itemValue, itemIndex) => setSelectedEstabelecimento(itemValue)}
      >
        {estabelecimentos.map(estabelecimento => (
          <Picker.Item label={estabelecimento} value={estabelecimento} key={estabelecimento} />
        ))}
      </Picker> */}
      <Button title="Agendar" onPress={() => handleAgendamento()} />
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
});

export default Agendamento;
