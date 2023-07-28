import React, { useEffect, useState } from 'react';
import { Card, Divider, List, Row, Col } from 'antd';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

const User = () => {
  const [tradeInInfo, setTradeInInfo] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);

  useEffect(() => {
    const db = getFirestore();

    const tradeCollection = collection(db, 'trade');
    const tradeUnsubscribe = onSnapshot(tradeCollection, (snapshot) => {
      const tradeData = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        phoneNumber: doc.data().phoneNumber,
        email: doc.data().email,
        model: doc.data().model,
        year: doc.data().year,
        make: doc.data().make,
        license: doc.data().license,
      }));
      setTradeInInfo(tradeData);
    });

    const contactCollection = collection(db, 'contact');
    const contactUnsubscribe = onSnapshot(contactCollection, (snapshot) => {
      const contactData = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        phoneNumber: doc.data().phoneNumber,
        email: doc.data().email,
        message: doc.data().message,
      }));
      setContactInfo(contactData);
    });

    return () => {
      tradeUnsubscribe();
      contactUnsubscribe();
    };
  }, []);

  return (
    <Card title="Contact & Trade-in" style={{ margin: 20 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Divider>Trade-in Information</Divider>
          <List
            dataSource={tradeInInfo}
            renderItem={(item) => (
              <List.Item>
                <strong>ID:</strong> {item.id}<br />
                <strong>Name:</strong> {item.name}<br />
                <strong>Email:</strong> {item.email}<br />
                <strong>Phone Number:</strong> {item.phoneNumber}<br />
                <strong>Model:</strong> {item.model}<br />
                <strong>Make:</strong> {item.make}<br />
                <strong>License:</strong> {item.license}<br />
                <strong>Year:</strong> {item.year}
              </List.Item>
            )}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Divider>Contact Information</Divider>
          <List
            dataSource={contactInfo}
            renderItem={(item) => (
              <List.Item>
                <strong>ID:</strong> {item.id}<br />
                <strong>Name:</strong> {item.name}<br />
                <strong>Email:</strong> {item.email}<br />
                <strong>Phone Number:</strong> {item.phoneNumber}<br />
                <strong>Message:</strong> {item.message}
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default User;
