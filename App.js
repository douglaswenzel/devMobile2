import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator, TextInput } from 'react-native';

export default function App() {

  const [cep, setCep] = useState([]);

  const [loading, setLoading] = useState(false);

  const buscaCep = async (X) => {
    let url = `https://viacep.com.br/ws/${X}/json`;
    setLoading(true);
    await fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setCep(data);
        console.log("-----" + data.ddd);
      })
      .catch(error => console.log(error));

    setLoading(false);
  };


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        title=" Cep "
        onPress={() => buscaCep('18080000')}
      />

      <TextInput
        value={cep.logradouro}
        onChangeText={text => setCep({ ...cep, logradouro: text})}
        style={ {height: 40, borderColor: 'gray', borderWidth: 1} }
      />

      {loading && <ActivityIndicator size="large" />}

      {cep != null && (
        <View>
          <Text> Rua: {cep.logradouro} </Text>
          <Text> Bairro: {cep.bairro}</Text>
          <Text> Cidade: {cep.cidade} </Text>
          <Text> Estado: {cep.uf} </Text>
        </View>)
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
