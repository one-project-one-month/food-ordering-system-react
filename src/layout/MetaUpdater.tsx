import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

interface MetaInfo {
  title: string;
  description: string;
  keywords: string;
}

// Map routes to meta info
const metaMap: Record<string, MetaInfo> = {
  '/': {
    title: 'Home | Sar Mal',
    description: 'Welcome to Sar Mal homepage.',
    keywords: 'Sar Mal, food, delivery',
  },
  '/about': {
    title: 'About Us | Sar Mal',
    description: 'Learn more about Sar Mal and our mission.',
    keywords: 'Sar Mal, about, company',
  },
  '/login': {
    title: 'Login | Sar Mal',
    description: 'Login to your Sar Mal account.',
    keywords: 'login, authentication',
  },
  '/verify_mail': {
    title: 'Verify Mail | Sar Mal',
    description: 'Verify your email.',
    keywords: 'Verify, Check email',
  },
  '/signup': {
    title: 'Sign up | Sar Mal',
    description: 'Create a new Sar Mal account.',
    keywords: 'register, signup',
  },
  '/restaurants': {
    title: 'Restaurants | Sar Mal',
    description: 'Browse all restaurants.',
    keywords: 'restaurants, food',
  },
  '/categories': {
    title: 'Categories | Sar Mal',
    description: 'Explore food categories.',
    keywords: 'categories, food types',
  },
  '/dashboard': {
    title: 'Dashboard | Sar Mal',
    description: 'Your user dashboard.',
    keywords: 'dashboard, user',
  },
  '/address': {
    title: 'Address Management | Sar Mal',
    description: 'Manage your addresses.',
    keywords: 'address, profile',
  },
};

const defaultMeta: MetaInfo = {
  title: 'Sar Mal',
  description: 'Default description',
  keywords: 'default, keywords',
};

const MetaUpdater: React.FC = () => {
  const location = useLocation();

  // Try to find meta info for current path or fallback to default
  const meta = metaMap[location.pathname] ?? defaultMeta;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
    </Helmet>
  );
};

export default MetaUpdater;
