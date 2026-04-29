export const metricsData = [
  { id: "unidades", title: "UNIDADES", value: 124, icon: "bank" },
  { id: "avaliacoes", title: "AVALIAÇÕES", value: 892, icon: "file" },
  { id: "aptos", title: "APTOS", value: 3542, icon: "solution" },
  { id: "alunos", title: "ALUNOS", value: 12403, icon: "team" },
];

export const radarChartData = {
  series: [
    { name: "Humanas", data: [85, 72, 68, 78, 82, 75] },
    { name: "Exatas", data: [65, 88, 92, 70, 58, 80] },
  ],
  categories: ["Linguagens", "Matemática", "Ciências", "História", "Geografia", "Artes"],
};

export const donutChartData = {
  series: [65, 88, 92, 70, 58, 80],
  labels: ["Linguagens", "Matemática", "Ciências", "História", "Geografia", "Artes"],
};

export const trendChartData = {
  series: [
    { name: "Desempenho Atual", data: [72, 75, 78, 74, 80, 82] },
    { name: "Meta", data: [70, 72, 75, 78, 80, 82] },
  ],
  categories: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN"],
};

export const subjectPerformanceData = [
  { subject: "Linguagem Portuguesa", score: 9.2, maxScore: 10 },
  { subject: "Matemática", score: 7.6, maxScore: 10 },
  { subject: "Biologia", score: 8.8, maxScore: 10 },
  { subject: "Física", score: 6.2, maxScore: 10 },
];

export const learningLevelsData = {
  levels: [
    { name: "Avançado", percentage: 15, count: 1860, color: "#1e3a5f" },
    { name: "Proficiente", percentage: 45, count: 5582, color: "#2d7d7d" },
    { name: "Básico", percentage: 30, count: 3721, color: "#7eb8da" },
    { name: "Crítico", percentage: 10, count: 1240, color: "#f0b4b4" },
  ],
};

export const yearOptions = [
  { value: "2026", label: "Ano Letivo 2026" },
  { value: "2025", label: "Ano Letivo 2025" },
  { value: "2024", label: "Ano Letivo 2024" },
  { value: "2023", label: "Ano Letivo 2023" },
  { value: "2022", label: "Ano Letivo 2022" },
];

