import { StyleSheet, Text, View } from 'react-native';
import FormAPI from './FormAPI';

export default function App() {
  return (
    <View style={styles.container}>
      <FormAPI />
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
