'use client'

import { Builder } from '@builder.io/react'
import {
  PageHero,
  CTASection,
  ContentBlock,
  StatsSection,
  ProcessSteps,
} from '@/components/sections'

// Import wrapper components for Builder
import { BuilderFeatureGrid } from './BuilderFeatureGrid'
import { BuilderTestimonials } from './BuilderTestimonials'
import { BuilderProductShowcase } from './BuilderProductShowcase'
import { BuilderNewsletterSection } from './BuilderNewsletterSection'

// ============================================
// Register PageHero Component
// ============================================
Builder.registerComponent(PageHero, {
  name: 'PageHero',
  friendlyName: 'Page Hero',
  description: 'Hero section with title, description, and optional CTA',
  image: 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F6bd4c8a2eda14d249ac0e33b13f39cd6',
  inputs: [
    {
      name: 'title',
      type: 'string',
      required: true,
      defaultValue: 'Your Page Title',
      helperText: 'The main headline for this section',
    },
    {
      name: 'description',
      type: 'longText',
      helperText: 'Supporting text below the headline',
    },
    {
      name: 'variant',
      type: 'string',
      enum: ['default', 'gradient', 'white', 'blue'],
      defaultValue: 'gradient',
      helperText: 'Background style for the hero',
    },
    {
      name: 'size',
      type: 'string',
      enum: ['sm', 'md', 'lg'],
      defaultValue: 'lg',
      helperText: 'Vertical padding size',
    },
    {
      name: 'centered',
      type: 'boolean',
      defaultValue: true,
      helperText: 'Center align the content',
    },
  ],
})

// ============================================
// Register CTASection Component
// ============================================
Builder.registerComponent(CTASection, {
  name: 'CTASection',
  friendlyName: 'Call to Action',
  description: 'CTA section with buttons and optional stats',
  image: 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F6bd4c8a2eda14d249ac0e33b13f39cd6',
  inputs: [
    {
      name: 'title',
      type: 'string',
      required: true,
      defaultValue: 'Ready to Get Started?',
    },
    {
      name: 'description',
      type: 'longText',
    },
    {
      name: 'variant',
      type: 'string',
      enum: ['blue', 'gradient'],
      defaultValue: 'blue',
    },
    {
      name: 'buttons',
      type: 'list',
      subFields: [
        {
          name: 'label',
          type: 'string',
          required: true,
          defaultValue: 'Get Started',
        },
        {
          name: 'href',
          type: 'string',
          required: true,
          defaultValue: '/contact',
        },
        {
          name: 'variant',
          type: 'string',
          enum: ['primary', 'secondary'],
          defaultValue: 'primary',
        },
      ],
      defaultValue: [
        { label: 'Get Started', href: '/contact', variant: 'primary' },
        { label: 'Learn More', href: '/about', variant: 'secondary' },
      ],
    },
    {
      name: 'stats',
      type: 'list',
      subFields: [
        { name: 'value', type: 'string', required: true },
        { name: 'label', type: 'string', required: true },
        { name: 'sublabel', type: 'string' },
      ],
    },
  ],
})

// ============================================
// Register ContentBlock Component
// ============================================
Builder.registerComponent(ContentBlock, {
  name: 'ContentBlock',
  friendlyName: 'Content Block',
  description: 'Image + text section with features list',
  image: 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F6bd4c8a2eda14d249ac0e33b13f39cd6',
  inputs: [
    {
      name: 'title',
      type: 'string',
      required: true,
      defaultValue: 'Section Title',
    },
    {
      name: 'description',
      type: 'longText',
    },
    {
      name: 'features',
      type: 'list',
      subFields: [
        { name: 'text', type: 'string' },
      ],
      helperText: 'Use "Title: Description" format for rich features',
    },
    {
      name: 'image',
      type: 'object',
      subFields: [
        {
          name: 'src',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp', 'avif'],
          required: true,
        },
        {
          name: 'alt',
          type: 'string',
          required: true,
        },
        {
          name: 'width',
          type: 'number',
          defaultValue: 600,
        },
        {
          name: 'height',
          type: 'number',
          defaultValue: 400,
        },
      ],
    },
    {
      name: 'imagePosition',
      type: 'string',
      enum: ['left', 'right'],
      defaultValue: 'right',
    },
    {
      name: 'variant',
      type: 'string',
      enum: ['default', 'featured'],
      defaultValue: 'default',
    },
    {
      name: 'bgColor',
      type: 'string',
      enum: ['white', 'gray'],
      defaultValue: 'white',
    },
  ],
})

// ============================================
// Register StatsSection Component
// ============================================
Builder.registerComponent(StatsSection, {
  name: 'StatsSection',
  friendlyName: 'Stats Section',
  description: 'Display key statistics with labels',
  inputs: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'subtitle',
      type: 'longText',
    },
    {
      name: 'stats',
      type: 'list',
      required: true,
      subFields: [
        { name: 'value', type: 'string', required: true, defaultValue: '100+' },
        { name: 'label', type: 'string', required: true, defaultValue: 'Customers' },
        { name: 'sublabel', type: 'string' },
        {
          name: 'color',
          type: 'string',
          enum: ['blue', 'green', 'purple', 'orange', 'gray'],
          defaultValue: 'blue',
        },
      ],
      defaultValue: [
        { value: '5,000+', label: 'Systems Sold', color: 'blue' },
        { value: '40%', label: 'Water Savings', color: 'green' },
        { value: '15+', label: 'Years Experience', color: 'purple' },
      ],
    },
    {
      name: 'variant',
      type: 'string',
      enum: ['default', 'compact'],
      defaultValue: 'default',
    },
    {
      name: 'bgColor',
      type: 'string',
      enum: ['white', 'gray'],
      defaultValue: 'gray',
    },
  ],
})

