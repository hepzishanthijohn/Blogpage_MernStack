import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const DeletePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();



  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <LogoutContainer>
      <LogoutMessage>Are you sure you want to delete this post?</LogoutMessage>
      
      <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
    </LogoutContainer>
  );
};

export default DeletePost;

const LogoutContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 130px;
  height: 70vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: #85769f66;
  color: black;
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #ea0606;
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: rgb(99, 60, 99);
`;
