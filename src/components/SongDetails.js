import React from "react";
import Message from "./Message";
import SongArtist from "./SongArtist";
import SongLyrics from "./SongLyrics";

const SongDetails = ({ search, lyric, bio }) => {
  if (!lyric || !bio) return null;

  return (
    <>
      {lyric.error || lyric.err || lyric.name === "AbortError" ? (
        <Message
          msg={`Error: no se encuentra la canción '${search.song}'.\n Intente nombre completo`}
          bgColor="#dc3545"
        />
      ) : (
        <SongLyrics
          artist={search.artist}
          title={search.song}
          lyrics={lyric.lyrics}
        />
      )}
      {bio.artists ? (
        <SongArtist artist={bio.artists[0]} />
      ) : (
        <Message
          msg={`Error: no se encuentra el intérprete '<em>${search.artist}</em><small>'.\n Intente nombre completo</small>`}
          bgColor="#dc3545"
        />
      )}
    </>
  );
};

export default SongDetails;
