import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {Express} from 'express'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Reward Token Service API",
      version: "1.0.0",
      description: "APIs for giving rewards and getting tokens",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
        {
            bearerAuth: []
        }
    ]
  },
  apis: [`${__dirname}/**/*.ts`]
};

const swaggerSpec = swaggerJSDoc(options)

function swaggerDocs(app: Express, port: number) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get('docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}

export default swaggerDocs
