import * as ReactDOM from 'react-dom';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { logInWithEmailAndPassword } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { reset } from '../../features/trips/tripsSlice';

interface Values {
  email: string;
  password: string;
}

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = async() => {
    await signInWithGoogle();
    dispatch(reset());
    navigate("/main");
  };

  return (
    <div>
      <h1>Nice to see you again! Sign In</h1>
      <button onClick={clickHandler}> Sign in with Google </button>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setSubmitting(true);
          await logInWithEmailAndPassword(values.email, values.password)
          setSubmitting(false);
          dispatch(reset());
          navigate('/main');
        }}
      >
        <Form>
           
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          />

          <label htmlFor="password">Password</label>
          <Field 
            id="password" 
            name="password" 
            type='password'/>
          
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};


export default Signin