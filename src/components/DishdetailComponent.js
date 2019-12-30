import React, { Component } from "react";
import { Loading } from './LoadingComponent';
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );

    // event.preventDefault();
  }

  render() {
    const required = val => val && val.length;
    const maxLength = len => val => !val || val.length <= len;
    const minLength = len => val => val && val.length >= len;
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <FormGroup>
                <Label htmlFor="username">Rating</Label>
                <Input
                  type="select"
                  id="checkbox"
                  name="select"
                  // innerRef={input => (this.username = input)}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <Row className="form-group">
                <Label htmlFor="author">Your name</Label>

                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="First Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less"
                  }}
                />
              </Row>
              <FormGroup>
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  model=".comment"
                  type="textarea"
                  id="comment"
                  name="comment"
                  rows="6"
                  className="form-control"
                  // innerRef={input => (this.password = input)}
                />
              </FormGroup>

              <Button outline color="secondary" type="submit">
                submit Comment
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-fw"></span> submit Comment
        </Button>
      </div>
    );
  }
}
function RenderComments({ comments, addComment, dishId }) {
  const options = { year: "numeric", month: "short", day: "2-digit" };

  if (comments != null) {
    const cmnts = comments.map(comment => {
      return (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author},{" "}
            {new Intl.DateTimeFormat("en-US", options).format(
              new Date(Date.parse(comment.date))
            )}
          </p>
        </li>
      );
    });
    if (comments.length !== 0) {
      return (
        <div>
          <h4>Comments</h4>
          <ul className="list-unstyled">{cmnts}</ul>
          <CommentForm dishId={dishId} addComment={addComment} />
        </div>
      );
    } else {
      return (
        <div>
          <h4>Comments</h4>
          <p>No comment yet</p>
          {/* <CommentForm /> */}
        </div>
      );
    }
  } else {
    return <div></div>;
  }
}

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

const DishDetail = props => {
             
  if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
}
else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">            
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
}
else if (props.dish != null) 
  
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <h1>Comments</h1>
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  else return <div></div>;
};

export default DishDetail;
