import React from 'react';
import styled from 'styled-components';
import { FaRegCalendarAlt } from 'react-icons/fa';

const Container = styled.div`
  width: 300px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
`;

const Icon = styled(FaRegCalendarAlt)`
  color: #4caf50;
  font-size: 40px;
`;

const CalendarComponent: React.FC = () => {
  return (
    <Container>
      <Icon />
    </Container>
  );
};

export default CalendarComponent;
