import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { PaperProvider, Appbar, Button, Text, Surface, Avatar } from 'react-native-paper';

import { setupDatabase, dbService } from './database/database';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { AddressForm } from './components/AddressForm';

export default function App() {
  const [view, setView] = useState('MENU');
  const [step, setStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [addressData, setAddressData] = useState({
    cep: '', logradouro: '', numero: '', bairro: '', localidade: '', uf: ''
  });

  useEffect(() => {
    setupDatabase();
  }, []);

  const validarCPF = (valor) => {
    const limpo = valor.replace(/\D/g, '');
    if (limpo.length !== 11) {
      Alert.alert("Erro", "O CPF deve ter 11 dígitos.");
      return false;
    }
    return true;
  };

  const buscarCEP = async () => {
    const cepLimpo = addressData.cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;
    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      if (data.erro) throw new Error();
      setAddressData({
        ...addressData,
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        localidade: data.localidade || '',
        uf: data.uf || ''
      });
    } catch (e) {
      Alert.alert("Erro", "CEP não encontrado ou falha na rede.");
    } finally {
      setLoading(false);
    }
  };

    const openForm = (user = null) => {
        if (user && user.cpf) {
        setIsEditing(true);
        setCpf(user.cpf); 
        setNome(user.nome || ''); 
        setSobrenome(user.sobrenome || '');
        setAddressData({
            cep: user.cep || '',
            logradouro: user.logradouro || '',
            numero: user.numero || '',
            bairro: user.bairro || '',
            localidade: user.cidade || '',
            uf: user.uf || ''
        });
        } else {
        setIsEditing(false);
        setCpf(''); setNome(''); setSobrenome('');
        setAddressData({ cep: '', logradouro: '', numero: '', bairro: '', localidade: '', uf: '' });
        }
        setStep(1);
        setView('FORM');
    };

  const handleSave = () => {
    try {
      if (isEditing) {
        dbService.updateUser(cpf, nome, sobrenome);
        dbService.updateAddressByCpf(cpf, addressData);
        Alert.alert("Sucesso", "Cadastro atualizado!");
      } else {
        dbService.insertUser(cpf, nome, sobrenome);
        dbService.insertAddress({ ...addressData, cpf });
        Alert.alert("Sucesso", "Cadastrado com sucesso!");
      }
      setView('LIST');
    } catch (e) {
      Alert.alert("Erro", "Falha ao salvar. Verifique se o CPF já existe.");
    }
  };

  return (
    <PaperProvider>
      <Appbar.Header elevated style={{backgroundColor: '#a5d6a7'}}>
        {view !== 'MENU' && <Appbar.BackAction onPress={() => setView('MENU')} />}
        <Appbar.Content title="Lindos Usuarios" />
      </Appbar.Header>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        
        {/* TELA: MENU */}
        {view === 'MENU' && (
          <View style={styles.menuContainer}>
            <Avatar.Icon size={80} icon="account-group" style={styles.mainIcon} />
            <Surface style={styles.menuSurface} elevation={2}>
              <Button mode="contained" icon="plus" onPress={() => openForm()} style={styles.menuBtn}>
                Novo Cadastro
              </Button>
              <Button mode="outlined" icon="format-list-bulleted" onPress={() => setView('LIST')} style={styles.menuBtn}>
                Ver Usuários
              </Button>
            </Surface>
          </View>
        )}

        {view === 'LIST' && <UserList onEditUser={openForm} onRefresh={() => setView('LIST')} />}

        {view === 'FORM' && (
          <View style={{ flex: 1 }}>
            {step === 1 ? (
              <UserForm 
                cpf={cpf} setCpf={setCpf} nome={nome} setNome={setNome} 
                sobrenome={sobrenome} setSobrenome={setSobrenome} 
                isEditing={isEditing} onNext={() => validarCPF(cpf) && setStep(2)} 
              />
            ) : (
              <AddressForm 
                formData={addressData} setFormData={setAddressData} 
                onSearchCEP={buscarCEP} onSave={handleSave} loading={loading}
              />
            )}
          </View>
        )}

      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8e9', padding: 20 },
  menuContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mainIcon: { backgroundColor: '#a5d6a7', marginBottom: 20 },
  menuSurface: { padding: 20, width: '100%', borderRadius: 15, backgroundColor: '#fff' },
  menuBtn: { marginVertical: 10, borderColor: '#a5d6a7' }
});