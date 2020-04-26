import React, {FC} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface IProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
}

export const DateTimeModal: FC<IProps> = ({show, onClose, onConfirm}) => {
  const hideDatePicker = () => {
    onClose();
  };

  const handleConfirm = (date: any) => {
    hideDatePicker();
    onConfirm(date);
  };

  return (
    <DateTimePickerModal
      isVisible={show}
      mode="datetime"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
  );
};
