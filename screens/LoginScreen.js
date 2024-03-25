import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { useAuthenthication } from '../hooks/useAuthentication';

function LoginScreen({ navigation }) {
  const { isFetching, signInUser } = useAuthenthication();

  const handleSwitchAuthMode = () => {
    navigation.replace('Signup');
  };

  const _loadingTpl = () => {
    return <LoadingOverlay message="Loading..." />;
  };

  if (isFetching) return _loadingTpl();

  return (
    <AuthContent isLogin onSwitchAuthMode={handleSwitchAuthMode} onAuthenticate={signInUser} />
  );
}

export default LoginScreen;
