import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { useAuthenthication } from '../hooks/useAuthentication';

function SignupScreen({ navigation }) {
  const { signUpUser, isFetching } = useAuthenthication();

  const handleSwitchAuthMode = () => {
    navigation.replace('Login');
  };

  const _loadingTpl = () => {
    return <LoadingOverlay message="Loading..." />;
  };

  if (isFetching) return _loadingTpl();

  return <AuthContent onAuthenticate={signUpUser} onSwitchAuthMode={handleSwitchAuthMode} />;
}

export default SignupScreen;
