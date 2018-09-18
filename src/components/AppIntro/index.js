'use strict';

import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Animated,
    Alert
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window');
import DoneButton from '../Buttons/DoneButton';
import SkipButton from '../Buttons/SkipButton';
import RenderDots from '../Buttons/Dots';
import assign from 'assign-deep';

const defaulStyles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    wrapper: {
        // backgroundColor: '#f00'
    },
    slide: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    container: {
        flex: 1,
    },
    imgBackground: {
        width,
        height,
        // backgroundColor: 'transparent',
        position: 'absolute'
    },
    image: {
        width,
        height,
    },
    header: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pic: {
        width: 150,
        height: 150,
    },
    info: {
        flex: 0.5,
        alignItems: 'center',
        padding: 30,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        padding: 15,
    },
    title: {
        color: '#fff',
        fontSize: 30,
        paddingBottom: 20,
    },
    description: {
        color: '#fff',
        fontSize: 20,
    },
    controllText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    dotStyle: {
        backgroundColor: 'rgba(255,255,255,.3)',
        width: 13,
        height: 13,
        borderRadius: 7,
        marginLeft: 7,
        marginRight: 7,
        marginTop: 7,
        marginBottom: 7,
    },
    activeDotStyle: {
        backgroundColor: '#fff',
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    dotContainer: {
        flex: 0.6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    nextButtonText: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        // bottom: 50
    },
    full: {
        height: 80,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
}

export default class App extends Component {

    constructor(props) {
        super(props);
        this.styles = StyleSheet.create(assign({}, defaulStyles, props.customStyles));
        this.state = {
            skipFadeOpacity: new Animated.Value(1),
            doneFadeOpacity: new Animated.Value(0),
            nextOpacity: new Animated.Value(1),
            index: 0
        };
    }

    setDoneBtnOpacity = (value) => {
        Animated.timing(
            this.state.doneFadeOpacity,
            { toValue: value },
        ).start();
    }

    setSkipBtnOpacity = (value) => {
        Animated.timing(
            this.state.skipFadeOpacity,
            { toValue: value },
        ).start();
    }

    setNextOpacity = (value) => {
        Animated.timing(
            this.state.nextOpacity,
            { toValue: value },
        ).start();
    }

    renderPagination = (index, total, context) => {
        let isDoneBtnShow;
        let isSkipBtnShow;
        if (index === total - 1) {
            this.setDoneBtnOpacity(1);
            this.setSkipBtnOpacity(0);
            this.setNextOpacity(0);
            isDoneBtnShow = true;
            isSkipBtnShow = false;
        } else {
            this.setDoneBtnOpacity(0);
            this.setSkipBtnOpacity(1);
            this.setNextOpacity(1);
            isDoneBtnShow = false;
            isSkipBtnShow = true;
        }
        return (
            <View style={[this.styles.paginationContainer]}>
                {this.props.showSkipButton ? <SkipButton
                    {...this.props}
                    {...this.state}
                    isSkipBtnShow={isSkipBtnShow}
                    styles={this.styles}
                    onSkipBtnClick={this.props.onSkipBtnClick} /> :
                    <View style={this.styles.btnContainer} />
                }
                {this.props.showDots && RenderDots(index, total, {
                    ...this.props,
                    styles: this.styles
                })}
                {this.props.showDoneButton ? <DoneButton
                    {...this.props}
                    {...this.state}
                    isDoneBtnShow={isDoneBtnShow}
                    styles={this.styles}
                    onDoneBtnClick={this.props.onDoneBtnClick} /> :
                    <View style={this.styles.btnContainer} />
                }
            </View>
        );
    }

    nextButton = () => {
        <Text style={this.styles.nextButtonText}>›</Text>
    }

    refScrollView = view => {
        this.scrollView = view;
    }

    render() {
        //hide yellow warnings...
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
        console.disableYellowBox = true;

        return (
            <View style={this.styles.container}>
                <Swiper style={this.styles.wrapper}
                    paginationStyle={{
                        bottom: 50
                    }}
                    showsButtons={true}
                    // nextButton={this.nextButton}
                    loop={false}
                    renderPagination={this.renderPagination}
                    onIndexChanged={(index) => {
                        this.setState({ index: index })
                    }}
                    ref={this.refScrollView}
                >
                    <View style={this.styles.slide}>
                        <Image
                            style={this.styles.image}
                            source={require('../../public/img/3/2.png')}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={this.styles.slide}>
                        <Image
                            style={this.styles.image}
                            source={require('../../public/img/3/3.png')}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={this.styles.slide}>
                        <Image
                            style={this.styles.image}
                            source={require('../../public/img/3/1.png')}
                            resizeMode='cover'
                        />
                    </View>
                </Swiper>
            </View>
        );
    }
}

App.defaultProps = {
    dotColor: 'rgba(255,255,255,.3)',
    activeDotColor: '#fff',
    rightTextColor: '#fff',
    leftTextColor: '#fff',
    onSkipBtnClick: () => { },
    onDoneBtnClick: () => { },
    doneBtnLabel: 'Done',
    skipBtnLabel: 'Skip',
    showSkipButton: true,
    showDoneButton: true,
    showDots: true
};
