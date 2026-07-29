import {Layout, Button} from '@ui-kitten/components';

const OrdersScreen = ({navigation}:any) => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={() => navigation.navigate('Orders')} >
        Orders
      </Button>
    </Layout>
  );
};

export default OrdersScreen;
