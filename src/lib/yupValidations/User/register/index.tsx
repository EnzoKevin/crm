import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
  nome: yup
    .string()
    .required('O nome é obrigatório')
    .max(50, 'O nome deve ter no máximo 50 caracteres'),
  email: yup
    .string()
    .required('O email é obrigatório')
    .email('O email deve ser válido'),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .matches(/(?=[A-Z])/, 'A senha deve conter pelo menos uma letra maiúscula')
    .matches(/(?=[a-z])/, 'A senha deve conter pelo menos uma letra minúscula')
    .matches(/(?=[0-9])/, 'A senha deve conter pelo menos um número')
    .matches(
      /(?=[^a-zA-Z0-9])/,
      'A senha deve conter pelo menos um caractere especial'
    ),
});
