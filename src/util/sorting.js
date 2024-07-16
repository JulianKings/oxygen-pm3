const sortArray = (resultArray, searchSettings, searchType) =>
{
    return (searchSettings === 'default') ? resultArray :
        [...resultArray].sort((a, b) => {
            if(searchSettings === 'likes' || searchSettings === 'height' || searchSettings === 'width')
            {
                return (searchType === 'asc') ? 
                a[searchSettings] - b[searchSettings] :
                b[searchSettings] - a[searchSettings];
            } else if(searchSettings === 'created_at'  && searchType === 'asc') {
                if ((new Date(a[searchSettings])) < (new Date(b[searchSettings]))){
                    return -1;
                }
                if ((new Date(a[searchSettings])) > (new Date(b[searchSettings]))){
                    return 1;
                }
                return 0;
            } else if(searchSettings === 'created_at' && searchType === 'desc') {
                if ((new Date(a[searchSettings])) > (new Date(b[searchSettings]))){
                    return -1;
                }
                if ((new Date(a[searchSettings])) < (new Date(b[searchSettings]))){
                    return 1;
                }
                return 0;
            }
        });
}

export { sortArray }