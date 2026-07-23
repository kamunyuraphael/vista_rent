import { Link } from "react-router";
import { blogPosts } from "../data/blog";
import { blogPostPath } from "../routes";
import { SectionLabel } from "../components/common/SectionLabel";
import { useLanguage } from "../lib/i18n";

export function BlogPage() {
  const { t } = useLanguage();
  return (
    <div>
      <div className="bg-card border-b border-border py-20">
        <div className="max-w-4xl mx-auto px-6">
          <SectionLabel>{t("blog.label")}</SectionLabel>
          <h1
            className="text-6xl md:text-7xl font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {t("blog.title")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            {t("blog.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={blogPostPath(post.slug)}
              className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="h-44 overflow-hidden bg-secondary">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="text-xs text-muted-foreground mb-2">
                  {new Date(post.publishedAt).toLocaleDateString("en-KE", { month: "long", day: "numeric", year: "numeric" })}
                  {" · "}
                  {post.readingMinutes} min read
                </div>
                <h2 className="font-semibold text-lg leading-snug mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
