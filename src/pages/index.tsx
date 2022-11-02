import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';

import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import { Centralizer } from '../components/Centralizer';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const [pagination, setPagination] = useState(2);
  const [maxContent, setMaxContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (postsPagination.results.length <= pagination) {
      setMaxContent(true);
    }
  }, [postsPagination])

  useEffect(() => {
    if (postsPagination !== null && postsPagination !== undefined) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [postsPagination]);

  function handlePagination() {
    if (pagination < postsPagination.results.length) {
      setPagination(pagination + 1);

      if (pagination + 1 === postsPagination.results.length) {
        setMaxContent(true);
      }
    }
  }

  return (
    <div className={styles.home_container}>
      <Centralizer>
        <div className={styles.home_post_container}>
          <Header />
          {isLoading ? (
            <h1>Carregando...</h1>
          ) : (
            postsPagination.results.map((post, i) => {
              if (i < pagination) {
                return (
                  <div className={styles.home_post} key={post.uid}>
                    <Link href={`/post/${post.uid}`}>
                      <h1 onClick={() => console.log('click')}>
                        {post.data.title}
                      </h1>
                    </Link>
                    <p>{post.data.subtitle}</p>
                    <div className={styles.home_post_extra_info}>
                      <div className={styles.home_post_extra_info_block}>
                        <Image
                          src="/images/icon_calendar.svg"
                          width={20}
                          height={20}
                        />
                        <p>
                          {format(
                            new Date(post.first_publication_date),
                            'd MMM yyyy',
                            {
                              locale: ptBR,
                            }
                          )}
                        </p>
                      </div>
                      <div className={styles.home_post_extra_info_block}>
                        <Image
                          src="/images/icon_user.svg"
                          width={20}
                          height={20}
                        />
                        <p>{post.data.author}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          )}
          {!maxContent ? (
            <h3 className={styles.home_load_posts} onClick={handlePagination}>
              Carregar mais posts
            </h3>
          ) : (
            <></>
          )}
        </div>
      </Centralizer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const prismic = getPrismicClient({ previewData });
  const postsResponse = await prismic.getByType('blogposts');
  const postsPagination: PostPagination = {
    next_page: null,
    results: [],
  };

  postsResponse.results.map(post => {
    const { uid, first_publication_date } = post;
    const { title, subtitle, author } = post.data;

    postsPagination.results.push({
      uid,
      first_publication_date,
      data: {
        title,
        subtitle,
        author,
      },
    });
  });

  return {
    props: {
      postsPagination,
    },
  };
};
