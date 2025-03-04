import { HandlerEnum } from "@common/domain/enum/handler.enum"

export class GetSearchEngineInputDto {
  handler = String(HandlerEnum.SELECT)

  page = 1

  limit = 16
}
