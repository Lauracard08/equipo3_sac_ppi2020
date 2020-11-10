import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, KeyboardAvoidingView, TextInput } from 'react-native';
import { ImagesUtils } from '../tools/load_images';
import { Input } from 'react-native-elements';
import AppButton from '../custom_components/button';
import { FirebaseGoogleButton } from '../custom_components/firebaseGoogleButton';
import { Picker } from '@react-native-community/picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { throws } from 'assert';
import { AuthService } from '../services/auth.service';


export class RegisterScreen extends Component {
    private images = new ImagesUtils();
    private auth = AuthService.getInstance();
    private navigation;
    state = {
        userType: "estudiante",
        user: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    constructor(props: any) {
        super(props);
        this.navigation = props.navigation;
    }

    register = () => {
        if (!Boolean(this.state.user) || !Boolean(this.state.email) || !Boolean(this.state.password) || !Boolean(this.state.confirmPassword)) {
            alert("Los campos son obligatorios");
            return;
        }

        if (this.state.password != this.state.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        this.auth.signUp(this.state.email, this.state.password, this.state.userType, this.state.user).then(_ => {
            if (this.state.userType == 'estudiante') {
                this.auth.userType = false;
            }
            else {
                this.auth.userType = true;
            }
        });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>JAVACS</Text>
                    <Image
                        source={this.images.getImage("trash_robot")}
                        style={styles.titleImage} />
                </View>

                <Input
                    placeholder="Usuario"
                    onChangeText={text => this.setState({ user: text })} />
                <Input
                    placeholder="Correo electrónico"
                    onChangeText={text => this.setState({ email: text })} />
                <Input
                    placeholder="Contraseña"
                    onChangeText={text => this.setState({ password: text })} />
                <Input
                    placeholder="Confirmar contraseña"
                    onChangeText={text => this.setState({ confirmPassword: text })} />

                <Picker
                    selectedValue={this.state.userType}
                    style={{ height: hp(5), width: wp(99), marginBottom: 30 }}
                    onValueChange={(itemValue, itemIndex) => {
                        if (itemIndex)
                            this.auth.storeData('userType', "0")
                        else
                            this.auth.storeData('userType', "1")

                        this.setState({ userType: itemValue })
                    }}>
                    <Picker.Item label="Estudiante" value="estudiante" />
                    <Picker.Item label="Profesor" value="profesor" />
                </Picker>

                <AppButton
                    title="registrarse"
                    textColor="snow"
                    style={styles.button}
                    onPress={(_: any) => this.register()} />

                <FirebaseGoogleButton />
                <View style={{ height: 60 }} />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgb(192, 218, 252)"
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        height: hp(10),
        marginTop: hp(10),
        marginBottom: hp(5),
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 50,
        fontWeight: "bold"
    },
    titleImage: {
        width: wp(40),
        height: hp(40),
        marginLeft: -50
    },
    button: {
        width: wp(60),
        height: hp(10),
        backgroundColor: "rgb(10, 80, 245)",
    }
});

export default RegisterScreen;