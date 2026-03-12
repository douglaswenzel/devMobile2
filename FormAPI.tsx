import { Picker } from '@react-native-picker/picker';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, HelperText, TextInput as PaperInput, Text } from 'react-native-paper';

const TextInput = PaperInput as any;

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

          <TextInput
            mode="outlined"
            label="Bairro"
            value={formData.bairro}
            onChangeText={ (v) => atualizarCampo('bairro', v)}
          />

          <TextInput
            mode="outlined"
            label="Cidade"
            value={formData.localidade}
            onChangeText={ (v) => atualizarCampo('localidade', v)}
          />


          <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 1, marginTop: 10, marginBottom: 20 }}>
            <Text style={{ position: 'absolute', top: -10, left: 10, backgroundColor: '#fff', paddingHorizontal: 5, fontSize: 12, color: '#79747e' }}>
                Estado (UF)
            </Text>
            <Picker
              selectedValue={formData.uf}
              onValueChange={(v) => atualizarCampo('uf', v)}
            >
              <Picker.Item label="Selecione..." value="" />
              {ESTADOS_BR.map(uf => <Picker.Item key={uf} label={uf} value={uf} />)}
            </Picker>
          </View>

          <Button 
            mode="contained" 
            onPress={() => alert('Dados salvos com sucesso!')}
            buttonColor="#2e7d32"
            icon="check"
          >
            Salvar Endereço
          </Button>
          <Button
            onPress={() => {setExpandido(false); atualizarCampo('cep', '');}}
          >
            Limpar
          </Button>
        </View>
      )}
    </ScrollView>

  );
};

export default FormAPI;