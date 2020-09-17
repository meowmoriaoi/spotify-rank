const clientId = 'CLIENT_ID'
const clientSecret = 'CLIENT_SECRET'
const clientCredential = btoa(`${clientId}:${clientSecret}`)

const tokenUrl = 'https://accounts.spotify.com/api/token'
const trackId = '0OgwkVbQ4jVfsZJO4Xs9hC'

function getToken(url = tokenUrl, credential = clientCredential) {
    return fetch(url, {
            body: "grant_type=client_credentials",
            headers: {
                "Authorization": `Basic ${credential}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        })
        .then(res => res.json())
}

function getPlaylist(playlistId, data) {
    const playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

    return fetch(playlistUrl, {
            headers: {
                'Authorization': `${data.token_type} ${data.access_token}`
            }
        })
        .then(res => res.json())
        .then(data => data.items)
}

function getRanking(trackList, playlistName) {
    const ranking = trackList.findIndex(item => item.track.id == `${trackId}`)

    if (ranking === -1) {
        console.log(`${playlistName}: -`)
    } else {
        console.log(`${playlistName}:`)
        console.log(`#${ranking + 1}`)
    }
}

(async () => {
    const accessToken = await getToken()

    const lagiViral = await getPlaylist('37i9dQZF1DWWhB4HOWKFQc', accessToken)
    getRanking(lagiViral, 'Lagi Viral')

    const puncakKlasemen = await getPlaylist('37i9dQZF1DWZxM58TRkuqg', accessToken)
    getRanking(puncakKlasemen, 'Puncak Klasemen')

    const popRisingIndonesia = await getPlaylist('37i9dQZF1DX6yQB7bkflag', accessToken)
    getRanking(popRisingIndonesia, 'Pop Rising Indonesia')

    const musikAkhirPekan = await getPlaylist('37i9dQZF1DWTcLP9S6ATGK', accessToken)
    getRanking(musikAkhirPekan, 'Musik Akhir Pekan')

    const freshFindsIndonesia = await getPlaylist('37i9dQZF1DWSGWRWu30rg7', accessToken)
    getRanking(freshFindsIndonesia, 'Fresh Finds Indonesia')

    const naikDaun = await getPlaylist('37i9dQZF1DX7sD2LU79ZzQ', accessToken)
    getRanking(naikDaun, 'Naik Daun')

    const indonesiaTerbaik = await getPlaylist('0YwsIE2snT3jzhdojbvibe', accessToken)
    getRanking(indonesiaTerbaik, 'Indonesia Terbaik')

    const bosoJowo = await getPlaylist('37i9dQZF1DXcwHMQ31Y15k', accessToken)
    getRanking(bosoJowo, 'Boso Jowo')

})()
