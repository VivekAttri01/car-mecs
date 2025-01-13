import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

function AdminPage() {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('customerData')) || [];
    setCustomerData([data]);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f4c3"
    >
      <Card sx={{ width: 600, padding: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            align="center"
            sx={{ fontWeight: 'bold', color: '#558b2f' }}
          >
            Admin Dashboard
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Car Model</strong></TableCell>
                  <TableCell><strong>Car Number</strong></TableCell>
                  <TableCell><strong>Service Period</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerData.map((customer, index) => (
                  <TableRow key={index}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.carModel}</TableCell>
                    <TableCell>{customer.carNumber}</TableCell>
                    <TableCell>{customer.servicePeriod} Months</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminPage;
