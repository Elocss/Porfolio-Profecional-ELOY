export interface AgentCapability {
  title: string;
  description: string;
  tools: string[];
}

export interface AgentMetric {
  name: string;
  value: string;
  tool: string;
}

export interface SimulationStep {
  step: number;
  actor: "user" | "orchestrator" | "tool" | "agent" | "system";
  name: string;
  content: string;
  metadata?: {
    toolName?: string;
    params?: Record<string, any>;
    result?: Record<string, any> | string;
    latencyMs?: number;
    tokens?: number;
    status?: "running" | "success" | "warning";
  };
}

export interface SimulationPreset {
  id: string;
  label: string;
  userPrompt: string;
  description: string;
  steps: SimulationStep[];
}

export interface ProjectItem {
  id: string;
  title: string;
  badge: string;
  category: "AI Multi-Agent" | "Multimodal AI" | "Financial AI" | "Industrial AI";
  tagline: string;
  summary: string;
  githubUrl: string;
  techStack: string[];
  capabilities: AgentCapability[];
  metrics: AgentMetric[];
  architectureOverview: string;
  readmeHighlights: {
    problemSolved: string;
    keyModules: string[];
    dataPipeline: string;
    observability: string;
  };
  presets: SimulationPreset[];
}

export const featuredProjects: ProjectItem[] = [
  {
    id: "gemelo-virtual-inmobiliario",
    title: "Gemelo Virtual Inmobiliario — Inmobiliaria Bretman",
    badge: "Multi-Agent & Multimodal",
    category: "AI Multi-Agent",
    tagline: "Ecosistema de agentes autónomos para digitalización, auditoría técnica/legal y comercialización 24/7.",
    summary: "Plataforma integral que resuelve los dos grandes cuellos de botella del sector inmobiliario: auditoría multimodal automática de inmuebles y asesor comercial con memoria contextual y Tool Calling para WhatsApp y Web.",
    githubUrl: "https://github.com/Elocss/Gemelo-Virtual-Inmobiliario.git",
    techStack: ["LangChain", "LangGraph", "Langfuse", "Pydantic", "ChromaDB", "Python 3.11", "Vision Multimodal"],
    metrics: [
      { name: "Costo Operativo", value: "Token Tracking en vivo", tool: "Langfuse Spans" },
      { name: "Latencia P95", value: "< 1.2s", tool: "Trace Durations" },
      { name: "Precisión Estructurada", value: "99.8%", tool: "Pydantic Schemas" },
      { name: "Disponibilidad Front", value: "24/7 Omnicanal", tool: "WhatsApp / Web API" }
    ],
    architectureOverview: "Arquitectura desacoplada en dos subsistemas: Back-Office (Ingesta y Visión Multimodal que valida fotos, coherencia jurídica y genera fichas SEO) y Front-Office (Asesor conversacional con Grafo de Estados en LangGraph, memoria semántica y Tool Calling hacia CRM y motor de reservas).",
    readmeHighlights: {
      problemSolved: "Eliminación de retrasos de semanas en publicación de propiedades y pérdida de leads por falta de atención inmediata fuera de horario comercial.",
      keyModules: [
        "Vision Inspector: Auditoría de iluminación, distribución y amenities mediante LLM multimodal.",
        "Legal Coherence Checker: Validación cruzada entre escrituras/fichas técnicas y fotos.",
        "Commercial Concierge: Asesor autónomo con Tool Calling para agendar tours presenciales o virtuales en tiempo real.",
        "Langfuse Observability Hub: Monitor de latencia, tokens y calidad de respuesta por cada agente."
      ],
      dataPipeline: "Fotos & Docs PDF -> Ingesta Multimodal -> Vector Store (ChromaDB) con metadata enriquecida -> Grafo de Estados -> Tool Calling hacia Base de Datos -> Notificaciones WhatsApp.",
      observability: "Trazabilidad granular con Langfuse para auditar llamadas LLM, duración de herramientas, costos de tokens y tasa de precisión de esquemas Pydantic."
    },
    capabilities: [
      {
        title: "Front-Office Concierge 24/7",
        description: "Atiende compradores potenciales, filtra requerimientos de presupuesto/zona y ejecuta reservas directamente en el calendario.",
        tools: ["search_properties_semantic", "check_availability", "schedule_visit", "calculate_mortgage_estimate"]
      },
      {
        title: "Back-Office Auditor Multimodal",
        description: "Revisa automáticamente las fotos cargadas de la propiedad, detecta inconsistencias con la descripción escrita y redacta fichas comerciales.",
        tools: ["inspect_property_images", "verify_legal_specs", "generate_seo_brochure", "index_to_chromadb"]
      }
    ],
    presets: [
      {
        id: "tour-scheduling",
        label: "Front-Office: Búsqueda y Reserva de Tour",
        userPrompt: "Hola, busco un departamento de 2 ambientes en Palermo con balcón, luminoso y presupuesto de $650 USD/mes. ¿Tienen disponible para visitar este sábado?",
        description: "Ejecución del asesor de ventas con búsqueda semántica en ChromaDB y llamada de herramienta para agendamiento.",
        steps: [
          {
            step: 1,
            actor: "orchestrator",
            name: "Router & Intent Classification",
            content: "Clasificando intención de usuario: [BÚSQUEDA_INMUEBLE + INTENCIÓN_VISITA]. Extrayendo entidades: Zona='Palermo', Tipo='2 ambientes', MaxPrice=650 USD, Requisito='Balcón/Luminoso', Fecha='Sábado'.",
            metadata: { latencyMs: 140, tokens: 68 }
          },
          {
            step: 2,
            actor: "tool",
            name: "search_properties_semantic()",
            content: "Consultando base vectorial ChromaDB con filtro espacial y de presupuesto...",
            metadata: {
              toolName: "search_properties_semantic",
              params: { location: "Palermo", rooms: 2, max_budget_usd: 650, features: ["balcon", "luminoso"] },
              result: { match_count: 2, top_id: "INM-PAL-884", address: "Av. Coronel Díaz 1800", price: 620, status: "Disponible" },
              latencyMs: 310,
              status: "success"
            }
          },
          {
            step: 3,
            actor: "tool",
            name: "check_broker_availability()",
            content: "Verificando disponibilidad de asesores inmobiliarios para el sábado...",
            metadata: {
              toolName: "check_broker_availability",
              params: { date: "2026-09-20", property_id: "INM-PAL-884" },
              result: { available_slots: ["11:00 AM", "03:30 PM", "05:00 PM"] },
              latencyMs: 180,
              status: "success"
            }
          },
          {
            step: 4,
            actor: "agent",
            name: "Bretman Commercial Agent",
            content: "¡Hola! Encontré una opción ideal para vos: **Departamento de 2 ambientes sobre Av. Coronel Díaz (Palermo)** a **$620 USD/mes**. Cuenta con balcón al frente, excelente luminosidad natural y cocina integrada moderna.\n\nPara este **sábado 20**, tenemos turnos disponibles con nuestro asesor a las **11:00 AM, 15:30 PM y 17:00 PM**. ¿Cuál de estos horarios te queda más cómodo para confirmar tu visita presencial o prefieres un tour virtual en 3D?",
            metadata: { latencyMs: 420, tokens: 245 }
          }
        ]
      },
      {
        id: "backoffice-audit",
        label: "Back-Office: Auditoría Multimodal de Ficha Inmobiliaria",
        userPrompt: "[Ingesta de Lote]: 5 imágenes JPG + Ficha técnica borrador: 'Casa 3 dormitorios, piscina climatizada, garage doble, Palermo Soho'.",
        description: "Auditoría de fotos con visión artificial para detectar discrepancias y emitir dictamen de publicación.",
        steps: [
          {
            step: 1,
            actor: "tool",
            name: "inspect_property_images(multimodal_llm)",
            content: "Analizando 5 fotografías con visión computacional...",
            metadata: {
              toolName: "inspect_property_images",
              result: {
                detected_rooms: ["Living comedor", "Cocina americana", "2 Dormitorios verificados", "Patio con parrilla"],
                amenities_detected: ["Parrilla", "Balcón terraza"],
                missing_in_photos: ["Piscina climatizada (No visible en lote)"],
                lighting_score: 9.4,
                resolution_quality: "4K High Res"
              },
              latencyMs: 820,
              status: "warning"
            }
          },
          {
            step: 2,
            actor: "agent",
            name: "Back-Office QA & Compliance Agent",
            content: "⚠️ **Alerta de Coherencia Detectada:** La ficha técnica menciona *piscina climatizada*, pero las imágenes del lote solo muestran patio con parrilla y 2 dormitorios en lugar de 3.\n\n✅ **Acción ejecutada:** Se ha retenido la publicación automática en portales y se envió una solicitud de aclaración al tasador asignado con reporte fotográfico enriquecido.",
            metadata: { latencyMs: 290, tokens: 190 }
          }
        ]
      }
    ]
  },
  {
    id: "app-multimodal-empresa-juridica",
    title: "App Multimodal de Empresa Jurídica",
    badge: "Legal AI & Document OCR",
    category: "Multimodal AI",
    tagline: "Asistente y auditor jurídico autónomo para análisis de contratos, detección de cláusulas de riesgo y jurisprudencia.",
    summary: "Sistema avanzado de procesamiento multimodal que ingiere contratos extensos, poderes y sentencias, ejecutando OCR inteligente, extracción estructurada de obligaciones y búsqueda de jurisprudencia aplicable en milisegundos.",
    githubUrl: "https://github.com/Elocss/app-multimodal-de-empresa-juridica.git",
    techStack: ["Python", "OCR Tesseract/Vision LLM", "LangChain", "Vector Indexing", "Pydantic Legal Schemas", "FastAPI"],
    metrics: [
      { name: "Tiempo Análisis", value: "Reducción 92%", tool: "De horas a segundos" },
      { name: "Citas Jurídicas", value: "100% Verificables", tool: "RAG con fuente de foja" },
      { name: "Extracción Cláusulas", value: "Zero-Shot + Few-Shot", tool: "Pydantic Validation" },
      { name: "Formatos", value: "PDF, Escaneos, DOCX", tool: "Multimodal Pipeline" }
    ],
    architectureOverview: "Pipeline de preprocesamiento de documentos escaneados con OCR guiado por atención multimodal, segmentador de cláusulas contractuales, indexador vectorial con metadatos por artículo y agente razonador con salvaguardas de consistencia legal.",
    readmeHighlights: {
      problemSolved: "Cuellos de botella en despachos de abogados al revisar cientos de páginas de contratos y expedientes judiciales para detectar penalidades ocultas y fechas de prescripción.",
      keyModules: [
        "DocVision Engine: OCR de alta precisión sobre documentos judiciales manchados o con baja resolución.",
        "Risk Clause Sentinel: Clasificador de cláusulas leoninas, indemnizaciones desproporcionadas y ambigüedades.",
        "Jurisprudence Retriever: Motor RAG semántico conectado a corpus jurisprudenciales indexados.",
        "Executive Summary Generator: Generador de minutas ejecutivas con cuadro de riesgos para socios del bufete."
      ],
      dataPipeline: "Expediente PDF -> OCR / Vision Parser -> Chunking Semántico por Cláusula -> Vector Embeddings -> Agente Evaluador de Riesgos -> Dictamen Estructurado.",
      observability: "Tracking de fuentes y citas exactas para evitar alucinaciones, verificando número de foja y párrafo en cada afirmación."
    },
    capabilities: [
      {
        title: "Escaneo de Cláusulas Abusivas y Riesgos",
        description: "Detecta instantáneamente penalidades abusivas, renuncias de fueros y cláusulas de confidencialidad excesivas.",
        tools: ["extract_contract_clauses", "assess_liability_risk", "check_governing_law"]
      },
      {
        title: "Búsqueda RAG de Precedentes Judiciales",
        description: "Cruza la controversia del documento con fallos judiciales históricos relevantes para predecir viabilidad procesal.",
        tools: ["query_jurisprudence_db", "cite_precedent_rulings", "generate_legal_memo"]
      }
    ],
    presets: [
      {
        id: "nda-audit",
        label: "Auditoría de Acuerdo de Confidencialidad (NDA)",
        userPrompt: "[Contrato Subido]: 'Acuerdo_Confidencialidad_Proveedor_2026.pdf'. Analizar plazo de vigencia, penalidades y jurisdicción aplicable.",
        description: "Extracción automática de cláusulas clave y semáforo de riesgo contractual.",
        steps: [
          {
            step: 1,
            actor: "tool",
            name: "extract_contract_clauses()",
            content: "Procesando 18 fojas del documento PDF mediante OCR Multimodal...",
            metadata: {
              toolName: "extract_contract_clauses",
              params: { doc_type: "NDA / Commercial Agreement" },
              result: { clauses_extracted: 24, confidence_avg: 0.991 },
              latencyMs: 650,
              status: "success"
            }
          },
          {
            step: 2,
            actor: "tool",
            name: "assess_liability_risk()",
            content: "Evaluando riesgos sobre cláusulas de indemnización y penalidades...",
            metadata: {
              toolName: "assess_liability_risk",
              result: {
                risk_level: "ALTO (Semáforo Rojo)",
                flagged_issues: [
                  "Cláusula 9: Vigencia de confidencialidad perpetua e indefinida (Contraria a usos comerciales estándar).",
                  "Cláusula 14: Penalidad fijada en $500,000 USD sin requerimiento de prueba de daño directo.",
                  "Cláusula 19: Sumisión a tribunales de Delaware sin bilateralidad."
                ]
              },
              latencyMs: 410,
              status: "warning"
            }
          },
          {
            step: 3,
            actor: "agent",
            name: "Legal Intelligence Agent",
            content: "⚖️ **Dictamen Legal Preliminar — Resumen Ejecutivo:**\n\n* **Nivel de Riesgo General:** 🔴 **ALTO**\n* **Puntos Críticos Detectados:**\n  1. **Confidencialidad Perpetua:** Se recomienda limitar el plazo a 3 o 5 años posteriores a la finalización del vínculo.\n  2. **Penalidad Desproporcionada:** La multa de $500k USD resulta lesiva y desproporcionada. Se sugiere sustituir por 'daños y perjuicios directos efectivamente comprobados'.\n  3. **Jurisdicción:** Se sugiere fijar tribunales locales o mediación comercial previa (arbitraje).\n\n📄 *He redactado las cláusulas de reemplazo sugeridas listas para enviar a la contraparte.*",
            metadata: { latencyMs: 380, tokens: 310 }
          }
        ]
      }
    ]
  },
  {
    id: "simulador-costos-financieros",
    title: "Simulador de Costos Financieros & Proyecciones",
    badge: "Financial AI & Data Modeling",
    category: "Financial AI",
    tagline: "Agente analista cuantitativo para modelado de costos, estrés financiero y detección de anomalías contables.",
    summary: "Motor analítico impulsado por IA que permite a directores financieros simular escenarios de variación de inflación, costos operativos, fluctuaciones cambiarias y optimización presupuestaria mediante razonamiento algorítmico.",
    githubUrl: "https://github.com/Elocss/simulador-de-costos-financieros.git",
    techStack: ["Python", "Pandas", "NumPy", "Scikit-Learn", "FastAPI", "Tool Calling", "Monte Carlo Simulations"],
    metrics: [
      { name: "Modelado Monte Carlo", value: "10,000 Iteraciones", tool: "NumPy Vectorized" },
      { name: "Análisis de Sensibilidad", value: "Multivariable", tool: "Escenarios Dinámicos" },
      { name: "Detección Desvíos", value: "Algoritmos Z-Score", tool: "Outlier Detection" },
      { name: "Exportación", value: "JSON / Excel / PDF", tool: "Executive Reporting" }
    ],
    architectureOverview: "Estructura modular en capas: capa de cálculo determinista/estocástico (Python numérico de alta velocidad), capa de detección de anomalías con Machine Learning y capa cognitiva LLM que traduce resultados matemáticos complejos en recomendaciones de negocio accionables.",
    readmeHighlights: {
      problemSolved: "Incertidumbre en la planificación presupuestaria corporativa ante volatilidad macroeconómica y falta de análisis rápido de sensibilidad.",
      keyModules: [
        "Cost Scenario Engine: Modelado de escenarios optimista, base y pesimista con simulación estocástica.",
        "Cash Flow Stress Tester: Evaluación de liquidez ante retrasos de cobranza de 30, 60 y 90 días.",
        "Anomaly Spotter: Detección de patrones inusuales en centros de costos históricos.",
        "CFO Advisor Agent: Asistente conversacional para responder preguntas complejas de rentabilidad y EBITDA."
      ],
      dataPipeline: "Ingesta de Balances/Presupuestos -> Limpieza y Vectorización NumPy -> Ejecución de Simulador de Escenarios -> Interpretación Agéntica -> Gráficos & Minuta.",
      observability: "Validación matemática determinista antes de la generación de texto para garantizar 0% de discrepancia numérica en balances."
    },
    capabilities: [
      {
        title: "Simulación de Sensibilidad y Estrés",
        description: "Modela el impacto de aumentos de costos fijos, tasa de interés y devaluación sobre el margen operativo.",
        tools: ["run_montecarlo_simulation", "calculate_ebitda_sensitivity", "project_cash_burn_rate"]
      },
      {
        title: "Auditoría Predictiva de Gastos",
        description: "Identifica centros de costo con variaciones estadísticas anómalas respecto al presupuesto proyectado.",
        tools: ["detect_budget_deviations", "benchmark_unit_costs", "generate_cfo_report"]
      }
    ],
    presets: [
      {
        id: "cost-simulation",
        label: "Simulación de Estrés Presupuestario (Inflación + Devaluación)",
        userPrompt: "Simular impacto en EBITDA de un incremento del 25% en costos de materias primas y depreciación del 15% del tipo de cambio para el Q4.",
        description: "Ejecución de simulación Monte Carlo con 5,000 iteraciones y generación de reporte ejecutivo.",
        steps: [
          {
            step: 1,
            actor: "tool",
            name: "run_montecarlo_simulation()",
            content: "Ejecutando 5,000 corridas de simulación estocástica en matriz NumPy...",
            metadata: {
              toolName: "run_montecarlo_simulation",
              params: { raw_materials_increase: 0.25, fx_depreciation: 0.15, iterations: 5000 },
              result: {
                baseline_ebitda_margin: "24.5%",
                projected_ebitda_margin_mean: "17.8%",
                worst_case_5_percentile: "13.2%",
                cash_runway_impact: "-2.4 meses"
              },
              latencyMs: 195,
              status: "success"
            }
          },
          {
            step: 2,
            actor: "agent",
            name: "Financial Quantitative Agent",
            content: "📊 **Informe de Sensibilidad Financiera (Q4):**\n\n* **Margen EBITDA Proyectado:** Caída de **24.5%** a **17.8%** (Impacto directo de -6.7 pp).\n* **Escenario de Máximo Estrés (P5):** Margen mínimo en **13.2%**.\n* **Recomendación de Mitigación:**\n  1. Trasladar al menos un **8.5%** de ajuste en precio final a clientes del segmento Tier-1.\n  2. Cobertura cambiaria (Hedging/Futuros) por el **60%** de las obligaciones de importación del trimestre para proteger el flujo de caja.",
            metadata: { latencyMs: 340, tokens: 280 }
          }
        ]
      }
    ]
  },
  {
    id: "sistema-multiagente-rrhh",
    title: "Sistema Multi-Agente de RRHH & Protocolo MCP",
    badge: "Enterprise Orchestrator & MCP",
    category: "AI Multi-Agent",
    tagline: "Orquestador de soporte corporativo con enrutamiento inteligente por departamentos y Model Context Protocol.",
    summary: "Arquitectura multi-agente diseñada para simular entornos de producción empresarial reales, clasificando y resolviendo tickets de RRHH, Soporte IT, Finanzas y Legales con trazabilidad completa en Langfuse.",
    githubUrl: "https://github.com/Elocss/Sistema-de-Multi-Agent.git",
    techStack: ["Python", "OpenAI API", "MCP (Model Context Protocol)", "LangGraph", "ChromaDB", "Langfuse", "Streamlit"],
    metrics: [
      { name: "Clasificación Automática", value: "98.7% Accuracy", tool: "MCP Router" },
      { name: "Departamentos", value: "HR, IT, Finance, Legal", tool: "Ecosistema Multi-Agente" },
      { name: "Vector Store", value: "ChromaDB", tool: "Políticas Internas RAG" },
      { name: "Monitoreo", value: "Langfuse Spans", tool: "Latencia & Tokens" }
    ],
    architectureOverview: "Orquestador central con Router basado en MCP que recibe solicitudes de empleados, clasifica el dominio y delega a subagentes especializados con acceso a bases de conocimiento RAG aisladas.",
    readmeHighlights: {
      problemSolved: "Saturación de departamentos corporativos por consultas repetitivas de políticas de vacaciones, reintegros, beneficios y soporte técnico.",
      keyModules: [
        "MCP Context Gateway: Estandarización de contexto y herramientas según el estándar Model Context Protocol.",
        "HR Policy Expert: Asistente con RAG sobre convenios colectivos, días libres y licencias.",
        "Expense & Reimbursement Agent: Validación automática de recibos y políticas de viáticos.",
        "Langfuse Observability Pipeline: Panel de control de tiempos de atención y costo computacional."
      ],
      dataPipeline: "Consulta Empleado -> Router MCP -> Subagente de Dominio -> Consulta RAG a ChromaDB -> Ejecución de Herramienta Interna -> Respuesta al Empleado.",
      observability: "Métricas completas de observabilidad para evaluar qué subagentes resuelven de forma 100% autónoma y cuáles requieren escalado humano."
    },
    capabilities: [
      {
        title: "Enrutamiento Departamental Autónomo",
        description: "Deriva automáticamente al subagente correcto (Recursos Humanos, IT, Finanzas, Legal) sin intervención manual.",
        tools: ["route_department_mcp", "fetch_internal_policy", "create_jira_hr_ticket"]
      }
    ],
    presets: [
      {
        id: "hr-inquiry",
        label: "Consulta de Licencia y Políticas de Vacaciones",
        userPrompt: "¿Cuántos días de licencia por examen me corresponden y con cuánta anticipación debo solicitarlos en el portal?",
        description: "Enrutamiento vía MCP hacia el agente de RRHH y consulta RAG al manual de políticas.",
        steps: [
          {
            step: 1,
            actor: "orchestrator",
            name: "MCP Router Gateway",
            content: "Identificando dominio: [RECURSOS_HUMANOS / LICENCIAS_ACADÉMICAS]. Despachando consulta al Subagente 'HR-Policy-Specialist'...",
            metadata: { latencyMs: 110, tokens: 45 }
          },
          {
            step: 2,
            actor: "tool",
            name: "query_hr_knowledge_base()",
            content: "Búsqueda vectorial en ChromaDB: [convenio_laboral, licencias_estudio, preaviso]...",
            metadata: {
              toolName: "query_hr_knowledge_base",
              result: { policy_code: "HR-POL-042", article: "Art. 18: Licencias Especiales para Exámenes Universitarios" },
              latencyMs: 220,
              status: "success"
            }
          },
          {
            step: 3,
            actor: "agent",
            name: "HR AI Specialist",
            content: "📚 **Política de Licencia por Examen:**\n\n* Te corresponden **hasta 10 días hábiles por año calendario** (máximo 2 días por examen universitario).\n* **Anticipación requerida:** Debes cargar la solicitud en el portal con un mínimo de **48 horas hábiles de anticipación**.\n* **Comprobante:** Tienes hasta 72 horas posteriores para adjuntar el certificado de examen firmado por la facultad.",
            metadata: { latencyMs: 290, tokens: 175 }
          }
        ]
      }
    ]
  },
  {
    id: "ecosistema-industrial-ia",
    title: "Ecosistema Multiagente de Mantenimiento Industrial",
    badge: "Industrial & Heavy RAG",
    category: "Industrial AI",
    tagline: "Agentes autónomos para plantas industriales: RAG sobre manuales de 2,000+ págs y conciliación con API de SAP.",
    summary: "Sistema de alta criticidad para líneas de producción y minería que unifica flujos de resolución de fallas mecánicas en segundos, auditoría de facturas y análisis semántico predictivo de bitácoras operativas.",
    githubUrl: "https://github.com/Elocss/ecosistema-mantenimiento-industrial-ia.git",
    techStack: ["Python", "LangGraph", "LangChain", "Qdrant", "OCR", "SAP API", "Pydantic"],
    metrics: [
      { name: "Resolución de Fallas", value: "5 Segundos", tool: "RAG sobre 2,000+ págs" },
      { name: "Ciclo de Auditoría", value: "De días a minutos", tool: "Tool Calling con SAP" },
      { name: "Prevención Paradas", value: "Análisis Semántico", tool: "Predictive Bitácoras" },
      { name: "Base Vectorial", value: "Qdrant / Milvus", tool: "High-Throughput Vector DB" }
    ],
    architectureOverview: "Orquestación en grafo con LangGraph: Ingesta OCR de manuales mecánicos y diagramas eléctricos, indexación densa en Qdrant, interfaz de Tool Calling para verificar stock de repuestos en SAP y disparar alertas preventivas.",
    readmeHighlights: {
      problemSolved: "Paradas no planificadas de maquinaria crítica que generaban pérdidas millonarias debido a la lentitud en buscar especificaciones en manuales físicos extensos.",
      keyModules: [
        "Heavy Manuals RAG: Búsqueda semántica instantánea sobre más de 2,000 páginas de manuales de maquinaria pesada.",
        "SAP Invoice & Spare Parts Reconciler: Integración de Tool Calling con SAP para verificar número de parte y stock.",
        "Predictive Log Semantic Miner: Pipeline de análisis continuo sobre bitácoras de turnos para detectar anomalías antes de la falla."
      ],
      dataPipeline: "Manuales PDF -> Chunks Semánticos -> Embeddings en Qdrant -> Agente de Diagnóstico -> Consulta en tiempo real a SAP -> Instrucciones paso a paso al operador.",
      observability: "Monitoreo riguroso de latencia para garantizar que las respuestas de emergencia en planta se entreguen en menos de 5 segundos."
    },
    capabilities: [
      {
        title: "Diagnóstico RAG Crítico de Maquinaria",
        description: "Extrae procedimientos de emergencia y diagramas de conexionado en menos de 5 segundos para técnicos de planta.",
        tools: ["search_machinery_manuals", "check_sap_spare_parts", "generate_step_by_step_fix"]
      }
    ],
    presets: [
      {
        id: "turbine-alert",
        label: "Diagnóstico de Falla Hidráulica en Prensa Principal",
        userPrompt: "Alarma 'ERR-HYDR-804' en Prensa Hidráulica Komatsu 500T: Caída de presión en circuito secundario y sobrecalentamiento a 88°C.",
        description: "Búsqueda en manual técnico de 2,400 páginas y verificación de válvulas de repuesto en SAP.",
        steps: [
          {
            step: 1,
            actor: "tool",
            name: "search_machinery_manuals()",
            content: "Recuperando protocolo de emergencia en manual de 2,400 páginas (Qdrant Rerank)...",
            metadata: {
              toolName: "search_machinery_manuals",
              result: { manual: "Komatsu_500T_RevB.pdf", section: "Capítulo 7.4 - Circuito de Presión Proporcional", page: 1482 },
              latencyMs: 340,
              status: "success"
            }
          },
          {
            step: 2,
            actor: "tool",
            name: "check_sap_spare_parts()",
            content: "Consultando inventario en SAP para válvula solenoide ref. #VALV-KM-992...",
            metadata: {
              toolName: "check_sap_spare_parts",
              result: { in_stock: 4, warehouse_location: "Depósito Central - Pasillo 4B", supplier_lead_time: "Inmediato" },
              latencyMs: 210,
              status: "success"
            }
          },
          {
            step: 3,
            actor: "agent",
            name: "Industrial Maintenance Agent",
            content: "🚨 **Protocolo de Acción para Alarma ERR-HYDR-804:**\n\n1. **Acción Inmediata:** Desconectar la electrobomba secundaria en el panel de control 3.\n2. **Causa Probable:** Obstrucción o falla de sello en la válvula proporcional solenoide de alivio (Página 1482 del manual).\n3. **Stock en Planta:** Hay **4 unidades de repuesto (Ref. #VALV-KM-992)** disponibles en el *Depósito Central (Pasillo 4B)*.\n4. **Tiempo estimado de recambio:** 25 minutos sin requerir parada total de línea.",
            metadata: { latencyMs: 410, tokens: 320 }
          }
        ]
      }
    ]
  }
];

