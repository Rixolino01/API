import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Cadastro_cliente = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');

  const salvarDados = () => {
    console.log(`Nome: ${nome}, Telefone: ${telefone}, Email: ${email}, Rua: ${rua}, Número: ${numero}, Bairro: ${bairro}, Cidade: ${cidade}, Estado: ${estado}, CEP: ${cep}`);
  };

  const limparCampos = () => {
    setNome('');
    setTelefone('');
    setEmail('');
    setRua('');
    setNumero('');
    setBairro('');
    setCidade('');
    setEstado('');
    setCep('');
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
      <Text style={styles.label}>Telefone:</Text>
      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={(text) => setTelefone(text)}
        placeholder="Digite o telefone"
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Digite o email"
      />
      <Text style={styles.label}>Rua:</Text>
      <TextInput
        style={styles.input}
        value={rua}
        onChangeText={(text) => setRua(text)}
        placeholder="Digite a rua"
      />
      <Text style={styles.label}>Número:</Text>
      <TextInput
        style={styles.input}
        value={numero}
        onChangeText={(text) => setNumero(text)}
        placeholder="Digite o número"
      />
      <Text style={styles.label}>Bairro:</Text>
      <TextInput
        style={styles.input}
        value={bairro}
        onChangeText={(text) => setBairro(text)}
        placeholder="Digite o bairro"
      />
      <Text style={styles.label}>Cidade:</Text>
      <TextInput
        style={styles.input}
        value={cidade}
        onChangeText={(text) => setCidade(text)}
        placeholder="Digite a cidade"
      />
      <Text style={styles.label}>Estado:</Text>
      <TextInput
        style={styles.input}
        value={estado}
        onChangeText={(text) => setEstado(text)}
        placeholder="Digite o estado"
      />
      <Text style={styles.label}>CEP:</Text>
      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={(text) => setCep(text)}
        placeholder="Digite o CEP"
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

export default Cadastro_cliente;
