import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  const [cep, setCep] = useState([]);

  const buscaCep = async (X) => {
    let url = `https://viacep.com.br/ws/${X}/json`;
    await fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setCep(data);
        console.log("-----" + data.ddd);
      })
      .catch(error => console.log(error));
  };


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        title=" Cep "
        onPress={() => buscaCep('18080000')}
      />

      { cep != null && (
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
