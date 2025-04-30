import * as Yup from 'yup';

const schema = Yup.object().shape({
  nombre: Yup.string()
    .required('Tu nombre es necesario para continuar')
    .min(8, ({ min }) => `Debes ingresar mínimo ${min} letras`)
    .max(50, ({max}) => `Debe ingresar maximo ${max} letras`)
    .test('no-numeros', 'El nombre no debe contener números', value => /^[A-Za-z\s]+$/.test(value)),
  
  correo: Yup.string()
    .required('Por favor ingresa un correo válido')
    .email('El correo electrónico ingresado no es correcto'),

  contrasena: Yup.string()
    .required('La contraseña no puede estar vacía')
    .min(6, 'Debe tener al menos 6 caracteres')
    .matches(/[A-Z]/, 'Debe contener una mayúscula')
    .matches(/[0-9]/, 'Debe contener un número')
    .matches(/[@$!%*?&]/, 'Debe contener un símbolo especial (@, $, %, etc.)'),

  confirmarContrasena: Yup.string()
    .required('Por favor repite tu contraseña')
    .oneOf([Yup.ref('contrasena')], 'Las contraseñas no coinciden'),
});

export default schema;
