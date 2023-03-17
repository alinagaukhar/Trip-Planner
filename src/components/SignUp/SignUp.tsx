import { Formik, Field, Form, FormikHelpers } from "formik";
import { registerWithEmailAndPassword } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../../features/trips/tripsSlice";
import { AppDispatch } from "../../store/store";

interface Values {
  email: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Happy to have you here, Create an account</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setSubmitting(true);
          await registerWithEmailAndPassword(values.email, values.password);
          setSubmitting(false);
          dispatch(reset());
          navigate("/welcome");
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
          <Field id="password" name="password" type="password" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
