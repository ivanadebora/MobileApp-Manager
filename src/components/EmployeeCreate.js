import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { employeeCreate } from '../actions'
import EmployeeForm from './EmployeeForm';
import { Card, Button, CardSection } from './common';


class EmployeeCreate extends Component{
    static navigationOptions = {
        drawerLabel: 'Add New Employee'
    };

    onButtonSavePress = () => {
        const { name, phone, shift } = this.props;
        this.props.employeeCreate(name, phone, shift || 'Sunday')
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
                    centerComponent={{text: 'Add Employee', style: { color: '#fff' }}}
                    rightComponent={{
                        icon: 'home',
                        color: '#fff',
                        onPress: () => this.props.navigation.navigate('EmployeeList')
                    }}
                />
                {/* <Text>Ini page Employee Create.</Text> */}
                <Card>
                    <EmployeeForm 
                        //karyawan={{ name: this.props.name, phone:this.props.phone, shift: this.props.shift }}
                        //{...this.props}
                    />
                    <CardSection>
                        <Button onPress={this.onButtonSavePress}>
                            Save
                        </Button>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift };
}

export default connect(mapStateToProps, {employeeCreate})(EmployeeCreate);