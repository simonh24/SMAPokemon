import { useEffect, useState } from 'react'
import { PokemonInfoCard } from '../components/PokemonInfoCard'
import { PokemonInfo } from '../utils/Interfaces'

function getRandomInt() {
  return Math.floor(Math.random() * 1020)
}

export const Home = () => {
  const randomInt = getRandomInt()
  const url = `https://pokeapi.co/api/v2/pokemon/${randomInt}`
  const [pokemon, setPokemon] = useState<PokemonInfo | null>(null)

  const getPokemon = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setPokemon({
      name: data.name,
      url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
    })
  }

  useEffect(() => {
    getPokemon()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingBottom: 24,
        paddingTop: 24,
        textAlign: 'center',
        background: 'white',
        marginTop: '20px',
        borderRadius: '5px',
        marginLeft: '20%',
        width: '60%',
      }}
    >
      <h1>Featured Pokemon</h1>
      {pokemon ? (
        <PokemonInfoCard pokemon={{ name: pokemon.name, url: pokemon.url }} />
      ) : null}
      <p>
        Discover new pokemon or find your favorites!
        <br />
        Utilizing our two features: Search and Pokedex!
      </p>
    </div>
  )
}
