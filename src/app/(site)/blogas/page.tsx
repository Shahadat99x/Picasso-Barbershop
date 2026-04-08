import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PublicPageIntro } from "@/components/public/page/public-page-intro";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BlogCard } from "@/components/shared/BlogCard";
import { FeaturedArticleCard } from "@/components/shared/FeaturedArticleCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { getPublishedBlogPosts, transformBlogPostForCard } from "@/lib/public-data";
import { getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Blogas",
  description:
    "Skaitykite Picasso Barbershop straipsnius apie stiliu, prieziura ir praktinius pasirinkimus pries kita apsilankyma.",
  path: getLocalizedRoute("blog", "lt"),
  locale: "lt",
});

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogPosts();
  const transformedPosts = posts.map((post) => transformBlogPostForCard(post, "lt"));
  const [featuredPost, ...remainingPosts] = transformedPosts;

  return (
    <main>
      <PublicPageIntro
        eyebrow="Tinklarastis"
        title="Redakciniai straipsniai apie stiliu, prieziura ir aiskesnius pasirinkimus."
        description="Cia rasite ramius, aiskius straipsnius apie kirpimus, prieziura ir smulkius sprendimus, kurie padeda lengviau pasirengti kitam vizitui."
        stats={[
          { label: "Straipsniai", value: String(transformedPosts.length) },
          {
            label: "Kategorijos",
            value: String(new Set(posts.map((post) => post.category)).size),
          },
          { label: "Temos", value: "Prieziura ir stilius" },
        ]}
      />

      {featuredPost ? (
        <Section className="bg-background">
          <Container>
            <SectionHeading
              title="Teminis straipsnis"
              subtitle="Rekomendacija"
              description="Pirmasis pasirinkimas tiems, kurie nori pradeti nuo naudingo skaitymo ir po jo lengviau apsispresti del kito zingsnio."
              align="left"
              className="max-w-3xl"
            />
            <FeaturedArticleCard
              title={featuredPost.title}
              excerpt={featuredPost.excerpt}
              category={featuredPost.category}
              date={featuredPost.date}
              readingTime={featuredPost.readingTime}
              imageUrl={featuredPost.imageUrl || "/images/hero/picasso-team-hero.jpg"}
              imageAlt={featuredPost.imageAlt}
              href={featuredPost.href}
              featuredLabel="Rekomenduojamas"
              readLabel="Skaityti"
            />
          </Container>
        </Section>
      ) : null}

      <Section className="border-t border-border/50 bg-[linear-gradient(180deg,#f5f0ea_0%,#fbf8f4_100%)]">
        <Container>
          <div className="rounded-[2rem] border border-border/60 bg-card/95 p-6 shadow-sm shadow-black/5 md:p-8 lg:p-10">
            <SectionHeading
              title="Visi straipsniai"
              subtitle="Naujausi irasai"
              description="Toliau rasite visus publikuotus irasus, skirtus prieziurai, ivaizdziui, filialu pasirinkimui ir bendram apsisprendimui pries vizita."
              align="left"
              className="max-w-3xl"
            />

            {remainingPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {remainingPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    readingTime={post.readingTime}
                    imageUrl={post.imageUrl}
                    category={post.category}
                    href={post.href}
                  />
                ))}
              </div>
            ) : featuredPost ? (
              <div className="rounded-[1.8rem] border border-border/60 bg-background px-6 py-8 text-center text-muted-foreground">
                Kol kas cia rasite viena pagrindini straipsni. Netrukus papildysime zurnala
                naujomis temomis.
              </div>
            ) : (
              <div className="rounded-[1.8rem] border border-border/60 bg-background px-6 py-8 text-center text-muted-foreground">
                Nauji straipsniai ruošiami. Tuo metu kvieciame perziureti paslaugas arba filialus.
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section className="bg-background pt-0">
        <Container>
          <div className="rounded-[2rem] border border-border/60 bg-[#171311] p-8 text-[#f5efe7] shadow-[0_24px_60px_rgba(0,0,0,0.12)] md:p-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d1af89]">
                  Toliau
                </span>
                <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                  Nuo redakcinio turinio prie aiskaus pasirinkimo.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c7b9ac] md:text-base">
                  Jei straipsnis padejo susidelioti mintis, toliau galite ramiai pereiti prie
                  paslaugu arba filialu ir issirinkti tai, kas jums labiausiai tinka.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href={getLocalizedRoute("services", "lt")}>
                  <PrimaryButton className="w-full bg-[#d2af88] text-[#18120d] hover:bg-[#dec09c]">
                    Ziureti paslaugas
                  </PrimaryButton>
                </Link>
                <Link href={getLocalizedRoute("branches", "lt")}>
                  <SecondaryButton className="w-full border-[#6f5335] bg-transparent text-[#f5efe7] hover:bg-[#231c18] hover:text-[#f5efe7]">
                    Ziureti filialus
                  </SecondaryButton>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCtaSection locale="lt" />
    </main>
  );
}
