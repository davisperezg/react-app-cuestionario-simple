import { useState, useEffect } from 'react'
import { Pregunta } from '../interface/Pregunta'
import { InputEvent } from '../types'
import '../styles/index.css'
import Respuestas from '../components/Respuestas'

const API = [
  {
    pregunta: 'Quien mató a krillin ?',
    opciones: [
      {
        text_pregunta: 'Freezer',
        respuesta: true,
      },
      {
        text_pregunta: 'Cel',
        respuesta: false,
      },
      {
        text_pregunta: 'Hermano de freezer',
        respuesta: false,
      },
      {
        text_pregunta: 'Majin boo',
        respuesta: false,
      },
    ],
  },
  {
    pregunta: 'Mejor amigo de Goku ?',
    opciones: [
      {
        text_pregunta: 'Krillin',
        respuesta: true,
      },
      {
        text_pregunta: 'Maestro rochi',
        respuesta: false,
      },
      {
        text_pregunta: 'Gohan',
        respuesta: false,
      },
      {
        text_pregunta: 'Bulma',
        respuesta: false,
      },
    ],
  },
  {
    pregunta: 'El primero en convertirse sayayin fue ?',
    opciones: [
      {
        text_pregunta: 'Vegeta',
        respuesta: false,
      },
      {
        text_pregunta: 'Goku',
        respuesta: true,
      },
      {
        text_pregunta: 'Brooly',
        respuesta: false,
      },
      {
        text_pregunta: 'Bardock',
        respuesta: false,
      },
    ],
  },
  {
    pregunta: 'Por qué bardock envia a goku a la tierra ?',
    opciones: [
      {
        text_pregunta: 'Porque goku era debil',
        respuesta: false,
      },
      {
        text_pregunta: 'Se entero que freezer iba a destruirlos',
        respuesta: true,
      },
      {
        text_pregunta: 'Odiaba a su hijo',
        respuesta: false,
      },
      {
        text_pregunta: 'Escucho a sus tropas que iban a matarlo',
        respuesta: false,
      },
    ],
  },
  {
    pregunta: 'Por qué brooly odio a goku ?',
    opciones: [
      {
        text_pregunta: 'No lo dejaba dormir',
        respuesta: true,
      },
      {
        text_pregunta: 'Decian que goku era mas fuerte',
        respuesta: false,
      },
      {
        text_pregunta: 'Su sangre de sayayin hacia que lo enfrente',
        respuesta: false,
      },
      {
        text_pregunta: 'O simplemente es por naturaleza',
        respuesta: false,
      },
    ],
  },
  {
    pregunta: 'Por qué le decian kakaroto ?',
    opciones: [
      {
        text_pregunta: 'Porque es su nombre real',
        respuesta: true,
      },
      {
        text_pregunta: 'Su abuelo le puso ese nombre',
        respuesta: false,
      },
      {
        text_pregunta: 'Por su debilidad al nacer',
        respuesta: false,
      },
      {
        text_pregunta: 'Porque no era digno de pertenecer a la raza gerrera',
        respuesta: false,
      },
    ],
  },
]

const initialState: Pregunta[] = [
  {
    pregunta: 'Cargando pregunta...',
    opciones: [
      {
        text_pregunta: 'Cargando respuestas',
        respuesta: false,
      },
    ],
  },
]

const Home = () => {
  const [pregunta, setPregunta] = useState<Pregunta[]>(initialState)
  const [pagina, setPagina] = useState<number>(0)
  const [contador, setContador] = useState<number>(0)
  const [puntaje, setPuntaje] = useState<number>(0)
  const [terminado, setTerminado] = useState<boolean>(false)

  const clickSiguiente = () => {
    const sigue = pagina + 1
    setPagina(sigue)
    setPuntaje(puntaje + contador)
    setContador(0)
  }

  const verResultados = () => {
    clickSiguiente()
    setTerminado(true)
  }

  const reiniciar = () => {
    setTerminado(false)
    setPagina(0)
    setPuntaje(0)
    setContador(0)
  }

  const onChange = (e: InputEvent, respuesta: boolean) => {
    let contadorLocal = 0
    if (respuesta === true) {
      contadorLocal = contadorLocal + 1
    } else {
      contadorLocal = 0
    }
    setContador(contadorLocal)
  }

  useEffect(() => {
    const ramdom = API.map((api) => ({
      ...api,
      opciones: api.opciones
        .map((ope) => ({
          ...ope,
        }))
        .sort(() => Math.random() - 0.5),
    })).sort(() => Math.random() - 0.5)
    setPregunta(ramdom)
  }, [])

  return (
    <div className="cuestionario">
      <h1>React con Typescript</h1>
      {!terminado ? (
        <div>
          <h2>
            Cuestionario {pagina + 1}/{pregunta.length}
          </h2>
          <h3>{pregunta[pagina].pregunta}</h3>
          <div className="opciones">
            {pregunta[pagina].opciones.map((opcion) => (
              <Respuestas
                key={opcion.text_pregunta}
                opcion={opcion}
                onChange={onChange}
              />
            ))}
          </div>
          <div className="siguiente">
            {pagina === pregunta.length - 1 ? (
              <button type="button" onClick={verResultados}>
                Terminar
              </button>
            ) : (
              <button type="button" onClick={clickSiguiente}>
                Siguiente
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2>Tu puntaje es: {puntaje}</h2>
          <div className="siguiente mt-30">
            <button type="button" onClick={reiniciar}>
              Reiniciar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
