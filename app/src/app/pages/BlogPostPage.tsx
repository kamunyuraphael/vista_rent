import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "../data/blog";
import { ROUTES } from "../routes";
import { JsonLd } from "../components/common/JsonLd";
import { PrimaryBtn } from "../components/common/PrimaryBtn";
import { NotFoundPage } from "./NotFoundPage";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <NotFoundPage />;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "VistaRent Kenya" },
  };

  return (
    <div className="max-w-2xl mx-auto px-6 pt-8 pb-28">
      <JsonLd data={articleSchema} />

      <Link to={ROUTES.blog} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={14} /> All guides
      </Link>

      <div className="text-xs text-muted-foreground mb-3">
        {new Date(post.publishedAt).toLocaleDateString("en-KE", { month: "long", day: "numeric", year: "numeric" })}
        {" · "}
        {post.readingMinutes} min read
      </div>
      <h1 className="text-4xl font-black uppercase leading-tight mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {post.title}
      </h1>

      <img
        src={post.coverImage}
        alt={post.title}
        loading="eager"
        className="w-full h-64 md:h-80 object-cover rounded-xl mb-8"
      />

      <div className="space-y-5 text-muted-foreground leading-relaxed">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-12 bg-card border border-border rounded-xl p-6 text-center">
        <p className="text-sm text-muted-foreground mb-4">Ready to plan your trip?</p>
        <PrimaryBtn to={ROUTES.fleet}>Browse the Fleet</PrimaryBtn>
      </div>
    </div>
  );
}
