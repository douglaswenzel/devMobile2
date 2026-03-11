import * as React from 'react';
import { TextInput } from 'react-native-paper';

const FormAPI = () => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      mode="outlined"
      label="CEP"
      placeholder="00000-000"
      value={text}
      onChangeText={setText}
      right={<TextInput.Affix text="/8" />}
    />
  );
};

export default FormAPI;