import React from 'react'
import Layout from '../components/layout/Layout'

const About = () => {
    return (
      <Layout title={"About Us - SadaBahar"}>
        <div className="flex items-center justify-center gap-3 md:flex-row flex-col">
          <img
            className=" md:w-2/5 md:m-5 mt-6 select-none"
            src="https://img.freepik.com/free-vector/about-us-concept-illustration_114360-669.jpg?w=1060&t=st=1716526863~exp=1716527463~hmac=86b17844d3f7024f1c950945197e9a99794eb00bbceac4d6914790db7d6c2d07"
            alt="About us"
          />
          <div className="md:w-4/12 md:p-0 p-8">
            <div className="font-bold text-xl">Our Brand Story</div>
            <p className="text-lg md:mt-6 mt-4">
              Our legacy lies in our root strengths; vibrant colours, design
              aesthetics that mirror our emotions, fashion that is ever
              evolving, and an unforgettable retail experience. Since its
              inception, Khaadi has been making it possible for women to dress
              in an inspiring, vibrant, affordable way – whilst celebrating
              their uniqueness with every style, stitch and weave. We recognize
              the confidence she has in her own individuality by making it
              possible for her express everything she is. Khaadi believes that
              culture, values, mindsets are in a constant state of evolution,
              and we strive to keep transforming with it. That is what keeps us
              relevant to the modern, contemporary woman.
            </p>
          </div>
        </div>
      </Layout>
    );
};

export default About
