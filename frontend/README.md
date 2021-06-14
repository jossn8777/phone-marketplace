# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## Framework Docs 
- [UmiJs][https://umijs.org/]

## Library docs
- [Ant Design](https://ant.design/)
- [Customize theme](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)
- [UmiHooks](https://hooks.umijs.org/hooks)

## Structure
- public: holds public accessible assets
- umirc.ts: routing and other configs [See More](https://umijs.org/docs/config)
- src:
    - components: Module components
    - domains: Business logics layers
        - apis: api configs
        - entities: models entities
        - services: handle business logics logics
    - layouts: Common layouts
    - locales: Locate international files
    - pages: Web pages
    - less: global styles
        - customize-antd
        - font-face
    - utils: 
        - normalizers: contains reuseable normalizers
        - validators: contains reuseable validators

## Use with docker

```
    docker build -t frontend .
```

```
    docker run --rm -it --expose=8000 -p 8000:8000 frontend:latest
```


