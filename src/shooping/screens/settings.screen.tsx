import {Layout, Button} from '@ui-kitten/components';

const SettingsScreen = ({navigation}:any) => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={() => navigation.navigate('Main')}>
        SETTINGS
      </Button>
    </Layout>
  );
};

export default SettingsScreen;
