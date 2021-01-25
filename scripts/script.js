let workersData = [
    {"id": 'samuel', "name": 'Samuel Oliveira', "role": 'DEV', "contribution": '288'},
    {"id": 'sandra', "name": 'Sandra Oliveira', "role": 'Analista', "contribution": '276'},
    {"id": 'karine', "name": 'Karine Fernanda', "role": 'DEV', "contribution": '264'},
    {"id": 'maverson', "name": 'Maverson Oliveira', "role": 'Analista', "contribution": '252'},
    {"id": 'mayara', "name": 'Mayara Oliveira', "role": 'Marketing', "contribution": '240'},
    {"id": 'beatriz', "name": 'Beatriz Oliveira', "role": 'DEV', "contribution": '228'},
    {"id": 'arthur', "name": 'Arthur Oliveira', "role": 'Marketing', "contribution": '216'},
    {"id": 'daniel', "name": 'Daniel Cruz', "role": 'DEV', "contribution": '204'},
    {"id": 'emerson', "name": 'Emerson Oliveira', "role": 'Marketing', "contribution": '192'},
    {"id": 'fabio', "name": 'Fábio Luiz', "role": 'DEV', "contribution": '180'},
    {"id": 'fernando', "name": 'Fernando Salles', "role": 'Analista', "contribution": '168'},
    {"id": 'moacyr', "name": 'Moacyr Pinheiro', "role": 'DEV', "contribution": '156'},
    {"id": 'samuel1', "name": 'Samuel Oliveira', "role": 'DEV', "contribution": '144'},
    {"id": 'sandra1', "name": 'Sandra Oliveira', "role": 'Analista', "contribution": '132'},
    {"id": 'karine1', "name": 'Karine Fernanda', "role": 'DEV', "contribution": '120'},
    {"id": 'maverson1', "name": 'Maverson Oliveira', "role": 'Analista', "contribution": '108'},
    {"id": 'mayara1', "name": 'Mayara Oliveira', "role": 'Marketing', "contribution": '96'},
    {"id": 'beatriz1', "name": 'Beatriz Oliveira', "role": 'DEV', "contribution": '84'},
    {"id": 'arthur1', "name": 'Arthur Oliveira', "role": 'Marketing', "contribution": '72'},
    {"id": 'daniel1', "name": 'Daniel Cruz', "role": 'DEV', "contribution": '60'},
    {"id": 'emerson1', "name": 'Emerson Oliveira', "role": 'Marketing', "contribution": '48'},
    {"id": 'fabio1', "name": 'Fábio Luiz', "role": 'DEV', "contribution": '36'},
    {"id": 'fernando1', "name": 'Fernando Salles', "role": 'Analista', "contribution": '24'},
    {"id": 'moacyr1', "name": 'Moacyr Pinheiro', "role": 'DEV', "contribution": '12'}
];

let divList;
let percentage = 0;
let nextLevel = {};
let workerName = '';
let workersSorted = [];
let workerContribution = 0;
let totalContributions = 0;
let p = document.createElement("p");
let hr = document.createElement("hr");
let img = document.createElement("img");
let div = document.createElement("div");
let role = document.createElement('div');
let rows = document.querySelector("#rows");
let class1 = document.createElement('div');
let worker =  document.createElement("div");
let position = document.createElement("div");
let contribution = document.createElement('div');

init();

function init() {
    setWorkers();
    sortWorkers();
    displayData();
}

function setWorkers() {
    for(let i = 0; i < workersData.length; i++) {
        worker.id = workersData[i].id;
        worker.classList.add("worker", "wrapper");
    
        position.classList.add("worker-position");
    
        img.classList.add('worker-picture');
        img.src = './assets/imgs/profile/' +  workersData[i].id + '.jpg';
        img.alt = 'Foto de ' + workersData[i].id;
    
        p.classList.add("worker-name");
        p.textContent = workersData[i].name;
    
        role.classList.add("worker-role");
        role.textContent = workersData[i].role;
        
        contribution.classList.add("worker-contribution");
        contribution.textContent = workersData[i].contribution;
        totalContributions += Number(workersData[i].contribution);
        
        class1.classList.add("worker-class");
        class1.textContent = workersData[i].class;
        
        div.classList.add("worker-name-picture");
        div.innerHTML = img.outerHTML + p.outerHTML;
        worker.innerHTML = position.outerHTML + div.outerHTML + role.outerHTML + contribution.outerHTML + class1.outerHTML;
        rows.innerHTML += worker.outerHTML;
    }
}

function sortWorkers() {
    for (let worker1 in workersData) {
        workersSorted.push([worker1, workersData[worker1]]);
    }
    workersSorted.sort(function(a, b){return b[1].contribution - a[1].contribution});
}

function displayData() {
    let id = '';
    for(let i = 0; i < workersSorted.length; i++) {
        id = workersSorted[i][1].id;
        
        document.querySelector('#' + id).style.order = i+1;
        document.querySelector('#' + id + ' .worker-contribution').textContent = workersSorted[i][1].contribution;
        document.querySelector('#' + id + ' .worker-position').textContent = i+1;
        
        if(i < 4) {
            document.querySelector('#' + id + ' .worker-class').textContent = 'S';
        } else if(i  < 11) {
            document.querySelector('#' + id + ' .worker-class').textContent = 'A';
        } else if(i < 21) {
            document.querySelector('#' + id + ' .worker-class').textContent = 'B';
        } else {
            document.querySelector('#' + id + ' .worker-class').textContent = 'C';
        }

        if(i === workersSorted.length-1){
            document.querySelector('#' + id).style.marginBottom = "8px";
        }

        if(i !== 0) {
            nextLevel[id] = Number(workersSorted[i-1][1].contribution) + 1;
        } else {
            nextLevel[id] = 0;
        }

        document.querySelector('#' + id).addEventListener("click", function(){
            this.classList.toggle("expanded");
            if(this.classList.contains("expanded")){
                expandWorker(this.id);
            } else {
                collapseWorker(this.id);
            }
        });
    }
}

