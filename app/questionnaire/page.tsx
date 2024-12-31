// app/questionnaire/page.tsx
"use client";

import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const Questionnaire: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [submittedValue, setSubmittedValue] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setSubmittedValue(inputValue);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Your Input"
            variant="outlined"
            fullWidth
            margin="normal"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
        {submittedValue && (
          <Typography variant="h6" color="textSecondary" sx={{ mt: 3 }}>
            Submitted Value: {submittedValue}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Questionnaire;
