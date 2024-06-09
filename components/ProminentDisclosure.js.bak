import React from 'react';
import {
  View, Text, Modal, StyleSheet,
} from 'react-native';
import IconButton from './IconButton';

const ProminentDisclosure = ({ disclosureVisible, setDisclosureVisible, onAcknowledge }) => (
  <Modal
    animationType="fade"
    transparent
    visible={disclosureVisible}
    onRequestClose={() => setDisclosureVisible(false)}
  >
    <View style={styles.modalContainer}>
      <View />
      <View style={styles.resourceContainer}>
        <Text style={styles.modalTitle} allowFontScaling={false}>
          Location Permission
        </Text>
        <Text style={styles.modalText}>
          {'\n'}
          In order to calculate the distance, Please allow location access.
          {'\n'}
        </Text>
        <IconButton
          iconSize={0}
          title="OK"
          buttonStyle={styles.primaryButton}
          onPress={() => {
            setDisclosureVisible(false);
            onAcknowledge(); // Acknowledge the permission request
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
    backgroundColor: '#fafafa',
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
    backgroundColor: '#FDDEBA',
  },
});

export default ProminentDisclosure;
