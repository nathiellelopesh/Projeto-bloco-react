import './filter.css'

export default function Filter({ano, setAno, nome, setNome, genero, setGenero, categoria, setCategoria, filtrar}) {
    return (
        <form className='filter' onSubmit={filtrar}>
            <p>Filtrar por:</p>
            <input placeholder='Ano'value={ano} onChange={(ev) => setAno(ev.target.value)}/>
            <input placeholder='Nome da saga' value={nome} onChange={(ev) => setNome(ev.target.value)}/>

            <select value={genero} onChange={(ev) => setGenero(ev.target.value)}>
                <option value="">Genero</option>
                <option value="Drama">Drama</option>
                <option value="Ficção Científica">Ficção Científica</option>
                <option value="Fantasia">Fantasia</option>
            </select>

            <select value={categoria} onChange={(ev) => setCategoria(ev.target.value)}>
                <option value="">Categoria</option>
                <option value="filmes">Filme</option>
                <option value="series">Série</option>
            </select>
            <button type='submit' className='filter-btn'>Filtrar</button>
        </form>
    )
}

