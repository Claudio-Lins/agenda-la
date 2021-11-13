import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className='max-w-7xl mx-auto shadow rounded p-8 bg-purple-50'>
        <Component {...pageProps} />
      </div>
        <Footer />
    </>
  )
}

export default MyApp
