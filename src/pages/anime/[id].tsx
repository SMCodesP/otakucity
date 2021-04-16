import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useContext, useEffect, useState } from 'react'
import { FaHome, FaBookmark, FaRegBookmark } from 'react-icons/fa'

import { ThemeContext } from 'styled-components'

import { useSession } from 'next-auth/client'

import InfiniteScroll from 'react-infinite-scroll-component'

import { useDebouncedCallback } from 'use-debounce'

import Footer from '../../components/Footer'

import Category from '../../entities/Category'
import Episode from '../../entities/Episode'

import api from '../../services/api'

import {
  Container,
  Back,
  AnimeImage,
  AnimeDescription,
  ContainerInfoAnime,
  AnimeTitle,
  AnimeInfo,
  ButtonWatch,
  ContainerListEpisodes,
  ContainerItemEpisode,
  EpisodeTitle,
  EpisodeImage,
  ContainerAnimeImage,
  SearchInput,
} from '../../shared/styles/anime'

import Loading from '../../components/Player/Loading'
import UserMenu from '../../components/UserMenu'
import { useProfile } from '../../contexts/ProfileContext'
import AnimeResumeList from '../../components/AnimeResumeList'
import { LoadingComponent } from '../../shared/styles/search'

const Anime: NextPage<{
  anime: Category
  episodes: Episode[]
  animesRecommended: Category[]
}> = ({ anime, episodes, animesRecommended }) => {
  const theme = useContext(ThemeContext)
  const router = useRouter()
  const [session] = useSession()
  const { toggleFavorite, isFavorite } = useProfile()

  const [hoverFavorite, setHoverFavorite] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [episodesDisplay, setEpisodesDisplay] = useState(episodes)

  useEffect(() => {
    setPage(1)
    setEpisodesDisplay(
      episodes.filter((episode) =>
        episode.title.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [query])

  const handleBack = () => {
    router.back()
  }

  if (router.isFallback) {
    return <Loading color={theme.tertiary} />
  }

  const handleQuery = useDebouncedCallback(
    (str: string) => {
      setQuery(str)
    },
    750,
    {
      maxWait: 750,
    }
  )

  const MarkFavorite = () =>
    isFavorite(anime.id) || hoverFavorite ? (
      <FaBookmark
        size={24}
        color={theme.text}
        style={{
          cursor: 'pointer',
        }}
        onClick={() => toggleFavorite(anime.id)}
        onMouseLeave={() => setHoverFavorite(false)}
      />
    ) : (
      <FaRegBookmark
        size={24}
        color={theme.text}
        style={{
          cursor: 'pointer',
        }}
        onClick={() => toggleFavorite(anime.id)}
        onMouseLeave={() => setHoverFavorite(false)}
        onMouseEnter={() => setHoverFavorite(true)}
      />
    )

  return (
    <>
      <Head>
        <title>{anime.category_name} - AnimeTempest</title>
        <meta
          property="og:title"
          content={`${anime.category_name} - AnimeTempest`}
          key="title"
        />
        <meta
          name="twitter:title"
          content={`${anime.category_name} - AnimeTempest`}
        />
        <meta
          name="description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.category_description?.substring(0, 110)}...`}
        />
        <meta
          property="og:description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.category_description?.substring(0, 110)}...`}
        />
        <meta
          name="description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.category_description?.substring(0, 110)}...`}
        />
        <meta
          name="Description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.category_description?.substring(0, 110)}...`}
        />
        <meta
          name="twitter:description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.category_description?.substring(0, 110)}...`}
        />
      </Head>
      <Container
        style={{
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/" prefetch={true}>
            <a>
              <Back onClick={handleBack}>
                <FaHome size={46} color={theme.tertiary} />
                Página Inicial
              </Back>
            </a>
          </Link>
          <UserMenu />
        </div>
        <ContainerInfoAnime>
          <ContainerAnimeImage>
            <AnimeImage
              src={`https://cdn.appanimeplus.tk/img/${anime.category_image}`}
              width={268}
              height={348}
            />
          </ContainerAnimeImage>
          <AnimeInfo>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <AnimeTitle>{anime.category_name}</AnimeTitle>
              {session ? <MarkFavorite /> : <span />}
            </div>
            <AnimeDescription
              dangerouslySetInnerHTML={{
                __html:
                  anime.category_description || 'Nenhuma descrição disponível.',
              }}
            />
            <Link prefetch={false} href={`/watch/${episodes[0].video_id}`}>
              <a style={{ width: 'fit-content' }}>
                <ButtonWatch>Assistir online</ButtonWatch>
              </a>
            </Link>
          </AnimeInfo>
        </ContainerInfoAnime>
        <SearchInput
          value={search}
          placeholder="Pesquise por um episódio"
          onChange={(e) => {
            setSearch(e.target.value)
            handleQuery(e.target.value)
          }}
        />
        <InfiniteScroll
          loader={
            <LoadingComponent color={theme.tertiary}>
              <div>
                <div />
                <div />
                <div />
              </div>
            </LoadingComponent>
          }
          dataLength={episodesDisplay.slice(0, 15 * page).length}
          next={() => setPage((state) => state + 1)}
          hasMore={15 * page < episodesDisplay.length}
        >
          <ContainerListEpisodes>
            {episodesDisplay.slice(0, 15 * page).map((episode) => (
              <Link
                prefetch={false}
                href={`/watch/${episode.video_id}`}
                key={`episode-${episode.video_id}`}
              >
                <a>
                  <ContainerItemEpisode>
                    <EpisodeTitle>
                      {episode.title.replace(anime.category_name, '')}
                    </EpisodeTitle>
                    <EpisodeImage
                      src={`https://cdn.appanimeplus.tk/img/${anime.category_image}`}
                      width={170}
                      height={290}
                    />
                  </ContainerItemEpisode>
                </a>
              </Link>
            ))}
          </ContainerListEpisodes>
        </InfiniteScroll>
        <h2
          style={{
            fontSize: 32,
            marginTop: 15,
            fontWeight: 'bold',
          }}
        >
          Recomendados
        </h2>
        <AnimeResumeList animes={animesRecommended} />
      </Container>
      <Footer />
    </>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const anime = await api.getAnime(String(params?.id))
    if (!anime || anime.category_name.toLowerCase().includes('animetv')) {
      console.log(anime)
      throw new Error('Anime not found')
    }
    const episodes = await api.getEpisodesFromAnime(anime.id)
    if (!episodes) {
      console.log(episodes)
      throw new Error('Episodes not found')
    }
    let animesRecommended: Category[] | null = null

    if (anime.category_genres) {
      animesRecommended = await api.getCategory(
        anime.category_genres.split(',')[0].trim()
      )
    }

    return {
      props: {
        anime,
        episodes: episodes.reverse(),
        animesRecommended:
          animesRecommended
            ?.sort((a, b) => Number(b.id) - Number(a.id))
            .slice(0, 20) || [],
      },
      revalidate: 300,
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
      revalidate: 300,
    }
  }
}

export default Anime
