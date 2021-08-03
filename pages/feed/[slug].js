import React from 'react'
import styles from '../../styles/Slug.module.css'
import { useRouter } from "next/router";
function Feed({ pageNumber, articles }) {
    console.log("articles:", articles)
    const router = useRouter();
    return (
        <div className="page-container">
            <div className={styles.main}>
                {articles.map((article, index) => (
                    <div key={index} className={styles.post}>
                        <h2 onClick={() => (window.location.href = article.url)}>{article.title}</h2>
                        <p>{article.description}</p>
                        {!!article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                    </div>
                ))}
            </div>
            <div className={styles.paginator}>
                <div
                    onClick={() => {
                        if (pageNumber > 1) {
                            router.push(`/feed/${pageNumber - 1}`)
                        }
                    }}
                    className={pageNumber === 1 ? styles.disabled : styles.active}>Previous Page
                </div>
                <div>#{pageNumber}</div>
                <div
                    onClick={() => {
                        if (pageNumber < 5) {
                            router.push(`/feed/${pageNumber + 1}`)
                        }
                    }}
                    className={pageNumber === 5 ? styles.disabled : styles.active}>Next Page
                </div>
            </div>
        </div>

    )
}

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.slug;

    if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
        return {
            props: {
                articles: [],
                pageNumber: 1,
            },
        };
    }

    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
            },
        },
    ).then(res => res.json());

    const { articles } = apiResponse;

    return {
        props: {
            articles: articles,
            pageNumber: Number.parseInt(pageNumber),
        },
    };
};
export default Feed
