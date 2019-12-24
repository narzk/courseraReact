import React, { Component } from "react";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "reactstrap";

class DishDetail extends Component {
  renderComments(comments) {
    const cmt = comments.map(cm => {
      return (
        <ListGroup>
          <ListGroupItem key={cm.id}>
            {cm.comment}
            <div>--{cm.author}</div>
            {cm.date}
            {console.log(222, cm.author)}
          </ListGroupItem>
        </ListGroup>
      );
    });
    return cmt;
  }
  render() {
    if (this.props.selected != null)
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <Card>
                <CardImg
                  top
                  src={this.props.selected.image}
                  alt={this.props.selected.name}
                />
                <CardBody>
                  <CardTitle>{this.props.selected.name}</CardTitle>
                  <CardText>{this.props.selected.description}</CardText>
                </CardBody>
              </Card>
            </div>
            <div className="col-12 col-md-5 m-1">
              <ListGroupItem><h1 >Comments</h1></ListGroupItem>
              {this.renderComments(this.props.selected.comments)}
            </div>
          </div>
        </div>
      );
    else return <div></div>;
  }
}

export default DishDetail;