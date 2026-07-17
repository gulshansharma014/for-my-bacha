import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import childhoodFrame from "./assets/childhood-frame.jpg";
import indiaGate from "./assets/india-gate.jpg";
import childhoodPhoto from "./assets/childhood-photo.jpg";
import birthdayCake from "./assets/birthday-cake.jpg";
import together from "./assets/together.jpg";
import mirrorPhoto from "./assets/mirror-photo.jpg";

const reveal = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
    },
  },
};

const timeline = [
  {
    icon: "🏠",
    title: "A shy beginning",
    text: "We first met at your home.",
  },
  {
    icon: "🙈",
    title: "A very Nadan Boyfriend",
    text: "I saw you, but I was too shy to properly talk to you.",
  },
  {
    icon: "🤝",
    title: "Three years of friendship",
    text: "Slowly, conversations became comfort and friendship became home.",
  },
  {
    icon: "❤️",
    title: "Then friendship found love",
    text: "Six months ago, our beautiful friendship found a new name.",
  },
  {
    icon: "🏡",
    title: "You became home",
    text: "Somewhere along the way, you became my favourite person.",
  },
];

const memories = [
  {
    image: indiaGate,
    eyebrow: "US",
    title: "Everytime I see you I fall harder",
    text: "I thought we were just spending time together, but somewhere between your smile and those tiny moments, my heart quietly chose you.",
  },
  {
    image: birthdayCake,
    eyebrow: "My birthday",
    title: "Love, baked by you",
    text: "It was never only about the cake. It was your effort, time and the love hidden inside something you made just to make me smile.",
  },
  {
    image: childhoodFrame,
    eyebrow: "Two little strangers",
    title: "Maybe we were always meant to meet",
    text: "You joined our childhood pictures and gave me a frame that feels like proof that two separate stories were finding their way to each other.",
  },
  {
    image: together,
    eyebrow: "Our quiet moments",
    title: "Wherever our feet stop together",
    text: "No posing and no grand plan. Just the comfort of being beside you and feeling completely at home.",
  },
  {
    image: mirrorPhoto,
    eyebrow: "Us, now",
    title: "Every future version of me",
    text: "Still chooses you. Through every silly moment, difficult conversation and beautiful memory waiting for us.",
  },
];

const bubbleMemories = [
  "Your happiness over tiny things made every moments unforgettable.",
  "I loved how your smile made everything around us disappear.",
  "Those bubbles were small, but the memory became enormous.",
  "Somewhere between all those moments, friendship quietly started becoming love.",
  "I would relive every moment with you a thousand times.",
  "Your smile is still my favourite part of that memory.",
];

const hiddenLoveNotes = [
  "I still smile whenever I think about you.",
  "Your eyes make the rest of the world disappear.",
  "Thank you for turning ordinary moments into memories.",
  "You are still my favourite notification.",
  "I would choose you in every version of my life.",
  "Your cute gestures live rent-free in my heart.",
  "You make everything around you feel more alive.",
  "I still feel lucky that my best friend became my love.",
];

const promises = [
  "I will not joke about anything that could make you question us.",
  "I will be more mindful while talking about our relationship and intimacy.",
  "I will listen before immediately defending myself.",
  "I will show through my actions how deeply I value you.",
];

const angryButtonTexts = [
  "I’m still angry 😤",
  "Arre Bacha… idhar nahi 😳",
  "Your Nadan Boyfriend is scared 🏃",
  "Okay… you caught me 🥺",
];

