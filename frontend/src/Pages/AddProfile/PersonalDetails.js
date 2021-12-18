import React from "react";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
} from "@material-ui/core";

export default function PersonalDetails(props) {
  const { data, setData, next } = props;

  console.log("From Personal : ", data);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>

      <Formik
        enableReinitialize={true}
        initialValues={{
          fname: data.fname || "",
          lname: data.lname || "",
          mobile: data.mobile || "",
          twitter: data.twitter || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
        }}
        validate={(values) => {
          const errors = {};
          if (
            typeof values.mobile !== "number" &&
            values.mobile &&
            (values.mobile.length !== 10 ||
              isNaN(values.mobile) ||
              isNaN(parseFloat(values.mobile)))
          ) {
            console.log(values.mobile, values.mobile.length);
            errors.mobile = "Please Enter valid mobile number";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          console.log("Values : ", values);
          setData({ ...data, ...values });
          next();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="fname"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                    value={values.fname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lname"
                    label="Last name"
                    fullWidth
                    autoComplete="family-name"
                    value={values.lname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <TextField
                      required
                      id="Mobile"
                      name="mobile"
                      label="Mobile Number"
                      fullWidth
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.mobile && touched.mobile}
                      helperText={
                        errors.mobile && touched.mobile ? errors.mobile : null
                      }
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="twitter"
                    name="twitter"
                    label="Twitter UserName"
                    fullWidth
                    value={values.twitter}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="State/Region"
                    fullWidth
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary">
                      Next
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
}
