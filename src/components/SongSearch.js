import React, { useState, useEffect } from "react";
import SongForm from "./SongForm";
import SongDetails from "./SongDetails";
import Loader from "./Loader";
import { helpHttp } from "../helpers/helpHttp";

const SongSearch = () => {
  const [search, setSearch] = useState(null);
  const [lyric, setLyric] = useState(null);
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search === null) return;
    const fetchData = async () => {
      const { artist, song } = search;

      let artistUrl = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`;
      let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;

      //  console.log(artistUrl, songUrl);

      setLoading(true);

      const [artistRes, songRes] = await Promise.all([
        helpHttp().get(artistUrl),
        helpHttp().get(songUrl),
      ]);

      //console.log(artistRes, songRes);

      setBio(artistRes);
      setLyric(songRes);
      setLoading(false);
    };

    fetchData();
  }, [search]);

  const handleSearch = (data) => {
    //console.log(data);
    setSearch(data);
  };

  const [videos, setVideos] = useState(null);

  useEffect(() => {
    if (bio === null) return;

    const videoYT = async () => {
      const idArtist = bio.artists[0].idArtist;

      let videoUrl = `https://theaudiodb.com/api/v1/json/2/mvid.php?i=${idArtist}`;

      const videosRes = await Promise.all([helpHttp().get(videoUrl)]);

      //console.log(videosRes);

      setVideos(videosRes);
    };

    videoYT();
  }, [bio]);

  return (
    <div>
      <article className="grid-1-3">
        <SongForm handleSearch={handleSearch} />
        {loading && <Loader />}
        {search && !loading && (
          <SongDetails
            search={search}
            lyric={lyric}
            bio={bio}
            videos={videos}
          />
        )}
        {/* {!search && (
          <img className="music1" src="./assets/cassette.jpg" alt="discos" />
        )}
        {!bio && (
          <img className="music2" src="./assets/vinilos.jpg" alt="discos" />
        )} */}
      </article>
    </div>
  );
};

export default SongSearch;

// the Audio Db token: BFFAE
// URL para: Return all the Music videos for a known TADB_Artist_ID
// theaudiodb.com/api/v1/json/BFFAE/mvid.php?i=112024
