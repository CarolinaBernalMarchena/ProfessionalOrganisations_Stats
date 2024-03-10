<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>


<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";

    const average = arr => {
        if(arr.length === 0) return 0;
        return arr.reduce( ( p, c ) => p + c, 0 ) / arr.length
    };

    let dataAg = null;
    let dataCw = null;
    let dataprofessionalOrg = null;
    let responseAg = null;
    let resultAg = "";
    let resultStatusAg = "";
    let resultcw = "";
    let resultStatuscw = "";
    let resultprofessionalOrg = "";
    let resultStatusprofessionalOrg = "";
    let years = new Set();

    onMount(async () => {
        
        await getProfessionalOrg();   
        await getAgro();
        await getPhoses();
        await loadChart();

    });

    //Carolina
    async function getProfessionalOrg(){
        let API_professionalOrg = "/api/v2/professionalorganisations-stats";
        if (dev) API_professionalOrg = "http://localhost:8080" + API_professionalOrg;
        const res = await fetch(API_professionalOrg, {
            method: "GET",
        });
        try{
            dataprofessionalOrg= await res.json();
            dataprofessionalOrg.forEach((a) => {
                years.add(a.date);
            });

        } catch (error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatusprofessionalOrg = status;
    }
    
    
    async function loadChart() {
        let tempMediaSeries=[];
        let tempMaxSeries=[];
        let tempMinSeries=[];
        let victimDocSeries=[];
        let victimSeries=[];
        let victimIdSeries=[];
        let ProfessionalOrgIdSeries=[];
        let ProfessionalOrgCpSeries=[];
        let ProfessionalOrgCount=[];

        //set to array
        years=[...years].sort();
        years.forEach((year) => {
            let dataProfessionalOrgYear = dataprofessionalOrg.filter((a) => a.date === year);
            ProfessionalOrgIdSeries.push(average(dataProfessionalOrgYear.map((a) => a.registry_number)));
            ProfessionalOrgCpSeries.push(average(dataProfessionalOrgYear.map((a) => a.postal_code/1000)));
            ProfessionalOrgCount.push(dataProfessionalOrgYear.length);

        });


        console.log(years);
        console.log(tempMediaSeries);
        console.log(victimSeries);

        Highcharts.chart("container", {
            chart: {
                type: "column",
            },
            title: {
                text: "Estadísticas conjuntas",
            },
            subtitle: {
                text: "Gráfica hecha con HighCharts",
            },
            xAxis: {
                categories: 
                    years ,
                    crosshair: true,
            },
            yAxis: {
                min: 0
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: "Id media de colegios profesionales por año",
                    data: ProfessionalOrgIdSeries,
                },
                {
                    name: "Media de los códigos postales (dos primeros dígitos) de los colegios profesionales por año",
                    data: ProfessionalOrgCpSeries,
                },
                {
                    name: "Numero de los colegios profesionales por año",
                    data: ProfessionalOrgCount,
                }
                
            ],
        });
    }

</script>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>
    <div id="Chart"></div>
    
</main>