import {Layout, Button} from '@ui-kitten/components';

const NotificationScreen = ({navigation}:any) => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Home')}>
        NOTIFICATION
      </Button>
    </Layout>
  );
};

export default NotificationScreen;
