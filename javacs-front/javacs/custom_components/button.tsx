import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { ImagesUtils } from '../tools/load_images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AppButton = (props: any) => {
    let _styles = StyleSheet.compose(styles.appButtonContainer, props.style);
    styles.appButtonContainer = StyleSheet.flatten(_styles);
    if (props.style)
        if (props.style.width || props.style.height) {
            const image_resize_styles = StyleSheet.create<any>({
                image: {
                    width: props.style.width - (props.style.width * 0.8),
                    height: props.style.height - 12
                }
            });

            let icon_style = StyleSheet.compose(styles.image, image_resize_styles.image);
            styles.image = StyleSheet.flatten(icon_style);
        }

    let color = (props.textColor) ? props.textColor : "black";
    let fontSize = (props.fontSize) ? props.fontSize : 18;
    const _auxiliar = StyleSheet.create<any>({
        auxiliar: {
            color: color,
            fontSize: fontSize,
        }
    });

    let __style = StyleSheet.compose(styles.appButtonText, _auxiliar.auxiliar);
    styles.appButtonText = StyleSheet.flatten(__style);

    if (props.icon) {
        let image = new ImagesUtils().getImage(props.icon);

        return (
            <TouchableOpacity onPress={props.onPress} style={styles.appButtonContainer} activeOpacity={0.6}>
                <Image
                    source={image}
                    style={styles.image} />
                <Text style={[styles.appButtonText, styles.paddingText]}>{props.title}</Text>
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity onPress={props.onPress} style={styles.appButtonContainer} activeOpacity={0.6}>
                <Text style={styles.appButtonText}>{props.title}</Text>
            </TouchableOpacity>
        );
    }
};

var styles = StyleSheet.create({
    appButtonText: {
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    },
    image: {
        position: "absolute",
        left: 4,
        top: 6,
        width: wp(15),
        height: hp(8),
        resizeMode: "contain",
    },
    appButtonContainer: {
        backgroundColor: "#009688",
        borderRadius: 4,
        display: "flex",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 12,
        overflow: "hidden"
    },
    paddingText: {
        marginHorizontal: wp(15)
    }
});

export default AppButton;