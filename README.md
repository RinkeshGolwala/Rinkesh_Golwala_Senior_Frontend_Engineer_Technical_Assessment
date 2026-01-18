# Doctor Booking Application

A modern doctor booking application built with Next.js and a component library workspace, featuring hybrid SSR/CSR architecture for optimal performance and SEO.

## Application Flow Chart

```mermaid
graph TD
    A[Landing Page] -->|SSR| B[Doctors List with Pagination]
    B --> C{Load More Doctors?}
    C -->|Yes| D[Next Page API Call]
    D --> B
    C -->|No| E[Select Doctor]
    E -->|SSR| F[Doctor Details Page]
    F --> G[Select Date]
    G -->|CSR| H[Available Time Slots]
    H --> I[Select Time Slot]
    I --> J[Booking Confirmation Modal]
    J --> K{Confirm Booking?}
    K -->|Yes| L[POST Booking API]
    K -->|No| F
    L --> M[Success Screen]
    M --> N[Back to Doctors List]
    
    O[Bookings Page] -->|CSR| P[GET Bookings API]
    P --> Q[Display Bookings List]
    Q --> R{Cancel Booking?}
    R -->|Yes| S[Confirmation Modal]
    R -->|No| Q
    S --> T{Confirm Cancel?}
    T -->|Yes| U[PATCH Booking API]
    T -->|No| Q
    U --> V[Update Booking Status]
    V --> Q
    
    B -.->|Navigation| O
    F -.->|Navigation| O
    M -.->|Navigation| O
    
    style A fill:#e1f5fe
    style B fill:#e8f5e8
    style F fill:#e8f5e8
    style O fill:#fff3e0
    style M fill:#e8f5e8
    style L fill:#ffebee
    style U fill:#ffebee
```