import { blogPosts } from "@/data/blog";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/config/seo";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/buttons/WhatsAppFloatingButton";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Badge } from "@/components/ui/Badge";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
  });
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedServices = services.filter((s) => post.relatedServiceSlugs?.includes(s.slug));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}${post.coverImage}`,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: siteConfig.legalName },
    publisher: { "@type": "Organization", name: siteConfig.legalName },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Navbar />
      <main className="pt-32">
        <SectionContainer className="mx-auto max-w-3xl">
          <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

          <span className="mt-8 block font-mono text-xs uppercase tracking-wider text-muted">
            {formatDate(post.publishedAt)}
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {post.title}
          </h1>

          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border">
            <Image src={post.coverImage} alt={post.title} fill sizes="768px" className="object-cover" />
          </div>

          <div className="mt-10 space-y-5">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-foreground/85">
                {paragraph}
              </p>
            ))}
          </div>

          {relatedServices.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="text-sm text-muted">Serviço relacionado:</span>
              {relatedServices.map((service) => (
                <Link key={service.id} href={`/servicos/${service.slug}`}>
                  <Badge className="hover:border-accent hover:text-accent">{service.title}</Badge>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-14 flex flex-col items-center gap-5 rounded-3xl border border-border bg-surface px-8 py-12 text-center">
            <h2 className="font-display text-xl font-semibold text-foreground">Precisa desse serviço no seu veículo?</h2>
            <WhatsAppButton size="lg" />
          </div>
        </SectionContainer>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
