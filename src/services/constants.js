export const apiConstants = {
  rootApi: 'https://blog.kata.academy/api/',
  getArticles: 'articles?',
  getArticleBySlug: 'articles/',
  limit: 'limit=5',
  offset: '&offset='
}
export const signConstants = {
  username: 'username',
  password: 'password',
  email: 'email',
  confirm_password: 'confirm_password',
  agreement: 'agreement',
  isRequired: 'This field is required',
  usernameMinLength: 'Your username needs to be at least 3 characters.',
  usernameMaxLength: "Your username mustn't exceed 20 characters.",
  invalidUsername: 'You can only use lowercase English letters and numbers',
  usernameValidator: /^[a-z][a-z0-9]*$/,
  invalidEmail: 'You entered an invalid email address.',
  emailValidator: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  passwordMinLength: 'Your password needs to be at least 6 characters.',
  passwordMaxLength: "Your password mustn't exceed 40 characters.",
  mismatchPassword: 'Passwords must match',
  usernamePlaceholder: 'Username',
  passwordPlaceholder: 'Password',
  emailPlaceholder: 'Email address',
  create: 'Create',
  login: 'Login'
}
export const linkConstants = {
  signIn: '/sign-in',
  signUp: '/sign-up'
}
