import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Cadastro_pet = () => {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const salvarDados = () => {
    
    console.log(`Nome: ${nome}, Raça: ${raca}, Data de Nascimento: ${dataNascimento}`);
  };

  const limparCampos = () => {
    setNome('');
    setRaca('');
    setDataNascimento('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={(text) => setNome(text)}
        placeholder="Digite o nome"
      />
      <Text style={styles.label}>Raça:</Text>
      <TextInput
        style={styles.input}
        value={raca}
        onChangeText={(text) => setRaca(text)}
        placeholder="Digite a raça"
      />
      <Text style={styles.label}>Data de Nascimento:</Text>
      <TextInput
        style={styles.input}
        value={dataNascimento}
        onChangeText={(text) => setDataNascimento(text)}
        placeholder="Digite a data de nascimento"
      />
      <View style={styles.buttonGroup}>
        <Button title="Cancelar" onPress={limparCampos} />
        <Button title="Salvar" onPress={salvarDados} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7E7CE',
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Cadastro_pet;
