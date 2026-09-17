export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    github: string;
    location: string;
  };
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    date: string;
    highlights: string[];
    tag: string;
  }[];
  skills: {
    category: string;
    items: { name: string; level: number; tags: string[] }[];
  }[];
}

export const profileData: ProfileData = {
  name: "Eloy Alcala",
  role: "AI Engineer & Data Specialist",
  tagline: "Transformando arquitecturas complejas en ecosistemas agenticos autónomos y soluciones de datos escalables.",
  bio: "Data Engineer & AI Specialist con sólida formación y experiencia diseñando sistemas de agentes inteligentes (RAG, Tool Calling, MCP), orquestadores multi-agente y pipelines de datos de alto rendimiento. Enfoque riguroso en observabilidad (Langfuse), latencia optimizada y precisión estructurada con Pydantic y LangGraph.",
  contact: {
    email: "dev.db.alcala@gmail.com",
    phone: "(+54) 91162595342",
    whatsapp: "https://wa.me/5491162595342?text=Hola%20Eloy,%20vi%20tu%20portafolio%20de%20IA%20Engineering%20y%20me%20gustar%C3%ADa%20conversar.",
    github: "https://github.com/Elocss",
    location: "Argentina (Disponible para proyectos globales / Remoto)",
  },
  metrics: [
    {
      label: "Latencia RAG",
      value: "< 5s",
      description: "Extracción sobre manuales densos de 2,000+ págs.",
    },
    {
      label: "Observabilidad",
      value: "100%",
      description: "Trazabilidad de tokens & spans vía Langfuse.",
    },
    {
      label: "Precisión Estructurada",
      value: "99.4%",
      description: "Validación de esquemas Pydantic y JSON Schema.",
    },
    {
      label: "Disponibilidad de Agentes",
      value: "24/7",
      description: "Atención comercial y back-office autónomo.",
    }
  ],
  education: [
    {
      degree: "AI Engineering Bootcamp",
      institution: "Henry",
      date: "Septiembre 2026",
      tag: "Multi-Agent & LLM Ops",
      highlights: [
        "Diseño y desarrollo de agentes inteligentes basados en LLMs de última generación.",
        "Construcción de arquitecturas multi-agente orquestadas con LangGraph y CrewAI.",
        "Implementación de soluciones RAG avanzadas con indexación vectorial y reranking.",
        "Integración con APIs corporativas, bases de datos vectoriales y Tool Calling."
      ]
    },
    {
      degree: "Especialización en Data Science (Básico & Avanzado)",
      institution: "Instituto Humai",
      date: "Noviembre 2026",
      tag: "Data Science & ML",
      highlights: [
        "Modelado predictivo, inferencia estadística y algoritmos de Machine Learning.",
        "Feature engineering y diseño de arquitecturas de datos para analítica avanzada.",
        "Visualización y reporting automatizado para toma de decisiones ejecutivas."
      ]
    },
    {
      degree: "Gerencia Operativa de Innovación Tecnológica y Talento Digital",
      institution: "INNOVA LAB",
      date: "Diciembre 2026",
      tag: "Entorno de Producción",
      highlights: [
        "Diseño del 'Observatorio Predictivo de Tendencias Socioeconómicas, Laborales y Educativas'.",
        "Pipeline productivo de analítica no estructurada con procesamiento de lenguaje natural."
      ]
    },
    {
      degree: "Tecnicatura Universitaria en Ciencia de Datos",
      institution: "Universidad Nacional de Chilecito (UNDEC), La Rioja, Argentina",
      date: "Graduación esperada: Dic 2027",
      tag: "Grado Académico",
      highlights: [
        "Fundamentos matemáticos, álgebra lineal aplicada, probabilidad y computación científica.",
        "Diseño de bases de datos relacionales, no relacionales y estructuras de datos complejas."
      ]
    }
  ],
  skills: [
    {
      category: "AI Engineering & Multi-Agent Frameworks",
      items: [
        { name: "LangGraph / LangChain", level: 95, tags: ["Orquestación", "Grafos de Estado", "Memoria"] },
        { name: "Tool Calling & Function Calling", level: 95, tags: ["APIs", "Acciones Autónomas"] },
        { name: "MCP (Model Context Protocol)", level: 90, tags: ["Context Server", "Estandarización"] },
        { name: "RAG Avanzado & Embeddings", level: 95, tags: ["Semantic Search", "Dense Retrieval"] },
        { name: "Pydantic & Esquemas Estructurados", level: 95, tags: ["Type Safety", "Validation"] },
        { name: "Multimodal LLMs (Vision + OCR)", level: 90, tags: ["GPT-4o", "Claude 3.5", "Document AI"] }
      ]
    },
    {
      category: "Observabilidad, MLOps & Vector DBs",
      items: [
        { name: "Langfuse (Trace, Latency, Token Cost)", level: 95, tags: ["Observabilidad", "Métricas"] },
        { name: "ChromaDB / Qdrant / Milvus", level: 90, tags: ["Vector Stores", "HNSW Index"] },
        { name: "Docker & Containerization", level: 85, tags: ["DevOps", "Microservicios"] },
        { name: "Streamlit / FastAPIs", level: 90, tags: ["Prototipado", "Endpoints REST"] }
      ]
    },
    {
      category: "Data Science, ML & Programación",
      items: [
        { name: "Python (Asyncio, NumPy, Pandas)", level: 98, tags: ["Core Backend", "Data Analysis"] },
        { name: "SQL & Bases de Datos", level: 90, tags: ["PostgreSQL", "Data Pipelines"] },
        { name: "Scikit-Learn, TensorFlow, PyTorch", level: 85, tags: ["Machine Learning", "Deep Learning"] },
        { name: "Integraciones Corporativas (SAP, ERPs)", level: 85, tags: ["Webhooks", "Enterprise APIs"] }
      ]
    }
  ]
};
