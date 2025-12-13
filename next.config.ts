import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // Pages redirects (old Shopify /pages/ URLs to new structure)
      { source: '/pages/about-us', destination: '/about', permanent: true },
      { source: '/pages/contact-us', destination: '/contact', permanent: true },
      { source: '/pages/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/pages/terms-of-service', destination: '/terms', permanent: true },
      { source: '/pages/shipping-and-returns', destination: '/shipping', permanent: true },

      // Policy pages
      { source: '/policies/shipping-policy', destination: '/shipping', permanent: true },
      { source: '/policies/refund-policy', destination: '/returns', permanent: true },
      { source: '/policies/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/policies/terms-of-service', destination: '/terms', permanent: true },

      // Directory/Laws redirects - old compliance pages redirect to new directory
      { source: '/pages/greywater-directory', destination: '/directory', permanent: true },
      { source: '/pages/greywater-compliance-ca', destination: '/directory/CA', permanent: true },
      { source: '/pages/greywater-compliance-az', destination: '/directory/AZ', permanent: true },
      { source: '/pages/greywater-compliance-tx', destination: '/directory/TX', permanent: true },
      { source: '/pages/greywater-compliance-or', destination: '/directory/OR', permanent: true },
      { source: '/pages/greywater-compliance-wa', destination: '/directory/WA', permanent: true },
      { source: '/pages/greywater-compliance-co', destination: '/directory/CO', permanent: true },

      // Solution pages redirects
      { source: '/pages/greywater-systems-for-tiny-homes', destination: '/solutions/tiny-homes', permanent: true },
      { source: '/pages/greywater-systems-for-rvs', destination: '/solutions/rvs', permanent: true },
      { source: '/pages/laundry-to-landscape-greywater-system', destination: '/solutions/laundry-to-landscape', permanent: true },
      { source: '/pages/greywater-pumps', destination: '/products', permanent: true },

      // Customer stories redirects
      { source: '/pages/california-homeowner-uses-aqua2use-to-save-water-and-his-trees', destination: '/customer-stories/california-homeowner', permanent: true },
      { source: '/pages/rv-owner-transformed-greywater-into-greenery', destination: '/customer-stories/rv-owner', permanent: true },

      // Landing pages redirects
      { source: '/pages/l2l-tucson', destination: '/solutions/laundry-to-landscape', permanent: true },
      { source: '/pages/l2l-austin', destination: '/solutions/laundry-to-landscape', permanent: true },
      { source: '/pages/l2l-los-angeles', destination: '/solutions/laundry-to-landscape', permanent: true },
      { source: '/pages/tucson-laundry-to-landscape-rebate', destination: '/directory/AZ/pima/tucson', permanent: true },
      { source: '/pages/nola-irrigation-show-landing-page', destination: '/contact', permanent: true },

      // Blog redirects (Shopify blog structure to new structure)
      { source: '/blogs/greywater-education', destination: '/blog', permanent: true },
      { source: '/blogs/greywater-laws', destination: '/greywater-laws', permanent: true },
      { source: '/blogs/greywater-education/:slug', destination: '/blog/:slug', permanent: true },

      // Collections redirect
      { source: '/collections/all', destination: '/products', permanent: true },
      { source: '/collections/:path*', destination: '/products', permanent: true },
    ];
  },
};

export default nextConfig;
