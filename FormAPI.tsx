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

  const [loading, setLoading] = React.useState(false);
  const [expandido, setExpandido] = React.useState(false);
  const [erro, setErro] = React.useState(false);
  const [menuAberto, setMenuAberto] = React.useState(false);

  const atualizarCampo = (campo: string, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  };

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