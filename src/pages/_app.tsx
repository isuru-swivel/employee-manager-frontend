// import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import AppLayout from 'layout/AppLayout'

export default function App({ Component, pageProps }: AppProps) {
  return(
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
  )
}
