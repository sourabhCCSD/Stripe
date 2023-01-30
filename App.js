import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StripeApp from './src/StripeApp';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  return (
    <StripeProvider publishableKey='pk_test_51MVTzOSGV3ffUpQpwGAcK3NC5jG9JVljdBRXueRvSh8mYoKmo4QC0nwyMGVzWnJmNgtUsAYgOzK7h4H0V2rLWGzC00iXFyI7uv'>
    <StripeApp />
    </StripeProvider>
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
