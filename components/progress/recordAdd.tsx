import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Modal, Portal, TextInput, Button, useTheme } from 'react-native-paper';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { WorkoutRecord } from '@/contexts/api/record';

type RecordAddProps = {
  visible: boolean;
  onDismiss: () => void;
  onSave: (record: WorkoutRecord) => void;
};

export default function RecordAdd({ visible, onDismiss, onSave }: RecordAddProps) {
  const theme = useTheme();
  const [name, setName] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ id: Date.now(), name });
    setName('');
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>New Record</Text>
        <TextInput
          label="Record Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />

        <View style={styles.buttonRow}>
          <Button mode="contained" onPress={handleSave} disabled={!name.trim()} style={styles.button}>Save</Button>
          <Button mode="outlined" onPress={onDismiss} style={[styles.button, { borderColor: theme.colors.primary }]}>Cancel</Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: { margin: hp('4%'), padding: hp('3%'), borderRadius: hp('1.5%') },
  title: { fontSize: hp('2.2%'), fontWeight: '600', marginBottom: hp('2%') },
  input: { marginBottom: hp('2%') },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', gap: hp('1%') },
  button: { flex: 1, borderRadius: hp('2%') },
});
