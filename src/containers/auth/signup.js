import React, { Component } from "react";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Field from "redux-form/lib/Field";
import connect from "react-redux/lib/connect/connect";
import * as actions from "../../actions";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },
  container: {},
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const renderInput = field => {
  if (!field.errorMessage)
    return (
      <div>
        <TextField
          id={field.id}
          {...field.input}
          type={field.type}
          className={field.className}
          label={field.label}
          margin="normal"
          autoComplete={field.autoComplete}
          required
          placeholder={field.placeholder}
        />
        {field.meta.touched && field.meta.error}
        <span>{field.meta.error}</span>
      </div>
    );
  else
    return (
      <div>
        <TextField
          id={field.id}
          error
          {...field.input}
          type={field.type}
          className={field.className}
          label={field.label}
          margin="normal"
          autoComplete={field.autoComplete}
          required
          placeholder={field.placeholder}
          helperText={field.errorMessage}
        />
        {field.meta.touched && field.meta.error}
        <span>{field.meta.error}</span>
      </div>
    );
};

class SignUp extends Component {
  UNSAFE_componentWillMount() {
    this.props.setTitle("Register");
    document.title = "Register";
  }

  handleFormSubmit({ email, password }) {
    this.props.signupUser({ email, password });
  }

  render() {
    const { classes, handleSubmit } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Grid item xs={12}>
          <form
            className={classes.container}
            autoComplete="off"
            onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
          >
            <Field
              id="email"
              errorMessage={this.props.errorMessage}
              name="email"
              label="Email"
              placeholder="name@example.com"
              className={classes.textField}
              type="text"
              component={renderInput}
            />
            <Field
              name="password"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              component={renderInput}
            />
            <Field
              name="confirmPassword"
              label="Confirm Password"
              className={classes.textField}
              type="password"
              component={renderInput}
            />
            <Button type="submit" variant="raised" color="secondary" className={classes.button}>
              Register
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  setTitle: PropTypes.string.isRequired,
  signupUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    errorMessage: state.authenticated.error
  };
}

export default reduxForm({
  form: "register",
  fields: ["email", "password", "passwordConfirm"]
})(
  withStyles(styles)(
    connect(
      mapStateToProps,
      actions
    )(SignUp)
  )
);
