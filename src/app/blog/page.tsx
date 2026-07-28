import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/config/seo";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/buttons/WhatsAppFloatingButton";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = buildMetadata({
  title: `Blog — Dicas de manutenção automotiva`,
  description: `Conteúdo sobre manutenção automotiva escrito pela equipe da ${siteConfig.name}, em ${siteConfig.city}.`,
  path: "/blog",
});

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <SectionContainer>
          <Breadcrumb items={[{ label: "Blog" }]} />
          <div className="mt-8">
            <SectionTitle
              eyebrow="Blog"
              title="Dicas de manutenção automotiva"
              description="Conteúdo escrito pela nossa equipe técnica para ajudar você a cuidar melhor do seu veículo."
            />
          </div>
        </SectionContainer>

        <SectionContainer className="mt-14">
          <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {blogPosts
              .slice()
              .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
              .map((post) => (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <Card className="flex h-full flex-col overflow-hidden p-0">
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span className="font-mono text-xs uppercase tracking-wider text-muted">
                          {formatDate(post.publishedAt)}
                        </span>
                        <h2 className="mt-2 font-display text-lg font-semibold text-foreground">{post.title}</h2>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
          </StaggerGroup>
        </SectionContainer>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
