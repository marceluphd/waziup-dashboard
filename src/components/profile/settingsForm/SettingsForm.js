import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form'
 import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui'
import { Row, Col} from 'react-grid-system'

class settingsForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        form:{}
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps){
  }

  render() {
    const { onSubmit } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <Row>
          <Col md={1}>
            <Field name="ServicePath"
              component={TextField}
              hintText="Fiware-ServicePath"
              floatingLabelText="Fiware-ServicePath"
              ref="ServicePath" withRef/>
            <Field
              name="Phone"
              component={TextField}
              hintText="Phone Number"
              floatingLabelText="Phone Number"
               ref="Phone" withRef />
            <Field
              name="Facebook"
              component={TextField}
              hintText="Facebook"
              floatingLabelText="Facebook"
               ref="Facebook" withRef />
            <Field
              name="Twitter"
              component={TextField}
              hintText="Twitter"
              floatingLabelText="Twitter"
               ref="Twitter" withRef />
            <RaisedButton
                label="Submit"
                primary={true}
                onTouchTap={()=>{
                  this.props.submit();
                }}
              />
           </Col>
        </Row>
      </form>
    );
  }
}
// Decorate with redux-form
settingsForm = reduxForm({
  form: 'settingsForm',
  enableReinitialize : true, // this is needed!!
})(settingsForm);

settingsForm = connect(
  state => ({
    initialValues: {
      'ServicePath': state.currentUser.currentUser.attributes ? (state.currentUser.currentUser.attributes.ServicePath ? state.currentUser.currentUser.attributes.ServicePath[0] : "" ) : "",
      'Phone': state.currentUser.currentUser.attributes ? (state.currentUser.currentUser.attributes.Phone ? state.currentUser.currentUser.attributes.Phone[0]:"") : "",
      'Facebook': state.currentUser.currentUser.attributes ? (state.currentUser.currentUser.attributes.Facebook ? state.currentUser.currentUser.attributes.Facebook[0]:"") : "",
      'Twitter': state.currentUser.currentUser.attributes ? (state.currentUser.currentUser.attributes.Twitter ? state.currentUser.currentUser.attributes.Twitter[0]:"") : ""
    }
  })
)(settingsForm)

export default settingsForm;

