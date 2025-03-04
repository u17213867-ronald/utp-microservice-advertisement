import { BadRequestInfrastructureException } from "@src/context/common/infrastructure/exceptions/bad-request-infrastructure.exception";

export class BabRequestInfrastructureSolrException<T> extends BadRequestInfrastructureException<T> {}
