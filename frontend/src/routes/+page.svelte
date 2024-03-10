<svelte:head>
    <title>Inicio</title>
</svelte:head>

    <style>
        body {
            text-align: center;
        }
        h1 {
            color: blue;
            font-weight: bolder;
        }
        h2 {
                color: green;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin-bottom: 10px;
        }
        p {
            font-style: italic;
            margin-top: 5px;
        }
    </style>

<body>
    <h2>Creado por</h2>
    <ul>
        <li><a href="https://github.com/CarolinaBernalMarchena">Carolina Bernal Marchena</a><br><p>Fuente de datos: professionalorganisations-stats</p></li>
    </ul>
    <p>Para visualizar datos en la API, primero hay que insertar datos en "Estadísticas Colegios Profesionales"</p>
    <h2>API</h2>
    <ul>
        <li><a href="/api/v2/professionalorganisations-stats">professionalorganisations-stats</a></li>
    </ul>
    <h2>Documentación en Postman</h2>
    <ul>
        <li><a href="/api/v1/professionalorganisations-stats/docs">professionalorganisations-stats (v1)</a><br></li>
        <li><a href="/api/v2/professionalorganisations-stats/docs">professionalorganisations-stats (v2)</a><br></li>
    </ul>
</body>