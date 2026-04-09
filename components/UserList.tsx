import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Text, Avatar, Divider, IconButton, Surface } from 'react-native-paper';
import { dbService } from '../database/database';

export const UserList = ({ onEditUser }) => {
  const [usuarios, setUsuarios] = useState([]);

  const carregarDados = () => {
    try {
      const dados = dbService.getUsersWithAddresses();
      setUsuarios(dados || []);
    } catch (error) {
      console.error("Erro ao carregar:", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleExcluir = (cpf) => {
    Alert.alert("Excluir Registro", "Deseja apagar este usuário e seu endereço?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          dbService.deleteUser(cpf);
          carregarDados();
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card} mode="elevated">
      <Card.Title
        title={`${item.nome} ${item.sobrenome}`}
        subtitle={`CPF: ${item.cpf}`}
        left={(props) => <Avatar.Icon {...props} icon="account" style={{ backgroundColor: '#6200ee' }} />}
        right={(props) => (
          <View style={styles.actionRow}>
            <IconButton icon="pencil" iconColor="#6200ee" onPress={() => onEditUser(item)} />
            <IconButton icon="delete" iconColor="#d32f2f" onPress={() => handleExcluir(item.cpf)} />
          </View>
        )}
      />

      <Divider />

      <Card.Content style={styles.addressSection}>
        <Text variant="labelLarge" style={styles.addressTitle}>Endereço:</Text>
        {item.logradouro ? (
          <View style={styles.addressBox}>
            <Text variant="bodyMedium" style={styles.addressText}>
              {item.logradouro}, {item.numero}
            </Text>
            <Text variant="bodySmall" style={styles.addressSubText}>
              {item.bairro} - {item.cidade}/{item.uf}
            </Text>
            <Text variant="bodySmall" style={styles.cepText}>CEP: {item.cep}</Text>
          </View>
        ) : (
          <Text variant="bodySmall" style={styles.noAddress}>Nenhum endereço cadastrado para este usuário.</Text>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>Usuários Cadastrados</Text>
        <IconButton icon="refresh" mode="contained" onPress={carregarDados} />
      </View>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.cpf.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum usuário encontrado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f7' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  headerTitle: { fontWeight: 'bold', color: '#333' },
  listContent: { padding: 10, paddingBottom: 100 },
  card: { marginBottom: 15, borderRadius: 12, backgroundColor: '#fff' },
  actionRow: { flexDirection: 'row' },
  addressSection: { marginTop: 10, paddingBottom: 10 },
  addressTitle: { color: '#2e7d32', marginBottom: 5, fontSize: 13, fontWeight: 'bold' }, // Texto verde escuro
  addressBox: { backgroundColor: '#e8f5e9', padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#c8e6c9' },
  addressText: { color: '#222', fontWeight: '500' },
  addressSubText: { color: '#666' },
  cepText: { color: '#999', marginTop: 2, fontSize: 11 },
  noAddress: { color: '#999', fontStyle: 'italic' },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' }
});