import { IForm } from "../model/formFlowModels";

export function getCorrectedIndexes(
  form: IForm,
  indexLevel1: number,
  indexLevel2: number,
) {
  const totalLevel1s = form.steps.length;
  let correctedIndexLevel1 = indexLevel1;
  let correctedIndexLevel2 = indexLevel2;
  if (correctedIndexLevel1 < 0 || correctedIndexLevel1 >= totalLevel1s) {
    correctedIndexLevel1 = 0;
  }
  if (
    correctedIndexLevel2 < 0 ||
    correctedIndexLevel2 >= form.steps[correctedIndexLevel1].steps.length
  ) {
    correctedIndexLevel2 = 0;
  }
  return { correctedIndexLevel1, correctedIndexLevel2 };
}
