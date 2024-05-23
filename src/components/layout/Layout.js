import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <div className='grand-parentDiv'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </Helmet>
        <Header />
        <main className='min-h-[68vh] md:mt-6'>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
Layout.defaultProps = {
  title: "SadaBahar - shop now",
  description: "Shop SadaBahar for the latest in Pakistani fashion including ready-to-wear clothing, unstitched fabrics, and Western wear. Discover the perfect outfit for any occasion today.",
  keywords: "Pakistani Fashion, Kurta Online, Unstitched Suits, Western Wear, Women's Clothing, Latest Fashion, Trendy Fashion, Fashion Online, Fashion Sale",
  author: "Sada Bahar"
}

export default Layout