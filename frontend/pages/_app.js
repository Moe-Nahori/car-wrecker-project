import '@/styles/globals.css'
import Header from '../components/layout/Header'
import FooterWithNavigation from '../components/home/FooterWithNavigation'
import StickyCallButton from '../components/common/StickyCallButton'
import LiveChat from '../components/chat/LiveChat'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <FooterWithNavigation />
      <StickyCallButton phoneNumber="+61 412 345 678" />
      <LiveChat />
    </>
  )
}