/** High-level project architectures. Reused from Za Studio or grounded in local source.
 * Provenance and verified adaptations are documented in docs/project-architecture-sources.md.
 */
export type ArchitectureNodeKind = 'client' | 'edge' | 'service' | 'worker' | 'data' | 'queue' | 'external';
export type ArchitectureNode = { id: string; label: string; kind: ArchitectureNodeKind; note?: string };
export type ProjectArchitecture = {
  lanes: { label: string; nodes: ArchitectureNode[] }[];
  edges: { from: string; to: string; label?: string; async?: boolean }[];
  caption: { title: string; description: string };
  provenance: { kind: 'za-studio' | 'local-source'; sources: string[]; notes?: string[] };
};

export const projectArchitectures: Record<string, ProjectArchitecture> = {
  "bee3a": {
    "lanes": [
      {
        "label": "Clients",
        "nodes": [
          {
            "id": "customers",
            "label": "Customers",
            "kind": "client",
            "note": "Shop link · PWA"
          },
          {
            "id": "staff",
            "label": "Shop staff",
            "kind": "client",
            "note": "Till · calendar · orders"
          },
          {
            "id": "admin",
            "label": "Platform admin",
            "kind": "client",
            "note": "Admin apps"
          }
        ]
      },
      {
        "label": "API",
        "nodes": [
          {
            "id": "api",
            "label": "Bee3a API",
            "kind": "service",
            "note": "Express · tenant & role checks"
          }
        ]
      },
      {
        "label": "Systems",
        "nodes": [
          {
            "id": "pos",
            "label": "Till / POS",
            "kind": "service",
            "note": "Stock & receipts"
          },
          {
            "id": "bookings",
            "label": "Bookings",
            "kind": "service",
            "note": "One calendar for all staff"
          },
          {
            "id": "orders",
            "label": "Online orders",
            "kind": "service",
            "note": "Confirm · prepare · hand over"
          },
          {
            "id": "ai",
            "label": "AI tools",
            "kind": "external",
            "note": "Cloudflare Workers AI"
          }
        ]
      },
      {
        "label": "Data & messaging",
        "nodes": [
          {
            "id": "db",
            "label": "MongoDB",
            "kind": "data",
            "note": "Isolated per business"
          },
          {
            "id": "whatsapp",
            "label": "WhatsApp",
            "kind": "external",
            "note": "Receipts & reminders"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "customers",
        "to": "api",
        "label": "HTTPS"
      },
      {
        "from": "staff",
        "to": "api"
      },
      {
        "from": "admin",
        "to": "api"
      },
      {
        "from": "api",
        "to": "pos"
      },
      {
        "from": "api",
        "to": "bookings"
      },
      {
        "from": "api",
        "to": "orders"
      },
      {
        "from": "api",
        "to": "ai"
      },
      {
        "from": "pos",
        "to": "db"
      },
      {
        "from": "bookings",
        "to": "db"
      },
      {
        "from": "orders",
        "to": "db"
      },
      {
        "from": "pos",
        "to": "whatsapp",
        "label": "Receipt",
        "async": true
      },
      {
        "from": "bookings",
        "to": "whatsapp",
        "label": "Reminder",
        "async": true
      }
    ],
    "caption": {
      "title": "How it fits together",
      "description": "One API serves every shop; each business only switches on the systems it needs."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#bee3a"
      ]
    }
  },
  "saas-erp": {
    "lanes": [
      {
        "label": "Clients",
        "nodes": [
          {
            "id": "users",
            "label": "Company users",
            "kind": "client",
            "note": "25+ tenants"
          }
        ]
      },
      {
        "label": "Routing",
        "nodes": [
          {
            "id": "resolver",
            "label": "Tenant resolver",
            "kind": "edge",
            "note": "Request → tenant schema"
          }
        ]
      },
      {
        "label": "Finance engine",
        "nodes": [
          {
            "id": "cogs",
            "label": "Inventory & COGS",
            "kind": "service",
            "note": "Multi-currency"
          },
          {
            "id": "journal",
            "label": "Journal posting",
            "kind": "service",
            "note": "Double-entry · idempotent"
          },
          {
            "id": "payroll",
            "label": "Payroll",
            "kind": "worker",
            "note": "Calculate → lock → finalize → post"
          }
        ]
      },
      {
        "label": "PostgreSQL",
        "nodes": [
          {
            "id": "schema-a",
            "label": "Schema · Tenant A",
            "kind": "data"
          },
          {
            "id": "schema-b",
            "label": "Schema · Tenant B",
            "kind": "data"
          },
          {
            "id": "schema-n",
            "label": "Schema · Tenant N",
            "kind": "data",
            "note": "25+ in production"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "users",
        "to": "resolver",
        "label": "HTTPS"
      },
      {
        "from": "resolver",
        "to": "cogs"
      },
      {
        "from": "resolver",
        "to": "journal"
      },
      {
        "from": "resolver",
        "to": "payroll"
      },
      {
        "from": "cogs",
        "to": "journal",
        "label": "Posts entries"
      },
      {
        "from": "payroll",
        "to": "journal",
        "label": "Posts entries"
      },
      {
        "from": "journal",
        "to": "schema-a",
        "label": "Transaction"
      },
      {
        "from": "journal",
        "to": "schema-b"
      },
      {
        "from": "journal",
        "to": "schema-n"
      }
    ],
    "caption": {
      "title": "Every tenant, its own schema",
      "description": "Each request is routed to its tenant’s schema; every financial module posts through one double-entry journal."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#saas-erp"
      ]
    }
  },
  "ghaith-adex": {
    "lanes": [
      {
        "label": "Apps",
        "nodes": [
          {
            "id": "customer",
            "label": "Customer app",
            "kind": "client",
            "note": "Google Play · App Store"
          },
          {
            "id": "driver",
            "label": "Driver app",
            "kind": "client",
            "note": "Tours & deliveries"
          }
        ]
      },
      {
        "label": "API & real-time",
        "nodes": [
          {
            "id": "api",
            "label": "Django REST API",
            "kind": "service",
            "note": "60+ handlers"
          },
          {
            "id": "ws",
            "label": "Channels",
            "kind": "edge",
            "note": "WebSocket notifications"
          }
        ]
      },
      {
        "label": "Domain",
        "nodes": [
          {
            "id": "orders",
            "label": "Orders",
            "kind": "service",
            "note": "Atomic lifecycle"
          },
          {
            "id": "ledger",
            "label": "Coupon ledger",
            "kind": "service",
            "note": "Reserve → settle → release"
          },
          {
            "id": "tours",
            "label": "Celery workers",
            "kind": "worker",
            "note": "Recurring tours & reminders"
          }
        ]
      },
      {
        "label": "Infrastructure",
        "nodes": [
          {
            "id": "db",
            "label": "Database",
            "kind": "data",
            "note": "Row-level locks · constraints"
          },
          {
            "id": "redis",
            "label": "Redis",
            "kind": "queue",
            "note": "Broker & channel layer"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "customer",
        "to": "api",
        "label": "REST"
      },
      {
        "from": "driver",
        "to": "api"
      },
      {
        "from": "ws",
        "to": "customer",
        "label": "Live updates",
        "async": true
      },
      {
        "from": "ws",
        "to": "driver",
        "async": true
      },
      {
        "from": "api",
        "to": "orders"
      },
      {
        "from": "api",
        "to": "ledger"
      },
      {
        "from": "orders",
        "to": "ledger",
        "label": "Reserve"
      },
      {
        "from": "orders",
        "to": "ws",
        "label": "Order events",
        "async": true
      },
      {
        "from": "orders",
        "to": "db"
      },
      {
        "from": "ledger",
        "to": "db",
        "label": "Locked rows"
      },
      {
        "from": "redis",
        "to": "tours",
        "label": "Scheduled jobs",
        "async": true
      }
    ],
    "caption": {
      "title": "Orders, ledger and live updates",
      "description": "Order and coupon changes commit atomically, then fan out to the apps over WebSockets; Celery runs the recurring tours."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#ghaith-adex"
      ]
    }
  },
  "china-erp": {
    "lanes": [
      {
        "label": "Clients",
        "nodes": [
          {
            "id": "companies",
            "label": "Company staff",
            "kind": "client",
            "note": "CSV · XLSX uploads"
          }
        ]
      },
      {
        "label": "Import",
        "nodes": [
          {
            "id": "importer",
            "label": "Import pipeline",
            "kind": "worker",
            "note": "One transaction per row"
          },
          {
            "id": "errors",
            "label": "Error report",
            "kind": "data",
            "note": "Only the rows that failed"
          }
        ]
      },
      {
        "label": "Finance",
        "nodes": [
          {
            "id": "finance",
            "label": "Financial services",
            "kind": "service",
            "note": "Transaction-safe"
          },
          {
            "id": "reports",
            "label": "Reporting",
            "kind": "service",
            "note": "Balance sheets · FX"
          }
        ]
      },
      {
        "label": "Data",
        "nodes": [
          {
            "id": "db",
            "label": "PostgreSQL",
            "kind": "data",
            "note": "Shared company-wide records"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "companies",
        "to": "importer",
        "label": "Up to 50K+ rows"
      },
      {
        "from": "importer",
        "to": "errors",
        "label": "Bad rows"
      },
      {
        "from": "importer",
        "to": "finance",
        "label": "Valid rows"
      },
      {
        "from": "finance",
        "to": "db",
        "label": "Atomic writes"
      },
      {
        "from": "db",
        "to": "reports",
        "label": "Aggregation"
      }
    ],
    "caption": {
      "title": "Imports that fail one row at a time",
      "description": "Every row runs in its own transaction, so a bad row is reported and the rest of the batch still lands."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#china-erp",
        "../adex/china-system-django/docs/adr/0004-shared-company-wide-data.md"
      ],
      "notes": [
        "Updated the company-data scope to the current shared-records decision; other diagram structure reused from Za Studio."
      ]
    }
  },
  "sahifatty": {
    "lanes": [
      {
        "label": "People",
        "nodes": [
          {
            "id": "students",
            "label": "Students & families",
            "kind": "client",
            "note": "Child accounts"
          },
          {
            "id": "teachers",
            "label": "Teachers",
            "kind": "client",
            "note": "Groups & assessments"
          }
        ]
      },
      {
        "label": "Identity",
        "nodes": [
          {
            "id": "auth",
            "label": "Auth",
            "kind": "edge",
            "note": "HTTP-only JWT · OTP"
          },
          {
            "id": "oauth",
            "label": "Google · Apple · Facebook",
            "kind": "external",
            "note": "Social sign-in"
          }
        ]
      },
      {
        "label": "Learning API",
        "nodes": [
          {
            "id": "content",
            "label": "Quran content",
            "kind": "service",
            "note": "6,236 verses"
          },
          {
            "id": "learning",
            "label": "Assessments & plans",
            "kind": "service",
            "note": "Weighted progress"
          },
          {
            "id": "groups",
            "label": "Teacher groups",
            "kind": "service",
            "note": "Role-based permissions"
          }
        ]
      },
      {
        "label": "Data & push",
        "nodes": [
          {
            "id": "db",
            "label": "Database",
            "kind": "data",
            "note": "Transactional bulk operations"
          },
          {
            "id": "push",
            "label": "OneSignal",
            "kind": "external",
            "note": "Notifications"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "students",
        "to": "auth"
      },
      {
        "from": "teachers",
        "to": "auth"
      },
      {
        "from": "auth",
        "to": "oauth",
        "label": "OAuth"
      },
      {
        "from": "auth",
        "to": "content"
      },
      {
        "from": "auth",
        "to": "learning"
      },
      {
        "from": "auth",
        "to": "groups"
      },
      {
        "from": "content",
        "to": "db"
      },
      {
        "from": "learning",
        "to": "db"
      },
      {
        "from": "groups",
        "to": "db"
      },
      {
        "from": "learning",
        "to": "push",
        "label": "Notifications",
        "async": true
      }
    ],
    "caption": {
      "title": "Learning behind one front door",
      "description": "Every request passes the same identity layer before it reaches content, assessments or groups."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#sahifatty"
      ]
    }
  },
  "aljadriya": {
    "lanes": [
      {
        "label": "People",
        "nodes": [
          {
            "id": "learners",
            "label": "Learners",
            "kind": "client"
          },
          {
            "id": "corporate",
            "label": "Corporate clients",
            "kind": "client"
          }
        ]
      },
      {
        "label": "Web",
        "nodes": [
          {
            "id": "web",
            "label": "Next.js web app",
            "kind": "edge",
            "note": "Frontend"
          }
        ]
      },
      {
        "label": "API",
        "nodes": [
          {
            "id": "placement",
            "label": "Placement & study plans",
            "kind": "service",
            "note": "AI-assisted"
          },
          {
            "id": "training",
            "label": "Corporate training",
            "kind": "service",
            "note": "Agreements · local pricing"
          },
          {
            "id": "messaging",
            "label": "Channels",
            "kind": "service",
            "note": "Real-time messaging"
          }
        ]
      },
      {
        "label": "Data",
        "nodes": [
          {
            "id": "db",
            "label": "PostgreSQL",
            "kind": "data"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "learners",
        "to": "web"
      },
      {
        "from": "corporate",
        "to": "web"
      },
      {
        "from": "web",
        "to": "placement",
        "label": "REST"
      },
      {
        "from": "web",
        "to": "training",
        "label": "REST"
      },
      {
        "from": "web",
        "to": "messaging",
        "label": "WebSocket",
        "async": true
      },
      {
        "from": "placement",
        "to": "db"
      },
      {
        "from": "training",
        "to": "db"
      }
    ],
    "caption": {
      "title": "One platform, two kinds of customer",
      "description": "A Next.js front end over Django REST and Channels serves both individual learners and corporate training."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#aljadriya"
      ]
    }
  },
  "sukoon": {
    "lanes": [
      {
        "label": "People",
        "nodes": [
          {
            "id": "renters",
            "label": "Renters",
            "kind": "client"
          },
          {
            "id": "owners",
            "label": "Owners",
            "kind": "client"
          }
        ]
      },
      {
        "label": "Identity",
        "nodes": [
          {
            "id": "auth",
            "label": "Auth",
            "kind": "edge",
            "note": "Token rotation · Argon2 · rate limits"
          }
        ]
      },
      {
        "label": "API",
        "nodes": [
          {
            "id": "search",
            "label": "Property search",
            "kind": "service",
            "note": "Filters · pagination"
          },
          {
            "id": "booking",
            "label": "Visit booking",
            "kind": "service",
            "note": "No double bookings"
          },
          {
            "id": "channels",
            "label": "Channels",
            "kind": "service",
            "note": "Real-time updates"
          }
        ]
      },
      {
        "label": "Data & media",
        "nodes": [
          {
            "id": "db",
            "label": "PostgreSQL",
            "kind": "data",
            "note": "Indexed queries"
          },
          {
            "id": "redis",
            "label": "Redis",
            "kind": "data",
            "note": "Channel layer"
          },
          {
            "id": "media",
            "label": "Cloudinary",
            "kind": "external",
            "note": "Property media"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "renters",
        "to": "auth"
      },
      {
        "from": "owners",
        "to": "auth"
      },
      {
        "from": "auth",
        "to": "search"
      },
      {
        "from": "auth",
        "to": "booking"
      },
      {
        "from": "search",
        "to": "db"
      },
      {
        "from": "search",
        "to": "media",
        "label": "Media"
      },
      {
        "from": "booking",
        "to": "db"
      },
      {
        "from": "booking",
        "to": "channels",
        "label": "Status updates",
        "async": true
      },
      {
        "from": "channels",
        "to": "redis"
      }
    ],
    "caption": {
      "title": "Search, book, stay in sync",
      "description": "Hardened identity in front; indexed search and guarded bookings behind it, with Redis-backed Channels for live updates."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#sukoon"
      ]
    }
  },
  "barcode-jackets": {
    "lanes": [
      {
        "label": "People",
        "nodes": [
          {
            "id": "customers",
            "label": "Customers",
            "kind": "client",
            "note": "Design a jacket"
          },
          {
            "id": "admins",
            "label": "Store admins",
            "kind": "client",
            "note": "Multi-store catalogs"
          }
        ]
      },
      {
        "label": "API",
        "nodes": [
          {
            "id": "api",
            "label": "Django REST API",
            "kind": "edge",
            "note": "Swagger · ReDoc"
          }
        ]
      },
      {
        "label": "Services",
        "nodes": [
          {
            "id": "engine",
            "label": "SVG customization engine",
            "kind": "service",
            "note": "Layers · zones · text"
          },
          {
            "id": "catalog",
            "label": "Catalog & inventory",
            "kind": "service",
            "note": "Reservations · pricing"
          },
          {
            "id": "payments",
            "label": "Payments & refunds",
            "kind": "service",
            "note": "Atomic lifecycle"
          }
        ]
      },
      {
        "label": "Data",
        "nodes": [
          {
            "id": "db",
            "label": "PostgreSQL",
            "kind": "data",
            "note": "UUID keys"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "customers",
        "to": "api"
      },
      {
        "from": "admins",
        "to": "api"
      },
      {
        "from": "api",
        "to": "engine"
      },
      {
        "from": "api",
        "to": "catalog"
      },
      {
        "from": "api",
        "to": "payments"
      },
      {
        "from": "catalog",
        "to": "db",
        "label": "Reserve stock"
      },
      {
        "from": "payments",
        "to": "db",
        "label": "Transaction"
      }
    ],
    "caption": {
      "title": "From design to paid order",
      "description": "A service layer keeps customization, stock and money apart, and every payment or refund runs in one transaction."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#barcode-jackets"
      ]
    }
  },
  "ai-call-center": {
    "lanes": [
      {
        "label": "Caller",
        "nodes": [
          {
            "id": "caller",
            "label": "Caller",
            "kind": "client",
            "note": "Browser mic · speaker"
          }
        ]
      },
      {
        "label": "Django",
        "nodes": [
          {
            "id": "views",
            "label": "Call views",
            "kind": "edge",
            "note": "SSE stream"
          },
          {
            "id": "agent",
            "label": "Agent loop",
            "kind": "service",
            "note": "History rebuilt per turn"
          }
        ]
      },
      {
        "label": "Tools",
        "nodes": [
          {
            "id": "tools",
            "label": "Order tools",
            "kind": "service",
            "note": "Menu · order · phone read-back"
          },
          {
            "id": "money",
            "label": "Money words",
            "kind": "worker",
            "note": "Exact Arabic & English amounts"
          }
        ]
      },
      {
        "label": "Models & data",
        "nodes": [
          {
            "id": "llm",
            "label": "OpenAI",
            "kind": "external",
            "note": "Chat · STT · TTS"
          },
          {
            "id": "db",
            "label": "Database",
            "kind": "data",
            "note": "Calls · orders · turn logs"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "caller",
        "to": "views",
        "label": "Speech"
      },
      {
        "from": "views",
        "to": "agent"
      },
      {
        "from": "agent",
        "to": "llm",
        "label": "Tool calls"
      },
      {
        "from": "agent",
        "to": "tools"
      },
      {
        "from": "tools",
        "to": "money"
      },
      {
        "from": "tools",
        "to": "db"
      },
      {
        "from": "views",
        "to": "caller",
        "label": "Reply audio",
        "async": true
      }
    ],
    "caption": {
      "title": "Tools own the facts",
      "description": "The model decides what to do; the tools hold the menu, the order, the prices and the words to say them."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#ai-call-center"
      ],
      "notes": [
        "Classified the OpenAI integration as external rather than a message queue."
      ]
    }
  },
  "jobbee": {
    "lanes": [
      {
        "label": "People",
        "nodes": [
          {
            "id": "cand",
            "label": "Candidates",
            "kind": "client",
            "note": "Search · apply"
          },
          {
            "id": "emp",
            "label": "Employers",
            "kind": "client",
            "note": "Post · review"
          }
        ]
      },
      {
        "label": "Web",
        "nodes": [
          {
            "id": "next",
            "label": "Next.js",
            "kind": "edge",
            "note": "SSR · cookie auth"
          }
        ]
      },
      {
        "label": "API",
        "nodes": [
          {
            "id": "api",
            "label": "Django REST",
            "kind": "service",
            "note": "JWT · filters"
          },
          {
            "id": "geo",
            "label": "Geocoder",
            "kind": "worker",
            "note": "Address → point"
          }
        ]
      },
      {
        "label": "Data",
        "nodes": [
          {
            "id": "db",
            "label": "PostgreSQL + PostGIS",
            "kind": "data",
            "note": "Jobs · applications"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "cand",
        "to": "next"
      },
      {
        "from": "emp",
        "to": "next"
      },
      {
        "from": "next",
        "to": "api",
        "label": "REST"
      },
      {
        "from": "api",
        "to": "geo",
        "label": "On save"
      },
      {
        "from": "api",
        "to": "db"
      }
    ],
    "caption": {
      "title": "From posting to a point on the map",
      "description": "Jobs are geocoded when saved, so location search is a spatial query rather than a text match."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#jobbee"
      ]
    }
  },
  "realstate-management": {
    "lanes": [
      {
        "label": "People",
        "nodes": [
          {
            "id": "tenant",
            "label": "Tenants",
            "kind": "client",
            "note": "Issues · posts · ratings"
          },
          {
            "id": "tech",
            "label": "Technicians",
            "kind": "client",
            "note": "Assigned issues"
          }
        ]
      },
      {
        "label": "API",
        "nodes": [
          {
            "id": "api",
            "label": "Django REST",
            "kind": "service",
            "note": "Djoser · cookie JWT"
          }
        ]
      },
      {
        "label": "Background",
        "nodes": [
          {
            "id": "celery",
            "label": "Celery workers",
            "kind": "worker",
            "note": "Emails · reports"
          },
          {
            "id": "beat",
            "label": "Celery Beat",
            "kind": "worker",
            "note": "Daily reputation"
          }
        ]
      },
      {
        "label": "Data",
        "nodes": [
          {
            "id": "db",
            "label": "PostgreSQL",
            "kind": "data",
            "note": "Apartments · issues · posts"
          },
          {
            "id": "redis",
            "label": "Redis",
            "kind": "queue",
            "note": "Broker"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "tenant",
        "to": "api"
      },
      {
        "from": "tech",
        "to": "api"
      },
      {
        "from": "api",
        "to": "db"
      },
      {
        "from": "api",
        "to": "redis",
        "label": "Tasks",
        "async": true
      },
      {
        "from": "redis",
        "to": "celery",
        "async": true
      },
      {
        "from": "beat",
        "to": "db",
        "label": "Reputation"
      }
    ],
    "caption": {
      "title": "Issues, community and reputation",
      "description": "The API records the work; Celery sends the emails and recomputes every resident's reputation each day."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#alpha-apartments"
      ]
    }
  },
  "ambassador360": {
    "lanes": [
      {
        "label": "Apps",
        "nodes": [
          {
            "id": "admin",
            "label": "Admin (React)",
            "kind": "client",
            "note": "Products · orders"
          },
          {
            "id": "amb",
            "label": "Ambassador (React)",
            "kind": "client",
            "note": "Links · stats"
          },
          {
            "id": "buy",
            "label": "Checkout (Next.js)",
            "kind": "client",
            "note": "Stripe"
          }
        ]
      },
      {
        "label": "API",
        "nodes": [
          {
            "id": "api",
            "label": "Django REST",
            "kind": "service",
            "note": "Scoped JWT"
          }
        ]
      },
      {
        "label": "Services",
        "nodes": [
          {
            "id": "stripe",
            "label": "Stripe",
            "kind": "edge",
            "note": "Checkout sessions"
          },
          {
            "id": "mail",
            "label": "Email",
            "kind": "worker",
            "note": "Order confirmed"
          }
        ]
      },
      {
        "label": "Data",
        "nodes": [
          {
            "id": "db",
            "label": "PostgreSQL",
            "kind": "data",
            "note": "Links · orders"
          },
          {
            "id": "redis",
            "label": "Redis",
            "kind": "queue",
            "note": "Cache · rankings"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "admin",
        "to": "api"
      },
      {
        "from": "amb",
        "to": "api"
      },
      {
        "from": "buy",
        "to": "api"
      },
      {
        "from": "api",
        "to": "stripe",
        "label": "Pay"
      },
      {
        "from": "api",
        "to": "mail",
        "async": true
      },
      {
        "from": "api",
        "to": "db"
      },
      {
        "from": "api",
        "to": "redis",
        "label": "Rankings"
      }
    ],
    "caption": {
      "title": "Three apps, one backend",
      "description": "Scoped tokens keep the admin and ambassador apps apart; Redis keeps the catalogue and leaderboard fast."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#ambassador360"
      ]
    }
  },
  "fei": {
    "lanes": [
      {
        "label": "People",
        "nodes": [
          {
            "id": "pat",
            "label": "Patients",
            "kind": "client",
            "note": "Book · track · order"
          },
          {
            "id": "doc",
            "label": "Doctors",
            "kind": "client",
            "note": "Plans · prescriptions"
          }
        ]
      },
      {
        "label": "API",
        "nodes": [
          {
            "id": "api",
            "label": "Django REST",
            "kind": "service",
            "note": "JWT · roles"
          },
          {
            "id": "ws",
            "label": "Channels",
            "kind": "edge",
            "note": "Chat over WebSockets"
          }
        ]
      },
      {
        "label": "Care",
        "nodes": [
          {
            "id": "book",
            "label": "Bookings",
            "kind": "service",
            "note": "Doctors · labs"
          },
          {
            "id": "plan",
            "label": "Plans",
            "kind": "service",
            "note": "Medicines · prescriptions"
          },
          {
            "id": "ph",
            "label": "Pharmacy",
            "kind": "service",
            "note": "Cart · orders"
          }
        ]
      },
      {
        "label": "Data",
        "nodes": [
          {
            "id": "db",
            "label": "PostgreSQL",
            "kind": "data",
            "note": "Patients · plans · orders"
          },
          {
            "id": "redis",
            "label": "Redis",
            "kind": "queue",
            "note": "Channel layer"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "pat",
        "to": "api"
      },
      {
        "from": "doc",
        "to": "api"
      },
      {
        "from": "pat",
        "to": "ws",
        "async": true
      },
      {
        "from": "doc",
        "to": "ws",
        "async": true
      },
      {
        "from": "api",
        "to": "book"
      },
      {
        "from": "api",
        "to": "plan"
      },
      {
        "from": "api",
        "to": "ph"
      },
      {
        "from": "plan",
        "to": "db"
      },
      {
        "from": "ws",
        "to": "redis"
      }
    ],
    "caption": {
      "title": "Care in one backend",
      "description": "Bookings, plans and the pharmacy share one patient record; chat runs beside them over WebSockets."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#fei-health"
      ]
    }
  },
  "game-discovery": {
    "lanes": [
      {
        "label": "Client",
        "nodes": [
          {
            "id": "ui",
            "label": "React + Chakra UI",
            "kind": "client",
            "note": "Light & dark"
          }
        ]
      },
      {
        "label": "Data",
        "nodes": [
          {
            "id": "hooks",
            "label": "Typed hooks",
            "kind": "service",
            "note": "Games · genres · platforms"
          }
        ]
      },
      {
        "label": "APIs",
        "nodes": [
          {
            "id": "rawg",
            "label": "RAWG",
            "kind": "edge",
            "note": "Game catalogue"
          },
          {
            "id": "drf",
            "label": "Django REST",
            "kind": "service",
            "note": "Reviews · filters"
          }
        ]
      },
      {
        "label": "Storage",
        "nodes": [
          {
            "id": "db",
            "label": "PostgreSQL",
            "kind": "data",
            "note": "Games · reviews"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "ui",
        "to": "hooks",
        "label": "Game query"
      },
      {
        "from": "hooks",
        "to": "rawg"
      },
      {
        "from": "hooks",
        "to": "drf"
      },
      {
        "from": "drf",
        "to": "db"
      }
    ],
    "caption": {
      "title": "One query object",
      "description": "Genre, platform, ordering and search live in one query, so every change refetches exactly once."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#game-hub"
      ]
    }
  },
  "xdisplay-bridge": {
    "lanes": [
      {
        "label": "Mac",
        "nodes": [
          {
            "id": "vd",
            "label": "Virtual display",
            "kind": "service",
            "note": "Normal · Highest"
          },
          {
            "id": "cap",
            "label": "Capture stream",
            "kind": "worker",
            "note": "Matched to pixel size"
          }
        ]
      },
      {
        "label": "Bridge",
        "nodes": [
          {
            "id": "br",
            "label": "Compatibility bridge",
            "kind": "edge",
            "note": "Handshake · mode sync"
          }
        ]
      },
      {
        "label": "Transport",
        "nodes": [
          {
            "id": "jpeg",
            "label": "JPEG transport",
            "kind": "queue",
            "note": "USB, wired"
          }
        ]
      },
      {
        "label": "iPad",
        "nodes": [
          {
            "id": "ipad",
            "label": "XDisplay client",
            "kind": "client",
            "note": "iPad mini 2 · iOS 9.3.5"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "vd",
        "to": "cap"
      },
      {
        "from": "cap",
        "to": "br"
      },
      {
        "from": "br",
        "to": "jpeg",
        "label": "Frames"
      },
      {
        "from": "jpeg",
        "to": "ipad"
      },
      {
        "from": "br",
        "to": "vd",
        "label": "Mode change",
        "async": true
      }
    ],
    "caption": {
      "title": "Keep every size in step",
      "description": "A mode change goes through the virtual display first; the capture stream restarts only when its size matches."
    },
    "provenance": {
      "kind": "za-studio",
      "sources": [
        "../za-studio/src/content/portfolio.json#xdisplay-tahoe-bridge"
      ]
    }
  },
  "key-academy": {
    "lanes": [
      {
        "label": "Clients",
        "nodes": [
          {
            "id": "student",
            "label": "Students",
            "kind": "client",
            "note": "React web · Flutter app"
          },
          {
            "id": "staff",
            "label": "Teachers & admins",
            "kind": "client",
            "note": "Courses · learner progress"
          }
        ]
      },
      {
        "label": "API",
        "nodes": [
          {
            "id": "api",
            "label": "Django REST",
            "kind": "edge",
            "note": "JWT · enrollment checks"
          }
        ]
      },
      {
        "label": "Learning services",
        "nodes": [
          {
            "id": "courses",
            "label": "Courses & enrollment",
            "kind": "service",
            "note": "Lessons · progress · access"
          },
          {
            "id": "exams",
            "label": "Assessments",
            "kind": "service",
            "note": "Questions · results"
          },
          {
            "id": "chat",
            "label": "Channels chat",
            "kind": "service",
            "note": "Rooms · live messages"
          }
        ]
      },
      {
        "label": "Data & media",
        "nodes": [
          {
            "id": "db",
            "label": "PostgreSQL",
            "kind": "data",
            "note": "Courses · accounts · results"
          },
          {
            "id": "redis",
            "label": "Redis",
            "kind": "queue",
            "note": "WebSocket channel layer"
          },
          {
            "id": "media",
            "label": "S3-compatible media",
            "kind": "external",
            "note": "Lesson files · rich content"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "student",
        "to": "api",
        "label": "HTTPS"
      },
      {
        "from": "staff",
        "to": "api"
      },
      {
        "from": "api",
        "to": "courses"
      },
      {
        "from": "api",
        "to": "exams"
      },
      {
        "from": "student",
        "to": "chat",
        "label": "WebSocket",
        "async": true
      },
      {
        "from": "courses",
        "to": "db"
      },
      {
        "from": "exams",
        "to": "db"
      },
      {
        "from": "chat",
        "to": "db"
      },
      {
        "from": "chat",
        "to": "redis",
        "async": true
      },
      {
        "from": "courses",
        "to": "media"
      }
    ],
    "caption": {
      "title": "Learning across web and mobile",
      "description": "Course access, assessments, and live conversations share the same backend and learner records."
    },
    "provenance": {
      "kind": "local-source",
      "sources": [
        "../key-academy-django/project/urls.py",
        "../key-academy-django/project/settings.py",
        "../key-academy-django/chat/routing.py",
        "../key-academy-django/chat/consumers.py",
        "../key-academy-django/requirements.txt",
        "../key-academy-front/package.json",
        "../key_academy_app/pubspec.yaml"
      ]
    }
  },
  "fiva-health": {
    "lanes": [
      {
        "label": "App",
        "nodes": [
          {
            "id": "app",
            "label": "Yotell app",
            "kind": "client",
            "note": "Daily health routines"
          }
        ]
      },
      {
        "label": "API & live updates",
        "nodes": [
          {
            "id": "api",
            "label": "Django REST",
            "kind": "edge",
            "note": "JWT · serializers · services"
          },
          {
            "id": "channels",
            "label": "Channels",
            "kind": "edge",
            "note": "Real-time updates"
          }
        ]
      },
      {
        "label": "Health services",
        "nodes": [
          {
            "id": "records",
            "label": "Health records",
            "kind": "service",
            "note": "Water · steps · sleep · glucose"
          },
          {
            "id": "meds",
            "label": "Medication routines",
            "kind": "service",
            "note": "Schedules · dose logs"
          },
          {
            "id": "workers",
            "label": "Celery & Beat",
            "kind": "worker",
            "note": "Scheduled reminders"
          }
        ]
      },
      {
        "label": "Data & delivery",
        "nodes": [
          {
            "id": "db",
            "label": "PostgreSQL",
            "kind": "data",
            "note": "Profiles · goals · history"
          },
          {
            "id": "redis",
            "label": "Redis",
            "kind": "queue",
            "note": "Task broker · channel layer"
          },
          {
            "id": "push",
            "label": "Firebase Messaging",
            "kind": "external",
            "note": "Push notifications"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "app",
        "to": "api",
        "label": "HTTPS"
      },
      {
        "from": "app",
        "to": "channels",
        "label": "WebSocket",
        "async": true
      },
      {
        "from": "api",
        "to": "records"
      },
      {
        "from": "api",
        "to": "meds"
      },
      {
        "from": "records",
        "to": "db"
      },
      {
        "from": "meds",
        "to": "db"
      },
      {
        "from": "meds",
        "to": "redis",
        "label": "Tasks",
        "async": true
      },
      {
        "from": "redis",
        "to": "workers",
        "async": true
      },
      {
        "from": "workers",
        "to": "db"
      },
      {
        "from": "workers",
        "to": "push",
        "label": "Push",
        "async": true
      },
      {
        "from": "channels",
        "to": "redis",
        "async": true
      }
    ],
    "caption": {
      "title": "Daily routines, timely reminders",
      "description": "Health records and medication schedules feed a shared profile, with background reminders and real-time updates."
    },
    "provenance": {
      "kind": "local-source",
      "sources": [
        "../fiva_health_django/docs/architecture.md",
        "../fiva_health_django/project/urls.py",
        "../fiva_health_django/project/celery.py",
        "../fiva_health_django/project/asgi.py",
        "../fiva_health_django/apps/medications/urls.py",
        "../fiva_health_django/apps/reminders/urls.py",
        "../fiva_health_django/requirements.txt"
      ]
    }
  },
  "nourseen-store": {
    "lanes": [
      {
        "label": "People",
        "nodes": [
          {
            "id": "shopper",
            "label": "Shoppers",
            "kind": "client",
            "note": "Browse · cart · checkout"
          },
          {
            "id": "merchant",
            "label": "Merchants",
            "kind": "client",
            "note": "Products · orders · analytics"
          }
        ]
      },
      {
        "label": "Web",
        "nodes": [
          {
            "id": "store",
            "label": "React storefront",
            "kind": "service",
            "note": "Shopping · account routes"
          },
          {
            "id": "admin",
            "label": "React admin",
            "kind": "service",
            "note": "Catalog · sales views"
          }
        ]
      },
      {
        "label": "Commerce API",
        "nodes": [
          {
            "id": "api",
            "label": "Django REST",
            "kind": "edge",
            "note": "Token authentication"
          },
          {
            "id": "commerce",
            "label": "Commerce services",
            "kind": "service",
            "note": "Products · cart · orders"
          }
        ]
      },
      {
        "label": "Data & images",
        "nodes": [
          {
            "id": "db",
            "label": "Relational database",
            "kind": "data",
            "note": "Django ORM · SQLite default"
          },
          {
            "id": "images",
            "label": "Product media URLs",
            "kind": "external",
            "note": "Catalog image assets"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "shopper",
        "to": "store"
      },
      {
        "from": "merchant",
        "to": "admin"
      },
      {
        "from": "store",
        "to": "api",
        "label": "HTTPS"
      },
      {
        "from": "admin",
        "to": "api"
      },
      {
        "from": "api",
        "to": "commerce"
      },
      {
        "from": "commerce",
        "to": "db"
      },
      {
        "from": "store",
        "to": "images"
      }
    ],
    "caption": {
      "title": "Shopping and store operations",
      "description": "Customer and merchant views share product, cart, and order records through the commerce API."
    },
    "provenance": {
      "kind": "local-source",
      "sources": [
        "../Nourseen/NourseenStore/src/api/client.js",
        "../Nourseen/NourseenStore/package.json",
        "../Nourseen/Nourseen-Store-Backend/api/urls.py",
        "../Nourseen/Nourseen-Store-Backend/api/services/order_service.py",
        "../Nourseen/Nourseen-Store-Backend/api/models/product.py",
        "../Nourseen/Nourseen-Store-Backend/nourseen_backend/settings.py"
      ]
    }
  },
  "za-studio": {
    "lanes": [
      {
        "label": "Source content",
        "nodes": [
          {
            "id": "content",
            "label": "Portfolio JSON",
            "kind": "data",
            "note": "English · Arabic · typed blocks"
          },
          {
            "id": "assets",
            "label": "Media & fonts",
            "kind": "data",
            "note": "Project imagery · identity"
          }
        ]
      },
      {
        "label": "Build",
        "nodes": [
          {
            "id": "build",
            "label": "Vite + TypeScript",
            "kind": "worker",
            "note": "Static production bundle"
          }
        ]
      },
      {
        "label": "Site",
        "nodes": [
          {
            "id": "routes",
            "label": "React Router",
            "kind": "service",
            "note": "Home · work · case studies"
          },
          {
            "id": "state",
            "label": "Theme & motion state",
            "kind": "service",
            "note": "Four themes · Lenis · preferences"
          }
        ]
      },
      {
        "label": "Audience",
        "nodes": [
          {
            "id": "visitors",
            "label": "Visitors",
            "kind": "client",
            "note": "Desktop · mobile · keyboard"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "content",
        "to": "build"
      },
      {
        "from": "assets",
        "to": "build"
      },
      {
        "from": "build",
        "to": "routes",
        "label": "Bundle"
      },
      {
        "from": "routes",
        "to": "state"
      },
      {
        "from": "routes",
        "to": "visitors",
        "label": "Render"
      },
      {
        "from": "state",
        "to": "visitors"
      }
    ],
    "caption": {
      "title": "One content system, a complete studio",
      "description": "Typed bilingual content and local media become a static site with shared routing, themes, and motion."
    },
    "provenance": {
      "kind": "local-source",
      "sources": [
        "../za-studio/src/App.tsx",
        "../za-studio/src/content/types.ts",
        "../za-studio/src/content/index.ts",
        "../za-studio/src/state/AppState.tsx",
        "../za-studio/src/lib/scroll.tsx",
        "../za-studio/package.json"
      ]
    }
  },
  "assignment-reports-auditor": {
    "lanes": [
      {
        "label": "Input",
        "nodes": [
          {
            "id": "files",
            "label": "Assessment exports",
            "kind": "data",
            "note": "XLSX · XLS · CSV"
          }
        ]
      },
      {
        "label": "Interfaces",
        "nodes": [
          {
            "id": "web",
            "label": "Browser interface",
            "kind": "client",
            "note": "Local Flask app"
          },
          {
            "id": "desktop",
            "label": "Desktop interface",
            "kind": "client",
            "note": "Tkinter"
          }
        ]
      },
      {
        "label": "Processing",
        "nodes": [
          {
            "id": "processor",
            "label": "pandas pipeline",
            "kind": "worker",
            "note": "Read · normalize · detect · group"
          }
        ]
      },
      {
        "label": "Results",
        "nodes": [
          {
            "id": "review",
            "label": "Review table",
            "kind": "service",
            "note": "Search · filters · sorting"
          },
          {
            "id": "exports",
            "label": "Excel & CSV",
            "kind": "data",
            "note": "Formatted report exports"
          },
          {
            "id": "clipboard",
            "label": "Clipboard",
            "kind": "external",
            "note": "Copy the result table"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": "files",
        "to": "web",
        "label": "Upload"
      },
      {
        "from": "files",
        "to": "desktop",
        "label": "Select files"
      },
      {
        "from": "web",
        "to": "processor"
      },
      {
        "from": "desktop",
        "to": "processor"
      },
      {
        "from": "processor",
        "to": "review"
      },
      {
        "from": "processor",
        "to": "exports"
      },
      {
        "from": "review",
        "to": "clipboard"
      }
    ],
    "caption": {
      "title": "From source reports to one review table",
      "description": "Both interfaces use the same processor to normalize assessment exports and collect each learner’s outstanding work."
    },
    "provenance": {
      "kind": "local-source",
      "sources": [
        "../reports_el7ag/app.py",
        "../reports_el7ag/app_tk.py",
        "../reports_el7ag/web_app.py",
        "../reports_el7ag/processor.py",
        "../reports_el7ag/README.md"
      ]
    }
  }
};
