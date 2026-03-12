import * as React from 'react';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';

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
        label="CEP"
        placeholder="00000-000"
        value={formData.cep}
        onChangeText={(text) => setFormData({...formData, cep: text})}
        right={<TextInput.Affix text="/8" />}
      />
    </ScrollView>

  );
};

export default FormAPI;