import type { Metadata } from 'next';

import Prose from 'components/prose';
import { getBlog } from 'lib/shopify';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {
  const page = await getBlog(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
    openGraph: {
      type: 'article'
    }
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  const page = await getBlog(params.page);

  if (!page) return notFound();

  return (
    <>
      <div className="fixed top-0 -z-10 mb-10 h-screen w-full sm:absolute sm:h-full">
        <Image
          className="h-full w-full object-cover"
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          alt={page.image?.altText as string}
          src={page.image?.url as string}
          priority={true}
        />
      </div>
      <div className="mx-0 w-full bg-black bg-opacity-70 p-4 sm:mx-auto sm:max-w-5xl sm:bg-opacity-50 sm:px-20 sm:py-20">
        <Suspense>
          <h1 className="mb-8 text-4xl font-bold md:text-5xl">{page.title}</h1>
          <Prose className="mb-8" html={page.contentHtml as string} />
        </Suspense>
      </div>
    </>
  );
}
