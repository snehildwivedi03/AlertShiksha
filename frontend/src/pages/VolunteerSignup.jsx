// src/pages/VolunteerSignup.jsx
import React from "react";
import { Button, TextInput, Label } from "flowbite-react";
import { Formik, Form, Field } from "formik";

const VolunteerSignUp = ({ onBack, onSubmit, initialValues }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Volunteer Details</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Field
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                as={TextInput}
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Field id="city" name="city" placeholder="City" as={TextInput} />
            </div>
            <div className="flex justify-between mt-4">
              <Button type="button" onClick={onBack} color="gray">
                Back
              </Button>
              <Button type="submit" color="green">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VolunteerSignUp;


