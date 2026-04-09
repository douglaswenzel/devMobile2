import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';

export const UserForm = ({ cpf, setCpf, nome, setNome, sobrenome, setSobrenome, onNext, isEditing }) => {

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        {isEditing ? "Editar Identificação" : "Nova Identificação"}
      </Text>

      <TextInput
        label="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
        mode="outlined"
        disabled={isEditing}
        style={styles.input}
      />
      {isEditing && <HelperText type="info">O CPF não pode ser alterado.</HelperText>}

      <TextInput
        label="Nome"
        value={nome}
        onChangeText={setNome}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Sobrenome"
        value={sobrenome}
        onChangeText={setSobrenome}
        mode="outlined"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={onNext}
        style={styles.button}
        icon="arrow-right"
        contentStyle={{ flexDirection: 'row-reverse' }}
      >
        Continuar para Endereço
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  title: { marginBottom: 20, color: '#2e7d32', fontWeight: 'bold' },
  input: { marginBottom: 12 },
  button: { marginTop: 10, borderRadius: 8 }
});