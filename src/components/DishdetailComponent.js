import React from "react";

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


  function RenderComments({comments}) {
    {console.log(comments)}
    const cmt = comments.map(cm => {
      return (
        <ListGroup>
          <ListGroupItem key={cm.id}>
            {cm.comment}
            <div>--{cm.author}</div>
            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cm.date)))}
            {console.log(222, cm.author)}
          </ListGroupItem>
        </ListGroup>
      );
    });
    return cmt;
  }

  const  DishDetail = (props) => {
    if (props.dish != null)
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <Card>
                <CardImg
                  top
                  src={props.dish.image}
                  alt={props.dish.name}
                />
                <CardBody>
                  <CardTitle>{props.dish.name}</CardTitle>
                  <CardText>{props.dish.description}</CardText>
                </CardBody>
              </Card>
            </div>
            <div className="col-12 col-md-5 m-1">
              <ListGroupItem><h1 >Comments</h1></ListGroupItem>
              <RenderComments comments={props.dish.comments}/>
            </div>
          </div>
        </div>
      );
    else return <div></div>;
      }


export default DishDetail;