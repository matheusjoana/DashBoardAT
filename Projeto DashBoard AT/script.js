const tecnicos = [
    {
      nome: "Técnico Emanuel",
      servicos: [
        { nome: "Instalação de fibra", status: "Finalizado" },
        { nome: "Manutenção de rede", status: "Atrasado" },
        { nome: "Visita programada", status: "Programado" }
      ]
    },
    {
      nome: "Técnico Maria",
      servicos: [
        { nome: "Troca de modem", status: "Em andamento" },
        { nome: "Suporte remoto", status: "Pendente" }
      ]
    },
    {
      nome: "Técnico Carlos",
      servicos: [
        { nome: "Atualização de firmware", status: "Finalizado" },
        { nome: "Novo agendamento", status: "Programado" }
      ]
    },
    {
      nome: "Técnico Ana",
      servicos: [
        { nome: "Reparo em cabo", status: "Atrasado" },
        { nome: "Instalação roteador", status: "Em andamento" }
      ]
    }
  ];
  
  let tecnicoIndex = 0;
  let autoSlide;
  
  const dashboard = document.getElementById('dashboard');
  const inputBusca = document.getElementById('busca');
  const filtroStatus = document.getElementById('filtroStatus');
  const btnAvancar = document.getElementById('avancar');
  const btnVoltar = document.getElementById('voltar');
  
  function renderizarDashboard() {
    dashboard.innerHTML = '';
  
    const termoBusca = inputBusca.value.toLowerCase();
    const statusSelecionado = filtroStatus.value;
    let tecnico = tecnicos[tecnicoIndex];
  
    const servicosFiltrados = tecnico.servicos.filter(servico => {
      const combinaBusca = tecnico.nome.toLowerCase().includes(termoBusca) ||
                           servico.nome.toLowerCase().includes(termoBusca);
      const combinaStatus = !statusSelecionado || servico.status === statusSelecionado;
      return combinaBusca && combinaStatus;
    });
  
    if (servicosFiltrados.length > 0) {
      const card = document.createElement('div');
      card.className = 'tecnico';
  
      const nome = document.createElement('h3');
      nome.textContent = tecnico.nome;
      card.appendChild(nome);
  
      servicosFiltrados.forEach(servico => {
        const divServico = document.createElement('div');
        divServico.className = 'servico ' + servico.status.toLowerCase().replace(' ', '-');
        divServico.textContent = servico.nome + ' - ' + servico.status;
        card.appendChild(divServico);
      });
  
      dashboard.appendChild(card);
    }
  }

  function atualizarResumo() {
    let total = 0, finalizado = 0, atrasado = 0, programado = 0, pendente = 0, emAndamento = 0;
  
    tecnicos.forEach(tecnico => {
      tecnico.servicos.forEach(servico => {
        const status = servico.status.toLowerCase();
        total++;
        if (status === "finalizado") finalizado++;
        else if (status === "atrasado") atrasado++;
        else if (status === "programado") programado++;
        else if (status === "pendente") pendente++;
        else if (status === "em andamento") emAndamento++;
      });
    });
  
    document.getElementById("total").textContent = total;
    document.getElementById("finalizado").textContent = finalizado;
    document.getElementById("atrasado").textContent = atrasado;
    document.getElementById("programado").textContent = programado;
    document.getElementById("pendente").textContent = pendente;
    document.getElementById("emAndamento").textContent = emAndamento;
  }

  let grafico;

function gerarGrafico() {
  const statusContagem = {
    Finalizado: 0,
    Atrasado: 0,
    Programado: 0,
    Pendente: 0,
    "Em andamento": 0
  };

  tecnicos.forEach(tecnico => {
    tecnico.servicos.forEach(servico => {
      const status = servico.status.trim();
      if (statusContagem[status] !== undefined) {
        statusContagem[status]++;
      }
    });
  });

  const ctx = document.getElementById('graficoStatus').getContext('2d');

  if (grafico) grafico.destroy(); // remove gráfico antigo

  grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(statusContagem),
      datasets: [{
        label: 'Serviços por Status',
        data: Object.values(statusContagem),
        backgroundColor: [
          '#00ff00', // Finalizado
          'red',     // Atrasado
          'orange',  // Programado
          '#ccc',    // Pendente
          '#00bfff'  // Em andamento
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

  
  
  function avancar() {
    tecnicoIndex = (tecnicoIndex + 1) % tecnicos.length;
    renderizarDashboard();
    reiniciarAutoSlide();
  }
  
  function voltar() {
    tecnicoIndex = (tecnicoIndex - 1 + tecnicos.length) % tecnicos.length;
    renderizarDashboard();
    reiniciarAutoSlide();
  }
  
  function iniciarAutoSlide() {
    autoSlide = setInterval(avancar, 5000);
  }
  
  function reiniciarAutoSlide() {
    clearInterval(autoSlide);
    iniciarAutoSlide();
  }
  
  btnAvancar.addEventListener('click', avancar);
  btnVoltar.addEventListener('click', voltar);
  inputBusca.addEventListener('input', renderizarDashboard);
  filtroStatus.addEventListener('change', renderizarDashboard);

  function atualizarRelogio() {
    const now = new Date();
    const horas = String(now.getHours()).padStart(2, '0');
    const minutos = String(now.getMinutes()).padStart(2, '0');
    const segundos = String(now.getSeconds()).padStart(2, '0');
    const data = now.toLocaleDateString('pt-BR');
    document.getElementById("relogio").textContent = `${data} | ${horas}:${minutos}:${segundos}`;
  }
  
  setInterval(atualizarRelogio, 1000); 
  
  
  renderizarDashboard();
  atualizarResumo()
  iniciarAutoSlide();
  atualizarRelogio();
  atualizarResumo();
  gerarGrafico();

  