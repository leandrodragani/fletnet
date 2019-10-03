import {
  checkEmailFormat,
  checkUsernameFormat,
  checkFullnameFormat,
  checkEmptyField
} from '../../../api/signUpService';

/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */

const validations = {
  fullnameEmpty: function(value, attributes, attributeName, options, constraints) {
    const emptyField = checkEmptyField(attributes.fullname);
    if (!emptyField) return null;
    return {
      presence: {
        message: '^Para continuar debe completar el campo nombre completo.'
      }
    };
  },
  fullnameFormat: function(value, attributes, attributeName, options, constraints) {
    const correctFullnameFormat = checkFullnameFormat(attributes.fullname);
    if (correctFullnameFormat) return null;
    return {
      presence: {
        message:
          '^El nombre completo no puede contener símbolos y debe contener su nombre y apellido.'
      }
    };
  },
  usernameEmpty: function(value, attributes, attributeName, options, constraints) {
    const emptyField = checkEmptyField(attributes.username);
    if (!emptyField) return null;
    return {
      presence: {
        message: '^Para continuar debe completar el campo usuario.'
      }
    };
  },
  usernameFormat: function(value, attributes, attributeName, options, constraints) {
    const correctUsernameFormat = checkUsernameFormat(attributes.username);
    if (correctUsernameFormat) return null;
    return {
      presence: {
        message:
          '^El nombre de usuario no puede contener espacios ni símbolos y al menos debe contener 4 caracteres.'
      }
    };
  },
  emailEmpty: function(value, attributes, attributeName, options, constraints) {
    const emptyField = checkEmptyField(attributes.email);
    if (!emptyField) return null;
    return {
      presence: {
        message: '^Para continuar debe completar el campo email.'
      }
    };
  },
  emailFormat: function(value, attributes, attributeName, options, constraints) {
    const correctEmailFormat = checkEmailFormat(attributes.email);
    if (correctEmailFormat) return null;
    return {
      presence: {
        message: '^La dirección de email que ha ingresado es inválida.'
      }
    };
  },
  passwordEmpty: function(value, attributes, attributeName, options, constraints) {
    const emptyField = checkEmptyField(attributes.password);
    if (!emptyField) return null;
    return {
      presence: {
        message: '^Para continuar debe completar el campo contraseña.'
      }
    };
  },
  passwordSpaces: function(value, attributes, attributeName, options, constraints) {
    if (attributes.password.indexOf(' ') === -1) return null;
    return {
      presence: {
        message: '^La contraseña no puede contener espacios.'
      }
    };
  },
  passwordFormat: function(value, attributes, attributeName, options, constraints) {
    if (attributes.password.length >= 6) return null;
    return {
      presence: {
        message: '^La contraseña no es lo suficientemente fuerte.'
      }
    };
  },
  emptyUserType: function(value, attributes, attributeName, options, constraints) {
    const emptyField = checkEmptyField(attributes.usertype);
    if (!emptyField) return null;
    return {
      presence: {
        message: '^Para continuar debe seleccionar el tipo de usuario.'
      }
    };
  }
};

export default validations;
