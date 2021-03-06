"use strict";

import React from 'react';
import TextInput from './controls/text_input';
import NumberInput from './controls/number_input';
import SelectInput from './controls/select_input';
import EmailInput from './controls/email_input';
import PhoneInput from './controls/phone_input';
import PasswordInput from './controls/password_input';
import HiddenInput from './controls/hidden_input';
import TextAreaInput from './controls/textarea_input';
import CheckboxInput from './controls/checkbox_input';
import DateInput from './controls/date_input';
import _ from 'underscore';

export default class Property extends React.Component {
  static defaultProps = {
    onBlur: function(ev, props) {
      console.log(props);
    },
    onChange: function(ev, props) {
      console.log(props);
    },
    inputType: "text",
    options: [],
    defaultValue: "",
    name: "input",
    containerClass: "input-area",
    inputClass: "",
    value: ""
  }

  static ValidInputTypes = {
    "text": TextInput,
    "number": NumberInput,
    "select": SelectInput,
    "email": EmailInput,
    "phone": PhoneInput,
    "password": PasswordInput,
    "hidden": HiddenInput,
    "textarea": TextAreaInput,
    "checkbox": CheckboxInput,
    "date": DateInput
  }

  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let stateChanged = false;

    Object.keys(this.props).forEach((key) => {
      if (this.props[key] != nextProps[key]) {
        stateChanged = true;
      }
    });

    return stateChanged;
  }

  onBlur(ev, value) {
    let isValid = this.valid(),
        values = this.serialize(),
        newValue = {};

    newValue[this.props.name] = {
      value: values.value,
      displayValue: values.displayValue,
      invalid: !isValid,
      isOpen: values.isOpen
    };

    this.props.onBlur(ev, newValue);
  }

  onChange(ev, value) {
    if (this.isSelect()) {
      let isValid = this.valid(),
          values = this.serialize(),
          newValue = {};

      newValue[this.props.name] = {
        value: values.value,
        displayValue: values.displayValue,
        invalid: !isValid,
        isOpen: values.isOpen
      };

      this.props.onChange(ev, newValue);
    }
  }

  addErrors() {
    this.onBlur();
  }

  value() {
    if (this.refs[this.props.name]) {
      return this.refs[this.props.name].value();
    }
  }

  serialize() {
    if (this.refs[this.props.name]) {
      return this.refs[this.props.name].serialize();
    }
  }

  isSelect() {
    return this.props.inputType == "select";
  }

  valid() {
    if(!this.props.validation) return true;
    return this.props.validation(this.value());
  }

  inputProps() {
    return {
      ref: this.props.name,
      name: this.props.name,
      defaultValue: this.props.value || this.props.defaultValue,
      classes: this.props.inputClass,
      onBlur: this.onBlur,
      onChange: this.onChange,
      options: this.props.options,
      selected: this.props.value,
      placeholder: this.props.placeholder,
      isOpen: this.props.isOpen,
      label: this.props.label,
      dateFormat: this.props.dateFormat,
      editable: this.props.editable
    }
  }

  inputType() {
    let types = Object.keys(Property.ValidInputTypes);

    if (_.includes(types, this.props.inputType)) {
      return React.createElement(
        Property.ValidInputTypes[this.props.inputType],
        this.inputProps()
      );
    } else {
      return React.createElement(TextInput, this.inputProps());
    }
  }

  hideLabel() {
    return _.contains(["hidden", "checkbox"], this.props.inputType) || this.props.hideLabel;
  }

  render() {
    let errorState = null,
        label = null;

    if (this.props.invalid) {
      errorState = 'block';
    } else {
      errorState = 'none';
    }

    if (!this.hideLabel()) {
      label = <label>{this.props.label}</label>
    }

    return (
      <div className={this.props.containerClass} key={this.props.value}>
        { label }
        { this.inputType() }
        <div className="error" style={{display: errorState}}>{this.props.errorMessage}</div>
      </div>
    )
  }
}
