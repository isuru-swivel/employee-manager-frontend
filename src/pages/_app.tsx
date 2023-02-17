// import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import AppLayout from "layout/AppLayout";
import { Provider } from "react-redux";
import store from "store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
}
