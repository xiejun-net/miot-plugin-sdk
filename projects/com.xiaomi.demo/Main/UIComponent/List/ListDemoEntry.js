'use strict';

import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { Image, ListView, PixelRatio, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Logger from '../../Logger';

export default class CardDemoEntry extends React.Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(
        [
          { name: '自定义列表 CustomListDemo', router: 'CustomListDemo' },
          { name: '带刷新的列表 RefreshListViewDemo', router: 'RefreshListViewDemo' },
          { name: '大字体模式 AdaptedFontListDemo', router: 'AdaptedFontListDemo' }
        ])
    };
    Logger.trace(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView style={styles.list} dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)} />
      </View>
    );
  }

  _renderRow(rowData) {
    return (
      <TouchableHighlight underlayColor="#838383" onPress={() => this._pressRow(rowData.router)}>
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{rowData.name}</Text>
            <Image style={styles.subArrow} source={require('../../../Resources/sub_arrow.png')} />
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(rowData) {
    console.log(`row${ rowData }clicked!`);
    this.props.navigation.navigate(rowData, {
      title: rowData
    });
    Logger.trace(this, this._pressRow, { page: rowData });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: '#f1f1f1',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 0
  },

  rowContainer: {
    height: 52,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 23,
    paddingRight: 23,
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFF'
  },
  list: {
    alignSelf: 'stretch'
  },

  title: {
    fontSize: 15,
    color: '#333333',
    alignItems: 'center',
    flex: 1
  },
  subArrow: {
    width: 7,
    height: 14
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#e5e5e5',
    marginLeft: 20
  }
});
