import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './../styles/global.css'
import './../styles/header.css'
import './../styles/landing.css'
import './../styles/features.css'
import './../styles/download.css'
import './../styles/faq.css'
import './../styles/contact.css'
import './../styles/footer.css'
config.autoAddCss = false


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
