import {Layout, Button} from '@ui-kitten/components';

const NewsScreen = ({navigation}:any) => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={() => navigation.navigate('News')}>
        News
      </Button>
    </Layout>
  );
};

export default NewsScreen;
