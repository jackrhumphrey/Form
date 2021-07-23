import * as React from "react";
import './App.css';
import { Form, Button } from "semantic-ui-react";

function App() {

  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
    colour: "",
    animals: [],
    typeOfTiger: ""
  });

  const [errors, setErrors] = React.useState({
    email: false,
    password: false,
  });

  React.useEffect(() => {
    console.log(formState);
  }, [formState]);

  const colourOptions = [
    { key: 'blue', text: 'Blue', value: 'blue' },
    { key: 'green', text: 'Green', value: 'green' },
    { key: 'red', text: 'Red', value: 'red' },
    { key: 'black', text: 'Black', value: 'black' },
    { key: 'brown', text: 'Brown', value: 'brown' },
  ]

  const animalsOptions = [
    { key: 'bear', text: 'Bear', value: 'bear' },
    { key: 'tiger', text: 'Tiger', value: 'tiger' },
    { key: 'snake', text: 'Snake', value: 'snake' },
    { key: 'donkey', text: 'Donkey', value: 'donkey' },
  ]

  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleSubmit = () => {
    let localErrors = {
      email: false,
      password: false,
    }
    if (!re.test(formState.email)) {
      localErrors = {
        ...localErrors, email: { content: 'Please enter a valid email address', pointing: 'below' }
      }
    }
    if (formState.password.length < 9) {
      localErrors = {
        ...localErrors, password: { content: 'Password must be longer than 8 characters', pointing: 'below' }
      }
    }
    setErrors(localErrors)
  }

  return (
    <div className="container">
      <div className="content">
        <h1>Contact form</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Email"
            value={formState.email}
            error={errors.email}
            onChange={(e) => {
              setFormState({ ...formState, email: e.target.value });
              setErrors({ ...errors, email: false })
            }
            }
          />
          <Form.Input
            type='password'
            label="Password"
            value={formState.password}
            error={errors.password}
            onChange={(e) => {
              setFormState({ ...formState, password: e.target.value });
              setErrors({ ...errors, password: false })
            }
            }
          />
          <Form.Dropdown
            selection
            label="Colour"
            options={colourOptions}
            value={formState.colour}
            onChange={(e) => setFormState({ ...formState, colour: e.target.value })}
          />
          <Form.Dropdown
            selection
            multiple
            label="Animals"
            options={animalsOptions}
            value={formState.animals}
            onChange={(e, { value }) => setFormState({ ...formState, animals: value })}
          />
          {(formState.animals.includes("tiger")) &&
            <Form.Input
              required
              label="Type of tiger"
              value={formState.typeOfTiger}
              onChange={(e) => setFormState({ ...formState, typeOfTiger: e.target.value })}
            />
          }
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    </div>
  );
}

export default App;