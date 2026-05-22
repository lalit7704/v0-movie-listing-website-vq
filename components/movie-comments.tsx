"use client";

interface MovieCommentsProps {
  slug: string;
  title: string;
}

export function MovieComments({ slug, title }: MovieCommentsProps) {
  const disqusShortname = "onemovie-2";

  const disqusConfig = {
    url: `https://onemovie.in/movie/${slug}`,
    identifier: slug,
    title: title,
  };

  return (
    <div className="mt-10 bg-card p-4 sm:p-6 rounded-xl border border-border w-full mx-auto" style={{colorScheme: 'dark'}}>
      <h3 className="text-xl font-bold text-foreground mb-4">Leave a Comment</h3>
      <div id="disqus_thread" style={{ minHeight: '400px', colorScheme: 'dark' }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            console.log('Disqus: Initializing with shortname: ${disqusShortname}');
            window.disqus_config = function () {
              this.page.url = "${disqusConfig.url}";
              this.page.identifier = "${disqusConfig.identifier}";
              this.page.title = "${title}";
            };
            (function() {
              var d = document, s = d.createElement('script');
              s.src = 'https://${disqusShortname}.disqus.com/embed.js';
              s.setAttribute('data-timestamp', +new Date());
              (d.head || d.body).appendChild(s);
              console.log('Disqus script added: https://${disqusShortname}.disqus.com/embed.js');
            })();
          `,
        }}
      />
      <noscript>
        Please enable JavaScript to view comments.
        <a href="https://disqus.com/?ref_noscript">Powered by Disqus</a>
      </noscript>
    </div>
  );
}