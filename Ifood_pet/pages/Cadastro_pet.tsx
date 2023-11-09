import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Cadastro_pet = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState(null);
  const [raca, setRaca] = useState(null);

  const tiposAnimais = [
    { label: 'Cachorro', value: 'cachorro', racas: ['Golden Retriever', 'Labrador', 'Poodle', 'SRD'] },
    { label: 'Gato', value: 'gato', racas: ['Siamês', 'Persa', 'Maine Coon','SRD'] },
    { label: 'Roedor', value: 'roedor', racas: ['Hamster', 'Coelho', 'Porquinho-da-Índia','SRD'] },
  ];

  const [racasDisponiveis, setRacasDisponiveis] = useState([]);

  const salvarDados = () => {
    console.log(`Nome: ${nome}, Raça: ${raca ? raca : 'Nenhuma selecionada'}, Tipo: ${tipo ? tipo : 'Nenhum selecionado'}`);

    if (nome && tipo && raca) {
      fetch('NOSSA API AQUI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          tipo: tipo,
          raca: raca,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Dados salvos com sucesso!', data);
          
        })
        .catch(error => {
          console.error('Erro ao salvar dados:', error);
          
        });
    }
  };

  const limparCampos = () => {
    setNome('');
    setTipo(null);
    setRaca(null);
    setRacasDisponiveis([]);
  };

  const handleTipoChange = (tipoSelecionado) => {
    setTipo(tipoSelecionado);
    setRacasDisponiveis(tipoSelecionado.racas || []);
    setRaca(null); 
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
      <Text style={styles.label}>Tipo:</Text>
      <RNPickerSelect
        placeholder={{ label: 'Selecione o tipo', value: null }}
        items={tiposAnimais}
        onValueChange={(value) => handleTipoChange(value)}
      />
      <Text style={styles.label}>Raça:</Text>
      <RNPickerSelect
       placeholder={{ label: 'Selecione a raça', value: null }}
      items={racasDisponiveis.map((raca) => ({ label: raca, value: raca }))}
      onValueChange={(value) => setRaca(value)}
      disabled={!tipo} 

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
