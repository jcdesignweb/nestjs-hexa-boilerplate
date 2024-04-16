# Boilerplate project using Hexagonal arch

this is a example project using an hexagonal software architecture for NestJS.


## Usage/Examples

```bash
├── src
│   ├── app.module.ts
│   ├── main.ts
│   ├── products
│   │   ├── application
│   │   │   └── use-cases
│   │   │       └── productCreateUseCase.ts
│   │   ├── domain
│   │   │   ├── ports
│   │   │   │   ├── inbound
│   │   │   │   └── outbound
│   │   │   │       └── IProductRepository.outbound.ts
│   │   │   ├── product.ts
│   │   │   └── services
│   │   │       └── product.service.ts
│   │   ├── infrastructure
│   │   │   ├── adapters
│   │   │   │   └── repository
│   │   │   │       └── product-adapter.repository.ts
│   │   │   ├── controller
│   │   │   │   ├── v1
│   │   │   │   │   ├── dto
│   │   │   │   │   │   └── createProduct.dto.ts
│   │   │   │   │   ├── product.controller.spec.ts
│   │   │   │   │   └── product.controller.ts
│   │   │   │   └── v2
│   │   │   ├── entities
│   │   │   │   ├── category.entity.ts
│   │   │   │   └── product.entity.ts
│   │   │   └── persistence
│   │   │       ├── memory
│   │   │       └── relational
│   │   │           └── repositories
│   │   │               └── product-relational.repository.ts
│   │   └── products.module.ts
│   └── shared
│       ├── config
│       │   └── database.config.ts
│       └── shared.module.ts

```

## Run Locally

Clone the project

```bash
  git clone https://github.com/jcdesignweb/fastcsv.git

```

Go to the project directory

```bash
  cd /project
```

Install dependencies

```bash
  yarn install
```

Run tests

```bash
  yarn test
```


## Author

Juan Andrés Carmena <juan14nob@gmail.com>
