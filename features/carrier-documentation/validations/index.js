import { checkEmptyField } from "../../../api/signUpService";

const validations = {
  vehicleTypeEmpty: function (value, attributes, attributeName, options, constraints) {
    const emptyField = checkEmptyField(attributes.vehicleType);
    if (!emptyField) return null;
    return {
      presence: {
        message: '^Para continuar debe seleccionar el Tipo de vehículo.'
      }
    };
  },
  brandEmpty: function (value, attributes, attributeName, options, constraints) {
    const emptyField = checkEmptyField(attributes.brand);
    if (!emptyField) return null;
    return {
      presence: {
        message: '^Para continuar debe colocar la Marca del vehículo.'
      }
    };
  },
  modelEmpty: function (value, attributes, attributeName, options, constraints) {
    if (attributes.vehicleType == 'motorcycle') {
      return null;
    }
    const emptyField = checkEmptyField(attributes.model);
    if (!emptyField) return null;
    return {
      presence: {
        message: '^Para continuar debe colocar el Modelo del vehículo.'
      }
    };
  },
  phoneNumberEmpty: function (value, attributes, attributeName, options, constraints) {
    const emptyField = checkEmptyField(attributes.telephone);
    if (!emptyField) return null;
    return {
      presence: {
        message: '^Para continuar debe completar el campo Telefono de contacto.'
      }
    };
  },
  licensePlateEmpty: function (value, attributes, attributeName, options, constraints) {
    const emptyField = checkEmptyField(attributes.licensePlate);
    if (!emptyField) return null;
    return {
      presence: {
        message: '^Para continuar debe completar el campo Patente.'
      }
    };
  },
  taraEmpty: function (value, attributes, attributeName, options, constraints) {
    const emptyField = checkEmptyField(attributes.tara);
    if (!emptyField) return null;
    return {
      presence: {
        message: '^Para continuar debe completar el campo TARA.'
      }
    };
  },
  taraFormat: function (value, attributes, attributeName, options, constraints) {
    const taraReg = new RegExp(/^\d+$/);

    const valid = taraReg.test(attributes.tara);

    if (valid) return null;
    return {
      presence: {
        message: '^El formato del campo TARA no es correcto. Sólo se permiten números'
      }
    };
  },
  dniNumberEmpty: function (value, attributes, attributeName, options, constraints) {
    const emptyField = checkEmptyField(attributes.dniNumber);
    if (!emptyField) return null;
    return {
      presence: {
        message: '^Para continuar debe completar el campo DNI.'
      }
    };
  },
  dniFormat: function (value, attributes, attributeName, options, constraints) {
    const dniReg = new RegExp(/^[0-9]{8}$/);

    const valid = dniReg.test(attributes.dniNumber)

    if (valid) return null;
    return {
      presence: {
        message: '^El formato del DNI no es correcto. Verifique la informacion ingresada.'
      }
    };
  },
  phoneNumber: function (value, attributes, attributeName, options, constraints) {
    const phoneNumber = attributes.telephone;
    const phoneNumberRegWithDash = new RegExp(/^(?:\(\d{3}\)|\d{3}-)\d{4}-\d{4}$/);
    const phoneNumberRegWithSpace = new RegExp(/^(?:\(\d{3}\)|\d{3} )\d{4} \d{4}$/);
    const phoneNumberRegWithoutSpace = new RegExp(/^(?:\(\d{3}\)|\d{3})\d{4}\d{4}$/);

    const valid = ((phoneNumberRegWithDash.test(phoneNumber))
      || (phoneNumberRegWithSpace.test(phoneNumber))
      || (phoneNumberRegWithoutSpace.test(phoneNumber)));

    if (valid) return null;
    return {
      presence: {
        message: '^El formato del Telefono de contacto no es correcto. Ej: 01147658876'
      }
    };
  },
  licensePlateFormat: function (value, attributes, attributeName, options, constraints) {
    let newPatentFormatReg;
    let oldPatentFormatReg;

    if (attributes.vehicleType === 'motorcycle') {
      newPatentFormatReg = new RegExp(/^[A-Z]{1}\d{3}([A-Z]){3}$/);
      oldPatentFormatReg = new RegExp(/^\d{3}([A-Z]){3}$/);
    } else {
      newPatentFormatReg = new RegExp(/^[A-Z]{2}\d{3}([A-Z]){2}$/);
      oldPatentFormatReg = new RegExp(/^[A-Z]{3}\d{3}$/);
    }

    const valid = ((newPatentFormatReg.test(attributes.licensePlate))
      || (oldPatentFormatReg.test(attributes.licensePlate)));
    if (valid) return null;
    return {
      presence: {
        message: '^El formato de la Patente no es correcto. ' + attributes.vehicleType === 'motorcycle' ? 'Ej: 111AAA o A111AAA' : 'Ej: AA111BB o AAA111'
      }
    };
  }
};

export default validations;
