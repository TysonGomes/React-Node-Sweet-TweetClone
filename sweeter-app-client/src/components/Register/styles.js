import styled from "styled-components";



export const Container = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  max-width: 300px;
  width: 100%;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
 
`;

export const Content = styled.form`
> div {
    position:relative;
    display: flex;
    flex-direction: column;
    label {
        font-family:Georgia;
        text-decoration: none;
        color: #1da1f2;
        font-size: 1.2em;
        margin: 0;
        padding: 0;
        margin-bottom: 1rem;
        margin-right:15%;
        margin-left:25%;
        margin-top: 15%;
        position:relative;
        
        text-align:center;
        transform: translateY(-50%)
      }
      label.Pass{
        margin-left:40%;
      }
    &:last-child {
        display: flex;
        flex-direction: row;
      margin-top: 1.5em;
      flex-direction: row;
      justify-content: space-between;
    }
    a {
        text-decoration: none;
        color: #1da1f2;
        cursor: pointer;
      }
   div.Buttons{
    display: flex;
    flex-direction: row;
    margin-top: 1.5em;
    flex-direction: row;
    justify-content: space-between;
   }
  }  
`;

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  margin-top: 0.5rem;
  width: 100%;
  margin-bottom: 1.5rem;
  &:active,
  &:focus {
    border: none;
    outline: none;
    border-bottom: 1px solid #1da1f2;
  }
`;

export const Button = styled.button`
  justify-content: space-between;
  background: white;
  border: 1px solid #1da1f2;
  padding: 0.4rem 1.3rem;
  border-radius: 20px;
  color: #1da1f2;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #1da1f2;
    color: white;
  }
`;
export const ErrorWarning = styled.div`
  border: 1px solid red;
  color: red;
  border-radius: 20px;
  padding: 0.5rem;
    }
`;