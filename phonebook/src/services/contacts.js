import axios from 'axios'

const baseurl = 'https://rocky-meadow-54548.herokuapp.com/api/persons'

const getAll = () => {
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseurl, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseurl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseurl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }