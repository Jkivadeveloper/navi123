import React, { useState } from "react";
import { Card, Button, Input } from "antd";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext'; 
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [townCity, setTownCity] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const { setUser, user } = useAuth(); // Assume you have a state for the current user in useAuth

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleTownCityChange = (e) => {
    setTownCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional details to the "users" collection in Firebase
      const userRef = collection(db, 'users');
      await addDoc(userRef, {
        userId: user.uid,
        email,
        phone,
        address,
        postalCode,
        townCity,
        country,
      });

      console.log("User signed up:", user);
      window.alert("Sign up successful");
    } catch (error) {
      console.log("Sign up error:", error.message);
      if (error.code === "auth/email-already-in-use") {
        window.alert("Sign up failed: Email already exists");
      } else {
        window.alert("Sign up failed: " + error.message);
      }
    }
  };

  const handleLogin = () => {
    if ((email === "navibackend@gmail.com" || email === "adminnavi@gmail.com") && password === "navisoftware2023") {
      navigate('/orders');
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User logged in:", user);
          setUser(user); 
          window.alert("Login successful");
          navigate('/cart'); 
        })
        .catch((error) => {
          console.log("Login error:", error.message);
          window.alert("Login failed: " + error.message);
        });
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null); 
        window.alert("Sign out successful");
      })
      .catch((error) => {
        console.log("Sign out error:", error.message);
        window.alert("Sign out failed: " + error.message);
      });
  };

  return (
    <Card title="Login" style={{ margin: 20 }}>
      {!user && (
        <>
          <Input
            placeholder="Phone"
            value={phone}
            onChange={handlePhoneChange}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Address"
            value={address}
            onChange={handleAddressChange}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Postal Code"
            value={postalCode}
            onChange={handlePostalCodeChange}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Town/City"
            value={townCity}
            onChange={handleTownCityChange}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Country"
            value={country}
            onChange={handleCountryChange}
            style={{ marginBottom: 10 }}
          />
        </>
      )}

      <Input
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        style={{ marginBottom: 10 }}
      />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        style={{ marginBottom: 10 }}
      />

      {!user ? (
        <Button type="primary" onClick={handleSignUp} style={{ marginRight: 10 }}>
          Sign Up
        </Button>
      ) : (
        <Button type="primary" onClick={handleSignOut} style={{ marginRight: 10, backgroundColor: 'red' }}>
          Sign Out
        </Button>
      )}

      <Button type="primary" onClick={handleLogin}>
        Login
      </Button>
    </Card>
  );
};

export default Login;