function collapseWorker(id) {
    worker = document.querySelector("#" + id);
    divList = document.querySelectorAll("#" + id + " .worker-profile div:not(.worker-about)");
    
    worker.innerHTML = '';
    for(let i = 0; i < divList.length; i++) {
        if(divList[i].classList.contains("hide")) {
            divList[i].classList.remove("hide");
        }
        worker.appendChild(divList[i]);
    }
}

function expandWorker(id) {
    worker = document.querySelector("#" + id);
    divList = document.querySelectorAll("#" + id + " div");
    role = document.querySelector("#" + id + " .worker-role");
    class1 = document.querySelector("#" + id + " .worker-class");
    contribution = document.querySelector("#" + id + " .worker-contribution");
    
    for(let i = 2; i < divList.length; i++) {
        divList[i].classList.add("hide");
    }
    
    div = document.createElement("div");
    div.classList.add("worker-about");
    div.innerHTML = "<p>Cargo: " + role.innerHTML + "</p>";
    div.innerHTML += "<p>Contribuições: " + contribution.innerHTML + "</p>";
    worker.innerHTML += div.outerHTML;
    
    div = document.createElement("div");
    div.classList.add("worker-about");
    div.innerHTML = "<img class='worker-badge' src='./assets/imgs/trophies/" + class1.textContent.toLowerCase() + ".svg'>";
    worker.innerHTML += div.outerHTML;
    
    div = document.createElement("div");
    div.classList.add("worker-profile");
    div.innerHTML = (worker.innerHTML);
    worker.innerHTML = div.outerHTML;
    
    hr = document.createElement("hr");
    worker.innerHTML += hr.outerHTML;

    div = document.createElement("div");
    div.classList.add("worker-charts");
    div.innerHTML = "<div class='contribution-section'></div>";
    worker.innerHTML += div.outerHTML;
    
    div = document.querySelector("#" + id + " .contribution-section");
    div.innerHTML = "<h3>Contribuições</h3>";
    div.innerHTML += "<canvas class='contribution-chart' width='100%'' height='100%''></canvas>";   
    
    div = document.querySelector("#" + id + " .worker-charts");
    div.innerHTML += "<div class='progression-section'></div>";
    div = document.querySelector("#" + id + " .progression-section");
    div.innerHTML += "<h3>Próximo Nível</h3>";
    
    setTimeout(function() {
        displayContributionChart(id);
        displayProgressionChart(id);
    }, 350);
}

function displayContributionChart(id) {
    workerName = id;
    workerName = workerName.charAt(0).toUpperCase() + workerName.slice(1);
    workerContribution = Number(document.querySelector("#" + id + " .worker-contribution").textContent);

    var ctx = document.querySelector("#" + id + " .contribution-chart").getContext('2d');
    var contributionChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Contribuições de outros", "Contribuições de " + workerName],
            datasets: [{
            backgroundColor: [
                "#181827",
                "#6E44FF"
            ],
            hoverBackgroundColor: [
                "#101021",
                "#5F33FF"
            ],
            data: [totalContributions - workerContribution, workerContribution]
            }]
        },

        options: {
            
            maintainAspectRatio: true, 

            animation: {
                duration: 1500
            },

            legend: {
                display: false
            },

            elements: {
                arc: {
                    borderWidth: 0
                }
            },

            tooltips: {
                xAlign: 'center',
                yAlign: 'bottom',
                bodyFontSize: 35,
                titleFontSize: 35,
                bodyAlign: 'center',
                titleAlign: 'center',
                custom: function(tooltip) {
                    if (!tooltip) return;
                    tooltip.displayColors = false;
                },

                callbacks: {
                    label: function(tooltipItem, data) {
                      return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    }
                  }
            
            }
        }
    });

    div = document.createElement("div");
    div.classList.add("pie-chart-legend");
    div.innerHTML = "<p><span></span>Contribuições de outros</p>";
    div.innerHTML +="<p><span></span>Contribuições de " + workerName + "</p>"
    document.querySelector("#" + id + " .contribution-section").appendChild(div);
}

function displayProgressionChart(id) {
    if(nextLevel[id] !== 0) {
        percentage = (workerContribution * 100) / nextLevel[id];
    } else {
        percentage = 100;
    }

    div = document.querySelector("#" + id + " .progression-section");
    div.innerHTML += "<svg viewBox='0 0 36 36' height='157' class='circular-chart'></svg>";

    div = document.querySelector("#" + id + " .circular-chart");
    div.innerHTML = "<path class='circle-bg' d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'/>"
    div.innerHTML += "<path class='circle' stroke-dasharray='" + percentage + ", 100' d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'/>"
    div.innerHTML += "<text x='18' y='21.25' class='percentage'>" + Math.trunc(percentage) + "%</text>";

    div = document.querySelector("#" + id + " .progression-section");
    div.innerHTML += "<div class='circular-chart-legend'><div>"
    div = document.querySelector("#" + id + " .circular-chart-legend");
    if(nextLevel[id] !== 0) {
        div.innerHTML = "<p>Contribuições: " + workerContribution + "</p>";
        div.innerHTML +="<p>Próximo Nível: " + nextLevel[id] + "</p>";
    } else {
        div.innerHTML = "<p>" + workerContribution + "</p>";
        div.innerHTML +="<p>Contribuições</p>";
    }
}