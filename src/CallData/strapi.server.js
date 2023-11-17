export const getBlogArticles = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ` + import.meta.env.VITE_API_KEY,
        },
    }

    try {
        const response = await fetch(
            'http://localhost:1337/api/article-de-blogs',
            requestOptions
        )

        if (!response.ok) {
            throw new Error("La réponse du réseau n'est pas valide")
        }

        const data = await response.json()
        return data.data
    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error)
        throw error // Relancez l'erreur pour qu'elle soit capturée par le code appelant
    }
}
