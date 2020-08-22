const axios = require('axios');
const got = require('got');
const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;

const clientId = 'CLIENT_ID'
const clientSecret = 'CLIENT_SECRET'
const clientCredential = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

const tokenUrl = 'https://accounts.spotify.com/api/token'
const chartUrl = 'https://spotifycharts.com/regional/id/daily/latest'

const trackId = '0OgwkVbQ4jVfsZJO4Xs9hC'
// const trendList = []

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

function spotifyChart(songArr, artistArr) {
    return artistArr.map((arr, i) => {
        return {
            title: songArr[i].textContent,
            artist: arr.textContent.replace('by ', '')
        }
    })
}

function spotifyRank(chartArr, arrName) {
    const ranking = chartArr.findIndex(song => {
        return song.title === 'Aku Yang Salah' && song.artist === 'Mahalini'
    })

    console.log(`${arrName}:`)
    console.log('='.repeat(arrName.length + 1))

    if (ranking === -1) {
        console.log(`??? dari ${chartArr.length} lagu \n`)
    } else {
        console.log(`#${ranking + 1} dari ${chartArr.length} lagu \n`)
    }
}

(async () => {
    const accessToken = await getToken()
    const chart = await got(chartUrl);

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

    const dom = new JSDOM(chart.body);
    const songList = [...dom.window.document.querySelectorAll('.chart-table-track>strong')]
    const artistList = [...dom.window.document.querySelectorAll('.chart-table-track>span')]
    const trendList = spotifyChart(songList, artistList)

    spotifyRank(trendList, 'Spotify Charts')
})()
