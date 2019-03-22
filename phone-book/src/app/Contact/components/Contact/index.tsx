import * as React from 'react';
import { AppContact } from '../../interfaces';
import { AppSearchDispatch } from '../../../Nav/interfaces';
import { Card, CardHeader, CardContent, Typography, Divider, CardActionArea } from '@material-ui/core';
import { Phone } from '@material-ui/icons';
import ContactStyles from './styles';
import { ContactButtons } from '../../components';

class Contact extends React.PureComponent<AppContact & AppSearchDispatch, {}> {

  private getHeader(): React.ReactNode {
    const {name, id, toggleContact} = this.props;
    return (
      <CardHeader
        className={`contact-header`}
        title={`${name.first}  ${name.last}`}
        onClick={() => toggleContact(id)}
      />
    );
  }

  public render() {
    const {phone, id, deleteContact, expanded} = this.props;
    return (
      <ContactStyles>
        <Card className="contact-card">
          <CardActionArea className={`card-action`}>
            {this.getHeader()}
          </CardActionArea>
          <Divider/>
          {expanded && <CardContent className={`contact-content expanded`}>
            <Typography component="div">
              <Typography component="div" className={'phones-header'}>
                {phone.length > 1 ? 'Phones:' : 'Phone:'}
              </Typography>
              <div className={`phones-container`}>
                {phone.map((phone: any) => <a href={`tel:${phone}`} className="phone" key={phone}><Phone/>{phone}</a>)}
              </div>
            </Typography>
            <Divider/>
            <div className="buttons-container">
              <ContactButtons contactId={id} deleteContact={deleteContact}/>
            </div>
          </CardContent>}
        </Card>
      </ContactStyles>
    );
  }
}

export default Contact;
