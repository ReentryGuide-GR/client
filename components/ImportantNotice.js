import React from 'react';
import {
  View, Text, Modal, StyleSheet,
} from 'react-native';
import IconButton from './IconButton';

const ImportantNotice = ({ modalVisible, setModalVisible, setImportantNoticeSeen }) => (
  <Modal
    animationType="fade"
    transparent
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalContainer}>
      <View />
      <View style={styles.resourceContainer}>
        <Text style={styles.modalTitle} allowFontScaling={false}>
          Important Notice
        </Text>
        <Text style={styles.modalText}>
          {'\n'}
          Please do not rely solely on this app for navigation.
          {'\n'}
          Check your route and stay alert.
          {'\n'}
          If you feel lost or unsure, ask for help.
          {'\n'}
        </Text>
        <IconButton
          iconSize={0}
          title="I Understand"
          buttonStyle={styles.primaryButton}
          onPress={() => {
            setModalVisible(false);
            setImportantNoticeSeen(); // Set the tutorial as seen
          }}
        />
      </View>
      <View />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '5%',
    paddingBottom: 20,
  },
  modalText: {
    marginBottom: 10,
    marginLeft: 7,
    fontSize: 17,
    color: '#2F2E41',
    width: '100%',
    fontFamily: 'Manrope-Bold',
  },
  modalTitle: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '100%',
  },
  resourceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  primaryButton: {
    backgroundColor: '#eae0d4',
  },
});

export default ImportantNotice;
