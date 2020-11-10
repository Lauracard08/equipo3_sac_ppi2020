import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const NextButton = (props: any) => {
    const _styles = StyleSheet.compose(styles.buttonContainer, props.style);
    styles.buttonContainer = StyleSheet.flatten(_styles);

    return (
        <TouchableOpacity
            onPress={props.onPress}
            activeOpacity={0.8}
            style={styles.buttonContainer}>
            {props.icon ? (
                <>
                    <Image
                        source={props.icon}
                        style={[{width: 70, height: 70, resizeMode: "contain"}, props.imageStyle]} />
                </>
            ) : (
                    <>
                        <View style={styles.nextIcon}>
                            <View style={[styles.arrow, styles.leftArrow]}></View>
                            <View style={[styles.arrow, styles.innerArrow]}></View>
                            <View style={[styles.arrow, styles.rightArrow]}></View>
                        </View>
                    </>
                )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 4
    },
    nextIcon: {
        width: 45,
        height: 60,
    },
    arrow: {
        position: "absolute",
        borderRadius: 5,
        borderWidth: 30,
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
        borderRightColor: "transparent"
    },
    leftArrow: {
        borderLeftColor: "rgb(33, 85, 126)",
        zIndex: 2
    },
    innerArrow: {
        borderLeftColor: 'rgb(192, 218, 252)',
        left: 2,
        zIndex: 1
    },
    rightArrow: {
        left: 15,
        borderLeftColor: "rgb(33, 85, 126)",
    }
})

export default NextButton;