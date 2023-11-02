import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Historico: React.FC = () => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      const dadosHistorico = [
        {
          estabelecimento: 'Estabelecimento A',
          servico: 'Banho',
          data: '2023-10-15',
          hora: '10:00 AM',
        },
        {
          estabelecimento: 'Estabelecimento B',
          servico: 'Tosa',
          data: '2023-10-16',
          hora: '2:00 PM',
        },
        {
          estabelecimento: 'Estabelecimento A',
          servico: 'Aparar Unhas',
          data: '2023-10-17',
          hora: '3:00 PM',
        },
       
      ];

      setHistorico(dadosHistorico);
      setLoading(false);
    }, 2000); 
  }, []);

  const servicosPorEstabelecimento = {};

  historico.forEach((agendamento) => {
    if (!servicosPorEstabelecimento[agendamento.estabelecimento]) {
      servicosPorEstabelecimento[agendamento.estabelecimento] = [];
    }
    servicosPorEstabelecimento[agendamento.estabelecimento].push(agendamento);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Histórico de Serviços</Text>
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        Object.keys(servicosPorEstabelecimento).map((estabelecimento) => (
          <View key={estabelecimento}>
            <Text style={styles.estabelecimentoLabel}>{estabelecimento}</Text>
            <FlatList
              data={servicosPorEstabelecimento[estabelecimento]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.agendamentoItem}>
                  <Text>Serviço: {item.servico}</Text>
                  <Text>Data: {item.data}</Text>
                  <Text>Hora: {item.hora}</Text>
                </View>
              )}
            />
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7E7CE',
    padding: 16,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  estabelecimentoLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  agendamentoItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});

export default Historico;
