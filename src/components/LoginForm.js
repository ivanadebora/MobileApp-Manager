import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import { Card, CardSection, Button, Input, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions'


class LoginForm extends Component {


    componentDidUpdate() {
        if(this.props.user){
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'MainMenu' })],
            });
            this.props.navigation.dispatch(resetAction)
        }
    }

    onEmailChange = (text) => {
        this.props.emailChanged(text)
    }

    onPasswordChange = (text) => {
        this.props.passwordChanged(text)
    }

    onButtonPress = () => {
        const { email, password } = this.props;

        this.props.loginUser({email, password})
    }

    renderError() {
        if(this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        if(this.props.loading) {
            return <Spinner size='large' />
        }
        return (
            <Button onPress={this.onButtonPress}>
                    Login
            </Button>
        );
    }

    renderFormLogin = () => {
        if(this.props.checkedAuth === false){
            return <Spinner/>
        }
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChange}
                        value={this.props.email} 
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange}
                        value={this.props.password} 
                    />
                </CardSection>
                {this.renderError()}
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }

    render() {
        return (
            <View>
                <Header 
                    // containerStyle={{
                    //     backgroundColor: '#000',
                    //   }}
                    centerComponent={{text: 'Please Login', style: {color: '#fff', fontSize:20}}}
                />
                {this.renderFormLogin()}
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'red'
    }
}

// const mapStateToProps = (state) => {
//     return {
//         email: state.auth.email,
//         password: state.auth.password,
//         error: state.auth.error,
//         loading: state.auth.loading,
//         user: state.auth.user
//     }
// }

const mapStateToProps = (state) => {
    const { email, password, error, loading, user, checkedAuth } = state.auth;
    return { email, password, error, loading, user, checkedAuth };
}


export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginForm);