import { Model } from "objection";
import knex from "knex";
import knexConfig from "../knexfile"; // js module

const knexInstance = knex(knexConfig.development)

const initDB = () => {
  Model.knex(knexInstance);
  console.log("Instantiated datbase!")
}

export default initDB
