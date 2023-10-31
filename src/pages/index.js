import Features from '@/components/features/features';
import Heading from '@/components/heading/heading';
import Hero from '@/components/hero/hero';
import Layout from '@/components/shared/layout/layout';

export default function Home() {
  return (
    <Layout>
      <Heading />
      <Features />
      <Hero />
    </Layout>
  );
}
