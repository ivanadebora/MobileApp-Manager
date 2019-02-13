import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getEmployeeList } from '../actions'
import EmployeeListItem from './EmployeeListItem';


class EmployeeList extends Component{
    static navigationOptions = {
        drawerLabel: 'Employee List'
    };

    componentDidMount() {
        this.props.getEmployeeList();
    }

    renderRow = ({item}) => {
        return <EmployeeListItem employee={item} navigation={this.props.navigation}/>
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
                    centerComponent={{text: 'List Employee', style: { color: '#fff' }}}
                />
                {/* <Text>Ini page Employee List.</Text> */}

                <FlatList 
                    data = {this.props.employees}
                    renderItem = {this.renderRow}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.employees); // {uid:{nama,phone,shift}}

    const employees = _.map(state.employees, (val,uid) => {
        return { ...val, uid }
    });
    //lodash digunakan utk mengkonvert data dari firebase yg berupa object menjadi array of object
    console.log(employees); // [{nama,phone,shift,uid}]

    return {employees};
};

export default connect(mapStateToProps, { getEmployeeList })(EmployeeList);