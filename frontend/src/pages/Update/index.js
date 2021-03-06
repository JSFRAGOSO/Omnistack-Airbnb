import React ,{useState,useEffect} from 'react';
import api from '../../services/api';
import './styles.css'

export default function Update({history,match}){
    const [loadedThumb,setloadedThumb] = useState('');
    const [company,setCompany] = useState('');
    const [price,setPrice] = useState('');
    const [techs,setTechs] = useState('');
    
    const {spotId} = match.params;
    
    useEffect(() => {
        async function loadSpots(){
            
            const response = await api.get(`/spots/${spotId}`);
            setloadedThumb(response.data.thumbnail_url);
            setCompany(response.data.company);
            setPrice(response.data.price);
            setTechs(response.data.techs);
        }
    
        loadSpots();
        
      }, [match.params,spotId]);

    async function handleSubmit(event){
        event.preventDefault();
        
        await api.patch(`/spots/${spotId}`,
        {
            company,
            price,
            techs
        });

        history.push('/dashboard');
    }
    function handleBookings(event){
        event.preventDefault();

        history.push(`/booking/${spotId}`);
    }

    function handleVoltar(event){
        event.preventDefault();

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit} className="new-spot">
            <label
             id="thumbnail"
             style = {{backgroundImage: `url(${loadedThumb})`}}
            >
            </label>
            
            <button type = "button" className="btn" id="bookings" onClick={handleBookings}>Reservas</button>

            <label htmlFor="company">Empresa * </label>
            <input 
                id="company"
                placeholder="Sua empresa"
                value = {company}
                onChange = { event => setCompany(event.target.value)}
            />
            <label htmlFor="company">Tecnologias * <span>(separadas por vírgula)</span></label>
            <input 
                id="techs"
                placeholder="Quais tecnologias utilizam?"
                value = {techs}
                onChange = { event => setTechs(event.target.value)}
            />
            <label htmlFor="company">Valor da Diária <span>(em branco para GRATUITO)</span></label>
            <input 
                id="price"
                placeholder="Informe o valor do alugel"
                value = {price}
                onChange = { event => setPrice(event.target.value)}
            />

            <button type = "submit" className="btn">Atualizar</button>
            <button type = "button" id="exit" onClick ={handleVoltar}>Voltar</button>
        </form>
    );
}