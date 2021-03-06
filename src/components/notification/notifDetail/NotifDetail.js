import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Container } from 'react-grid-system'
import { List, ListItem } from 'material-ui/List';
import { getNotifications } from "../../../index.js"

class notifDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subs: {},
    };
    getNotifications();
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps.notifications:" + JSON.stringify(nextProps.notifications));
    if (nextProps.notifications && this.props.params.notifId) {
      var subs = nextProps.notifications.find((el) => {
        return el.id === this.props.params.notifId;
      });
      this.setState({ subs: subs });
    }
  }

  componentDidMount() {
  }

  componentWillMount() {
  }

  render() {
    let details = null;
    let subs = this.state.subs;
    var listItems = [];
    if (subs.id) {

      listItems.push(<ListItem primaryText={"ID: " + subs.id} />)
      if (subs.description)
         listItems.push(<ListItem primaryText={"Description: " + subs.description}/>)
      listItems.push(<ListItem primaryText={"Entities: " + subs.subject.entities.map((e) => e.id).join(", ")}/>)
      if(subs.subject.condition) {
      let cond = subs.subject.condition
        if(cond.attrs)
           listItems.push(<ListItem primaryText={"Condition attributes: " + cond.attrs.join(", ")}/>)
        if(cond.expression) {
          if(cond.expression.q)
            listItems.push(<ListItem primaryText={"Condition expression: " + cond.expression.q}/>)
        }
      }
      let notif = subs.notification
      if(notif.timesSent)
        listItems.push(<ListItem primaryText={"Times sent: " + notif.timesSent}/>)
      if(notif.lastNotification)
        listItems.push(<ListItem primaryText={"Last notification: " + notif.lastNotification}/>)
      if(notif.http)
        listItems.push(<ListItem primaryText={"Notified URL: " + notif.http.url}/>)
      if(notif.httpCustom) {
        let httpCustom = notif.httpCustom
        listItems.push(<ListItem primaryText={"Notified URL: " + httpCustom.url}/>)

        if(httpCustom.headers) {
          let headers = httpCustom.headers
          listItems.push(<ListItem primaryText="HTTP headers: "
                                   nestedItems={ Object.keys(headers).map(a => <ListItem primaryText={a + ": " + headers[a]}/>) } />)
        }
        if(httpCustom.qs)
          listItems.push(<ListItem primaryText={"HTTP query string: " + httpCustom.qs}/>)
        if(httpCustom.method)
          listItems.push(<ListItem primaryText={"HTTP method: " + httpCustom.method}/>)
        if(httpCustom.payload)
          listItems.push(<ListItem primaryText={"Notification payload: " + unescape(httpCustom.payload)}/>)
      }
      details =
            <CardText>
              <List>
                  {listItems}
              </List>
            </CardText>
    } else {
      details = "No data yet";
    }

    return (
      <div className="sensor">
        <h1 className="page-title">Notification: {this.state.id}</h1>
        <Container fluid={true}>
          <Card>
            <CardTitle title="Notification" />
            {details}
          </Card>
        </Container>
      </div>
    );
  }
}

export default notifDetail;
