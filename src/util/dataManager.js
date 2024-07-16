import { sortArray } from "./sorting";

const loadFromLocalStorage = (searchSettings, searchType) => {
    const idList = localStorage.getItem('id-list');

    if(idList && idList !== '')
    {
        const idArray = idList.split(',');
        const resultArray = [];
        idArray.forEach((id) => {
            if(id !== '')
            {
                const createdAt = localStorage.getItem('photo-' + id +'-created');
                const width = localStorage.getItem('photo-' + id +'-width');
                const height = localStorage.getItem('photo-' + id +'-height');
                const description = localStorage.getItem('photo-' + id + '-description');
                const urlRegular = localStorage.getItem('photo-' + id +'-url-regular');
                const urlFull = localStorage.getItem('photo-' + id +'-url-full');
                const likes = localStorage.getItem('photo-' + id +'-likes');
                let tag = '';
                if(localStorage.getItem('photo-' + id +'-tag') == null)
                {
                    tag = 'untagged';
                    localStorage.setItem('photo-' + id +'-tag', 'untagged');
                } else {
                    tag = localStorage.getItem('photo-' + id +'-tag');
                }

                const resultObject = {
                    id: id,
                    created_at: createdAt,
                    width: width,
                    height: height,
                    description: description,
                    likes: likes,
                    urls: {
                        regular: urlRegular,
                        full: urlFull
                    },
                    tag: tag
                }

                resultArray.push(resultObject);
            }
        });

        return sortArray(resultArray, searchSettings, searchType);
    } else {
        return [];
    }
}

const filterFromLocalStorage = (field, value, searchSettings, searchType) => {
    const idList = localStorage.getItem('id-list');

    if(idList && idList !== '')
    {
        const idArray = idList.split(',');
        const resultArray = [];
        idArray.forEach((id) => {
            if(id !== '')
            {
                const createdAt = localStorage.getItem('photo-' + id +'-created');
                const width = localStorage.getItem('photo-' + id +'-width');
                const height = localStorage.getItem('photo-' + id +'-height');
                const description = localStorage.getItem('photo-' + id + '-description');
                const urlRegular = localStorage.getItem('photo-' + id +'-url-regular');
                const urlFull = localStorage.getItem('photo-' + id +'-url-full');
                const likes = localStorage.getItem('photo-' + id +'-likes');
                let tag = '';
                if(localStorage.getItem('photo-' + id +'-tag') == null)
                {
                    tag = 'untagged';
                    localStorage.setItem('photo-' + id +'-tag', 'untagged');
                } else {
                    tag = localStorage.getItem('photo-' + id +'-tag');
                }
                
                const resultObject = {
                    id: id,
                    created_at: createdAt,
                    width: width,
                    height: height,
                    description: description,
                    likes: likes,
                    urls: {
                        regular: urlRegular,
                        full: urlFull
                    },
                    tag: tag
                }

                if(resultObject[field].includes(value))
                {
                    resultArray.push(resultObject);
                }
            }
        });

        return sortArray(resultArray, searchSettings, searchType);
    } else {
        return [];
    }
}

const appendPhoto = (photo, searchQuery) =>
{
    const idList = localStorage.getItem('id-list');

    if(idList)
    {
        localStorage.setItem('id-list', idList + photo.id + ',');
    } else {
        localStorage.setItem('id-list', idList + ',');
    }

    // save
    localStorage.setItem('photo-' + photo.id +'-created', photo.created_at);
    localStorage.setItem('photo-' + photo.id +'-width', photo.width);
    localStorage.setItem('photo-' + photo.id +'-height', photo.height);
    localStorage.setItem('photo-' + photo.id + '-description', photo.description);
    localStorage.setItem('photo-' + photo.id +'-url-regular', photo.urls.regular);
    localStorage.setItem('photo-' + photo.id +'-url-full', photo.urls.full);
    localStorage.setItem('photo-' + photo.id +'-likes', photo.likes);
    localStorage.setItem('photo-' + photo.id +'-tag', searchQuery);

    const resultObject = {
        id: photo.id,
        created_at: photo.created_at,
        width: photo.width,
        height: photo.height,
        description: photo.description,
        likes: photo.likes,
        urls: {
            regular: photo.urls.regular,
            full: photo.urls.full
        }
    }

    return resultObject;
}

const removePhoto = (id) => {
    const idList = localStorage.getItem('id-list');

    if(idList)
    {
        const toReplace = idList.replace(id + ',', '')
        localStorage.setItem('id-list', toReplace);
    } else {
        localStorage.setItem('id-list', '');
    }

    // remove
    localStorage.removeItem('photo-' + id +'-created');
    localStorage.removeItem('photo-' + id +'-width');
    localStorage.removeItem('photo-' + id +'-height');
    localStorage.removeItem('photo-' + id + '-description');
    localStorage.removeItem('photo-' + id +'-url-regular');
    localStorage.removeItem('photo-' + id +'-url-full');
    localStorage.removeItem('photo-' + id +'-likes');
    localStorage.removeItem('photo-' + id +'-tag');
}

const photoExist = (id) => {
    const idList = localStorage.getItem('id-list');

    if(idList === null)
    {
        localStorage.setItem('id-list', '');
        return false;
    } else {
        return idList.includes(id + ',');
    }
}

const loadPhoto = (id) => {
    if(photoExist(id))
    {
        const createdAt = localStorage.getItem('photo-' + id +'-created');
        const width = localStorage.getItem('photo-' + id +'-width');
        const height = localStorage.getItem('photo-' + id +'-height');
        const description = localStorage.getItem('photo-' + id + '-description');
        const urlRegular = localStorage.getItem('photo-' + id +'-url-regular');
        const urlFull = localStorage.getItem('photo-' + id +'-url-full');
        const likes = localStorage.getItem('photo-' + id +'-likes');

        const resultObject = {
            id: id,
            created_at: createdAt,
            width: width,
            height: height,
            description: description,
            likes: likes,
            urls: {
                regular: urlRegular,
                full: urlFull
            }
        }

        return resultObject;
    } else {
        return null;
    }
}

const updatePhoto = (id, field, value) => {
    if(photoExist(id))
    {
        localStorage.setItem('photo-' + id +'-' + field, value);
    }
}

const loadPrevPhoto = (id, searchSettings, searchType) =>
{
    const photoArray = loadFromLocalStorage(searchSettings, searchType);
    const photoIndex = photoArray.findIndex((photo) => photo.id === id);
    if(photoIndex !== -1)
    {
        if(photoIndex === 0)
        {
            return photoArray[(photoArray.length - 1)];
        } else {
            return photoArray[(photoIndex - 1)]
        }
        
    } else {
        return null;
    }
}

const loadNextPhoto = (id, searchSettings, searchType) =>
{
    const photoArray = loadFromLocalStorage(searchSettings, searchType);
    const photoIndex = photoArray.findIndex((photo) => photo.id === id);
    if(photoIndex !== -1)
    {
        if(photoIndex === (photoArray.length - 1))
        {
            return photoArray[0];
        } else {
            return photoArray[(photoIndex + 1)]
        }
        
    } else {
        return null;
    }
}

export { loadFromLocalStorage, filterFromLocalStorage, loadPhoto, appendPhoto, removePhoto, photoExist, updatePhoto, loadPrevPhoto, loadNextPhoto }