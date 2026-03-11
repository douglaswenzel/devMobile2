import * as React from 'react';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native';

const FormAPI = () => {
  const [formData, setFormData] = React.useState({
    cep: '',
    logradouro: '', 
    numero: '',
    complemento: '', 
    bairro: '',
    localidade: '',
    uf: ''
  });

  const [showFields, setShowFields] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

    const consultarCEP = async () => {
    const cepLimpo = formData.cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError(true);
      } else {
        setFormData(prev => ({
          ...prev,
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
          complemento: data.complemento
        }));
        setShowFields(true);
        console.log(data);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <TextInput
        mode="outlined"
        label="CEP"
        placeholder="00000-000"
        value={formData.cep}
        onChangeText={(v) => handleInputChange('cep', v)}
        keyboardType="numeric"
        maxLength={9}
        error={error}
        right={<TextInput.Icon icon="magnify" />}
      />

      {error && <HelperText type="error">CEP não encontrado.</HelperText>}

      {!showFields && (
        <Button 
          mode="contained" 
          onPress={consultarCEP} 
          loading={loading}
          disabled={loading || formData.cep.length < 8}
          style={{ marginTop: 10 }}
        >
          Pesquisar
        </Button>
      )}
    </ScrollView>
  );
};

export default FormAPI;