export const clientData = [
  {
    id: 1,
    titulo: "Anita Garibaldi",
    endereco: "Rua Padre Feijó, Bayeux - PB",
    salas: 4,
    codigo: "123346535",
    dataCriacao: "10/02/2026",
    logo: "/images/1.png",
    alturaMinima: 300,
    avatares: ["https://i.pravatar.cc/150?img=11", "https://i.pravatar.cc/150?img=12"],
    
    dashboardGeral: {
      metrics: { alunos: 1250, avaliacoes: 892, aptos: 1100 },
      donut: {
        series: [40, 30, 20, 10],
        labels: ["Avançado", "Proficiente", "Básico", "Crítico"]
      },
      radar: {
        series: [
          { name: "2026", data: [85, 75, 90, 80, 88, 70] },
          { name: "2025", data: [75, 70, 80, 75, 80, 65] }
        ],
        categories: ["Linguagens", "Matemática", "Ciências", "História", "Geografia", "Artes"]
      },
      trend: {
        series: [
          { name: "Desempenho Atual", data: [65, 70, 75, 80, 85, 90] },
          { name: "Meta", data: [70, 70, 75, 75, 80, 85] }
        ],
        categories: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN"]
      }
    },
    
    turmas: [
      {
        id: 101,
        nome: "1º Ano A - Ensino Médio",
        turno: "Manhã",
        dashboardTurma: {
          metrics: { alunos: 35, avaliacoes: 120, aptos: 30 },
          donut: {
            series: [50, 40, 10, 0],
            labels: ["Avançado", "Proficiente", "Básico", "Crítico"]
          },
          radar: {
            series: [
              { name: "Turma", data: [95, 90, 85, 90, 95, 80] },
              { name: "Média Escola", data: [85, 75, 90, 80, 88, 70] }
            ],
            categories: ["Linguagens", "Matemática", "Ciências", "História", "Geografia", "Artes"]
          },
          trend: {
            series: [
              { name: "Desempenho da Turma", data: [80, 82, 85, 88, 90, 92] },
              { name: "Meta Escolar", data: [75, 75, 80, 80, 85, 85] }
            ],
            categories: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN"]
          }
        },
        // --- NÍVEL 3: LISTA DE ALUNOS ---
        alunos: [
          {
            id: 1001,
            nome: "Ana Carolina Santos",
            avatar: "https://i.pravatar.cc/150?img=5",
            matricula: "2026001",
            dashboardAluno: {
              metrics: { media: 9.2, faltas: 2, posicao: "1º" },
              donut: { series: [80, 20, 0, 0], labels: ["Avançado", "Proficiente", "Básico", "Crítico"] },
              radar: {
                series: [
                  { name: "Ana", data: [95, 88, 92, 90, 95, 85] },
                  { name: "Média Turma", data: [85, 75, 90, 80, 88, 70] }
                ],
                categories: ["Linguagens", "Matemática", "Ciências", "História", "Geografia", "Artes"]
              },
              trend: {
                series: [{ name: "Desempenho da Ana", data: [85, 88, 89, 90, 92, 92] }],
                categories: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN"]
              }
            }
          },
          {
            id: 1002,
            nome: "Carlos Eduardo Silva",
            avatar: "https://i.pravatar.cc/150?img=11",
            matricula: "2026002",
            dashboardAluno: {
              metrics: { media: 6.5, faltas: 12, posicao: "28º" },
              donut: { series: [0, 20, 60, 20], labels: ["Avançado", "Proficiente", "Básico", "Crítico"] },
              radar: {
                series: [
                  { name: "Carlos", data: [60, 50, 65, 70, 55, 60] },
                  { name: "Média Turma", data: [85, 75, 90, 80, 88, 70] }
                ],
                categories: ["Linguagens", "Matemática", "Ciências", "História", "Geografia", "Artes"]
              },
              trend: {
                series: [{ name: "Desempenho do Carlos", data: [50, 55, 60, 58, 62, 65] }],
                categories: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN"]
              }
            }
          }
        ]
      },
      {
        id: 102,
        nome: "2º Ano B - Ensino Médio",
        turno: "Tarde",
        dashboardTurma: {
          metrics: { alunos: 32, avaliacoes: 95, aptos: 20 },
          donut: { series: [10, 20, 50, 20], labels: ["Avançado", "Proficiente", "Básico", "Crítico"] },
          radar: { series: [{ name: "Turma", data: [60, 55, 70, 65, 60, 50] }, { name: "Média Escola", data: [85, 75, 90, 80, 88, 70] }], categories: ["Linguagens", "Matemática", "Ciências", "História", "Geografia", "Artes"] },
          trend: { series: [{ name: "Desempenho da Turma", data: [55, 60, 58, 65, 62, 68] }, { name: "Meta Escolar", data: [70, 70, 75, 75, 80, 80] }], categories: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN"] }
        },
        alunos: []
      }
    ]
  },
  {
    id: 2,
    titulo: "Antonio Gomes",
    endereco: "Rua Professor Antonio Gomes, Bayeux - PB",
    salas: 4,
    codigo: "123346536",
    dataCriacao: "10/02/2026",
    logo: "/images/2.png",
    alturaMinima: 350,
    avatares: ["https://i.pravatar.cc/150?img=33", "https://i.pravatar.cc/150?img=44"],
    dashboardGeral: {
      metrics: { alunos: 800, avaliacoes: 450, aptos: 600 },
      donut: { series: [25, 35, 30, 10], labels: ["Avançado", "Proficiente", "Básico", "Crítico"] },
      radar: { series: [{ name: "2026", data: [70, 70, 70, 70, 70, 70] }], categories: ["Linguagens", "Matemática", "Ciências", "História", "Geografia", "Artes"] },
      trend: {
        series: [{ name: "Desempenho Atual", data: [70, 72, 71, 74, 76, 75] }, { name: "Meta", data: [75, 75, 75, 75, 75, 75] }],
        categories: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN"]
      }
    },
    turmas: []
  },
  ...[
    { id: 3, titulo: "Joao Caetano", endereco: "Centro, João Pessoa - PB", salas: 4, codigo: "123346537", logo: "/images/3.png" },
    { id: 4, titulo: "Veraldo Leite", endereco: "Bairro das Indústrias, João Pessoa - PB", salas: 4, codigo: "123346538", logo: "/images/4.png" },
    { id: 5, titulo: "Jose Patrocinio", endereco: "Centro, Campina Grande - PB", salas: 4, codigo: "123346539", logo: "/images/5.png" },
    { id: 6, titulo: "Padre Roma", endereco: "Bodocongó, Campina Grande - PB", salas: 4, codigo: "123346540", logo: "/images/6.png" },
    { id: 7, titulo: "Joao Suassuna", endereco: "Centro, Catolé do Rocha - PB", salas: 4, codigo: "123346541", logo: "/images/7.png" },
    { id: 8, titulo: "Francisco Maia", endereco: "Centro, Patos - PB", salas: 4, codigo: "123346542", logo: "/images/8.png" },
    { id: 9, titulo: "Calula Leite", endereco: "Centro, Itaporanga - PB", salas: 6, codigo: "123346543", logo: "/images/9.png" },
    { id: 10, titulo: "Chagas Soares", endereco: "Bairro Santo Antônio, Sousa - PB", salas: 5, codigo: "123346544", logo: "/images/10.png" },
    { id: 11, titulo: "Maciel Batista", endereco: "Centro, Cajazeiras - PB", salas: 8, codigo: "123346545", logo: "/images/11.png" },
    { id: 12, titulo: "Rangel Junior", endereco: "Bancários, João Pessoa - PB", salas: 7, codigo: "123346546", logo: "/images/12.png" }
  ].map(escola => ({
    ...escola,
    dataCriacao: "10/02/2026",
    alturaMinima: 300,
    avatares: ["https://i.pravatar.cc/150"],
    dashboardGeral: {
      metrics: { alunos: 500, avaliacoes: 300, aptos: 400 },
      donut: { series: [25, 25, 25, 25], labels: ["Avançado", "Proficiente", "Básico", "Crítico"] },
      radar: { series: [{ name: "2026", data: [50, 50, 50, 50, 50, 50] }], categories: ["Linguagens", "Matemática", "Ciências", "História", "Geografia", "Artes"] },
      trend: {
        series: [{ name: "Desempenho Atual", data: [50, 50, 50, 50, 50, 50] }, { name: "Meta", data: [60, 60, 60, 60, 60, 60] }],
        categories: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN"]
      }
    },
    turmas: []
  }))
];