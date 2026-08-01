import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Button,
  Dialog,
  Portal,
} from 'react-native-paper';

type AppDialogType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

type AppDialogProps = {
  visible: boolean;

  type?: AppDialogType;

  title: string;
  message: string;

  confirmText?: string;
  cancelText?: string;

  loading?: boolean;

  onConfirm: () => void;
  onCancel: () => void;
};

const dialogConfig = {
  info: {
    icon: 'info',
    color: '#2196F3',
  },

  success: {
    icon: 'check-circle',
    color: '#43A047',
  },

  warning: {
    icon: 'warning',
    color: '#FB8C00',
  },

  error: {
    icon: 'error',
    color: '#E53935',
  },
} as const;

export default function AppDialog({
  visible,

  type = 'info',

  title,
  message,

  confirmText = 'Aceptar',
  cancelText = 'Cancelar',

  loading = false,

  onConfirm,
  onCancel,
}: AppDialogProps) {
  const config = dialogConfig[type];

  return (
    <Portal>
      <Dialog
        visible={visible}
        dismissable={!loading}
        onDismiss={onCancel}
      >
        <Dialog.Icon
          icon={() => (
            <MaterialIcons
              name={config.icon}
              size={48}
              color={config.color}
            />
          )}
        />

        <Dialog.Title>
          {title}
        </Dialog.Title>

        <Dialog.Content>
          <Dialog.Content>
            {message}
          </Dialog.Content>
        </Dialog.Content>

        <Dialog.Actions>
          <Button
            disabled={loading}
            onPress={onCancel}
          >
            {cancelText}
          </Button>

          <Button
            loading={loading}
            onPress={onConfirm}
          >
            {confirmText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}