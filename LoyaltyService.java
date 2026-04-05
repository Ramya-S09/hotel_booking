# ─── Server ────────────────────────────────────────────────────────────────────
server.port=5000

# ─── Database (MySQL) ──────────────────────────────────────────────────────────
# Switch to H2 for quick testing by commenting MySQL lines and uncommenting H2 ones
spring.datasource.url=jdbc:mysql://localhost:3306/luxestay?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# ─── H2 In-Memory (for development without MySQL) ─────────────────────────────
# spring.datasource.url=jdbc:h2:mem:luxestay;DB_CLOSE_DELAY=-1
# spring.datasource.driver-class-name=org.h2.Driver
# spring.datasource.username=sa
# spring.datasource.password=
# spring.h2.console.enabled=true
# spring.h2.console.path=/h2-console

# ─── JPA / Hibernate ──────────────────────────────────────────────────────────
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# ─── JWT ──────────────────────────────────────────────────────────────────────
app.jwt.secret=LuxeStaySecretKey2024@SuperSecure@HotelBookingJWTSecret@256bits!
app.jwt.expiration-ms=86400000

# ─── CORS ─────────────────────────────────────────────────────────────────────
app.cors.allowed-origins=http://localhost:3000
