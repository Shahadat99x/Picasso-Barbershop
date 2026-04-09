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
  title: "Blog",
  description:
    "Read Picasso Barbershop journal articles on grooming, style, and practical choices before your next visit.",
  path: getLocalizedRoute("blog", "en"),
  locale: "en",
});

export default async function EnBlogPage() {
  const posts = await getPublishedBlogPosts();
  const transformedPosts = posts.map((post) => transformBlogPostForCard(post, "en"));
  const [featuredPost, ...remainingPosts] = transformedPosts;

  return (
    <main>
      <PublicPageIntro
        eyebrow="Editorial journal"
        title="Articles on grooming, style, and clearer decisions before you book."
        description="This journal brings together calm, useful reading on cuts, care, and the small decisions that make the next appointment feel easier."
        stats={[
          { label: "Articles", value: String(transformedPosts.length) },
          {
            label: "Categories",
            value: String(new Set(posts.map((post) => post.category)).size),
          },
          { label: "Focus", value: "Care and style" },
        ]}
      />

      {featuredPost ? (
        <Section className="bg-background">
          <Container>
            <SectionHeading
              title="Featured article"
              subtitle="Editorial pick"
              description="A strong place to begin if you want useful reading first and a clearer decision afterward."
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
              featuredLabel="Featured"
              readLabel="Read article"
            />
          </Container>
        </Section>
      ) : null}

      <Section className="border-t border-border/50 bg-[linear-gradient(180deg,#f5f0ea_0%,#fbf8f4_100%)]">
        <Container>
          <div className="rounded-[2rem] border border-border/60 bg-card/95 p-6 shadow-sm shadow-black/5 md:p-8 lg:p-10">
            <SectionHeading
              title="All articles"
              subtitle="Latest posts"
              description="Browse every published post covering care, style, branch choice, and the practical decisions that shape a confident visit."
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
                There is one main article here for now. More journal entries will be added soon.
              </div>
            ) : (
              <div className="rounded-[1.8rem] border border-border/60 bg-background px-6 py-8 text-center text-muted-foreground">
                New articles are on the way. In the meantime, feel free to explore services or branches.
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
                  Next
                </span>
                <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                  Move from editorial context into a clear next step.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c7b9ac] md:text-base">
                  If the article helped sharpen your thinking, continue into services or branches
                  and choose what feels right for your next visit.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <PrimaryButton
                  href={getLocalizedRoute("services", "en")}
                  className="w-full bg-[#d2af88] text-[#18120d] hover:bg-[#dec09c]"
                >
                  View services
                </PrimaryButton>
                <SecondaryButton
                  href={getLocalizedRoute("branches", "en")}
                  className="w-full border-[#6f5335] bg-transparent text-[#f5efe7] hover:bg-[#231c18] hover:text-[#f5efe7]"
                >
                  View branches
                </SecondaryButton>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCtaSection locale="en" />
    </main>
  );
}
