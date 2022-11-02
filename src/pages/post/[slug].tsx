import { GetStaticPaths, GetStaticProps } from 'next';
import { Centralizer } from '../../components/Centralizer';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';

import { getPrismicClient } from '../../services/prismic';
import styles from './post.module.scss';
import Image from 'next/image';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    if (post !== null && post !== undefined) {
      setIsloading(false);
    } else {
      setIsloading(true);
    }
  }, [post])

  return (
    <div className={styles.post_container}>
      <Centralizer>
        <Header />
        {isLoading ? <h1>Carregando...</h1>
          :
          <>
            <img src={post.data.banner.url} className={styles.post_img} />
            <div className={styles.post_body}>
              <div className={styles.post_content_header}>
                <h1>{post.data.title}</h1>
                <div className={styles.post_title_info_container}>
                  <div className={styles.post_title_info}>
                    <Image src="/images/icon_calendar.svg" width={20} height={20} />
                    <p>
                      {format(new Date(post.first_publication_date), 'd MMM yyyy', {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                  <div className={styles.post_title_info}>
                    <Image src="/images/icon_user.svg" width={20} height={20} />
                    <p>{post.data.author}</p>
                  </div>
                  <div className={styles.post_title_info}>
                    <Image src="/images/icon_clock.svg" width={20} height={20} />
                    <p>4 min</p>
                  </div>
                </div>
              </div>
              {post.data.content.map(content =>
                content.body.map((body, i) => {
                  return (
                    <div key={i}>
                      <h2>{content.heading}</h2>
                      <p>{body.text}</p>
                    </div>
                  );
                })
              )}
            </div>
          </>
        }
      </Centralizer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getAllByType('blogposts');
  const paths = [];

  posts.map(post => {
    paths.push({ params: { slug: post.uid } });
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('blogposts', slug as string);

  const post = {
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content,
    },
  } as Post;

  return {
    props: {
      post,
    },
  };
};
