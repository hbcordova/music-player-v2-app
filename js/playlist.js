const api = 'https://blockdaemon-audius-discovery-07.bdnodes.net/v1/playlists/aAJ9o?app_name=MUSICPLAYER';

const getTracksId = async () => {
    const response = await fetch(api);
    const { data } = await response.json();

    const playlist = data[0].playlist_contents;

    const tracks = playlist.map((track) => {
        return track.track_id;
    });

    return tracks;
}

const playlistTracksId = await getTracksId();

const getTrackById = async (id) => {
    const trackApi = `https://blockdaemon-audius-discovery-07.bdnodes.net/v1/tracks/${id}?app_name=MUSICPLAYER`;
    const response = await fetch(trackApi);
    const { data } = await response.json();

    const durationInMinutes = Math.floor(data.duration / 60);
    const durationInSeconds = Math.floor(data.duration % 60);

    return {
        name: data.title,
        artist: data.user.name,
        cover: data.artwork['480x480'],
        source: `https://blockdaemon-audius-discovery-07.bdnodes.net/v1/tracks/${id}/stream?app_name=MUSICPLAYER`,
        duration: `${durationInMinutes < 10 ? `0${durationInMinutes}`: durationInMinutes}:${durationInSeconds < 10 ? `0${durationInSeconds}`: durationInSeconds}`
    }
}

const getAllTracks = async () => {
    const tracks = await Promise.all(playlistTracksId.map(getTrackById));
    return tracks;
};

export const playlist = await getAllTracks();