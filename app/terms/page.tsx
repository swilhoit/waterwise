export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
          Terms of Service
        </h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().getFullYear()}</p>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-700 mb-6">
            By accessing and using the Water Wise Group website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Products and Services</h2>
          <p className="text-gray-700 mb-6">
            Water Wise Group provides greywater recycling systems and related services. All product descriptions, specifications, and pricing information are subject to change without notice. We reserve the right to refuse service to anyone for any reason at any time.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Ordering and Payment</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>All orders are subject to acceptance and availability</li>
            <li>Prices are subject to change without notice</li>
            <li>Payment must be received before shipment</li>
            <li>We accept major credit cards and other payment methods as specified</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Shipping and Delivery</h2>
          <p className="text-gray-700 mb-6">
            Shipping costs and delivery times vary based on location and product selection. We will provide estimated delivery times, but cannot guarantee specific delivery dates. Risk of loss passes to the customer upon delivery.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Returns and Refunds</h2>
          <p className="text-gray-700 mb-6">
            Returns must be authorized in advance and are subject to our return policy. Products must be returned in original condition within the specified time period. Return shipping costs may apply. Custom or special-order items may not be returnable.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Warranty</h2>
          <p className="text-gray-700 mb-6">
            Our products come with manufacturer warranties as specified in product documentation. Water Wise Group provides additional warranty coverage as outlined in our warranty policy. Warranty coverage is limited to repair or replacement and does not include consequential damages.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Installation and Use</h2>
          <p className="text-gray-700 mb-6">
            Customers are responsible for proper installation and use of products in accordance with provided instructions and local codes. We recommend professional installation for complex systems. Improper installation may void warranty coverage.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 mb-6">
            Water Wise Group's liability is limited to the cost of the products purchased. We are not liable for any indirect, special, incidental, or consequential damages arising from the use of our products or services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Intellectual Property</h2>
          <p className="text-gray-700 mb-6">
            All content on this website, including text, images, logos, and designs, is the property of Water Wise Group and protected by copyright and trademark laws. Unauthorized use is prohibited.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Privacy</h2>
          <p className="text-gray-700 mb-6">
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, to understand our practices.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Governing Law</h2>
          <p className="text-gray-700 mb-6">
            These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to conflict of law provisions.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Information</h2>
          <p className="text-gray-700 mb-6">
            For questions about these Terms of Service, please contact us:
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
            We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated revision date.
          </p>
        </div>
      </div>
    </div>
  )
}