// ============================================
// Register ProcessSteps Component (simplified - no icons)
// ============================================
Builder.registerComponent(ProcessSteps, {
  name: 'ProcessSteps',
  friendlyName: 'Process Steps',
  description: 'Numbered step-by-step process display',
  inputs: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'subtitle',
      type: 'longText',
    },
    {
      name: 'steps',
      type: 'list',
      required: true,
      subFields: [
        { name: 'number', type: 'number', required: true },
        { name: 'title', type: 'string', required: true },
        { name: 'description', type: 'longText', required: true },
        {
          name: 'color',
          type: 'string',
          enum: ['blue', 'green', 'purple', 'orange'],
          defaultValue: 'blue',
        },
      ],
      defaultValue: [
        { number: 1, title: 'Collect', description: 'Gather greywater from showers and laundry', color: 'blue' },
        { number: 2, title: 'Filter', description: 'Clean water through 4-stage filtration', color: 'green' },
        { number: 3, title: 'Irrigate', description: 'Water your garden automatically', color: 'purple' },
      ],
    },
    {
      name: 'variant',
      type: 'string',
      enum: ['default', 'large'],
      defaultValue: 'default',
    },
  ],
})

// ============================================
// Register Builder-specific wrapper components
// ============================================
Builder.registerComponent(BuilderFeatureGrid, {
  name: 'FeatureGrid',
  friendlyName: 'Feature Grid',
  description: 'Grid of features with icons',
  inputs: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'subtitle',
      type: 'longText',
    },
    {
      name: 'features',
      type: 'list',
      required: true,
      subFields: [
        {
          name: 'icon',
          type: 'string',
          enum: ['Droplets', 'Leaf', 'DollarSign', 'Shield', 'Zap', 'CheckCircle', 'Home', 'Settings', 'Truck', 'Star'],
          defaultValue: 'CheckCircle',
        },
        { name: 'title', type: 'string', required: true },
        { name: 'description', type: 'longText', required: true },
        {
          name: 'iconColor',
          type: 'string',
          enum: ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-orange-600', 'text-gray-600'],
          defaultValue: 'text-blue-600',
        },
        {
          name: 'iconBgColor',
          type: 'string',
          enum: ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-orange-100', 'bg-gray-100'],
          defaultValue: 'bg-blue-100',
        },
      ],
    },
    {
      name: 'columns',
      type: 'string',
      enum: ['2', '3', '4'],
      defaultValue: '3',
      helperText: 'Number of columns in the grid',
    },
    {
      name: 'centered',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'variant',
      type: 'string',
      enum: ['default', 'cards'],
      defaultValue: 'default',
    },
  ],
})

Builder.registerComponent(BuilderTestimonials, {
  name: 'Testimonials',
  friendlyName: 'Testimonials',
  description: 'Customer testimonial carousel',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'What Our Customers Say',
    },
    {
      name: 'testimonials',
      type: 'list',
      required: true,
      subFields: [
        { name: 'name', type: 'string', required: true },
        { name: 'location', type: 'string' },
        { name: 'quote', type: 'longText', required: true },
        { name: 'rating', type: 'number', defaultValue: 5 },
        { name: 'avatar', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
      ],
    },
  ],
})

Builder.registerComponent(BuilderProductShowcase, {
  name: 'ProductShowcase',
  friendlyName: 'Product Showcase',
  description: 'Display featured Shopify products',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Featured Products',
    },
    {
      name: 'productHandles',
      type: 'list',
      subFields: [
        { name: 'handle', type: 'string', required: true },
      ],
      defaultValue: [
        { handle: 'aqua2use' },
      ],
    },
    {
      name: 'columns',
      type: 'string',
      enum: ['2', '3', '4'],
      defaultValue: '3',
    },
  ],
})

// ============================================
// Register Newsletter Section Component
// ============================================
Builder.registerComponent(BuilderNewsletterSection, {
  name: 'NewsletterSection',
  friendlyName: 'Newsletter Signup',
  description: 'Email newsletter signup section with customizable styling',
  image: 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F6bd4c8a2eda14d249ac0e33b13f39cd6',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Stay Water Wise',
      helperText: 'Main heading for the newsletter section',
    },
    {
      name: 'subtitle',
      type: 'longText',
      defaultValue: 'Get greywater tips, conservation news, and exclusive offers delivered to your inbox.',
      helperText: 'Supporting text below the heading',
    },
    {
      name: 'buttonText',
      type: 'string',
      defaultValue: 'Subscribe',
      helperText: 'Text for the submit button',
    },
    {
      name: 'successMessage',
      type: 'string',
      defaultValue: 'Thanks for subscribing!',
      helperText: 'Message shown after successful signup',
    },
    {
      name: 'variant',
      type: 'string',
      enum: ['default', 'gradient', 'blue', 'white'],
      defaultValue: 'gradient',
      helperText: 'Background style for the section',
    },
    {
      name: 'showIcon',
      type: 'boolean',
      defaultValue: true,
      helperText: 'Show water droplet icon above title',
    },
  ],
})

// Export a flag to confirm registration
export const BUILDER_COMPONENTS_REGISTERED = true
