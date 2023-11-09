import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

const Cadastro_pet = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState(null);
  const [raca, setRaca] = useState(null);

  const tiposAnimais = [
    { key: 1, label: 'Cachorro', value: 'cachorro', racas: ['Golden Retriever', 'Labrador', 'Poodle', 'SRD'] },
    { key: 2, label: 'Gato', value: 'gato', racas: ['Siamês', 'Persa', 'Maine Coon', 'SRD'] },
    { key: 3, label: 'Roedor', value: 'roedor', racas: ['Hamster', 'Coelho', 'Porquinho-da-Índia', 'SRD'] },
  ];

  const [racasDisponiveis, setRacasDisponiveis] = useState([]);

  const salvarDados = () => {
    console.log(`Nome: ${nome}, Raça: ${raca ? raca.label : 'Nenhuma selecionada'}, Tipo: ${tipo ? tipo.label : 'Nenhum selecionado'}`);

    
    if (nome && tipo && raca) {
      fetch('NOSSA API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          tipo: tipo.label,
          raca: raca.label,
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
      <ModalSelector
        data={tiposAnimais}
        initValue="Selecione o tipo"
        onChange={(option) => handleTipoChange(option)}
      />
      <Text style={styles.label}>Raça:</Text>
      <ModalSelector
        data={racasDisponiveis.map((raca) => ({ key: raca, label: raca, value: raca }))}
        initValue="Selecione a raça"
        onChange={(option) => setRaca(option)}
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
