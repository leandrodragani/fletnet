import React from 'react';
import { TouchableOpacity, FlatList, Platform } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { ActionsModal } from '../../../../../../components/actions-modal';
import { Container } from './styles';

export const ModalPicker = ({ data, visible, onClose, onPressItem, title }) => {
  return (
    <ActionsModal type="dark" visible={visible} onRequestClose={onClose} title={title}>
      <Container>
        <FlatList
          style={{ flex: 1 }}
          data={data}
          removeClippedSubviews={Platform.OS === 'android'}
          ItemSeparatorComponent={() => (
            <Divider
              style={{
                backgroundColor: '#F4F4F6',
                marginVertical: 5,
                marginHorizontal: 5,
                opacity: 0.1
              }}
            />
          )}
          renderItem={({ item }) => (
            <ListItem
              titleStyle={{ fontSize: 18, fontWeight: 'normal', color: 'white' }}
              title={item.label}
              containerStyle={{
                paddingHorizontal: 8,
                paddingVertical: 10,
                backgroundColor: 'transparent'
              }}
              onPress={() => onPressItem(item)}
              Component={TouchableOpacity}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </Container>
    </ActionsModal>
  );
};