export const upcomingDataScienceProjects = [
  {
    id: "observatorio-socioeconomico",
    title: "Observatorio Predictivo de Tendencias Socioeconómicas & Laborales",
    category: "Data Science & Predictive Analytics",
    tagline: "Modelo predictivo de demanda laboral y competencias tecnológicas emergentes para el sector productivo.",
    organization: "INNOVA LAB / Gerencia Operativa de Innovación",
    date: "Lanzamiento: Diciembre 2026",
    features: [
      "Pipeline de ingesta de miles de ofertas laborales y datos socioeconómicos.",
      "Modelos de clasificación y clustering no supervisado para detección de nuevas habilidades requeridas.",
      "Dashboard interactivo y proyecciones de demanda a 3 años."
    ],
    status: "En desarrollo activo (PROYECTO FINAL)"
  },
  {
    id: "analisis-estadistico-empresarial",
    title: "Plataforma de Reportes Estadísticos & Machine Learning",
    category: "Data Science & Business Intelligence",
    tagline: "Ecosistema de inferencia estadística, clustering de clientes y análisis de series temporales.",
    organization: "Instituto Humai / Data Science Especialización",
    date: "Próximamente",
    features: [
      "Modelos de Machine Learning (Scikit-Learn, PyTorch) para scoring predictivo.",
      "Automatización de pipelines ETL y generación de reportes ejecutivos.",
      "Análisis multivariado y pruebas de hipótesis automatizadas."
    ],
    status: "En fase de experimentación y benchmarking"
  }
];
