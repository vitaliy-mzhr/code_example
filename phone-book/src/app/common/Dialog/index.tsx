import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import AlertDialogStyles from './styles';

interface AlertDialogProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const AlertDialog: React.StatelessComponent<AlertDialogProps> = ({opened, onClose, onConfirm, children, title}) => (
  <Dialog
    open={opened}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <AlertDialogStyles>
      <DialogTitle className="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="buttons-container">
        <IconButton
          onClick={() => {
            onConfirm();
            onClose();
          }}
          autoFocus={true}
        >
          <Check className="confirm-button-icon"/>
        </IconButton>
        <IconButton onClick={onClose}>
          <Close className="cancel-button-icon"/>
        </IconButton>
      </DialogActions>
    </AlertDialogStyles>
  </Dialog>
);

export default AlertDialog;
