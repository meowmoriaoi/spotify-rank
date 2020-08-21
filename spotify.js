const axios = require('axios');

const clientId = 'd108f33233084c2eb0d31584d7734297'
const clientSecret = 'a4587a2868ac4d9dabcf1b2750922f01'
const clientCredential = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

const tokenUrl = 'https://accounts.spotify.com/api/token'
const trackId = '0OgwkVbQ4jVfsZJO4Xs9hC'

function getToken(url = tokenUrl, credential = clientCredential) {
    return axios({
            method: 'post',
            url,
            data: "grant_type=client_credentials",
            headers: {
                'Authorization': `Basic ${credential}`
            },
        })
        .then(response => response.data)
}

function getPlaylist(playlistId, data) {
    const playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

    return axios({
            method: 'get',
            url: playlistUrl,
            headers: {
                Authorization: `${data.token_type} ${data.access_token}`
            }
        })
        .then(response => response.data.items)
}

function getRanking(trackList, playlistName) {
    const ranking = trackList.findIndex(item => item.track.id == `${trackId}`)

    if (ranking === -1) {
        console.log(`${playlistName}:`)
        console.log('='.repeat(playlistName.length + 1))
        console.log(`Enggak Masuk Playlist Ini \n`)
    } else {
        console.log(`${playlistName}:`)
        console.log('='.repeat(playlistName.length + 1))
        console.log(`#${ranking + 1} dari ${trackList.length} lagu \n`)
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
})()