import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Group, Paper } from "@mantine/core";
import { addCompany, updateCompany } from "../../services/apis";
import { useLocation, useNavigate } from "react-router-dom";

const AddEditCompany = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editData = location.state?.company || null;

  const form = useForm({
    initialValues: {
      name: "",
      ownerName: "",
      email: "",
      phone: "",
      city: "",
      countryName: "",
      address: "",
    },

    validate: {
      name: (value) => (value.length > 0 ? null : "Company name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) => (value.length > 0 ? null : "Phone number is required"),
      city: (value) => (value.length > 0 ? null : "City is required"),
      countryName: (value) => (value.length > 0 ? null : "Country is required"),
      address: (value) => (value.length > 0 ? null : "Address is required"),
    },
  });

  useEffect(() => {
    if (editData) {
      const formData = {
        name: editData.name,
        ownerName: editData.ownerName,
        email: editData.email,
        phone: editData.phone,
        city: editData.headOffice.address.cityName,
        countryName: editData.headOffice.address.country,
        address: editData.headOffice.address.addressLine,
      };

      form.setValues(formData);
    }
  }, []);

  const getChangedFields = (original, updated) => {
    let changedFields = {};
    for (const key in updated) {
      if (updated[key] !== original[key]) {
        changedFields[key] = updated[key];
      }
    }
    return changedFields;
  };

  const handleSubmit = async (values) => {
    try {
      if (editData) {
        // Compare current form values with initial editData and send only changed fields
        const originalValues = {
          name: editData.name,
          email: editData.email,
          phone: editData.phone,
          city: editData.headOffice.address.cityName,
          countryName: editData.headOffice.address.country,
          address: editData.headOffice.address.addressLine,
        };

        const changedFields = getChangedFields(originalValues, values);

        if (Object.keys(changedFields).length > 0) {
          console.log(editData, "aaaaaaaaaaaa");
          const payload = {
            id: editData.id,
            name: changedFields.name || originalValues.name,
            ownerName: editData.ownerName,
            email: changedFields.email || originalValues.email,
            phone: changedFields.phone || originalValues.phone,
            headOffice: {
              address: {
                cityName: changedFields.city || originalValues.city,
                countryCode:
                  changedFields.countryName || originalValues.countryName,
                addressLine: changedFields.address || originalValues.address,
              },
            },
          };
          const data = await updateCompany(payload);
          if (data.data) {
            navigate("/");
          }
        } else {
          alert("There is no changes!");
        }
      } else {
        // Otherwise, call the add function
        const payload = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          headOffice: {
            address: {
              cityName: values.city,
              countryCode: values.countryName,
              addressLine: values.address,
            },
          },
        };
        const data = await addCompany(payload);
        if (data.data) {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Paper
        shadow="md"
        radius="md"
        p="lg"
        style={{
          width: "100%",
          maxWidth: 800,
          border: "1px solid #ddd",
          padding: "20px",
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Company Name"
            placeholder="Enter company name"
            {...form.getInputProps("name")}
            required
            mt="sm"
          />

          {editData && (
            <TextInput
              label="Owner Name"
              disabled
              {...form.getInputProps("ownerName")}
              mt="sm"
            />
          )}

          <TextInput
            label="Email"
            placeholder="Enter email"
            {...form.getInputProps("email")}
            required
            mt="sm"
          />

          <TextInput
            label="Phone"
            placeholder="Enter phone number"
            {...form.getInputProps("phone")}
            required
            mt="sm"
          />

          <TextInput
            label="City"
            placeholder="Enter city"
            {...form.getInputProps("city")}
            required
            mt="sm"
          />

          <TextInput
            label="Country"
            placeholder="Enter country"
            {...form.getInputProps("countryName")}
            required
            mt="sm"
          />

          <TextInput
            label="Address"
            placeholder="Enter address"
            {...form.getInputProps("address")}
            required
            mt="sm"
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
};

export default AddEditCompany;
