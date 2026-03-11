import * as React from 'react';
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

  return (
    <TextInput
      mode="outlined"
      label="CEP"
      placeholder="00000-000"
      value={formData.cep}
      onChangeText={(text) => setFormData({...formData, cep: text})}
      right={<TextInput.Affix text="/8" />}
    />
  );
};

export default FormAPI;