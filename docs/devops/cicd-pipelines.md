---
sidebar_position: 3
---

# CI/CD Pipelines with GitLab CI

Learn how to automate building, testing, and deploying your Java applications with GitLab CI/CD.

## What is CI/CD?

### Continuous Integration (CI)
Automatically building and testing code every time changes are pushed to version control.

### Continuous Deployment (CD)
Automatically deploying code to production after passing all tests.

## Why CI/CD?

- **Faster Delivery**: Ship features and fixes faster
- **Early Bug Detection**: Catch issues before they reach production
- **Consistent Builds**: Same process every time
- **Reduced Manual Work**: Automate repetitive tasks
- **Confidence**: Deploy with confidence knowing tests pass

## GitLab CI/CD

GitLab CI/CD is built directly into GitLab. It uses a `.gitlab-ci.yml` file in your repository root to define your pipeline.

## Basic Pipeline Structure

```yaml
stages:
  - build
  - test
  - deploy

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"

cache:
  paths:
    - .m2/repository
    - target/
```

## Simple Java Pipeline

Create a `.gitlab-ci.yml` file in your repository root:

```yaml
image: maven:3.9-eclipse-temurin-17

stages:
  - build
  - test

build:
  stage: build
  script:
    - mvn clean compile
  artifacts:
    paths:
      - target/
    expire_in: 1 hour

test:
  stage: test
  script:
    - mvn test
  artifacts:
    when: always
    reports:
      junit:
        - target/surefire-reports/TEST-*.xml
```

## Complete CI/CD Pipeline

A production-ready pipeline with build, test, quality checks, and deployment:

```yaml
image: maven:3.9-eclipse-temurin-17

stages:
  - build
  - test
  - quality
  - package
  - deploy

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"
  DOCKER_DRIVER: overlay2

cache:
  paths:
    - .m2/repository

# Build the application
build:
  stage: build
  script:
    - mvn clean compile
  artifacts:
    paths:
      - target/
    expire_in: 1 hour

# Run unit tests
unit-tests:
  stage: test
  script:
    - mvn test
  artifacts:
    when: always
    reports:
      junit:
        - target/surefire-reports/TEST-*.xml
    paths:
      - target/surefire-reports/

# Run integration tests
integration-tests:
  stage: test
  script:
    - mvn verify -DskipUnitTests
  artifacts:
    when: always
    reports:
      junit:
        - target/failsafe-reports/TEST-*.xml

# Code quality checks
code-quality:
  stage: quality
  script:
    - mvn checkstyle:check
    - mvn pmd:check
  allow_failure: true

# Security scanning
security-scan:
  stage: quality
  script:
    - mvn dependency-check:check
  artifacts:
    when: always
    paths:
      - target/dependency-check-report.html
  allow_failure: true

# Package application
package:
  stage: package
  script:
    - mvn package -DskipTests
  artifacts:
    paths:
      - target/*.jar
    expire_in: 1 week
  only:
    - main
    - tags

# Deploy to staging
deploy-staging:
  stage: deploy
  script:
    - echo "Deploying to staging environment"
    - scp target/*.jar user@staging-server:/apps/
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - main

# Deploy to production (manual)
deploy-production:
  stage: deploy
  script:
    - echo "Deploying to production environment"
    - scp target/*.jar user@prod-server:/apps/
  environment:
    name: production
    url: https://example.com
  when: manual
  only:
    - tags
```

## Pipeline with Docker

Build and push Docker images as part of your pipeline:

```yaml
image: maven:3.9-eclipse-temurin-17

services:
  - docker:dind

variables:
  DOCKER_HOST: tcp://docker:2375
  DOCKER_TLS_CERTDIR: ""
  IMAGE_TAG: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA

stages:
  - build
  - test
  - docker
  - deploy

build:
  stage: build
  script:
    - mvn clean package -DskipTests
  artifacts:
    paths:
      - target/*.jar
    expire_in: 1 hour

test:
  stage: test
  script:
    - mvn test

docker-build:
  stage: docker
  image: docker:latest
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $IMAGE_TAG .
    - docker tag $IMAGE_TAG $CI_REGISTRY_IMAGE:latest
    - docker push $IMAGE_TAG
    - docker push $CI_REGISTRY_IMAGE:latest
  only:
    - main
    - tags

deploy:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
  script:
    - ssh user@server "docker pull $IMAGE_TAG && docker-compose up -d"
  environment:
    name: production
  when: manual
  only:
    - tags
```

## Using GitLab CI/CD Features

### Environment Variables

Set variables in GitLab UI (Settings > CI/CD > Variables):
- `DATABASE_URL`
- `API_KEY`
- `DOCKER_PASSWORD`

Use in pipeline:
```yaml
deploy:
  script:
    - echo "Database URL is $DATABASE_URL"
```

### Artifacts

Save build outputs to use in later stages or download:
```yaml
build:
  artifacts:
    paths:
      - target/*.jar
    expire_in: 1 week
```

### Cache

Speed up pipelines by caching dependencies:
```yaml
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - .m2/repository
```

### Environments

Track deployments to different environments:
```yaml
deploy-production:
  environment:
    name: production
    url: https://example.com
    on_stop: stop-production
```

### Manual Jobs

Require manual approval before running:
```yaml
deploy-production:
  when: manual
```

### Only/Except Rules

Control when jobs run:
```yaml
deploy:
  only:
    - main
    - tags
  except:
    - schedules
```

## Multi-Project Pipelines

Trigger pipelines in other projects:
```yaml
trigger-downstream:
  stage: deploy
  trigger:
    project: group/downstream-project
    branch: main
```

## Best Practices

1. **Use Specific Docker Images**: `maven:3.9-eclipse-temurin-17` not `maven:latest`
2. **Cache Dependencies**: Cache `.m2/repository` to speed up builds
3. **Fail Fast**: Run fastest jobs first
4. **Parallel Jobs**: Use `parallel:` keyword for parallel execution
5. **Artifacts Management**: Set reasonable expiration times
6. **Secrets in Variables**: Store sensitive data in GitLab CI/CD variables (masked)
7. **Use Environments**: Track deployments properly
8. **Manual Production Deploys**: Always require manual approval for production

## Code Quality Integration

### Checkstyle

```yaml
checkstyle:
  stage: quality
  script:
    - mvn checkstyle:check
  artifacts:
    paths:
      - target/checkstyle-result.xml
```

### JaCoCo Coverage

```yaml
coverage:
  stage: test
  script:
    - mvn jacoco:prepare-agent test jacoco:report
  coverage: '/Total.*?([0-9]{1,3})%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: target/site/jacoco/jacoco.xml
```

## Practice Exercise

1. Create a GitLab repository for your Java application
2. Add a `.gitlab-ci.yml` file with build and test stages
3. Add Maven cache configuration
4. Configure a manual deployment job
5. Push your changes and watch the pipeline run
6. Add code quality checks with Checkstyle

## Next Steps

Learn about Event-Driven Architecture with Kafka to build scalable, distributed systems.
