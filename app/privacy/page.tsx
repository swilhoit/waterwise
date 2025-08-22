export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().getFullYear()}</p>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-6">
            At Water Wise Group, we collect information you provide directly to us, such as when you:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Request a quote or consultation</li>
            <li>Make a purchase</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact our customer support</li>
            <li>Participate in surveys or promotions</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-6">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Monitor and analyze trends and usage</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information Sharing</h2>
          <p className="text-gray-700 mb-6">
            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>With your consent</li>
            <li>With service providers who assist us in our operations</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
          <p className="text-gray-700 mb-6">
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-6">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Access and update your personal information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of marketing communications</li>
            <li>Request a copy of your personal information</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies</h2>
          <p className="text-gray-700 mb-6">
            We use cookies and similar technologies to enhance your experience on our website, analyze usage, and assist in our marketing efforts. You can control cookie settings through your browser preferences.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong>Water Wise Group</strong><br />
              Email: info@waterwisegroup.com<br />
              Phone: 1-800-XXX-XXXX<br />
              Address: California, USA
            </p>
          </div>

          <p className="text-gray-600 text-sm mt-8">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </div>
      </div>
    </div>
  )
}