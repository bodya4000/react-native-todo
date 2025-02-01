import { Toast } from 'toastify-react-native';

class ToastService {
	success(message: string) {
		Toast.success(message);
	}

	info(message: string) {
		Toast.info(message);
	}
	
}

export default new ToastService();
