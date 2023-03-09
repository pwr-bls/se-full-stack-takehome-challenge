import {useContext, useEffect, useState} from "react";
import { Button } from "../";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const LoginButton = () => {
  const { userId, setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    const id = userId ? "" : prompt("Enter User ID");
    setUserId(id ?? "");
    !id && navigate('/', {replace: true});
  };

  return (
      <Button onClick={handleLogin}>
        {userId ? `Logout ${userId}` : "Login"}
      </Button>
  );
};

export const LoginButtonByGoogle = () => {
  const { userId, setUserId } = useContext(UserContext);
  const [checkLogin, setCheckLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    window.open('http://localhost:5001/auth/google', '_self')
  };

  const handleLogout = () => {
    axios.post('http://localhost:5002/logout').then((result) => {
      setUserId('')
      setCheckLogin(false)
      navigate('/', {replace: true});
    });
  }

  useEffect(() => {
    if (userId || !checkLogin || isLoading) {
      return;
    }
    setIsLoading(true)
    axios.get('http://localhost:5002/greetme', {
      withCredentials: true
    }).then((result) => {
      setUserId(result.data.fullName);
      setIsLoading(false)
    });

  }, [userId,  checkLogin, isLoading, setUserId]);

  return (
      <Button onClick={!userId ? handleLogin : handleLogout}>
        {userId ? `Logout ${userId}` : "Login"}
      </Button>
  );
};
