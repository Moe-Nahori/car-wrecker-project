import '@/styles/globals.css'
import FooterWithNavigation from '../components/home/FooterWithNavigation'
import StickyCallButton from '../components/common/StickyCallButton'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <FooterWithNavigation />
      <StickyCallButton phoneNumber="+61 412 345 678" />
    </>
  )
}