function Section({ children, className = "", id }) {
  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
    >
      {children}
    </motion.section>
  );
}

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: `${(index * 17) % 100}%`,
        delay: `${(index % 7) * 0.8}s`,
        duration: `${7 + (index % 5)}s`,
        size: `${12 + (index % 4) * 5}px`,
      })),
    []
  );

  return (
    <div className="heart-field" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: heart.size,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

function ShootingStars() {
  return (
    <div className="shooting-stars" aria-hidden="true">
      {Array.from({ length: 7 }, (_, index) => (
        <span
          key={index}
          style={{
            left: `${8 + index * 14}%`,
            top: `${8 + (index % 3) * 20}%`,
            animationDelay: `${index * 1.2}s`,
          }}
        />
      ))}
    </div>
  );
}

function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [storyStarted, setStoryStarted] = useState(false);

  const [scrapbookPage, setScrapbookPage] = useState(0);
  const [activeBubble, setActiveBubble] = useState(null);
  const [activeNote, setActiveNote] = useState(null);

  const [candlesOut, setCandlesOut] = useState(false);
  const [listeningForBlow, setListeningForBlow] = useState(false);
  const [microphoneMessage, setMicrophoneMessage] = useState("");

  const [answer, setAnswer] = useState(null);
  const [escapeCount, setEscapeCount] = useState(0);
  const [angryButtonPosition, setAngryButtonPosition] = useState({
    x: 0,
    y: 0,
  });

  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [showMusicInvite, setShowMusicInvite] = useState(false);
  const audioRef = useRef(null);
  const microphoneCleanupRef = useRef(null);

  useEffect(() => {
  const loadingTimer = window.setTimeout(() => {
    setIsLoading(false);
  }, 2800);

  return () => window.clearTimeout(loadingTimer);
}, []);

  useEffect(() => {
    return () => {
      microphoneCleanupRef.current?.();
    };
  }, []);

  const openEnvelope = () => {
  setEnvelopeOpened(true);

  window.setTimeout(() => {
    setStoryStarted(true);
    setShowMusicInvite(true);

    window.setTimeout(() => {
      document
        .getElementById("story")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, 1000);
};

  const toggleMusic = async () => {
  const audio = audioRef.current;

  if (!audio) {
    return;
  }

  try {
    setMusicError(false);

    if (musicPlaying) {
      const fadeOut = window.setInterval(() => {
        if (audio.volume > 0.08) {
          audio.volume = Math.max(0, audio.volume - 0.08);
          return;
        }

        window.clearInterval(fadeOut);
        audio.pause();
        audio.volume = 0.35;
        setMusicPlaying(false);
      }, 70);

      return;
    }

    audio.volume = 0;
    await audio.play();

    setMusicPlaying(true);
    setShowMusicInvite(false);

    const fadeIn = window.setInterval(() => {
      if (audio.volume < 0.32) {
        audio.volume = Math.min(0.35, audio.volume + 0.035);
        return;
      }

      window.clearInterval(fadeIn);
    }, 90);
  } catch {
    setMusicError(true);
  }
};

  const changeScrapbookPage = (direction) => {
    setScrapbookPage((currentPage) => {
      const nextPage = currentPage + direction;

      if (nextPage < 0) {
        return memories.length - 1;
      }

      if (nextPage >= memories.length) {
        return 0;
      }

      return nextPage;
    });
  };

  const runAway = () => {
    if (escapeCount >= 3) {
      return;
    }

    const newCount = escapeCount + 1;

    setEscapeCount(newCount);

    const maximumX = window.innerWidth < 600 ? 90 : 170;
    const maximumY = window.innerWidth < 600 ? 45 : 75;

    setAngryButtonPosition({
      x: Math.random() * maximumX * 2 - maximumX,
      y: Math.random() * maximumY * 2 - maximumY,
    });
  };

  const handleAngryClick = () => {
    if (escapeCount < 3) {
      runAway();
      return;
    }

    setAnswer("angry");
  };

  const stopMicrophoneListener = () => {
    microphoneCleanupRef.current?.();
    microphoneCleanupRef.current = null;
    setListeningForBlow(false);
  };

  const startListeningForBlow = async () => {
    if (candlesOut) {
      setCandlesOut(false);
      setMicrophoneMessage("");
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setMicrophoneMessage(
        "Microphone detection is unavailable here. Tap the cake instead."
      );
      return;
    }

    try {
      setMicrophoneMessage("Listening… blow gently towards your microphone 🎤");
      setListeningForBlow(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      const audioContext = new AudioContextClass();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 512;
      microphone.connect(analyser);

      const frequencyData = new Uint8Array(analyser.frequencyBinCount);

      let loudFrames = 0;
      let animationFrameId;

      const cleanup = () => {
        cancelAnimationFrame(animationFrameId);
        microphone.disconnect();
        stream.getTracks().forEach((track) => track.stop());
        audioContext.close();
        setListeningForBlow(false);
      };

      microphoneCleanupRef.current = cleanup;

      const detectBlow = () => {
        analyser.getByteFrequencyData(frequencyData);

        const averageVolume =
          frequencyData.reduce((total, value) => total + value, 0) /
          frequencyData.length;

        if (averageVolume > 38) {
          loudFrames += 1;
        } else {
          loudFrames = Math.max(0, loudFrames - 1);
        }

        if (loudFrames >= 4) {
          setCandlesOut(true);
          setMicrophoneMessage("You blew them out! ✨");
          cleanup();
          microphoneCleanupRef.current = null;
          return;
        }

        animationFrameId = requestAnimationFrame(detectBlow);
      };

      detectBlow();

      window.setTimeout(() => {
        if (microphoneCleanupRef.current) {
          stopMicrophoneListener();
          setMicrophoneMessage(
            "I could not detect the blow. Tap the cake to blow them out 💗"
          );
        }
      }, 12000);
    } catch {
      setListeningForBlow(false);
      setMicrophoneMessage(
        "Microphone permission was unavailable. Tap the cake instead 💗"
      );
    }
  };

  const scrapbookMemory = memories[scrapbookPage];

  return (
    <main>
      <AnimatePresence mode="wait">
  {isLoading && (
    <motion.div
      className="romantic-loader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(8px)",
      }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      <motion.div
        className="loader-heart"
        animate={{
          scale: [1, 1.18, 1],
        }}
        transition={{
          duration: 1.15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ❤️
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        Preparing something special...
      </motion.p>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        Made with love by your
        <strong> Nadan Boyfriend</strong>
      </motion.span>

      <div className="loader-dots">
        {[0, 1, 2].map((dot) => (
          <motion.i
            key={dot}
            animate={{
              opacity: [0.25, 1, 0.25],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: dot * 0.18,
            }}
          />
        ))}
      </div>
    </motion.div>
  )}
</AnimatePresence>
      <style>{`
        .v2-envelope-stage {
          position: relative;
          width: min(360px, 88vw);
          height: 260px;
          margin: 35px auto 20px;
          perspective: 1100px;
        }

        .v2-envelope {
          position: absolute;
          inset: 45px 0 0;
          height: 200px;
          background: linear-gradient(145deg, #f7b6c8, #e983a2);
          border-radius: 10px;
          box-shadow: 0 25px 60px rgba(111, 37, 60, 0.22);
          overflow: hidden;
        }

        .v2-envelope::before,
        .v2-envelope::after {
          content: "";
          position: absolute;
          bottom: 0;
          width: 0;
          height: 0;
          border-style: solid;
        }

        .v2-envelope::before {
          left: 0;
          border-width: 100px 0 0 180px;
          border-color: transparent transparent transparent #f9c6d3;
        }

        .v2-envelope::after {
          right: 0;
          border-width: 100px 180px 0 0;
          border-color: transparent #ef9db5 transparent transparent;
        }

        .v2-envelope-flap {
          position: absolute;
          top: 45px;
          left: 0;
          width: 100%;
          height: 130px;
          transform-origin: top;
          z-index: 5;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          background: linear-gradient(160deg, #ffd2dd, #ee91ad);
        }

        .v2-letter-preview {
          position: absolute;
          left: 8%;
          width: 84%;
          min-height: 190px;
          padding: 26px 22px;
          border-radius: 9px;
          background: #fffaf1;
          color: #673447;
          box-shadow: 0 18px 45px rgba(90, 35, 52, 0.18);
          font-family: "Caveat", cursive;
          font-size: 1.4rem;
          z-index: 3;
        }

        .v2-envelope-heart {
          position: absolute;
          left: 50%;
          top: 138px;
          z-index: 8;
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          transform: translateX(-50%);
          border-radius: 50%;
          background: #fff2f6;
          color: #c94769;
          box-shadow: 0 8px 24px rgba(112, 39, 61, 0.18);
          font-size: 1.45rem;
        }

        .v2-music-control {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 40;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .v2-music-button {
          width: 52px;
          height: 52px;
          border: 0;
          border-radius: 50%;
          color: white;
          background: linear-gradient(135deg, #d84d72, #8e2d4a);
          box-shadow: 0 12px 35px rgba(122, 35, 62, 0.28);
        }

        .v2-music-message {
          max-width: 220px;
          padding: 10px 14px;
          border-radius: 15px;
          background: rgba(255,255,255,.94);
          color: #6a3144;
          box-shadow: 0 10px 35px rgba(72, 24, 40, .14);
          font-size: .76rem;
        }

        .v2-bubble-world {
          position: relative;
          min-height: 620px;
          overflow: hidden;
          border-radius: 36px;
          background:
            linear-gradient(rgba(35, 28, 69, .35), rgba(66, 28, 65, .48)),
            url(${indiaGate}) center / cover;
          box-shadow: 0 30px 90px rgba(44, 27, 65, .24);
        }

        .v2-bubble-overlay {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 35px;
          text-align: center;
          color: white;
          background: linear-gradient(
            180deg,
            rgba(21, 20, 51, .18),
            rgba(34, 18, 45, .58)
          );
        }

        .v2-bubble-overlay h2 {
          max-width: 760px;
        }

        .v2-bubble {
          position: absolute;
          z-index: 4;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, .55);
          border-radius: 50%;
          background:
            radial-gradient(
              circle at 30% 25%,
              rgba(255,255,255,.8),
              rgba(215,207,255,.16) 35%,
              rgba(255,164,207,.16) 70%
            );
          box-shadow:
            inset 8px 8px 20px rgba(255,255,255,.28),
            0 10px 30px rgba(21,15,44,.18);
          backdrop-filter: blur(2px);
          color: white;
        }

        .v2-bubble span {
          opacity: .8;
        }

        .v2-bubble-message {
          position: absolute;
          left: 50%;
          bottom: 35px;
          z-index: 8;
          width: min(530px, calc(100% - 40px));
          transform: translateX(-50%);
          padding: 22px;
          border-radius: 20px;
          background: rgba(255, 250, 253, .93);
          color: #653246;
          box-shadow: 0 20px 55px rgba(26, 18, 45, .28);
          font-family: "Caveat", cursive;
          font-size: 1.55rem;
        }

        .v2-scrapbook {
          position: relative;
          width: min(900px, 100%);
          min-height: 560px;
          margin: auto;
          padding: clamp(22px, 5vw, 52px);
          border-radius: 14px 30px 30px 14px;
          background:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 34px,
              rgba(128, 95, 85, .08) 35px
            ),
            #fff9ea;
          box-shadow:
            18px 18px 0 #eadcc4,
            30px 35px 80px rgba(84, 52, 45, .17);
          overflow: hidden;
        }

        .v2-scrapbook::before {
          content: "";
          position: absolute;
          left: 28px;
          top: 0;
          bottom: 0;
          width: 3px;
          background: rgba(132, 82, 74, .16);
        }

        .v2-scrapbook-page {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 6vw, 70px);
          align-items: center;
          min-height: 450px;
        }

        .v2-scrapbook-photo {
          position: relative;
          padding: 13px 13px 55px;
          background: white;
          box-shadow: 0 18px 45px rgba(85, 53, 49, .18);
          transform: rotate(-2deg);
        }

        .v2-scrapbook-photo img {
          width: 100%;
          height: 350px;
          object-fit: cover;
        }

        .v2-scrapbook-photo::after {
          content: "our little memory";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 15px;
          text-align: center;
          color: #8d5a61;
          font-family: "Caveat", cursive;
          font-size: 1.4rem;
        }

        .v2-page-controls {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 34px;
        }

        .v2-page-controls button {
          border: 0;
          border-radius: 999px;
          padding: 12px 18px;
          color: #73334a;
          background: white;
          box-shadow: 0 8px 22px rgba(91, 43, 59, .12);
        }

        .v2-page-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
        }

        .v2-page-dots button {
          width: 9px;
          height: 9px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: rgba(158, 68, 96, .25);
        }

        .v2-page-dots button.active {
          background: #c94769;
          transform: scale(1.35);
        }

        .v2-cake-wrap {
          position: relative;
        }

        .v2-cake-wrap img {
          cursor: pointer;
        }

        .v2-flame {
          position: absolute;
          width: 18px;
          height: 30px;
          border-radius: 50% 50% 45% 45%;
          background: linear-gradient(#fff7a6, #ff9d28 55%, #f04f24);
          filter: drop-shadow(0 0 13px rgba(255, 157, 40, .95));
          transform-origin: bottom;
          animation: v2Flicker .22s infinite alternate;
        }

        .v2-flame.one {
          top: 13%;
          left: 18%;
        }

        .v2-flame.two {
          top: 6%;
          left: 30%;
        }

        .v2-flame.three {
          top: 11%;
          left: 59%;
        }

        .v2-flame.four {
          top: 18%;
          left: 67%;
        }

        @keyframes v2Flicker {
          from {
            transform: rotate(-4deg) scaleY(.95);
          }

          to {
            transform: rotate(5deg) scaleY(1.08);
          }
        }

        .v2-microphone-status {
          margin-top: 15px;
          min-height: 26px;
          color: #8b452c;
          font-size: .85rem;
        }

        .v2-angry-zone {
          position: relative;
          min-height: 130px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        .v2-angry-button {
          position: relative;
          z-index: 2;
        }

        .v2-boyfriend-character {
          margin: 25px auto 0;
          width: 150px;
          text-align: center;
        }

        .v2-character-head {
          width: 72px;
          height: 72px;
          margin: auto;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #dba67c;
          font-size: 2.2rem;
          box-shadow: 0 8px 25px rgba(99, 53, 36, .15);
        }

        .v2-character-body {
          width: 90px;
          height: 75px;
          margin: -5px auto 0;
          border-radius: 38px 38px 15px 15px;
          background: #632c42;
        }

        .v2-character-text {
          margin-top: 10px;
          font-family: "Caveat", cursive;
          font-size: 1.3rem;
        }

        .v2-final-night {
          position: relative;
          min-height: 720px;
          display: grid;
          place-items: center;
          padding: 100px 24px;
          overflow: hidden;
          color: white;
          text-align: center;
          background:
            radial-gradient(circle at 50% 85%, rgba(173, 77, 128, .38), transparent 35%),
            linear-gradient(180deg, #110f2d, #302043 60%, #542a4c);
        }

        .v2-final-night::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: .65;
          background-image:
            radial-gradient(circle, white 1px, transparent 1px),
            radial-gradient(circle, rgba(255,255,255,.65) 1px, transparent 1px);
          background-position: 0 0, 35px 35px;
          background-size: 70px 70px;
        }

        .v2-final-content {
          position: relative;
          z-index: 4;
          width: min(850px, 100%);
        }

        .v2-final-content .eyebrow {
          color: #ffd6e3;
        }

        .v2-final-content h2 {
          font-size: clamp(2.8rem, 7vw, 6rem);
        }

        .shooting-stars {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        .shooting-stars span {
          position: absolute;
          width: 140px;
          height: 2px;
          opacity: 0;
          transform: rotate(-35deg);
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0),
            rgba(255,255,255,.95)
          );
          animation: v2Shoot 6s infinite;
        }

        @keyframes v2Shoot {
          0%, 72% {
            opacity: 0;
            transform: translate(0, 0) rotate(-35deg);
          }

          76% {
            opacity: 1;
          }

          88% {
            opacity: 0;
            transform: translate(320px, 180px) rotate(-35deg);
          }

          100% {
            opacity: 0;
          }
        }

        .v2-success-hearts {
          position: fixed;
          inset: 0;
          z-index: 70;
          pointer-events: none;
          overflow: hidden;
        }

        .v2-success-hearts span {
          position: absolute;
          bottom: -40px;
          animation: v2SuccessHeart 4s ease-out forwards;
        }

        @keyframes v2SuccessHeart {
          from {
            opacity: 0;
            transform: translateY(0) scale(.5) rotate(0);
          }

          15% {
            opacity: 1;
          }

          to {
            opacity: 0;
            transform: translateY(-110vh) scale(1.5) rotate(35deg);
          }
        }

        @media (max-width: 760px) {
          .v2-scrapbook-page {
            grid-template-columns: 1fr;
          }

          .v2-scrapbook-photo img {
            height: 320px;
          }

          .v2-bubble-world {
            min-height: 690px;
          }
        }
      `}</style>

      <FloatingHearts />

      <audio
        ref={audioRef}
        loop
        preload="none"
        onEnded={() => setMusicPlaying(false)}
        onError={() => setMusicError(true)}
      >
        <source src="/perfect.mp3" type="audio/mpeg" />
      </audio>

      {storyStarted && (
        <div className="v2-music-control">
          <AnimatePresence>
            {musicError && (
              <motion.div
                className="v2-music-message"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Add your legally obtained song as{" "}
                <strong>public/perfect.mp3</strong>.
              </motion.div>
            )}
          </AnimatePresence>
          {/* Music Invitation */}

<AnimatePresence>
  {showMusicInvite && storyStarted && !musicPlaying && (
    <motion.button
      type="button"
      className="music-invitation"
      onClick={toggleMusic}
      initial={{
        opacity: 0,
        y: -20,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -15,
        scale: 0.9,
      }}
    >
      <motion.span
        animate={{ rotate: [-8, 8, -8] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        🎵
      </motion.span>

      <span>
        <strong>Lets play some song?</strong>
        <small>Tap to make this moment even more special</small>
      </span>

      <span className="music-invitation-arrow">
        →
      </span>
    </motion.button>
  )}
</AnimatePresence>

{/* Existing Music Button */}

<button
    className="music-toggle"
    onClick={toggleMusic}
>
...
</button>

          <motion.button
            className="v2-music-button"
            onClick={toggleMusic}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label={musicPlaying ? "Pause music" : "Play music"}
          >
            {musicPlaying ? "❚❚" : "♫"}
          </motion.button>
        </div>
      )}

      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <motion.p
          className="tiny-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          A tiny corner of the internet
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          For My <span>Bacha</span> ❤️
        </motion.h1>

        <motion.p
          className="hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Made by your Nadan Boyfriend, with a guilty heart, a lot of love and
          one promise to become better.
        </motion.p>

        <div className="v2-envelope-stage">
          <motion.div
            className="v2-letter-preview"
            initial={{ top: 65, opacity: 0.8 }}
            animate={
              envelopeOpened
                ? {
                    top: -35,
                    opacity: 1,
                    rotate: -1,
                  }
                : {
                    top: 65,
                    opacity: 0.8,
                  }
            }
            transition={{
              duration: 0.9,
              delay: envelopeOpened ? 0.35 : 0,
            }}
          >
            Before anything…
            <br />
            I want to remind you how much you mean to me.
          </motion.div>

          <div className="v2-envelope" />

          <motion.div
            className="v2-envelope-flap"
            animate={{
              rotateX: envelopeOpened ? 180 : 0,
              zIndex: envelopeOpened ? 1 : 5,
            }}
            transition={{
              duration: 0.8,
            }}
          />

          <motion.div
            className="v2-envelope-heart"
            animate={
              envelopeOpened
                ? {
                    scale: 0,
                    opacity: 0,
                  }
                : {
                    scale: [1, 1.12, 1],
                    opacity: 1,
                  }
            }
            transition={{
              scale: {
                duration: 1.3,
                repeat: Infinity,
              },
            }}
          >
            ♥
          </motion.div>
        </div>

        {!envelopeOpened && (
          <motion.button
            className="primary-button"
            onClick={openEnvelope}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Open your Nadan Boyfriend’s heart 💌
          </motion.button>
        )}

        <AnimatePresence>
          {envelopeOpened && (
            <motion.p
              className="handwritten"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Iss baar koi silly joke nahi. Bas dil se kuch baatein hain.
            </motion.p>
          )}
        </AnimatePresence>
      </section>

      <div id="story" />

      {storyStarted && (
        <>
          <Section className="soft-section">
            <div className="content narrow centered">
              <p className="eyebrow">Hey, Bacha…</p>

              <h2>I know I hurt you.</h2>

              <p className="large-copy">
                I made a joke about something deeply important to both of us—
                <strong> our relationship.</strong>
              </p>

              <p>
                Maybe I said it casually, but I understand that it did not feel
                casual to you. It made you feel as if I take everything between
                us lightly, including the closeness, trust and intimacy we
                share.
              </p>

              <p>
                I am genuinely sorry that my careless words made you question
                something I value so deeply.
              </p>
            </div>
          </Section>

          <Section>
            <div className="content grid-two">
              <div>
                <p className="eyebrow">No excuses</p>
                <h2>“It was only a joke” is not enough.</h2>
              </div>

              <div className="paper-card">
                <p>
                  A joke stops being harmless when it hurts the person I love.
                  My intention does not erase your feelings.
                </p>

                <p>
                  You deserved reassurance, sensitivity and respect—not a
                  reason to question us.
                </p>
              </div>
            </div>
          </Section>

          <Section className="rose-section">
            <div className="content centered">
              <p className="eyebrow">Please remember this</p>

              <h2 className="big-statement">You are not a joke to me.</h2>

              <h2 className="big-statement accent">
                We are not a joke to me.
              </h2>

              <p className="large-copy max-copy">
                The love, trust, comfort, closeness and every intimate moment
                between us are precious to me. I never want my words to make
                you question the place you have in my heart.
              </p>
            </div>
          </Section>

          <Section>
            <div className="content">
              <div className="section-heading centered">
                <p className="eyebrow">Our little timeline</p>
                <h2>From a shy beginning to becoming home</h2>
              </div>

              <div className="timeline">
                {timeline.map((item, index) => (
                  <motion.div
                    className="timeline-item"
                    key={item.title}
                    initial={{
                      opacity: 0,
                      x: index % 2 ? 40 : -40,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true }}
                  >
                    <span>{item.icon}</span>

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>

          <Section className="photo-story">
            <div className="content childhood-layout">
              <motion.img
                src={childhoodPhoto}
                alt="A childhood photograph"
                className="childhood-single"
                whileHover={{
                  rotate: 2,
                  scale: 1.02,
                }}
              />

              <div>
                <p className="eyebrow">Two little strangers</p>
                <h2>Who knew they would find each other?</h2>

                <p>
                  Those two children had no idea the other existed. Different
                  lives, different stories—and somehow, years later, they met.
                </p>

                <p className="handwritten">
                  Maybe they were always walking towards each other.
                </p>
              </div>

              <motion.img
                src={childhoodFrame}
                alt="The framed combined childhood photographs"
                className="frame-photo"
                whileHover={{
                  rotate: -1,
                  scale: 1.02,
                }}
              />
            </div>
          </Section>

          <Section>
            <div className="content">
              <div className="section-heading centered">
                <p className="eyebrow">India Gate</p>
                <h2>Tap the bubbles and discover that evening</h2>
              </div>

              <div className="v2-bubble-world">
                <div className="v2-bubble-overlay">
                  <div>
                    <p className="eyebrow">A simple evening</p>
                    <h2>
                      Somewhere between those tiny bubbles, I started falling
                      for you.
                    </h2>
                    <p>Tap every floating bubble 🫧</p>
                  </div>
                </div>

                {bubbleMemories.map((memory, index) => {
                  const size = 64 + (index % 3) * 22;

                  return (
                    <motion.button
                      key={memory}
                      className="v2-bubble"
                      style={{
                        width: size,
                        height: size,
                        left: `${8 + ((index * 17) % 76)}%`,
                        top: `${12 + ((index * 23) % 55)}%`,
                      }}
                      animate={{
                        y: [0, -18, 5, 0],
                        x: [0, 8, -5, 0],
                        scale: [1, 1.05, 0.98, 1],
                      }}
                      transition={{
                        duration: 4 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      whileHover={{
                        scale: 1.15,
                      }}
                      whileTap={{
                        scale: 0.85,
                      }}
                      onClick={() => setActiveBubble(index)}
                    >
                      <span>♥</span>
                    </motion.button>
                  );
                })}

                <AnimatePresence mode="wait">
                  {activeBubble !== null && (
                    <motion.div
                      key={activeBubble}
                      className="v2-bubble-message"
                      initial={{
                        opacity: 0,
                        y: 20,
                        scale: 0.9,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 15,
                      }}
                    >
                      {bubbleMemories[activeBubble]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Section>

          <Section>
            <div className="content">
              <div className="section-heading centered">
                <p className="eyebrow">Our scrapbook</p>
                <h2>Turn the pages of our little story</h2>
              </div>

              <div className="v2-scrapbook">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={scrapbookPage}
                    className="v2-scrapbook-page"
                    initial={{
                      opacity: 0,
                      rotateY: 65,
                      x: 55,
                    }}
                    animate={{
                      opacity: 1,
                      rotateY: 0,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      rotateY: -65,
                      x: -55,
                    }}
                    transition={{
                      duration: 0.55,
                    }}
                  >
                    <div className="v2-scrapbook-photo">
                      <img
                        src={scrapbookMemory.image}
                        alt={scrapbookMemory.title}
                      />
                    </div>

                    <div>
                      <p className="eyebrow">{scrapbookMemory.eyebrow}</p>
                      <h2>{scrapbookMemory.title}</h2>
                      <p>{scrapbookMemory.text}</p>

                      <p className="handwritten">
                        Page {scrapbookPage + 1} of {memories.length}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="v2-page-controls">
                  <button onClick={() => changeScrapbookPage(-1)}>
                    ← Previous memory
                  </button>

                  <button onClick={() => changeScrapbookPage(1)}>
                    Next memory →
                  </button>
                </div>

                <div className="v2-page-dots">
                  {memories.map((memory, index) => (
                    <button
                      key={memory.title}
                      className={index === scrapbookPage ? "active" : ""}
                      onClick={() => setScrapbookPage(index)}
                      aria-label={`Open memory ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section className="cake-section">
            <div className="content cake-layout">
              <div className="v2-cake-wrap">
                <motion.img
                  src={birthdayCake}
                  alt="The birthday cake she made"
                  onClick={() => setCandlesOut((current) => !current)}
                  animate={
                    candlesOut
                      ? {
                          scale: [1, 1.03, 1],
                        }
                      : {}
                  }
                />

                {!candlesOut && (
                  <>
                    <span className="v2-flame one" />
                    <span className="v2-flame two" />
                    <span className="v2-flame three" />
                    <span className="v2-flame four" />
                  </>
                )}

                <AnimatePresence>
                  {candlesOut && (
                    <motion.div
                      className="confetti"
                      initial={{
                        opacity: 0,
                        scale: 0.4,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                    >
                      ✨ 🎉 💗 ✨
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <p className="eyebrow">One act of love</p>
                <h2>You made this just to make me smile.</h2>

                <p>
                  It was not simply a birthday cake. It was effort, thought,
                  time and love made with your own hands.
                </p>

                <p>
                  Today, I am the one trying to earn your smile back—with
                  honesty, not excuses.
                </p>

                <button
                  className="primary-button"
                  onClick={
                    listeningForBlow
                      ? stopMicrophoneListener
                      : startListeningForBlow
                  }
                >
                  {candlesOut
                    ? "Light the candles again ✨"
                    : listeningForBlow
                      ? "Stop listening"
                      : "Blow the candles using microphone 🎤"}
                </button>

                <p className="v2-microphone-status">
                  {microphoneMessage}
                </p>
              </div>
            </div>
          </Section>

          <Section>
            <div className="content home-layout">
              <motion.img
                src={together}
                alt="A peaceful moment together on the grass"
                whileHover={{
                  scale: 1.02,
                }}
              />

              <div className="home-copy">
                <p className="eyebrow">Home</p>
                <h2>Home is not always a place.</h2>

                <p className="large-copy">
                  Sometimes, it is simply wherever our feet stop together.
                </p>
              </div>
            </div>
          </Section>

          <Section className="love-section">
            <div className="content">
              <div className="section-heading centered">
                <p className="eyebrow">Things I adore about you</p>
                <h2>The magic that is simply you</h2>
              </div>

              <div className="love-grid">
                <motion.article whileHover={{ y: -10, rotate: -1 }}>
                  <span>✨</span>
                  <h3>Your liveliness</h3>
                  <p>
                    You make ordinary places and ordinary days feel beautiful.
                  </p>
                </motion.article>

                <motion.article whileHover={{ y: -10, rotate: 1 }}>
                  <span>👀</span>
                  <h3>Your eyes</h3>
                  <p>
                    They make your Nadan Boyfriend completely blind to everyone
                    else.
                  </p>
                </motion.article>

                <motion.article whileHover={{ y: -10, rotate: -1 }}>
                  <span>🥹</span>
                  <h3>Your cute gestures</h3>
                  <p>
                    The tiny expressions and little acts of love that stay with
                    me longer than you know.
                  </p>
                </motion.article>
              </div>
            </div>
          </Section>

          <Section>
            <div className="content letter-wrap">
              <p className="eyebrow centered">A letter from my heart</p>

              <motion.div
                className="letter"
                initial={{ rotate: -3 }}
                whileInView={{ rotate: -0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <h2>Dear Bacha,</h2>

                <p>
                  I am truly sorry—not only because you became upset, but
                  because I understand why my words hurt you.
                </p>

                <p>
                  You trusted me with your love, emotions, closeness and the
                  most vulnerable parts of yourself. That trust should always
                  feel safe with me.
                </p>

                <p>
                  I never want you to think that I take our relationship or our
                  intimacy lightly. Every moment between us matters to me
                  because it belongs to us.
                </p>

                <p>
                  I know saying “I did not mean it that way” cannot erase how it
                  made you feel. Instead of asking you to simply forget it, I
                  want to show you that I have understood it.
                </p>

                <p>
                  I will think before speaking. I will be more sensitive. I
                  will not use humour in a way that makes you question your
                  importance in my life.
                </p>

                <p>
                  I love you more seriously, deeply and genuinely than my silly
                  words sometimes manage to express.
                </p>

                <p className="letter-sign">
                  Always yours,
                  <br />
                  Your Nadan Boyfriend ❤️
                </p>
              </motion.div>
            </div>
          </Section>

          <Section className="promise-section">
            <div className="content grid-two">
              <div>
                <p className="eyebrow">My promise</p>
                <h2>I will hold your feelings more carefully.</h2>
              </div>

              <div className="promise-list">
                {promises.map((promise, index) => (
                  <motion.div
                    key={promise}
                    initial={{
                      opacity: 0,
                      x: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.13,
                    }}
                  >
                    <span>♥</span>
                    <p>{promise}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>

          <Section>
            <div className="content final-photo-layout">
              <motion.img
                src={mirrorPhoto}
                alt="A loving mirror photograph together"
                initial={{
                  rotate: -6,
                  y: 30,
                }}
                whileInView={{
                  rotate: 2,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                }}
              />

              <div>
                <p className="eyebrow">Every future version of me</p>
                <h2>Still chooses you.</h2>

                <p>
                  For the shy strangers, the best friends, these beautiful six
                  months and every memory still waiting for us.
                </p>
              </div>
            </div>
          </Section>

          <Section className="answer-section">
            <div className="content centered narrow">
              <p className="eyebrow">One small question</p>

              <h2>
                Will you allow your Nadan Boyfriend to make it up to you?
              </h2>

              <div className="v2-angry-zone">
                <motion.button
                  className="primary-button"
                  onClick={() => setAnswer("yes")}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.94,
                  }}
                >
                  Yes, but you owe me ❤️
                </motion.button>

                <motion.button
                  className="secondary-button v2-angry-button"
                  animate={angryButtonPosition}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 15,
                  }}
                  onMouseEnter={runAway}
                  onTouchStart={runAway}
                  onClick={handleAngryClick}
                >
                  {angryButtonTexts[Math.min(escapeCount, 3)]}
                </motion.button>
              </div>

              {escapeCount > 0 && escapeCount < 3 && !answer && (
                <motion.p
                  className="handwritten"
                  key={escapeCount}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                >
                  {escapeCount === 1 &&
                    "Your Nadan Boyfriend is trying to escape 😳"}

                  {escapeCount === 2 &&
                    "Okay okay… bas ek chhoti si smile chahiye 🥺"}
                </motion.p>
              )}

              <AnimatePresence mode="wait">
                {answer === "yes" && (
                  <motion.div
                    className="answer-card success"
                    key="yes"
                    initial={{
                      opacity: 0,
                      scale: 0.82,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                  >
                    <h3>Apology accepted… conditionally 💗</h3>

                    <p>
                      One proper hug, your favourite treat, a day
                      entirely for you, unlimited reassurance and a lifetime
                      supply of mindful love are now pending.
                    </p>

                    <div className="v2-boyfriend-character">
                      <motion.div
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      >
                        <div className="v2-character-head">🥹</div>
                        <div className="v2-character-body" />
                      </motion.div>

                      <p className="v2-character-text">
                        Mission: Make Bacha Smile 💗
                      </p>
                    </div>
                  </motion.div>
                )}

                {answer === "angry" && (
                  <motion.div
                    className="answer-card"
                    key="angry"
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                  >
                    <h3>Okay… I will stop running away 🥺</h3>

                    <p>
                      You have every right to be angry. I only wanted to steal
                      one tiny smile before listening properly.
                    </p>

                    <p>
                      You do not need to forgive me immediately because I made
                      this for you. I will be here whenever you are ready—to
                      listen properly, without jokes and without defending
                      myself.
                    </p>

                    <div className="v2-boyfriend-character">
                      <motion.div
                        initial={{
                          y: 100,
                        }}
                        animate={{
                          y: 0,
                        }}
                        transition={{
                          type: "spring",
                        }}
                      >
                        <div className="v2-character-head">🙇🏻‍♂️</div>
                        <div className="v2-character-body" />
                      </motion.div>

                      <p className="v2-character-text">
                        Can I sit here until you smile?
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Section>

          <section className="hidden-notes">
            <div className="content centered">
              <p className="eyebrow">Tiny love notes</p>
              <h2>Tap every heart 💌</h2>

              <div className="note-hearts">
                {hiddenLoveNotes.map((note, index) => (
                  <motion.button
                    key={note}
                    onClick={() => setActiveNote(index)}
                    whileHover={{
                      scale: 1.25,
                      rotate: 8,
                    }}
                    whileTap={{
                      scale: 0.85,
                    }}
                  >
                    ♥
                  </motion.button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {activeNote !== null && (
                <motion.div
                  className="note-modal"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  onClick={() => setActiveNote(null)}
                >
                  <motion.div
                    className="note-paper"
                    initial={{
                      scale: 0.7,
                      rotate: -5,
                    }}
                    animate={{
                      scale: 1,
                      rotate: 1,
                    }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button onClick={() => setActiveNote(null)}>×</button>
                    <p>{hiddenLoveNotes[activeNote]}</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section className="v2-final-night">
            <ShootingStars />

            <div className="v2-final-content">
              <motion.p
                className="eyebrow"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                For all the years behind us
              </motion.p>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                }}
              >
                I choose you.
              </motion.h2>

              <motion.p
                className="large-copy"
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.35,
                }}
              >
                Today, tomorrow and through every version of us.
              </motion.p>

              <motion.p
                className="handwritten"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.65,
                }}
              >
                I love you, my Bacha. ❤️
                <br />
                —Your Nadan Boyfriend
              </motion.p>
            </div>
          </section>

          {answer === "yes" && (
            <div className="v2-success-hearts">
              {Array.from({ length: 35 }, (_, index) => (
                <span
                  key={index}
                  style={{
                    left: `${(index * 13) % 100}%`,
                    fontSize: `${16 + (index % 5) * 7}px`,
                    animationDelay: `${(index % 10) * 0.18}s`,
                    color:
                      index % 3 === 0
                        ? "#ff82a5"
                        : index % 3 === 1
                          ? "#ffcade"
                          : "#ffffff",
                  }}
                >
                  ♥
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default App;