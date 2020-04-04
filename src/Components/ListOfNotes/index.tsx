import React, {FC} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  RecyclerViewBackedScrollView,
} from 'react-native';
import {styles} from './styles';

export const ListOfNotes: FC = () => {
  const mocks = [
    {
      id: 1,
      title: 'Titulo',
      text: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus 
      doloribus facilis sit eveniet possimus modi, consequuntur culpa? At
      officia blanditiis aperiam assumenda nesciunt aut, voluptas culpa
      placeat. Earum, quos maxime.`,
      image: 'https://wallpapercave.com/wp/wp5065028.jpg',
    },
    {
      id: 2,
      title: 'Titulo',
      text: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
      image: 'https://wallpapercave.com/wp/wp5065028.jpg',
    },
    {
      id: 3,
      title: 'Titulo',
      text: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus`,
      image: 'https://wallpapercave.com/wp/wp5065028.jpg',
    },
    {
      id: 4,
      title: 'Titulo',
      text: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
      doloribus facilis sit eveniet possimus modi, consequuntur culpa? At
      officia blanditiis aperiam assumenda nesciunt aut, voluptas culpa
      placeat. Earum, quos maxime.`,
      image: 'https://wallpapercave.com/wp/wp5065028.jpg',
    },
    {
      id: 5,
      title: 'chingada',
      text: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
      image: 'https://wallpapercave.com/wp/wp5065028.jpg',
    },
    {
      id: 6,
      title: 'chingada',
      text: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
      image: 'https://wallpapercave.com/wp/wp5065028.jpg',
    },
    {
      id: 7,
      title: 'Pan',
      text: `Comprar pan`,
      image: 'https://wallpapercave.com/wp/wp5065028.jpg',
    },
    {
      id: 8,
      title: 'Titulo',
      text: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
      doloribus facilis sit eveniet possimus modi, consequuntur culpa? At
      officia blanditiis aperiam assumenda nesciunt aut, voluptas culpa
      placeat. Earum, quos maxime.`,
      image: 'https://wallpapercave.com/wp/wp5065028.jpg',
    },
  ];

  const cutText = (txt: string) => {
    if (txt.length > 100) {
      return txt.substr(0, 100) + '...';
    }

    return txt;
  };

  const cardNote = ({item, index}: any) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.containerItem,
        {marginTop: index === 0 ? 10 : 0},
      ]}>
      <Image style={styles.image} source={{uri: item.image}} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.noteText}>{cutText(item.text)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{marginBottom: 60}}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <FlatList
          style={{marginHorizontal: 5}}
          data={mocks.filter((item, index) => (index % 2 ? false : true))}
          renderItem={(item) => cardNote(item)}
          scrollEnabled={false}
          /* numColumns={2}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'space-between',
        }} */
        />
        <FlatList
          style={{marginHorizontal: 5}}
          data={mocks.filter((item, index) => (index % 2 ? true : false))}
          renderItem={(item) => cardNote(item)}
          scrollEnabled={false}
          /* numColumns={2}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'space-between',
        }} */
        />
      </View>
    </ScrollView>
  );
};
