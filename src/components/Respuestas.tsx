import { Opciones } from '../interface/Opciones'
import { InputEvent } from '../types'

interface Acciones {
  opcion: Opciones
  onChange: (e: InputEvent, respuesta: boolean) => void
}

const Respuestas = ({ opcion, onChange }: Acciones) => {
  return (
    <div className="opcion">
      <label>{opcion.text_pregunta}</label>
      <input
        type="radio"
        name="respuesta"
        onChange={(e) => onChange(e, opcion.respuesta)}
      />
    </div>
  )
}

export default Respuestas
