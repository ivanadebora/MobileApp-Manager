import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import { logoutUser } from '../actions';
import { Card, Button, CardSection } from './common';


class Profile extends Component{
    static navigationOptions = {
        drawerLabel: 'Profile'
    };

    state = { email: ''}

    componentDidMount() {
        if (this.props.user) {
            if(this.props.user.user) {
                this.setState({ email: this.props.user.user.email })
            }
            else {
                this.setState({ email: this.props.user.email })
            }
            
        }
    }

    logOut = () => {
        this.props.logoutUser();
        this.props.screenProps.rootNavigation.navigate('Login')
    }

    render() {
        return (
            <View>
                <Header 
                    placement="left"
                    leftComponent={{
                        icon: 'menu',
                        color: '#fff',
                        onPress: () => this.props.navigation.toggleDrawer()
                    }}
                    centerComponent={{text: 'Profile', style: { color: '#fff' }}}
                    rightComponent={{
                        icon: 'home',
                        color: '#fff',
                        onPress: () => this.props.navigation.navigate('EmployeeList')
                    }}
                />
                {/* <Text>Ini page Profile.</Text> */}
                <Card>
                    <CardSection>
                        <Text>Email: {this.state.email}</Text>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.logOut}>
                            LogOut
                        </Button>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.auth.user)
    return { user: state.auth.user}
}

export default connect(mapStateToProps, { logoutUser })(Profile);