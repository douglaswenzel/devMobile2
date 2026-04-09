import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

export const AddressForm = ({ formData, setFormData, onSearchCEP, onSave, loading }) => {
  
  const ESTADOS_BR = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  if (!formData) return null;

  const renderForm = () => (
    <View style={styles.innerContainer}>
      <Text variant="headlineSmall" style={styles.title}>Endereço</Text>
      
      {/* Campo de CEP com ícone de busca */}
      <TextInput 
        label="CEP" 
        value={formData.cep || ''} 
        onChangeText={(v) => setFormData({...formData, cep: v})} 
        onBlur={onSearchCEP} 
        mode="outlined" 
        keyboardType="numeric"
        right={<TextInput.Icon icon="magnify" onPress={onSearchCEP}/>}
        style={styles.input}
      />

      <TextInput 
        label="Logradouro" 
        value={formData.logradouro || ''} 
        onChangeText={(v) => setFormData({...formData, logradouro: v})}
        mode="outlined" 
        style={styles.input} 
      />

      <View style={styles.row}>
        <TextInput 
          label="Nº" 
          value={formData.numero || ''} 
          onChangeText={(v) => setFormData({...formData, numero: v})} 
          mode="outlined" 
          style={[styles.input, { flex: 1, marginRight: 8 }]} 
        />
        
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>UF</Text>
          <Picker
            selectedValue={formData.uf || ''}
            onValueChange={(v) => setFormData({...formData, uf: v})}
            style={styles.picker}
            dropdownIconColor="#6200ee"
          >
            <Picker.Item label="-" value="" />
            {ESTADOS_BR.map(uf => (
              <Picker.Item key={uf} label={uf} value={uf} style={{ fontSize: 14 }} />
            ))}
          </Picker>
        </View>
      </View>

      <TextInput 
        label="Bairro" 
        value={formData.bairro || ''} 
        onChangeText={(v) => setFormData({...formData, bairro: v})}
        mode="outlined" 
        style={styles.input} 
      />

      <TextInput 
        label="Cidade" 
        value={formData.localidade || formData.cidade || ''} 
        onChangeText={(v) => setFormData({...formData, localidade: v, cidade: v})}
        mode="outlined" 
        style={styles.input} 
      />

      <Button 
        mode="contained" 
        onPress={onSave} 
        loading={loading} 
        disabled={loading} 
        style={styles.saveButton} 
        buttonColor="#2e7d32"
        icon="check-circle"
      >
        Finalizar e Salvar
      </Button>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[{ id: '1' }]}
        renderItem={renderForm}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: { paddingVertical: 10 },
  title: { marginBottom: 20, color: '#6200ee', fontWeight: 'bold' },
  input: { marginBottom: 12 },
  row: { flexDirection: 'row', marginBottom: 12 },
  
  pickerContainer: {
    flex: 0.6,
    borderWidth: 1,
    borderColor: '#79747e',
    borderRadius: 4,
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  pickerLabel: {
    position: 'absolute',
    top: -10,
    left: 8,
    paddingHorizontal: 4,
    fontSize: 12,
    backgroundColor: '#f1f8e9',
    color: '#2e7d32',
    zIndex: 1
  },
  picker: {
    marginLeft: -5
  },
  
  saveButton: { marginTop: 20, paddingVertical: 5, borderRadius: 8 }
});