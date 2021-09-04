const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (prev, current) => {
        return prev > current.likes ? prev : current.likes
    }

    //asd continue here, return most liked object or something
    return blogs.find(blog => blog.likes === blogs.reduce(reducer, 0))
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}