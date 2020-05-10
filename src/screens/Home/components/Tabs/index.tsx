import React, {FC, useState} from 'react';
import {Dimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

import {ListOfNotes} from '../../../../components/ListOfNotes';
import {ListOfTasks} from '../../../../components/ListOfTasks';
import {theme} from '../../../../assets/themes';
import {MNote} from 'src/models/note.model';

export const Tabs: FC<{notes: MNote[], navigation: any}> = ({notes, navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'notes', title: 'Notas'},
    {key: 'tasks', title: 'Tareas'},
  ]);

  const _renderScene = ({route}: any) => {
    switch (route.key) {
      case 'notes':
        return <ListOfNotes navigation={navigation}/>;
      case 'tasks':
        return <ListOfTasks navigation={navigation} />;
      default:
        return null;
    }
  };

  const _renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        indicatorContainerStyle={{backgroundColor: theme().primary}}
      />
    );
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={_renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: Dimensions.get('window').width}}
      renderTabBar={_renderTabBar}
    />
  );
};
