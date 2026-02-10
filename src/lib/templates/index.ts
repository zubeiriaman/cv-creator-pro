import { CVFormData, TemplateName } from '../cv-types';
import { classicTemplate } from './classic';
import { modernTemplate } from './modern';
import { detailedTemplate } from './detailed';
import { executive1Template } from './executive1';
import { executive2Template } from './executive2';

const templates: Record<TemplateName, (data: CVFormData) => string> = {
  classic: classicTemplate,
  modern: modernTemplate,
  detailed: detailedTemplate,
  executive1: executive1Template,
  executive2: executive2Template,
};

export function generateLatex(template: TemplateName, data: CVFormData): string {
  return templates[template](data);
}
