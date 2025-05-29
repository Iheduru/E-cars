import { useParams } from 'react-router-dom';

const Article = () => {
  const { slug } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Article not found: {slug}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          The requested article could not be found.
        </p>
      </article>
    </div>
  );
};

export default Article;