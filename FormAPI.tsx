import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

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

  const ESTADOS_BR = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const [loading, setLoading] = React.useState(false);
  const [expandido, setExpandido] = React.useState(false);
  const [erro, setErro] = React.useState(false);
  const [menuAberto, setMenuAberto] = React.useState(false);

  const atualizarCampo = (campo: string, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  };

  const buscarDados = async () => {
    const cepNumerico = formData.cep.replace(/\D/g, '');

    if (cepNumerico.length !== 8) {
      setErro(true);
      return;
    }

    setLoading(true);
    setErro(false);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErro(true);
      } else {
        setFormData(prev => ({
          ...prev,
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
        }));
        setExpandido(true);
      }
    } catch (error) {
      setErro(true);
    } finally {
      setLoading(false);
    } 
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput
        mode="outlined"
        label="Digite o seu CEP"
        placeholder="00000-000"
        value={formData.cep}
        onChangeText={(v) => atualizarCampo('cep', v)}
        right={<TextInput.Affix text="/8" />}
        error={erro}
        keyboardType='numeric'
        style={{ marginBottom: 10 }}
      />

      {erro && <HelperText type="error">CEP inválido. Insira um CEP existente! </HelperText>}

      {!expandido && (
        <Button 
          mode="contained" 
          onPress={buscarDados} 
          loading={loading}
          style={{ paddingVertical: 5 }}
        >
          {loading ? 'Buscando...' : 'Verificar Endereço'}
        </Button>
      )}

      {expandido && (
        <View>
          <TextInput
            mode="outlined"
            label="Logradouro"
            value={formData.logradouro}
            onChangeText={(v) => atualizarCampo('logradouro', v)}
          />

          <TextInput
            mode="outlined"
            label="Número"
            value={formData.numero}
            onChangeText={(v) => atualizarCampo('numero', v)}
          />

          <TextInput 
            mode="outlined"
            label="Complemento"
            value={formData.complemento}
            onChangeText={ (v) => atualizarCampo('complemento', v) }
          />
          
        </View>
      )}
    </ScrollView>

  );
};

export default FormAPI;