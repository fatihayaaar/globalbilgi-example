FROM amazoncorretto:19

WORKDIR /app
COPY build/libs/example-0.0.1.jar example-0.0.1.jar

ENV DATASOURCE_URL=jdbc:postgresql://localhost:5432/global_bilgi_example
ENV DATASOURCE_USERNAME=fatih
ENV DATASOURCE_PASSWORD=fatih

ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-jar", "/app/example-0.0.1.jar"]