import {
  checkFullnameFormat,
  checkEmptyField,
  checkValidPhoneNumber
} from '../../../api/signUpService';

const validations = {
  fullnameEmpty(value, attributes) {
    if (attributes.fullname == null) {
      return null;
    }
    const emptyField = checkEmptyField(attributes.fullname);
    if (!emptyField) return null;
    return {
      presence: {
        message: '^El campo nombre completo no puede estar vacío.'
      }
    };
  },
  fullnameFormat(value, attributes) {
    if (attributes.fullname == null) {
      return null;
    }
    const correctFullnameFormat = checkFullnameFormat(attributes.fullname);
    if (correctFullnameFormat) return null;
    return {
      presence: {
        message:
          '^El nombre completo no puede contener símbolos y debe contener su nombre y apellido.'
      }
    };
  },
  contactNumberFormat(value, attributes) {
    if (attributes.contact_number == null) {
      return null;
    }
    const correctContactNumberFormat = checkValidPhoneNumber(attributes.contact_number);
    if (correctContactNumberFormat) return null;
    return {
      presence: {
        message: '^Formato de número de contacto incorrecto: Ej: 01147658876'
      }
    };
  },
  contactNumberEmpty(value, attributes) {
    if (attributes.contact_number == null) {
      return null;
    }
    const emptyField = checkEmptyField(attributes.contact_number);
    if (!emptyField) return null;
    return {
      presence: {
        message: '^El campo número de contacto no puede estar vacío.'
      }
    };
  }
};

export default validations;
