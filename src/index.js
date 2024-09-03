const express = require('express');
var series = require('../data/series.json');
const app = express();

const PORT = 3001;

app.use(express.json());

app.get('/series',(req, res) => {
    res.status(200).json(series);
});
app.get('/series/:id',(req, res) => {
    const id = req.params.id
    serie = series.find( serie => serie.id == id)
    if (serie) 
        res.status(200).json(serie);
    else
        res.status(404).json({
            mensaje: `La serie con el id ${id} no se ha encontrado`
    });
});

app.delete('/series/:id',(req, res) => {
    const id = req.params.id
    seriesActualizadas = series.filter(serie => serie.id != id)

    if (series.length > seriesActualizadas.length) 
        res.status(200).json(seriesActualizadas);
    else
        res.status(404).json({
            mensaje: `La serie con el id ${id} no se ha encontrado`
    });
});

app.post('/series',(req, res)=>{
    const {nombre, plataforma} = req.body
    const serie = {
        id: series.reduce((acc, current)=> acc <= current?.id ? current?.id : acc , 0) + 1,
        nombre,
        plataforma,
        disponible: false
    }
    series.push(serie)
    res.status(201).json(serie);
});

app.put('/series/:id',(req, res)=>{
    const id = req.params.id
    const idx = series.findIndex(serie => serie.id == id)
    const serieBody = req.body
    if(idx > 0){
        const serie = {id:series[idx].id, ...serieBody}
        series[idx] = serie
        res.status(200).json(serie);
    }
    else{
        res.status(201).json(serie);
    }

});

app.listen(PORT,()=>{
    console.log(`App lista escuchando en ${PORT}`)
})