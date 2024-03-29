import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from 'app/App';
import { store } from 'redux/store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<App />
	</Provider>,
);

export default store;
