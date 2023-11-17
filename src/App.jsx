import { useAtom } from 'jotai'
import { getBlogArticles } from './CallData/strapi.server'
import { blogAtom } from './main'
import { useState, useEffect } from 'react'

function App() {
    const [articles, setArticles] = useAtom(blogAtom)

    const [dataFetched, setDataFetched] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        try {
            const blogData = await getBlogArticles()
            setArticles(blogData)
            setDataFetched(true)
        } catch (e) {
            console.error(e)
            setError(e)
        }
    }

    useEffect(() => {        
        !dataFetched && fetchData()
    }, [])

    useEffect(() => {
        !dataFetched && setDataFetched(true)
        console.log(articles)
    }, [articles])

    return (
        <>
            <h1>My great strapi blog</h1>
            <p>let learn this awesome headless CMS</p>
            {error ? <p>Houston, on a un problème !</p> : dataFetched ? (
                articles.map((article) => (
                    <article key={article.id}>
                        <h3>{article.attributes.title}</h3>
                        <p>{article.attributes.content}</p>
                    </article>
                ))
            ) : (
                <>loading ...</>
            )}
        </>
    )
}

export default App
