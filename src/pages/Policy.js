import React from 'react'
import Layout from '../components/layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy | SadaBahar"}>
      <div className='w-9/12 mx-auto mt-12 mb-28'>
        <p className='text-3xl font-bold mb-5'>Privacy Policy</p>

        <p className="text-[#878787]">(Effective as of July, 2023)</p>
        <p className="text-[#878787] mt-4">At SadaBahar, we are committed to protecting the privacy and security of our customers' personal information. This Privacy Policy outlines how we collect, use, disclose, and protect the information you provide when interacting with our website, mobile applications, and other services (collectively referred to as the "Services").</p>

        <p className='text-lg font-semibold mt-5'>Information We Collect</p>
        <p className="text-[#878787]">When you use our Services, we may collect personal information that you provide directly and willingly, such as your name, email address, phone number, shipping address, and payment information. By providing your information, you allow us to use/transfer the information shared in the manner provided in this policy.</p>

        <p className='text-lg font-semibold mt-5'>Usage of Information</p>
        <p className="text-[#878787]">We use the above information to process and fulfill your orders, provide customer support, respond to inquiries, improve our products, services and website functionality, personalize your shopping experience, send promotional emails and marketing communications (you may opt out at any time) and to conduct market research and analyze trends.</p>

        <p className='text-lg font-semibold mt-5'>Information Sharing</p>
        <p className="text-[#878787]">We do not transfer your information to third parties in exchange for money and we will not do so. However, we may share your personal information with third parties in the following circumstances:

          Service Providers: We may engage trusted third-party companies or individuals to facilitate our Services, such as shipping providers or payment processors. These third parties have limited access to personal information necessary to perform their tasks and are obligated to protect your information.

          Legal Requirements: We may disclose personal information if required by law or if that disclosure is necessary to protect our rights under applicable laws or ensure the safety of our users.</p>

        <p className='text-lg font-semibold mt-5'>Data Security</p>

        <p className="text-[#878787]">We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure.</p>

        <p className='text-lg font-semibold mt-5'>Your Choices</p>
        <p className="text-[#878787]">You have the right to access, correct, update, or delete your personal information. You may also choose to opt out of receiving marketing communications from us. Please contact us using the information provided below to exercise your rights.</p>

        <p className='text-lg font-semibold mt-5'>Children's Privacy</p>
        <p className="text-[#878787]">Our Services are not intended for individuals under the age of 16, and we do not knowingly collect personal information from children. If you believe that we may have collected information from a child, please contact us to request deletion.</p>

        <p className='text-lg font-semibold mt-5'>Business Transfer</p>
        <p className="text-[#878787]">In the event of a merger, acquisition, or any other change in control or ownership of our company, your personal information and data may be transferred, assigned, or otherwise shared with the new entity. We will ensure that the new entity abides by the same level of privacy protection as outlined in this Privacy Policy.</p>

        <p className='text-lg font-semibold mt-5'>Updates to this Privacy Policy</p>
        <p className="text-[#878787]">This Privacy Policy is effective as of July, 2023 and will remain in effect until revised or updated. We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. We encourage you to review this policy periodically.</p>
      </div>
    </Layout>
  )
}

export default Policy