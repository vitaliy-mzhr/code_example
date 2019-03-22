import * as React from 'react';
import { DeleteForeverOutlined, EditOutlined } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';
import ContactButtonStyles from './styles';
import { AlertDialog } from '../../../common';
import { AppContactAction } from '../../interfaces';
import { Link } from 'react-router-dom';

interface AppContactButtonsProps {
  contactId: number;
  deleteContact: (id: number) => AppContactAction;
}

interface AppNoteButtonsState {
  opened: boolean;
}

class ContactButtons extends React.Component<AppContactButtonsProps, AppNoteButtonsState> {

  public state = {
    opened: false,
  };

  private openDialog = () => this.setState(() => ({opened: true}));

  private closeDialog = () => this.setState(() => ({opened: false}));

  public render() {
    const {contactId, deleteContact} = this.props;
    const {opened} = this.state;
    return (
      <ContactButtonStyles>
        <AlertDialog
          title={`Are you sure? `}
          onClose={this.closeDialog}
          opened={opened}
          onConfirm={() => deleteContact(contactId)}
        />
          <Link to={`/edit/${contactId}`}>
            <Tooltip title={`Edit contact`}>
            <IconButton className="contact-button">
              <EditOutlined className="contact-icon edit-icon"/>
            </IconButton>
            </Tooltip>
          </Link>
        <Tooltip title={`Delete contact`}>
          <IconButton onClick={this.openDialog} className="contact-button">
            <DeleteForeverOutlined className="contact-icon delete-icon"/>
          </IconButton>
        </Tooltip>
      </ContactButtonStyles>
    );
  }
}

export default ContactButtons;
