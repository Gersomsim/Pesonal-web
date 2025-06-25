// BlogPosts.jsx
export default function BlogPosts({ posts }) {
  return (
    <>
      {posts.map(post => (
        <article
          key={post.slug}
          className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 group rounded p-6 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-700"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {post.image && (
              <div className="lg:w-1/3">
                <img src={post.image.url} alt={post.image.alt} className="w-full h-auto" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <a href={`/blog/${post.slug}`} className="no-underline group-hover:no-underline">
                    <h2 className="text-2xl font-bold dark:group-hover:text-accent group-hover:text-primary transition-colors duration-300 mb-3">
                      {post.title}
                    </h2>
                  </a>
                  <p className="text-base-content/70 text-lg leading-relaxed mb-4 text-justify">
                    {post.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 text-sm text-base-content/60">
              <div className="flex items-center gap-2">
                <i className="fa-regular fa-calendar text-secondary"></i>
                <span class="dark:text-gray-200">{formatDate(post.pubDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-regular fa-user text-secondary"></i>
                <span class="dark:text-gray-200">{post.author}</span>
              </div>
            </div>
            <a
              href={`/blog/${post.slug}`}
              className="btn dark:btn-accent btn-primary btn-sm group-hover:btn-outline transition-all duration-300"
            >
              <span>Leer más</span>
              <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
            </a>
          </div>
        </article>
      ))}
    </>
  );
}

const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
