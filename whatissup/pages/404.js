import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

function Custom404() {
  const router = useRouter();
  return (
    <Container>
     
      <ErrorRight>
        <h1>404</h1>
        <p>We couldn't find the page you are looking for</p>

        <Home onClick={() => router.push("/")}>Go back</Home>
      </ErrorRight>
    </Container>
  );
}

export default Custom404;

const Container = styled.div`
  display: grid;
  @media (max-width: 768px) {
    place-items: center;
  }
`;
const ErrorRight = styled.div`
  /* display: flex;
  align-items: center; */
  /* justify-content: center;
  flex-direction: column; */
  color: white;
  /* height: 100%; */
  margin: 20px;
  @media (min-width: 768px) {
    margin: 20vw;
  }
  > p {
    font-size: 35px;
  }
  > h1 {
    font-size: 50px;
  }
`;

const Home = styled.button`
  cursor: pointer;
  background-color: #131c21;
  border-radius: 10px;
  color: white;
  /* height: 100%; */
  padding: 10px;
  outline: none;
  border: none;
  text-align: center;
  font-size: 40px;

  :hover {
    background-color: darkgray  ;
  }
`;
