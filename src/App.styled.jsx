import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(160deg, #101c2c, #1d2a3f);
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 40px 0 0 0;
  color: white;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

export const Controls = styled.div`
  width: 90%;
  max-width: 1000px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

export const Dropdown = styled.select`
  background: #1e1e2f;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
`;

export const UploadArea = styled.div`
  border: 2px dashed #4a5a6a;
  padding: 60px 20px;
  width: 90%;
  max-width: 800px;
  text-align: center;
  border-radius: 16px;
  margin-top: 20px;
`;

export const UploadIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

export const UploadText = styled.p`
  color: #c2c2c2;
`;

export const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;

  button {
    padding: 10px 20px;
    background: #1e1e2f;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background: #2a2a3f;
    }
  }
`;
