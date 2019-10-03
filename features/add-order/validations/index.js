/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */

const validations = {
  title: {
    presence: {
      message: '^Para continuar indicá que vas a transportar.'
    }
  },
  vehicleType: {
    presence: {
      message:
        '^Para continuar debes elegir, en la parte superior, el tipo de vehículo.'
    }
  },
  origin: {
    presence: {
      message: '^Para continuar debes establecer el origen de tu pedido.'
    }
  },
  destinationsNotEmpty: function(value, attributes, attributeName, options, constraints) {
    if (attributes.destinations.length > 0) return null;
    return {
      presence: { message: '^Para continuar debe agregar algun destino.' },
    };
  }
};

export default validations;
