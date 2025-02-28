import '@/styles/globals.css'
import FooterWithNavigation from '../components/home/FooterWithNavigation'
import StickyCallButton from '../components/common/StickyCallButton'
import LiveChat from '../components/chat/LiveChat'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <FooterWithNavigation />
      <StickyCallButton phoneNumber="+61 412 345 678" />
      <LiveChat />
    </>
  )
}