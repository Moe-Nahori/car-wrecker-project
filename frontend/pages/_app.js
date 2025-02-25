import '@/styles/globals.css'
import Footer from '../components/layout/Footer'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  )
}