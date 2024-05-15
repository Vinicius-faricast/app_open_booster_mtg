const url = "https://api.magicthegathering.io/v1/"
const sets = "Amonkhet Remastered"
const blockName = 'Amonkhet'
const body = document.querySelector('body')

//obs a api puxa a lista tanto pelo nome como pelo bloco

//Fetch para puxar lista de coleções requisitadas
const fetchMagicSets = (url, setsName, blockName)=> {
    const param = setsName ? `${setsName}|${blockName}` : blockName;
    const result = fetch(`${url}sets?name=${param}`)
    .then( response => response.json())
    .then(data => {
        return data
    })
    return result;
}

const fetchBooster = (id) => {

    const result = fetch(`${url}sets/${id}/booster`)
    .then(response => response.json())
    .then(data => {
        data.cards.forEach(card => {
            console.log(card.imageUrl);
            const img = document.createElement('img');
            img.src = card.imageUrl;
            body.append(img);
        })
        
    });
};

const responseListSets = async () => {
    const list = await fetchMagicSets(url, sets, blockName);
    let id = ''
    list.sets.forEach(({name, block, releaseDate, code, booster}) => {
        if(booster){
            id = code;
        }
        // console.log(name, block, releaseDate, code, booster)
    });
    // console.log(id)
    fetchBooster(id);
};

responseListSets();
