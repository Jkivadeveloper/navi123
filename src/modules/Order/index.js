import React, { useEffect, useState } from 'react';
import { Card, Divider, List, Button, Tag } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, collection, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { ArrowLeftOutlined } from '@ant-design/icons';

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const db = getFirestore();
        const orderRef = doc(db, 'orders', id);
        const orderDoc = await getDoc(orderRef);

        if (orderDoc.exists()) {
          setOrder({ id: orderDoc.id, ...orderDoc.data() });
          setCartItems(orderDoc.data().cartItems);
        } else {
          console.log('No such order!');
        }
      } catch (error) {
        console.log('Error fetching order:', error);
      }
    };

    fetchOrderData();
  }, [id]);

  const handleDeleteOrder = async () => {
    try {
      const db = getFirestore();
      const orderRef = doc(db, 'orders', id);
      await deleteDoc(orderRef);
      console.log('Order deleted:', id);
      navigate('/orders');
    } catch (error) {
      console.log('Error deleting order:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/orders');
  };

  return (
    <Card
      title={`Order ${id}`}
      style={{ margin: 20 }}
      extra={
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleGoBack}>
          Back
        </Button>
      }
    >
      <Divider />
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<img src={item.image} alt={item.name} style={{ height: 60, width: 55 }} />}
              title={item.name}
              description={`Quantity: ${item.quantity}`}
              style={{ flex: '1' }}
            />
            <div>{`Ksh. ${item.price}`}</div>
          </List.Item>
        )}
      />
      <Divider />
      <div style={styles.buttonsContainer}>
        <Button
          block
          type="danger"
          size="large"
          style={styles.button}
          onClick={handleDeleteOrder}
        >
          Delete Order
        </Button>
      </div>
    </Card>
  );
};

const styles = {
  totalSumContainer: {
    flexDirection: 'row',
    display: 'flex',
  },
  totalPrice: {
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    display: 'flex',
    paddingBottom: 30,
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: 'red',
  },
};

export default Order;
