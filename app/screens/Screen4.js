import React, { Component } from 'react';
import { Text } from 'react-native';
import Container from '../components/Container';

class Screen extends Component {
  handlePress = () => {
    this.props.navigator.dismissModal();
  };

  render() {
    return (
      <Container
        backgroundColor="#01446b"
        onPress={this.handlePress}
      >
      <View style={styles.footer}>
    <Container>
        <Button 
            label="Sign In"
            styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
            onPress={this.press.bind(this)} />
    </Container>
    <Container>
        <Button 
            label="CANCEL"
            styles={{label: styles.buttonBlackText}} 
            onPress={this.press.bind(this)} />
    </Container>
</View>
</Container>
    );
  }
}

export default Screen;
