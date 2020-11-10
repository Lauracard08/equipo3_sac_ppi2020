import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import AppButton from './button';
import { AuthService } from '../services/auth.service';
import { GoogleSignInService } from '../services/googleSignIn.service';

export class FirebaseGoogleButton extends React.Component {
    public state = { user: null };
    private width = Dimensions.get('window').width;
    private googleSignInService = GoogleSignInService.getInstance();

    private styles = StyleSheet.create({
        button: {
            width: this.width,
            height: 60,
            backgroundColor: 'rgb(219, 74, 57)'
        }
    });

    componentDidMount() {
        this.initAsync();
    };

    initAsync = async () => {
        this._syncUserWithStateAsync();
    };

    _syncUserWithStateAsync = async () => {
        let user = await this.googleSignInService._syncUserWithStateAsync();
        this.setState({ user });
    };

    signOutAsync = async () => {
        await this.googleSignInService.signOutAsync();
    };

    signInAsync = async () => {
        try {
            let type = await this.googleSignInService.signInAsync();
            if (type === 'success') {
                this._syncUserWithStateAsync();
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    };

    onPress = () => {
        if (this.state.user) {
            this.signOutAsync();
        }
        else {
            this.signInAsync();
        }
    };

    render() {
        let that = this;
        if (that.state.user)
            return <Text onPress={this.onPress}>SingOut</Text>
        else
            return <AppButton
                title="Ingresa con google"
                onPress={this.onPress}
                style={that.styles.button}
                textColor="snow"
                icon="google_logo"></AppButton>
    }
}