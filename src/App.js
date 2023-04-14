import React, { useEffect, useState } from 'react';
import Tmdb from './tmdb';
import './App.css';
import MovieRow from './components/movieRow';
import FeaturedMovie from './components/featuredMovie';
import Header from './components/header';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';


const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [backHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setTimeout(()=>{
        setMovieList(list);
      }, 1000)

      //pegar o filme em destaque featuerd
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    //Progress bar
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('progress', {
      value: 100,
      scrollTrigger: {
        scrub: 0.5
      }
    });

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 40) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);

    return () => { window.removeEventListener('sroll', scrollListener) };

  }, [])

  return (
    <>
      <progress max='100' value='0'></progress>

      <div className='page'>

        <Header black={backHeader} />

        {movieList.length <= 0 &&
          <div className="loading">
            <div className='loader-ring'>
              <div className='loader-ring-light'></div>
              <div className='loader-ring-track'></div>
            </div>
          </div>
        }

        {featuredData &&
          <FeaturedMovie item={featuredData} />
        }

        <section className='lists'>
          {movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} />
          ))}
        </section>

        <footer>
          <p>Feito com <span role='img' aria-label='coração'> ❤️ </span> pelo <a rel='noreferrer' target='_blank' href='https://lucasdevs.com'>Lucas Devs</a> <br /></p>
          <p>Direitos de Imagem pela <a rel='noreferrer' target='_blank' href='https://netflix.com'>Netflix</a> <br /></p>
          <p>Dados pegos no site <a rel='noreferrer' target='_blank' href='https://www.themoviedb.org/'>The Movie Database (TMDB)</a> <br /></p>
        </footer>




      </div>
    </>

  );
}

export default App;
