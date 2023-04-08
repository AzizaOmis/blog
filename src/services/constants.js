export const apiConstants = {
  rootApi: 'https://blog.kata.academy/api/',
  getArticles: 'articles?',
  getArticleBySlug: 'articles/',
  limit: 'limit=5',
  offset: '&offset=',
  signUp: 'users',
  signIn: 'users/login',
  login: 'user',
  postNewArticle: 'articles'
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
  login: 'Login',
  save: 'Save',
  image: 'image',
  imagePlaceholder: 'Avatar image',
  invalidImage: 'You entered an invalid image url.',
  title: 'title',
  titleMaxLength: "Your title mustn't exceed 5000 characters.",
  description: 'description',
  text: 'text',
  test: 'test',
  tagError: "The field must be filled in and mustn't contain more than 50 characters"
}
export const linkConstants = {
  default: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  profile: '/profile',
  newArticle: '/new-article',
  editMyArticle: '/articles/{slug}/edit'
}
export const toastConstants = {
  params: {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  },
  defaultErrMessage: 'Something goes wrong. Please try again later',
  successSignUp: 'Welcome! You have created a Realworld blog account. Happy blogging!',
  successSignIn: 'Welcome back!',
  successUpdate: 'Your data has been successfully updated!',
  successCreateArticle: 'Your article has been published!',
  successEditArticle: 'Your article has been successfully edited!'
}
