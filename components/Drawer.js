import SideMenu from 'react-native-side-menu';
import React from 'react';
import { Text, View } from 'react-native';
import Menu from './Menu';

export default class Drawer extends React.Component {
  render() {
    const menu = <Menu navigator={navigator}/>;
    return (
      <SideMenu menu={menu}>
			<View>
		</View>
      </SideMenu>
    );
  }
}
