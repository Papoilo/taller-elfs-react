import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, PlusCircle, Star } from "lucide-react";

const initialSongs = [
  {
    title: "Jingle Bells",
    video: "https://www.youtube.com/embed/3PgNPc-iFw8",
  },
  {
    title: "Feliz Navidad",
    video: "https://www.youtube.com/embed/RTtc2pM1boE",
  },
  {
    title: "Santa Claus Is Coming to Town",
    video: "https://www.youtube.com/embed/ASQHHTppvPI",
  },
  {
    title: "All I Want For Christmas Is You",
    video: "https://www.youtube.com/embed/yXQViqx6GMY",
  },
];

export default function KaraokeNavidad() {
  const [songs, setSongs] = useState(initialSongs);
  const [current, setCurrent] = useState(null);
  const [search, setSearch] = useState("");

  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongVideo, setNewSongVideo] = useState("");

  const [currentScore, setCurrentScore] = useState(5);
  const [scores, setScores] = useState([]); // { songTitle, score, date }

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSong = (e) => {
    e.preventDefault();
    if (!newSongTitle.trim() || !newSongVideo.trim()) return;

    const newSong = {
      title: newSongTitle.trim(),
      video: newSongVideo.trim(),
    };
    setSongs((prev) => [...prev, newSong]);
    setNewSongTitle("");
    setNewSongVideo("");
  };

  const handleSaveScore = () => {
    if (!current) return;
    const entry = {
      songTitle: current.title,
      score: currentScore,
      date: new Date().toLocaleString(),
    };
    setScores((prev) => [entry, ...prev.slice(0, 9)]); // guarda només últims 10
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
        }
        @keyframes snowFall {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        .snowflake {
          position: fixed;
          top: -10px;
          font-size: 1.2rem;
          animation: snowFall linear infinite;
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      {/* Flocs de neu senzills */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${8 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        >
          ❄
        </div>
      ))}

      <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-800 to-green-900 flex flex-col items-center p-6 md:p-10 gap-8 text-white relative z-10">
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-xl">
            🎄 Karaoke de Nadal 🎤
          </h1>
          <p className="text-lg max-w-xl mx-auto">
            Tria una cançó, posa el volum ben alt i canta com si fossis a un
            concert de Nadal! ✨
          </p>
        </header>

        {/* Cercador i resum */}
        <section className="w-full max-w-5xl flex flex-col md:flex-row gap-4 items-stretch">
          <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg flex flex-col gap-3">
            <label className="text-sm font-semibold uppercase tracking-wide">
              Cercar cançó
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Escriu el nom d'una cançó de Nadal..."
              className="w-full rounded-xl px-3 py-2 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <span className="text-xs text-white/80">
              Mostrant {filteredSongs.length} de {songs.length} cançons.
            </span>
          </div>

          {/* Formulari afegir cançó */}
          <form
            onSubmit={handleAddSong}
            className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              <h2 className="font-semibold">Afegir nova cançó</h2>
            </div>
            <input
              type="text"
              value={newSongTitle}
              onChange={(e) => setNewSongTitle(e.target.value)}
              placeholder="Títol de la cançó"
              className="w-full rounded-xl px-3 py-2 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <input
              type="text"
              value={newSongVideo}
              onChange={(e) => setNewSongVideo(e.target.value)}
              placeholder="URL de vídeo (YouTube embed)"
              className="w-full rounded-xl px-3 py-2 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-yellow-300 text-xs"
            />
            <Button
              type="submit"
              className="mt-1 bg-green-500 hover:bg-green-600 text-white rounded-xl"
            >
              Afegir cançó
            </Button>
          </form>
        </section>

        {/* Llista de cançons */}
        <section className="w-full max-w-5xl">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <Music className="w-6 h-6" />
            Llista de cançons de Nadal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredSongs.map((song, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:scale-105 transition transform bg-white/95 rounded-2xl shadow-xl border-0"
                onClick={() => setCurrent(song)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <Music className="w-10 h-10 text-red-600" />
                  <h3 className="text-lg font-semibold text-red-800">
                    {song.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    Fes clic per cantar aquesta cançó.
                  </p>
                </CardContent>
              </Card>
            ))}
            {filteredSongs.length === 0 && (
              <p className="col-span-full text-center text-sm text-white/80">
                No s'han trobat cançons amb aquest nom. Prova amb un altre
                terme!
              </p>
            )}
          </div>
        </section>

        {/* Zona de karaoke i puntuació */}
        {current && (
          <section className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
            {/* Vídeo */}
            <div className="lg:col-span-2 bg-black/30 rounded-2xl p-4 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold mb-3 text-center">
                {current.title}
              </h2>
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/30">
                <iframe
                  className="w-full h-full"
                  src={current.video}
                  title="Karaoke Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Puntuació */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <h3 className="font-semibold">Puntuació del teu karaoke</h3>
              </div>
              <p className="text-sm text-white/80">
                Mou la barra segons com creus que ho has fet i desa la
                puntuació. No siguis massa dur amb tu mateix! 😄
              </p>

              <div className="flex flex-col gap-2">
                <label className="text-sm">
                  Puntuació: <span className="font-bold">{currentScore}</span> / 10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={currentScore}
                  onChange={(e) => setCurrentScore(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <Button
                onClick={handleSaveScore}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl"
              >
                Desa la puntuació
              </Button>

              <div className="mt-2">
                <h4 className="font-semibold mb-1 text-sm flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-300" />
                  Històric de puntuacions
                </h4>
                {scores.length === 0 && (
                  <p className="text-xs text-white/70">
                    Encara no hi ha puntuacions. Canta una cançó i desa la
                    primera!
                  </p>
                )}
                {scores.length > 0 && (
                  <ul className="text-xs max-h-40 overflow-y-auto space-y-1">
                    {scores.map((s, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between bg-black/30 rounded-lg px-2 py-1"
                      >
                        <span className="font-semibold truncate mr-2">
                          {s.songTitle}
                        </span>
                        <span>
                          {s.score}/10
                          <span className="text-[0.6rem] block text-white/60">
                            {s.date}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        )}

        <footer className="mt-8 text-xs text-white/70 text-center">
          Fet amb ❤️ i molt d'esperit nadalenc. Canta, riu i comparteix-ho amb
          la família i els amics! 🎅
        </footer>
      </div>
    </>
  );
}